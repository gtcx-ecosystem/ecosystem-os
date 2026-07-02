#!/usr/bin/env node
/** @file ops:check for ecosystem-os — P29 + P35 + machine/operations folder R1 */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const errors = [];

function requirePath(rel) {
  if (!existsSync(join(root, rel))) errors.push(`missing: ${rel}`);
}

const required = [
  'docs/sor.json',
  'docs/gitbook/ecosystem/SUMMARY.md',
  'docs/reference/onboarding/README.md',
  'docs/overview/README.md',
  'machine/publish-register.json',
  'operations/gtm/fleet-catalog-index.md',
  'agents/manifest.json',
  'agents/manifest.json',
  'config/ops.manifest.json',
  'config/baseline/baseline.config.json',
  'baseline.config.json',
  'machine/manifest.json',
];

for (const rel of required) requirePath(rel);

function run(label, cmd, args, cwd = root) {
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', stdio: 'pipe' });
  if (r.status !== 0) {
    const tail = (r.stderr || r.stdout || '').trim().split('\n').slice(-3).join(' ');
    errors.push(`${label} exit ${r.status}${tail ? ` — ${tail}` : ''}`);
  }
}

run(
  'repo:provision:check',
  process.execPath,
  ['platform/scripts/repo-provision-check.mjs'],
);
run('machine:folder:check', process.execPath, [
  '-e',
  "const fs=require('fs'); const path=require('path'); const root=process.cwd(); const required=['machine/README.md','machine/manifest.json','machine/completion-model.json','machine/shipping-tracks.json','machine/roadmap/initiatives.json','machine/roadmap/sprints/active.json','machine/roadmap/README.md','machine/product','machine/ci','operations/README.md']; const missing=required.filter((rel)=>!fs.existsSync(path.join(root,rel))); if(missing.length){console.error('missing '+missing.join(', ')); process.exit(1)} console.log('machine/operations folders ok')",
]);
run('agent:next-work', process.execPath, [
  'platform/scripts/agent-next-work.mjs',
  '--json',
]);
run('agency:check', process.execPath, ['platform/scripts/agency-check.mjs']);
run('publish:check', process.execPath, ['platform/scripts/publish-register-check.mjs']);
run('signal:remediation:check', process.execPath, [
  'platform/scripts/kaleidoscope-signal-remediation-check.mjs',
]);

if (errors.length) {
  console.error('ops:check FAIL — ecosystem-os');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('ops:check ok — ecosystem-os P29+P35+machine/operations');
