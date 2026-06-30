---
title: 'Ecosystem OS local lead evidence — 2026-06-29'
status: current
date: 2026-06-29
owner: ecosystem-os
document_type: evidence
tier: critical
tags: ['product-scopes', 'ownership', 'kernel', 'graph', 'ledger', 'surface', 'ethos', 'venture', 'agency']
review_cycle: on-change
---

# Ecosystem OS local lead evidence — 2026-06-29

## Decision

Ecosystem OS is the local product and roadmap lead for Kernel, Graph, Ledger, Surface, Ethos, Venture, and Agency.

Sibling repos remain supporting systems for implementation adapters, ceremonies, product surfaces, infrastructure, and evidence. They do not replace ecosystem-os as product lead for these seven capabilities.

## Evidence Paths

| Capability | Lead repo | Supporting repos / evidence | Local evidence |
| ---------- | --------- | --------------------------- | -------------- |
| Kernel | ecosystem-os | baseline-os | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-CORE.md` |
| Graph | ecosystem-os | agile-os, bridge-os | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-CORE.md` |
| Ledger | ecosystem-os | ledger-ui, fabric-os, canon-os | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-CORE.md` |
| Surface | ecosystem-os | gtcx-os, markets-os, terra-os, terminal-os | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-CORE.md` |
| Ethos | ecosystem-os | canon-os references | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-ETHOS.md` |
| Venture | ecosystem-os | venture-os implementation | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-VENTURE.md` |
| Agency | ecosystem-os | pm/agency evidence | `docs/product/roadmap/initiatives/INIT-ECOSYSTEM-AGENCY.md` |

## Validation

- `pnpm product:compile`
- `pnpm product:compile:check`
- `pnpm layout:check`
- `pnpm agile:check`
- `pnpm ops:check`
