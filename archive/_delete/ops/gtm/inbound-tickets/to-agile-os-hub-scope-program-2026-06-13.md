---
title: 'Inbound: agile-os — hub-scope program + DoD (INIT-HUB-SCOPE-GUARD)'
status: open
date: 2026-06-13
from: canon-os
to: agile-os
priority: P1
gate_id: INIT-HUB-SCOPE-GUARD
initiative: INIT-HUB-SCOPE-GUARD
protocol: P24
hub_only: true
owner: agile-os
evidence_repo: agile-os
blocksIR: false
---

# INIT-HUB-SCOPE-GUARD — agile-os program office

| Field | Value |
| ----- | ----- |
| **To** | agile-os |
| **From** | canon-os (gtcx-docs / Layer 0) |
| **Owner repo** | agile-os |
| **Implementation repo** | agile-os (program tracking); bridge-os + canon-os execute stories |
| **Hub only?** | `yes` for canon-os rows; `no` for bridge/baseline story execution |
| **Work ID** | INIT-HUB-SCOPE-GUARD / HSG-A01–A08 |
| **Priority** | `blocked-path` |

## Context

canon-os agents repeatedly ran **`execute_roadmap`** after hub backlog cleared and **implemented product work in the wrong git root** (ledger-ui package changes, gtcx-platforms npm probes) despite Protocol 24 Layer 0 rules.

**Root cause (program):** Coordination tier lacks a **fleet Definition of Done**, sprint gate, and intake classification for "hub register only" vs "owner implement".

**Incident register:** [`hub-scope-incident-register-2026-06-13.md`](../../coordination/hub-narrative/hub-scope-incident-register-2026-06-13.md)

**Harness handoff (sibling):** [`to-bridge-os-hub-scope-fleet-guard-2026-06-13.md`](./to-bridge-os-hub-scope-fleet-guard-2026-06-13.md)

## Ask — agile-os (program tracking owner)

### HSG-A01 — Register initiative

