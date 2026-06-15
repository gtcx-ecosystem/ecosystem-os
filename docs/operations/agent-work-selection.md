---
title: 'Agent Work Selection Manifest'
status: current
date: 2026-06-15
owner: ecosystem-os
tier: standard
tags: [[protocol-22, protocol-26, protocol-27, protocol-28, agents]]
review_cycle: on-change
document_type: runbook
role: protocol-engineer
document_id: OPS-AWS-001
protocol: canon-os/docs/governance/protocols/22-agent-work-selection/protocol.md
---

# Agent Work Selection — ecosystem-os

Protocol 22 is **delegated** to **bridge-os** program office. Agents compute the next work unit from fleet backlog state. **Never ask the operator to choose** among backlog items when `pnpm agent:next-work` returns a story.

## Protocols in force

Protocol 22 (work selection), Protocol 24 (cross-repo coordination), Protocol 26 (Proceed Brief), Protocol 27 (execution obligation), and Protocol 28 (authority classification) are active.

| Protocol | Topic | Gate |
| -------- | ----- | ---- |
| **22** | Work selection | `pnpm agent:next-work` (bridge-os) |
| **24** | Cross-repo coordination | `docs/operations/cross-repo-coordination.md` |
| **26** | Proceed Brief + Status Update | bridge-os `.cursor/rules/protocol-26-*` |
| **27** | Agent execution | bridge-os `.cursor/rules/protocol-27-*` |
| **28** | Authority class R/A/S | bridge-os `.cursor/rules/protocol-28-*` |

## Required behavior

1. Read this manifest during startup.
2. Run `pnpm agent:next-work` (delegates to bridge-os).
3. Honor explicit story ID overrides from the operator for that session only.
4. Implement owner-repo work in **this** repo when P22 names `ecosystem-os`.
5. Do not ask the operator to choose between backlog items.

## Canonical paths

| Purpose | Path |
| ------- | ---- |
| Work-selection manifest | `docs/operations/agent-work-selection.md` |
| Selection delegate | `platform/scripts/agent/agent-next-work.mjs` |
| Auto-dev state | `pm/auto-dev-state.md` |
| Roadmap initiatives | `pm/roadmap/initiatives.json` |
| Publish register | `pm/publish-register.json` |

## Commands

```bash
pnpm agent:next-work
pnpm agent:work-selection:check
pnpm ops:check
```
