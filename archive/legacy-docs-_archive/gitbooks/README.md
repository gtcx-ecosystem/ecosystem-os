---
title: 'Ecosystem GitBooks'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-docs'
tags: ['gitbook', 'documentation']
review_cycle: 'on-change'
---

# Ecosystem GitBooks

Central **publish hub** for customer-facing GitBook spaces. Product repos **author** documentation locally; this repo **hosts** the paths GitBook syncs from.

## Layout

```
01-docs/gitbooks/
├── README.md                 # This file
├── gtcx-protocols/           # Synced from gtcx-protocols/01-docs/gitbook/
├── gtcx-mobile/              # (planned)
├── compliance-os/              # (planned)
└── …
```

Each subdirectory is a **standalone GitBook root** (`README.md`, `SUMMARY.md`, `book.json`).

## Sync model

| Repo | Authoring path | Hub path (here) | Sync command |
| ---- | -------------- | ----------------- | ------------ |
| **gtcx-protocols** | `01-docs/gitbook/` | `01-docs/gitbooks/gtcx-protocols/` | `pnpm sync:gitbook` in gtcx-protocols (includes [gtcx-core npm supply chain](gtcx-protocols/supply-chain/gtcx-core-npm.md)) |

Do not hand-edit synced trees in gtcx-docs — changes will be overwritten on the next sync. Edit the source repo, run sync, commit here.

`.sync-manifest.json` in each hub folder records last sync time and source path.

## GitBook connection

1. Create (or repoint) a GitBook space to **`gtcx-ecosystem/gtcx-docs`**.
2. Set **root** to `01-docs/gitbooks/<product>/` (e.g. `01-docs/gitbooks/gtcx-protocols`).
3. Enable GitHub sync on push to `main`.

Legacy single-folder `01-docs/gitbook/` at the root of gtcx-docs remains the **ecosystem** narrative space until migrated; product-specific API/protocol docs live under `01-docs/gitbooks/*`.

## Adding a new product

1. Add `01-docs/gitbook/` in the product repo (external-facing only).
2. Add `03-platform/scripts/sync-gitbook-to-gtcx-docs.mjs` (or shared script in gtcx-agentic).
3. Create `01-docs/gitbooks/<repo-name>/` here via sync.
4. Wire a new GitBook space → `01-docs/gitbooks/<repo-name>`.

## Related

- [GitBook architecture](../../README.md)
- [Protocol 1 docs structure](https://github.com/gtcx-ecosystem/canon-os/blob/main/01-docs/reference/templates/01-docs/6-cannon/3-gitbook/gitbook-guide.md)