Add to [`docs/reference/sprints/ecosystem-reconcile-program-2026-06.md`](https://github.com/gtcx-ecosystem/agile-os/blob/main/docs/reference/sprints/ecosystem-reconcile-program-2026-06.md) (or new program doc if ER-1 sealed):

| Field | Value |
| ----- | ----- |
| **ID** | `INIT-HUB-SCOPE-GUARD` |
| **Theme** | Prevent Layer 0 agents from implementing owner-repo product work |
| **Exit** | Fleet ceremony + DoD gates green; zero recurrence in retro window |

Roll into `pm/intake/rollup-latest.json` when triaged.

### HSG-A02 — Story register (map to owners)

| Story | Title | Owner repo | P | Depends |
| ----- | ----- | ---------- | - | ------- |
| HSG-A02-01 | Workspace guard in baseline start | baseline-os + bridge-os | P0 | — |
| HSG-A02-02 | Hub execution policy JSON + P22 fields | bridge-os | P0 | A02-01 |
| HSG-A02-03 | canon-os incident register + inbound template hardening | canon-os | P1 | — |
| HSG-A02-04 | Fleet agent spec syndication (gtcx-docs charter) | bridge-os | P1 | A02-02 |
| HSG-A02-05 | `ecosystem:ceremony:check` hub-scope slice | agile-os | P1 | A02-02 |
| HSG-A02-06 | Documentation fleet program (GitBook per repo) — **separate epic** | canon-os + owners | P2 | — |

**Rule:** Stories with `owner_repo ≠ canon-os` are **never** marked done with `evidence_repo: canon-os`.

### HSG-A03 — Definition of Done (hub repos)

Extend [`definition-of-done.md`](https://github.com/gtcx-ecosystem/agile-os/blob/main/docs/reference/sprints/definition-of-done.md) with **Layer 0 addendum**:

```markdown
## Hub (canon-os / gtcx-docs) DoD addendum

- [ ] No diff outside hub allowlist (`validate:hub-scope` exit 0)
- [ ] Product XR: inbound ticket filed/updated; **no** owner package.json / src / terraform in hub PR
- [ ] Owner SHA cited in coordination log before workplan `done`
- [ ] Session Status Update lists `Register: canon-os` not owner repo for hub turns
```

### HSG-A04 — Definition of Ready (coordination tier)

When P22 returns `backlogClear: true`:

- Agent **must** read `coordination.agentInstructions` before any shell in sibling paths.
- Ready = inbound ticket exists OR Class S human gate documented — not "I'll implement to unblock."

Add to [`definition-of-ready.md`](https://github.com/gtcx-ecosystem/agile-os/blob/main/docs/reference/sprints/definition-of-ready.md).

### HSG-A05 — Sprint ceremony gate

Extend `pnpm ecosystem:ceremony:check` (agile-os owner) with:

| Check | Fail when |
| ----- | --------- |
| `hub-scope-stories` | Any closed hub sprint story lacks `validate:hub-scope` witness |
| `inbound-before-done` | XR marked done in hub workplan without matching inbound `status: done` or owner ack |
| `wrong-repo-commits` | Incident register has open recurrence without bridge ack |

Witness: update `pm/ci/sprint-ceremony-cadence-latest.json`.

### HSG-A06 — Intake classification

Update agile-os intake triage types:

| Type | Route |
| ---- | ----- |
| `hub-register` | canon-os — docs/inbound/log only |
| `owner-implement` | Owner repo workspace mandatory |
| `scope-violation` | HSG-INC register + bridge bulletin; **no** story done credit |

Document in `pm/intake/TASK-INTAKE-FORMAT.md` (bridge-os copy) or agile-os equivalent.

### HSG-A07 — Retro mandatory item

Add standing retro prompt (fleet):

> "Did any agent implement product code from canon-os this sprint? If yes: HSG-INC entry required before sprint seal."

### HSG-A08 — Documentation fleet epic (parallel — addresses doc gap)

Create epic **`INIT-DOC-FLEET-COVERAGE`** (P2, non-blocking HSG):

| Track | Scope |
| ----- | ----- |
| GitBook | Per-repo space checklist; only protocols synced today |
| GTM | `ops/gtm/` manifest vs full vertical packs |
| Developer | API/SDK owner repos; hub indexes only |
| Onboarding | Per-repo contributor paths |

**canon-os role:** inbound tickets + publish register — **not** writing all product docs in hub.

Link from canon-os execution-roadmap when epic is filed.

## Acceptance criteria

- [ ] `INIT-HUB-SCOPE-GUARD` visible in agile-os program/roadmap with HSG-A02 story table
- [ ] DoD + DoR addenda merged in agile-os docs
- [ ] `ecosystem:ceremony:check` includes ≥1 hub-scope check (or staged witness with date)
- [ ] Ack: `agile-os/docs/operations/coordination/from-canon-os-hub-scope-program-ack-2026-06-13.md`
- [ ] Intake rollup lists initiative with owner assignments

## Out of scope (agile-os must NOT)

- Implement bridge harness code (bridge-os / baseline-os)
- Mark HSG stories **done** without owner-repo evidence SHA
- Consolidate all fleet docs into canon-os (violates Layer 0)

## Related

| Item | Path |
| ---- | ---- |
| Bridge harness ticket | [`to-bridge-os-hub-scope-fleet-guard-2026-06-13.md`](./to-bridge-os-hub-scope-fleet-guard-2026-06-13.md) |
| Hub enforcement | [`hub-scope-enforcement.md`](../../coordination/hub-narrative/hub-scope-enforcement.md) |
| Ecosystem reconcile | agile-os `ecosystem-reconcile-program-2026-06.md` |

## Ack

Post ack within **5 business days**. Coordinate sprint seal with bridge-os HSG-B02 witness.
