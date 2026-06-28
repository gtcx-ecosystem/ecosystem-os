---
title: Per repo RAG MCP restore matrix
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: restore-matrix
tier: critical
tags: ['rag', 'mcp', 'graph', 'restore', 'repos']
review_cycle: weekly
---

# Per repo RAG MCP restore matrix

## Legend

| Status | Meaning |
| --- | --- |
| restore | Has prior evidence or scripts, but current contract is broken. |
| strengthen | Works partly, but needs stronger graph/MCP/eval maturity. |
| seed | Needs first-class config and evidence. |
| exception | Should explicitly document why full RAG/MCP does not apply. |

## Tier 0: substrate repos

| Repo | Role | Current evidence | Gap | Target status |
| --- | --- | --- | --- | --- |
| `baseline-os` | RAG/MCP hub and validator owner | MCP package, RAG eval, old fleet witness, validator scripts | Canonical RAG config was replaced by org stub; cost-router gate also stale against package version | restore |
| `bridge-os` | MCP/action orchestration and fleet coordination | Real MCP server, tools, tests, RAG smoke, Model B witness | Current RAG config validation fails; graph projection not canonical | restore |
| `ecosystem-os` | Ecosystem graph and Kaleidoscope home | Local document index with 364 docs; graph seed exists | Graph has 1 node and 0 edges; no repo-wide RAG/MCP gate; no Kaleidoscope schema | strengthen |

## Tier 1: primary consumers

| Repo | Role | Current evidence | Gap | Target status |
| --- | --- | --- | --- | --- |
| `gtcx-os` | Platform/product OS and Cortex scope | MCP script, rollout witness, domain baseline configs | Needs split RAG config and graph projection by platform domain | restore |
| `markets-os` | Market infrastructure product | RAG eval, Model B witness, MCP consumer script | Canonical config collision; symlink alias history should be excluded | restore |
| `compliance-os` | Compliance operating layer | RAG eval, Model B witness, MCP consumer script | Canonical config collision | restore |
| `terminal-os` | Operator/terminal surface | RAG eval, Model B witness, MCP script plus terminal MCP start | Canonical config collision; reconcile local MCP server with Baseline MCP | restore |
| `ledger-ui` | Finance/ledger UI | RAG eval, Model B witness, MCP pilots | Canonical config collision; tool pilot evidence needs graph linkage | restore |

## Tier 2: product and intelligence repos

| Repo | Role | Current evidence | Gap | Target status |
| --- | --- | --- | --- | --- |
| `terra-os` | Land/site/source truth | RAG eval, Model B witness, MCP script | Canonical config collision; graph should expose land evidence entities | restore |
| `exploration-os` | Field/site intelligence | RAG eval, Model B witness, MCP script | Canonical config collision; graph should expose site assessment entities | restore |
| `veritas-ai` | Verification/publication intelligence | RAG eval, Model B witness, MCP dir | No root MCP script; graph should expose claim/publication/evidence entities | restore |
| `sensei-os` | Migration/agent intelligence | RAG eval, Model B witness, graph-agent service | Canonical config collision; clarify whether graph-agent feeds ecosystem graph | strengthen |
| `griot-ai` | Market/context publishing | RAG eval, Model B witness, MCP script | Canonical config collision; graph should expose source/news/policy entities | restore |
| `nyota-ai` | Last-mile/mobile intelligence | RAG eval, Model B witness, MCP package | No root MCP script; docs/agent path issues cap trust | restore |

## Tier 3: operating, governance, and emerging repos

| Repo | Role | Current evidence | Gap | Target status |
| --- | --- | --- | --- | --- |
| `fabric-os` | Deployment, ops, compliance fabric | RAG eval, Model B witness, MCP script | Canonical config collision; graph should expose deploy and gate state | restore |
| `canon-os` | Governance and protocols | Fleet populate witness, docs coverage evidence | No direct RAG eval; should act as normative source rather than product consumer | strengthen |
| `agile-os` | Sprint, backlog, delivery OS | MCP script, roadmap/nitro graphs | No RAG validation/eval witness; graph inputs valuable for work planning | seed |
| `ledger-os` | Ledger/product finance backend | MCP script | No RAG validation/eval witness; no graph config | seed |
| `inspection-os` | Inspection product | Partial legacy baseline config | No MCP surface; missing normative excludes; no RAG evidence | seed |
| `venture-os` | Venture/portfolio product | Baseline config stub | No meaningful RAG/MCP evidence | seed |

## Cross-repo actions

1. Add split config files to each repo.
2. Add or repair scripts:
   - `validate:rag-config`
   - `validate:mcp-config`
   - `validate:graph-config`
   - `rag:eval` where appropriate
3. Rebuild current evidence:
   - `audit/evidence/rag-config-latest.json`
   - `audit/evidence/rag-eval-latest.json`
   - `audit/evidence/mcp-config-latest.json`
   - `audit/evidence/graph-projection-latest.json`
4. Update fleet rollup:
   - tier pass counts
   - exceptions
   - graph coverage
   - stale witness detection

