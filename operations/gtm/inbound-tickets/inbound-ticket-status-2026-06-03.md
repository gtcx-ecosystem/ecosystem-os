---
title: 'Inbound ticket status — 2026-06-03'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['coordination', 'inbound', 'status']
review_cycle: daily
---

# Inbound ticket status

**Source of truth for P0 execution:** [gtcx-infrastructure coordination bridge](https://github.com/gtcx-ecosystem/gtcx-infrastructure/tree/main/01-docs/04-ops/coordination/cross-repo-agent-bridge.md)

| Hub ticket                                                                                    | XR     | To                  | Hub priority | Status (2026-06-03) | Owner action                                                          |
| --------------------------------------------------------------------------------------------- | ------ | ------------------- | ------------ | ------------------- | --------------------------------------------------------------------- |
| [XR-201 intelligence auth](to-gtcx-infrastructure-intelligence-auth-gate-2026-06-03.md)       | XR-201 | gtcx-infrastructure | blocked-path | **done**            | `/health` exempt by design; `/policy/rules` gated. See infra runbook. |
| [XR-104 gateway TradePass](to-gtcx-infrastructure-compliance-gateway-tradepass-2026-06-03.md) | XR-104 | gtcx-infrastructure | blocked-path | **done**            | Mobile E2E **done** 2026-06-03                                        |
| [gtcx-core coord README](to-gtcx-core-coordination-readme-2026-06-03.md)                      | —      | gtcx-core           | normal       | **done**            | README landed Sprint 10                                               |
| [terra-os coord README](to-terra-os-coordination-readme-2026-06-03.md)                        | —      | terra-os            | normal       | **done**            | README landed Sprint 10                                               |
| [gtcx-markets coord README](to-gtcx-markets-coordination-readme-2026-06-03.md)                | —      | gtcx-markets        | normal       | **done**            | README landed Sprint 10                                               |
| [compliance-os P22 CI](to-compliance-os-p22-ci-2026-06-03.md)                                 | XR-511 | compliance-os       | normal       | **done**            | Sprint 8                                                              |
| [exploration-os P22 CI](to-exploration-os-p22-ci-2026-06-03.md)                               | XR-512 | exploration-os      | normal       | **done**            | Sprint 8                                                              |
| [gtcx-intelligence P22 CI](to-gtcx-intelligence-p22-ci-2026-06-03.md)                         | XR-513 | gtcx-intelligence   | normal       | **done**            | Sprint 8                                                              |
| [terminal-os P22 CI](to-terminal-os-p22-ci-2026-06-03.md)                                     | XR-514 | terminal-os         | normal       | **done**            | Sprint 8                                                              |
| [2026-06-01 infra FYI](to-gtcx-infrastructure-2026-06-01.md)                                  | —      | gtcx-infrastructure | FYI          | acknowledged        | No blocker                                                            |

## S-XR-1 closed (2026-06-03)

| Work ID | Owner             | Status   | Evidence                                                               |
| ------- | ----------------- | -------- | ---------------------------------------------------------------------- |
| XR-202  | gtcx-intelligence | **done** | `01-docs/05-audit/evidence/deployment-smoke-2026-06-03T06-42-43-281Z.json`   |
| XR-102  | gtcx-mobile       | **done** | `pnpm staging:pilot-smoke -- --e2e` exit 0                             |
| XR-203  | gtcx-protocols    | **done** | Mirror per intelligence `to-gtcx-protocols-smoke-mirror-2026-06-03.md` |

## Human gates (attestation required)

| Ticket                                                              | Gate | Status   | Packet                                                              |
| ------------------------------------------------------------------- | ---- | -------- | ------------------------------------------------------------------- |
| [INF-86 algorithm](to-human-inf-86-algorithm-signoff-2026-06-03.md) | H-01 | **open** | [H-01](../human-gates/packets/H-01-inf-86-algorithm-attestation.md) |
| [NPM publish](to-human-npm-publish-2026-06-03.md)                   | H-04 | **open** | [H-04](../human-gates/packets/H-04-npm-publish-attestation.md)      |
| [Pen-test vendor](to-human-pen-test-vendor-2026-06-03.md)           | H-05 | **sow-approved** | [H-05](../human-gates/packets/H-05-pen-test-vendor-selection.md) · witness [`fabric-os/audit/evidence/ext-inf-002-sow-approval-2026-06-10.json`](../../../../fabric-os/audit/evidence/ext-inf-002-sow-approval-2026-06-10.json) |

Full register: [`human-gate-register-2026-06-03.md`](../human-gates/human-gate-register-2026-06-03.md)

## Active downstream (S-XR-2+)

| Work ID    | Owner          | Status   | Next step                                                                                                                                                                             |
| ---------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XR-301     | gtcx-platforms | **done** | ECR + pods Running (bridge 2026-06-03)                                                                                                                                                |
| XR-302     | gtcx-platforms | **done** | Smoke `@2cef7d7` — [`r1-05-xr-302b-smoke-witness`](https://github.com/gtcx-ecosystem/gtcx-platforms/blob/main/01-docs/04-ops/coordination/r1-05-xr-302b-smoke-witness-2026-06-04.md) |
| XR-302b    | gtcx-platforms | **done** | Same witness — sovereign signed-edge smoke green                                                                                                                                      |
| XR-402–405 | ecosystem      | **done** | INF-86 chain per protocols bridge 2026-06-04                                                                                                                                          |
| XR-510     | ledger-ui      | **done** | `@gtcx/ui@0.4.1` on npm per owner bridge                                                                                                                                              |
| XR-303     | gtcx-platforms | **open** | [`@gtcx/ui` consumer ticket](https://github.com/gtcx-ecosystem/gtcx-docs/blob/main/01-docs/08-gtm/inbound-tickets/to-gtcx-platforms-xr-303-ui-consumer-2026-06-04.md) — XR-510 done |

<!-- INBOUND-PRODUCT:START -->
## Product / XR inbound (open handoffs, 2026-06-13)

**Regenerate:** `pnpm run coordination:inbound-status:generate --write` after filing or closing tickets.

| Ticket | To | Status |
| ------ | -- | ------ |
| [compliance-os P22 CI](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-compliance-os-p22-ci-2026-06-03.md) | compliance-os | **current** |
| [exploration-os P22 CI](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-exploration-os-p22-ci-2026-06-03.md) | exploration-os | **current** |
| [exploration-os XR-501-VALIDATORS-2026-06-04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-exploration-os-xr-501-validators-2026-06-04.md) | exploration-os | **done** |
| [gtcx-intelligence P22 CI](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-intelligence-p22-ci-2026-06-03.md) | gtcx-intelligence | **current** |
| [gtcx-operations P22 CI](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-operations-p22-ci-2026-06-04.md) | gtcx-operations | **open** |
| [gtcx-platforms XR-302-AGX-STAGING-2026-06-03](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-platforms-xr-302-agx-staging-2026-06-03.md) | gtcx-platforms | **current** |
| [gtcx-platforms XR-303-UI-CONSUMER-2026-06-04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-platforms-xr-303-ui-consumer-2026-06-04.md) | gtcx-platforms | **done** |
| [gtcx-protocols XR-509-MCP-PUBLISH-2026-06-12](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-protocols-xr-509-mcp-publish-2026-06-12.md) | gtcx-protocols | **done** |
| [terminal-os P22 CI](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-terminal-os-p22-ci-2026-06-03.md) | terminal-os | **current** |
<!-- INBOUND-PRODUCT:END -->

<!-- INBOUND-P25W2:START -->
## P25 W2 diligence wave (S-XR-4, 2026-06-13)

**Regenerate:** `pnpm run coordination:inbound-status:generate --write` after filing or closing tickets.

| Ticket | To | Status |
| ------ | -- | ------ |
| [502 XR-502-W2-INTAKE-2026-06-04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-compliance-os-xr-502-w2-intake-2026-06-04.md) | 502 | **done** |
| [503 XR-503-W2-WEBHOOK-2026-06-04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-compliance-os-xr-503-w2-webhook-2026-06-04.md) | 503 | **done** |
| [504 XR-504-DILIGENCE-PERSIST-2026-06-04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-compliance-os-xr-504-diligence-persist-2026-06-04.md) | 504 | **done** |

**Depends:** XR-505 terminal Postgres **done** · exploration validators (XR-501) in flight.
<!-- INBOUND-P25W2:END -->

<!-- INBOUND-ESTABLISH:START -->
## P22 established promotion wave (2026-06-13)

**Regenerate:** `pnpm run coordination:inbound-status:generate --write` after filing or closing tickets.

| Ticket | To | Status |
| ------ | -- | ------ |
| [baseline os p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-baseline-os-p22-established-promotion-2026-06-04.md) | baseline-os | **open** |
| [gtcx infrastructure p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-infrastructure-p22-established-promotion-2026-06-04.md) | gtcx-infrastructure | **done** |
| [gtcx intelligence p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-intelligence-p22-established-promotion-2026-06-04.md) | gtcx-intelligence | **open** |
| [gtcx mobile p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-mobile-p22-established-promotion-2026-06-04.md) | gtcx-mobile | **open** |
| [gtcx platforms p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-platforms-p22-established-promotion-2026-06-04.md) | gtcx-platforms | **open** |
| [gtcx protocols p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-protocols-p22-established-promotion-2026-06-04.md) | gtcx-protocols | **open** |
| [ledger ui p22 established promotion 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-ledger-ui-p22-established-promotion-2026-06-04.md) | ledger-ui | **open** |
<!-- INBOUND-ESTABLISH:END -->

<!-- INBOUND-W4:START -->
## P22 W4 inbound wave (2026-06-13)

**Regenerate:** `pnpm run coordination:inbound-status:generate --write` after filing or closing tickets.

| Ticket | To | Status |
| ------ | -- | ------ |
| [griot ai p22 w4 rollout 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-griot-ai-p22-w4-rollout-2026-06-04.md) | griot-ai | **done** |
| [gtcx hardware p22 w4 rollout 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-hardware-p22-w4-rollout-2026-06-04.md) | gtcx-hardware | **done** |
| [nyota ai p22 w4 rollout 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-nyota-ai-p22-w4-rollout-2026-06-04.md) | nyota-ai | **done** |
| [sensei ai p22 w4 rollout 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-sensei-ai-p22-w4-rollout-2026-06-04.md) | sensei-ai | **open** |
| [terra os p22 w4 rollout 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-terra-os-p22-w4-rollout-2026-06-04.md) | terra-os | **done** |
| [veritas ai p22 w4 rollout 2026 06 04](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-veritas-ai-p22-w4-rollout-2026-06-04.md) | veritas-ai | **done** |

**Follow-up (P22 core ✅, CI ⬜):** gtcx-operations — [P22 CI ticket](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/gtm/inbound-tickets/to-gtcx-operations-p22-ci-2026-06-04.md) per [P22 CI playbook](https://github.com/gtcx-ecosystem/canon-os/blob/main/ops/coordination/hub-narrative/p22-ci-rollout-playbook.md).
<!-- INBOUND-W4:END -->

## Probe reconciliation (XR-201)

Protocols `probe-staging-cross-repo` may still show `/health` → 200 **without** auth. Infra documents this as **by design** (ALB/K8s probes). Acceptance for XR-201 is auth on **non-exempt** paths (e.g. `/policy/rules` 401 → 200 with key).

<!-- INBOUND-P25W2:START -->
## P25 W2 diligence wave (S-XR-4, 2026-06-04)

**Regenerate:** `pnpm run coordination:inbound-status:generate --write` after filing or closing tickets.

| Ticket | To | Status |
| ------ | -- | ------ |
| [502 xr-502-w2-intake-2026-06-04](https://github.com/gtcx-ecosystem/gtcx-docs/blob/main/01-docs/08-gtm/inbound-tickets/to-compliance-os-xr-502-w2-intake-2026-06-04.md) | 502 | **open** |
| [503 xr-503-w2-webhook-2026-06-04](https://github.com/gtcx-ecosystem/gtcx-docs/blob/main/01-docs/08-gtm/inbound-tickets/to-compliance-os-xr-503-w2-webhook-2026-06-04.md) | 503 | **open** |
| [504 xr-504-diligence-persist-2026-06-04](https://github.com/gtcx-ecosystem/gtcx-docs/blob/main/01-docs/08-gtm/inbound-tickets/to-compliance-os-xr-504-diligence-persist-2026-06-04.md) | 504 | **open** |

**Depends:** XR-505 terminal Postgres **done** · exploration validators (XR-501) in flight.
<!-- INBOUND-P25W2:END -->
