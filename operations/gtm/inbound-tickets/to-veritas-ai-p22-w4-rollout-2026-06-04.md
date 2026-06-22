---
title: 'Inbound: veritas-ai — Protocol 22 W4 rollout'
status: done
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'W4']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                          |
| -------------- | -------------------------------------------------------------- |
| **To**         | veritas-ai                                                     |
| **From**       | gtcx-docs (constitution hub)                                   |
| **Date**       | 2026-06-04                                                     |
| **Subject**    | Protocol 22 W4 — verification lane rollout (hub matrix row 22) |
| **Priority**   | normal                                                         |
| **Hub sprint** | S22-02                                                         |

## Context

veritas-ai has `AGENTS.md` only — no roadmap, manifest, selection script, auto-dev, or CI.

## Ask

Full P22 W4 rollout (sections **A–G**). Compliance-adjacent repo — prefer `adoption_status: pilot` until roadmap stories exist.

## Hub probe (2026-06-12)

| Check | Status |
| ----- | ------ |
| P22 core | **ready** — score 9/9 |
| CI `agent:next-work` + `agent:work-selection:check` | **wired** (`ci.yml`) |
| Owner commit | `veritas-ai@6ebb56d` |
| Witness | `canon-os/docs/reference/audits/protocol-22-rollout-status.json` |

## Acceptance criteria

- [x] P22 core ✅ (2026-06-12 local probe)
- [x] CI adoption check in workflow
- [x] Hub log entry — hub witness 2026-06-12 execute-roadmap
