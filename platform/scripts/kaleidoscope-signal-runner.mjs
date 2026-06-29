#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ECOSYSTEM_ROOT = resolve(REPO, '..');
const GRAPH_REL = 'audit/evidence/kaleidoscope-graph-snapshot-latest.json';
const OUT_REL = 'audit/evidence/signal-fleet-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/signal-fleet-latest.md';
const MPR_RELATION_GAP_REL = 'audit/evidence/mpr-relation-gap-latest.json';
const OUT = join(REPO, OUT_REL);
const REPORT = join(REPO, REPORT_REL);
const WRITE = process.argv.includes('--write');
const JSON_OUT = process.argv.includes('--json');
const LOCAL_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Johannesburg',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const DIMENSIONS = ['systemsArchitecture', 'tooling', 'process', 'safeguards', 'monitoring', 'teamOwnership'];
const LEVEL_ORDER = { L0: 0, L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 };
const LEVEL_SCORE = { L0: 8, L1: 25, L2: 45, L3: 60, L4: 76, L5: 92 };
const PRODUCT_REPO_HINTS = [
  'gtcx-os',
  'markets-os',
  'compliance-os',
  'ledger-ui',
  'griot-ai',
  'nyota-ai',
  'sensei-os',
  'terra-os',
  'veritas-ai',
  'venture-os',
  'exploration-os',
  'inspection-os',
  'ledger-os',
  'ecosystem-os'
];

function readText(absOrRel) {
  return readFileSync(absOrRel.startsWith('/') ? absOrRel : join(REPO, absOrRel), 'utf8');
}

function maybeJson(absOrRel) {
  const path = absOrRel.startsWith('/') ? absOrRel : join(REPO, absOrRel);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readText(path));
  } catch {
    return null;
  }
}

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function mtimeIso(absOrRel) {
  const path = absOrRel.startsWith('/') ? absOrRel : join(REPO, absOrRel);
  try {
    return statSync(path).mtime.toISOString();
  } catch {
    return null;
  }
}

function levelMin(levels) {
  return levels.reduce((min, level) => (LEVEL_ORDER[level] < LEVEL_ORDER[min] ? level : min), 'L5');
}

function levelCounts(rows, key) {
  return rows.reduce((acc, row) => {
    const level = key(row);
    acc[level] = (acc[level] ?? 0) + 1;
    return acc;
  }, {});
}

