---
title: 'GitBook product sync contract v1'
status: current
date: 2026-06-13
owner: canon-os
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
initiative: INIT-DOC-FLEET-PUBLISH
---

# GitBook product sync contract v1

Owner repos publish GitBook-ready markdown; canon-os mirrors into `docs/reference/gitbooks/<repo>/`.

## Contract

| Field | Requirement |
| ----- | ----------- |
| `SUMMARY.md` | GitBook TOC at repo root or `docs/gitbook/SUMMARY.md` |
| `.sync-manifest.json` | `{ "version": "1", "sourceCommit": "<sha>", "paths": ["..."] }` |
| Refresh trigger | Owner release tag or weekly CI on `main` |
| Hub path | `docs/reference/gitbooks/<owner-repo>/` |
| Edit policy | **Read-only in canon-os** — file inbound to owner for content fixes |

## Reference implementation

`gtcx-protocols` → `docs/reference/gitbooks/gtcx-protocols/` · status **synced** in `pm/publish-register.json`

## Wave 1 owners (S45-03)

| Owner | Inbound | Hub sync path (on accept) |
| ----- | ------- | ------------------------- |
| compliance-os | [`to-compliance-os-gitbook-sync-contract-2026-06-13.md`](../../ops/gtm/inbound-tickets/to-compliance-os-gitbook-sync-contract-2026-06-13.md) | `docs/reference/gitbooks/compliance-os/` |
| gtcx-mobile | [`to-gtcx-mobile-gitbook-sync-contract-2026-06-13.md`](../../ops/gtm/inbound-tickets/to-gtcx-mobile-gitbook-sync-contract-2026-06-13.md) | `docs/reference/gitbooks/gtcx-mobile/` |
| ledger-ui | [`to-ledger-ui-gitbook-sync-contract-2026-06-13.md`](../../ops/gtm/inbound-tickets/to-ledger-ui-gitbook-sync-contract-2026-06-13.md) | `docs/reference/gitbooks/ledger-ui/` |

## Acceptance (owner)

1. GitBook space scaffold with ≥5 pages + SUMMARY
2. `.sync-manifest.json` committed in owner repo
3. Hub inbound marked **done** with sync SHA witness
