---
title: 'Inbound: gtcx-infrastructure — intelligence auth gate (XR-201)'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['inbound', 'coordination', 'staging', 'P0']
review_cycle: on-change
---
> **Archive note (2026-06-30):** `gtcx-infrastructure` is archived. Its live
> successor is `fabric-os`. New work or reopens should route to `fabric-os`, not
> the archived repo.


# Inbound ticket

| Field        | Value                                                                                   |
| ------------ | --------------------------------------------------------------------------------------- |
| **To**       | gtcx-infrastructure                                                                     |
| **From**     | gtcx-docs (constitution hub)                                                            |
| **Date**     | 2026-06-03                                                                              |
| **Subject**  | Intelligence-staging auth gate — unauthenticated `/health` must not return 200 (XR-201) |
| **Priority** | blocked-path                                                                            |

## Context

S-XR-1 probe (gtcx-protocols `probe-staging-cross-repo.mjs`, 2026-06-03): `intelligence-staging` `/health` returns **200** without credentials. Expected **401/403** when auth gate is live. Baseline-os blocker report filed: `gtcx-protocols-1780465457208`.

## Ask

1. Deploy full intelligence SDK manifest per infra runbook (not placeholder).
2. Enforce auth on `/health` (and document probe contract for siblings).
3. Post outbound-ack when probe shows non-200 without auth.

## Acceptance criteria

- [ ] `pnpm staging:probe-cross-repo` (protocols) — `intelligence.health` unauthenticated → 401/403
- [ ] gtcx-intelligence unblocked for INT-S3-08 / XR-202
- [ ] Hub log: XR-201 **done**

## Evidence / contracts

- Runbook: `gtcx-infrastructure/01-docs/04-ops/staging-intelligence-eso-bootstrap.md`
- Protocols template: `gtcx-protocols/01-docs/04-ops/coordination/baseline-os-blocker-report-xr-201.md`
- Hub workplan: `01-docs/06-coordination/cross-repo-sprint-workplan-2026-06.md`

## References

- Intelligence inbound: `baseline-os/workstream/coordination/inbound/from-gtcx-intelligence-2026-06-02-int-s3-08-auth-gate.md`
- Do **not** paste SM values or harness YAML here.
