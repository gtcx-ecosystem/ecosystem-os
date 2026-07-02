---
title: 'Inbound — gtcx-platforms XR-302 AGX staging rollout'
status: current
date: 2026-06-03
owner: gtcx-docs
---

# Inbound ticket

| Field                   | Value                                |
| ----------------------- | ------------------------------------ |
| **To**                  | gtcx-platforms                       |
| **From**                | gtcx-docs                            |
| **Owner repo**          | gtcx-platforms                       |
| **Implementation repo** | gtcx-platforms                       |
| **Hub only?**           | no                                   |
| **Work ID**             | XR-302                               |
| **Date**                | 2026-06-03                           |
| **Subject**             | AGX staging image + rollout (S-XR-2) |
| **Priority**            | blocked-path                         |

## Context

XR-301 sovereign staging image is done. XR-302 AGX staging rollout remains on the S-XR-2 critical path per hub workplan.

## Acceptance

- Image published to ECR and rolled out to staging
- In-cluster `/api/health` 200; evidence path recorded in owner repo or protocols bridge

## Evidence

Link owner commit/PR in hub `agent-coordination-log.md` when complete.
