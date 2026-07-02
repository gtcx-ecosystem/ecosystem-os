#!/usr/bin/env node
/**
 * publish:check — validate machine/publish-register.json space paths resolve on disk.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { repoRootFromImportMeta } from './lib/repo-root.mjs';

const REPO = repoRootFromImportMeta(import.meta.url);
const ECOSYSTEM = dirname(REPO);
const WRITE = process.argv.includes('--write');
const REGISTER = [join(REPO, 'machine/publish-register.json'), join(REPO, 'pm/publish-register.json')].find((path) =>
  existsSync(path),
);
const WITNESS = join(REPO, 'audit/evidence/publish-register-latest.json');

function resolveSourcePath(sourcePath) {
  if (!sourcePath) return null;
  if (sourcePath.startsWith('/')) return sourcePath;
  const candidates = [
    join(ECOSYSTEM, sourcePath),
    sourcePath.startsWith('pm/') ? join(ECOSYSTEM, sourcePath.replace(/^pm\//, 'machine/')) : null,
    sourcePath.startsWith('ops/') ? join(ECOSYSTEM, sourcePath.replace(/^ops\//, 'operations/')) : null,
    join(REPO, sourcePath),
    sourcePath.startsWith('pm/') ? join(REPO, sourcePath.replace(/^pm\//, 'machine/')) : null,
    sourcePath.startsWith('ops/') ? join(REPO, sourcePath.replace(/^ops\//, 'operations/')) : null,
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}

function main() {
  const errors = [];
  const rows = [];
  if (!REGISTER) {
    console.error('publish register missing: machine/publish-register.json');
    process.exit(1);
  }
  const reg = JSON.parse(readFileSync(REGISTER, 'utf8'));

  for (const space of reg.spaces ?? []) {
    const tracked = space.status === 'live' || space.status === 'synced';
    const abs = tracked ? resolveSourcePath(space.sourcePath) : null;
    const ok = !tracked || (abs && existsSync(abs));
    rows.push({
      id: space.id,
      status: space.status,
      sourcePath: space.sourcePath,
      resolved: abs,
      ok,
      tracked,
    });
    if (tracked && !ok) {
      errors.push(`${space.id}: missing ${space.sourcePath}`);
    }
    if (tracked && space.summary) {
      const sumAbs = resolveSourcePath(space.summary);
      if (!sumAbs || !existsSync(sumAbs)) {
        errors.push(`${space.id}: summary missing ${space.summary}`);
      }
    }
  }

  const liveSynced = (reg.spaces ?? []).filter((s) => s.status === 'live' || s.status === 'synced');
  const witness = {
    schema: 'gtcx://ecosystem-os/publish-register-check/v1',
    repo: 'ecosystem-os',
    at: new Date().toISOString(),
    ok: errors.length === 0,
    spaceCount: reg.spaces?.length ?? 0,
    liveSyncedCount: liveSynced.length,
    rows,
    errors,
  };

  if (WRITE) {
    mkdirSync(join(REPO, 'audit/evidence'), { recursive: true });
    writeFileSync(WITNESS, `${JSON.stringify(witness, null, 2)}\n`);
  }

  console.log('=== publish:check ===\n');
  for (const r of rows) {
    console.log(`${r.ok ? 'OK' : 'FAIL'} ${r.id} (${r.status}) — ${r.sourcePath}`);
  }
  console.log(`\n${witness.ok ? 'PASS' : 'FAIL'} — ${liveSynced.length} live/synced · ${errors.length} error(s)`);
  if (WRITE) console.log(`witness: ${WITNESS}`);
  process.exit(witness.ok ? 0 : 1);
}

main();
