---
title: Fleet architecture index
status: current
date: 2026-06-14
owner: ecosystem-os
---

# Fleet architecture

High-level map of the GTCX ecosystem. Detailed ADRs and diagrams stay in owner repos and canon-os reference.

## Layer model

```text
canon-os          Layer 0 — constitution, protocols, audit rubric
ecosystem-os      Layer 0 — fleet docs, GitBook, GTM, onboarding (this repo)
bridge-os         Program office — P35, ZenHub, fleet gates
baseline-os       Agent runtime — CLI, MCP, vault, RAG
gtcx-os           Trade core monorepo — platform/protocols, mobile, core, …
*-os product repos Terminal, compliance, markets, terra, sensei, …
```

## Monorepo slices (gtcx-os/platform/)

| Slice | Was (archived standalone) | Role |
| ----- | ------------------------- | ---- |
| `protocols/` | gtcx-protocols | Six verification protocols, MCP, API |
| `mobile/` | gtcx-mobile | Field / operator mobile |
| `core/` | gtcx-core | Shared packages, predicates |
| `platforms/` | gtcx-platforms | Sovereign/cloud platform services |
| `intelligence/` | gtcx-intelligence | Verification fabric, world model R&D |

## Architecture references

| Topic | Path |
| ----- | ---- |
| Protocol specs GitBook | [`../reference/gitbooks/gtcx-protocols/`](../reference/gitbooks/gtcx-protocols/) |
| Engineering architecture (canon-os) | [`../../../canon-os/docs/engineering/architecture/`](../../../canon-os/docs/engineering/architecture/) |
| Organizational architecture | [`../../../canon-os/docs/operations/organization/gtcx-organizational-architecture.md`](../../../canon-os/docs/operations/organization/gtcx-organizational-architecture.md) |
| bridge-os north star | [`../../../bridge-os/docs/architecture-north-star-2026-06-08.md`](../../../bridge-os/docs/architecture-north-star-2026-06-08.md) |

## GitBook product authoring (v5)

Each owner slice authors at **`docs/gitbook/`** inside the slice (not `01-docs/`). Sync to `ecosystem-os/docs/reference/gitbooks/<product>/`.

See bridge-os [#28](https://github.com/gtcx-ecosystem/bridge-os/issues/28) for publish topology reconciliation.
