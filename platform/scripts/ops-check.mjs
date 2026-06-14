#!/usr/bin/env node
/** @file Minimal ops:check for ecosystem-os scaffold */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const required = [
  'docs/sor.json',
  'docs/gitbook/ecosystem/SUMMARY.md',
  'docs/onboarding/README.md',
  'docs/overview/README.md',
  'pm/publish-register.json',
  'ops/gtm/fleet-catalog-index.md',
  'agentic/manifest.json',
];

let ok = true;
for (const rel of required) {
  const path = join(root, rel);
  if (!existsSync(path)) {
    console.error(`missing: ${rel}`);
    ok = false;
  }
}
if (!ok) process.exit(1);
console.log('ops:check ok — ecosystem-os scaffold');
