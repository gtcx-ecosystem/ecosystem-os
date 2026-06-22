---
title: 'Inbound: sensei-ai — Protocol 22 W4 rollout'
status: open
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'W4']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| **To**         | sensei-ai                                                              |
| **From**       | gtcx-docs (constitution hub)                                           |
| **Date**       | 2026-06-04                                                             |
| **Subject**    | Protocol 22 W4 — manifest + `agent:next-work` + CI (hub matrix row 14) |
| **Priority**   | normal                                                                 |
| **Hub sprint** | S22-02                                                                 |

## Context

Hub audit **2026-06-04:** **6/22** repos lack P22 core. sensei-ai has execution roadmap + auto-dev only — no manifest, selection script, or CI smoke.

Matrix: [`ecosystem-rollout-checklist.md`](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/governance/protocols/22-agent-work-selection/ecosystem-rollout-checklist.md)

## Ask

Implement checklist sections **A–G** in the target repo (copy from [implementation guide](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/governance/protocols/22-agent-work-selection/implementation-guide.md)):

1. `01-docs/04-ops/agent-work-selection.md` with `adoption_status: pilot` (or `established` when stable)
2. `03-platform/scripts/agent-next-work.mjs` + `package.json` → `"agent:next-work"`
3. `03-platform/scripts/check-agent-work-selection.mjs` + `"agent:work-selection:check"`
4. Root `AGENTS.md` § Protocol 22 session start
5. CI: `pnpm run agent:next-work` + `agent:work-selection:check` on PR/main ([CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md))
6. Optional: `01-docs/04-ops/coordination/README.md` per [Grade-D stub](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/grade-d-coordination-stub-playbook.md)

**Reference impl:** [exploration-os manifest](https://github.com/gtcx-ecosystem/exploration-os/blob/main/01-docs/04-ops/agent-work-selection.md)

## Hub probe (2026-06-12)

| Check | Status |
| ----- | ------ |
| P22 core (script + manifest + roadmap + AGENTS) | **ready** — score 6/9 |
| CI `agent:next-work` | open |
| CI `agent:work-selection:check` | open |
| Witness | `canon-os/docs/reference/audits/protocol-22-rollout-status.json` |

Owner: add CI smoke + append owner-repo coordination log when merged.

## Acceptance criteria

- [x] Hub audit row **P22 core** ✅ (2026-06-12 local probe)
- [ ] CI next-work + adoption check ✅
- [ ] Append canon-os [`agent-coordination-log.md`](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/coordination/hub-narrative/agent-coordination-log.md) — sensei-ai P22 W4 **done**
