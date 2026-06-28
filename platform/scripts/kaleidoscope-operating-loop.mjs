#!/usr/bin/env node
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-operating-loop-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/operating-loop-latest.md';
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

const STAGES = [
  {
    id: 'graph-rag-mcp',
    check: ['node', 'platform/scripts/kaleidoscope-graph-rag-mcp-check.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-graph-rag-mcp-check.mjs', '--write'],
    witness: 'audit/evidence/kaleidoscope-graph-rag-mcp-latest.json'
  },
  {
    id: 'graph-snapshot',
    check: ['node', 'platform/scripts/kaleidoscope-graph-snapshot.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-graph-snapshot.mjs', '--write'],
    witness: 'audit/evidence/kaleidoscope-graph-snapshot-latest.json'
  },
  {
    id: 'query',
    check: ['node', 'platform/scripts/kaleidoscope-query-service.mjs', '--golden'],
    write: ['node', 'platform/scripts/kaleidoscope-query-service.mjs', '--golden', '--write'],
    witness: 'audit/evidence/kaleidoscope-query-service-latest.json'
  },
  {
    id: 'signal',
    check: ['node', 'platform/scripts/kaleidoscope-signal-runner.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-signal-runner.mjs', '--write'],
    witness: 'audit/evidence/signal-fleet-latest.json'
  },
  {
    id: 'observatory',
    check: ['node', 'platform/scripts/kaleidoscope-observatory.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-observatory.mjs', '--write'],
    witness: 'audit/evidence/kaleidoscope-observatory-latest.json'
  },
  {
    id: 'decision-room',
    check: ['node', 'platform/scripts/kaleidoscope-decision-room.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-decision-room.mjs', '--write'],
    witness: 'audit/evidence/kaleidoscope-decision-room-latest.json'
  },
  {
    id: 'execution-studio',
    check: ['node', 'platform/scripts/kaleidoscope-execution-studio.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-execution-studio.mjs', '--write'],
    witness: 'audit/evidence/kaleidoscope-execution-studio-latest.json'
  },
  {
    id: 'release-gates',
    check: ['node', 'platform/scripts/kaleidoscope-release-gates.mjs'],
    write: ['node', 'platform/scripts/kaleidoscope-release-gates.mjs', '--write'],
    witness: 'audit/evidence/kaleidoscope-release-gates-latest.json'
  }
];

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(REPO, rel), 'utf8'));
}

function sourceDate(rel) {
  return statSync(join(REPO, rel)).mtime.toISOString();
}

function runStage(stage) {
  const command = WRITE ? stage.write : stage.check;
  const startedAt = new Date().toISOString();
  const result = spawnSync(command[0], command.slice(1), {
    cwd: REPO,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });
  const completedAt = new Date().toISOString();
  let witness = null;
  let witnessOk = false;
  try {
    witness = readJson(stage.witness);
    witnessOk = witness.ok === true || witness.restored === true;
  } catch {
    witnessOk = false;
  }
  return {
    id: stage.id,
    command: command.join(' '),
    exitCode: result.status,
    ok: result.status === 0 && witnessOk,
    witness: stage.witness,
    witnessOk,
    witnessDate: witness ? sourceDate(stage.witness) : null,
    startedAt,
    completedAt,
    stdoutTail: result.stdout.trim().split('\n').slice(-8),
    stderrTail: result.stderr.trim().split('\n').filter(Boolean).slice(-8)
  };
}

function buildWitness() {
  const generatedAt = new Date().toISOString();
  const stages = STAGES.map(runStage);
  const release = readJson('audit/evidence/kaleidoscope-release-gates-latest.json');
  const execution = readJson('audit/evidence/kaleidoscope-execution-studio-latest.json');
  const signal = readJson('audit/evidence/signal-fleet-latest.json');
  const failed = stages.filter((stage) => !stage.ok);
  const approvalPending = execution.summary?.approvalPendingActions ?? 0;
  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/operating-loop/v1',
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    mode: WRITE ? 'write' : 'check',
    ok: failed.length === 0 && release.ok === true,
    summary: {
      stageCount: stages.length,
      passedStages: stages.length - failed.length,
      failedStages: failed.length,
      releaseDecision: release.releaseDecision,
      externalUse: release.externalUse?.status ?? 'unknown',
      approvalPendingActions: approvalPending,
      signalAverageOverallScore100: signal.summary?.averageOverallScore100 ?? null,
      graphRagMcpReadyRepos: signal.summary?.graphRagMcpReadyRepos ?? null
    },
    stages,
    blockers: failed.map((stage) => stage.id),
    sources: Object.fromEntries(STAGES.map((stage) => [stage.id, stage.witness])),
    contracts: {
      operatingLoop: 'pm/spec/kaleidoscope-ai/operating-loop.schema.json',
      releaseGates: 'pm/spec/kaleidoscope-ai/release-gates.schema.json'
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI operating loop latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'operating-loop', 'release-gates']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI operating loop latest',
    '',
    '> Generated by `pnpm kaleidoscope:operate:write`.',
    '',
    '## Summary',
    '',
    `- Mode: ${witness.mode}`,
    `- Stages: ${witness.summary.passedStages}/${witness.summary.stageCount} passed`,
    `- Release decision: ${witness.summary.releaseDecision}`,
    `- External use: ${witness.summary.externalUse}`,
    `- Approval pending actions: ${witness.summary.approvalPendingActions}`,
    `- SIGNAL average overall score: ${witness.summary.signalAverageOverallScore100}`,
    '',
    '## Stages',
    '',
    '| Stage | Status | Witness |',
    '| --- | --- | --- |'
  ];

  for (const stage of witness.stages) {
    lines.push(`| ${stage.id} | ${stage.ok ? 'pass' : 'fail'} | ${stage.witness} |`);
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

  console.log('\n=== kaleidoscope:operate:check ===\n');
  console.log(`mode: ${witness.mode}`);
  console.log(`stages: ${witness.summary.passedStages}/${witness.summary.stageCount}`);
  console.log(`release-decision: ${witness.summary.releaseDecision}`);
  console.log(`external-use: ${witness.summary.externalUse}`);
  console.log(`approval-pending: ${witness.summary.approvalPendingActions}`);
  console.log(`ok: ${witness.ok}`);
  if (WRITE) {
    console.log(`witness: ${OUT_REL}`);
    console.log(`report: ${REPORT_REL}`);
  }
  for (const blocker of witness.blockers) {
    console.log(`blocker: ${blocker}`);
  }
  process.exitCode = witness.ok ? 0 : 1;
}

main();
