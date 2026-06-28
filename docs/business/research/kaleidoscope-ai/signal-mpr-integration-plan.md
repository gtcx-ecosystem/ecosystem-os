---
title: signal mpr integration plan
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: planning
tier: strategic
tags: ['kaleidoscope-ai', 'signal', 'mpr', 'agentic-maturity', 'evidence']
review_cycle: weekly
---

# signal mpr integration plan

## Purpose

Use SIGNAL the way GTCX already uses MPR: as a repeatable, evidence-backed, repo-local, fleet-rollup assessment system.

MPR answers: how strong is this repo or work item across compliance, technical excellence, craft, world-class execution, commercial value, moat, agentic empowerment, ecosystem integration, and IP?

SIGNAL answers: how mature is this repo, product, or operating system as an AI-native and agentic system?

They should be siblings, not substitutes.

## Current state

Canonical SIGNAL documentation exists in `canon-os/docs/governance/frameworks/SIGNAL.md` and `canon-os/docs/governance/frameworks/SIGNAL-WHITEPAPER.md`.

The framework already defines:

- SIGNAL as Systems, Intelligence, Governance, Networked Agents, and Learning.
- Six levels: L0 Conventional, L1 Augmented, L2 Integrated, L3 Orchestrated, L4 Autonomous, L5 Generative.
- Two axes: SIGNAL-P for product intelligence and SIGNAL-E for engineering intelligence.
- Six maturity dimensions: systems architecture, tooling, process, safeguards, monitoring, and team ownership.
- The ceiling rule: overall level is the lowest dimension score.

What is missing is the MPR-style operating system:

- a machine-readable evaluation spec
- a calibrated repo witness
- a repo runner
- a fleet runner
- layer rollups
- explicit evidence requirements
- explicit relation to Kaleidoscope AI, Cortex, graph, RAG, MCP, evals, and release gates

## Relationship to MPR

| Program | Primary question | Output | Owner pattern | Kaleidoscope use |
| --- | --- | --- | --- | --- |
| MPR | Is the repo or initiative excellent and investable? | `audit/evidence/mpr-repo-latest.json` plus scoped witnesses | baseline-os spec, bridge-os runner, canon-os index | rank readiness, uplift paths, venture/market/product narrative |
| SIGNAL | How AI-native and agentic is the repo or initiative? | proposed `audit/evidence/signal-repo-latest.json` plus scoped witnesses | canon-os framework, baseline-os schema/calibration, bridge-os runner | rank agentic maturity, identify bottlenecks, plan graph/RAG/MCP and AI-native unlocks |

MPR should continue to include an `agenticEmpowerment` pillar, but that pillar should reference SIGNAL rather than duplicating it. In practice:

- MPR decides whether agentic maturity contributes to total repo excellence.
- SIGNAL explains the maturity level, weakest dimension, and next unlock.
- Kaleidoscope uses both to decide where work has the highest leverage.

## Recommended target architecture

### Canonical framework

Owner: `canon-os`

Artifacts:

- `docs/governance/frameworks/SIGNAL.md`
- `docs/governance/frameworks/SIGNAL-WHITEPAPER.md`
- proposed `docs/governance/audit/signal-agent-index.md`

Required updates:

- Keep the L0-L5 framework.
- Make SIGNAL-P and SIGNAL-E first-class in the short framework, not only in the whitepaper.
- Add evidence criteria per level and dimension.
- Add explicit graph/RAG/MCP criteria under SIGNAL-E.
- Add explicit AI product intelligence criteria under SIGNAL-P.
- Add a maturity anti-pattern section to prevent superficial L3/L4 claims.

### Machine spec and schemas

Owner: `baseline-os`

Proposed artifacts:

- `machine/spec/signal-evaluation.json`
- `machine/spec/signal-weight-calibration.json`
- `machine/spec/schemas/signal-repo-witness.json`
- `machine/spec/schemas/signal-scoped-witness.json`

The spec should encode:

- level names and numeric order
- axes: `signalP`, `signalE`
- dimensions: `systemsArchitecture`, `tooling`, `process`, `safeguards`, `monitoring`, `teamOwnership`
- hard gates for each level
- evidence requirements per level
- scoring calibration for `score100`
- ceiling rule based on the lowest dimension level
- optional product/repo archetype modifiers

### Runner

