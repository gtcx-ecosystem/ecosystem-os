---
title: 'Ecosystem OS — canonical product-scopes index'
status: current
date: 2026-06-18
owner: ecosystem-os
document_type: overview
tier: critical
tags: [architecture, specs, operating-modules, canonical-index, product-scopes]
review_cycle: monthly
---

# Ecosystem OS — canonical product-scopes index

> **Reading order for the fleet operating-model spec set.** Ecosystem OS is the **category product + documentation home** — not a trade-platform implementation repo. Strategic narrative sits at [`../../../business/strategy/`](../../../business/strategy/); foundation pack at [`../../../foundation/`](../../../foundation/).

## Curated reading order

### 1. Strategic foundation

| Doc | Purpose |
| --- | ------- |
| [`../../../business/strategy/product-spec.md`](../../../business/strategy/product-spec.md) | Whole-product PRD — AI-native company OS |
| [`../../../foundation/vision.md`](../../../foundation/vision.md) | Vision + horizon |
| [`../../../foundation/mission.md`](../../../foundation/mission.md) | Mission |
| [`../../../business/strategy/narrative.md`](../../../business/strategy/narrative.md) | Pitch one-pager |
| [`../../../business/strategy/goals-milestones-2026.md`](../../../business/strategy/goals-milestones-2026.md) | Quarter + annual sequence |
| [`../../../business/strategy/competitive-positioning-2026.md`](../../../business/strategy/competitive-positioning-2026.md) | Category vs incumbents |
| [`../../../business/strategy/personas-2026.md`](../../../business/strategy/personas-2026.md) | Operator + buyer personas |
| [`../../../business/strategy/feature-matrix-2026.md`](../../../business/strategy/feature-matrix-2026.md) | Module × capability matrix |
| [`../../../business/strategy/user-journeys-2026.md`](../../../business/strategy/user-journeys-2026.md) | Operating loop journeys |

### 2. Cross-ecosystem foundation

| Doc | Purpose |
| --- | ------- |
| [`ecosystem-os-pillar-ownership-2026.md`](./ecosystem-os-pillar-ownership-2026.md) | Substrate + 7 operating modules × pillar SoR |
| [`ecosystem-os-cross-module-events-2026.md`](./ecosystem-os-cross-module-events-2026.md) | Typed events across modules |
| [`ecosystem-os-design-principles-2026.md`](./ecosystem-os-design-principles-2026.md) | Design + AI-native patterns |
| [`ecosystem-os-surface-inventory-2026.md`](./ecosystem-os-surface-inventory-2026.md) | Fleet surfaces + packaging |
| [`ecosystem-os-information-architecture-2026.md`](./ecosystem-os-information-architecture-2026.md) | Docs + GitBook IA |
| [`ecosystem-os-operating-loop-state-machine-2026.md`](./ecosystem-os-operating-loop-state-machine-2026.md) | Know→Publish loop |

### 3. Per-module scopes (ecosystem-os SoR)

| Module | Scope spec | Implementation repo |
| ------ | ---------- | ------------------- |
| **Ethos** | [`ethos-module-scope-2026.md`](./ethos-module-scope-2026.md) | ecosystem-os + canon-os |
| **Venture** | [`venture-module-scope-2026.md`](./venture-module-scope-2026.md) | ecosystem-os / venture-os |
| **Agency** | [`agency-module-scope-2026.md`](./agency-module-scope-2026.md) | ecosystem-os |
| **Bridge** | [`bridge-module-scope-2026.md`](./bridge-module-scope-2026.md) | bridge-os |
| **Agile** | [`agile-module-scope-2026.md`](./agile-module-scope-2026.md) | agile-os |
| **Fabric** | [`fabric-module-scope-2026.md`](./fabric-module-scope-2026.md) | fabric-os |
| **Assurance** | [`assurance-module-scope-2026.md`](./assurance-module-scope-2026.md) | fabric-os + canon-os |

### 4. Substrate (reference — implemented in owner repos)

| Layer | Reference | Owner repos |
| ----- | --------- | ----------- |
| Kernel | [`../../../foundation/narrative/product-architecture.md`](../../../foundation/narrative/product-architecture.md#substrate) | baseline-os |
| Graph | same | agile-os, bridge-os |
| Ledger | same | ledger-ui, canon-os |
| Surface | same | gtcx-os, markets-os, terminal-os, … |

**Fleet module map:** `bridge-os/pm/spec/ecosystem-module-repo-map.json`
