---
storyId: STORY-AGILE-ZENHUB-CONTRACT
initiativeId: INIT-ECOSYSTEM-DOCS
canonBundleId: FEAT-AGILE-DELIVERY-CONTRACT
title: 'STORY-AGILE-ZENHUB-CONTRACT — agile delivery + ZenHub contract surface'
status: done
priority: P1
owner: ecosystem-os
document_type: product
date: 2026-06-22
tier: critical
tags: ['roadmap', 'story', 'agile']
review_cycle: on-change
---

# STORY-AGILE-ZENHUB-CONTRACT — agile delivery + ZenHub contract surface

Ensure ecosystem-os has L1-agile ceremony surface, `docs/product/roadmap/` author plane, compiled `machine/backlog.json`, and P29 `operations/machine/` sync.

## Acceptance

- `pnpm agile:check` exit 0
- `pnpm --dir ../agile-os ecosystem:pm:standard:check` includes ecosystem-os
- `pnpm --dir ../agile-os agile:hierarchy:check` PASS
- `operations/machine/manifest.json` + `operations/machine/backlog.json` present

## Audit notes

Wire four-plane README, product:compile, machine:sync, zenhub.md per pm-zenhub-standard.json.
