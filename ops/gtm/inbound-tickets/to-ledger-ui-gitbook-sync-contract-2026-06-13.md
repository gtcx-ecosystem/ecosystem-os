---
title: 'Inbound: ledger-ui — GitBook sync contract (S45-03)'
status: open
date: 2026-06-13
from: canon-os
to: ledger-ui
priority: P1
initiative: INIT-DOC-FLEET-PUBLISH
story_id: S45-03
owner: ledger-ui
evidence_repo: ledger-ui
---

# GitBook sync contract — ledger-ui

## Context

**INIT-DOC-FLEET-PUBLISH** Sprint 45 — `@gtcx/ui` consumer docs should live in owner GitBook space, mirrored to hub (not hand-edited in canon-os).

**Hub contract:** [`docs/strategy/gitbook-product-sync-contract-v1.md`](../../../docs/strategy/gitbook-product-sync-contract-v1.md)

## Ask (owner repo)

1. GitBook space: component catalog, theming, installation, Storybook link, migration guides.
2. `.sync-manifest.json` per contract v1.
3. Coordinate with npm publish witness (`to-ledger-ui-ui-dist-republish-2026-06-12.md`) — doc version pins package version.

## Hub witness (on done)

- Mirror: `docs/reference/gitbooks/ledger-ui/`
- Publish register + fleet matrix update

## Acceptance

- [ ] Owner GitBook scaffold + manifest
- [ ] Hub mirror path populated
- [ ] Fleet matrix ledger-ui row status improved