function average(rows, key) {
  if (rows.length === 0) return 0;
  return Math.round((rows.reduce((sum, row) => sum + key(row), 0) / rows.length) * 100) / 100;
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function graphEvidence(graph, repo) {
  const nodes = graph.nodes.filter((node) => node.repo === repo);
  const configs = Object.fromEntries(
    nodes
      .filter((node) => node.type === 'config')
      .map((node) => [
        node.properties?.kind,
        {
          present: node.properties?.present === true,
          ok: node.properties?.ok === true,
          source: node.source,
          issues: node.properties?.issues ?? []
        }
      ])
  );
  const tools = nodes
    .filter((node) => node.type === 'tool')
    .map((node) => ({
      name: node.label,
      permissionClass: node.properties?.permissionClass ?? 'unknown',
      source: node.source,
      description: node.properties?.description ?? ''
    }));
  const blockers = nodes.filter((node) => node.type === 'blocker');
  return { nodes, configs, tools, blockers };
}

function configOk(evidence, kind) {
  return evidence.configs[kind]?.present === true && evidence.configs[kind]?.ok === true;
}

function allCoreConfigsOk(evidence) {
  return ['graph', 'rag', 'mcp', 'eval'].every((kind) => configOk(evidence, kind));
}

function anyCoreConfigPresent(evidence) {
  return ['graph', 'rag', 'mcp', 'eval'].some((kind) => evidence.configs[kind]?.present === true);
}

function explicitNoMprRelation(repo) {
  const witness = maybeJson(MPR_RELATION_GAP_REL);
  const row = witness?.gaps?.find((item) => item.repo === repo);
  const relation = String(row?.currentMprRelation ?? '');
  if (!row || !relation.includes('explicit-no-mpr')) return null;
  return {
    source: `${MPR_RELATION_GAP_REL}#${repo}`,
    evaluatedAt: witness.generatedAt ?? mtimeIso(MPR_RELATION_GAP_REL),
    scoreChangeAllowed: row.scoreChangeAllowed === true,
    approvalStatus: witness.approval?.status ?? null,
    reason: row.recommendedResolution ?? null
  };
}

function mprForRepo(repo) {
  const rel = `${repo}/audit/evidence/mpr-repo-latest.json`;
  const abs = join(ECOSYSTEM_ROOT, rel);
  const witness = maybeJson(abs);
  if (!witness) {
    const explicitRelation = explicitNoMprRelation(repo);
    if (explicitRelation) {
      return {
        available: true,
        relationType: 'explicit-no-mpr-relation',
        source: explicitRelation.source,
        composite100: null,
        evaluatedAt: explicitRelation.evaluatedAt,
        agenticEmpowerment100: null,
        scoreChangeAllowed: explicitRelation.scoreChangeAllowed,
        approvalStatus: explicitRelation.approvalStatus,
        reason: explicitRelation.reason
      };
    }
    return {
      available: false,
      relationType: 'missing',
      source: 'missing',
      composite100: null,
      evaluatedAt: null,
      agenticEmpowerment100: null,
      scoreChangeAllowed: false,
      approvalStatus: null,
      reason: null
    };
  }
  const agentic = witness.quadrants?.agenticEmpowerment;
  return {
    available: true,
    relationType: 'repo-mpr',
    source: rel,
    composite100: witness.composite100 ?? witness.fullComposite100 ?? null,
    evaluatedAt: witness.evaluatedAt ?? mtimeIso(abs),
    agenticEmpowerment100: agentic?.score100 ?? null,
    scoreChangeAllowed: true,
    approvalStatus: 'repo-owned',
    reason: null
  };
}

function repoIsProduct(repo, repoNode) {
  const role = String(repoNode.properties?.role ?? '').toLowerCase();
  return (
    PRODUCT_REPO_HINTS.includes(repo) ||
    role.includes('product') ||
    role.includes('market') ||
    role.includes('compliance') ||
    role.includes('intelligence') ||
    role.includes('verification') ||
    role.includes('workflow')
  );
}

function dimension(level, evidence, gaps) {
  return {
    level,
    score100: LEVEL_SCORE[level],
    evidence: unique(evidence),
    gaps: unique(gaps)
  };
}

function scoreSignalE(repo, repoNode, evidence, mpr) {
  const allConfigs = allCoreConfigsOk(evidence);
  const anyConfig = anyCoreConfigPresent(evidence);
  const mprScoreEligible = mpr.scoreChangeAllowed === true;
  const hasReadTool = evidence.tools.some((tool) => tool.permissionClass === 'read');
  const hasWriteTool = evidence.tools.some((tool) => tool.permissionClass === 'write');
  const hasPermissionedTools = evidence.tools.length > 0 && evidence.tools.every((tool) => tool.permissionClass !== 'unknown');
  const graphRefs = Object.values(evidence.configs)
    .map((item) => item.source)
    .filter(Boolean);
  const mprRef = mpr.available ? [mpr.source] : [];
  const commonL3Gap = 'No distributed trace, policy-control, or learning-loop evidence is published yet.';
  const mprGap = mpr.available
    ? 'MPR relation is explicit but cannot raise process scoring until repo evidence or approval allows score changes.'
    : 'Publish repo MPR evidence.';

  return {
    systemsArchitecture: dimension(
      allConfigs ? 'L2' : anyConfig ? 'L1' : 'L0',
      allConfigs || anyConfig ? graphRefs : [],
      allConfigs ? [commonL3Gap] : ['Publish graph, RAG, MCP, and eval configs.']
    ),
    tooling: dimension(
      allConfigs && hasReadTool ? 'L2' : evidence.tools.length > 0 || anyConfig ? 'L1' : 'L0',
      [...graphRefs, ...evidence.tools.map((tool) => tool.source)].filter(Boolean),
      hasReadTool ? [commonL3Gap] : ['Publish at least one read-scoped MCP tool boundary.']
    ),
    process: dimension(
      mprScoreEligible && allConfigs ? 'L2' : mprScoreEligible || anyConfig ? 'L1' : 'L0',
      [...mprRef, ...graphRefs],
      mprScoreEligible ? ['Connect SIGNAL deltas to recurring planning and release gates.'] : [mprGap]
    ),
    safeguards: dimension(
      allConfigs && hasPermissionedTools ? 'L2' : hasPermissionedTools || configOk(evidence, 'eval') ? 'L1' : 'L0',
      [...graphRefs, ...evidence.tools.map((tool) => tool.source)].filter(Boolean),
      hasWriteTool
        ? ['Add approval tokens, audit logs, and rollback evidence before L3/L4 claims.']
        : ['Publish permissioned tool boundaries and approval policy evidence.']
    ),
    monitoring: dimension(
      configOk(evidence, 'eval') && mprScoreEligible ? 'L2' : configOk(evidence, 'eval') || mprScoreEligible ? 'L1' : 'L0',
      [...mprRef, evidence.configs.eval?.source].filter(Boolean),
      ['Publish traces/eval results tied to agentic workflows before L3.']
    ),
    teamOwnership: dimension(
      repoNode.properties?.role && repoNode.properties?.targetStatus ? 'L2' : repoNode.properties?.role ? 'L1' : 'L0',
      ['audit/evidence/kaleidoscope-graph-snapshot-latest.json'],
      ['Add named owner, release gate, and escalation path for SIGNAL improvements.']
    )
  };
}

function scoreSignalP(repo, repoNode, evidence, mpr) {
  const product = repoIsProduct(repo, repoNode);
  const allConfigs = allCoreConfigsOk(evidence);
  const mprScoreEligible = mpr.scoreChangeAllowed === true;
  const hasContextTool = evidence.tools.some((tool) => /context|product|market|read|search/i.test(`${tool.name} ${tool.description}`));
  const mprRef = mpr.available ? [mpr.source] : [];
  const commonGap = 'No production user-facing AI trace, eval, or feedback loop is published yet.';

  return {
    systemsArchitecture: dimension(
      product && allConfigs ? 'L2' : product || allConfigs ? 'L1' : 'L0',
      Object.values(evidence.configs).map((item) => item.source).filter(Boolean),
      product ? [commonGap] : ['Define product-intelligence surface or mark repo as infrastructure-only.']
    ),
    tooling: dimension(
      product && hasContextTool ? 'L2' : hasContextTool || product || allConfigs ? 'L1' : 'L0',
      evidence.tools.map((tool) => tool.source).filter(Boolean),
      hasContextTool ? [commonGap] : ['Publish user/problem/context retrieval tooling.']
    ),
    process: dimension(
      product && mprScoreEligible ? 'L2' : product || mprScoreEligible || allConfigs ? 'L1' : 'L0',
      mprRef,
      ['Connect product-intelligence findings to roadmap, QA, and release evidence.']
    ),
    safeguards: dimension(
      product && configOk(evidence, 'eval') ? 'L2' : configOk(evidence, 'eval') || product ? 'L1' : 'L0',
      [evidence.configs.eval?.source].filter(Boolean),
      ['Publish hallucination, approval, and user-impact safeguards for AI product outputs.']
    ),
    monitoring: dimension(
      product && mprScoreEligible && configOk(evidence, 'eval') ? 'L2' : mprScoreEligible || configOk(evidence, 'eval') ? 'L1' : 'L0',
      [...mprRef, evidence.configs.eval?.source].filter(Boolean),
      ['Publish product-feedback, trace, and answer-quality metrics.']
    ),
    teamOwnership: dimension(
      product && repoNode.properties?.role ? 'L2' : repoNode.properties?.role ? 'L1' : 'L0',
      ['audit/evidence/kaleidoscope-graph-snapshot-latest.json'],
      ['Name product owner and SIGNAL-P uplift lane.']
    )
  };
}

function axisSummary(axisName, dimensions) {
  const entries = Object.entries(dimensions);
  const lowestLevel = levelMin(entries.map(([, value]) => value.level));
  const lowestDimension = entries.find(([, value]) => value.level === lowestLevel)?.[0] ?? DIMENSIONS[0];
  const score100 = Math.min(...entries.map(([, value]) => value.score100));
  return {
    level: lowestLevel,
    score100,
    lowestDimension,
    published: true,
    summary: `${axisName} limited by ${lowestDimension}.`
  };
}

function graphRagMcpSummary(evidence) {
  const allConfigs = allCoreConfigsOk(evidence);
  const anyConfig = anyCoreConfigPresent(evidence);
  const witnesses = Object.entries(evidence.configs)
    .filter(([, value]) => value.present)
    .map(([kind, value]) => ({
      type: 'config',
      ref: value.source,
      label: `${kind} config`,
      status: value.ok ? 'pass' : 'fail'
    }));
  return {
    state: allConfigs ? 'currentRepoWitness' : anyConfig ? 'partialConfig' : 'missingConfig',
    signalELevelCeiling: allConfigs ? 'L2' : anyConfig ? 'L1' : 'L0',
    witnesses,
    notes: allConfigs ? [] : ['Graph/RAG/MCP/eval config set is incomplete or failing.']
  };
}

function buildResult(graph, repoNode) {
  const repo = repoNode.repo;
  const evidence = graphEvidence(graph, repo);
  const mpr = mprForRepo(repo);
  const signalPDimensions = scoreSignalP(repo, repoNode, evidence, mpr);
  const signalEDimensions = scoreSignalE(repo, repoNode, evidence, mpr);
  const signalP = axisSummary('SIGNAL-P', signalPDimensions);
  const signalE = axisSummary('SIGNAL-E', signalEDimensions);
  const overallLevel = levelMin([signalP.level, signalE.level]);
  const overallScore100 = Math.min(signalP.score100, signalE.score100);
  const evidenceGaps = [
    ...Object.values(signalPDimensions).flatMap((item) => item.gaps),
    ...Object.values(signalEDimensions).flatMap((item) => item.gaps)
  ];
  const uniqueGaps = [...new Set(evidenceGaps)];
  const enoughEvidence = repoNode.properties?.present === true && evidence.nodes.length > 0;
  const signalEUnlock = !allCoreConfigsOk(evidence)
    ? 'Publish complete graph, RAG, MCP, and eval config evidence to unlock SIGNAL-E L2.'
    : mpr.relationType === 'explicit-no-mpr-relation'
      ? 'Publish repo MPR evidence or approve score movement for the explicit no-MPR relation to unlock SIGNAL-E process evidence.'
      : !mpr.scoreChangeAllowed
        ? 'Publish repo MPR evidence or an explicit no-MPR relation witness to unlock SIGNAL-E process evidence.'
      : 'Add trace, policy, approval, and learning-loop evidence to unlock SIGNAL-E L3.';
  const signalPUnlock =
    signalP.level === 'L2'
      ? 'Connect product AI outputs to evals, feedback, and release gates to unlock SIGNAL-P L3.'
      : repoIsProduct(repo, repoNode)
        ? 'Define product-intelligence surface, context tooling, and safeguards to unlock SIGNAL-P L2.'
        : 'Mark repo as infrastructure-only or define a product-intelligence surface before raising SIGNAL-P.';

  return {
    repo,
    scope: 'repo',
    witnessStatus: enoughEvidence ? 'generated' : 'not-enough-evidence',
    role: repoNode.properties?.role ?? null,
    targetStatus: repoNode.properties?.targetStatus ?? null,
    signalP,
    signalE,
    overallLevel,
    overallScore100,
    dimensions: {
      signalP: signalPDimensions,
      signalE: signalEDimensions
    },
    graphRagMcp: graphRagMcpSummary(evidence),
    mprRelation: {
      available: mpr.available,
      relationType: mpr.relationType,
      source: mpr.source,
      composite100: mpr.composite100,
      agenticEmpowerment100: mpr.agenticEmpowerment100,
      scoreChangeAllowed: mpr.scoreChangeAllowed,
      approvalStatus: mpr.approvalStatus,
      relation:
        mpr.relationType === 'explicit-no-mpr-relation'
          ? 'Repo-local MPR is intentionally absent; the ecosystem witness makes the relation explicit while keeping SIGNAL scoring conservative.'
          : mpr.agenticEmpowerment100 === null
            ? 'MPR agenticEmpowerment pillar is not published separately; SIGNAL is used as the explanatory maturity lens.'
            : 'MPR agenticEmpowerment should reference SIGNAL level and bottlenecks instead of duplicating them.'
    },
    bottlenecks: [
      `${signalP.lowestDimension} limits SIGNAL-P to ${signalP.level}`,
      `${signalE.lowestDimension} limits SIGNAL-E to ${signalE.level}`,
      ...uniqueGaps.slice(0, 4)
    ],
    nextUnlocks: [
      signalEUnlock,
      signalPUnlock,
      'Wire SIGNAL deltas into MPR agenticEmpowerment, Observatory, and Decision Room prioritization.'
    ],
    evidenceGaps: uniqueGaps
  };
}

function buildWitness() {
  const graph = maybeJson(GRAPH_REL);
  const issues = [];
  if (!graph) {
    issues.push(`missing graph snapshot: ${GRAPH_REL}`);
  }
  if (graph && graph.ok !== true) {
    issues.push('graph snapshot is not ok');
  }

  const repoNodes = graph?.nodes
    ?.filter((node) => node.type === 'repo' && node.properties?.present === true)
    ?.sort((a, b) => a.repo.localeCompare(b.repo)) ?? [];
  const results = graph ? repoNodes.map((repoNode) => buildResult(graph, repoNode)) : [];
  const generatedAt = new Date().toISOString();
  const mprAvailable = results.filter((row) => row.mprRelation.available).length;
  const graphReady = results.filter((row) => row.graphRagMcp.state === 'currentRepoWitness').length;
  const summary = {
    repoCount: results.length,
    generatedRepoWitnesses: results.filter((row) => row.witnessStatus === 'generated').length,
    notEnoughEvidenceWitnesses: results.filter((row) => row.witnessStatus === 'not-enough-evidence').length,
    averageOverallScore100: average(results, (row) => row.overallScore100),
    averageSignalPScore100: average(results, (row) => row.signalP.score100),
    averageSignalEScore100: average(results, (row) => row.signalE.score100),
    overallLevelCounts: levelCounts(results, (row) => row.overallLevel),
    signalPLevelCounts: levelCounts(results, (row) => row.signalP.level),
    signalELevelCounts: levelCounts(results, (row) => row.signalE.level),
    graphRagMcpReadyRepos: graphReady,
    mprRelationAvailableRepos: mprAvailable
  };

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/signal-fleet/v1',
    scope: 'fleet',
    ok: issues.length === 0 && summary.generatedRepoWitnesses + summary.notEnoughEvidenceWitnesses === summary.repoCount,
    evaluatedAt: generatedAt,
    date: localDate(generatedAt),
    repoCount: summary.repoCount,
    summary,
    results,
    issues,
    sources: {
      graphSnapshot: GRAPH_REL,
      mprRepo: '../*/audit/evidence/mpr-repo-latest.json',
      mprRelationGap: MPR_RELATION_GAP_REL,
      frameworkPlan: 'docs/business/research/kaleidoscope-ai/signal-mpr-integration-plan.md'
    },
    schemaRefs: {
      signalFleet: 'pm/spec/kaleidoscope-ai/signal-fleet.schema.json'
    },
    source: 'platform/scripts/kaleidoscope-signal-runner.mjs'
  };
}

