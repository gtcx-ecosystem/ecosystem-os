#!/usr/bin/env node
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync
} from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ECOSYSTEM_ROOT = resolve(REPO, '..');
const WRITE = process.argv.includes('--write');
const WITNESS_REL = 'audit/evidence/kaleidoscope-graph-snapshot-latest.json';
const WITNESS = join(REPO, WITNESS_REL);

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
      config?.eval
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
  const baseline = maybeJson(join(repoRoot, 'config/baseline/baseline.config.json'));
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
    repoRoot,
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
  const blockers = blockersFor(scan);
  return {
    ...scan,
    score,
    maturity: classify(score),
    blockers
  };
}

function node(id, type, label, repo, source, evidence, properties = {}) {
  return { id, type, label, repo, source, evidence, properties };
}

function edge(id, type, source, target, evidence, properties = {}) {
  return { id, type, source, target, evidence, properties };
}

function packageName(repoRoot) {
  const pkg = maybeJson(join(repoRoot, 'package.json'));
  if (!pkg || pkg.__parseError) return null;
  return pkg.name ?? null;
}

function packageDependencyNames(repoRoot) {
  const pkg = maybeJson(join(repoRoot, 'package.json'));
  if (!pkg || pkg.__parseError) return [];
  return [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.optionalDependencies ?? {})
  ];
}

function symlinkAliases() {
  const aliases = [];
  const repoNames = new Set(FLEET.map(([repo]) => repo));
  for (const entry of readdirSync(ECOSYSTEM_ROOT)) {
    const path = join(ECOSYSTEM_ROOT, entry);
    let stat;
    try {
      stat = lstatSync(path);
    } catch {
      continue;
    }
    if (!stat.isSymbolicLink()) continue;

    let target = '';
    let mapsToRepo = null;
    try {
      target = realpathSync(path);
      const targetName = basename(target);
      if (repoNames.has(targetName)) mapsToRepo = targetName;
    } catch {
      target = 'unresolved';
    }

    aliases.push({
      name: entry,
      path: relative(ECOSYSTEM_ROOT, path),
      target,
      mapsToRepo
    });
  }
  return aliases.sort((a, b) => a.name.localeCompare(b.name));
}

