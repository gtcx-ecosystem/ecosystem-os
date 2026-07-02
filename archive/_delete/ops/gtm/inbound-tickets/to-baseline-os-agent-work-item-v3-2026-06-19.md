---
title: 'Inbound: baseline-os — Agent work-item format v3 (Story · Value · Scope)'
status: open
date: 2026-06-19
owner: canon-os
tier: operating
tags: ['inbound', 'protocol-45', 'protocol-26', 'agent-communication']
review_cycle: on-change
story_id: ACOM-WI-001
initiative: INIT-AGENT-COMMUNICATION
protocol: P45
priority: P1
blocksIR: false
authorityClass: R
from: canon-os
to: baseline-os
---

# Inbound: institutionalize work-item format v3 (baseline-os owner)

| Field | Value |
| ----- | ----- |
| **To** | baseline-os |
| **From** | canon-os (constitution hub witness) |
| **Story** | `ACOM-WI-001` |
| **Initiative** | `INIT-AGENT-COMMUNICATION` (P45 phase 3) |
| **Priority** | P1 — fleet agent UX; unblocks operator clarity + focus discipline |

## Story

Replace **Because** as the sole rationale field on Proceed Brief and Status Update **Next work item** with three normative fields: **Story**, **Value created**, **Scope** — plus retain Type · ID · Title · Owner.

Operator directive (2026-06-19): agents must state *what* the work is, *why it matters to the product/program*, and *who executes under which scope boundary* — not only P22 `selection.reason`.

## Value created

- Operators and agents stop misreading P22 redirect strings as product priority (e.g. hub `engineeringRedirect` vs stated P0 forensic charter wave).
- Fleet-wide consistent handoff language: own-repo in-scope, own-repo handoff, other-repo our-scope, other-repo their-scope.
- `pnpm agent:communication:check` + `pnpm ecosystem:agent:communication:check` enforce the shape; bridge-os rollout propagates to all repos.

## Scope (this ticket)

**Own repo — in scope (baseline-os):** normative spec + templates + check scripts + fleet sync source.

**Other repo — our scope (canon-os):** Protocol 45 mirror in `docs/governance/protocols/45-agent-communication/` after baseline-os lands v3.

**Other repo — their scope (bridge-os):** run `pnpm ecosystem:agent:communication:rollout` after baseline merge.

## Normative scope taxonomy (embed in spec)

| Scope id | Label | Meaning |
| -------- | ----- | ------- |
| `own-in-scope` | Own repo — in scope | Current workspace repo; agent implements here |
| `own-handoff` | Own repo — handoff | Hub witness/register; owner repo implements |
| `other-our-scope` | Other repo — our scope | Authorized cross-repo work (inbound, fleet orchestration) |
| `other-their-scope` | Other repo — their scope | Owner engineering; switch workspace — do not implement from hub cwd |

## Artifacts to update (baseline-os)

| # | Path | Change |
| - | ---- | ------ |
| 1 | `pm/spec/agent-communication-protocol.json` | PROCEED_BRIEF: replace `Because` required section with `Story`, `Value created`, `Scope`; STATUS_UPDATE Next work item fields |
| 2 | `pm/spec/agent-communication-ux-spec.json` | Add `workItemV3` block + scope enum |
| 3 | `docs/operations/agent-status-update-template.md` | Next work item template |
| 4 | `docs/operations/agent-proceed-brief-template.md` | Proceed Brief template |
| 5 | `docs/operations/agent-communication-protocol.md` | Prose + examples |
| 6 | `platform/scripts/ecosystem/lib/proceed-brief.mjs` | Emit Story/Value/Scope; deprecate `- **Because:**` |
| 7 | `platform/scripts/ecosystem/lib/validate-agent-response.mjs` | Require new fields; forbid `Because` as primary on Next work item |
| 8 | `platform/scripts/checks/check-agent-communication.mjs` | Fixture updates |
| 9 | `platform/scripts/fixtures/agent-communication/*.md` | Golden files |
| 10 | `AGENTS.md` + `.cursor/rules/agent-mandatory-closing.mdc` | Closing template |

## Operator priority lock (ACOM-WI-002 follow-on — optional same sprint)

Add `sessionPriority` to `agent:next-work` JSON (bridge-os / baseline-os):

- When operator sets P0 in session (`correct: P0=…` or `.baseline/memory/session.md` **Active priority**), P22 **must not** override with `engineeringRedirect` until priority cleared or D6 blocker.
- Root cause of focus drift documented in canon-os handoff witness below.

## Acceptance

- [ ] `pnpm agent:communication:check` exit 0 on baseline-os
- [ ] `pnpm ecosystem:agent:communication:check` exit 0 (bridge-os harness)
- [ ] Proceed Brief + Status Update fixtures use Story · Value created · Scope
- [ ] `Because` retained only inside **Done** evidence lines or historical audit — not on Next work item
- [ ] bridge-os rollout witness: `pm/ci/agent-communication-rollout-latest.json`
- [ ] canon-os P45 mirror PR linked

## References

- canon-os witness: `docs/operations/coordination/to-baseline-os-agent-work-item-v3-2026-06-19.md`
- Current SoR: `baseline-os/pm/spec/agent-communication-protocol.json` v1.1.0
- Fleet sync: `bridge-os/pm/spec/agent-communication-protocol-pointer.json`

## Ack

File `workstream/coordination/inbound/from-canon-os-agent-work-item-v3-2026-06-19.md` when complete.