Owner: `bridge-os`

Proposed artifacts:

- `platform/scripts/ecosystem/run-signal-repo-audit.mjs`
- `platform/scripts/ecosystem/run-signal-fleet-audit.mjs`
- `platform/scripts/lib/signal-score.mjs`
- `platform/scripts/lib/signal-repo-witness.mjs`

The runner should mirror the MPR runner pattern:

```sh
node platform/scripts/ecosystem/run-signal-repo-audit.mjs --repo ecosystem-os --write
node platform/scripts/ecosystem/run-signal-repo-audit.mjs --repo gtcx-os --scope product --id cortex --write
node platform/scripts/ecosystem/run-signal-fleet-audit.mjs --write
```

### Repo evidence

Owner: each repo

Proposed artifacts:

- `audit/evidence/signal-repo-latest.json`
- `audit/evidence/signal-product-<id>-latest.json`
- `audit/evidence/signal-initiative-<id>-latest.json`

The repo witness should be small enough to read quickly and rich enough to drive automation.

```json
{
  "schema": "gtcx://baseline-os/signal-repo-witness/v1",
  "scope": "repo",
  "id": "ecosystem-os",
  "repo": "ecosystem-os",
  "evaluatedAt": "2026-06-28T00:00:00.000Z",
  "gitHead": "unknown",
  "frameworkVersion": "1.1.0",
  "signalP": {
    "level": "L1",
    "score100": 28,
    "lowestDimension": "systemsArchitecture",
    "summary": "AI appears in planning and product strategy, but no user-facing AI product surface is production-evidenced."
  },
  "signalE": {
    "level": "L2",
    "score100": 48,
    "lowestDimension": "monitoring",
    "summary": "Repo has AI-native planning, audit, and graph/RAG/MCP intent, but current fleet evidence shows RAG/MCP regression and no live trace/eval gate."
  },
  "dimensions": {
    "systemsArchitecture": {
      "signalP": "L1",
      "signalE": "L2",
      "evidence": []
    },
    "tooling": {
      "signalP": "L1",
      "signalE": "L2",
      "evidence": []
    },
    "process": {
      "signalP": "L1",
      "signalE": "L2",
      "evidence": []
    },
    "safeguards": {
      "signalP": "L1",
      "signalE": "L2",
      "evidence": []
    },
    "monitoring": {
      "signalP": "L0",
      "signalE": "L1",
      "evidence": []
    },
    "teamOwnership": {
      "signalP": "L1",
      "signalE": "L2",
      "evidence": []
    }
  },
  "bottlenecks": [
    "No current fleet-green RAG/MCP witness",
    "No repo-local SIGNAL witness",
    "No trace/eval release gate for AI workflows"
  ],
  "nextUnlocks": [
    "Restore graph/RAG/MCP config separation and publish repo-local witnesses",
    "Create SIGNAL repo runner and schema",
    "Add eval and trace evidence gates for Kaleidoscope workflows"
  ],
  "source": "run-signal-repo-audit"
}
```

## SIGNAL scoring model

SIGNAL should preserve the strict maturity principle: an axis is only as mature as its weakest dimension.

Recommended outputs:

- `signalP.level`: lowest Product Intelligence dimension level.
- `signalE.level`: lowest Engineering Intelligence dimension level.
- `signalP.score100`: weighted maturity score within the current ceiling.
- `signalE.score100`: weighted maturity score within the current ceiling.
- `overallLevel`: lower of SIGNAL-P and SIGNAL-E when one number is required.
- `bottleneckDimensions`: dimensions preventing the next level.
- `nextUnlocks`: concrete investments that raise the bottleneck dimension.
- `evidence`: paths, command outputs, witnesses, traces, screenshots, eval reports, specs.

Recommended level bands:

| Level | Score band | Meaning |
| --- | ---: | --- |
| L0 | 0-16 | conventional |
| L1 | 17-33 | augmented |
| L2 | 34-50 | integrated |
| L3 | 51-67 | orchestrated |
| L4 | 68-84 | autonomous |
| L5 | 85-100 | generative |

The score band should not override gates. A repo with high documentation but no traces cannot score L3 on Monitoring. A repo with autonomous claims but no policy layer and audit log cannot score L4 on Safeguards.

Initial L3 evidence pack:

