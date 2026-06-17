import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function nowIso() {
  return new Date().toISOString();
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function mdEscape(s) {
  return String(s ?? '').replaceAll('\n', ' ').trim();
}

function checkCatalog({ id, filePath, items, itemLabel, requiredFields }) {
  const issues = [];

  if (!Array.isArray(items)) {
    issues.push({ severity: 'error', code: 'not-array', message: `${id}: expected array at ${itemLabel}` });
    return { ok: false, issues };
  }

  for (const it of items) {
    const missing = [];
    for (const f of requiredFields) {
      const v = it?.[f];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) missing.push(f);
    }
    if (missing.length) {
      issues.push({
        severity: 'error',
        code: 'missing-fields',
        message: `${id}: ${it?.id ?? '(missing id)'} missing ${missing.join(', ')}`,
      });
    }

    const license = String(it?.license ?? '').trim().toLowerCase();
    if (!license || license === 'unknown') {
      issues.push({
        severity: 'error',
        code: 'unknown-license',
        message: `${id}: ${it?.id ?? '(missing id)'} has unknown/missing license`,
      });
    }

    // Basic URL presence check.
    const urls = it?.urls;
    if (urls && typeof urls === 'object') {
      const primary = urls.homepage ?? urls.primary;
      if (!primary || typeof primary !== 'string') {
        issues.push({
          severity: 'error',
          code: 'missing-url',
          message: `${id}: ${it?.id ?? '(missing id)'} missing primary URL`,
        });
      }
    } else {
      issues.push({
        severity: 'error',
        code: 'missing-urls',
        message: `${id}: ${it?.id ?? '(missing id)'} missing urls object`,
      });
    }
  }

  return { ok: issues.length === 0, issues, filePath };
}

function checkBrandScaffold(root) {
  const issues = [];
  const paths = {
    tokens: join(root, 'pm/agency/brand/tokens.json'),
    onePager: join(root, 'pm/agency/templates/one-pager.md'),
    slides: join(root, 'pm/agency/templates/slides.md'),
    workflow: join(root, 'docs/gitbook/business/agency/workflow.md'),
  };

  for (const [id, filePath] of Object.entries(paths)) {
    if (!existsSync(filePath)) {
      issues.push({ severity: 'error', code: 'missing-scaffold', message: `brand: missing ${id} at ${filePath}` });
    }
  }

  if (existsSync(paths.tokens)) {
    const tokens = readJson(paths.tokens);
    for (const key of ['colors', 'typography', 'spacing', 'voice']) {
      if (!tokens[key]) {
        issues.push({ severity: 'error', code: 'incomplete-tokens', message: `brand: tokens.json missing ${key}` });
      }
    }
  }

  return { ok: issues.length === 0, issues, filePath: paths.tokens };
}

function summarizeMd({ witness }) {
  const lines = [];
  lines.push(`# Agency check`);
  lines.push('');
  lines.push(`- Updated: \`${witness.updated}\``);
  lines.push(`- OK: **${witness.ok ? 'true' : 'false'}**`);
  lines.push('');
  for (const cat of witness.catalogs) {
    lines.push(`## ${cat.id}`);
    lines.push('');
    lines.push(`- Path: \`${cat.path}\``);
    lines.push(`- OK: **${cat.ok ? 'true' : 'false'}**`);
    lines.push(`- Issues: **${cat.issues.length}**`);
    if (cat.issues.length) {
      lines.push('');
      lines.push(`| severity | code | message |`);
      lines.push(`| --- | --- | --- |`);
      for (const i of cat.issues.slice(0, 50)) {
        lines.push(`| ${mdEscape(i.severity)} | ${mdEscape(i.code)} | ${mdEscape(i.message)} |`);
      }
      if (cat.issues.length > 50) lines.push(`| … | … | ${cat.issues.length - 50} more |`);
    }
    lines.push('');
  }
  if (witness.brandScaffold) {
    lines.push(`## brandScaffold`);
    lines.push('');
    lines.push(`- OK: **${witness.brandScaffold.ok ? 'true' : 'false'}**`);
    lines.push(`- Issues: **${witness.brandScaffold.issues.length}**`);
    lines.push('');
  }
  return lines.join('\n');
}

const root = process.cwd();
const write = process.argv.includes('--write');

const toolsPath = join(root, 'pm/agency/catalogs/tools.json');
const assetsPath = join(root, 'pm/agency/catalogs/assets.json');
const resourcesPath = join(root, 'pm/agency/catalogs/resources.json');

const tools = readJson(toolsPath);
const assets = readJson(assetsPath);
const resources = readJson(resourcesPath);

const results = [
  checkCatalog({
    id: 'tools',
    filePath: toolsPath,
    items: tools.items,
    itemLabel: 'items',
    requiredFields: ['id', 'name', 'category', 'license', 'kind', 'urls', 'status'],
  }),
  checkCatalog({
    id: 'assets',
    filePath: assetsPath,
    items: assets.sources,
    itemLabel: 'sources',
    requiredFields: ['id', 'name', 'types', 'license', 'commercialUse', 'attribution', 'urls', 'status'],
  }),
  checkCatalog({
    id: 'resources',
    filePath: resourcesPath,
    items: resources.items,
    itemLabel: 'items',
    requiredFields: ['id', 'name', 'kind', 'topics', 'urls', 'status'],
  }),
];

const brandScaffold = checkBrandScaffold(root);

const witness = {
  schema: 'gtcx://ecosystem-os/agency-check/v1',
  updated: nowIso(),
  ok: results.every((r) => r.ok) && brandScaffold.ok,
  catalogs: results.map((r, idx) => ({
    id: ['tools', 'assets', 'resources'][idx],
    path: r.filePath,
    ok: r.ok,
    issues: r.issues,
  })),
  brandScaffold: {
    ok: brandScaffold.ok,
    issues: brandScaffold.issues,
  },
};

if (write) {
  ensureDir(join(root, 'audit/evidence'));
  ensureDir(join(root, 'pm/ci'));
  writeFileSync(join(root, 'audit/evidence/agency-check-latest.json'), JSON.stringify(witness, null, 2) + '\n');
  writeFileSync(join(root, 'pm/ci/agency-check-latest.md'), summarizeMd({ witness }) + '\n');
}

if (!witness.ok) {
  process.exitCode = 1;
} else {
  process.stdout.write(JSON.stringify(witness, null, 2) + '\n');
}

