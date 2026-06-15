---
title: 'GitBook publish guide — ecosystem-os'
status: current
date: 2026-06-14
owner: ecosystem-os
tier: standard
tags: [['gitbook', 'publish', 'documentation']]
review_cycle: on-change
document_type: gitbook-chapter
role: protocol-architect
---

# GitBook publish guide

Connect GitBook to this repository for fleet documentation sync.

## Repository

| Field | Value |
| ----- | ----- |
| GitHub org/repo | [`gtcx-ecosystem/ecosystem-os`](https://github.com/gtcx-ecosystem/ecosystem-os) |
| Default branch | `main` |
| Publish register | [`pm/publish-register.json`](../../pm/publish-register.json) |

## GitBook GitHub integration

1. In GitBook, create or open a **Space** for each publish entry in `pm/publish-register.json`.
2. Choose **Integrations → GitHub** and authorize the `gtcx-ecosystem` org.
3. Select repository **`gtcx-ecosystem/ecosystem-os`** and branch **`main`**.
4. Set the **content root** to the path below for each space (one root per space).

## Content roots

| Space role | GitBook content root | Notes |
| ---------- | -------------------- | ----- |
| **Ecosystem library** | `docs/gitbook/ecosystem/` | Primary operator-facing GitBook — `SUMMARY.md` drives nav |
| **Product mirrors** | `docs/reference/gitbooks/<product>/` | One subdirectory per product (e.g. `gtcx-protocols/`, `compliance-os/`) |

### Ecosystem root

```
docs/gitbook/ecosystem/
├── README.md
├── SUMMARY.md
└── …
```

### Product mirror roots

```
docs/reference/gitbooks/
├── gtcx-protocols/
├── compliance-os/
└── …
```

Each product folder should contain at minimum `README.md` or `index.md` and `SUMMARY.md` when synced to a dedicated GitBook space.

## Sync workflow

1. Edit markdown under the appropriate root in this repo.
2. Commit to `main` (or merge PR).
3. GitBook pulls on push when GitHub sync is enabled.
4. Update [`pm/publish-register.json`](../../pm/publish-register.json) when adding a new space or changing `sourcePath`.

## Owner-repo authoring

Product slices may author in owner repos (e.g. `gtcx-os/platform/protocols/docs/gitbook/`) and sync into `docs/reference/gitbooks/<product>/` per [`docs/strategy/gitbook-product-sync-contract-v1.md`](../strategy/gitbook-product-sync-contract-v1.md).

## Verification

- Confirm GitBook shows latest commit SHA after push.
- Cross-check space `id` in `pm/publish-register.json` matches GitBook space configuration.
- Coverage: [`docs/reference/documentation-fleet-coverage-matrix.md`](../reference/documentation-fleet-coverage-matrix.md)
