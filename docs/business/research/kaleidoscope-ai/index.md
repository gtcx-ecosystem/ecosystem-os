---
title: Kaleidoscope AI planning index
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: research-index
tier: strategic
tags: ['kaleidoscope-ai', 'graph', 'rag', 'mcp', 'agentic-ai']
review_cycle: weekly
---

# Kaleidoscope AI planning index

This folder holds planning artifacts for the Kaleidoscope AI workstream.

Kaleidoscope AI is the ecosystem-level intelligence layer for GTCX. It should sit above repo-local tools, audits, docs, evidence, market research, and execution state, then synthesize strategic decisions, readiness gaps, IP patterns, product narratives, and implementation plans.

## Planning artifacts

| File | Purpose |
| --- | --- |
| [`graph-rag-mcp-restore-plan.md`](./graph-rag-mcp-restore-plan.md) | Restore the Graph/RAG/MCP substrate across all repos without repeating the June 17 config collision. |
| [`per-repo-rag-mcp-restore-matrix.md`](./per-repo-rag-mcp-restore-matrix.md) | Repo-by-repo target state, current gap, and restore action. |
| [`ecosystem-graph-schema.md`](./ecosystem-graph-schema.md) | Canonical graph schema for ecosystem intelligence. |
| [`kaleidoscope-ai-product-spec.md`](./kaleidoscope-ai-product-spec.md) | Product spec, user surfaces, features, and MVP workflows. |
| [`kaleidoscope-ai-agent-architecture.md`](./kaleidoscope-ai-agent-architecture.md) | Agent roster, orchestration model, handoffs, tools, memory, and guardrails. |
| [`phase-2-agentic-product-architecture.md`](./phase-2-agentic-product-architecture.md) | Phase 2 product architecture, agentic design patterns, roadmap, driver repo responsibilities, and innovation/IP thesis. |
| [`third-party-tool-evaluation.md`](./third-party-tool-evaluation.md) | Third-party tool plan for Graphify, Understand Anything, graph stores, vector stores, evals, and observability. |
| [`evidence-eval-safety-release-gates.md`](./evidence-eval-safety-release-gates.md) | Evidence, eval, safety, and release gates for Kaleidoscope AI. |
| [`signal-mpr-integration-plan.md`](./signal-mpr-integration-plan.md) | Plan to operationalize SIGNAL as an MPR-style agentic maturity witness, runner, and fleet rollup. |
| [`movement-history-baseline.md`](./movement-history-baseline.md) | Interpretation note for the first prior/current graph movement baseline. |
| [`partner-execution-room-draft.md`](./partner-execution-room-draft.md) | Internal draft execution room for market-leadership partner narratives, evidence gaps, and approval gates. |
| [`partner-proof-packet-templates.md`](./partner-proof-packet-templates.md) | Internal templates for bank/DFI, regulator, buyer, operator, and investor proof packets. |
| [`commercial-evidence-gap-report.md`](./commercial-evidence-gap-report.md) | Current commercial evidence gaps mapped to owner repos and Execution Studio draft actions. |

## Machine contracts

