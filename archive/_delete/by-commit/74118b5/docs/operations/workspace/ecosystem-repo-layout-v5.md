---
title: 'ecosystem-os — P35 v5 workspace layout'
status: current
date: 2026-06-15
owner: ecosystem-os
document_type: protocol
tier: operating
tags: ['layout', 'P35', 'workspace']
review_cycle: on-change
---

# ecosystem-os — P35 v5 workspace layout

**Layout version:** v5 (unnumbered root hubs)  
**Normative contract:** [`config/layout-contract.json`](../../../config/layout-contract.json) → `../bridge-os/config/ecosystem-layout-contract.json`  
**Checker:** `pnpm layout:check`

## Hub map

| Hub | Path | Role |
| --- | ---- | ---- |
| `docs` | `docs/` | Fleet documentation, GitBook source, reference guides |
| `ops` | `ops/` | P29 domains: gtm, legal, compliance, coordination, assurance, attestation, security, pm |
| `platform` | `platform/` | Repo-specific scripts, MCP server, ops-check runner |
| `audit` | `audit/` | Audit entry, evidence, five-core rollup |
| `deploy` | `deploy/` | Static GitBook and deploy artifacts |
| `workstream` | `workstream/` | Sprint artifacts, retrospectives |
| `agentic` | `agentic/` | Agentic manifest and thin bridge |
| `pm` | `pm/` | Product roadmap, backlog, PRDs, publish register |
| `archive` | `archive/` | Retired or superseded artifacts |

## Key conventions

- No numbered hub prefixes (`01-docs/`, `02-ops/`, etc.).
- P29 operational domains live under `ops/`, not `docs/`.
- Product PRDs live under `pm/product/`, not `docs/`.
- GitBook source lives under `docs/gitbook/`; mirrored owner-repo GitBooks live under `docs/reference/gitbooks/<repo>/`.
- Normative protocols remain in `canon-os` — link only.

## Validation

```bash
pnpm layout:check       # P35 strict
pnpm pm:folder:check    # PM folder R1
pnpm ops:check          # Full P29 + P35 + PM check
```
