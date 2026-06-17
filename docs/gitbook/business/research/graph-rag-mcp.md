---
title: 'Graph, RAG, MCP, and Ledger'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: research
tier: operating
tags: ['research', 'graph', 'rag', 'mcp', 'ledger']
review_cycle: on-change
---

# Graph, RAG, MCP, and Ledger

## Architecture rule

```text
Graph  = structured operating memory
RAG    = semantic and narrative retrieval
MCP    = tool and action interface
Ledger = proof and replay
```

These are not substitutes.

## Graph

Graph stores typed operating facts:

```text
person advises company
agent performed task
repo owns module
story implements feature
feature supports initiative
initiative supports product
service depends on repo
risk blocks release
command produced witness
witness proves claim
approval authorizes action
campaign expresses product
board member governs decision
```

Graph is the backbone for Company Graph, product graph, service graph, work graph, authority graph, evidence graph, and market graph.

## RAG

RAG retrieves source material:

```text
docs
runbooks
session notes
research papers
customer notes
incident reports
architecture narratives
market research
board materials
campaign drafts
```

RAG should enrich answers with citations and context. It should not be the source of truth for operational state.

## MCP

MCP exposes actions:

```text
query_graph
get_next_work
run_gate
write_witness
create_handoff
sync_backlog
open_issue
check_deploy_readiness
generate_campaign_brief
request_approval
```

MCP tools should be permissioned through Kernel and logged through Ledger.

## Ledger

Ledger records proof:

```text
actor
authority
intent
inputs
tools
commands
outputs
checks
approvals
risks
witnesses
replay instructions
```

Ledger is the difference between an impressive agent demo and an enterprise-operable system.

## Recommended flow

```text
User asks question
  -> Surface captures intent
  -> Kernel determines identity and authority
  -> Graph retrieves operating state
  -> RAG retrieves source context
  -> Bridge selects tools and agents
  -> MCP executes actions
  -> Assurance verifies
  -> Ledger writes proof
  -> Graph updates state
```

## Research implications

1. GraphRAG validates that graph structure improves sensemaking across private corpora.
2. Agentic Hybrid RAG supports dynamic graph/vector retrieval selection.
3. PROV-AGENT shows why agentic workflow provenance must include prompts, decisions, tools, and downstream effects.
4. Enterprise agent platforms increasingly treat source-system permissions and runtime tool access as core architecture.

## Source links

- GraphRAG: https://arxiv.org/abs/2404.16130
- Agentic Hybrid RAG: https://arxiv.org/abs/2508.05660
- Knowledge Graph RAG for enterprise documents: https://arxiv.org/abs/2604.14220
- PROV-AGENT: https://arxiv.org/abs/2508.02866
- MCP: https://en.wikipedia.org/wiki/Model_Context_Protocol
