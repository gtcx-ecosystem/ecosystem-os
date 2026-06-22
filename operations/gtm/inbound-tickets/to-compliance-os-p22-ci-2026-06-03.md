---
title: 'Inbound: compliance-os — Protocol 22 CI (XR-511)'
status: current
date: 2026-06-03
owner: gtcx-docs
tier: operating
tags: ['inbound', 'protocol-22', 'coordination']
review_cycle: on-change
---

# Inbound ticket

| Field        | Value                                                 |
| ------------ | ----------------------------------------------------- |
| **To**       | compliance-os                                         |
| **From**     | gtcx-docs (constitution hub)                          |
| **Date**     | 2026-06-03                                            |
| **Subject**  | Add Protocol 22 CI smoke to `agent-sync` job (XR-511) |
| **Priority** | normal                                                |

## Context

P22 core is ready and `agent:work-selection:check` passes locally. Only **gtcx-docs** has CI adoption today. S-XR-5 targets four W2 repos for agent ergonomics in CI.

## Ask

1. In `.github/workflows/ci.yml` job `agent-sync`, add `pnpm/action-setup`, `pnpm install --frozen-lockfile`, then:
   - `pnpm run agent:next-work`
   - `pnpm run agent:work-selection:check`
2. Follow [P22 CI playbook](https://github.com/gtcx-ecosystem/gtcx-docs/tree/main/01-docs/06-coordination/p22-ci-rollout-playbook.md).

## Acceptance criteria

- [ ] Both steps run on PR and push to `main`
- [ ] Local `pnpm run agent:work-selection:check` still passes
- [ ] Hub log entry `XR-511` **done** after merge

## References

- Hub workplan: `01-docs/06-coordination/cross-repo-sprint-workplan-2026-06.md` (XR-511)
- Reference impl: exploration-os `01-docs/04-ops/agent-work-selection.md`
