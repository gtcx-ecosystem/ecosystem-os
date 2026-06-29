#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-execution-studio-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/execution-studio-latest.md';
const OUT = join(REPO, OUT_REL);
const REPORT = join(REPO, REPORT_REL);
const OBSERVATORY_REL = 'audit/evidence/kaleidoscope-observatory-latest.json';
const DECISION_REL = 'audit/evidence/kaleidoscope-decision-room-latest.json';
const SIGNAL_REL = 'audit/evidence/signal-fleet-latest.json';
const PHASE2_REL = 'docs/business/research/kaleidoscope-ai/phase-2-agentic-product-architecture.md';
const PREVIOUS_GRAPH_REL = 'audit/evidence/kaleidoscope-graph-snapshot-previous.json';
const MOVEMENT_HISTORY_REL = 'docs/business/research/kaleidoscope-ai/movement-history-baseline.md';
const WRITE = process.argv.includes('--write');
const JSON_OUT = process.argv.includes('--json');
const LOCAL_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Johannesburg',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

function readJson(rel) {
  return JSON.parse(readFileSync(join(REPO, rel), 'utf8'));
}

function mtimeIso(rel) {
  return statSync(join(REPO, rel)).mtime.toISOString();
}

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function citation(path, reason) {
  return {
    path,
    sourceDate: mtimeIso(path),
    reason
  };
}

function approval(boundary, reason) {
  return {
    status: 'draft_pending_approval',
    required: true,
    boundary,
    reason,
    allowedWithoutApproval: false
  };
}

function gate(command, successCriteria) {
  return {
    type: 'local-validation',
    command,
    successCriteria
  };
}

function releaseGate(name, criteria) {
  return {
    name,
    status: 'blocked_until_validation_and_approval',
    criteria
  };
}

function action({
  id,
  title,
  ownerRepo,
  targetRepos,
  priority,
  outcome,
  rationale,
  evidence,
  validationGate,
  approvalRequest,
  releaseGate: release,
  draftArtifacts,
  acceptanceCriteria
}) {
  return {
    id,
    title,
    mode: 'draft-only',
    ownerRepo,
    targetRepos,
    priority,
    targetReadinessScore100: 85,
    outcome,
    rationale,
    evidence,
    validationGate,
    approvalRequest,
    releaseGate: release,
    draftArtifacts,
    acceptanceCriteria,
    ok:
      Boolean(ownerRepo) &&
      evidence.length >= 2 &&
      Boolean(validationGate?.command) &&
      approvalRequest?.status === 'draft_pending_approval' &&
      release?.status === 'blocked_until_validation_and_approval'
  };
}

function topSignalRows(signal) {
  return signal.results
    .slice()
    .sort((a, b) => a.overallScore100 - b.overallScore100 || a.repo.localeCompare(b.repo))
    .slice(0, 6)
    .map((row) => row.repo);
}

function mprMissing(signal) {
  return signal.results.filter((row) => !row.mprRelation.available).map((row) => row.repo);
}

function commercialGapRows(observatory) {
  return (observatory.repos ?? [])
    .map((row) => {
      const gaps = Object.entries(row.commercialEvidence?.categories ?? {})
        .filter(([, value]) => value.status === 'gap')
        .map(([category]) => category);
      return {
        repo: row.repo,
        gaps,
        evidencedCategories: row.commercialEvidence?.evidencedCategories ?? 0,
        categoryCount: row.commercialEvidence?.categoryCount ?? 0
      };
    })
    .filter((row) => row.gaps.length > 0)
    .sort((a, b) => b.gaps.length - a.gaps.length || a.repo.localeCompare(b.repo));
}

function commercialGapActions(observatory, readinessCitation, phase2Citation) {
  return commercialGapRows(observatory).map((row, index) =>
    action({
      id: `exec-${String(index + 7).padStart(3, '0')}-${row.repo}-commercial-evidence-gap`,
      title: `Close commercial evidence gaps for ${row.repo}`,
      ownerRepo: row.repo,
      targetRepos: [row.repo],
      priority: row.gaps.length >= 3 ? 'P1' : 'P2',
      outcome: `${row.repo} has current traction, partner, revenue, deployment, and workflow evidence available to the Observatory.`,
      rationale: `Observatory commercial evidence shows ${row.evidencedCategories}/${row.categoryCount} categories evidenced for ${row.repo}; gaps: ${row.gaps.join(', ')}.`,
      evidence: [readinessCitation, phase2Citation],
      validationGate: gate(
        'pnpm kaleidoscope:observatory:check',
        `${row.repo} commercial evidence gaps are reduced or explicitly documented as not applicable.`
      ),
      approvalRequest: approval('commercial-evidence', 'Adding partner, revenue, deployment, traction, or workflow evidence can affect venture and partner-readiness scoring.'),
      releaseGate: releaseGate(`${row.repo}-commercial-evidence-ready`, [
        'owner repo publishes or confirms evidence for each missing category',
        'Observatory commercial evidence rerun reflects the change',
        'partner/investor claims remain blocked until explicitly approved'
      ]),
      draftArtifacts: [`${row.repo}/audit/evidence`, `${row.repo}/docs/business`, `${row.repo}/docs/operations`],
      acceptanceCriteria: [
        `Addresses gaps: ${row.gaps.join(', ')}.`,
        'Uses repo-owned evidence paths rather than ecosystem-level assumptions.',
        'Does not convert internal evidence into external claims without approval.'
      ]
    })
  );
}

