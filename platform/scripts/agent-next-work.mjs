#!/usr/bin/env node
/** Delegates P22 selection to bridge-os program office (clean stdout for baseline session). */
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { bridgeOsRoot } from './lib/resolve-fleet-paths.mjs';

const bridgeRoot = bridgeOsRoot();
const bridgeScript = join(bridgeRoot, 'platform/scripts/agent/agent-next-work.mjs');
const args = process.argv.slice(2);

const out = execFileSync('node', [bridgeScript, ...args], {
  cwd: bridgeRoot,
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});

process.stdout.write(out);
