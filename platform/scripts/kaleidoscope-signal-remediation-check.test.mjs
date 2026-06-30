import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { validateRemediation } from './kaleidoscope-signal-remediation-check.mjs';

const MODULES = ['kernel', 'graph', 'ledger', 'surface', 'ethos', 'venture', 'agency'];

function writeJson(root, rel, value) {
  const path = join(root, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'signal-remediation-'));
  const spec = {
    $schema: 'gtcx://ecosystem-os/kaleidoscope-ai/signal-module-remediation/v1',
    status: 'in_progress',
    owner: 'ecosystem-os',
    baseline: {
      signalP: { level: 'L2', score100: 45 },
      signalE: { level: 'L2', score100: 45 },
      moduleScoresAreProvisional: true
    },
    targets: {
      firstGate: { level: 'L3', minimumScore100: 60 },
      operatingGate: { level: 'L4', minimumScore100: 76, requiredConsecutiveWitnesses: 3 },
      strategic: { level: 'L5', minimumScore100: 92, requiredConsecutiveWitnesses: 5 }
    },
    dimensions: ['systemsArchitecture', 'tooling', 'process', 'safeguards', 'monitoring', 'teamOwnership'],
    requiredEvidenceSets: ['trace', 'policy', 'approval', 'eval', 'rollback', 'learningLoop'],
    requiredL5EvidenceSets: [
      'selfImprovement',
      'generativeDesign',
      'policySynthesis',
      'crossModuleLearning',
      'autonomousExperimentation',
      'humanOverride'
    ],
    modules: MODULES.map((id) => ({
      id,
      productLead: 'ecosystem-os',
      implementationPartners: ['partner-os'],
      metrics: ['evidence completeness'],
      releaseGateOwner: 'ecosystem-os',
      escalationPath: ['ecosystem-os product lead', 'partner owner'],
      bottleneck: 'runtime evidence missing',
      l3CompletionSignal: 'all evidence sets pass',
      l5CompletionSignal: 'the module improves policy from measured outcomes while preserving human override',
      scopedWitnesses: {
        signalP: `audit/evidence/signal-product-${id}-p-latest.json`,
        signalE: `audit/evidence/signal-product-${id}-e-latest.json`
      },
      l5Witnesses: {
        signalP: `audit/evidence/signal-product-${id}-p-l5-latest.json`,
        signalE: `audit/evidence/signal-product-${id}-e-l5-latest.json`
      }
    })),
    releaseGate: {
      l3EvidenceContract: 'pm/spec/l3.schema.json',
      l5EvidenceContract: 'pm/spec/l5.schema.json',
      plan: 'docs/plan.md',
      feature: 'docs/feature.md',
      story: 'docs/story.md',
      storyL5: 'docs/story-l5.md'
    }
  };
  for (const path of ['pm/spec/l3.schema.json', 'pm/spec/l5.schema.json', 'docs/plan.md', 'docs/feature.md', 'docs/story.md', 'docs/story-l5.md']) {
    const target = join(root, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, path.endsWith('.json') ? '{}\n' : '# fixture\n');
  }
  writeJson(root, 'pm/spec/remediation.json', spec);
  writeJson(root, 'machine/spec/remediation.json', spec);
  return { root, spec };
}

function evidenceSet(root, moduleId, axis, kind) {
  const path = `evidence/${moduleId}-${axis}-${kind}.txt`;
  const target = join(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, 'evidence\n');
  return {
    present: true,
    minimumCount: 1,
    items: [{ path, kind: kind === 'learningLoop' ? 'learning-loop' : kind, description: `${kind} evidence` }],
    gaps: []
  };
}

function writeWitnesses(root, spec) {
  for (const module of spec.modules) {
    for (const [key, axis] of [['signalP', 'SIGNAL-P'], ['signalE', 'SIGNAL-E']]) {
      const sets = Object.fromEntries(
        ['trace', 'policy', 'approval', 'eval', 'rollback', 'learningLoop'].map((kind) => [
          `${kind}Evidence`,
          evidenceSet(root, module.id, key, kind)
        ])
      );
      writeJson(root, module.scopedWitnesses[key], {
        schema: 'gtcx://ecosystem-os/kaleidoscope-ai/signal-l3-evidence-pack/v1',
        generatedAt: '2026-06-29T00:00:00.000Z',
        repo: 'ecosystem-os',
        scope: 'product',
        moduleId: module.id,
        signalAxis: axis,
        requestedLevel: 'L3',
        ok: true,
        summary: {
          traceEvidencePresent: true,
          policyEvidencePresent: true,
          approvalEvidencePresent: true,
          evalEvidencePresent: true,
          rollbackEvidencePresent: true,
          learningLoopEvidencePresent: true
        },
        ...sets,
        releaseGate: { status: 'approved', blockingCriteria: [], validationCommands: [], approvalRequired: false }
      });
    }
  }
}

