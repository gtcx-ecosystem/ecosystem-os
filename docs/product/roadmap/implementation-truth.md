---
title: 'implementation truth — ecosystem-os roadmap'
status: current
date: 2026-06-22
owner: ecosystem-os
document_type: product
tags: ['roadmap', 'truth']
review_cycle: on-change
---

# Implementation truth

| Claim | Evidence |
| ----- | -------- |
| P22 queue compiled | `machine/backlog.json` via `pnpm product:compile` |
| P29 ops slice | `operations/machine/backlog.json` via `pnpm machine:sync` |
| Shipping progress | `machine/shipping-tracks.json` composite → progressPct |
| Agile ceremony | `agile/` per L1-agile.json |
| ZenHub contract | `agile/zenhub.md` + bridge registry |
