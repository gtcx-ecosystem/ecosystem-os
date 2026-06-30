#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SOURCE_REL = 'audit/evidence/kaleidoscope-phase-3-resources-latest.json';
const OUT_REL = 'audit/evidence/kaleidoscope-phase-3-resource-replay-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/phase-3-resource-replay-latest.md';
const SOURCE = join(REPO, SOURCE_REL);
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

const EXPECTED_RESOURCES = [
  'fleet',
  'graph',
  'query',
  'decision-room',
  'signal',
  'actions',
  'partner-room',
  'release',
  'phase-2'
];

const EXPECTED_MODES = {
  fleet: 'read',
  graph: 'read',
  query: 'read',
  'decision-room': 'read',
  signal: 'read',
  actions: 'draft',
  'partner-room': 'draft',
  release: 'read',
  'phase-2': 'read'
};

const EXPECTED_APPROVAL = {
  fleet: ['not_required', 'read'],
  graph: ['not_required', 'read'],
  query: ['not_required', 'read'],
  'decision-room': ['not_required', 'read'],
  signal: ['not_required', 'read'],
  actions: ['draft_pending_approval', 'draft'],
  'partner-room': ['blocked_until_explicit_approval', 'external'],
  release: ['blocked_until_explicit_approval', 'external'],
  'phase-2': ['not_required', 'read']
};

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function fileDigest(rel) {
  const path = join(REPO, rel);
  if (!existsSync(path)) {
    return { path: rel, exists: false, sha256: null, bytes: null, sourceDate: null };
  }
  const data = readFileSync(path);
  const stat = statSync(path);
  return {
    path: rel,
    exists: true,
    sha256: sha256(data),
    bytes: stat.size,
    sourceDate: stat.mtime.toISOString()
  };
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'generatedAt' && key !== 'sourceDate')
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, stable(item)])
    );
  }
  return value;
}

function equalArray(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((item, index) => item === b[index]);
}

function validateResponse(response) {
  const issues = [];
  const expectedMode = EXPECTED_MODES[response.resource];
  const expectedApproval = EXPECTED_APPROVAL[response.resource];
  const witnessPaths = response.witnesses ?? [];
  const citationPaths = (response.citations ?? []).map((item) => item.path);
  const freshnessPaths = (response.freshness?.sourceDates ?? []).map((item) => item.path);

  if (!expectedMode) issues.push('unexpected resource');
  if (response.mode !== expectedMode) issues.push(`mode expected ${expectedMode}, got ${response.mode}`);
  if (!expectedApproval) {
    issues.push('approval expectation missing');
  } else {
    const [status, boundary] = expectedApproval;
    if (response.approval?.status !== status) issues.push(`approval status expected ${status}, got ${response.approval?.status}`);
    if (response.approval?.boundary !== boundary) issues.push(`approval boundary expected ${boundary}, got ${response.approval?.boundary}`);
  }
  if (!equalArray(citationPaths, witnessPaths)) issues.push('citation paths must match witnesses in order');
  if (!equalArray(freshnessPaths, witnessPaths)) issues.push('freshness source paths must match witnesses in order');
  if (!response.payload?.route?.startsWith('/kaleidoscope/')) issues.push('payload route must be a Kaleidoscope route');

  const witnessDigests = witnessPaths.map(fileDigest);
  for (const digest of witnessDigests) {
    if (!digest.exists) issues.push(`missing witness file: ${digest.path}`);
  }

  if (['actions', 'partner-room'].includes(response.resource) && response.mode !== 'draft') {
    issues.push('draft resource is not marked draft');
  }
  if (['partner-room', 'release'].includes(response.resource) && response.approval?.status !== 'blocked_until_explicit_approval') {
    issues.push('external-boundary resource must remain blocked until explicit approval');
  }

  const semanticFingerprint = sha256(JSON.stringify(stable(response)));

  return {
    resource: response.resource,
    mode: response.mode,
    approval: {
      status: response.approval?.status,
      boundary: response.approval?.boundary
    },
    route: response.payload?.route ?? null,
    ok: issues.length === 0,
    issues,
    semanticFingerprint,
    witnesses: witnessDigests
  };
}

