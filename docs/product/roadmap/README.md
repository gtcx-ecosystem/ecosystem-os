---
title: 'product/roadmap — executable plan SoR'
status: current
date: 2026-06-22
owner: ecosystem-os
document_type: product
tier: critical
tags: ['documentation', 'product', 'roadmap']
review_cycle: on-change
---

# `docs/product/roadmap/` — executable plan

> **Pack:** [`../../../machine/spec/docs-product-pack.json`](../../../machine/spec/docs-product-pack.json)  
> **Compile:** `pnpm product:compile` → `machine/roadmap/` + `machine/backlog.json`  
> **Ceremony lanes:** [`../../../agile/roadmaps/README.md`](../../../agile/roadmaps/README.md) (narrative only — not duplicate plan bodies)

P57 executable plan SoR — initiatives, features, stories. **Not** under deprecated `docs/roadmap/`.

## Index

| Artifact | Path |
| -------- | ---- |
| Capability matrix | [capability-matrix.md](./capability-matrix.md) |
| Implementation truth | [implementation-truth.md](./implementation-truth.md) |
| Initiatives | [initiatives/](./initiatives/README.md) (`INIT-*`) |
| Features | [features/](./features/README.md) (`FEAT-*`) |
| Stories | [stories/](./stories/README.md) (`STORY-*`) |

## Separation

| Concern | SoR |
| ------- | --- |
| Executable plan (this folder) | `docs/product/roadmap/` |
| Lane narratives (GTM, legal, …) | `agile/roadmaps/` |
| Machine backlog JSON | `machine/backlog.json` (compiled — do not hand-edit) |
| UX operator narrative | `docs/product/ux/` |
| Strategy essays | `docs/strategy/` |

**Gate:** `pnpm docs:product:check` · **Compile:** `pnpm product:compile`
