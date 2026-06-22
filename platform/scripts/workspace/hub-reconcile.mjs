#!/usr/bin/env node
/**
 * Hub reconcile — refresh execution roadmap + P29 machine sync (baseline hub-sync hook).
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

const r = spawnSync('pnpm', ['machine:sync'], { stdio: 'inherit', cwd: root, shell: true });
if ((r.status ?? 1) !== 0) process.exit(r.status ?? 1);

console.log('hub-reconcile: OK — machine sync (bridge P29)');
