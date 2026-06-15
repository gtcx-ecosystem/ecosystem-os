#!/usr/bin/env node
/** Minimal P29 workspace check — ecosystem-os documentation home. */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];

const manifestPath = join(root, 'config/ops.manifest.json');
if (!existsSync(manifestPath)) {
  errors.push('config/ops.manifest.json missing');
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  for (const [id, rel] of Object.entries(manifest.domains ?? {})) {
    if (!existsSync(join(root, rel))) errors.push(`ops domain ${id}: ${rel}`);
  }
}

if (errors.length) {
  console.error('workspace:check FAIL');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('workspace:check ok — ecosystem-os P29 domains');