function buildWitness() {
  const generatedAt = new Date().toISOString();
  const source = readJson(SOURCE);
  const responses = source.responses ?? [];
  const responseNames = responses.map((item) => item.resource);
  const validation = responses.map(validateResponse);
  const missingResources = EXPECTED_RESOURCES.filter((item) => !responseNames.includes(item));
  const unexpectedResources = responseNames.filter((item) => !EXPECTED_RESOURCES.includes(item));
  const orderOk = equalArray(responseNames, EXPECTED_RESOURCES);
  const failures = validation.filter((item) => !item.ok);
  const sourceDigest = fileDigest(SOURCE_REL);
  const replayBundleFingerprint = sha256(
    JSON.stringify({
      source: sourceDigest.sha256,
      resources: validation.map((item) => [item.resource, item.semanticFingerprint])
    })
  );

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/phase-3-resource-replay/v1',
    generatedAt,
    date: localDate(generatedAt),
    repo: 'ecosystem-os',
    phase: 'phase-3-resource-replay',
    ok: failures.length === 0 && missingResources.length === 0 && unexpectedResources.length === 0 && orderOk,
    summary: {
      source: SOURCE_REL,
      sourceSha256: sourceDigest.sha256,
      replayBundleFingerprint,
      resourceCount: responses.length,
      expectedResourceCount: EXPECTED_RESOURCES.length,
      resources: responseNames,
      orderOk,
      missingResources,
      unexpectedResources,
      passedResources: validation.filter((item) => item.ok).length,
      failedResources: failures.length,
      externalUse: 'blocked_until_explicit_approval'
    },
    validation,
    contracts: {
      resourceReplay: 'pm/spec/kaleidoscope-ai/phase-3-resource-replay.schema.json',
      phase3Resources: 'pm/spec/kaleidoscope-ai/phase-3-resources.schema.json',
      responseEnvelope: 'pm/spec/kaleidoscope-ai/product-surface-api.schema.json'
    }
  };
}

function renderReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI phase 3 resource replay latest',
    'status: generated',
    `date: ${witness.date}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'phase-3', 'replay', 'product-surface']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI phase 3 resource replay latest',
    '',
    '> Generated by `pnpm kaleidoscope:phase-3-resource-replay:write`.',
    '',
    '## Summary',
    '',
    `- Replay: ${witness.ok ? 'pass' : 'fail'}`,
    `- Resources: ${witness.summary.passedResources}/${witness.summary.expectedResourceCount} passed`,
    `- Failed resources: ${witness.summary.failedResources}`,
    `- Resource order: ${witness.summary.orderOk ? 'pass' : 'fail'}`,
    `- Bundle fingerprint: ${witness.summary.replayBundleFingerprint}`,
    `- External use: ${witness.summary.externalUse}`,
    '',
    '## Resource replay',
    '',
    '| Resource | Mode | Approval | Route | Status | Fingerprint | Witnesses |',
    '| --- | --- | --- | --- | --- | --- | --- |'
  ];

  for (const item of witness.validation) {
    lines.push(
      `| ${item.resource} | ${item.mode} | ${item.approval.status}/${item.approval.boundary} | ${item.route} | ${item.ok ? 'pass' : 'fail'} | ${item.semanticFingerprint} | ${item.witnesses.length} |`
    );
  }

  lines.push('', '## Issues', '');
  const failures = witness.validation.filter((item) => !item.ok);
  if (failures.length === 0 && witness.summary.missingResources.length === 0 && witness.summary.unexpectedResources.length === 0) {
    lines.push('None.');
  } else {
    for (const item of failures) {
      lines.push(`- ${item.resource}: ${item.issues.join('; ')}`);
    }
    for (const item of witness.summary.missingResources) {
      lines.push(`- missing resource: ${item}`);
    }
    for (const item of witness.summary.unexpectedResources) {
      lines.push(`- unexpected resource: ${item}`);
    }
  }

  lines.push('', '## Boundary', '');
  lines.push('Replay evidence only verifies deterministic lineage, fingerprints, and approval boundaries. It does not authorize service deployment, UI publication, repo writes, ticket creation, partner contact, investor sharing, or external use.');

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

  console.log('\n=== kaleidoscope:phase-3-resource-replay:check ===\n');
  console.log(`replay: ${witness.ok ? 'pass' : 'fail'}`);
  console.log(`resources: ${witness.summary.passedResources}/${witness.summary.expectedResourceCount}`);
  console.log(`failed: ${witness.summary.failedResources}`);
  console.log(`order: ${witness.summary.orderOk ? 'pass' : 'fail'}`);
  console.log(`bundle: ${witness.summary.replayBundleFingerprint}`);
  console.log(`external-use: ${witness.summary.externalUse}`);
  if (WRITE) {
    console.log(`witness: ${OUT_REL}`);
    console.log(`report: ${REPORT_REL}`);
  }
  for (const item of witness.validation.filter((entry) => !entry.ok)) {
    console.log(`failure: ${item.resource}: ${item.issues.join('; ')}`);
  }
  for (const item of witness.summary.missingResources) console.log(`missing-resource: ${item}`);
  for (const item of witness.summary.unexpectedResources) console.log(`unexpected-resource: ${item}`);
  process.exitCode = witness.ok ? 0 : 1;
}

main();
