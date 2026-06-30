#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ECOSYSTEM_ROOT = resolve(REPO, '..');
const WRITE = process.argv.includes('--write');
const STRICT = process.argv.includes('--strict');
const LOCAL_KIND = process.argv.includes('--local') ? process.argv[process.argv.indexOf('--local') + 1] : null;
const WITNESS = join(REPO, 'audit/evidence/kaleidoscope-graph-rag-mcp-latest.json');

const FLEET = [
  ['baseline-os', 0, 'restore', 'RAG/MCP hub and validator owner'],
  ['bridge-os', 0, 'restore', 'MCP/action orchestration and fleet coordination'],
  ['ecosystem-os', 0, 'strengthen', 'Ecosystem graph and Kaleidoscope home'],
  ['gtcx-os', 1, 'restore', 'Platform/product OS and Cortex scope'],
  ['markets-os', 1, 'restore', 'Market infrastructure product'],
  ['compliance-os', 1, 'restore', 'Compliance operating layer'],
  ['terminal-os', 1, 'restore', 'Operator/terminal surface'],
  ['ledger-ui', 1, 'restore', 'Finance/ledger UI'],
  ['terra-os', 2, 'restore', 'Land/site/source truth'],
  ['exploration-os', 2, 'restore', 'Field/site intelligence'],
  ['veritas-ai', 2, 'restore', 'Verification/publication intelligence'],
  ['sensei-os', 2, 'strengthen', 'Migration/agent intelligence'],
  ['griot-ai', 2, 'restore', 'Market/context publishing'],
  ['nyota-ai', 2, 'restore', 'Last-mile/mobile intelligence'],
  ['fabric-os', 3, 'restore', 'Deployment, ops, compliance fabric'],
  ['canon-os', 3, 'strengthen', 'Governance and protocols'],
  ['agile-os', 3, 'seed', 'Sprint, backlog, delivery OS'],
  ['ledger-os', 3, 'seed', 'Ledger/product finance backend'],
  ['inspection-os', 3, 'seed', 'Inspection product'],
  ['venture-os', 3, 'seed', 'Venture/portfolio product']
];

const SPLIT_CONFIGS = {
  rag: 'config/baseline/rag.config.json',
  mcp: 'config/baseline/mcp.config.json',
  graph: 'config/baseline/graph.config.json',
  eval: 'config/baseline/eval.config.json'
};

const EVIDENCE = {
  ragConfig: 'audit/evidence/rag-config-latest.json',
  ragEval: 'audit/evidence/rag-eval-latest.json',
  mcpConfig: 'audit/evidence/mcp-config-latest.json',
  graphProjection: 'audit/evidence/graph-projection-latest.json'
};

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function maybeJson(path) {
  if (!existsSync(path)) return null;
  try {
    return readJson(path);
  } catch (err) {
    return { __parseError: err instanceof Error ? err.message : String(err) };
  }
}

function hasLegacyRagFields(config) {
  return Boolean(
    config?.knowledge ||
      config?.include ||
      config?.exclude ||
      config?.paths ||
      config?.rag ||
      config?.topology ||
      config?.eval,
  );
}

function requiredArray(value) {
  return Array.isArray(value) && value.length > 0;
}

