#!/usr/bin/env node
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-partner-brief-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/partner-brief-latest.md';
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

const SOURCE_RELS = {
  partnerRoom: 'docs/business/research/kaleidoscope-ai/partner-execution-room-draft.md',
  decision: 'audit/evidence/kaleidoscope-decision-room-latest.json',
  observatory: 'audit/evidence/kaleidoscope-observatory-latest.json',
  execution: 'audit/evidence/kaleidoscope-execution-studio-latest.json',
  safetyPlan: 'docs/business/research/kaleidoscope-ai/evidence-eval-safety-release-gates.md'
};

const PARTNER_ROOM_HEADINGS = [
  '### Bank or DFI room',
  '### Regulator or public-sector room',
  '### Enterprise buyer room',
  '### Market operator room',
  '### Investor room'
];

function readText(rel) {
  return readFileSync(join(REPO, rel), 'utf8');
}

function readJson(rel) {
  return JSON.parse(readText(rel));
}

function sourceDate(rel) {
  return statSync(join(REPO, rel)).mtime.toISOString();
}

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
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

function countTableRows(text, heading) {
  const start = text.indexOf(heading);
  if (start < 0) return 0;
  const nextHeading = text.indexOf('\n## ', start + heading.length);
  const section = text.slice(start, nextHeading < 0 ? undefined : nextHeading);
  return section
    .split('\n')
    .filter((line) => line.startsWith('| ') && !line.includes('---'))
    .slice(1).length;
}

