---
title: 'Inbound: gtcx-mobile — GitBook sync contract (S45-03)'
status: open
date: 2026-06-13
from: canon-os
to: gtcx-mobile
priority: P1
initiative: INIT-DOC-FLEET-PUBLISH
story_id: S45-03
owner: gtcx-mobile
evidence_repo: gtcx-mobile
---

# GitBook sync contract — gtcx-mobile

## Context

**INIT-DOC-FLEET-PUBLISH** Sprint 45 — mobile developer docs gap in fleet matrix.

**Hub contract:** [`docs/strategy/gitbook-product-sync-contract-v1.md`](../../../docs/strategy/gitbook-product-sync-contract-v1.md)

## Ask (owner repo)

1. GitBook scaffold under `docs/gitbook/` (SUMMARY + quickstart, build, release, SDK integration, troubleshooting).
2. `.sync-manifest.json` per contract v1.
3. Hub notification with sync SHA.

## Hub witness (on done)

- Mirror: `docs/reference/gitbooks/gtcx-mobile/`
- Publish register + fleet matrix update

## Acceptance

- [ ] Owner scaffold committed
- [ ] Hub mirror populated
- [ ] Fleet matrix devDocs/onboarding ≠ pending
