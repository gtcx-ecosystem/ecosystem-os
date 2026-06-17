import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

function nowIso() {
  return new Date().toISOString();
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function scoreCatalogLicensing(items, licenseField = 'license') {
  if (!Array.isArray(items) || items.length === 0) return { score: 60, unknown: 0, total: 0 };
  let unknown = 0;
  for (const it of items) {
    const lic = String(it?.[licenseField] ?? '').trim().toLowerCase();
    if (!lic || lic === 'unknown') unknown += 1;
  }
  const total = items.length;
  const ratioUnknown = total ? unknown / total : 0;
  const score = clamp(Math.round(100 - ratioUnknown * 100), 0, 100);
  return { score, unknown, total };
}

function scoreTechnicalShape(items, requiredFields) {
  if (!Array.isArray(items) || items.length === 0) return { score: 50, missing: 0, total: 0 };
  let missing = 0;
  for (const it of items) {
    for (const f of requiredFields) {
      const v = it?.[f];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
        missing += 1;
      }
    }
  }
  const total = items.length * requiredFields.length;
  const ratioMissing = total ? missing / total : 0;
  const score = clamp(Math.round(100 - ratioMissing * 100), 0, 100);
  return { score, missing, total };
}

const root = process.cwd();
const write = process.argv.includes('--write');

const tools = readJson(join(root, 'pm/agency/catalogs/tools.json'));
const assets = readJson(join(root, 'pm/agency/catalogs/assets.json'));
const resources = readJson(join(root, 'pm/agency/catalogs/resources.json'));

const toolsItems = tools.items ?? [];
const assetsItems = assets.sources ?? [];
const resItems = resources.items ?? [];

// Pillar scores (initial v0 — will deepen once packs/templates + claim→witness maps land).
const complianceTools = scoreCatalogLicensing(toolsItems);
const complianceAssets = scoreCatalogLicensing(assetsItems);
const complianceResources = scoreCatalogLicensing(resItems);
const compliance = Math.round((complianceTools.score + complianceAssets.score + complianceResources.score) / 3);

const technicalTools = scoreTechnicalShape(toolsItems, ['id', 'name', 'category', 'license', 'kind', 'urls', 'status']);
const technicalAssets = scoreTechnicalShape(assetsItems, ['id', 'name', 'types', 'license', 'commercialUse', 'attribution', 'urls', 'status']);
const technicalResources = scoreTechnicalShape(resItems, ['id', 'name', 'kind', 'topics', 'urls', 'status']);
const technicalExcellence = Math.round((technicalTools.score + technicalAssets.score + technicalResources.score) / 3);

// Craft/World-class/Trust are placeholders until templates + packs + contracts are scored.
const craft = 50;
const worldClass = 40;
const trustAndSafety = 50;
const creativityInnovation = 45;
const commercialValue = 45;
const defensiveMoat = 40;
const agenticEmpowerment = 40;
const ecosystemIntegration = 40;
const ipMagic = 30;

const weights = {
  compliance: 12,
  technicalExcellence: 12,
  craft: 12,
  trustAndSafety: 12,
  worldClass: 10,
  commercialValue: 10,
  creativityInnovation: 8,
  ecosystemIntegration: 8,
  agenticEmpowerment: 6,
  defensiveMoat: 6,
  ipMagic: 4,
};

const weighted =
  compliance * weights.compliance +
  technicalExcellence * weights.technicalExcellence +
  craft * weights.craft +
  trustAndSafety * weights.trustAndSafety +
  worldClass * weights.worldClass +
  commercialValue * weights.commercialValue +
  creativityInnovation * weights.creativityInnovation +
  ecosystemIntegration * weights.ecosystemIntegration +
  agenticEmpowerment * weights.agenticEmpowerment +
  defensiveMoat * weights.defensiveMoat +
  ipMagic * weights.ipMagic;

const composite = Math.round(weighted / 100);

const hardGates = {
  compliance: compliance >= 85 && complianceTools.unknown === 0 && complianceAssets.unknown === 0 && complianceResources.unknown === 0,
  trustAndSafety: trustAndSafety >= 85,
  craft: craft >= 85,
  technicalExcellence: technicalExcellence >= 85,
};

const shippable = Object.values(hardGates).every(Boolean);

const witness = {
  schema: 'gtcx://ecosystem-os/agency-score/v1',
  updated: nowIso(),
  shippable,
  hardGates,
  weights,
  scores: {
    compliance,
    technicalExcellence,
    craft,
    worldClass,
    trustAndSafety,
    creativityInnovation,
    commercialValue,
    defensiveMoat,
    agenticEmpowerment,
    ecosystemIntegration,
    ipMagic,
  },
  composite,
  details: {
    compliance: { tools: complianceTools, assets: complianceAssets, resources: complianceResources },
    technicalExcellence: { tools: technicalTools, assets: technicalAssets, resources: technicalResources },
    note:
      'v0 scoring: Compliance/Technical are computed from catalogs; remaining pillars are placeholders until templates, packs, and claim→witness contracts land.',
  },
};

if (write) {
  ensureDir(join(root, 'audit/evidence'));
  ensureDir(join(root, 'pm/ci'));
  writeFileSync(join(root, 'audit/evidence/agency-score-latest.json'), JSON.stringify(witness, null, 2) + '\n');
  writeFileSync(
    join(root, 'pm/ci/agency-score-latest.md'),
    [
      `# Agency score`,
      ``,
      `- Updated: \`${witness.updated}\``,
      `- Shippable: **${witness.shippable ? 'true' : 'false'}**`,
      `- Composite: **${witness.composite}/100**`,
      ``,
      `## Hard gates`,
      ``,
      `| gate | pass | score |`,
      `| --- | --- | --- |`,
      `| compliance | ${hardGates.compliance ? '✅' : '❌'} | ${compliance} |`,
      `| trustAndSafety | ${hardGates.trustAndSafety ? '✅' : '❌'} | ${trustAndSafety} |`,
      `| craft | ${hardGates.craft ? '✅' : '❌'} | ${craft} |`,
      `| technicalExcellence | ${hardGates.technicalExcellence ? '✅' : '❌'} | ${technicalExcellence} |`,
      ``,
      `## Pillars (0–100)`,
      ``,
      `| pillar | score |`,
      `| --- | --- |`,
      `| compliance | ${compliance} |`,
      `| technicalExcellence | ${technicalExcellence} |`,
      `| craft | ${craft} |`,
      `| worldClass | ${worldClass} |`,
      `| trustAndSafety | ${trustAndSafety} |`,
      `| creativityInnovation | ${creativityInnovation} |`,
      `| commercialValue | ${commercialValue} |`,
      `| defensiveMoat | ${defensiveMoat} |`,
      `| agenticEmpowerment | ${agenticEmpowerment} |`,
      `| ecosystemIntegration | ${ecosystemIntegration} |`,
      `| ipMagic | ${ipMagic} |`,
      ``,
      `> Note: ${witness.details.note}`,
      ``,
    ].join('\n'),
  );
}

process.stdout.write(JSON.stringify(witness, null, 2) + '\n');