function movementHistoryComplete(observatory) {
  return (
    observatory?.summary?.movementAvailable === true &&
    existsSync(join(REPO, PREVIOUS_GRAPH_REL)) &&
    existsSync(join(REPO, MOVEMENT_HISTORY_REL))
  );
}

function buildActions(observatory, decision, signal) {
  const lowSignalRepos = topSignalRows(signal);
  const missingMprRepos = mprMissing(signal);
  const readinessCitation = citation(OBSERVATORY_REL, 'current fleet readiness, MPR, SIGNAL, and blockers');
  const decisionCitation = citation(DECISION_REL, 'strategic recommendations and execution focus');
  const signalCitation = citation(SIGNAL_REL, 'SIGNAL bottlenecks and next unlocks');
  const phase2Citation = citation(PHASE2_REL, 'Execution Studio draft-mode and approval-boundary requirements');

  const movementAction = movementHistoryComplete(observatory)
    ? []
    : [
        action({
          id: 'exec-005-observatory-movement-history',
          title: 'Add prior/current movement history to Observatory',
          ownerRepo: 'ecosystem-os',
          targetRepos: ['ecosystem-os'],
          priority: 'P1',
          outcome: 'Observatory can answer movement since last audit from prior/current snapshots.',
          rationale:
            'The current Observatory explicitly reports movement unavailable because no prior Kaleidoscope graph snapshot is present.',
          evidence: [readinessCitation, decisionCitation],
          validationGate: gate('pnpm kaleidoscope:observatory:check', 'movementAvailable becomes true when a prior snapshot fixture is present.'),
          approvalRequest: approval('evidence-history', 'Adding historical snapshots changes movement analysis and should be reviewed.'),
          releaseGate: releaseGate('movement-history-ready', [
            'prior snapshot path documented',
            'delta fields populated',
            'Decision Room can cite movement'
          ]),
          draftArtifacts: [PREVIOUS_GRAPH_REL],
          acceptanceCriteria: [
            'Does not overwrite latest evidence.',
            'Supports replay from archived snapshots.',
            'Reports score deltas per repo.'
          ]
        })
      ];
  const mprRelationAction =
    missingMprRepos.length === 0
      ? []
      : [
          action({
            id: 'exec-003-mpr-relation-gap',
            title: 'Resolve missing MPR relation for bridge-os and terminal-os',
            ownerRepo: 'ecosystem-os',
            targetRepos: missingMprRepos,
            priority: 'P1',
            outcome: 'Bridge and terminal no longer appear as under-evidenced in SIGNAL/MPR rollups.',
            rationale:
              'The SIGNAL fleet witness shows missing MPR relation for bridge-os and terminal-os, holding their SIGNAL-E process evidence at L1.',
            evidence: [signalCitation, readinessCitation],
            validationGate: gate('pnpm kaleidoscope:signal:check', 'MPR relation count increases or an explicit no-MPR relation witness is published.'),
            approvalRequest: approval('cross-repo-evidence', 'Publishing repo evidence or no-MPR relation witnesses affects fleet scoring.'),
            releaseGate: releaseGate('mpr-relation-complete', [
              'bridge-os relation resolved',
              'terminal-os relation resolved',
              'Observatory MPR column explains n/a states'
            ]),
            draftArtifacts: [
              'audit/evidence/mpr-relation-gap-latest.json',
              'docs/business/research/kaleidoscope-ai/mpr-relation-gap.md'
            ],
            acceptanceCriteria: [
              'Lists the exact repos with missing MPR relation.',
              'Routes owner review before publishing replacement evidence.',
              'Keeps SIGNAL score conservative until evidence exists.'
            ]
          })
        ];

  return [
    action({
      id: 'exec-001-signal-l3-trace-policy-pack',
      title: 'Define the trace, policy, approval, and learning-loop evidence pack for SIGNAL-E L3',
      ownerRepo: 'baseline-os',
      targetRepos: ['baseline-os', 'fabric-os', 'bridge-os', 'ecosystem-os'],
      priority: 'P0',
      outcome: 'A reusable evidence contract that shows exactly what unlocks SIGNAL-E L3 across the fleet.',
      rationale:
        'The SIGNAL fleet runner shows 18 repos at SIGNAL-E L2 and blocks L3 until trace, policy, approval, and learning-loop evidence is published.',
      evidence: [signalCitation, phase2Citation],
      validationGate: gate('pnpm kaleidoscope:signal:check', 'SIGNAL witness remains green and L3 gaps are machine-readable.'),
      approvalRequest: approval('spec-change', 'Adding or changing canonical evidence contracts requires owner review.'),
      releaseGate: releaseGate('signal-l3-contract-ready', [
        'schema exists',
        'runner can cite trace/policy/approval evidence',
        'Observatory surfaces L3 blockers'
      ]),
      draftArtifacts: [
        'pm/spec/kaleidoscope-ai/signal-l3-evidence-pack.schema.json',
        'docs/business/research/kaleidoscope-ai/signal-l3-evidence-pack.md'
      ],
      acceptanceCriteria: [
        'Defines trace, policy, approval, learning-loop, and rollback evidence fields.',
        'Documents why graph/RAG/MCP readiness alone cannot claim L3.',
        'Includes validation commands and failure modes.'
      ]
    }),
    action({
      id: 'exec-002-bridge-fleet-execution-runner',
      title: 'Draft the bridge-os fleet execution runner contract',
      ownerRepo: 'bridge-os',
      targetRepos: ['bridge-os', 'ecosystem-os', 'agile-os'],
      priority: 'P0',
      outcome: 'A bridge-owned runner contract for turning Kaleidoscope draft actions into approved work artifacts.',
      rationale:
        'Execution Studio needs a controlled runner boundary before it can create tickets, branches, or repo edits.',
      evidence: [decisionCitation, phase2Citation],
      validationGate: gate('pnpm kaleidoscope:execution-studio:check', 'Every draft action has owner repo, evidence, validation, approval, and release gate.'),
      approvalRequest: approval('write-action-runner', 'Any future runner that writes to repos or work systems crosses a state-changing boundary.'),
      releaseGate: releaseGate('draft-runner-only', [
        'default mode remains draft-only',
        'write actions require approval',
        'owner routing is explicit'
      ]),
      draftArtifacts: [
        'pm/spec/kaleidoscope-ai/execution-action.schema.json',
        'docs/business/research/kaleidoscope-ai/execution-studio-latest.md'
      ],
      acceptanceCriteria: [
        'Runner contract separates draft, write, external, and deploy boundaries.',
        'Approval request format is embedded in every action.',
        'No action can ship without a validation gate.'
      ]
    }),
    ...mprRelationAction,
    action({
      id: 'exec-004-85-uplift-format',
      title: 'Define the 8.5 uplift task format',
      ownerRepo: 'agile-os',
      targetRepos: lowSignalRepos,
      priority: 'P1',
      outcome: 'A repeatable task format that converts repo gaps into 8.5 readiness work.',
      rationale:
        'The user goal is 8.5 readiness; Kaleidoscope needs a standard task format before dispatching repo-level uplift work.',
      evidence: [readinessCitation, phase2Citation],
      validationGate: gate('pnpm kaleidoscope:execution-studio:check', 'Generated actions include target readiness, validation, approval, and release gates.'),
      approvalRequest: approval('work-management-standard', 'Changing task format affects execution across agile-os and downstream repos.'),
      releaseGate: releaseGate('85-task-format-ready', [
        'task format includes evidence refs',
        'owner repo is mandatory',
        'validation command is mandatory',
        'approval status is mandatory'
      ]),
      draftArtifacts: ['pm/spec/kaleidoscope-ai/85-uplift-action.schema.json'],
      acceptanceCriteria: [
        'Supports repo, fleet, and product-surface actions.',
        'Maps every task to an 8.5 readiness outcome.',
        'Can be consumed by agile-os without losing evidence trace.'
      ]
    }),
    ...movementAction,
    action({
      id: 'exec-006-market-leadership-partner-room',
      title: 'Draft partner-ready market leadership execution room',
      ownerRepo: 'ecosystem-os',
      targetRepos: ['markets-os', 'compliance-os', 'gtcx-os', 'veritas-ai', 'griot-ai'],
      priority: 'P2',
      outcome: 'A cited partner/investor briefing packet for the African commodity-trade operating-system wedge.',
      rationale:
        'Decision Room identifies the governed African commodity-trade operating system as the strongest market leadership opportunity.',
      evidence: [decisionCitation, readinessCitation],
      validationGate: gate('pnpm kaleidoscope:decision-room:check', 'Strategic market answer keeps citation, freshness, confidence, and unsupported-claim gates green.'),
      approvalRequest: approval('external-partner-artifact', 'Partner-facing narratives require approval before external use.'),
      releaseGate: releaseGate('partner-room-draft-ready', [
        'claims cite current evidence',
        'unsupported-claim warnings remain zero',
        'external use remains blocked until approval'
      ]),
      draftArtifacts: ['docs/business/research/kaleidoscope-ai/partner-execution-room-draft.md'],
      acceptanceCriteria: [
        'Separates internal evidence from external claims.',
        'Routes market, compliance, and verification repos explicitly.',
        'Keeps unsupported claims at zero.'
      ]
    }),
    ...commercialGapActions(observatory, readinessCitation, phase2Citation)
  ];
}