function validateSplit(kind, config, repo) {
  if (!config) return { present: false, ok: false, issues: ['missing'] };
  if (config.__parseError) return { present: true, ok: false, issues: [`parse: ${config.__parseError}`] };

  const issues = [];
  if (config.repo !== repo) issues.push(`repo mismatch: ${config.repo ?? '(missing)'}`);

  if (kind === 'rag') {
    if (config.$schema !== 'gtcx://ecosystem-os/rag-config/v1') issues.push('schema mismatch');
    if (!config.topology) issues.push('missing topology');
    if (!Array.isArray(config.knowledge)) issues.push('missing knowledge array');
    if (!Array.isArray(config.include)) issues.push('missing include array');
    if (!Array.isArray(config.exclude)) issues.push('missing exclude array');
    if (!config.paths?.index || !config.paths?.checkpoints) issues.push('missing paths.index/checkpoints');
    if (!config.eval?.golden || !config.eval?.mockCorpus) issues.push('missing eval golden/mockCorpus');
  }

  if (kind === 'mcp') {
    if (config.$schema !== 'gtcx://ecosystem-os/mcp-config/v1') issues.push('schema mismatch');
    if (!config.mode) issues.push('missing mode');
    if (!config.server) issues.push('missing server');
    if (!Array.isArray(config.tools)) issues.push('missing tools array');
    for (const tool of config.tools ?? []) {
      if (!tool.id || !tool.permissionClass) issues.push(`tool missing id/permissionClass: ${tool.id ?? '(missing)'}`);
    }
    if (!Array.isArray(config.permissions)) issues.push('missing permissions array');
    if (!Array.isArray(config.humanApprovalRequired)) issues.push('missing humanApprovalRequired array');
  }

  if (kind === 'graph') {
    if (config.$schema !== 'gtcx://ecosystem-os/graph-config/v1') issues.push('schema mismatch');
    if (!requiredArray(config.entities)) issues.push('missing entities');
    if (!requiredArray(config.relations)) issues.push('missing relations');
    if (!requiredArray(config.evidencePaths)) issues.push('missing evidencePaths');
    if (!Array.isArray(config.exclude)) issues.push('missing exclude array');
  }

  if (kind === 'eval') {
    if (config.$schema !== 'gtcx://ecosystem-os/eval-config/v1') issues.push('schema mismatch');
    if (!requiredArray(config.goldenSets)) issues.push('missing goldenSets');
    if (!requiredArray(config.qualityGates)) issues.push('missing qualityGates');
    if (!Array.isArray(config.releaseGates)) issues.push('missing releaseGates');
  }

  return { present: true, ok: issues.length === 0, issues };
}

function packageScripts(repoRoot) {
  const pkg = maybeJson(join(repoRoot, 'package.json'));
  if (!pkg || pkg.__parseError) return {};
  return pkg.scripts ?? {};
}

function scoreRepo(scan) {
  let score = 0;
  if (scan.repoPresent) score += 10;
  if (scan.organizationBaseline.present) score += 10;
  if (scan.organizationBaseline.separated) score += 10;
  for (const kind of Object.keys(SPLIT_CONFIGS)) {
    if (scan.splitConfigs[kind].ok) score += 10;
  }
  if (scan.scripts.validateRagConfig) score += 5;
  if (scan.scripts.validateMcpConfig) score += 5;
  if (scan.scripts.validateGraphConfig) score += 5;
  if (scan.scripts.ragEval) score += 5;
  if (scan.scripts.mcp) score += 5;
  for (const key of Object.keys(EVIDENCE)) {
    if (scan.evidence[key]) score += 2.5;
  }
  return Math.min(100, Math.round(score));
}

function classify(score) {
  if (score >= 85) return 'ready';
  if (score >= 65) return 'partial';
  if (score >= 35) return 'seeded';
  return 'missing';
}

function scanRepo([repo, tier, targetStatus, role]) {
  const repoRoot = join(ECOSYSTEM_ROOT, repo);
  const repoPresent = existsSync(repoRoot);
  const baselinePath = join(repoRoot, 'config/baseline/baseline.config.json');
  const baseline = maybeJson(baselinePath);
  const scripts = packageScripts(repoRoot);

  const splitConfigs = {};
  for (const [kind, rel] of Object.entries(SPLIT_CONFIGS)) {
    splitConfigs[kind] = validateSplit(kind, maybeJson(join(repoRoot, rel)), repo);
  }

  const evidence = {};
  for (const [key, rel] of Object.entries(EVIDENCE)) {
    evidence[key] = existsSync(join(repoRoot, rel));
  }

  const scan = {
    repo,
    tier,
    role,
    targetStatus,
    repoPresent,
    organizationBaseline: {
      path: 'config/baseline/baseline.config.json',
      present: Boolean(baseline),
      parseOk: Boolean(baseline && !baseline.__parseError),
      separated: Boolean(baseline?.organization && !hasLegacyRagFields(baseline)),
      hasLegacyRagFields: Boolean(baseline && !baseline.__parseError && hasLegacyRagFields(baseline))
    },
    splitConfigs,
    scripts: {
      validateRagConfig: Boolean(scripts['validate:rag-config']),
      validateMcpConfig: Boolean(scripts['validate:mcp-config']),
      validateGraphConfig: Boolean(scripts['validate:graph-config']),
      ragEval: Boolean(scripts['rag:eval']),
      mcp: Boolean(scripts.mcp)
    },
    evidence
  };

  const score = scoreRepo(scan);
  return {
    ...scan,
    score,
    maturity: classify(score),
    blockers: blockersFor(scan)
  };
}