| Artifact | Purpose |
| --- | --- |
| [`../../../../pm/spec/kaleidoscope-ai/rag-config.schema.json`](../../../../pm/spec/kaleidoscope-ai/rag-config.schema.json) | Split RAG config contract. |
| [`../../../../pm/spec/kaleidoscope-ai/mcp-config.schema.json`](../../../../pm/spec/kaleidoscope-ai/mcp-config.schema.json) | MCP tools and permission contract. |
| [`../../../../pm/spec/kaleidoscope-ai/graph-config.schema.json`](../../../../pm/spec/kaleidoscope-ai/graph-config.schema.json) | Typed graph projection contract. |
| [`../../../../pm/spec/kaleidoscope-ai/graph-snapshot.schema.json`](../../../../pm/spec/kaleidoscope-ai/graph-snapshot.schema.json) | Fleet graph snapshot witness contract. |
| [`../../../../pm/spec/kaleidoscope-ai/query-service.schema.json`](../../../../pm/spec/kaleidoscope-ai/query-service.schema.json) | Unified query service witness contract for graph/RAG/lexical retrieval routes. |
| [`../../../../pm/spec/kaleidoscope-ai/observatory.schema.json`](../../../../pm/spec/kaleidoscope-ai/observatory.schema.json) | Observatory witness contract for readiness, blockers, SIGNAL/MPR, freshness, and aliases. |
| [`../../../../pm/spec/kaleidoscope-ai/decision-room.schema.json`](../../../../pm/spec/kaleidoscope-ai/decision-room.schema.json) | Decision Room witness contract for strategic Q&A, citations, assumptions, and evaluator gates. |
| [`../../../../pm/spec/kaleidoscope-ai/signal-fleet.schema.json`](../../../../pm/spec/kaleidoscope-ai/signal-fleet.schema.json) | SIGNAL fleet witness contract for SIGNAL-P/E, bottlenecks, MPR relation, and next unlocks. |
| [`../../../../pm/spec/kaleidoscope-ai/execution-studio.schema.json`](../../../../pm/spec/kaleidoscope-ai/execution-studio.schema.json) | Execution Studio draft-action contract for owner routing, validation gates, approval, and release gates. |
| [`../../../../pm/spec/kaleidoscope-ai/partner-brief.schema.json`](../../../../pm/spec/kaleidoscope-ai/partner-brief.schema.json) | Partner brief evaluation contract for claim controls, citation gates, approval, and external-use boundaries. |
| [`../../../../pm/spec/kaleidoscope-ai/release-gates.schema.json`](../../../../pm/spec/kaleidoscope-ai/release-gates.schema.json) | Release-gate witness contract for eval, citation, freshness, confidence, and approval-boundary gates. |
| [`../../../../pm/spec/kaleidoscope-ai/operating-loop.schema.json`](../../../../pm/spec/kaleidoscope-ai/operating-loop.schema.json) | Operating-loop witness contract for ordered Kaleidoscope stage execution and release posture. |
| [`../../../../pm/spec/kaleidoscope-ai/phase-2-completion.schema.json`](../../../../pm/spec/kaleidoscope-ai/phase-2-completion.schema.json) | Phase 2 completion witness contract for internal draft release closure and Phase 3 readiness. |
| [`../../../../pm/spec/kaleidoscope-ai/signal-l3-evidence-pack.schema.json`](../../../../pm/spec/kaleidoscope-ai/signal-l3-evidence-pack.schema.json) | SIGNAL L3 evidence pack contract for trace, policy, approval, eval, rollback, and learning-loop evidence. |
| [`../../../../pm/spec/kaleidoscope-ai/mpr-relation-gap.schema.json`](../../../../pm/spec/kaleidoscope-ai/mpr-relation-gap.schema.json) | MPR relation gap witness contract for repos with missing MPR/SIGNAL relation evidence. |
| [`../../../../pm/spec/kaleidoscope-ai/85-uplift-action.schema.json`](../../../../pm/spec/kaleidoscope-ai/85-uplift-action.schema.json) | 8.5 uplift action contract for owner routing, evidence, validation, approval, and release gates. |
| [`../../../../pm/spec/kaleidoscope-ai/eval-config.schema.json`](../../../../pm/spec/kaleidoscope-ai/eval-config.schema.json) | Retrieval and release eval contract. |
| [`../../../../audit/evidence/kaleidoscope-graph-rag-mcp-latest.json`](../../../../audit/evidence/kaleidoscope-graph-rag-mcp-latest.json) | Fleet readiness witness generated by `pnpm kaleidoscope:graph-rag-mcp:write`. |
| [`../../../../audit/evidence/kaleidoscope-graph-snapshot-latest.json`](../../../../audit/evidence/kaleidoscope-graph-snapshot-latest.json) | Fleet graph snapshot witness generated by `pnpm kaleidoscope:graph-snapshot:write`. |
| [`../../../../audit/evidence/kaleidoscope-graph-snapshot-previous.json`](../../../../audit/evidence/kaleidoscope-graph-snapshot-previous.json) | Baseline prior graph snapshot used by the Observatory for movement comparison. |
| [`../../../../audit/evidence/kaleidoscope-query-service-latest.json`](../../../../audit/evidence/kaleidoscope-query-service-latest.json) | Query service golden-question witness generated by `pnpm kaleidoscope:query:write`. |
| [`../../../../audit/evidence/kaleidoscope-observatory-latest.json`](../../../../audit/evidence/kaleidoscope-observatory-latest.json) | Observatory witness generated by `pnpm kaleidoscope:observatory:write`. |
| [`../../../../audit/evidence/kaleidoscope-decision-room-latest.json`](../../../../audit/evidence/kaleidoscope-decision-room-latest.json) | Decision Room strategic Q&A witness generated by `pnpm kaleidoscope:decision-room:write`. |
| [`../../../../audit/evidence/signal-fleet-latest.json`](../../../../audit/evidence/signal-fleet-latest.json) | SIGNAL fleet witness generated by `pnpm kaleidoscope:signal:write`. |
| [`../../../../audit/evidence/kaleidoscope-execution-studio-latest.json`](../../../../audit/evidence/kaleidoscope-execution-studio-latest.json) | Execution Studio draft-action witness generated by `pnpm kaleidoscope:execution-studio:write`. |
| [`../../../../audit/evidence/kaleidoscope-partner-brief-latest.json`](../../../../audit/evidence/kaleidoscope-partner-brief-latest.json) | Partner brief boundary witness generated by `pnpm kaleidoscope:partner-brief:write`. |
| [`../../../../audit/evidence/kaleidoscope-release-gates-latest.json`](../../../../audit/evidence/kaleidoscope-release-gates-latest.json) | Release-gate witness generated by `pnpm kaleidoscope:release-gates:write`. |
| [`../../../../audit/evidence/kaleidoscope-operating-loop-latest.json`](../../../../audit/evidence/kaleidoscope-operating-loop-latest.json) | Operating-loop witness generated by `pnpm kaleidoscope:operate:write`. |
| [`../../../../audit/evidence/kaleidoscope-phase-2-completion-latest.json`](../../../../audit/evidence/kaleidoscope-phase-2-completion-latest.json) | Phase 2 completion witness generated by `pnpm kaleidoscope:phase-2:write`. |
| [`../../../../audit/evidence/mpr-relation-gap-latest.json`](../../../../audit/evidence/mpr-relation-gap-latest.json) | MPR relation gap witness for `bridge-os` and `terminal-os`. |
| [`observatory-latest.md`](./observatory-latest.md) | Read-only Observatory markdown report generated from current evidence. |
| [`decision-room-latest.md`](./decision-room-latest.md) | Read-only Decision Room markdown report generated from current evidence. |
| [`signal-fleet-latest.md`](./signal-fleet-latest.md) | Read-only SIGNAL fleet report generated from current evidence. |
| [`execution-studio-latest.md`](./execution-studio-latest.md) | Read-only Execution Studio draft-action report generated from current evidence. |
| [`partner-brief-latest.md`](./partner-brief-latest.md) | Read-only partner brief boundary report generated from current evidence. |
| [`release-gates-latest.md`](./release-gates-latest.md) | Read-only release-gate report generated from current evidence. |
| [`operating-loop-latest.md`](./operating-loop-latest.md) | Read-only operating-loop report generated from current evidence. |
| [`phase-2-completion-latest.md`](./phase-2-completion-latest.md) | Read-only Phase 2 closure and Phase 3 readiness report generated from current evidence. |
| [`signal-l3-evidence-pack.md`](./signal-l3-evidence-pack.md) | SIGNAL L3 evidence-pack specification for orchestrated agentic maturity. |
| [`mpr-relation-gap.md`](./mpr-relation-gap.md) | Read-only MPR relation gap report for repos with missing MPR relation evidence. |
| [`85-uplift-action.md`](./85-uplift-action.md) | 8.5 uplift action format for Evidence Studio to Agile OS handoff. |

## Planning constraints

- Work only in isolated worktrees for implementation.
- Do not rely on built-in Codex skills or plugins for the product plan because those capabilities are expected to change.
- Preserve repo-local ownership. Kaleidoscope AI should ingest from repos and MCP tools, not become a hidden owner of every repo.
- Keep RAG, graph, MCP, and ledger roles separate.
- Require evidence links for every strategic claim.
- Require human approval before any action that changes repo state, external systems, partner-facing docs, or deployment state.
