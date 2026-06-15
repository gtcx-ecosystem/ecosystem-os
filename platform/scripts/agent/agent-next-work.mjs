#!/usr/bin/env node
/** Delegates P22 selection to bridge-os program office. */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const bridge = join(dirname(fileURLToPath(import.meta.url)), '../../../../bridge-os');
const args = process.argv.slice(2);
const r = spawnSync('pnpm', ['agent:next-work', ...args], {
  cwd: bridge,
  encoding: 'utf8',
  stdio: 'inherit',
});
process.exit(r.status ?? 1);