function blockersFor(scan) {
  const blockers = [];
  if (!scan.repoPresent) blockers.push('repo checkout missing');
  if (!scan.organizationBaseline.present) blockers.push('missing organization baseline');
  if (scan.organizationBaseline.hasLegacyRagFields) blockers.push('legacy RAG fields still share organization baseline');
  for (const [kind, result] of Object.entries(scan.splitConfigs)) {
    if (!result.ok) blockers.push(`${kind} config: ${result.issues.join('; ')}`);
  }
  if (!scan.scripts.validateRagConfig) blockers.push('missing validate:rag-config script');
  if (!scan.scripts.validateMcpConfig) blockers.push('missing validate:mcp-config script');
  if (!scan.scripts.validateGraphConfig) blockers.push('missing validate:graph-config script');
  if (!scan.scripts.ragEval) blockers.push('missing rag:eval script');
  if (!scan.scripts.mcp) blockers.push('missing mcp script');
  return blockers;
}

function byTier(repos) {
  const tiers = {};
  for (const repo of repos) {
    const key = `tier${repo.tier}`;
    tiers[key] ??= { repos: 0, ready: 0, partial: 0, seeded: 0, missing: 0, averageScore: 0 };
    tiers[key].repos += 1;
    tiers[key][repo.maturity] += 1;
    tiers[key].averageScore += repo.score;
  }
  for (const tier of Object.values(tiers)) {
    tier.averageScore = Math.round(tier.averageScore / tier.repos);
  }
  return tiers;
}

function localSplit(kind) {
  return validateSplit(kind, maybeJson(join(REPO, SPLIT_CONFIGS[kind])), 'ecosystem-os');
}

