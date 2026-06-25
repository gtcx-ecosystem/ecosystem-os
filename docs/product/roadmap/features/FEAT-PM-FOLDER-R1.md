---
featureId: FEAT-PM-FOLDER-R1
initiativeId: INIT-ECOSYSTEM-DOCS
title: 'FEAT-PM-FOLDER-R1 — pm/ roadmap + manifest + folder check'
status: done
priority: P0
owner: ecosystem-os
document_type: product
date: 2026-06-24
tier: critical
tags: ['roadmap', 'feature', 'pm']
review_cycle: on-change
---

# FEAT-PM-FOLDER-R1 — PM folder R1

Compiled `machine/roadmap/initiatives.json`, `machine/backlog.json`, and `ops/pm/manifest.json` with `pnpm product:compile`.

**Acceptance:** `pnpm pm:folder:check` exit 0 · `machine/ci/product-compile-latest.json` pass:true
