/**
 * GTM stage inference — GS-GTM-STAGE-002 / GS-GTM-STAGE-INFERENCE-002
 * Product ladder S0–S4 only; procurement assurance is parallel.
 * @see machine/spec/gtm-stage-inference-standard.json
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SPEC_REL = 'machine/spec/gtm-stage-inference-standard.json';

function loadJson(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function resolveSpec(repoRoot) {
  const local = loadJson(join(repoRoot, SPEC_REL));
  if (local?.integratorPilotStages) return local;
  const canon = join(dirname(fileURLToPath(import.meta.url)), '../../..', SPEC_REL);
  return loadJson(canon);
}

function existsAny(root, rels) {
  return rels.some((r) => existsSync(join(root, r)));
}

function newestMatching(dir, pattern) {
  if (!existsSync(dir)) return null;
  const re = new RegExp(pattern);
  let best = null;
  let bestMtime = 0;
  for (const name of readdirSync(dir)) {
    if (!re.test(name)) continue;
    const p = join(dir, name);
    const m = statSync(p).mtimeMs;
    if (m > bestMtime) {
      bestMtime = m;
      best = p;
    }
  }
  return best;
}

/**
 * Collect machine-checkable GTM gate signals for a repo.
 * @param {string} repoRoot
 * @param {string} repoId
 * @param {object} [spec]
 */
export function collectGtmGates(repoRoot, repoId, spec = resolveSpec(repoRoot)) {
  const paths = spec?.gatePaths ?? {};
  const gate = (key, fallback = []) => existsAny(repoRoot, paths[key] ?? fallback);

  const gates = {
    readme: gate('readme'),
    packageOrMakefile: gate('packageOrMakefile'),
    devEntry: false,
    opsCheckPass: false,
    agentNextWork: existsAny(repoRoot, [
      'platform/scripts/agent-next-work.mjs',
      'platform/scripts/agent/agent-next-work.mjs',
    ]),
    demoWalkthrough: gate('demoWalkthrough'),
    syntheticFixtures: gate('syntheticFixtures'),
    featureMatrix90: false,
    deployWitness: false,
    repeatableOnboarding: gate('repeatableOnboarding'),
    billingOrPricingDoc: gate('billingOrPricingDoc'),
    selfServeOrNamedCsm: gate('selfServeOrNamedCsm'),
    slaDefined: gate('slaDefined'),
    apiVersioned: gate('apiVersioned'),
    changelogCadence: gate('changelogCadence'),
    privacyPolicy: gate('privacyPolicy'),
    soc2Path: gate('soc2Path'),
    ssoPath: gate('ssoPath'),
    auditLog: gate('auditLog'),
    dpaTemplate: gate('dpaTemplate'),
    penTestReport: gate('penTestReport'),
    fedrampPath: false,
    fipsCrypto: false,
    dataResidencyUs: false,
    airgapPath: false,
    sbom: gate('sbom'),
    cveClear: false,
  };

  const pkg = loadJson(join(repoRoot, 'package.json'));
  if (pkg?.scripts) {
    gates.devEntry = Boolean(
      pkg.scripts.dev || pkg.scripts.start || pkg.scripts['ops:check'] || pkg.scripts.build,
    );
    gates.opsCheckPass = Boolean(pkg.scripts['ops:check']);
  }

  let demoWitnessPath = join(repoRoot, `audit/evidence/demo-readiness-${repoId}-latest.json`);
  if (!existsSync(demoWitnessPath)) {
    demoWitnessPath = newestMatching(join(repoRoot, 'audit/evidence'), /^demo-readiness-.*-latest\.json$/);
  }
  const demoWitness = demoWitnessPath ? loadJson(demoWitnessPath) : null;
  if (demoWitness?.ok === true) {
    gates.demoWalkthrough = true;
    gates.syntheticFixtures = true;
  }

  const featureMatrix = loadJson(join(repoRoot, 'pm/ci/feature-coverage-matrix.json'));
  if (featureMatrix?.coveragePercent >= 90 || featureMatrix?.percent >= 90) {
    gates.featureMatrix90 = true;
  }

  const readiness = loadJson(join(repoRoot, 'pm/readiness-snapshot.json'));
  if (readiness?.deployGate?.ready === true || readiness?.deployReady === true) {
    gates.deployWitness = true;
  }
  const deployWitness = loadJson(join(repoRoot, 'audit/evidence/deploy-readiness-latest.json'));
  if (deployWitness?.ok === true) gates.deployWitness = true;

  return gates;
}

