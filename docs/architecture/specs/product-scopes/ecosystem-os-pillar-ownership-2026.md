---
title: 'Ecosystem OS — pillar ownership matrix 2026'
status: current
date: 2026-06-18
owner: ecosystem-os
document_type: protocol
tier: critical
tags: [pillar-ownership, operating-modules, substrate, multi-pillar]
review_cycle: monthly
canonical: true
---

# Ecosystem OS — pillar ownership matrix

> **Canonical SoR** for which module owns which pillar of the AI-native company operating loop. Every module scope doc links here.

Ecosystem OS is the local product lead for Kernel, Graph, Ledger, Surface, Ethos, Venture, and Agency. Bridge, Agile, Fabric, and Assurance remain operating modules in the Ecosystem OS product model, with sibling repos participating as implementation, ceremony, service, or evidence systems.

## Operating loop pillars

| # | Pillar | Meaning |
| - | ------ | ------- |
| 1 | **Know** | Company state visible — Graph, signals, doctrine |
| 2 | **Judge** | Human doctrine + authority — Ethos, policy |
| 3 | **Invent** | Strategy + IP — Venture |
| 4 | **Express** | Market narrative — Agency |
| 5 | **Coordinate** | Agents + handoffs — Bridge |
| 6 | **Ship** | Delivery cadence — Agile |
| 7 | **Operate** | Infra + services — Fabric |
| 8 | **Verify** | Evidence + audit — Assurance |
| 9 | **Publish** | Official surfaces — Canon (link-only) |

## Module × pillar SoR

| Module | 1 Know | 2 Judge | 3 Invent | 4 Express | 5 Coordinate | 6 Ship | 7 Operate | 8 Verify | 9 Publish |
| ------ | ------ | ------- | -------- | --------- | ------------ | ------ | --------- | -------- | --------- |
| **Graph** (substrate) | SoR | consumes | consumes | — | consumes | consumes | consumes | consumes | — |
| **Kernel** | consumes | SoR | — | — | SoR | — | SoR | — | — |
| **Ledger** | consumes | — | — | — | — | — | — | SoR | — |
| **Surface** | consumes | — | — | consumes | consumes | consumes | — | — | consumes |
| **Ethos** | consumes | SoR | consumes | — | — | — | — | — | — |
| **Venture** | consumes | consumes | SoR | feeds | — | feeds | — | — | — |
| **Agency** | — | — | consumes | SoR | — | feeds | — | consumes | feeds |
| **Bridge** | consumes | — | — | — | SoR | consumes | consumes | — | — |
| **Agile** | consumes | — | — | — | consumes | SoR | — | consumes | — |
| **Fabric** | — | — | — | — | consumes | consumes | SoR | consumes | — |
| **Assurance** | consumes | — | — | — | — | consumes | consumes | SoR | feeds |

**Lead repo for Kernel / Graph / Ledger / Surface / Ethos / Venture / Agency:** `ecosystem-os`

**Witness:** `audit/evidence/mpr-product-layer-latest.json` · **Fleet rubric:** canon-os multi-pillar index
