---
title: 'Inbound: gtcx-protocols — P22 established promotion'
status: open
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'adoption']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| **To**         | gtcx-protocols                                                          |
| **From**       | gtcx-docs                                                               |
| **Date**       | 2026-06-04                                                              |
| **Subject**    | Promote `adoption_status: established` (reference impl adjacent)          |
| **Priority**   | normal                                                                  |
| **Hub sprint** | S24-04                                                                  |

## Context

P22 core + CI green; manifest not `established`. See hub gap list.

## Ask

Set `adoption_status: established` in `01-docs/04-ops/agent-work-selection.md` after confirming Protocol 22 is the canonical selection path for protocol engineers.

## Acceptance

- [ ] Manifest promoted
- [ ] CI smoke unchanged (green)
