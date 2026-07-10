#!/usr/bin/env node
/**
 * Resolve vertical-qualified fleet repo paths from ecosystem-os (post-2026-07-05 reorg).
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ECO_OS = join(dirname(fileURLToPath(import.meta.url)), '../../..');

export function findWorkspaceRoot(fromDir = ECO_OS) {
  const env = process.env.GTCX_ECOSYSTEM_ROOT;
  if (
    env &&
    existsSync(env) &&
    existsSync(join(env, 'gtcx.infrastructure')) &&
    existsSync(join(env, 'gtcx.ecosystem'))
  ) {
    return env;
  }
  let dir = fromDir;
  for (let i = 0; i < 6; i++) {
    if (
      existsSync(join(dir, 'gtcx.infrastructure')) &&
      existsSync(join(dir, 'gtcx.ecosystem'))
    ) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`resolve-fleet-paths: could not find gtcx-ecosystem root from ${fromDir}`);
}

export function fleetRepo(...segments) {
  return join(findWorkspaceRoot(), ...segments);
}

export const canonOsRoot = () => fleetRepo('gtcx.infrastructure', 'canon-os');
export const bridgeOsRoot = () => fleetRepo('gtcx.infrastructure', 'bridge-os');
export const baselineOsRoot = () => fleetRepo('gtcx.systems', 'baseline-os');
export const fabricOsRoot = () => fleetRepo('gtcx.infrastructure', 'fabric-os');

/** From ecosystem-os repo root — legacy `../../gtcx.infrastructure/canon-os` replacement. */
export const fromEcoOs = {
  canonOs: '../canon-os',
  bridgeOs: '../bridge-os',
  baselineOs: '../../../gtcx.ai/platforms/baseline-os',
  fabricOs: '../fabric-os',
};
