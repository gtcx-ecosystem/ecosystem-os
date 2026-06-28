---
featureId: FEAT-AGILE-DELIVERY-CONTRACT
initiativeId: INIT-ECOSYSTEM-DOCS
title: 'FEAT-AGILE-DELIVERY-CONTRACT — agile-os delivery + ZenHub surface'
status: done
priority: P1
owner: ecosystem-os
document_type: product
date: 2026-06-22
tier: critical
tags: ['roadmap', 'feature', 'agile']
review_cycle: on-change
---

# FEAT-AGILE-DELIVERY-CONTRACT — agile-os delivery + ZenHub surface

Wire the four-plane delivery pipeline and P29 `operations/machine/` sync slice per L1-agile.json.

**Acceptance:** `pnpm agile:check` · `pnpm --dir ../agile-os ecosystem:pm:standard:check` · `pnpm --dir ../agile-os agile:hierarchy:check`

## Completion Evidence

- `docs/product/roadmap/stories/STORY-AGILE-ZENHUB-CONTRACT.md`
- `operations/machine/manifest.json`
- `operations/machine/backlog.json`
- `machine/ci/product-compile-latest.json`
