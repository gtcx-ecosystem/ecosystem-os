---
featureId: FEAT-VEN-FUNDRAISE-SYNC
initiativeId: INIT-ECOSYSTEM-VENTURE
title: 'FEAT-VEN-FUNDRAISE-SYNC — fundraising backlog traced to pm stories'
status: done
priority: P1
owner: ecosystem-os
document_type: product
date: 2026-06-24
tier: standard
tags: ['roadmap', 'feature', 'venture']
review_cycle: on-change
---

# FEAT-VEN-FUNDRAISE-SYNC — Fundraising ↔ backlog alignment

Trace `fundraising/implementation/execution-backlog.md` items to compiled stories in `machine/backlog.json`.

**Acceptance:** Each P0/P1 fundraising row links a `storyId` · `pnpm product:compile` includes venture stories

## Completion Evidence

- `docs/product/roadmap/stories/STORY-VEN-FUNDRAISE-SYNC.md`
- `pm/backlog/venture-backlog.json`
- `machine/backlog.json`
- `machine/ci/product-compile-latest.json`
