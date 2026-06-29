#!/usr/bin/env node
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-phase-2-completion-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/phase-2-completion-latest.md';
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

const SOURCES = {
  graphRagMcp: 'audit/evidence/kaleidoscope-graph-rag-mcp-latest.json',
  graphSnapshot: 'audit/evidence/kaleidoscope-graph-snapshot-latest.json',
  query: 'audit/evidence/kaleidoscope-query-service-latest.json',
  observatory: 'audit/evidence/kaleidoscope-observatory-latest.json',
  decisionRoom: 'audit/evidence/kaleidoscope-decision-room-latest.json',
  signal: 'audit/evidence/signal-fleet-latest.json',
  executionStudio: 'audit/evidence/kaleidoscope-execution-studio-latest.json',
  partnerBrief: 'audit/evidence/kaleidoscope-partner-brief-latest.json',
  releaseGates: 'audit/evidence/kaleidoscope-release-gates-latest.json',
  operatingLoop: 'audit/evidence/kaleidoscope-operating-loop-latest.json',
  phase2Architecture: 'docs/business/research/kaleidoscope-ai/phase-2-agentic-product-architecture.md',
  releaseDoctrine: 'docs/business/research/kaleidoscope-ai/evidence-eval-safety-release-gates.md'
};

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(REPO, rel), 'utf8'));
}

function sourceDate(rel) {
  return statSync(join(REPO, rel)).mtime.toISOString();
}

function source(rel, reason) {
  return { path: rel, sourceDate: sourceDate(rel), reason };
}

function gate(id, label, passed, evidence, failureMode) {
  return {
    id,
    label,
    passed,
    severity: passed ? 'none' : 'blocker',
    evidence,
    failureMode
  };
}

