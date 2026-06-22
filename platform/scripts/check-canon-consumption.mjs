#!/usr/bin/env node
/**
 * canon:consumption:check — verify canon-os read-only consumption pins resolve.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '../..');
const MANIFEST = join(REPO, 'config/canon-os-consumption.json');

function gate(id, ok, detail = '') {
  return { id, ok, detail };
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function resolveFromRepo(rel) {
  return resolve(REPO, rel);
}

function main() {
  const gates = [];

  if (!existsSync(MANIFEST)) {
    console.error('canon:consumption:check FAIL — missing config/canon-os-consumption.json');
    process.exit(1);
  }

  const manifest = loadJson(MANIFEST);
  gates.push(gate('manifest:writes-false', manifest.writes === false, 'read-only consumer'));

  for (const [key, rel] of Object.entries(manifest.resolve ?? {})) {
    const abs = resolveFromRepo(rel);
    gates.push(gate(`resolve:${key}`, existsSync(abs), rel));
  }

  const central = resolveFromRepo(manifest.standardSoR?.centralManifest ?? '');
  gates.push(gate('central-sor', existsSync(central), manifest.standardSoR?.centralManifest ?? ''));

  const registry = resolveFromRepo(manifest.standardSoR?.fleetContractsRegistry ?? '');
  gates.push(
    gate('fleet-contracts-registry', existsSync(registry), manifest.standardSoR?.fleetContractsRegistry ?? ''),
  );

  const rollout = resolveFromRepo(manifest.standardSoR?.rolloutProgram ?? '');
  gates.push(gate('rollout-program', existsSync(rollout), manifest.standardSoR?.rolloutProgram ?? ''));

  const localFleetContracts = join(REPO, 'machine/spec/canon-os-fleet-contracts.json');
  gates.push(
    gate('local:fleet-contracts-pin', existsSync(localFleetContracts), 'machine/spec/canon-os-fleet-contracts.json'),
  );

  const localRolloutPin = join(REPO, 'machine/spec/fleet-repo-rollout-program.json');
  gates.push(
    gate(
      'local:rollout-program-pin',
      existsSync(localRolloutPin),
      'machine/spec/fleet-repo-rollout-program.json',
    ),
  );

  for (const [contractId, pinRel] of Object.entries(manifest.contracts ?? {})) {
    const pinPath = resolveFromRepo(pinRel);
    gates.push(gate(`pin:${contractId}`, existsSync(pinPath), pinRel));
    if (!existsSync(pinPath)) continue;
    const pin = loadJson(pinPath);
    if (pin.sor) {
      const sorAbs = resolveFromRepo(pin.sor);
      gates.push(gate(`sor:${contractId}`, existsSync(sorAbs), pin.sor));
    }
  }

  const renamePin = resolveFromRepo(manifest.folderIdentity?.renamePolicyPin ?? 'config/folder-rename-policy.json');
  if (existsSync(renamePin)) {
    const rename = loadJson(renamePin);
    if (rename.sor) {
      gates.push(gate('folder-rename-policy', existsSync(resolveFromRepo(rename.sor)), rename.sor));
    }
  }

  const folderRegistry = resolveFromRepo(manifest.folderIdentity?.localResolver ?? '');
  gates.push(gate('folder-registry', existsSync(folderRegistry), manifest.folderIdentity?.localResolver ?? ''));

  const failed = gates.filter((g) => !g.ok);
  for (const g of gates) {
    if (!g.ok) console.log(`FAIL ${g.id}${g.detail ? ` — ${g.detail}` : ''}`);
  }

  const ok = failed.length === 0;
  console.log(`\n${ok ? 'PASS' : 'FAIL'} — canon:consumption:check ${gates.length - failed.length}/${gates.length}`);

  if (ok) {
    const contractCheck = join(REPO, '../canon-os/platform/scripts/check-product-canon-contract.mjs');
    if (existsSync(contractCheck)) {
      const r = spawnSync(process.execPath, [contractCheck], { cwd: REPO, stdio: 'inherit' });
      if ((r.status ?? 1) !== 0) process.exit(r.status ?? 1);
    }
  }

  process.exit(ok ? 0 : 1);
}

main();
