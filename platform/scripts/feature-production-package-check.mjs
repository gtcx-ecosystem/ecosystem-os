#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const registryPath = join(root, 'pm/spec/feature-registry/ecosystem-os-features.json');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const errors = [];
const features = registry.features ?? [];

function readJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), 'utf8'));
}

for (const feature of features) {
  const base = `pm/features/${feature.id.toLowerCase()}`;
  const required = [
    `${base}/record.json`,
    `${base}/forensic-spec.json`,
    `${base}/audits/mpr.json`,
    `${base}/audits/signal.json`,
    `${base}/feature-pack/manifest.json`,
  ];
  for (const rel of required) {
    if (!existsSync(join(root, rel))) errors.push(`${feature.id}: missing ${rel}`);
  }
  if (!errors.some((e) => e.startsWith(feature.id))) {
    const pack = readJson(`${base}/feature-pack/manifest.json`);
    if (!Array.isArray(pack.acceptanceCriteria) || pack.acceptanceCriteria.length === 0) errors.push(`${feature.id}: missing acceptance criteria`);
    if (!Array.isArray(pack.qaTesting) || pack.qaTesting.length === 0) errors.push(`${feature.id}: missing qaTesting`);
    if (!Array.isArray(pack.sprintPlans) || pack.sprintPlans.length === 0) errors.push(`${feature.id}: missing sprintPlans`);
    if (!pack.mprReview || pack.mprReview.score100 !== 100) errors.push(`${feature.id}: missing MPR review`);
    if (!pack.signalReview || pack.signalReview.level !== 'L5') errors.push(`${feature.id}: missing SIGNAL review`);
  }
}

console.log(`feature:production-package:check score ${errors.length === 0 ? 100 : 0}/100 — ${features.length}/${features.length} feature packages reviewed`);
if (errors.length) {
  for (const error of errors.slice(0, 50)) console.log(`FAIL ${error}`);
}
process.exit(errors.length === 0 ? 0 : 1);
