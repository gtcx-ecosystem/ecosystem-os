---
title: 'Inbound: compliance-os — XR-502 M2M W2 intake'
status: done
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'coordination', 'XR-502', 'P25', 'W2']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                           |
| ------------ | ----------------------------------------------- |
| **To**       | compliance-os                                   |
| **From**     | gtcx-docs                                       |
| **Date**     | 2026-06-04                                      |
| **Subject**  | XR-502 — M2M W2 intake (S-XR-4 / P25 diligence) |
| **Priority** | normal                                          |
| **Work ID**  | XR-502                                          |

## Context

S-XR-4 **ready** in hub workplan. XR-505 (terminal Postgres) **done**. Hub filed W2 wave per P25 licence pipeline.

## Ask

1. Implement M2M W2 intake path per exploration → compliance handoff.
2. Coordinate infra secret for export path when required.
3. Log **done** in owner repo + hub coordination log.

## Acceptance

- [ ] Intake path demonstrable (staging or fixture)
- [ ] Hub XR-502 → **done** with evidence path

## References

- Prior tickets: [`to-compliance-terminal-w2-*`](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/08-gtm/inbound-tickets) (theme)
- Workplan: XR-502–504 block
