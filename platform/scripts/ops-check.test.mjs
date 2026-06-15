import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

test('ops:check exits 0', () => {
  const r = spawnSync(process.execPath, ['platform/scripts/ops-check.mjs'], { cwd: root });
  assert.equal(r.status, 0, r.stderr?.toString() || r.stdout?.toString());
});
