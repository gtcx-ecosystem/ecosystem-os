---
title: 'Inbound: venture-os — PM scaffold handoff (XR-VENTURE-PM-001)'
status: done
date: 2026-06-18
from: ecosystem-os
to: venture-os
priority: P1
initiative: INIT-ECOSYSTEM-VENTURE
story_id: ECO-VEN-005
xr_id: XR-VENTURE-PM-001
owner: venture-os
evidence_repo: venture-os
---

# XR-VENTURE-PM-001 — venture-os PM scaffold handoff

## Context

Venture module SoR lives in **ecosystem-os** (`docs/gitbook/business/venture/`). Product implementation backlog executes in **venture-os**.

**Hub story:** `ECO-VEN-005` · **Module contract:** `docs/gitbook/business/venture/module-contract.md`

## Witness (hub)

| Check | Path | Status |
| ----- | ---- | ------ |
| PM manifest | `venture-os/pm/manifest.json` | present |
| Backlog SoR | `venture-os/pm/backlog.json` | present |
| Product charter | `venture-os/pm/product/prds/prd-venture-os-charter.md` | present |
| Venture profiles (hub) | `ecosystem-os/docs/gitbook/business/venture/profiles/` | 11 profiles |

## Owner continuation

1. Align `venture-os/pm/backlog.json` with hub innovation register + fundraising trace.
2. Run `pnpm ops:check` in venture-os when product surfaces ship.
3. Link sprint stories to hub `ECO-VEN-*` IDs in handoff fields.

## Acceptance (ECO-VEN-005)

- [x] `venture-os/pm/manifest.json` exists
- [x] Inbound ticket XR-VENTURE-PM-001 filed (this document)
