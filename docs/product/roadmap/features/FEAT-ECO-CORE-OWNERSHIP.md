---
feature: FEAT-ECO-CORE-OWNERSHIP
initiativeId: INIT-ECOSYSTEM-CORE
title: 'FEAT-ECO-CORE-OWNERSHIP — substrate ownership map'
status: done
owner: ecosystem-os
document_type: product
date: 2026-06-27
tier: critical
tags: ['roadmap', 'feature', 'kernel', 'graph', 'ledger', 'surface']
review_cycle: on-change
---

# FEAT-ECO-CORE-OWNERSHIP — substrate ownership map

Clarify ecosystem-os as lead repo for Kernel, Graph, Ledger, and Surface while preserving supporting implementation and evidence repos.

## Completed Spec

| Capability | Local lead | Supporting repos | Completion signal |
| ---------- | ---------- | ---------------- | ----------------- |
| Kernel | ecosystem-os | baseline-os | Product portfolio and surface inventory identify ecosystem-os as lead. |
| Graph | ecosystem-os | agile-os, bridge-os | Backlog registry and capability matrix bind Graph to `INIT-ECOSYSTEM-CORE`. |
| Ledger | ecosystem-os | ledger-ui, fabric-os, canon-os | Ledger is local product scope with supporting evidence repos named. |
| Surface | ecosystem-os | gtcx-os, markets-os, terra-os, terminal-os | Surface command is local product scope with supporting product surfaces named. |

## Completion Evidence

- `docs/gitbook/business/portfolio/product-portfolio.md`
- `docs/architecture/specs/product-scopes/ecosystem-os-surface-inventory-2026.md`
- `docs/architecture/specs/product-scopes/ecosystem-os-pillar-ownership-2026.md`
- `pm/spec/backlog-registry.json`
- `docs/product/roadmap/capability-matrix.md`
