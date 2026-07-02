---
title: 'Ecosystem OS product architecture'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: architecture
tier: critical
tags: ['foundation', 'architecture', 'product-portfolio']
review_cycle: on-change
---

# Product Architecture

## Substrate

| Layer | Verb | Purpose |
| ----- | ---- | ------- |
| **Kernel** | governs | Identity, authority, policy, events, module contracts, permissions. |
| **Graph** | knows | Operating intelligence: entities, relationships, state, signals. |
| **Ledger** | proves | Witnesses, provenance, replay, audit history, evidence envelopes. |
| **Surface** | exposes | Console, CLI, dashboards, command center, operator experience. |

The substrate is not a department. It is the platform beneath every operating module.

## Operating modules

| Module | Verb | Role |
| ------ | ---- | ---- |
| **Ethos** | judges | Culture, acumen, philosophy, manifesto, people, board, advisors, C-suite, key roles, code of ethics, corporate charter. |
| **Venture** | invents | Innovation, IP portfolio, product concepts, market theses, strategic bets, competitive intelligence. |
| **Agency** | expresses | Creative, comms, marketing, brand expression, campaigns, demos, pitch materials, public narrative. |
| **Bridge** | coordinates | AgentOps, human-agent coordination, handoffs, MCP tools, integrations, fleet coordination. |
| **Agile** | ships | Planning, roadmaps, backlog, sprint rhythm, ceremonies, delivery, release readiness. |
| **Fabric** | operates | Cross-repo infrastructure, shared services, DevOps, SecOps, FinOps, service operations. |
| **Assurance** | verifies | Compliance, QA, risk, evidence, audit, 11PR scoring, independent replay. |

## Module boundaries

| Boundary | Rule |
| -------- | ---- |
| Venture vs Agency | Venture creates strategic/IP substance. Agency turns it into market-facing expression. |
| Agency vs Canon | Agency creates assets and campaigns. Canon publishes official documentation and knowledge surfaces. |
| Ethos vs Assurance | Ethos defines human doctrine and judgment. Assurance verifies controls, evidence, quality, and risk. |
| Bridge vs Agile | Bridge coordinates actors and tools. Agile owns planning, delivery cadence, and shipping state. |
| Graph vs Modules | Graph records and relates state. Modules own workflows and outcomes. |
| Ledger vs Graph | Graph knows current and relational state. Ledger proves what happened and why it can be trusted. |

## RAG and MCP

Graph, RAG, and MCP are complementary:

```text
Graph  = structured operating memory
RAG    = semantic and narrative retrieval
MCP    = tool and action interface
Ledger = proof and replay
```

Facts go in Graph. Narrative and source context go in RAG. Actions go through MCP. Proof goes into Ledger.

## Product sentence

Ecosystem OS is an AI-native company operating system built on Kernel, Graph, Ledger, and Surface, with operating modules for Ethos, Venture, Agency, Bridge, Agile, Fabric, and Assurance.