function renderReport(witness) {
  const levelText = (counts) =>
    Object.keys(LEVEL_ORDER)
      .map((level) => `${level}:${counts[level] ?? 0}`)
      .join(' ');
  const lines = [
    '---',
    'title: Kaleidoscope AI SIGNAL fleet latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'signal', 'mpr', 'agentic-maturity']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI SIGNAL fleet latest',
    '',
    '> Generated by `pnpm kaleidoscope:signal:write`.',
    '',
    '## Summary',
    '',
    `- Repos: ${witness.summary.repoCount}`,
    `- Generated repo witnesses: ${witness.summary.generatedRepoWitnesses}`,
    `- Not-enough-evidence witnesses: ${witness.summary.notEnoughEvidenceWitnesses}`,
    `- Average overall score: ${witness.summary.averageOverallScore100}`,
    `- SIGNAL-P levels: ${levelText(witness.summary.signalPLevelCounts)}`,
    `- SIGNAL-E levels: ${levelText(witness.summary.signalELevelCounts)}`,
    `- Graph/RAG/MCP ready repos: ${witness.summary.graphRagMcpReadyRepos}/${witness.summary.repoCount}`,
    `- MPR relation available: ${witness.summary.mprRelationAvailableRepos}/${witness.summary.repoCount}`,
    '',
    '## Calibration',
    '',
    'SIGNAL uses a ceiling rule: each axis is limited by its weakest dimension. Current graph/RAG/MCP and eval evidence can support L2, but L3+ requires published traces, policy controls, approval boundaries, and learning-loop evidence.',
    '',
    '## Repo results',
    '',
    '| Repo | SIGNAL-P | SIGNAL-E | Overall | Graph/RAG/MCP | MPR | Main bottleneck |',
    '| --- | ---: | ---: | ---: | --- | --- | --- |'
  ];

  for (const row of witness.results) {
    const mprDisplay =
      row.mprRelation.relationType === 'explicit-no-mpr-relation'
        ? 'explicit-no-score'
        : row.mprRelation.composite100 ?? 'n/a';
    lines.push(
      `| ${row.repo} | ${row.signalP.level} ${row.signalP.score100}/100 | ${row.signalE.level} ${row.signalE.score100}/100 | ${row.overallLevel} ${row.overallScore100}/100 | ${row.graphRagMcp.state} | ${mprDisplay} | ${row.signalE.lowestDimension} |`
    );
  }

  lines.push('', '## Next unlocks', '');
  const unlockRows = witness.results.slice().sort((a, b) => a.overallScore100 - b.overallScore100 || a.repo.localeCompare(b.repo));
  for (const row of unlockRows) {
    lines.push(`- ${row.repo}: ${row.nextUnlocks[0]}`);
  }

  return `${lines.join('\n')}\n`;
}