- `pm/spec/kaleidoscope-ai/signal-l3-evidence-pack.schema.json` defines the machine-readable evidence contract for SIGNAL L3 claims.
- `docs/business/research/kaleidoscope-ai/signal-l3-evidence-pack.md` defines the operating rule: graph/RAG/MCP readiness can support L2, but L3 requires trace, policy, approval, eval, rollback, and learning-loop evidence.

## Evidence gates by dimension

### systems architecture

L1 evidence:

- AI tooling or agent instructions documented.
- At least one AI-assisted workflow described.

L2 evidence:

- Prompts, agent instructions, retrieval config, or AI feature logic versioned in repo.
- Request-scoped context or retrieval flow is explicit.
- AI capability has deterministic fallback or clear degraded behavior.

L3 evidence:

- Named agents or engines coordinate across subsystems.
- Tool boundaries and handoffs are defined.
- Distributed trace or equivalent execution tree exists.

L4 evidence:

- Policy layer controls autonomous actions.
- Agent can complete bounded workflows with minimal human input.
- Every autonomous write has immutable audit evidence.

L5 evidence:

- Production traces feed curated datasets.
- Eval suite promotes or rejects model/prompt/agent updates.
- Improvement loop is repeatable and governed.

### tooling

L2 requires versioned prompts/config, eval tooling, cost tracking, and model/provider pinning.

L3 requires orchestrator, tool registry, trace store, vector or graph retrieval, and repo-local MCP manifests.

L4 requires durable workflow execution, approval tokens, dynamic credentials, policy enforcement, and rollback tooling.

L5 requires dataset curation, model/prompt registry, shadow deployment, red-team automation, and promotion evidence.

### process

L2 requires prompt/config PR review and AI story acceptance criteria.

L3 requires agent-specific ownership, eval regressions in CI, and incident review naming the failed agent or tool.

L4 requires autonomous workflow change control, approval policy review, and exception handling.

L5 requires recurring learning cycles with dataset, eval, promotion, and regression evidence.

### safeguards

L2 requires output schema validation, PII handling, rate limits, and fallback behavior.

L3 requires tool permission boundaries, cross-agent failure handling, and replayable traces.

L4 requires policy-as-code, least-privilege credentials, human approval for irreversible actions, and immutable audit logs.

L5 requires data governance for training traces, red-team gates, rollback of promoted models, and safety owner sign-off.

### monitoring

L2 requires cost, latency, error rate, and quality eval signals.

L3 requires per-agent cost/latency/error traces and handoff failure metrics.

L4 requires autonomous workflow SLOs, escalation metrics, policy denial metrics, and audit-log completeness.

L5 requires quality drift, promotion delta, safety regression, dataset health, and live shadow comparison.

### team ownership

L2 requires named owner for AI feature quality.

L3 requires named owners per agent/engine and shared incident process.

L4 requires AI reliability ownership, policy ownership, and release authority.

L5 requires AI safety/research ownership and model promotion governance.

## How this maps to Kaleidoscope AI

Kaleidoscope should use SIGNAL as one of its core comparative lenses.

For each repo, Kaleidoscope should show:

- current SIGNAL-P and SIGNAL-E
- agentic maturity trend since last audit
- weakest dimension
- next one or two unlocks
- evidence links
- impact on MPR `agenticEmpowerment`
- impact on 8.5 readiness target

For the ecosystem, Kaleidoscope should show:

- fleet SIGNAL heatmap
- repo maturity distribution
- graph/RAG/MCP maturity map
- maturity debt by dimension
- highest-leverage path to raise the whole fleet
- product-level comparison of Kaleidoscope AI and Cortex

## Kaleidoscope and Cortex distinction

Cortex is the intelligence layer scoped to `gtcx-os`.

Kaleidoscope is the intelligence layer scoped to `gtcx-ecosystem`.

SIGNAL should support both:

- Cortex SIGNAL-P: how intelligent the `gtcx-os` product experience is for operators, regulators, inspectors, buyers, and internal teams.
- Cortex SIGNAL-E: how agentic the `gtcx-os` engineering and operations system is.
- Kaleidoscope SIGNAL-P: how intelligent the ecosystem-level product experience is for founders, operators, auditors, investors, and partners.
- Kaleidoscope SIGNAL-E: how agentic the ecosystem itself is across repos, graph/RAG/MCP, audits, planning, QA, deployment, and learning loops.

