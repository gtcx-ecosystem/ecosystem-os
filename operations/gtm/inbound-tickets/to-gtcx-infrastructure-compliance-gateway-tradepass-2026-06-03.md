---
title: 'Inbound: gtcx-infrastructure — compliance-gateway TradePass auth (XR-104)'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['inbound', 'coordination', 'staging', 'P0']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| **To**       | gtcx-infrastructure                                                            |
| **From**     | gtcx-docs (hub) + gtcx-mobile (outbound)                                       |
| **Date**     | 2026-06-03                                                                     |
| **Subject**  | compliance-gateway Bearer to TradePass + audit signing secret rollout (XR-104) |
| **Priority** | blocked-path                                                                   |

## Context

gtcx-mobile **MOBILE-AUDIT-02** portal E2E is **green** (2026-06-03). Signed `/audit/bundles` ingest fails with `envelope-did-resolve-http-401` until gateway forwards Bearer to protocols staging TradePass API.

## Ask

1. Wire compliance-gateway staging to send Bearer on TradePass resolve (protocols API key on gateway).
2. Fix/deploy audit signing secret alignment for signed ingest path.
3. Confirm mobile can run `pnpm staging:pilot-smoke -- --e2e` without local keygen.

## Acceptance criteria

- [ ] Mobile `staging:pilot-smoke -- --e2e` passes with SM-seeded credentials (no new keygen)
- [ ] MOBILE-AUDIT-01 marked done in mobile manifest
- [ ] Hub log: XR-104 **done**, XR-102 **done**

## References

- Mobile outbound: `gtcx-mobile/01-docs/04-ops/coordination/to-gtcx-infrastructure-compliance-gateway-tradepass-auth-2026-06-03.md`
- Protocols bridge: XR-104 assessment in `gtcx-protocols/01-docs/04-ops/coordination/cross-repo-sprint-workplan-2026-06.md`
