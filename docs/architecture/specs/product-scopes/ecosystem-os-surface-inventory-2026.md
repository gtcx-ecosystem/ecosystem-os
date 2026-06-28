---
title: 'Ecosystem OS — surface inventory 2026'
status: current
date: 2026-06-18
owner: ecosystem-os
document_type: strategy
tier: critical
tags: [surfaces, packaging, fleet]
review_cycle: monthly
canonical: true
---

# Ecosystem OS — surface inventory

## Substrate surfaces (ecosystem-os lead)

Ecosystem OS is the product lead and local roadmap SoR for Kernel, Graph, Ledger, and Surface. Sibling repos may provide implementation adapters, evidence producers, or mirrored product surfaces, but they do not own the product boundary for these substrate surfaces.

| ID | Surface | Lead repo | Implementation / evidence participants | Buyer promise |
| -- | ------- | --------- | -------------------------------------- | ------------- |
| SUB-01 | Kernel runtime | ecosystem-os | baseline-os | Governed agent substrate |
| SUB-02 | Graph / backlog | ecosystem-os | agile-os, bridge-os | Company state + work graph |
| SUB-03 | Ledger / evidence | ecosystem-os | ledger-ui, fabric-os, canon-os | Verifiable history |
| SUB-04 | Surface command | ecosystem-os | gtcx-os, markets-os, terra-os, terminal-os | Command center and operator product surfaces |

## Operating module surfaces (ecosystem-os SoR)

| ID | Module | Primary surface | Doc SoR |
| -- | ------ | --------------- | ------- |
| MOD-01 | Ethos | Doctrine + charter | `docs/foundation/` |
| MOD-02 | Venture | Portfolio + profiles | `docs/gitbook/business/venture/` |
| MOD-03 | Agency | Campaign packs | `pm/agency/` |
| MOD-04 | Bridge | P22 + fleet gates | `bridge-os` (link) |
| MOD-05 | Agile | Sprint authority | `agile-os` (link) |
| MOD-06 | Fabric | Infra + SecOps | `fabric-os` (link) |
| MOD-07 | Assurance | Multi-pillar audit | `canon-os` rubric + fleet witnesses |

## Packaging

| Package | Modules included | Doc |
| ------- | ---------------- | --- |
| Core | Kernel, Graph, Ledger | product-architecture.md |
| Operator | Surface, Bridge, Agile, Assurance | product-portfolio.md |
| Company | Ethos, Venture, Agency + Operator | product-portfolio.md |
| Enterprise | Operator + Fabric + deployment controls | open-source-product-strategy.md |
