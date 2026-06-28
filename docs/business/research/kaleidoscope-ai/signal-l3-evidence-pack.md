---
title: signal l3 evidence pack
status: current
date: 2026-06-29
owner: ecosystem-os
document_type: specification
tier: strategic
tags: ['kaleidoscope-ai', 'signal', 'agentic-maturity', 'evidence']
review_cycle: on-change
---

# signal l3 evidence pack

## Purpose

This pack defines the minimum evidence required before a repo, product, initiative, or fleet claim can move from SIGNAL L2 integrated to SIGNAL L3 orchestrated.

Graph/RAG/MCP readiness is necessary for L3, but it is not sufficient. L3 requires proof that agentic work is orchestrated, traceable, governed, evaluated, reversible, and capable of learning from results.

## Contract

Machine schema:

- `pm/spec/kaleidoscope-ai/signal-l3-evidence-pack.schema.json`

Expected witness path:

- `audit/evidence/signal-l3-evidence-pack-latest.json`

## Required evidence sets

| Evidence set | Minimum requirement | Why it matters |
| --- | --- | --- |
| Trace evidence | At least one replayable trace or execution tree for an agentic workflow. | Proves tool calls, retrieval steps, handoffs, and outputs can be inspected. |
| Policy evidence | At least one policy or permission boundary controlling tools or actions. | Proves orchestration is governed, not just scripted. |
| Approval evidence | At least one approval gate for write, external, partner-facing, or deploy actions. | Proves humans remain in control of high-impact actions. |
| Eval evidence | At least one eval result tied to the workflow. | Proves quality can regress or pass through a measurable gate. |
| Rollback evidence | At least one rollback, recovery, or compensating-action path. | Proves the workflow can fail safely. |
| Learning-loop evidence | At least one retrospective, dataset update, prompt update, policy update, or eval promotion record. | Proves the system improves from observed results. |

## Release rule

A repo cannot claim SIGNAL-E L3 when any required evidence set is missing.

The correct state for repos with graph/RAG/MCP and eval configs but without traces, policy, approval, rollback, and learning-loop evidence remains SIGNAL-E L2.

## Draft owner routing

| Owner repo | Responsibility |
| --- | --- |
| `baseline-os` | Canonical evidence schema and validation contract. |
| `fabric-os` | Trace, policy, eval sink, and observability contract. |
| `bridge-os` | Runner integration and cross-repo orchestration. |
| `ecosystem-os` | Kaleidoscope consumption, Observatory display, Decision Room reasoning, and release-gate enforcement. |

## Validation

Minimum validation commands:

```sh
pnpm kaleidoscope:signal:check
pnpm kaleidoscope:release-gates:check
pnpm kaleidoscope:operate:check
```

## Failure modes

- Missing trace evidence blocks L3 because orchestration cannot be replayed.
- Missing policy evidence blocks L3 because actions are not governed.
- Missing approval evidence blocks L3 because write/external/deploy boundaries can be crossed unsafely.
- Missing eval evidence blocks L3 because answer or workflow quality cannot be measured.
- Missing rollback evidence blocks L3 because failures cannot be safely reversed.
- Missing learning-loop evidence blocks L3 because the system is not demonstrably improving.