function writeL5Witnesses(root, spec) {
  for (const module of spec.modules) {
    for (const [key, axis] of [['signalP', 'SIGNAL-P'], ['signalE', 'SIGNAL-E']]) {
      const sets = Object.fromEntries(
        ['selfImprovement', 'generativeDesign', 'policySynthesis', 'crossModuleLearning', 'autonomousExperimentation', 'humanOverride'].map((kind) => [
          `${kind}Evidence`,
          evidenceSet(root, module.id, key, kind)
        ])
      );
      writeJson(root, module.l5Witnesses[key], {
        schema: 'gtcx://ecosystem-os/kaleidoscope-ai/signal-l5-evidence-pack/v1',
        generatedAt: '2026-06-29T00:00:00.000Z',
        repo: 'ecosystem-os',
        scope: 'product',
        moduleId: module.id,
        signalAxis: axis,
        requestedLevel: 'L5',
        ok: true,
        operatingCycle: {
          consecutivePasses: 5,
          minimumRequired: 5,
          humanOverrideExercised: true
        },
        summary: {
          selfImprovementEvidencePresent: true,
          generativeDesignEvidencePresent: true,
          policySynthesisEvidencePresent: true,
          crossModuleLearningEvidencePresent: true,
          autonomousExperimentationEvidencePresent: true,
          humanOverrideEvidencePresent: true
        },
        ...sets,
        releaseGate: { status: 'approved', blockingCriteria: [], validationCommands: [], approvalRequired: false }
      });
    }
  }
}

const validate = (root, requireL3 = false) =>
  validateRemediation({
    root,
    specRel: 'pm/spec/remediation.json',
    machineSpecRel: 'machine/spec/remediation.json',
    requireL3
  });

const validateL5 = (root) =>
  validateRemediation({
    root,
    specRel: 'pm/spec/remediation.json',
    machineSpecRel: 'machine/spec/remediation.json',
    requireL5: true
  });

test('integrity mode permits honestly pending scoped witnesses', (t) => {
  const { root } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const result = validate(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.missingWitnesses.length, 14);
  assert.equal(result.missingL5Witnesses.length, 14);
});

test('L3 mode blocks missing scoped witnesses', (t) => {
  const { root } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  assert.equal(validate(root, true).errors.filter((error) => error.includes('required L3 witness is missing')).length, 14);
});

test('L5 mode blocks missing L3 and L5 scoped witnesses', (t) => {
  const { root } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const errors = validateL5(root).errors;
  assert.equal(errors.filter((error) => error.includes('required L3 witness is missing')).length, 14);
  assert.equal(errors.filter((error) => error.includes('required L5 witness is missing')).length, 14);
});

test('detects PM and machine mirror drift', (t) => {
  const { root, spec } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeJson(root, 'machine/spec/remediation.json', { ...spec, owner: 'wrong-owner' });
  assert.ok(validate(root).errors.includes('PM and machine remediation specs have drifted.'));
});

test('detects missing ownership controls', (t) => {
  const { root, spec } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  delete spec.modules[0].metrics;
  delete spec.modules[0].releaseGateOwner;
  delete spec.modules[0].escalationPath;
  writeJson(root, 'pm/spec/remediation.json', spec);
  writeJson(root, 'machine/spec/remediation.json', spec);
  assert.equal(validate(root).errors.filter((error) => error.startsWith('kernel:')).length, 3);
});

test('complete L3 evidence passes', (t) => {
  const { root, spec } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeWitnesses(root, spec);
  const result = validate(root, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.missingWitnesses.length, 0);
  assert.equal(result.missingL5Witnesses.length, 14);
});

test('complete L5 evidence passes', (t) => {
  const { root, spec } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeWitnesses(root, spec);
  writeL5Witnesses(root, spec);
  const result = validateL5(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.missingWitnesses.length, 0);
  assert.equal(result.missingL5Witnesses.length, 0);
});

test('malformed L5 operating cycle fails', (t) => {
  const { root, spec } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeWitnesses(root, spec);
  writeL5Witnesses(root, spec);
  const path = spec.modules[0].l5Witnesses.signalP;
  const witness = JSON.parse(readFileSync(join(root, path), 'utf8'));
  delete witness.operatingCycle.consecutivePasses;
  witness.operatingCycle.humanOverrideExercised = false;
  writeJson(root, path, witness);
  const result = validateL5(root);
  assert.ok(result.errors.some((error) => error.includes('at least five consecutive operating-cycle passes')));
  assert.ok(result.errors.some((error) => error.includes('must exercise human override')));
});

test('malformed evidence and false completion claims fail', (t) => {
  const { root, spec } = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  spec.status = 'done';
  writeJson(root, 'pm/spec/remediation.json', spec);
  writeJson(root, 'machine/spec/remediation.json', spec);
  writeWitnesses(root, spec);
  const path = spec.modules[0].scopedWitnesses.signalP;
  const witness = JSON.parse(readFileSync(join(root, path), 'utf8'));
  witness.rollbackEvidence.items = [];
  witness.releaseGate.blockingCriteria = ['rollback missing'];
  writeJson(root, path, witness);
  const result = validate(root);
  assert.ok(result.errors.some((error) => error.includes('rollback evidence does not meet minimumCount')));
  assert.ok(result.errors.some((error) => error.includes('release gate must be approved')));
});
