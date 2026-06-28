---
title: Kaleidoscope AI product spec
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: product-spec
tier: strategic
tags: ['kaleidoscope-ai', 'product', 'agentic-ai', 'ecosystem-intelligence']
review_cycle: weekly
---

# Kaleidoscope AI product spec

## Product thesis

Kaleidoscope AI is the ecosystem intelligence layer for GTCX.

It continuously reads repo evidence, audits, docs, specs, market research, deployment state, tests, scores, and graph relationships, then converts them into strategic decisions, execution plans, product narratives, partner briefs, and readiness movement.

```text
Cortex : gtcx-os :: Kaleidoscope AI : gtcx-ecosystem
```

Cortex is scoped to runtime intelligence inside `gtcx-os`. Kaleidoscope AI is scoped to the entire `gtcx-ecosystem`.

## Core promise

Kaleidoscope AI answers:

- What is true across the ecosystem?
- What changed since the last audit?
- Which repos improved or regressed?
- Which products are closest to 8.5 readiness?
- Which gaps block market leadership?
- Where is the defensible IP?
- Which market wedge has the strongest venture potential?
- What should be done next, by whom, and with what evidence gate?

## User surfaces

### Observatory

Live ecosystem view:

- repo readiness
- graph coverage
- RAG/MCP status
- audit freshness
- movement since last audit
- blockers
- dependency maps
- evidence confidence
- market opportunity ranking

### Decision room

Strategic question-answering with evidence:

- "Which repos can reach 8.5 fastest?"
- "Which repo moved the most since the last audit?"
- "What is our strongest Africa market wedge?"
- "Where is the IP?"
- "Which claims are overextended?"
- "Which product package should we take to banks, DFIs, regulators, or exchanges?"

### Execution studio

Turns insights into artifacts:

- audit reports
- 8.5 uplift plans
- tickets
- specs
- partner briefs
- investor memos
- board updates
- dependency plans
- test plans
- implementation prompts

Actions that change repos or external systems require approval.

## Feature set

### F1: ecosystem ingestion

Ingest:

- repo trees
- package scripts
- configs
- docs
- specs
- audits
- evidence JSON
- CI outputs
- graph extractor outputs
- market research

Acceptance:

- All real repos discovered.
- Symlink aliases excluded or mapped.
- Stale generated artifacts labeled as stale.
- Evidence freshness recorded.

### F2: typed ecosystem graph

Build and query graph entities:

- repos
- products
- specs
- audits
- evidence
- scores
- blockers
- dependencies
- markets
- partners
- decisions
- actions

Acceptance:

- All repos are nodes.
- Driver repos and product repos are connected.
- Every score and claim links to evidence.

### F3: hybrid retrieval

Use graph retrieval plus semantic retrieval:

- graph for structured state
- RAG for source documents
- lexical search for exact evidence
- reranking for high-confidence context

Acceptance:

- Answers include citations.
- Retrieval output distinguishes source material from inference.
- Unsupported claims are flagged.

### F4: audit intelligence

Generate normalized audit outputs:

- current score
- prior score
- movement
- blocker
- 8.5 actions
- evidence required
- confidence

Acceptance:

- Reproduces prior audit style.
- Tracks movement since last audit.
- Explains score changes from evidence.

### F5: market and IP synthesis

Rank:

- African market leadership opportunity
- venture potential
- ecosystem integration strength
- GTM/partnership paths
- defensibility
- innovation/IP pattern

Acceptance:

- Rankings are evidence-backed.
- Repo combinations are treated as IP, not just individual repos.
- Claims are separated from proof and assumptions.

### F6: agentic execution planning

Produce:

- work breakdown
- repo ownership
- file ownership
- validation gates
- human approval points
- risk register

Acceptance:

- No implementation plan lacks evidence gates.
- No cross-repo task lacks ownership.
- No high-impact action bypasses approval.

### F7: change intelligence

Compare snapshots:

- last audit to current audit
- last graph to current graph
- last RAG/MCP gate to current gate
- last market ranking to current ranking

Acceptance:

- Detects regressions like the June 17 config collision.
- Explains root cause and affected repos.

## MVP workflow

The strongest MVP workflow:

```text
Get GTCX to 8.5 readiness and identify the highest-value market wedge.
```

Output:

1. Current repo ranking.
2. Movement since last audit.
3. 8.5 uplift plan per repo.
4. Graph/RAG/MCP health.
5. Dependency blockers.
6. Top market opportunities.
7. GTM/partnership skill paths.
8. IP/moat synthesis.
9. 30-day execution plan.
10. Board/investor memo.

## Success metrics

| Metric | Target |
| --- | --- |
| Repo coverage | 100 percent of real repos |
| Evidence coverage | 100 percent of strategic claims link to evidence or are marked as assumptions |
| Audit reproducibility | Current score generated from machine-readable evidence |
| Stale witness detection | Detects stale evidence older than configured threshold |
| Human approval adherence | 100 percent for repo/external actions |
| Retrieval quality | Eval pass on golden questions |
| Graph completeness | All repos have audit, score, product, and dependency nodes |

## Research basis

- OpenAI Agents SDK for agents, tools, handoffs, guardrails, sessions, tracing, and MCP integration: https://openai.github.io/openai-agents-python/
- MCP for standardized context and tool connections: https://modelcontextprotocol.io/docs/learn/architecture
- LangGraph for durable, stateful agent workflows when needed: https://docs.langchain.com/oss/python/langgraph/overview
- LlamaIndex for ingestion, indexing, retrieval, and graph/RAG workflows: https://docs.llamaindex.ai/