function buildGraph() {
  const scans = FLEET.map(scanRepo);
  const nodes = [];
  const edges = [];
  const issues = [];
  const aliases = symlinkAliases();
  const repoByPackage = new Map();

  for (const scan of scans) {
    const pkgName = scan.repoPresent ? packageName(scan.repoRoot) : null;
    if (pkgName) repoByPackage.set(pkgName, scan.repo);
  }

  for (const scan of scans) {
    const repoId = `repo:${scan.repo}`;
    const repoEvidence = scan.repoPresent ? ['package.json'] : [];
    nodes.push(
      node(repoId, 'repo', scan.repo, scan.repo, '../*/package.json', repoEvidence, {
        tier: scan.tier,
        role: scan.role,
        targetStatus: scan.targetStatus,
        present: scan.repoPresent,
        score: scan.score,
        maturity: scan.maturity
      })
    );

    if (!scan.repoPresent) {
      issues.push(`${scan.repo}: repo checkout missing`);
      continue;
    }

    for (const [kind, rel] of Object.entries(SPLIT_CONFIGS)) {
      const config = scan.splitConfigs[kind];
      const configId = `config:${scan.repo}:${kind}`;
      nodes.push(
        node(configId, 'config', `${scan.repo} ${kind}`, scan.repo, rel, [rel], {
          kind,
          present: config.present,
          ok: config.ok,
          issues: config.issues
        })
      );
      edges.push(edge(`edge:${scan.repo}:has_config:${kind}`, 'has_config', repoId, configId, [rel], { ok: config.ok }));
    }

    for (const [kind, rel] of Object.entries(EVIDENCE)) {
      const evidenceId = `evidence:${scan.repo}:${kind}`;
      nodes.push(
        node(evidenceId, 'evidence', `${scan.repo} ${kind}`, scan.repo, rel, [rel], {
          kind,
          present: scan.evidence[kind]
        })
      );
      edges.push(
        edge(`edge:${scan.repo}:has_evidence:${kind}`, 'has_evidence', repoId, evidenceId, [rel], {
          present: scan.evidence[kind]
        })
      );
    }

    const mcpConfig = maybeJson(join(scan.repoRoot, SPLIT_CONFIGS.mcp));
    for (const tool of mcpConfig?.tools ?? []) {
      if (!tool.id) continue;
      const toolId = `tool:${scan.repo}:${tool.id}`;
      nodes.push(
        node(toolId, 'tool', tool.id, scan.repo, SPLIT_CONFIGS.mcp, [SPLIT_CONFIGS.mcp], {
          permissionClass: tool.permissionClass ?? 'unknown',
          description: tool.description ?? ''
        })
      );
      edges.push(
        edge(`edge:${scan.repo}:exposes_tool:${tool.id}`, 'exposes_tool', repoId, toolId, [SPLIT_CONFIGS.mcp], {
          permissionClass: tool.permissionClass ?? 'unknown'
        })
      );
    }

    for (const [index, blocker] of scan.blockers.entries()) {
      const blockerId = `blocker:${scan.repo}:${index + 1}`;
      nodes.push(
        node(blockerId, 'blocker', blocker, scan.repo, 'derived:kaleidoscope-graph-snapshot', [], {
          severity: scan.score >= 85 ? 'low' : scan.score >= 65 ? 'medium' : 'high'
        })
      );
      edges.push(
        edge(`edge:${blockerId}:affects:${scan.repo}`, 'affects', blockerId, repoId, [], {
          score: scan.score,
          maturity: scan.maturity
        })
      );
    }

    for (const depName of packageDependencyNames(scan.repoRoot)) {
      const targetRepo = repoByPackage.get(depName);
      if (!targetRepo || targetRepo === scan.repo) continue;
      edges.push(
        edge(`edge:${scan.repo}:depends_on:${targetRepo}`, 'depends_on', repoId, `repo:${targetRepo}`, ['package.json'], {
          dependencyName: depName
        })
      );
    }
  }

  for (const alias of aliases) {
    const aliasId = `alias:${alias.name}`;
    nodes.push(
      node(aliasId, 'alias', alias.name, 'ecosystem-os', alias.path, [], {
        target: alias.target,
        mapsToRepo: alias.mapsToRepo
      })
    );
    if (alias.mapsToRepo) {
      edges.push(
        edge(`edge:${alias.name}:maps_to:${alias.mapsToRepo}`, 'maps_to', aliasId, `repo:${alias.mapsToRepo}`, [], {
          symlinkTarget: alias.target
        })
      );
    } else {
      issues.push(`${alias.name}: symlink does not map to a known repo`);
    }
  }

  nodes.sort((a, b) => a.id.localeCompare(b.id));
  edges.sort((a, b) => a.id.localeCompare(b.id));

  const presentRepos = scans.filter((scan) => scan.repoPresent).length;
  const summary = {
    repoCount: scans.length,
    presentRepos,
    missingRepos: scans.length - presentRepos,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    aliasCount: aliases.length,
    configNodeCount: nodes.filter((item) => item.type === 'config').length,
    evidenceNodeCount: nodes.filter((item) => item.type === 'evidence').length,
    blockerNodeCount: nodes.filter((item) => item.type === 'blocker').length
  };

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/graph-snapshot/v1',
    generatedAt: new Date().toISOString(),
    repo: 'ecosystem-os',
    phase: 'phase-2-fleet-graph-snapshot',
    ok: summary.missingRepos === 0 && issues.length === 0,
    summary,
    contracts: {
      graphConfig: 'pm/spec/kaleidoscope-ai/graph-config.schema.json',
      graphSnapshot: 'pm/spec/kaleidoscope-ai/graph-snapshot.schema.json'
    },
    nodes,
    edges,
    aliases,
    issues
  };
}

function main() {
  const graph = buildGraph();

  if (WRITE) {
    mkdirSync(dirname(WITNESS), { recursive: true });
    writeFileSync(WITNESS, `${JSON.stringify(graph, null, 2)}\n`);
  }

  console.log('\n=== kaleidoscope:graph-snapshot:check ===\n');
  console.log(`repos: ${graph.summary.repoCount}`);
  console.log(`present-repos: ${graph.summary.presentRepos}`);
  console.log(`missing-repos: ${graph.summary.missingRepos}`);
  console.log(`nodes: ${graph.summary.nodeCount}`);
  console.log(`edges: ${graph.summary.edgeCount}`);
  console.log(`aliases: ${graph.summary.aliasCount}`);
  console.log(`blockers: ${graph.summary.blockerNodeCount}`);
  console.log(`ok: ${graph.ok}`);
  if (WRITE) console.log(`witness: ${relative(REPO, WITNESS)}`);
  for (const issue of graph.issues) console.log(`issue: ${issue}`);

  process.exit(graph.ok ? 0 : 1);
}

main();