## Initial fleet hypothesis

This is a working hypothesis until the runner exists.

| Repo | Likely SIGNAL-P | Likely SIGNAL-E | Main bottleneck |
| --- | --- | --- | --- |
| `baseline-os` | L1-L2 | L2-L3 | RAG/MCP config regression, no current SIGNAL witness |
| `bridge-os` | L1 | L2-L3 | runner exists for MPR, but not SIGNAL |
| `canon-os` | L1 | L2 | framework is canonical, but not yet executable |
| `ecosystem-os` | L1-L2 | L2 | graph exists but projection degraded; no fleet SIGNAL rollup |
| `fabric-os` | L2 | L2-L3 | strong ops/AIops signals, but needs calibrated SIGNAL evidence |
| `gtcx-os` | L2-L3 | L2-L3 | product intelligence exists, but maturity evidence is distributed |
| `markets-os` | L2 | L2 | product workflows strong, but agentic evidence needs normalization |
| `terminal-os` | L1-L2 | L2 | deployment/fleet workflows need SIGNAL witness mapping |

## Integration with graph, RAG, and MCP restore

The graph/RAG/MCP restoration plan should be treated as a SIGNAL-E uplift program.

Minimum L2 restore:

- repo-local RAG config exists and does not collide with baseline org config
- repo-local MCP manifest exists
- repo-local graph projection config exists
- repo-local eval config exists
- latest witness proves retrieval and tool registry health

Minimum L3 restore:

- cross-repo graph edges are projected
- agents can query repo context through a governed retrieval/tool layer
- handoffs and tool calls are traceable
- evals run against representative ecosystem tasks
- Kaleidoscope can synthesize evidence-backed recommendations across repos

Minimum L4 path:

- bounded repo-maintenance workflows can execute autonomously under policy
- write actions require approval tokens or policy allowlists
- all actions land as replayable audit evidence
- failed or uncertain actions escalate to humans

## Proposed implementation phases

### phase 0: ratify model

Outputs:

- Approve SIGNAL as MPR sibling.
- Confirm canonical owners.
- Confirm witness names and schema IDs.
- Confirm that MPR `agenticEmpowerment` references SIGNAL.

### phase 1: update canonical docs

Outputs:

- Update `canon-os` SIGNAL framework to include SIGNAL-P/SIGNAL-E in the short doc.
- Add evidence gates and anti-patterns.
- Add `signal-agent-index.md`.

### phase 2: create machine spec

Outputs:

- Add baseline machine spec and schemas.
- Encode dimensions, levels, gates, evidence requirements, and score bands.

### phase 3: build runner

Outputs:

- Add bridge runner for repo and fleet scope.
- Emit `audit/evidence/signal-repo-latest.json`.
- Read existing RAG/MCP/graph/eval witnesses where available.

### phase 4: publish fleet baseline

Outputs:

- Run all real repos, excluding symlink aliases.
- Publish repo witnesses.
- Publish fleet rollup.
- Compare SIGNAL to MPR and 8.5 audit targets.

### phase 5: Kaleidoscope productize

Outputs:

- Add SIGNAL heatmap to Kaleidoscope Observatory.
- Add bottleneck analysis to Decision Room.
- Add recommended unlock plans to Execution Studio.
- Use SIGNAL deltas in investor, partner, and operator narratives.

## Decisions needed

1. Should SIGNAL source of truth remain in `canon-os`, with machine schema in `baseline-os` and runners in `bridge-os`, matching MPR?
2. Should the repo witness be named `signal-repo-latest.json`?
3. Should SIGNAL-P and SIGNAL-E be scored independently, or should a repo-level `overallLevel` always be published?
4. Should `agenticEmpowerment` in MPR be capped by SIGNAL-E?
5. Should Kaleidoscope treat graph/RAG/MCP restore as the required path from SIGNAL-E L2 to L3 across the fleet?

## Recommendation

Proceed with SIGNAL as an executable maturity program parallel to MPR.

Do not replace MPR. Use SIGNAL to make the agentic maturity portion of MPR more precise, defensible, and comparable across repos.

For Kaleidoscope AI, this becomes a major differentiator: it can show not only whether the ecosystem is strong, but whether the ecosystem is becoming more AI-native in a way that is evidenced, governed, and compounding.
