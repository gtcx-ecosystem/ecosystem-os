---
title: 'QA / UAT — ecosystem-os'
status: current
date: 2026-06-24
owner: ecosystem-os
tier: standard
tags: ['documentation', 'qa', 'uat']
review_cycle: on-change
document_type: protocol
---

# QA / UAT — ecosystem-os

Fleet documentation repo — acceptance is gate-driven, not runtime UI.

## QA gates (pre-UAT)

| Gate | Command | Expect |
| ---- | ------- | ------ |
| Ops health | `pnpm ops:check` | exit 0 |
| Product compile | `pnpm product:compile:check` | pass |
| GTM readiness | `pnpm gtm:readiness:check` | composite ≥ 80 |
| Docs IA | `pnpm docs:ia:check` | exit 0 |
| Agency module | `pnpm agency:check` | exit 0 |
| Agile ceremony | `pnpm agile:check` | exit 0 |
| Publish register | `pnpm publish:register:check` | exit 0 |
| Agent protocols | `pnpm agent:work-selection:check` | exit 0 |

## UAT scenarios (documentation home)

| ID | Scenario | Pass criteria |
| -- | -------- | ------------- |
| UAT-ECO-01 | Operator finds fleet GTM index | `ops/gtm/fleet-catalog-index.md` current |
| UAT-ECO-02 | Publish register resolves | all live/synced paths exist on disk |
| UAT-ECO-03 | P22 queue compiled | `machine/backlog.json` has open stories with planRef |
| UAT-ECO-04 | Institutional narrative | regulator playbook + govern chapter reachable from GitBook SUMMARY |

## Evidence

Log results in [`../uat/uat-evidence-log.md`](../uat/uat-evidence-log.md) at sprint close.