function evaluateStageLadder(gates, stageOrder) {
  let currentStage = stageOrder[0]?.id ?? 'S0';
  let currentStatus = 'not_ready';
  const gaps = [];

  for (const stage of stageOrder) {
    const missing = stage.required.filter((g) => !gates[g]);
    if (missing.length === 0) {
      currentStage = stage.id;
      currentStatus = 'ready';
      continue;
    }
    currentStage = stage.id;
    currentStatus = missing.length < stage.required.length ? 'partial' : 'not_ready';
    gaps.push(...missing.map((g) => `${stage.id}:${g}`));
    break;
  }

  const stageIdx = stageOrder.findIndex((s) => s.id === currentStage);
  const score100 = Math.round(
    ((stageIdx + (currentStatus === 'ready' ? 1 : 0.5)) / Math.max(stageOrder.length, 1)) * 100,
  );

  return {
    gtmStage: currentStage,
    gtmStageName: stageOrder.find((s) => s.id === currentStage)?.name ?? 'Prototype',
    gtmStageStatus: currentStatus,
    score100,
    gaps: [...new Set(gaps)],
  };
}

function evaluateProcurementSegment(gates, segmentId, segment) {
  const missing = segment.required.filter((g) => !gates[g]);
  const gateMap = Object.fromEntries(segment.required.map((g) => [g, Boolean(gates[g])]));
  return {
    status:
      missing.length === 0 ? 'ready' : missing.length < segment.required.length ? 'partial' : 'not_ready',
    gaps: missing.map((g) => `procurementAssurance.${segmentId}:${g}`),
    ...gateMap,
  };
}

function productGatesFromStages(gates, stages) {
  const keys = new Set(stages.flatMap((s) => s.required));
  return Object.fromEntries([...keys].map((k) => [k, Boolean(gates[k])]));
}

/** S2 integrator-pilot gates satisfied — independent of enterprise procurement track. */
export function isIntegratorPilotReady(gates, spec = null) {
  const s = spec ?? resolveSpec(process.cwd());
  const s2 = s?.integratorPilotStages?.find((st) => st.id === 'S2');
  if (!s2) return false;
  return s2.required.every((g) => Boolean(gates[g]));
}

/**
 * Infer GTM stage witness v2 shape for a repo.
 * @param {string} repoRoot
 * @param {string} repoId
 */
export function inferGtmStage(repoRoot, repoId) {
  const spec = resolveSpec(repoRoot);
  const stages = spec?.integratorPilotStages ?? [];
  const segments = spec?.procurementSegments ?? {};
  const gates = collectGtmGates(repoRoot, repoId, spec);
  const ladder = evaluateStageLadder(gates, stages);

  const procurementAssurance = Object.fromEntries(
    Object.entries(segments).map(([id, seg]) => [id, evaluateProcurementSegment(gates, id, seg)]),
  );

  const procurementGaps = Object.values(procurementAssurance).flatMap((s) => s.gaps ?? []);
  const productGates = productGatesFromStages(gates, stages);

  return {
    gtmStage: ladder.gtmStage,
    gtmStageName: ladder.gtmStageName,
    gtmStageStatus: ladder.gtmStageStatus,
    score100: ladder.score100,
    pilotReady: isIntegratorPilotReady(gates, spec),
    productGates,
    procurementAssurance,
    gaps: [...ladder.gaps, ...procurementGaps].slice(0, 24),
    gates,
    note: spec?.witness?.note ?? 'GTM stage from product gates only',
    laneSeparation: {
      policy: spec?.policyPin?.maturityLaneId ?? 'GS-MATURITY-LANE-001',
      gtmStageModel: spec?.policyPin?.gtmStageModelId ?? 'GS-GTM-STAGE-002',
      inferenceSpec: SPEC_REL,
    },
  };
}
