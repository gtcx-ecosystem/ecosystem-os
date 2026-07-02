---
title: 'Agile roadmap — ecosystem-os'
status: current
date: 2026-06-15
owner: ecosystem-os
document_type: protocol
tier: operating
tags: ['agile', 'roadmap', 'documentation']
review_cycle: on-change
---

# Agile roadmap — ecosystem-os

Fleet sprint authority for product work stays in owner repos. `ecosystem-os` runs a hub sprint aligned with the fleet cadence managed by [`agile-os`](../../../agile-os/).

## Active sprint

- **SPR-2026-06** · Status: in_progress · Goals:
  - P35 strict GREEN
  - ops:check exit 0
  - PM folder R1 complete

See [`pm/roadmap/sprints/active.json`](../../pm/roadmap/sprints/active.json).

## Backlog

See [`pm/backlog.json`](../../pm/backlog.json).

## Ceremonies

| Ceremony | Cadence | SoR |
| -------- | ------- | --- |
| Sprint planning | Bi-weekly | `pm/roadmap/sprints/active.json` |
| Stand-up | Daily (async) | `workstream/sprints/current.md` |
| Retrospective | End of sprint | `pm/retrospectives/` |
| ops:check gate | Every commit | `platform/scripts/ops-check.mjs` |

## Work selection

Run `pnpm agent:next-work` — delegates to [`bridge-os`](../../../bridge-os/) per Protocol 22. Do not ask the operator to choose among backlog items when P22 returns a story.

## Authority

- **Class R** commit/push when gates green.
- **Class A** for normative signoffs and production secrets.
- **Class S** for operator stop.
