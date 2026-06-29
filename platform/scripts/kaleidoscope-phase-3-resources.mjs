#!/usr/bin/env node
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-phase-3-resources-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/phase-3-resources-latest.md';
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

const RESPONSE_SCHEMA = 'gtcx://ecosystem-os/kaleidoscope-ai/product-surface-api/v1';
const WITNESS_SCHEMA = 'gtcx://ecosystem-os/kaleidoscope-ai/phase-3-resources/v1';

const SOURCES = {
  graphRagMcp: 'audit/evidence/kaleidoscope-graph-rag-mcp-latest.json',
  graphSnapshot: 'audit/evidence/kaleidoscope-graph-snapshot-latest.json',
  query: 'audit/evidence/kaleidoscope-query-service-latest.json',
  observatory: 'audit/evidence/kaleidoscope-observatory-latest.json',
  decisionRoom: 'audit/evidence/kaleidoscope-decision-room-latest.json',
  signal: 'audit/evidence/signal-fleet-latest.json',
  releaseGates: 'audit/evidence/kaleidoscope-release-gates-latest.json',
  phase2: 'audit/evidence/kaleidoscope-phase-2-completion-latest.json',
  apiSpec: 'docs/business/research/kaleidoscope-ai/phase-3-product-surface-api.md',
  responseEnvelope: 'pm/spec/kaleidoscope-ai/product-surface-api.schema.json'
};

const RESOURCE_ORDER = ['fleet', 'graph', 'query', 'decision-room', 'signal', 'release', 'phase-2'];
const VALID_RESOURCES = new Set([
  'fleet',
  'graph',
  'query',
  'decision-room',
  'signal',
  'actions',
  'partner-room',
  'release',
  'phase-2'
]);
const VALID_MODES = new Set(['read', 'draft', 'write-request', 'external-request']);
const VALID_APPROVAL_STATUS = new Set([
  'not_required',
  'draft_pending_approval',
  'blocked_until_explicit_approval',
  'approved'
]);
const VALID_BOUNDARIES = new Set(['read', 'draft', 'write', 'external']);

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(REPO, rel), 'utf8'));
}

function sourceDate(rel) {
  return statSync(join(REPO, rel)).mtime.toISOString();
}

function citation(path, reason) {
  return { path, reason, sourceDate: sourceDate(path) };
}

function freshness(paths, generatedAt) {
  const sourceDates = paths.map((path) => ({ path, sourceDate: sourceDate(path) }));
  const generatedTime = new Date(generatedAt).getTime();
  const ages = sourceDates.map((item) => {
    const sourceTime = new Date(item.sourceDate).getTime();
    return Number.isFinite(sourceTime) ? (generatedTime - sourceTime) / 86_400_000 : Number.POSITIVE_INFINITY;
  });
  const staleCount = ages.filter((age) => age > 14).length;
  const mixedCount = ages.filter((age) => age > 7).length;
  const status = sourceDates.length === 0 ? 'unknown' : staleCount > 0 ? 'stale' : mixedCount > 0 ? 'mixed' : 'fresh';
  return { status, sourceDates };
}

function approvalReadOnly(reason = 'Read-only resource. No repo write, ticket creation, deployment, publication, partner contact, or external sharing is authorized.') {
  return {
    status: 'not_required',
    boundary: 'read',
    reason,
    approvalRecord: null
  };
}

function compactRepo(item) {
  return {
    repo: item.repo,
    tier: item.tier,
    role: item.role,
    readiness: item.readiness,
    blockers: item.blockers,
    signal: {
      level: item.signal?.level,
      score100: item.signal?.score100,
      bottlenecks: item.signal?.bottlenecks ?? []
    },
    mpr: item.mpr,
    evidenceFreshness: item.evidenceFreshness,
    commercialEvidence: {
      evidencedCategories: item.commercialEvidence?.evidencedCategories,
      categoryCount: item.commercialEvidence?.categoryCount,
      complete: item.commercialEvidence?.complete
    }
  };
}

