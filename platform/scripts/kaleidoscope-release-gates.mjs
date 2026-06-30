#!/usr/bin/env node
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-release-gates-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/release-gates-latest.md';
const OUT = join(REPO, OUT_REL);
const REPORT = join(REPO, REPORT_REL);
const SOURCE_RELS = {
  query: 'audit/evidence/kaleidoscope-query-service-latest.json',
  decision: 'audit/evidence/kaleidoscope-decision-room-latest.json',
  observatory: 'audit/evidence/kaleidoscope-observatory-latest.json',
  signal: 'audit/evidence/signal-fleet-latest.json',
  execution: 'audit/evidence/kaleidoscope-execution-studio-latest.json',
  partnerBrief: 'audit/evidence/kaleidoscope-partner-brief-latest.json',
  safetyPlan: 'docs/business/research/kaleidoscope-ai/evidence-eval-safety-release-gates.md',
  signalRemediation: 'pm/spec/kaleidoscope-ai/signal-module-remediation.json'
};
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

function source(rel, reason) {
  return { path: rel, sourceDate: mtimeIso(rel), reason };
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
  const query = readJson(SOURCE_RELS.query);
  const decision = readJson(SOURCE_RELS.decision);
  const observatory = readJson(SOURCE_RELS.observatory);
  const signal = readJson(SOURCE_RELS.signal);
  const execution = readJson(SOURCE_RELS.execution);
  const partnerBrief = readJson(SOURCE_RELS.partnerBrief);
  const generatedAt = new Date().toISOString();
  const remediationCheck = spawnSync(
    process.execPath,
    ['platform/scripts/kaleidoscope-signal-remediation-check.mjs'],
    { cwd: REPO, encoding: 'utf8' }
  );

  const decisionQuestions = decision.questions ?? [];
  const allDecisionQuestionsCited = decisionQuestions.every((item) => (item.citations ?? []).length >= 3);
  const allDecisionQuestionsFresh = decisionQuestions.every((item) => item.freshness?.stale === false);
  const allDecisionQuestionsConfident = decisionQuestions.every((item) => item.confidence >= 0.75);
  const approvalBoundaries = execution.actions?.every(
    (item) =>
      item.mode === 'draft-only' &&
      item.approvalRequest?.status === 'draft_pending_approval' &&
      item.releaseGate?.status === 'blocked_until_validation_and_approval'
  );

  const gates = [
    gate(
      'source-witnesses-ok',
      'Required source witnesses are green',
      query.ok === true &&
        decision.ok === true &&
        observatory.ok === true &&
        signal.ok === true &&
        execution.ok === true &&
        partnerBrief.ok === true,
      [
        source(SOURCE_RELS.query, 'query witness'),
        source(SOURCE_RELS.decision, 'decision witness'),
        source(SOURCE_RELS.observatory, 'observatory witness'),
        source(SOURCE_RELS.signal, 'SIGNAL witness'),
        source(SOURCE_RELS.execution, 'execution studio witness'),
        source(SOURCE_RELS.partnerBrief, 'partner brief evaluation witness')
      ],
      'Release cannot pass when any upstream witness is not ok.'
    ),
    gate(
      'golden-query-eval',
      'Golden strategic query eval passes',
      query.summary?.passedQueries === query.summary?.queryCount && query.summary?.averageConfidence >= 0.9,
      [source(SOURCE_RELS.query, 'golden question eval results')],
      'Release cannot pass when strategic retrieval quality regresses.'
    ),
    gate(
      'decision-citation-gate',
      'Decision Room answers have citations',
      allDecisionQuestionsCited,
      [source(SOURCE_RELS.decision, 'decision citations')],
      'Release cannot pass when high-value answers lack at least three citations.'
    ),
    gate(
      'decision-freshness-gate',
      'Decision Room answers use fresh evidence',
      allDecisionQuestionsFresh && decision.summary?.staleEvidenceWarnings === 0,
      [source(SOURCE_RELS.decision, 'decision freshness evaluation')],
      'Release cannot pass when high-value answers cite stale evidence.'
    ),
    gate(
      'unsupported-claim-gate',
      'Unsupported claim warnings are zero',
      decision.summary?.unsupportedClaimWarnings === 0,
      [source(SOURCE_RELS.decision, 'unsupported claim evaluation')],
      'Release cannot pass when strategic answers include unsupported claims.'
    ),
    gate(
      'confidence-gate',
      'High-value answers meet confidence floor',
      allDecisionQuestionsConfident && decision.summary?.averageConfidence >= 0.8,
      [source(SOURCE_RELS.decision, 'answer confidence evaluation')],
      'Release cannot pass when answer confidence drops below floor.'
    ),
    gate(
      'approval-boundary-gate',
      'Execution actions preserve approval boundaries',
      approvalBoundaries === true,
      [source(SOURCE_RELS.execution, 'draft-only approval and release gate evidence')],
      'Release cannot pass when draft actions can cross write, external, or deploy boundaries without approval.'
    ),
    gate(
      'partner-brief-boundary-gate',
      'Partner brief remains internal draft and approval-gated',
      partnerBrief.ok === true &&
        partnerBrief.summary?.externalUse === 'blocked_until_explicit_approval' &&
        partnerBrief.summary?.approvalStatus === 'draft_pending_approval',
      [source(SOURCE_RELS.partnerBrief, 'partner brief claim, freshness, and approval-boundary evaluation')],
      'Release cannot pass when partner narratives can cross external-use boundaries without explicit approval.'
    ),
    gate(
      'signal-evidence-gate',
      'SIGNAL and MPR relation evidence is explicit',
      signal.summary?.generatedRepoWitnesses === signal.summary?.repoCount && signal.summary?.graphRagMcpReadyRepos === signal.summary?.repoCount,
      [source(SOURCE_RELS.signal, 'SIGNAL fleet witness')],
      'Release cannot pass when repo-level agentic maturity evidence is missing or graph/RAG/MCP readiness regresses.'
    ),
    gate(
      'signal-remediation-integrity',
      'SIGNAL remediation contract is internally consistent',
      remediationCheck.status === 0,
      [source(SOURCE_RELS.signalRemediation, 'module ownership, evidence paths, targets, and claim consistency')],
      'Release cannot pass when SIGNAL remediation controls drift or overstate maturity.'
    ),
    gate(
      'safety-plan-linked',
      'Safety and release-gate doctrine is linked',
      Boolean(mtimeIso(SOURCE_RELS.safetyPlan)),
      [source(SOURCE_RELS.safetyPlan, 'release safety doctrine')],
      'Release cannot pass without a documented safety and release-gate doctrine.'
    )
  ];

  const blockers = gates.filter((item) => !item.passed);
  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/release-gates/v1',
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    phase: 'phase-2-eval-safety-release-hardening',
    ok: blockers.length === 0,
    releaseDecision: blockers.length === 0 ? 'internal-draft-release-pass' : 'blocked',
    externalUse: {
      status: 'blocked_until_explicit_approval',
      reason: 'Partner-facing, investor-facing, deployment, and repo-write actions require explicit approval outside this release witness.'
    },
    summary: {
      gateCount: gates.length,
      passedGates: gates.filter((item) => item.passed).length,
      failedGates: blockers.length,
      blockers: blockers.map((item) => item.id)
    },
    gates,
    sources: SOURCE_RELS,
    contracts: {
      releaseGates: 'pm/spec/kaleidoscope-ai/release-gates.schema.json',
      partnerBrief: 'pm/spec/kaleidoscope-ai/partner-brief.schema.json'
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI release gates latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'release-gates', 'evals', 'safety']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI release gates latest',
    '',
    '> Generated by `pnpm kaleidoscope:release-gates:write`.',
    '',
    '## Summary',
    '',
    `- Release decision: ${witness.releaseDecision}`,
    `- Gates: ${witness.summary.passedGates}/${witness.summary.gateCount} passed`,
    `- Failed gates: ${witness.summary.failedGates}`,
    `- External use: ${witness.externalUse.status}`,
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

  console.log('\n=== kaleidoscope:release-gates:check ===\n');
  console.log(`gates: ${witness.summary.gateCount}`);
  console.log(`passed: ${witness.summary.passedGates}`);
  console.log(`failed: ${witness.summary.failedGates}`);
  console.log(`release-decision: ${witness.releaseDecision}`);
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
