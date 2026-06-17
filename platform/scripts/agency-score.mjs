import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
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

function scoreBrandCraft(root) {
  const paths = [
    join(root, 'pm/agency/brand/tokens.json'),
    join(root, 'pm/agency/templates/one-pager.md'),
    join(root, 'pm/agency/templates/slides.md'),
  ];
  const present = paths.filter((p) => existsSync(p)).length;
  let tokenScore = 0;
  if (existsSync(paths[0])) {
    const tokens = readJson(paths[0]);
    const keys = ['colors', 'typography', 'spacing', 'voice'];
    const filled = keys.filter((k) => tokens[k]).length;
    tokenScore = Math.round((filled / keys.length) * 100);
  }
  const templateScore = Math.round(((present - (tokenScore ? 1 : 0)) / 2) * 100);
  return Math.round(tokenScore * 0.6 + templateScore * 0.4);
}

function scoreClaimWitness(root) {
  const mapPath = join(root, 'pm/agency/packs/gr-t2/claim-witness-map.json');
  if (!existsSync(mapPath)) return { score: 40, linked: 0, total: 0 };
  const map = readJson(mapPath);
  const claims = map.claims ?? [];
  if (!claims.length) return { score: 50, linked: 0, total: 0 };
  let linked = 0;
  for (const c of claims) {
    const witnesses = c.witnesses ?? [];
    if (c.status === 'linked' && witnesses.length > 0) linked += 1;
  }
  const ratio = linked / claims.length;
  return { score: clamp(Math.round(ratio * 100), 0, 100), linked, total: claims.length };
}

function scoreWorkflow(root) {
  const workflowPath = join(root, 'docs/gitbook/business/agency/workflow.md');
  if (!existsSync(workflowPath)) return 40;
  const text = readFileSync(workflowPath, 'utf8');
  const stages = ['brief', 'generate', 'review', 'register', 'publish'];
  const hits = stages.filter((s) => text.toLowerCase().includes(s)).length;
  return clamp(Math.round((hits / stages.length) * 100), 0, 100);
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

const craft = scoreBrandCraft(root);
const claimWitness = scoreClaimWitness(root);
const workflowScore = scoreWorkflow(root);
const trustAndSafety = Math.round(claimWitness.score * 0.7 + workflowScore * 0.3);
const worldClass = Math.round((craft + claimWitness.score) / 2);
const creativityInnovation = Math.round((craft + worldClass) / 2);
const commercialValue = claimWitness.score >= 85 ? 75 : 55;
const defensiveMoat = 50;
const agenticEmpowerment = workflowScore >= 80 ? 70 : 45;
const ecosystemIntegration = claimWitness.linked >= 3 ? 75 : 50;
const ipMagic = 40;

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
    craft: { brandScaffold: craft },
    trustAndSafety: { claimWitness, workflow: workflowScore },
    note:
      'Scoring: Compliance/Technical from catalogs; Craft from brand scaffold; Trust from claim→witness map + workflow gates.',
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