function buildWitness() {
  const observatory = readJson(OBSERVATORY_REL);
  const decision = readJson(DECISION_REL);
  const signal = readJson(SIGNAL_REL);
  const generatedAt = new Date().toISOString();
  const actions = buildActions(observatory, decision, signal);
  const issues = [];
  for (const item of actions) {
    if (!item.ok) issues.push(`${item.id}: missing owner, evidence, validation, approval, or release gate`);
  }
  if (observatory.ok !== true) issues.push('observatory witness is not ok');
  if (decision.ok !== true) issues.push('decision room witness is not ok');
  if (signal.ok !== true) issues.push('signal fleet witness is not ok');

  const byOwner = actions.reduce((acc, item) => {
    acc[item.ownerRepo] = (acc[item.ownerRepo] ?? 0) + 1;
    return acc;
  }, {});

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/execution-studio/v1',
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    phase: 'phase-2-execution-studio-draft-mode',
    mode: 'draft-only',
    ok: issues.length === 0,
    summary: {
      actionCount: actions.length,
      okActions: actions.filter((item) => item.ok).length,
      approvalPendingActions: actions.filter((item) => item.approvalRequest.status === 'draft_pending_approval').length,
      releaseBlockedActions: actions.filter((item) => item.releaseGate.status === 'blocked_until_validation_and_approval').length,
      owners: byOwner
    },
    actions,
    issues,
    sources: {
      observatory: OBSERVATORY_REL,
      decisionRoom: DECISION_REL,
      signalFleet: SIGNAL_REL,
      phase2: PHASE2_REL
    },
    contracts: {
      executionStudio: 'pm/spec/kaleidoscope-ai/execution-studio.schema.json'
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI execution studio latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'execution-studio', 'approval', '8-5-uplift']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI execution studio latest',
    '',
    '> Generated by `pnpm kaleidoscope:execution-studio:write`.',
    '',
    '## Summary',
    '',
    `- Mode: ${witness.mode}`,
    `- Actions: ${witness.summary.okActions}/${witness.summary.actionCount} valid`,
    `- Approval pending: ${witness.summary.approvalPendingActions}`,
    `- Release blocked until validation and approval: ${witness.summary.releaseBlockedActions}`,
    '',
    '## Draft actions',
    '',
    '| ID | Owner | Priority | Target repos | Validation | Approval |',
    '| --- | --- | ---: | --- | --- | --- |'
  ];

  for (const item of witness.actions) {
    lines.push(
      `| ${item.id} | ${item.ownerRepo} | ${item.priority} | ${item.targetRepos.join(', ')} | ${item.validationGate.command} | ${item.approvalRequest.status} |`
    );
  }

  lines.push('', '## Release gates', '');
  for (const item of witness.actions) {
    lines.push(`- ${item.id}: ${item.releaseGate.name} - ${item.releaseGate.status}`);
  }

  lines.push('', '## Notes', '');
  lines.push('Draft mode means Kaleidoscope may propose work artifacts, but repo edits, ticket creation, external communications, and deployments remain blocked until explicit approval.');

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

  console.log('\n=== kaleidoscope:execution-studio:check ===\n');
  console.log(`actions: ${witness.summary.actionCount}`);
  console.log(`valid: ${witness.summary.okActions}`);
  console.log(`approval-pending: ${witness.summary.approvalPendingActions}`);
  console.log(`release-blocked: ${witness.summary.releaseBlockedActions}`);
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
