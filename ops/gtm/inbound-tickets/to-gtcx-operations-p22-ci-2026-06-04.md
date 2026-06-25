---
title: 'Inbound: gtcx-operations — Protocol 22 CI smoke'
status: open
date: 2026-06-04
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'CI']
review_cycle: on-change
---

# Inbound ticket

| Field          | Value                                                         |
| -------------- | ------------------------------------------------------------- |
| **To**         | gtcx-operations                                               |
| **From**       | gtcx-docs (constitution hub)                                  |
| **Date**       | 2026-06-04                                                    |
| **Subject**    | Add Protocol 22 CI smoke (`agent:next-work` + adoption check) |
| **Priority**   | normal                                                        |
| **Hub sprint** | S24-03                                                        |

## Context

Hub audit **2026-06-04:** gtcx-operations is **P22 core ready** with `adoption_status: established`, but **CI does not run** `agent:next-work` or `agent:work-selection:check`.

## Ask

1. In `.github/workflows/ci.yml` (or equivalent PR workflow), after install:
   - `pnpm run agent:next-work`
   - `pnpm run agent:work-selection:check`
2. Follow [P22 CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md).

## Acceptance criteria

- [ ] Both steps run on PR and push to `main`
- [ ] Local checks still pass
- [ ] Hub inbound status row marked **done** after merge

## References

- Reference CI: [gtcx-docs ci.yml](https://github.com/gtcx-ecosystem/gtcx-docs/blob/main/.github/workflows/ci.yml)
- Reference impl: [exploration-os manifest](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/main/01-docs/04-ops/agent-work-selection.md)
