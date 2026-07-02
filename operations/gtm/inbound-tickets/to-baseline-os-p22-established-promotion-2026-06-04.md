---
title: 'Inbound: baseline-os — P22 established promotion'
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
| **To**         | baseline-os                                                             |
| **From**       | gtcx-docs                                                               |
| **Date**       | 2026-06-04                                                              |
| **Subject**    | Promote `adoption_status: established` in agent-work-selection manifest |
| **Priority**   | normal                                                                  |
| **Hub sprint** | S24-04                                                                  |

## Context

P22 **core ready**; manifest lacks `adoption_status: established`. Hub gap list: [`p22-adoption-established-gap-2026-06-04.md`](https://github.com/gtcx-ecosystem/gtcx-docs/blob/main/01-docs/audits/p22-adoption-established-gap-2026-06-04.md).

## Ask

1. Set `adoption_status: established` in `01-docs/04-ops/agent-work-selection.md` frontmatter after one review of Protocol 22 wiring.
2. Confirm `pnpm run agent:next-work` and `agent:work-selection:check` pass locally.

## Acceptance

- [ ] Manifest frontmatter updated
- [ ] Hub P22 audit regen shows `established` for baseline-os
