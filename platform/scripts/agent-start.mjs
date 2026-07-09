#!/usr/bin/env node
/**
 * Satellite agent start — forwards to baseline-os `baseline start` (full chain SSOT).
 * Canonical copy: baseline-os/platform/scripts/templates/satellite-agent-start.mjs
 * Paths: local config/agent-consumption-contract.json → baseline-os bin (fixture, not spec authority).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SATELLITE_ROOT = join(__dirname, '../..');
const CONTRACT_REL = 'config/agent-consumption-contract.json';
const DEFAULT_BIN_REL = 'platform/packages/baselineos/dist/cli/bin.js';

const MARKERS = [
  join('platform', 'scripts', 'ecosystem', 'repo-session-core.mjs'),
  join('03-platform', 'scripts', 'ecosystem', 'repo-session-core.mjs'),
];

const BASELINE_DIR_NAMES = ['baseline-os', 'baselineOS'];

function isBaselineRoot(root) {
  if (!root || !existsSync(root)) return false;
  return MARKERS.some((m) => existsSync(join(root, m)));
}

function findBaselineOsRoot(fromDir = process.cwd()) {
  const candidates = [];
  if (process.env.BASELINE_OS_ROOT) candidates.push(resolve(process.env.BASELINE_OS_ROOT));
  if (process.env.GTCX_ECOSYSTEM_ROOT) {
    for (const name of BASELINE_DIR_NAMES) {
      candidates.push(join(process.env.GTCX_ECOSYSTEM_ROOT, name));
    }
  }
  let dir = resolve(fromDir);
  for (let i = 0; i < 6; i++) {
    for (const name of BASELINE_DIR_NAMES) {
      candidates.push(join(dir, name));
      candidates.push(join(dir, '..', name));
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  for (const root of [...new Set(candidates.map((p) => resolve(p)))]) {
    if (isBaselineRoot(root)) return root;
  }
  return null;
}

function resolveBaselineosBin(baselineRoot, satelliteRoot) {
  const localContract = join(satelliteRoot, CONTRACT_REL);
  const contractPath = existsSync(localContract)
    ? localContract
    : join(baselineRoot, CONTRACT_REL);
  const rel = existsSync(contractPath)
    ? JSON.parse(readFileSync(contractPath, 'utf8')).baselineosBinRel ?? DEFAULT_BIN_REL
    : DEFAULT_BIN_REL;
  return join(baselineRoot, rel);
}

const LEGACY_REPO_ALIASES = {
  'markets-os': 'markets-os',
  gtcxOS: 'gtcx-os',
  bridgeOS: 'bridge-os',
  baselineOS: 'baseline-os',
  complianceOS: 'compliance-os',
};

function resolveSatelliteCwd() {
  const cwd = process.cwd();
  const base = cwd.split('/').pop() ?? '';
  const legacy = LEGACY_REPO_ALIASES[base];
  if (!legacy || legacy === base) return cwd;
  const eco = process.env.GTCX_ECOSYSTEM_ROOT ?? resolve(cwd, '..');
  const kebab = join(eco, legacy);
  if (existsSync(join(kebab, 'package.json'))) {
    console.error(
      `NOTE: legacy path ${cwd} — fleet rename uses ${legacy}. Using ${kebab} for baseline start.`,
    );
    return kebab;
  }
  console.error(`ERROR: cwd uses retired folder name "${base}" — rename or symlink to ${legacy}.`);
  process.exit(1);
}

const repoCwd = resolveSatelliteCwd();
const baselineRoot = findBaselineOsRoot(repoCwd);
if (!baselineRoot) {
  console.error(
    'ERROR: baseline-os not found (side-by-side checkout or set GTCX_ECOSYSTEM_ROOT / BASELINE_OS_ROOT).',
  );
  process.exit(1);
}

const baselineBin = resolveBaselineosBin(baselineRoot, SATELLITE_ROOT);
if (!existsSync(baselineBin)) {
  console.error(`ERROR: baselineos CLI not built: ${baselineBin}`);
  console.error('Run: cd ../../gtcx.ai/platforms/baseline-os && pnpm --filter baselineos build');
  process.exit(1);
}

const passthrough = process.argv.slice(2);
const result = spawnSync(process.execPath, [baselineBin, 'start', ...passthrough], {
  stdio: 'inherit',
  cwd: repoCwd,
  env: {
    ...process.env,
    GTCX_ECOSYSTEM_ROOT: process.env.GTCX_ECOSYSTEM_ROOT ?? resolve(baselineRoot, '..'),
    BASELINE_OS_ROOT: baselineRoot,
  },
});
process.exit(result.status ?? 1);
