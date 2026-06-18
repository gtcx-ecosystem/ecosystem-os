---
title: 'Ecosystem OS — information architecture 2026'
status: current
date: 2026-06-18
owner: ecosystem-os
document_type: architecture
tier: critical
tags: [ia, gitbook, docs]
review_cycle: monthly
canonical: true
---

# Ecosystem OS — information architecture

## Docs root six-pack

| Layer | Path | Role |
| ----- | ---- | ---- |
| Foundation | `docs/foundation/` | Why — vision, mission, goals |
| Business | `docs/gitbook/business/` | Market, portfolio, modules |
| Architecture | `docs/architecture/` | How — specs, product-scopes |
| Product | `docs/product/` (pack) | UX + acceptance pointers |
| Operations | `docs/operations/` | Runbooks, workspace layout |
| Reference | `docs/reference/` | GitBook mirrors, guides |

## Machine SoR

- `docs/sor.json` — path registry
- `docs/INDEX.md` — agent manifest
- `pm/publish-register.json` — GitBook spaces

## Navigation contract

Human readers: `docs/README.md` → GitBook SUMMARY.  
Agents: `agents/bootstrap/session-chain.json` → P22 → owner repo switch per `ecosystem-module-repo-map.json`.
