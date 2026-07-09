#!/usr/bin/env node
/**
 * Agent consumption drift check — scan this repo against config/agent-consumption-contract.json.
 * Delegates to baseline-os SSOT scanner when sibling checkout exists (cwd = this repo).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const CONTRACT_REL = 'config/agent-consumption-contract.json';
const SKIP = new Set(['node_modules', '.git', 'dist', '.turbo', 'coverage', 'archive', '_reports', '.baseline', '.worktrees']);
const SCAN_EXT = /\.(mjs|js|ts|tsx|json|md|sh|mdc)$/;

function findBaselineOsRoot() {
  const candidates = [
    process.env.BASELINE_OS_ROOT,
    process.env.GTCX_ECOSYSTEM_ROOT ? join(process.env.GTCX_ECOSYSTEM_ROOT, 'baseline-os') : '',
    resolve(REPO, '../../gtcx.ai/platforms/baseline-os'),
  ].filter(Boolean);
  const marker = join('platform', 'scripts', 'ecosystem', 'repo-session-core.mjs');
  for (const root of candidates) {
    if (existsSync(join(root, marker))) return root;
  }
  return null;
}

function loadContract() {
  const path = join(REPO, CONTRACT_REL);
  if (!existsSync(path)) {
    throw new Error(`missing ${CONTRACT_REL}`);
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

function walk(dir, out = [], depth = 0) {
  if (depth > 10 || !existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const abs = join(dir, name);
    let st;
    try {
      st = statSync(abs);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(abs, out, depth + 1);
    else if (SCAN_EXT.test(name)) out.push(abs);
  }
  return out;
}

function hasLegacyPath(text, legacyFragments, legacyPatterns) {
  for (const frag of legacyFragments) {
    if (text.includes(frag)) return frag;
  }
  for (const p of legacyPatterns) {
    const re = new RegExp(p, 'g');
    if (re.test(text)) return p;
  }
  return null;
}

function scriptsMatch(key, actual, expected) {
  if (actual === expected) return true;
  if (['session', 'next', 'gates', 'hub', 'mcp', 'serve'].includes(key)) {
    return actual.includes('../../gtcx.ai/platforms/baseline-os/platform/');
  }
  return false;
}

function localScan() {
  const contract = loadContract();
  const legacyFragments = contract.legacyPathFragments ?? [];
  const legacyPatterns = contract.legacyPathPatterns ?? [];
  const failures = [];
  const expected = contract.shims?.packageJson ?? {};

  const pkgPath = join(REPO, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  for (const [key, value] of Object.entries(pkg.scripts ?? {})) {
    if (typeof value !== 'string') continue;
    const hit = hasLegacyPath(value, legacyFragments, legacyPatterns);
    if (hit) failures.push(`package.json scripts.${key} contains legacy path: ${hit}`);
    if (expected[key] && scriptsMatch(key, value, expected[key]) === false) {
      failures.push(`package.json scripts.${key} drift from contract shim`);
    }
  }

  for (const file of walk(REPO)) {
    if (file.includes('check-agent-consumption.mjs')) continue;
    if (file.includes('agent-consumption-contract.json')) continue;
    const rel = relative(REPO, file);
    if (rel.startsWith('workstream/')) continue;
    if (rel.includes('/__tests__/') || rel.includes('.test.')) continue;
    const text = readFileSync(file, 'utf8');
    const hit = hasLegacyPath(text, legacyFragments, legacyPatterns);
    if (hit) failures.push(`${rel}: legacy path ${hit}`);
  }

  const distBin = resolve(REPO, contract.distStaleCheck?.bin ?? '');
  if (distBin && !existsSync(distBin)) {
    failures.push(`baseline dist missing: ${contract.distStaleCheck.bin} — run ${contract.distStaleCheck.rebuild}`);
  }

  return failures;
}

const baselineRoot = findBaselineOsRoot();
const checkScript = baselineRoot
  ? join(baselineRoot, 'platform/scripts/check-agent-consumption.mjs')
  : null;

const failures = localScan();

if (checkScript && existsSync(checkScript)) {
  const r = spawnSync(process.execPath, [checkScript], { cwd: REPO, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

if (failures.length) {
  console.error('agent:consumption:check FAILED');
  console.error(`  contract: ${CONTRACT_REL}`);
  for (const f of failures.slice(0, 40)) console.error(`  - ${f}`);
  if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
  process.exit(1);
}

console.log('agent:consumption:check OK');
console.log(`  contract: ${CONTRACT_REL}`);
console.log(`  runtime: ${baselineRoot ?? 'baseline-os (not sibling-scanned)'}`);
