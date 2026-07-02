---
title: 'Inbound: terra-os — Protocol 22 W4 rollout'
status: done
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'W4']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                   |
| -------------- | ------------------------------------------------------- |
| **To**         | terra-os                                                |
| **From**       | gtcx-docs (constitution hub)                            |
| **Date**       | 2026-06-04                                              |
| **Subject**    | Protocol 22 W4 — close P22 core gap (hub matrix row 17) |
| **Priority**   | normal                                                  |
| **Hub sprint** | S22-02                                                  |

## Context

terra-os has coordination README inbound ([2026-06-03 stub](to-terra-os-coordination-readme-2026-06-03.md)) and execution roadmap — still missing manifest, `agent:next-work`, `AGENTS.md` Protocol 22 section, and CI.

XR-506 (live permit adapters) remains **deferred**; this ticket is **agent ergonomics only**.

## Ask

1. Complete P22 checklist **A–G** (see [sensei-ai W4 ticket](./to-sensei-ai-p22-w4-rollout-2026-06-04.md) for full list)
2. Ensure coordination README landed (Grade **C** in hub inventory)

## Hub probe (2026-06-12)

| Check | Status |
| ----- | ------ |
| P22 core | **ready** — score 9/9 |
| CI `agent:next-work` + `agent:work-selection:check` | **wired** (`ci.yml`) |
| Owner commit | `terra-os@4f623018` |
| Witness | `canon-os/docs/reference/audits/protocol-22-rollout-status.json` |

## Acceptance criteria

- [x] P22 core ✅ · CI adoption ✅ (2026-06-12 local probe)
- [x] Hub log + inventory grade update — hub witness 2026-06-12 execute-roadmap
