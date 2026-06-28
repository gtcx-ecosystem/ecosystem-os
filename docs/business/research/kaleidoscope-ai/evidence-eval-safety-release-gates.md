---
title: Kaleidoscope AI evidence eval safety release gates
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: release-gates
tier: critical
tags: ['kaleidoscope-ai', 'evals', 'safety', 'evidence', 'release']
review_cycle: weekly
---

# Kaleidoscope AI evidence eval safety release gates

## Purpose

Kaleidoscope AI should be useful because it is evidence-disciplined, not because it sounds confident.

This document defines the gates required before Kaleidoscope outputs can be trusted for audits, strategy, product planning, partner narratives, or execution plans.

## Gate model

```text
source evidence
-> extraction
-> graph projection
-> retrieval
-> synthesis
-> evaluation
-> human approval where needed
-> release artifact
-> witness
```

## Evidence gates

| Gate | Requirement | Fail condition |
| --- | --- | --- |
| source link | Every factual claim links to file, command output, audit, or external source. | Claim has no source. |
| date awareness | Evidence records generation or source date. | Output uses stale evidence without warning. |
| source type | Evidence identifies whether it is code, doc, audit, generated witness, external source, or inference. | Generated artifact is treated as primary source without label. |
| confidence | Claims have confidence level or uncertainty note. | High-stakes recommendation has no confidence statement. |
| contradiction | Conflicting sources are surfaced. | Output hides mismatch between old witness and current gate. |
| lineage | Derived rankings explain inputs and weighting. | Ranking appears without calculation basis. |

## Retrieval eval gates

RAG must be evaluated separately from answer quality.

Minimum eval set:

- repo identity questions
- latest audit questions
- movement since last audit
- RAG/MCP gate status
- graph schema questions
- market ranking questions
- IP/moat synthesis questions
- claim evidence questions

Metrics:

| Metric | Target |
| --- | --- |
| retrieval precision | >= 0.75 for golden questions |
| retrieval recall | >= 0.70 for golden questions |
| citation correctness | >= 0.90 |
| stale evidence detection | 100 percent on seeded stale-witness cases |
| unsupported claim detection | >= 0.95 on seeded unsupported claims |

## Agent eval gates

Every specialist agent should have task-specific evals.

| Agent | Eval |
| --- | --- |
| Ecosystem cartographer | Correct repo/product/dependency graph extraction. |
| Audit analyst | Correct score movement and blocker explanation. |
| IP synthesizer | Separates real IP from generic AI/software claims. |
| Market strategist | Ranks with evidence and states assumptions. |
| Integration architect | Finds missing repo wires without inventing integrations. |
| QA deployment analyst | Distinguishes passing scripts from stale witnesses. |
| Narrative agent | Does not overclaim beyond evidence. |
| Execution planner | Produces owned actions with gates and approval points. |
| Evaluator | Catches unsupported claims and stale evidence. |

## Safety gates

| Gate | Requirement |
| --- | --- |
| read-only default | Kaleidoscope starts in read-only analysis mode. |
| approval for writes | Any repo edit, ticket creation, external message, deployment, or partner artifact requires approval. |
| no hidden authority | Agents may recommend, but cannot approve audits, compliance, finance, deployment, or partner claims alone. |
| no source laundering | Generated summaries cannot become evidence unless linked to primary sources. |
| no alias confusion | Symlink aliases like `gtcx-markets` must be flagged and mapped, not treated as repos. |
| no stale witness trust | Old green witnesses cannot override current failing gates. |
| no cross-repo silent edits | Cross-repo changes require explicit repo list and isolated worktrees. |

## Release stages

### Stage 0: planning

Allowed:

- read repos
- inspect evidence
- draft plans/specs
- build schema
- evaluate third-party tools

Blocked:

- repo-wide implementation
- generated evidence overwrite
- external actions

### Stage 1: local graph prototype

Allowed:

- build graph snapshot from read-only extraction
- run Graphify and Understand Anything pilots in isolated output dirs
- generate local reports

Required:

- generated outputs excluded from recursive RAG loops
- source links retained
- graph diff produced

### Stage 2: RAG/MCP restore

Allowed:

- add split config files
- update validators
- run repo-local gates
- generate fresh evidence

Required:

- isolated worktrees
- per-repo restore matrix
- stale witness preservation
- no primary checkout edits

### Stage 3: Kaleidoscope MVP

Allowed:

- Observatory read surface
- Decision room Q&A
- Execution studio draft mode

Required:

- evidence citations
- evaluator pass
- read-only MCP tools first
- human approval for writes

### Stage 4: controlled execution

Allowed:

- create tickets
- write specs
- open pull requests
- update evidence

Required:

- approval logs
- rollback plan
- repo owner path
- validation witnesses

## Release checklist

Before any Kaleidoscope release:

- All real repos represented in graph.
- Symlink aliases mapped.
- Current RAG/MCP fleet gate status visible.
- Stale witnesses labeled.
- Golden retrieval eval passes.
- Agent evals pass for critical workflows.
- Generated outputs include evidence links.
- Human approval gates tested.
- Trace output exists for agent/tool calls.
- No strategic claim is uncited unless labeled assumption.

## Research basis

- OpenAI Agents SDK tracing, guardrails, handoffs, and tools: https://openai.github.io/openai-agents-python/
- MCP security and architecture model: https://modelcontextprotocol.io/docs/learn/architecture
- LangGraph durable workflow concepts: https://docs.langchain.com/oss/python/langgraph/overview
- LlamaIndex retrieval and indexing documentation: https://docs.llamaindex.ai/