function main() {
  const witness = buildWitness();
  if (JSON_OUT) {
    console.log(JSON.stringify(witness, null, 2));
    return;
  }

  if (WRITE) {
    mkdirSync(dirname(OUT), { recursive: true });
    mkdirSync(dirname(REPORT), { recursive: true });
    writeFileSync(OUT, `${JSON.stringify(witness, null, 2)}\n`);
    writeFileSync(REPORT, renderReport(witness));
  }

  console.log('\n=== kaleidoscope:signal:check ===\n');
  console.log(`repos: ${witness.summary.repoCount}`);
  console.log(`generated-witnesses: ${witness.summary.generatedRepoWitnesses}`);
  console.log(`not-enough-evidence: ${witness.summary.notEnoughEvidenceWitnesses}`);
  console.log(`avg-overall-score: ${witness.summary.averageOverallScore100}`);
  console.log(`graph-rag-mcp-ready: ${witness.summary.graphRagMcpReadyRepos}`);
  console.log(`mpr-relation: ${witness.summary.mprRelationAvailableRepos}`);
  console.log(`ok: ${witness.ok}`);
  if (WRITE) {
    console.log(`witness: ${OUT_REL}`);
    console.log(`report: ${REPORT_REL}`);
  }
  for (const issue of witness.issues) {
    console.log(`issue: ${issue}`);
  }
  process.exitCode = witness.ok ? 0 : 1;
}

main();
