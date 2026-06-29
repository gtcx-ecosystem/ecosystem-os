---
title: phase 3 product surface api
status: draft
date: 2026-06-29
owner: ecosystem-os
document_type: product-spec
tier: strategic
tags: ['kaleidoscope-ai', 'phase-3', 'api', 'agentic-ai', 'product-surface']
review_cycle: weekly
---

# phase 3 product surface api

## Purpose

Phase 2 proved that Kaleidoscope can generate fleet evidence, strategic answers, approval-gated actions, partner boundaries, release gates, and a completion witness.

Phase 3 should turn those witnesses into a product surface.

The product surface must preserve the strongest property of the current system: answers are not free-form chat. They are structured decisions over a typed ecosystem graph, current evidence, retrieval traces, maturity scores, and approval boundaries.

## Product surface

Kaleidoscope should expose five first-class surfaces:

| Surface | Primary question | Primary evidence |
| --- | --- | --- |
| Observatory | What is true across the ecosystem right now? | graph snapshot, graph/RAG/MCP witness, MPR, SIGNAL, repo evidence |
| Decision Room | What should we believe, prioritize, or decide? | query witness, citations, strategic Q&A, confidence and freshness gates |
| Signal Lab | How agentically mature is the ecosystem? | SIGNAL fleet witness, MPR relation, L3 evidence pack |
| Execution Studio | What should be done next, by whom, and with what gate? | action contracts, owner repos, validation commands, approval requests |
| Partner Room | What can be safely packaged for banks, DFIs, regulators, buyers, operators, and investors? | partner proof packet templates, claim controls, release gates |

Each surface should be addressable as an API resource and inspectable as a UI view. The UI can be built later; the resource contract should come first.

## API resources

The initial API should be read-first and approval-aware:

| Resource | Method | Output |
| --- | --- | --- |
| `/kaleidoscope/fleet` | read | repo coverage, readiness, blockers, freshness, commercial evidence, aliases |
| `/kaleidoscope/graph` | read | typed nodes, edges, movement, dependency and evidence links |
| `/kaleidoscope/query` | read | route-selected graph/RAG/lexical answer with citations and confidence |
| `/kaleidoscope/decision-room` | read | strategic answers, assumptions, unsupported-claim warnings, recommended next actions |
| `/kaleidoscope/signal` | read | SIGNAL-P/E, bottlenecks, next unlocks, MPR relation |
| `/kaleidoscope/actions` | draft | owner-routed draft actions, validation gates, approval state |
| `/kaleidoscope/partner-room` | draft | partner-room packets, allowed claims, proof gaps, approval state |
| `/kaleidoscope/release` | read | release decision, external-use boundary, failed gates, source witness links |
| `/kaleidoscope/phase-2` | read | Phase 2 completion decision and Phase 3 readiness |

`draft` resources may generate draft artifacts, but they must not create issues, write repos, contact partners, deploy, or publish external docs without explicit approval.

## Response envelope

Every response should use the same envelope:

| Field | Requirement |
| --- | --- |
| `resource` | Stable resource id. |
| `generatedAt` | Current generation time. |
| `mode` | `read`, `draft`, `write-request`, or `external-request`. |
| `decision` | Short decision or result label. |
| `confidence` | Numeric confidence when the response contains synthesis. |
| `freshness` | Freshness status and source dates. |
| `citations` | Evidence paths and reasons. |
| `assumptions` | Explicit assumptions that are not proven by evidence. |
| `unsupportedClaims` | Unsupported claims detected by evaluator. |
| `approval` | Approval status and boundary. |
| `nextActions` | Draft-only owner-routed actions, when applicable. |
| `witnesses` | Source witness paths used to produce the response. |

This keeps agentic output inspectable. It also makes the future UI simple: every panel can render confidence, citations, freshness, assumptions, and approval state without custom logic.

## Agentic workflow

The Phase 3 orchestrator should follow this sequence:

1. Classify intent as fleet truth, strategic decision, maturity, execution, partner, or release.
2. Select the retrieval route: graph, structured witness, lexical evidence, or semantic RAG.
3. Build a trace with source witnesses and repo evidence.
4. Run the relevant specialist agent only when synthesis is needed.
5. Run evaluator gates for citation coverage, freshness, unsupported claims, confidence, scope, and approval.
6. Return the response envelope.
7. If a boundary is crossed, return an approval request instead of executing.

The important product behavior is not "agent answers everything." It is "agent routes to deterministic truth first, then synthesizes only where synthesis adds value."

## Approval boundaries

| Boundary | Allowed without approval | Requires approval |
| --- | --- | --- |
| Read | inspect evidence, graph, witnesses, scores | none |
| Draft | generate internal report, draft action, draft partner packet | partner-specific external artifact |
| Write request | propose repo edits, tickets, generated witnesses | any actual repo write or ticket creation |
| External request | draft email, partner brief, investor memo | sending, publishing, sharing, or deploying |

The API should encode approval state, not rely on UI copy.

## Driver repo responsibilities

| Repo | Phase 3 responsibility |
| --- | --- |
| `ecosystem-os` | Product surfaces, resource contracts, UI/API specs, fleet-level witnesses, strategic reports. |
| `baseline-os` | Response envelope schema, witness schemas, validation contracts, score calibration. |
| `bridge-os` | API runner, graph/query connectors, repo/fleet orchestration, MCP bridge. |
| `canon-os` | Approval doctrine, SIGNAL criteria, claim classes, operating principles. |
| `agile-os` | Draft action routing, sprint/release handoff, task acceptance and approval records. |
| `fabric-os` | Runtime, trace store, eval sink, deployment posture, observability and environment integration. |

This preserves repo ownership while making Kaleidoscope feel like one product.

## Minimum viable build

Phase 3 MVP should ship in this order:

1. Product surface response envelope schema.
2. Read-only `/fleet`, `/graph`, `/signal`, `/release`, and `/phase-2` resources backed by existing witnesses.
3. `/query` and `/decision-room` resources with cited answers and evaluator output.
4. Draft-only `/actions` and `/partner-room` resources with approval status.
5. Trace and eval sink spec for SIGNAL L3 progression.
6. UI shell that renders the same resources without adding hidden logic.

## Acceptance gates

Phase 3 should not be considered ready until:

- Every API response has citations or marks claims as assumptions.
- Every response includes freshness and witness lineage.
- Every action-capable resource preserves approval state.
- The product can replay the same answer from the same witness set.
- Unsupported claims fail release gates.
- SIGNAL L3 claims require trace, policy, approval, eval, rollback, and learning-loop evidence.
- External use remains blocked until approval is recorded for a specific artifact and audience.

## Open decisions

| Decision | Default |
| --- | --- |
| API runtime | Start with local deterministic node runners; promote to service runtime after trace/eval sinks are specified. |
| UI runtime | Defer until the resource contract is stable. |
| Agent runtime | Keep agent invocation behind resource handlers; do not expose raw chat as the product. |
| Storage | Treat repo witnesses as source of truth until `fabric-os` trace/eval storage is specified. |
| Partner export | Keep disabled until partner-specific approval records exist. |
