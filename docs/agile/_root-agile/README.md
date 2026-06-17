---
title: 'agile/ — local scrum workspace'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: overview
tier: operating
tags: ['documentation', 'agile']
review_cycle: on-change
---

# `docs/roadmap/agile/` — ecosystem-os

> **Pack:** [`../../canon-os/pm/spec/docs-agile-pack.json`](../../canon-os/pm/spec/docs-agile-pack.json)  
> **Reference impl:** [`../agile-os/docs/roadmap/agile/`](../agile-os/docs/roadmap/agile/) (agile-os — fleet template)  
> **Fleet backlog:** [`../agile-os/pm/ecosystem-sprint-backlog.json`](../agile-os/pm/ecosystem-sprint-backlog.json)  
> **Parent roadmap:** [`../README.md`](../README.md) · **Machine PM:** [`../../pm/`](../../pm/) · **Binding:** [`../../ops/pm/manifest.json`](../../ops/pm/manifest.json)

## Lanes

| Folder | Role |
| ------ | ---- |
| `scrum/` | Ceremony artifacts — backlog, DoD, DoR, planning, standup, retro, story template |
| `sprints/` | Active sprint (`current.md`) + sealed history |
| `uat/` | UAT test plan + evidence log |
| `archive/` | Sealed sprint snapshots |

## Sync

Refresh local machine slice: `pnpm pm:sync` → `ops/pm/backlog.json`

## Ceremony surface

| File | Purpose |
| ---- | ------- |
| `intake.md` | Inbound work, handoffs, backlog intake |
| `planning.md` | Sprint planning, prioritization rubric |
| `qa-uat.md` | QA gates + UAT plan and evidence |
| `zenhub.md` | Board hygiene, label contract |

> **11-pillar scorecard:** [`pillar-scorecard.md`](./pillar-scorecard.md)

> **Fleet CPO:** [`cpo.md`](./cpo.md) · agile-os tactical CPO
