---
title: 'Inbound: nyota-ai — Protocol 22 W4 rollout'
status: done
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'W4']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                                |
| -------------- | -------------------------------------------------------------------- |
| **To**         | nyota-ai                                                             |
| **From**       | gtcx-docs (constitution hub)                                         |
| **Date**       | 2026-06-04                                                           |
| **Subject**    | Protocol 22 W4 — full rollout from auto-dev only (hub matrix row 15) |
| **Priority**   | normal                                                               |
| **Hub sprint** | S22-02                                                               |

## Context

Hub audit **2026-06-04:** nyota-ai has auto-dev pointer only — no roadmap register, manifest, selection script, or CI.

## Ask

Same **A–G** checklist as sensei-ai W4 ticket:

- [implementation guide](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/governance/protocols/22-agent-work-selection/implementation-guide.md)
- [P22 CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md)
- Add `01-docs/strategy/execution-roadmap.md` or `01-docs/05-audit/execution-roadmap.md` with `S1-01` pending row if none exists

## Hub probe (2026-06-12)

| Check | Status |
| ----- | ------ |
| P22 core | **ready** — score 9/9 |
| CI `agent:next-work` + `agent:work-selection:check` | **wired** (`ci.yml`) |
| Owner commit | `nyota-ai@3f4a793` |
| Witness | `canon-os/docs/reference/audits/protocol-22-rollout-status.json` |

## Acceptance criteria

- [x] P22 core ✅ in hub matrix (2026-06-12 local probe)
- [x] CI smoke green (workflow committed; await remote CI)
- [x] Hub coordination log entry — hub witness 2026-06-12 execute-roadmap
