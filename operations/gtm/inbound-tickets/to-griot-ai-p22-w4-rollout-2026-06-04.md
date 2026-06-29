---
title: 'Inbound: griot-ai — Protocol 22 W4 rollout'
status: done
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'W4']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                             |
| -------------- | ------------------------------------------------- |
| **To**         | griot-ai                                          |
| **From**       | gtcx-docs (constitution hub)                      |
| **Date**       | 2026-06-04                                        |
| **Subject**    | Protocol 22 W4 — full rollout (hub matrix row 19) |
| **Priority**   | normal                                            |
| **Hub sprint** | S22-02                                            |

## Context

griot-ai has auto-dev only — same gap profile as nyota-ai (hub audit 2026-06-04).

## Ask

Implement P22 checklist **A–G** — reference [exploration-os](https://github.com/gtcx-ecosystem/exploration-os) for established manifest pattern.

## Hub probe (2026-06-12)

| Check | Status |
| ----- | ------ |
| P22 core | **ready** — score 9/9 |
| CI `agent:next-work` + `agent:work-selection:check` | **wired** (`ci.yml`) |
| Owner commit | `griot-ai@851dced` |
| Witness | `canon-os/docs/reference/audits/protocol-22-rollout-status.json` |

## Acceptance criteria

- [x] P22 core + CI ✅ in hub audit (2026-06-12 local probe)
- [x] Hub coordination log append — hub witness 2026-06-12 execute-roadmap
