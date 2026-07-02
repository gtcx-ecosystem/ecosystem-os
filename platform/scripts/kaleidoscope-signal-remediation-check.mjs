#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SPEC = 'machine/spec/kaleidoscope-ai/signal-module-remediation.json';
const DEFAULT_MACHINE_SPEC = 'machine/spec/kaleidoscope-ai/signal-module-remediation.json';
const REQUIRED_MODULES = ['agency', 'ethos', 'graph', 'kernel', 'ledger', 'surface', 'venture'];
const REQUIRED_DIMENSIONS = ['systemsArchitecture', 'tooling', 'process', 'safeguards', 'monitoring', 'teamOwnership'];
const REQUIRED_EVIDENCE = ['approval', 'eval', 'learningLoop', 'policy', 'rollback', 'trace'];
const REQUIRED_L5_EVIDENCE = [
  'autonomousExperimentation',
  'crossModuleLearning',
  'generativeDesign',
  'humanOverride',
  'policySynthesis',
  'selfImprovement'
];
const EVIDENCE_FIELDS = {
  trace: 'traceEvidence',
  policy: 'policyEvidence',
  approval: 'approvalEvidence',
  eval: 'evalEvidence',
  rollback: 'rollbackEvidence',
  learningLoop: 'learningLoopEvidence'
};
const L5_EVIDENCE_FIELDS = {
  autonomousExperimentation: 'autonomousExperimentationEvidence',
  crossModuleLearning: 'crossModuleLearningEvidence',
  generativeDesign: 'generativeDesignEvidence',
  humanOverride: 'humanOverrideEvidence',
  policySynthesis: 'policySynthesisEvidence',
  selfImprovement: 'selfImprovementEvidence'
};
const CLAIM_STATUSES = new Set(['candidate', 'done', 'complete', 'completed', 'approved']);

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
function absolute(root, path) {
  if (isAbsolute(path)) return path;
  const candidates = [
    resolve(root, path),
    path.startsWith('pm/') ? resolve(root, path.replace(/^pm\//, 'machine/')) : null,
    path.startsWith('ops/') ? resolve(root, path.replace(/^ops\//, 'operations/')) : null,
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}
const sorted = (values) => [...values].sort();
const sameMembers = (actual, expected) =>
  JSON.stringify(sorted(actual ?? [])) === JSON.stringify(sorted(expected));

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  }
  return value;
}

const sameJson = (left, right) => JSON.stringify(canonical(left)) === JSON.stringify(canonical(right));

function validateEvidenceSet(root, moduleId, axis, label, set, errors) {
  if (!set || set.present !== true) {
    errors.push(`${moduleId}/${axis}: ${label} evidence must be present.`);
    return;
  }
  if (!Number.isInteger(set.minimumCount) || set.minimumCount < 1) {
    errors.push(`${moduleId}/${axis}: ${label} minimumCount must be at least 1.`);
    return;
  }
  if (!Array.isArray(set.items) || set.items.length < set.minimumCount) {
    errors.push(`${moduleId}/${axis}: ${label} evidence does not meet minimumCount.`);
    return;
  }
  if (!Array.isArray(set.gaps) || set.gaps.length !== 0) {
    errors.push(`${moduleId}/${axis}: ${label} evidence must have no open gaps.`);
  }
  for (const item of set.items) {
    if (!item || typeof item.path !== 'string' || item.path.trim() === '') {
      errors.push(`${moduleId}/${axis}: ${label} evidence item path is required.`);
      continue;
    }
    if (typeof item.kind !== 'string' || typeof item.description !== 'string' || item.description.trim() === '') {
      errors.push(`${moduleId}/${axis}: ${label} evidence items require kind and description.`);
    }
    if (!existsSync(absolute(root, item.path))) {
      errors.push(`${moduleId}/${axis}: ${label} evidence path is missing: ${item.path}`);
    }
  }
}

function validateWitness(root, moduleId, axis, witnessPath, errors) {
  let witness;
  try {
    witness = readJson(absolute(root, witnessPath));
  } catch (error) {
    errors.push(`${moduleId}/${axis}: cannot parse witness ${witnessPath}: ${error.message}`);
    return;
  }
  if (witness.schema !== 'gtcx://ecosystem-os/kaleidoscope-ai/signal-l3-evidence-pack/v1') {
    errors.push(`${moduleId}/${axis}: unexpected witness schema.`);
  }
  if (witness.scope !== 'product' || witness.moduleId !== moduleId) {
    errors.push(`${moduleId}/${axis}: witness scope/module identity mismatch.`);
  }
  if (witness.signalAxis !== axis || witness.requestedLevel !== 'L3' || witness.ok !== true) {
    errors.push(`${moduleId}/${axis}: witness must be an ok L3 ${axis} claim.`);
  }
  if (Number.isNaN(Date.parse(witness.generatedAt))) {
    errors.push(`${moduleId}/${axis}: generatedAt must be a valid date-time.`);
  }
  for (const evidence of REQUIRED_EVIDENCE) {
    const summaryField = `${evidence}EvidencePresent`;
    if (witness.summary?.[summaryField] !== true) {
      errors.push(`${moduleId}/${axis}: summary.${summaryField} must be true.`);
    }
    validateEvidenceSet(root, moduleId, axis, evidence, witness[EVIDENCE_FIELDS[evidence]], errors);
  }
  if (
    witness.releaseGate?.status !== 'approved' ||
    !Array.isArray(witness.releaseGate?.blockingCriteria) ||
    witness.releaseGate.blockingCriteria.length !== 0
  ) {
    errors.push(`${moduleId}/${axis}: release gate must be approved with no blocking criteria.`);
  }
}

function validateL5Witness(root, moduleId, axis, witnessPath, errors) {
  let witness;
  try {
    witness = readJson(absolute(root, witnessPath));
  } catch (error) {
    errors.push(`${moduleId}/${axis}: cannot parse L5 witness ${witnessPath}: ${error.message}`);
    return;
  }
  if (witness.schema !== 'gtcx://ecosystem-os/kaleidoscope-ai/signal-l5-evidence-pack/v1') {
    errors.push(`${moduleId}/${axis}: unexpected L5 witness schema.`);
  }
  if (witness.scope !== 'product' || witness.moduleId !== moduleId) {
    errors.push(`${moduleId}/${axis}: L5 witness scope/module identity mismatch.`);
  }
  if (witness.signalAxis !== axis || witness.requestedLevel !== 'L5' || witness.ok !== true) {
    errors.push(`${moduleId}/${axis}: witness must be an ok L5 ${axis} claim.`);
  }
  if (Number.isNaN(Date.parse(witness.generatedAt))) {
    errors.push(`${moduleId}/${axis}: L5 generatedAt must be a valid date-time.`);
  }
  if (
    !Number.isInteger(witness.operatingCycle?.consecutivePasses) ||
    !Number.isInteger(witness.operatingCycle?.minimumRequired) ||
    witness.operatingCycle.consecutivePasses < 5 ||
    witness.operatingCycle.minimumRequired < 5
  ) {
    errors.push(`${moduleId}/${axis}: L5 witness requires at least five consecutive operating-cycle passes.`);
  }
  if (witness.operatingCycle?.humanOverrideExercised !== true) {
    errors.push(`${moduleId}/${axis}: L5 witness must exercise human override.`);
  }
  for (const evidence of REQUIRED_L5_EVIDENCE) {
    const summaryField = `${evidence}EvidencePresent`;
    if (witness.summary?.[summaryField] !== true) {
      errors.push(`${moduleId}/${axis}: summary.${summaryField} must be true.`);
    }
    validateEvidenceSet(root, moduleId, axis, evidence, witness[L5_EVIDENCE_FIELDS[evidence]], errors);
  }
  if (
    witness.releaseGate?.status !== 'approved' ||
    !Array.isArray(witness.releaseGate?.blockingCriteria) ||
    witness.releaseGate.blockingCriteria.length !== 0
  ) {
    errors.push(`${moduleId}/${axis}: L5 release gate must be approved with no blocking criteria.`);
  }
}

export function validateRemediation({
  root = DEFAULT_REPO,
  specRel = DEFAULT_SPEC,
  machineSpecRel = DEFAULT_MACHINE_SPEC,
  requireL3 = false,
  requireL5 = false
} = {}) {
  const errors = [];
  const missingWitnesses = [];
  const missingL5Witnesses = [];
  let spec;
  let machineSpec;
  try {
    spec = readJson(absolute(root, specRel));
  } catch (error) {
    return { errors: [`Cannot parse remediation spec: ${error.message}`], missingWitnesses, missingL5Witnesses, modules: [] };
  }
  try {
    machineSpec = readJson(absolute(root, machineSpecRel));
  } catch (error) {
    errors.push(`Cannot parse machine remediation mirror: ${error.message}`);
  }

  if (machineSpec && !sameJson(spec, machineSpec)) errors.push('PM and machine remediation specs have drifted.');
  if (spec.$schema !== 'gtcx://ecosystem-os/kaleidoscope-ai/signal-module-remediation/v1') {
    errors.push('Unexpected remediation schema.');
  }
  if (spec.owner !== 'ecosystem-os') errors.push('Remediation owner must be ecosystem-os.');
  if (!['in_progress', 'candidate', 'done', 'complete', 'completed', 'approved'].includes(spec.status)) {
    errors.push('Remediation status is invalid.');
  }
  if (spec.baseline?.signalP?.level !== 'L2' || spec.baseline?.signalP?.score100 !== 45) {
    errors.push('SIGNAL-P baseline must remain L2/45 until a newer witness is published.');
  }
  if (spec.baseline?.signalE?.level !== 'L2' || spec.baseline?.signalE?.score100 !== 45) {
    errors.push('SIGNAL-E baseline must remain L2/45 until a newer witness is published.');
  }
  if (spec.baseline?.moduleScoresAreProvisional !== true) {
    errors.push('Inherited module scores must be marked provisional.');
  }
  if (!sameMembers(spec.dimensions, REQUIRED_DIMENSIONS)) {
    errors.push('The remediation contract must include all six SIGNAL dimensions.');
  }
  if (!sameMembers(spec.requiredEvidenceSets, REQUIRED_EVIDENCE)) {
    errors.push('The remediation contract must include all six L3 evidence sets.');
  }
  if (!sameMembers(spec.requiredL5EvidenceSets, REQUIRED_L5_EVIDENCE)) {
    errors.push('The remediation contract must include all six L5 evidence sets.');
  }

  const modules = spec.modules ?? [];
  if (!sameMembers(modules.map((module) => module.id), REQUIRED_MODULES)) {
    errors.push('The remediation contract must contain exactly the seven ecosystem-os-led modules.');
  }
  if (new Set(modules.map((module) => module.id)).size !== modules.length) errors.push('Module IDs must be unique.');

  const enforceL3 = requireL3 || requireL5 || CLAIM_STATUSES.has(spec.status);
  const enforceL5 = requireL5 || CLAIM_STATUSES.has(spec.status);
  for (const module of modules) {
    if (module.productLead !== 'ecosystem-os') errors.push(`${module.id}: productLead must be ecosystem-os.`);
    if (!Array.isArray(module.implementationPartners) || module.implementationPartners.length === 0) {
      errors.push(`${module.id}: at least one implementation partner is required.`);
    }
    if (!Array.isArray(module.metrics) || module.metrics.length === 0) {
      errors.push(`${module.id}: at least one measurable maturity metric is required.`);
    }
    if (typeof module.releaseGateOwner !== 'string' || module.releaseGateOwner.trim() === '') {
      errors.push(`${module.id}: releaseGateOwner is required.`);
    }
    if (!Array.isArray(module.escalationPath) || module.escalationPath.length < 2) {
      errors.push(`${module.id}: escalationPath must contain at least two stages.`);
    }
    for (const field of ['bottleneck', 'l3CompletionSignal', 'l5CompletionSignal']) {
      if (typeof module[field] !== 'string' || module[field].trim() === '') errors.push(`${module.id}: ${field} is required.`);
    }
    for (const axis of ['SIGNAL-P', 'SIGNAL-E']) {
      const key = axis === 'SIGNAL-P' ? 'signalP' : 'signalE';
      const witnessPath = module.scopedWitnesses?.[key];
      if (typeof witnessPath !== 'string' || witnessPath.trim() === '') {
        errors.push(`${module.id}: scopedWitnesses.${key} is required.`);
        continue;
      }
      if (!existsSync(absolute(root, witnessPath))) {
        missingWitnesses.push(`${module.id}/${axis}: ${witnessPath}`);
        if (enforceL3) errors.push(`${module.id}/${axis}: required L3 witness is missing: ${witnessPath}`);
      } else {
        validateWitness(root, module.id, axis, witnessPath, errors);
      }
      const l5WitnessPath = module.l5Witnesses?.[key];
      if (typeof l5WitnessPath !== 'string' || l5WitnessPath.trim() === '') {
        errors.push(`${module.id}: l5Witnesses.${key} is required.`);
        continue;
      }
      if (!existsSync(absolute(root, l5WitnessPath))) {
        missingL5Witnesses.push(`${module.id}/${axis}: ${l5WitnessPath}`);
        if (enforceL5) errors.push(`${module.id}/${axis}: required L5 witness is missing: ${l5WitnessPath}`);
      } else {
        validateL5Witness(root, module.id, axis, l5WitnessPath, errors);
      }
    }
  }

  if (spec.targets?.firstGate?.level !== 'L3' || spec.targets?.firstGate?.minimumScore100 < 60) {
    errors.push('The first gate must target L3 at score 60 or higher.');
  }
  if (
    spec.targets?.operatingGate?.level !== 'L4' ||
    spec.targets?.operatingGate?.minimumScore100 < 76 ||
    spec.targets?.operatingGate?.requiredConsecutiveWitnesses < 3
  ) {
    errors.push('The operating gate must target L4 at score 76 or higher with three witnesses.');
  }
  if (
    spec.targets?.strategic?.level !== 'L5' ||
    spec.targets?.strategic?.minimumScore100 < 92 ||
    spec.targets?.strategic?.requiredConsecutiveWitnesses < 5
  ) {
    errors.push('The strategic gate must target L5 at score 92 or higher with five witnesses.');
  }
  for (const path of [
    spec.releaseGate?.l3EvidenceContract,
    spec.releaseGate?.l5EvidenceContract,
    spec.releaseGate?.plan,
    spec.releaseGate?.feature,
    spec.releaseGate?.story,
    spec.releaseGate?.storyL5
  ]) {
    if (!path || !existsSync(absolute(root, path))) errors.push(`Required local contract path is missing: ${path}`);
  }
  return { errors, missingWitnesses, missingL5Witnesses, modules };
}

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function main() {
  const requireL3 = process.argv.includes('--require-l3');
  const requireL5 = process.argv.includes('--require-l5');
  const result = validateRemediation({
    root: argumentValue('--root') ?? DEFAULT_REPO,
    specRel: argumentValue('--spec') ?? DEFAULT_SPEC,
    machineSpecRel: argumentValue('--machine-spec') ?? DEFAULT_MACHINE_SPEC,
    requireL3,
    requireL5
  });
  if (result.errors.length > 0) {
    console.error(`SIGNAL remediation check FAIL (${result.errors.length})`);
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(
    `SIGNAL remediation check PASS: ${result.modules.length} modules; ` +
      `${result.missingWitnesses.length}/14 scoped L3 witnesses pending; ` +
      `${result.missingL5Witnesses.length}/14 scoped L5 witnesses pending; ` +
      `mode=${requireL5 ? 'require-l5' : requireL3 ? 'require-l3' : 'integrity'}.`
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
