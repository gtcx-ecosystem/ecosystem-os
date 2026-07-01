---
title: 'Inbound: gtcx-intelligence — Protocol 22 CI (XR-513)'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'coordination']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                       |
| ------------ | ------------------------------------------- |
| **To**       | gtcx-intelligence                           |
| **From**     | gtcx-docs                                   |
| **Date**     | 2026-06-03                                  |
| **Subject**  | Protocol 22 smoke in main `ci` job (XR-513) |
| **Priority** | normal                                      |

## Context

INT-S3-08 remains blocked on infra XR-201, but P22 CI adoption is independent and unblocks agent sessions without human story picking.

## Ask

1. After `pnpm install` in `.github/workflows/ci.yml` job `ci`, add:
   - `pnpm agent:next-work`
   - `pnpm agent:work-selection:check`
2. Scripts already exist in `package.json`.

## Acceptance criteria

- [ ] Steps run on PR + main
- [ ] `pnpm agent:work-selection:check` passes locally before merge

## References

- [P22 CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md)
