---
title: 'FOLDER-SPEC — docs/product/roadmap/'
status: current
date: 2026-06-22
owner: ecosystem-os
document_type: folder-spec
tier: critical
tags: ['documentation', 'product', 'roadmap']
review_cycle: on-change
---

# FOLDER-SPEC — `docs/product/roadmap/`

P57 executable plan SoR — initiatives, features, stories. Parent pack: [`../../../machine/spec/docs-product-pack.json`](../../../machine/spec/docs-product-pack.json).

## Required

- `README.md`, `FOLDER-SPEC.md`
- `capability-matrix.md`, `implementation-truth.md`
- `initiatives/`, `features/`, `stories/` each with `README.md` + `FOLDER-SPEC.md`

## Gates

`pnpm docs:product:check` · `pnpm docs:tree:check:strict` · `pnpm product:compile`
