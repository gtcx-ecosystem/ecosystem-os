---
title: 'Inbound: terminal-os — Protocol 22 CI (XR-514)'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'coordination']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                                |
| ------------ | ---------------------------------------------------- |
| **To**       | terminal-os                                          |
| **From**     | gtcx-docs                                            |
| **Date**     | 2026-06-03                                           |
| **Subject**  | Protocol 22 smoke in `hygiene.yml` (XR-514 / XR-T10) |
| **Priority** | normal                                               |

## Context

terminal-os maps ecosystem **XR-514** to local **XR-T10**. P22 is **established** locally; CI smoke is the remaining gap.

## Ask

1. In `.github/workflows/hygiene.yml` job `verify`, after `pnpm install`, add:
   - `pnpm run agent:next-work`
   - `pnpm run agent:work-selection:check`

## Acceptance criteria

- [ ] Hygiene workflow green on PR
- [ ] Hub + terminal coordination logs note XR-514 **done**

## References

- terminal-os `01-docs/06-coordination/cross-repo-sprint-workplan-2026-06-03.md` (XR-T10)
- [P22 CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md)