function localEval() {
  const goldenPath = join(REPO, 'config/baseline/rag-eval-golden.json');
  const golden = maybeJson(goldenPath);
  const issues = [];
  if (!golden || golden.__parseError) {
    issues.push(golden?.__parseError ? `parse: ${golden.__parseError}` : 'missing golden file');
    return { ok: false, issues, queryCount: 0, resolvedEvidence: 0, totalEvidence: 0 };
  }

  let resolvedEvidence = 0;
  let totalEvidence = 0;
  for (const query of golden.queries ?? []) {
    for (const rel of query.requiredEvidence ?? []) {
      totalEvidence += 1;
      if (existsSync(join(REPO, rel))) {
        resolvedEvidence += 1;
      } else {
        issues.push(`${query.id}: missing ${rel}`);
      }
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    queryCount: Array.isArray(golden.queries) ? golden.queries.length : 0,
    resolvedEvidence,
    totalEvidence
  };
}

function localGraphProjection() {
  const nodes = FLEET.map(([repo, tier, targetStatus, role]) => ({
    id: `repo:${repo}`,
    type: 'repo',
    label: repo,
    source: '../*/package.json',
    tier,
    targetStatus,
    role,
    confidence: existsSync(join(ECOSYSTEM_ROOT, repo)) ? 1 : 0,
    updatedAt: new Date().toISOString().slice(0, 10)
  }));

  const edges = FLEET.filter(([repo]) => repo !== 'ecosystem-os').map(([repo]) => ({
    source: 'repo:ecosystem-os',
    target: `repo:${repo}`,
    type: 'depends_on',
    evidence: ['audit/evidence/kaleidoscope-graph-rag-mcp-latest.json'],
    confidence: 0.8,
    updatedAt: new Date().toISOString().slice(0, 10)
  }));

  return {
    ok: nodes.length === FLEET.length,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodes,
    edges
  };
}

function writeJson(rel, body) {
  const path = join(REPO, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(body, null, 2)}\n`);
}

function writeLocalEvidence() {
  const generatedAt = new Date().toISOString();
  const rag = localSplit('rag');
  const mcp = localSplit('mcp');
  const graph = localSplit('graph');
  const evalResult = localEval();
  const graphProjection = localGraphProjection();

  writeJson('audit/evidence/rag-config-latest.json', {
    schema: 'gtcx://ecosystem-os/rag-config-check/v1',
    generatedAt,
    repo: 'ecosystem-os',
    ok: rag.ok,
    config: SPLIT_CONFIGS.rag,
    issues: rag.issues
  });
  writeJson('audit/evidence/mcp-config-latest.json', {
    schema: 'gtcx://ecosystem-os/mcp-config-check/v1',
    generatedAt,
    repo: 'ecosystem-os',
    ok: mcp.ok,
    config: SPLIT_CONFIGS.mcp,
    issues: mcp.issues
  });
  writeJson('audit/evidence/graph-projection-latest.json', {
    schema: 'gtcx://ecosystem-os/graph-projection/v1',
    generatedAt,
    repo: 'ecosystem-os',
    configOk: graph.ok,
    config: SPLIT_CONFIGS.graph,
    issues: graph.issues,
    ...graphProjection
  });
  writeJson('audit/evidence/rag-eval-latest.json', {
    schema: 'gtcx://ecosystem-os/rag-eval/v1',
    generatedAt,
    repo: 'ecosystem-os',
    ok: evalResult.ok,
    golden: 'config/baseline/rag-eval-golden.json',
    ...evalResult
  });
}

function runLocal(kind) {
  let result;
  if (kind === 'eval') {
    result = localEval();
  } else if (SPLIT_CONFIGS[kind]) {
    result = localSplit(kind);
  } else {
    console.error(`Unknown local check kind: ${kind ?? '(missing)'}`);
    process.exit(2);
  }

  console.log(JSON.stringify({ repo: 'ecosystem-os', kind, ...result }, null, 2));
  process.exit(result.ok ? 0 : 1);
}

function main() {
  if (LOCAL_KIND) runLocal(LOCAL_KIND);
  if (WRITE) writeLocalEvidence();

  const repos = FLEET.map(scanRepo);
  const ready = repos.filter((repo) => repo.maturity === 'ready').length;
  const partialOrBetter = repos.filter((repo) => ['ready', 'partial'].includes(repo.maturity)).length;
  const splitComplete = repos.filter((repo) => Object.values(repo.splitConfigs).every((cfg) => cfg.ok)).length;

  const witness = {
    schema: 'gtcx://ecosystem-os/kaleidoscope-graph-rag-mcp-fleet/v1',
    generatedAt: new Date().toISOString(),
    repo: 'ecosystem-os',
    restored: ready === repos.length,
    strict: STRICT,
    phase: 'phase-1-contracts-and-baseline-scan',
    summary: {
      repoCount: repos.length,
      ready,
      partialOrBetter,
      splitConfigComplete: splitComplete,
      averageScore: Math.round(repos.reduce((sum, repo) => sum + repo.score, 0) / repos.length),
      tiers: byTier(repos)
    },
    contracts: {
      rag: 'pm/spec/kaleidoscope-ai/rag-config.schema.json',
      mcp: 'pm/spec/kaleidoscope-ai/mcp-config.schema.json',
      graph: 'pm/spec/kaleidoscope-ai/graph-config.schema.json',
      eval: 'pm/spec/kaleidoscope-ai/eval-config.schema.json'
    },
    configs: {
      ecosystemOs: Object.fromEntries(
        Object.entries(SPLIT_CONFIGS).map(([kind, rel]) => [kind, { path: rel, present: existsSync(join(REPO, rel)) }]),
      )
    },
    repos,
    nextActions: [
      'Move split config validators into baseline-os and bridge-os.',
      'Migrate tier-0 and tier-1 repos to config/baseline/{rag,mcp,graph,eval}.config.json.',
      'Emit repo-local rag-config, mcp-config, graph-projection, and rag-eval witnesses.',
      'Run with --strict only when the fleet checkout topology is pinned and this scan is intended to fail on restored=false.'
    ]
  };

  if (WRITE) {
    mkdirSync(dirname(WITNESS), { recursive: true });
    writeFileSync(WITNESS, `${JSON.stringify(witness, null, 2)}\n`);
  }

  console.log('\n=== kaleidoscope:graph-rag-mcp:check ===\n');
  console.log(`repos: ${witness.summary.repoCount}`);
  console.log(`ready: ${witness.summary.ready}`);
  console.log(`partial-or-better: ${witness.summary.partialOrBetter}`);
  console.log(`split-config-complete: ${witness.summary.splitConfigComplete}`);
  console.log(`average-score: ${witness.summary.averageScore}`);
  console.log(`restored: ${witness.restored}`);
  console.log(`strict: ${STRICT}`);
  if (WRITE) console.log(`witness: ${relative(REPO, WITNESS)}`);

  for (const repo of repos) {
    console.log(`${repo.repo}: ${repo.maturity}/${repo.score} (${repo.blockers.length} blockers)`);
  }

  if (STRICT && !witness.restored) {
    console.error('strict gate failed: restored=false');
    process.exitCode = 1;
  }
}

main();
