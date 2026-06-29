---
title: 'Inbound: compliance-os — GitBook sync contract (S45-03)'
status: open
date: 2026-06-13
from: canon-os
to: compliance-os
priority: P1
initiative: INIT-DOC-FLEET-PUBLISH
story_id: S45-03
owner: compliance-os
evidence_repo: compliance-os
---

# GitBook sync contract — compliance-os

## Context

**INIT-DOC-FLEET-PUBLISH** Sprint 45 requires three product GitBook spaces beyond `gtcx-protocols`. Fleet matrix row: **gap**.

**Hub contract:** [`docs/strategy/gitbook-product-sync-contract-v1.md`](../../../docs/strategy/gitbook-product-sync-contract-v1.md)

## Ask (owner repo)

1. Add GitBook scaffold: `docs/gitbook/SUMMARY.md` + ≥5 pages (product overview, onboarding, API surface, compliance posture, deployment).
2. Commit `.sync-manifest.json` at repo root per contract v1.
3. Notify hub with source commit SHA for mirror pull.

## Hub witness (on done)

- Create read-only mirror: `docs/reference/gitbooks/compliance-os/`
- Update `pm/publish-register.json` space `compliance-os` → **synced**
- Update `docs/reference/documentation-fleet-coverage-matrix.md` row

## Acceptance

- [ ] Owner SUMMARY + manifest in compliance-os
- [ ] Hub mirror path populated
- [ ] Fleet matrix status ≠ gap
