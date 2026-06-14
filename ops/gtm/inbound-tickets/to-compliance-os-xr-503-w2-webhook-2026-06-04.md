---
title: 'Inbound: compliance-os — XR-503 W2 review webhook'
status: done
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'coordination', 'XR-503', 'P25', 'W2']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                       |
| ------------ | ------------------------------------------- |
| **To**       | compliance-os                               |
| **From**     | gtcx-docs                                   |
| **Date**     | 2026-06-04                                  |
| **Subject**  | XR-503 — W2 review webhook (depends XR-505) |
| **Priority** | normal                                      |
| **Work ID**  | XR-503                                      |

## Context

XR-505 terminal workflow store **done**. XR-503 **ready** — webhook wires diligence review events.

## Ask

1. Ship review webhook handler + persistence hook to XR-504 path.
2. Verify against terminal-os Postgres store contract.

## Acceptance

- [ ] Webhook tested end-to-end with terminal fixture or staging
- [ ] Hub XR-503 **done** with evidence

## References

- Hub workplan XR-503 (blocks: pipeline)
