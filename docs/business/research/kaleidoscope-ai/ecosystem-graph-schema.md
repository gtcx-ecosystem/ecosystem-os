---
title: Ecosystem graph schema
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: schema
tier: critical
tags: ['graph', 'schema', 'kaleidoscope-ai', 'evidence']
review_cycle: weekly
---

# Ecosystem graph schema

## Purpose

The ecosystem graph is the canonical operating graph for Kaleidoscope AI.

It is not a document index and not a generic dependency graph. It is a typed graph that connects repos, products, specs, audits, scores, evidence, blockers, markets, partners, claims, decisions, and actions.

## Separation of roles

```text
Graph  = typed operating state
RAG    = semantic retrieval over source material
MCP    = permissioned action and tool interface
Ledger = proof, replay, approval, and witness trail
```

## Node types

| Node type | Description | Stable ID example |
| --- | --- | --- |
| `repo` | A checked-out GTCX repository | `repo:markets-os` |
| `product` | A product or product family | `product:markets-os:eix` |
| `domain` | Functional domain across repos | `domain:compliance` |
| `feature` | Feature or capability | `feature:markets-os:auction-close` |
| `spec` | Product, architecture, API, or operational spec | `spec:bridge-os:rag-config-v1` |
| `audit` | Audit document or machine audit | `audit:markets-os:2026-06-28` |
| `score` | Scored result for repo/product/dimension | `score:markets-os:full:2026-06-28` |
| `evidence` | File, command result, witness, test, citation | `evidence:markets-os:audit/rag-eval-latest` |
| `blocker` | Gap that blocks readiness, adoption, or release | `blocker:baseline-os:rag-config-collision` |
| `dependency` | Explicit dependency, not an edge label | `dependency:markets-os:baseline-os:mcp` |
| `market` | Market, country, corridor, buyer segment, or wedge | `market:africa:gold-formalization` |
| `partner` | Regulator, bank, DFI, enterprise, or platform partner | `partner-type:dfi` |
| `claim` | Strategic or technical claim that requires evidence | `claim:kaleidoscope:ecosystem-intelligence-layer` |
| `decision` | Human or agent-assisted decision | `decision:restore-rag-config-split` |
| `action` | Planned or executed task | `action:restore:markets-os:rag-config` |
| `agent` | Human, AI, or system actor | `agent:kaleidoscope:audit-analyst` |
| `approval` | Approval or human gate | `approval:restore-plan:operator` |

## Edge types

| Edge | Meaning |
| --- | --- |
| `owns` | Repo owns product, feature, or spec. |
| `implements` | Repo implements feature/spec. |
| `depends_on` | Product/repo/spec depends on another node. |
| `validated_by` | Claim, score, or feature is validated by evidence. |
| `blocked_by` | Repo/product/action is blocked by blocker. |
| `scored_by` | Repo/product has score node. |
| `derived_from` | Score, summary, or claim derives from evidence. |
| `targets_market` | Product or GTM plan targets market. |
| `fits_partner` | Product or plan fits a partner type. |
| `requires_approval` | Action requires approval node. |
| `performed_by` | Action or audit performed by agent. |
| `supersedes` | New audit/spec supersedes older one. |
| `aliases` | Stable alias for renamed repo/product. |

## Required properties

Every node:

```json
{
  "id": "repo:markets-os",
  "type": "repo",
  "label": "markets-os",
  "source": "repo-root",
  "confidence": 1,
  "updatedAt": "2026-06-28"
}
```

Every edge:

```json
{
  "source": "repo:markets-os",
  "target": "repo:baseline-os",
  "type": "depends_on",
  "evidence": ["evidence:markets-os:package-json:mcp-script"],
  "confidence": 0.9,
  "updatedAt": "2026-06-28"
}
```

## Initial graph imports

| Source | Extracted entities |
| --- | --- |
| `package.json` | scripts, workspaces, package names, dependencies |
| `config/baseline/*.json` | RAG/MCP/graph/eval contracts |
| `audit/evidence/*.json` | witnesses, scores, freshness, pass/fail |
| `audit/independent/**/*.md` | external audit findings and ratings |
| `docs/**/*.md` | specs, product docs, market docs, strategy docs |
| `machine/**/*.json` | backlog, CI, feature matrices, roadmap state |
| Graphify output | repo/code graph candidates |
| Understand Anything output | comprehension graph candidates |

## Graph quality gates

Minimum pass:

- All repos represented as `repo` nodes.
- All repo aliases represented with `aliases` edges.
- Every current score has evidence.
- Every blocker has owner repo and target action.
- Every market ranking has source audit or research evidence.
- No claim node can be marked `validated` without at least one evidence edge.

Stretch pass:

- Every repo has product, audit, score, dependency, and latest-gate status.
- Every product has target market and partner-fit edges.
- Every 8.5 uplift plan has action nodes with blockers and evidence gates.

## Storage model

Use a dual storage model:

| Store | Role |
| --- | --- |
| JSON snapshot | Commit-safe evidence artifact and audit replay. |
| Embedded graph store | Local query and CI validation. |
| Optional Neo4j or Kuzu | Interactive exploration, graph algorithms, and product UX. |
| Vector store | Semantic retrieval over documents and source snippets. |

The canonical truth is the typed graph schema plus evidence pointers, not the storage engine.

