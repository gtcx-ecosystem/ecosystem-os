---
title: 'Inbound: gtcx-hardware — Protocol 22 W4 rollout (migrated domain)'
status: done
date: 2026-06-04
updated: 2026-06-12
owner: canon-os
tier: operating
tags: ['inbound', 'protocol-22', 'W4', 'p34-migration']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                            |
| -------------- | ---------------------------------------------------------------- |
| **To**         | `gtcx-os/platform/hardware` (legacy id **gtcx-hardware**)        |
| **From**       | canon-os (constitution hub)                                      |
| **Date**       | 2026-06-04                                                       |
| **Subject**    | Protocol 22 W4 — manifest + selection script (hub matrix row 18) |
| **Priority**   | normal                                                           |
| **Hub sprint** | S22-02                                                           |

## P34 migration (2026-06-12)

| Item | Path |
| ---- | ---- |
| **Live SoR** | `gtcx-ecosystem/gtcx-os/platform/hardware/` |
| **Archived polyrepo** | `~/Sites/_local-backups/_archived/gtcx-hardware` (read-only) |
| **Normative map** | `bridge-os/pm/spec/archived-polyrepo-domains.json` → `platform/hardware` |
| **Do not** | Clone or recreate sibling `gtcx-hardware/` under `ECOSYSTEM_ROOT` |

## Hub probe (2026-06-12 harness complete)

| Check | Status |
| ----- | ------ |
| Resolved path | `gtcx-os/platform/hardware` — **present** |
| P22 core | **ready** — score **9/9** |
| CI `agent:next-work` + `agent:work-selection:check` | **wired** (`ci.yml`) |
| Owner commit | `gtcx-os@bc9cdc43` (`platform/hardware`) |
| Archive (read-only) | `~/Sites/_local-backups/_archived/gtcx-hardware` |
| Witness | `canon-os/docs/reference/audits/protocol-22-rollout-status.json` |

## Ask

Complete P22 W4 in the **migrated domain** (sections A–G of ecosystem checklist):

- Execution roadmap with at least one `pending` story
- `pm/auto-dev-state.md` or `01-docs/05-audit/...` session pointer
- `agent:work-selection:check` + CI wiring on PR/main

## Acceptance criteria

- [x] Hub matrix P22 core ✅ (9/9 at resolved path — 2026-06-12)
- [x] CI steps on PR/main
- [x] Audit records `resolvedPath: gtcx-os/platform/hardware`