function buildWitness() {
  const generatedAt = new Date().toISOString();
  const graphRagMcp = readJson(SOURCES.graphRagMcp);
  const graphSnapshot = readJson(SOURCES.graphSnapshot);
  const query = readJson(SOURCES.query);
  const observatory = readJson(SOURCES.observatory);
  const decisionRoom = readJson(SOURCES.decisionRoom);
  const signal = readJson(SOURCES.signal);
  const executionStudio = readJson(SOURCES.executionStudio);
  const partnerBrief = readJson(SOURCES.partnerBrief);
  const releaseGates = readJson(SOURCES.releaseGates);
  const operatingLoop = readJson(SOURCES.operatingLoop);

  const repoCount = graphRagMcp.summary?.repoCount ?? signal.summary?.repoCount ?? observatory.summary?.repoCount ?? null;
  const graphRagMcpReady = graphRagMcp.summary?.ready === repoCount && graphRagMcp.summary?.averageScore === 100;
  const graphSnapshotComplete =
    graphSnapshot.ok === true &&
    graphSnapshot.summary?.presentRepos === repoCount &&
    graphSnapshot.summary?.missingRepos === 0 &&
    graphSnapshot.summary?.blockerNodeCount === 0;
  const queryComplete = query.ok === true && query.summary?.passedQueries === query.summary?.queryCount;
  const observatoryComplete =
    observatory.ok === true &&
    observatory.summary?.readyRepos === repoCount &&
    observatory.summary?.blockerCount === 0 &&
    observatory.summary?.commercialEvidenceCompleteRepos === repoCount;
  const decisionRoomComplete =
    decisionRoom.ok === true &&
    decisionRoom.summary?.unsupportedClaimWarnings === 0 &&
    decisionRoom.summary?.staleEvidenceWarnings === 0 &&
    decisionRoom.summary?.averageConfidence >= 0.8;
  const signalComplete =
    signal.ok === true &&
    signal.summary?.generatedRepoWitnesses === repoCount &&
    signal.summary?.graphRagMcpReadyRepos === repoCount &&
    signal.summary?.mprRelationAvailableRepos === repoCount;
  const executionStudioComplete =
    executionStudio.ok === true &&
    executionStudio.summary?.actionCount === 0 &&
    executionStudio.summary?.approvalPendingActions === 0 &&
    executionStudio.summary?.releaseBlockedActions === 0;
  const partnerBriefComplete =
    partnerBrief.ok === true &&
    partnerBrief.summary?.externalUse === 'blocked_until_explicit_approval' &&
    partnerBrief.summary?.approvalStatus === 'draft_pending_approval';
  const releaseComplete =
    releaseGates.ok === true &&
    releaseGates.releaseDecision === 'internal-draft-release-pass' &&
    releaseGates.externalUse?.status === 'blocked_until_explicit_approval';
  const operatingLoopComplete =
    operatingLoop.ok === true &&
    operatingLoop.summary?.passedStages === operatingLoop.summary?.stageCount &&
    operatingLoop.summary?.approvalPendingActions === 0 &&
    operatingLoop.summary?.externalUse === 'blocked_until_explicit_approval';

  const gates = [
    gate(
      'graph-rag-mcp-restored',
      'Graph, RAG, MCP, and eval configs are restored across the fleet',
      graphRagMcp.restored === true && graphRagMcpReady,
      [source(SOURCES.graphRagMcp, 'fleet graph/RAG/MCP readiness witness')],
      'Phase 2 cannot close while any real repo lacks complete graph/RAG/MCP/eval config readiness.'
    ),
    gate(
      'graph-snapshot-complete',
      'Typed ecosystem graph snapshot covers every real repo',
      graphSnapshotComplete,
      [source(SOURCES.graphSnapshot, 'fleet graph snapshot witness')],
      'Phase 2 cannot close without a complete typed graph snapshot and zero graph blockers.'
    ),
    gate(
      'query-service-golden-eval-green',
      'Unified query service passes golden strategic questions',
      queryComplete,
      [source(SOURCES.query, 'query service golden-question witness')],
      'Phase 2 cannot close while strategic retrieval questions fail their deterministic eval.'
    ),
    gate(
      'observatory-fleet-truth-green',
      'Observatory has current fleet truth and commercial evidence coverage',
      observatoryComplete,
      [source(SOURCES.observatory, 'Observatory witness')],
      'Phase 2 cannot close unless the Observatory can summarize readiness, blockers, movement, and commercial evidence for every real repo.'
    ),
    gate(
      'decision-room-eval-green',
      'Decision Room answers pass citation, freshness, confidence, and unsupported-claim gates',
      decisionRoomComplete,
      [source(SOURCES.decisionRoom, 'Decision Room strategic Q&A witness')],
      'Phase 2 cannot close while strategic answers contain unsupported claims, stale evidence warnings, or low confidence.'
    ),
    gate(
      'signal-mpr-relation-green',
      'SIGNAL and MPR relation evidence is explicit for every real repo',
      signalComplete,
      [source(SOURCES.signal, 'SIGNAL fleet witness')],
      'Phase 2 cannot close unless every real repo has generated SIGNAL evidence and an explicit MPR relation.'
    ),
    gate(
      'execution-studio-queue-clear',
      'Execution Studio has no remaining draft actions or approval-pending work',
      executionStudioComplete,
      [source(SOURCES.executionStudio, 'Execution Studio witness')],
      'Phase 2 cannot close while valid draft actions remain unresolved or approval-pending.'
    ),
    gate(
      'partner-brief-internal-only',
      'Partner brief remains internal-only and approval-gated',
      partnerBriefComplete,
      [source(SOURCES.partnerBrief, 'partner brief boundary witness')],
      'Phase 2 cannot close if partner/investor-facing narratives can cross the external-use boundary without explicit approval.'
    ),
    gate(
      'release-gates-pass',
      'Internal draft release gates pass with external use blocked',
      releaseComplete,
      [source(SOURCES.releaseGates, 'release-gates witness')],
      'Phase 2 cannot close unless the release-gate bundle is green and external use remains blocked.'
    ),
    gate(
      'operating-loop-green',
      'Full Kaleidoscope operating loop is green',
      operatingLoopComplete,
      [source(SOURCES.operatingLoop, 'operating-loop witness')],
      'Phase 2 cannot close unless the full ordered stage chain passes locally.'
    )
  ];

  const blockers = gates.filter((item) => !item.passed);
  const phase3Readiness = [
    {
      id: 'trace-and-eval-sinks',
      ownerRepos: ['fabric-os', 'bridge-os', 'baseline-os'],
      status: 'ready_to_spec',
      why: 'SIGNAL L3 remains capped until durable traces, eval sinks, rollback evidence, and learning-loop evidence exist.'
    },
    {
      id: 'product-surface-api',
      ownerRepos: ['ecosystem-os', 'baseline-os'],
      status: 'ready_to_spec',
      why: 'The current product is generated evidence and reports; Phase 3 should turn Observatory, Decision Room, Signal Lab, and Execution Studio into API/UI surfaces.'
    },
    {
      id: 'partner-proof-packets',
      ownerRepos: ['ecosystem-os', 'agile-os', 'canon-os'],
      status: 'approval_required_before_external_use',
      why: 'Partner proof packets can now be assembled from evidence, but each external artifact still needs explicit approval.'
    }
  ];

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/phase-2-completion/v1',
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    phase: 'phase-2-completion-readiness',
    ok: blockers.length === 0,
    decision: blockers.length === 0 ? 'phase-2-complete-for-internal-draft-use' : 'blocked',
    externalUse: {
      status: 'blocked_until_explicit_approval',
      reason: 'Phase 2 completion only authorizes internal draft use. Partner-facing, investor-facing, deployment, and repo-write actions still require explicit approval.'
    },
    summary: {
      repoCount,
      gateCount: gates.length,
      passedGates: gates.filter((item) => item.passed).length,
      failedGates: blockers.length,
      blockers: blockers.map((item) => item.id),
      releaseDecision: releaseGates.releaseDecision,
      operatingLoopStages: `${operatingLoop.summary?.passedStages}/${operatingLoop.summary?.stageCount}`,
      executionStudioActions: executionStudio.summary?.actionCount,
      approvalPendingActions: executionStudio.summary?.approvalPendingActions,
      signalAverageOverallScore100: signal.summary?.averageOverallScore100,
      graphRagMcpReadyRepos: signal.summary?.graphRagMcpReadyRepos
    },
    gates,
    phase3Readiness,
    sources: SOURCES,
    contracts: {
      phase2Completion: 'pm/spec/kaleidoscope-ai/phase-2-completion.schema.json',
      operatingLoop: 'pm/spec/kaleidoscope-ai/operating-loop.schema.json',
      releaseGates: 'pm/spec/kaleidoscope-ai/release-gates.schema.json'
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI phase 2 completion latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'phase-2', 'release-gates', 'operating-loop']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI phase 2 completion latest',
    '',
    '> Generated by `pnpm kaleidoscope:phase-2:write`.',
    '',
    '## Summary',
    '',
    `- Decision: ${witness.decision}`,
    `- Gates: ${witness.summary.passedGates}/${witness.summary.gateCount} passed`,
    `- Failed gates: ${witness.summary.failedGates}`,
    `- Operating loop stages: ${witness.summary.operatingLoopStages}`,
    `- Execution Studio actions: ${witness.summary.executionStudioActions}`,
    `- Approval pending actions: ${witness.summary.approvalPendingActions}`,
    `- Graph/RAG/MCP ready repos: ${witness.summary.graphRagMcpReadyRepos}/${witness.summary.repoCount}`,
    `- SIGNAL average overall score: ${witness.summary.signalAverageOverallScore100}`,
    `- External use: ${witness.externalUse.status}`,
    '',
    '## Completion gates',
    '',
    '| Gate | Status | Failure mode |',
    '| --- | --- | --- |'
  ];

  for (const item of witness.gates) {
    lines.push(`| ${item.id} | ${item.passed ? 'pass' : 'fail'} | ${item.failureMode} |`);
  }

  lines.push('', '## Phase 3 readiness', '');
  lines.push('| Workstream | Owner repos | Status | Why |');
  lines.push('| --- | --- | --- | --- |');
  for (const item of witness.phase3Readiness) {
    lines.push(`| ${item.id} | ${item.ownerRepos.join(', ')} | ${item.status} | ${item.why} |`);
  }

  lines.push('', '## Boundary', '');
  lines.push(witness.externalUse.reason);
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

  console.log('\n=== kaleidoscope:phase-2:check ===\n');
  console.log(`decision: ${witness.decision}`);
  console.log(`gates: ${witness.summary.passedGates}/${witness.summary.gateCount}`);
  console.log(`failed: ${witness.summary.failedGates}`);
  console.log(`operating-loop: ${witness.summary.operatingLoopStages}`);
  console.log(`execution-actions: ${witness.summary.executionStudioActions}`);
  console.log(`approval-pending: ${witness.summary.approvalPendingActions}`);
  console.log(`external-use: ${witness.externalUse.status}`);
  console.log(`ok: ${witness.ok}`);
  if (WRITE) {
    console.log(`witness: ${OUT_REL}`);
    console.log(`report: ${REPORT_REL}`);
  }
  for (const blocker of witness.summary.blockers) {
    console.log(`blocker: ${blocker}`);
  }
  process.exitCode = witness.ok ? 0 : 1;
}

main();
