---
title: 'Inbound: exploration-os — Protocol 22 CI (XR-512)'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'coordination']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                 |
| ------------ | ------------------------------------- |
| **To**       | exploration-os                        |
| **From**     | gtcx-docs                             |
| **Date**     | 2026-06-03                            |
| **Subject**  | Repo-root Protocol 22 CI job (XR-512) |
| **Priority** | normal                                |

## Context

Root `package.json` exposes `agent:next-work` and `agent:work-selection:check` (Node scripts, no mobile-v2 install required). Mobile CI paths do not cover repo-root agent wiring.

## Ask

1. Add job `protocol-22-smoke` to `.github/workflows/ci.yml` at repo root (not `mobile-v2` working directory).
2. Run `npm run agent:work-selection:check` then `npm run agent:next-work` with Node 20.
3. Trigger on `01-docs/**`, `03-platform/scripts/**`, `package.json`, `AGENTS.md` path filters (extend existing CI `paths` or standalone workflow).

## Acceptance criteria

- [ ] Job passes on PR
- [ ] Hub audit marks `ciNextWork` + `ciAdoptionCheck` for exploration-os

## References

- [P22 CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md)