function countsBy(items, selector) {
  return items.reduce((acc, item) => {
    const key = selector(item) ?? 'unknown';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function compactQuery(item) {
  return {
    id: item.id,
    query: item.query,
    route: item.route,
    routeReason: item.routeReason,
    answer: item.answer,
    confidence: item.confidence,
    ok: item.ok,
    issues: item.issues ?? [],
    citations: item.citations ?? [],
    freshness: item.freshness,
    retrieval: item.retrieval
  };
}

function compactDecision(item) {
  return {
    id: item.id,
    question: item.question,
    classification: item.classification,
    headline: item.answer?.headline,
    rationale: item.answer?.rationale ?? [],
    recommendedActions: item.answer?.recommendedActions ?? [],
    confidence: item.confidence,
    citations: item.citations ?? [],
    assumptions: item.assumptions ?? [],
    unsupportedClaims: item.unsupportedClaims ?? [],
    ok: item.ok,
    freshness: item.freshness,
    evaluation: item.evaluation
  };
}

function resource(resource, generatedAt, decision, paths, payload, extra = {}) {
  return {
    schema: RESPONSE_SCHEMA,
    resource,
    generatedAt,
    mode: 'read',
    decision,
    confidence: extra.confidence ?? null,
    freshness: freshness(paths, generatedAt),
    citations: paths.map((path) => citation(path, extra.reasons?.[path] ?? `${resource} source witness`)),
    assumptions: extra.assumptions ?? [],
    unsupportedClaims: extra.unsupportedClaims ?? [],
    approval: extra.approval ?? approvalReadOnly(),
    nextActions: extra.nextActions ?? [],
    witnesses: paths,
    payload
  };
}

function validateResponse(item) {
  const issues = [];
  if (item.schema !== RESPONSE_SCHEMA) issues.push('schema does not match product surface response envelope');
  if (!VALID_RESOURCES.has(item.resource)) issues.push(`invalid resource: ${item.resource}`);
  if (!item.generatedAt || Number.isNaN(new Date(item.generatedAt).getTime())) issues.push('generatedAt is not a date-time');
  if (!VALID_MODES.has(item.mode)) issues.push(`invalid mode: ${item.mode}`);
  if (!item.decision) issues.push('decision is required');
  if (!item.freshness || !['fresh', 'mixed', 'stale', 'unknown'].includes(item.freshness.status)) issues.push('freshness status is invalid');
  if (!Array.isArray(item.freshness?.sourceDates)) issues.push('freshness sourceDates is required');
  if (!Array.isArray(item.citations) || item.citations.length === 0) issues.push('citations are required');
  if (!item.citations?.every((entry) => entry.path && entry.reason)) issues.push('each citation must include path and reason');
  if (!VALID_APPROVAL_STATUS.has(item.approval?.status)) issues.push(`invalid approval status: ${item.approval?.status}`);
  if (!VALID_BOUNDARIES.has(item.approval?.boundary)) issues.push(`invalid approval boundary: ${item.approval?.boundary}`);
  if (!Array.isArray(item.witnesses) || item.witnesses.length === 0) issues.push('witnesses are required');
  if (item.mode === 'read' && item.approval?.status === 'approved' && item.approval?.boundary !== 'read') {
    issues.push('read resource cannot approve non-read boundary');
  }
  return { resource: item.resource, ok: issues.length === 0, issues };
}

function buildResponses(generatedAt) {
  const graphRagMcp = readJson(SOURCES.graphRagMcp);
  const graphSnapshot = readJson(SOURCES.graphSnapshot);
  const query = readJson(SOURCES.query);
  const observatory = readJson(SOURCES.observatory);
  const decisionRoom = readJson(SOURCES.decisionRoom);
  const signal = readJson(SOURCES.signal);
  const releaseGates = readJson(SOURCES.releaseGates);
  const phase2 = readJson(SOURCES.phase2);

  const graphPaths = [SOURCES.graphSnapshot, SOURCES.graphRagMcp];

  return [
    resource(
      'fleet',
      generatedAt,
      observatory.ok ? 'fleet-ready-read-only' : 'fleet-readiness-has-blockers',
      [SOURCES.observatory, SOURCES.graphRagMcp, SOURCES.signal],
      {
        route: '/kaleidoscope/fleet',
        summary: observatory.summary,
        repoCount: observatory.summary?.repoCount,
        readinessCounts: countsBy(observatory.repos ?? [], (item) => item.readiness?.maturity),
        commercialEvidenceCounts: countsBy(observatory.repos ?? [], (item) => (item.commercialEvidence?.complete ? 'complete' : 'gap')),
        repos: (observatory.repos ?? []).map(compactRepo)
      },
      {
        confidence: observatory.ok ? 0.95 : 0.75,
        reasons: {
          [SOURCES.observatory]: 'fleet readiness, blockers, freshness, commercial evidence, and aliases',
          [SOURCES.graphRagMcp]: 'graph/RAG/MCP/eval readiness by repo',
          [SOURCES.signal]: 'SIGNAL and MPR relation maturity by repo'
        }
      }
    ),
    resource(
      'graph',
      generatedAt,
      graphSnapshot.ok ? 'graph-snapshot-complete' : 'graph-snapshot-incomplete',
      graphPaths,
      {
        route: '/kaleidoscope/graph',
        summary: graphSnapshot.summary,
        nodeTypeCounts: countsBy(graphSnapshot.nodes ?? [], (item) => item.type),
        edgeTypeCounts: countsBy(graphSnapshot.edges ?? [], (item) => item.type),
        sampleNodes: (graphSnapshot.nodes ?? []).slice(0, 20).map((node) => ({
          id: node.id,
          type: node.type,
          repo: node.repo,
          label: node.label,
          source: node.source
        })),
        sampleEdges: (graphSnapshot.edges ?? []).slice(0, 20)
      },
      {
        confidence: graphSnapshot.ok ? 0.96 : 0.72,
        reasons: {
          [SOURCES.graphSnapshot]: 'typed fleet graph nodes, edges, blockers, aliases, and evidence links',
          [SOURCES.graphRagMcp]: 'source readiness for graph, RAG, MCP, and eval configs'
        }
      }
    ),
    resource(
      'query',
      generatedAt,
      query.ok ? 'query-golden-eval-pass' : 'query-golden-eval-fail',
      [SOURCES.query, SOURCES.graphSnapshot, SOURCES.responseEnvelope],
      {
        route: '/kaleidoscope/query',
        summary: query.summary,
        graphSnapshot: query.graphSnapshot,
        queries: (query.queries ?? []).map(compactQuery)
      },
      {
        confidence: query.summary?.averageConfidence ?? null,
        reasons: {
          [SOURCES.query]: 'golden strategic query answers, retrieval routes, citations, confidence, and freshness',
          [SOURCES.graphSnapshot]: 'typed graph source used by the query service',
          [SOURCES.responseEnvelope]: 'product-surface response envelope contract'
        }
      }
    ),
    resource(
      'decision-room',
      generatedAt,
      decisionRoom.ok ? 'decision-room-eval-pass' : 'decision-room-eval-fail',
      [SOURCES.decisionRoom, SOURCES.query, SOURCES.observatory, SOURCES.apiSpec],
      {
        route: '/kaleidoscope/decision-room',
        summary: decisionRoom.summary,
        questions: (decisionRoom.questions ?? []).map(compactDecision)
      },
      {
        confidence: decisionRoom.summary?.averageConfidence ?? null,
        reasons: {
          [SOURCES.decisionRoom]: 'strategic answers, evaluator gates, assumptions, unsupported-claim checks, citations, and freshness',
          [SOURCES.query]: 'retrieval quality and route-selected answer evidence',
          [SOURCES.observatory]: 'current fleet truth used by strategic decisions',
          [SOURCES.apiSpec]: 'Phase 3 product-surface requirement for Decision Room'
        },
        assumptions: [
          'Decision Room responses are internal strategic synthesis until external artifact approval is recorded.'
        ],
        nextActions: [
          {
            id: 'phase-3-decision-room-replay',
            ownerRepo: 'bridge-os',
            status: 'draft',
            validation: 'add deterministic replay command for a selected question and witness set'
          }
        ]
      }
    ),
    resource(
      'signal',
      generatedAt,
      signal.ok ? 'signal-fleet-witness-ready' : 'signal-fleet-witness-blocked',
      [SOURCES.signal, SOURCES.graphSnapshot, SOURCES.apiSpec],
      {
        route: '/kaleidoscope/signal',
        summary: signal.summary,
        overallLevelCounts: signal.summary?.overallLevelCounts,
        signalPLevelCounts: signal.summary?.signalPLevelCounts,
        signalELevelCounts: signal.summary?.signalELevelCounts,
        bottlenecksByRepo: (signal.results ?? []).map((item) => ({
          repo: item.repo,
          overallLevel: item.overallLevel,
          overallScore100: item.overallScore100,
          signalP: item.signalP,
          signalE: item.signalE,
          nextUnlocks: item.nextUnlocks ?? []
        }))
      },
      {
        confidence: signal.ok ? 0.9 : 0.65,
        reasons: {
          [SOURCES.signal]: 'SIGNAL-P, SIGNAL-E, MPR relation, and agentic maturity witness',
          [SOURCES.graphSnapshot]: 'repo graph and evidence lineage supporting SIGNAL relation checks',
          [SOURCES.apiSpec]: 'Phase 3 product-surface requirement for Signal Lab'
        },
        nextActions: [
          {
            id: 'phase-3-signal-l3-evidence',
            ownerRepo: 'fabric-os',
            status: 'draft',
            validation: 'publish trace, eval, rollback, approval, and learning-loop evidence before any SIGNAL L3 claim'
          }
        ]
      }
    ),
    resource(
      'release',
      generatedAt,
      releaseGates.releaseDecision,
      [SOURCES.releaseGates, SOURCES.phase2, SOURCES.responseEnvelope],
      {
        route: '/kaleidoscope/release',
        releaseDecision: releaseGates.releaseDecision,
        externalUse: releaseGates.externalUse,
        summary: releaseGates.summary,
        gates: releaseGates.gates
      },
      {
        confidence: releaseGates.ok ? 0.94 : 0.7,
        reasons: {
          [SOURCES.releaseGates]: 'eval, citation, freshness, confidence, approval, safety, and external-use gates',
          [SOURCES.phase2]: 'Phase 2 completion and Phase 3 readiness witness',
          [SOURCES.responseEnvelope]: 'approval-aware response envelope contract'
        },
        approval: {
          status: 'blocked_until_explicit_approval',
          boundary: 'external',
          reason: releaseGates.externalUse?.reason ?? 'External use remains blocked until a specific artifact and audience have explicit approval.',
          approvalRecord: null
        },
        nextActions: [
          {
            id: 'phase-3-external-approval-record',
            ownerRepo: 'canon-os',
            status: 'approval_required',
            validation: 'record artifact-specific approval before partner, investor, deployment, or publication use'
          }
        ]
      }
    ),
    resource(
      'phase-2',
      generatedAt,
      phase2.decision,
      [SOURCES.phase2, SOURCES.releaseGates, SOURCES.apiSpec],
      {
        route: '/kaleidoscope/phase-2',
        decision: phase2.decision,
        externalUse: phase2.externalUse,
        summary: phase2.summary,
        gates: phase2.gates,
        phase3Readiness: phase2.phase3Readiness
      },
      {
        confidence: phase2.ok ? 0.95 : 0.72,
        reasons: {
          [SOURCES.phase2]: 'Phase 2 completion gates and Phase 3 readiness',
          [SOURCES.releaseGates]: 'internal draft release posture',
          [SOURCES.apiSpec]: 'Phase 3 read-only resource target state'
        }
      }
    )
  ];
}

function buildWitness() {
  const generatedAt = new Date().toISOString();
  const responses = buildResponses(generatedAt);
  const validation = responses.map(validateResponse);
  const failures = validation.filter((item) => !item.ok);

  return {
    schema: WITNESS_SCHEMA,
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    phase: 'phase-3-internal-read-only-resources',
    ok: failures.length === 0,
    summary: {
      resourceCount: responses.length,
      resources: responses.map((item) => item.resource),
      passedResourceChecks: validation.filter((item) => item.ok).length,
      failedResourceChecks: failures.length,
      failedResources: failures.map((item) => item.resource),
      readOnlyResources: responses.filter((item) => item.mode === 'read').length,
      externalUse: 'blocked_until_explicit_approval'
    },
    validation,
    responses,
    contracts: {
      responseEnvelope: SOURCES.responseEnvelope,
      phase3Resources: 'pm/spec/kaleidoscope-ai/phase-3-resources.schema.json',
      apiSpec: SOURCES.apiSpec
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI phase 3 resources latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'phase-3', 'api', 'product-surface']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI phase 3 resources latest',
    '',
    '> Generated by `pnpm kaleidoscope:phase-3-resources:write`.',
    '',
    '## Summary',
    '',
    `- Resources: ${witness.summary.passedResourceChecks}/${witness.summary.resourceCount} valid`,
    `- Failed resources: ${witness.summary.failedResourceChecks}`,
    `- Read-only resources: ${witness.summary.readOnlyResources}`,
    `- External use: ${witness.summary.externalUse}`,
    '',
    '## Resources',
    '',
    '| Resource | Route | Decision | Freshness | Approval | Witnesses |',
    '| --- | --- | --- | --- | --- | --- |'
  ];

  for (const item of witness.responses) {
    lines.push(
      `| ${item.resource} | ${item.payload.route} | ${item.decision} | ${item.freshness.status} | ${item.approval.status}/${item.approval.boundary} | ${item.witnesses.join(', ')} |`
    );
  }

  lines.push('', '## Validation', '');
  lines.push('| Resource | Status | Issues |');
  lines.push('| --- | --- | --- |');
  for (const item of witness.validation) {
    lines.push(`| ${item.resource} | ${item.ok ? 'pass' : 'fail'} | ${item.issues.length > 0 ? item.issues.join('; ') : 'none'} |`);
  }

  lines.push('', '## Boundary', '');
  lines.push('These resources are internal read-only product-surface responses. They do not authorize repo writes, tickets, deployments, publication, partner contact, investor sharing, or external use.');

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

  console.log('\n=== kaleidoscope:phase-3-resources:check ===\n');
  console.log(`resources: ${witness.summary.passedResourceChecks}/${witness.summary.resourceCount}`);
  console.log(`failed: ${witness.summary.failedResourceChecks}`);
  console.log(`read-only: ${witness.summary.readOnlyResources}`);
  console.log(`external-use: ${witness.summary.externalUse}`);
  if (WRITE) {
    console.log(`witness: ${OUT_REL}`);
    console.log(`report: ${REPORT_REL}`);
  }
  for (const failure of witness.validation.filter((item) => !item.ok)) {
    console.log(`failure: ${failure.resource}: ${failure.issues.join('; ')}`);
  }
  process.exitCode = witness.ok ? 0 : 1;
}

main();
