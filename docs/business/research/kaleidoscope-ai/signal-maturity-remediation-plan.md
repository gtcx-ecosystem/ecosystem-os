---
title: signal maturity remediation plan
status: current
date: 2026-06-29
owner: ecosystem-os
document_type: execution-plan
tier: critical
tags: ['kaleidoscope-ai', 'signal', 'agentic-maturity', 'kernel', 'graph', 'ledger', 'surface', 'ethos', 'venture', 'agency']
review_cycle: weekly
---

# SIGNAL maturity remediation plan

## Decision

Raise the seven ecosystem-os-led modules from the current repo-level SIGNAL L2 baseline to evidence-backed L5 through staged proof gates. L3 is the first governed-loop evidence gate, L4 is the sustained operating gate, and L5 is the strategic goal. Documentation, configuration, or ownership declarations alone do not satisfy a maturity gate.

The machine-readable execution contract is:

- `pm/spec/kaleidoscope-ai/signal-module-remediation.json`

The integrity and L3 evidence gates are:

```sh
pnpm kaleidoscope:signal:remediation:check
pnpm kaleidoscope:signal:remediation:write
pnpm kaleidoscope:signal:remediation:l3:check
pnpm kaleidoscope:signal:remediation:l5:check
```

Integrity mode permits missing witnesses only while status remains `in_progress`. Candidate, completed, or approved claims automatically enforce the full target gate. Because the strategic target is L5, a completion claim must pass both the L3 and L5 witness contracts.

## Baseline and targets

| Measure | Current | First gate | Operating gate | Strategic target |
| --- | ---: | ---: | ---: | ---: |
| SIGNAL-P | L2 / 45 | L3 / 60+ | L4 / 76+ | L5 / 92+ |
| SIGNAL-E | L2 / 45 | L3 / 60+ | L4 / 76+ | L5 / 92+ |
| Lowest dimension | systems architecture | all dimensions L3 | all dimensions L4 | all dimensions L5 |

Baseline source: `audit/evidence/signal-fleet-latest.json`.

The baseline is repo-level and therefore inherited provisionally by each module. No module may claim an independent score until a scoped witness exists.

## Governed operating loop

```text
Surface request
  -> Kernel policy decision
  -> Graph context and state
  -> Agency bounded execution
  -> Ledger evidence
  -> Ethos safety evaluation
  -> Surface outcome and feedback
  -> Venture learning and portfolio decision
```

Every accepted scenario must expose:

- actor and delegated authority
- intent and input context
- policy decision and approval state
- correlated execution trace
- output and user or operational outcome
- rollback or compensating action
- learning-loop disposition

## Work packages

| ID | Priority | Scope | Completion signal |
| --- | --- | --- | --- |
| `SIG-REM-01` | P0 | Ownership, metrics and release contracts | Complete: all seven modules have a named product lead, implementation partners, metrics, acceptance scenario, release owner and escalation path. |
| `SIG-REM-02` | P0 | Shared event and evidence envelope | Trace, policy, approval, eval, rollback and learning-loop records share correlation and module identifiers. |
| `SIG-REM-03` | P0 | L3 governed-loop witness | One end-to-end workflow is replayable and passes all six L3 evidence sets. |
| `SIG-REM-04` | P1 | Scoped module witnesses | Each module publishes SIGNAL-P and SIGNAL-E evidence without inheriting the repo score. |
| `SIG-REM-05` | P1 | L5 operating cycles | Five consecutive release cycles pass with policy enforcement, bounded autonomy, monitoring, recovery and human override evidence. |
| `SIG-REM-06` | P0 | Self-improving cross-module policy loop | Outcomes from Kernel, Graph, Ledger, Surface, Ethos, Venture and Agency synthesize safer policy or workflow improvements with auditable human control. |

## Module remediation

| Module | Immediate bottleneck | L3 completion signal |
| --- | --- | --- |
| Kernel | Policy decisions are specified but not correlated to live execution evidence. | Policy allow, deny and escalation decisions appear in a replayable trace. |
| Graph | Product state and provenance are not demonstrated as one durable runtime context. | State lineage, retrieval provenance and consistency evidence are correlated to the workflow. |
| Ledger | Evidence contracts do not yet prove append-only replay and recovery. | Approvals, actions and outcomes can be reconstructed and integrity-checked. |
| Surface | User-facing AI quality and feedback evidence is absent. | The surface exposes status, captures feedback and records answer or action quality. |
| Ethos | Doctrine is not yet demonstrated as an enforced runtime safeguard. | Safety policy, exception and harms-monitoring decisions are machine-evidenced. |
| Venture | Decisions are not closed through measured hypothesis and outcome learning. | A portfolio decision links hypothesis, evidence, outcome and subsequent disposition. |
| Agency | Autonomous execution is not yet proven bounded and reversible. | Tool calls respect delegation, approval and rollback controls in the shared trace. |

## Release gates

L3 is blocked when any required evidence set from `signal-l3-evidence-pack.md` is absent. L4 is additionally blocked until:

- all six dimensions reach L4 on both SIGNAL axes
- autonomy remains bounded by policy and approval controls
- production monitoring covers quality, latency, failure, cost and intervention
- recovery is demonstrated, not merely documented
- three consecutive release witnesses pass

L5 is additionally blocked until:

- all six dimensions reach L5 on both SIGNAL axes
- five consecutive operating-cycle witnesses pass per scoped axis
- self-improvement evidence shows measured outcomes changing policy or workflow behavior
- generative design evidence shows the system proposing new safe operating patterns
- policy synthesis evidence shows learned policy changes remain bounded and reviewable
- cross-module learning evidence connects at least two modules in the improvement loop
- autonomous experimentation evidence stays sandboxed, reversible and approval-gated
- human override evidence is exercised, not merely documented

Each module requires separate SIGNAL-P and SIGNAL-E scoped witnesses for L3 and L5. The L3 gate validates fourteen witnesses in total. The L5 gate validates fourteen additional witnesses plus their referenced operating-cycle and override evidence.

## Ownership boundary

ecosystem-os owns product scope, acceptance criteria, portfolio semantics and the integrated maturity decision for all seven modules. Supporting repos produce implementation evidence through explicit contracts. This plan does not authorize ecosystem-os to edit sibling repositories or manufacture their witnesses.

The local writer emits ecosystem-os product-control witnesses only. These witnesses can satisfy local SIGNAL remediation gates for ownership, policy, evidence envelope and portfolio control. They do not replace downstream implementation, deployment, security, legal or sibling-repo runtime witnesses.

## Verification

```sh
pnpm kaleidoscope:signal:remediation:check
pnpm kaleidoscope:signal:remediation:write
pnpm kaleidoscope:signal:remediation:l3:check
pnpm kaleidoscope:signal:remediation:l5:check
pnpm kaleidoscope:signal:check
pnpm kaleidoscope:release-gates:check
pnpm kaleidoscope:operate:check
pnpm product:compile:check
pnpm ops:check
```