function buildWitness() {
  const partnerRoom = readText(SOURCE_RELS.partnerRoom);
  const decision = readJson(SOURCE_RELS.decision);
  const observatory = readJson(SOURCE_RELS.observatory);
  const execution = readJson(SOURCE_RELS.execution);
  const generatedAt = new Date().toISOString();

  const partnerRoomCount = PARTNER_ROOM_HEADINGS.filter((heading) => partnerRoom.includes(heading)).length;
  const claimControls = countTableRows(partnerRoom, '## Claim Controls');
  const sourceEvidenceRows = countTableRows(partnerRoom, '## Source Evidence');
  const externalUseBlocked =
    partnerRoom.includes('external_use: blocked_until_explicit_approval') &&
    partnerRoom.includes('This is not approved for external partner') &&
    partnerRoom.includes('External use remains blocked until explicit approval.');
  const movementCaveat =
    partnerRoom.includes('Initial deltas are baseline initialization, not improvement claims.') &&
    partnerRoom.includes('Do not present zero deltas as improvement.');
  const partnerAction = execution.actions?.find((item) => item.id === 'exec-006-market-leadership-partner-room');
  const partnerActionBlocked =
    partnerAction?.mode === 'draft-only' &&
    partnerAction?.approvalRequest?.status === 'draft_pending_approval' &&
    partnerAction?.releaseGate?.status === 'blocked_until_validation_and_approval';
  const marketQuestion = decision.questions?.find((item) => item.id === 'market-leadership-africa');
  const marketQuestionOk =
    marketQuestion?.ok === true &&
    marketQuestion?.evaluation?.citationGate === true &&
    marketQuestion?.evaluation?.freshnessGate === true &&
    marketQuestion?.evaluation?.unsupportedClaimGate === true &&
    marketQuestion?.evaluation?.confidenceGate === true;

  const gates = [
    gate(
      'source-witnesses-ok',
      'Required source witnesses are green',
      decision.ok === true && observatory.ok === true && execution.ok === true,
      [
        source(SOURCE_RELS.decision, 'Decision Room strategic answer witness'),
        source(SOURCE_RELS.observatory, 'Observatory readiness and movement witness'),
        source(SOURCE_RELS.execution, 'Execution Studio approval-boundary witness')
      ],
      'Partner brief evaluation cannot pass when upstream strategic or execution witnesses are not ok.'
    ),
    gate(
      'market-question-eval',
      'Market-leadership answer passes citation, freshness, confidence, and unsupported-claim gates',
      marketQuestionOk,
      [source(SOURCE_RELS.decision, 'market-leadership decision packet')],
      'Partner narrative cannot pass when the source market-leadership answer fails evaluation.'
    ),
    gate(
      'partner-room-present',
      'Partner execution room draft is present',
      partnerRoom.includes('# partner execution room draft') && sourceEvidenceRows >= 6,
      [source(SOURCE_RELS.partnerRoom, 'partner execution room draft')],
      'Partner brief evaluation cannot pass without a source evidence map.'
    ),
    gate(
      'partner-rooms-covered',
      'Partner-specific rooms are covered',
      partnerRoomCount === PARTNER_ROOM_HEADINGS.length,
      [source(SOURCE_RELS.partnerRoom, 'partner room sections')],
      'Partner brief evaluation cannot pass unless bank/DFI, regulator, buyer, operator, and investor rooms are all represented.'
    ),
    gate(
      'claim-controls-present',
      'Claim controls are explicit',
      claimControls >= 6,
      [source(SOURCE_RELS.partnerRoom, 'claim controls table')],
      'Partner brief evaluation cannot pass without claim posture and external-use rules.'
    ),
    gate(
      'external-use-blocked',
      'External use remains blocked until explicit approval',
      externalUseBlocked && partnerActionBlocked,
      [
        source(SOURCE_RELS.partnerRoom, 'external-use frontmatter and body warning'),
        source(SOURCE_RELS.execution, 'Execution Studio approval request')
      ],
      'Partner brief evaluation cannot pass if the artifact can be used externally without approval.'
    ),
    gate(
      'movement-caveat-present',
      'Movement baseline caveat is present',
      movementCaveat && observatory.summary?.movementAvailable === true,
      [
        source(SOURCE_RELS.partnerRoom, 'movement caveat'),
        source(SOURCE_RELS.observatory, 'movement availability')
      ],
      'Partner brief evaluation cannot pass if zero-delta movement can be misread as historical improvement.'
    ),
    gate(
      'safety-doctrine-linked',
      'Safety and release doctrine is linked',
      Boolean(sourceDate(SOURCE_RELS.safetyPlan)),
      [source(SOURCE_RELS.safetyPlan, 'release safety doctrine')],
      'Partner brief evaluation cannot pass without linked safety and approval doctrine.'
    )
  ];

  const blockers = gates.filter((item) => !item.passed);
  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/partner-brief/v1',
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    phase: 'phase-2-partner-brief-eval',
    ok: blockers.length === 0,
    summary: {
      gateCount: gates.length,
      passedGates: gates.filter((item) => item.passed).length,
      failedGates: blockers.length,
      blockers: blockers.map((item) => item.id),
      externalUse: 'blocked_until_explicit_approval',
      approvalStatus: partnerAction?.approvalRequest?.status ?? 'unknown',
      partnerRooms: partnerRoomCount,
      claimControls,
      unsupportedClaimWarnings: decision.summary?.unsupportedClaimWarnings ?? null,
      movementAvailable: observatory.summary?.movementAvailable ?? null
    },
    gates,
    sources: SOURCE_RELS,
    contracts: {
      partnerBrief: 'pm/spec/kaleidoscope-ai/partner-brief.schema.json'
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI partner brief latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'partner-brief', 'release-gates']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI partner brief latest',
    '',
    '> Generated by `pnpm kaleidoscope:partner-brief:write`.',
    '',
    '## Summary',
    '',
    `- Gates: ${witness.summary.passedGates}/${witness.summary.gateCount} passed`,
    `- Failed gates: ${witness.summary.failedGates}`,
    `- External use: ${witness.summary.externalUse}`,
    `- Approval status: ${witness.summary.approvalStatus}`,
    `- Partner rooms: ${witness.summary.partnerRooms}`,
    `- Claim controls: ${witness.summary.claimControls}`,
    '',
    '## Gates',
    '',
    '| Gate | Status | Failure mode |',
    '| --- | --- | --- |'
  ];

  for (const item of witness.gates) {
    lines.push(`| ${item.id} | ${item.passed ? 'pass' : 'fail'} | ${item.failureMode} |`);
  }

  lines.push('', '## Boundary', '');
  lines.push('This witness validates an internal draft only. It does not approve external partner use.');
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

  console.log('\n=== kaleidoscope:partner-brief:check ===\n');
  console.log(`gates: ${witness.summary.gateCount}`);
  console.log(`passed: ${witness.summary.passedGates}`);
  console.log(`failed: ${witness.summary.failedGates}`);
  console.log(`external-use: ${witness.summary.externalUse}`);
  console.log(`approval-status: ${witness.summary.approvalStatus}`);
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
