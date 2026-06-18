#!/usr/bin/env node
/** @file ops:check for ecosystem-os — P29 + P35 + PM folder R1 */
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
  'pm/publish-register.json',
  'ops/gtm/fleet-catalog-index.md',
  'agents/manifest.json',
  'agentic/manifest.json',
  'config/ops.manifest.json',
  'config/baseline/baseline.config.json',
  'baseline.config.json',
  'pm/manifest.json',
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
  'layout:check',
  process.execPath,
  ['../bridge-os/platform/scripts/workspace/p35-layout-check.mjs', '--repo', 'ecosystem-os', '--strict'],
);
run('pm:folder:check', process.execPath, [
  '../bridge-os/platform/scripts/workspace/pm-folder-check.mjs',
]);
run('agent:work-selection:check', process.execPath, [
  '../bridge-os/platform/scripts/checks/check-agent-work-selection.mjs',
]);
run('agency:check', process.execPath, ['platform/scripts/agency-check.mjs']);

if (errors.length) {
  console.error('ops:check FAIL — ecosystem-os');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('ops:check ok — ecosystem-os P29+P35+PM');
