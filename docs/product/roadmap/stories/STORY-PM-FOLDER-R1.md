---
storyId: STORY-PM-FOLDER-R1
initiativeId: INIT-ECOSYSTEM-DOCS
canonBundleId: FEAT-PM-FOLDER-R1
title: 'STORY-PM-FOLDER-R1 — product compile + backlog reconciliation'
status: done
priority: P0
owner: ecosystem-os
document_type: product
date: 2026-06-24
tier: critical
tags: ['roadmap', 'story', 'pm']
review_cycle: on-change
---

# STORY-PM-FOLDER-R1 — PM compile reconciliation

Populate `docs/product/roadmap/` FEAT + STORY bodies and refresh compiled `machine/backlog.json`.

## Acceptance

- `pnpm product:compile` exit 0
- `machine/backlog.json` openCount ≥ 3
- `pnpm gtm:readiness:check:write` composite ≥ 80
