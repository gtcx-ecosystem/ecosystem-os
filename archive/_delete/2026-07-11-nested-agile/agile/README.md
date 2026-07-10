---
title: 'agile — the delivery system'
status: current
date: 2026-06-22
owner: ecosystem-os
document_type: overview
tier: operating
tags: ['delivery', 'agile', 'zenhub']
review_cycle: on-change
---

# agile — the delivery system

> How work moves from authored plan → compiled backlog → ceremony → ZenHub board.
> One pipeline, four planes, no orphan work.

## The pipeline (end to end)

```
docs/product/roadmap/        machine/backlog.json        agile/ (here)            ZenHub board
  initiatives/  ──compile──▶  stories[] (P22 queue) ──▶  intake → planning →  ──sync──▶  Sprint Backlog
  features/     product:      backlogClear flag          sprints → qa-uat →            (per zenhub.md
  stories/      compile                                   ship                          label contract)
  (AUTHOR)                    (COMPILE — never edit)      (CEREMONY)                    (BOARD)
```

| Plane | Home | Role |
| ----- | ---- | ---- |
| **Author** | `docs/product/roadmap/{initiatives,features,stories}/` | The plan — written by humans/agents |
| **Compile** | `machine/backlog.json` (`pnpm product:compile`) | Machine queue P22 reads — never hand-edited |
| **Ceremony** | `agile/` (this folder) | How we run the work — process, not state |
| **Board** | ZenHub (synced by `../agile-os` → `zenhub-sync`) | The shared board, mirrors compiled backlog |

## Work hierarchy → ZenHub

| Level | Authored in | ZenHub type | Default pipeline |
| ----- | ----------- | ----------- | ---------------- |
| Goal | `docs/foundation/` | Initiative | Icebox |
| Initiative | `roadmap/initiatives/` | Project | Product Backlog |
| Epic / Feature | `roadmap/features/` | Epic | Product Backlog |
| Story / Task | `roadmap/stories/` | Issue | Sprint Backlog |

Full contract: [`zenhub.md`](./zenhub.md). Fleet standard: [`../agile-os/pm/spec/pm-zenhub-standard.json`](../agile-os/pm/spec/pm-zenhub-standard.json) · Label registry: [`../bridge-os/config/zenhub-ecosystem-registry.json`](../bridge-os/config/zenhub-ecosystem-registry.json).

## Ceremony surface (this folder)

| Stage | File / folder | Purpose |
| ----- | ------------- | ------- |
| Intake | [`intake.md`](./intake.md) | Inbound work, handoffs, backlog intake |
| Plan | [`planning.md`](./planning.md) · [`roadmaps/`](./roadmaps/) | Sprint planning, prioritization rubric, lane narratives |
| Sprint | [`sprints/current.md`](./sprints/current.md) · [`scrum/`](./scrum/) | Active sprint + DoR/DoD/standup/retro |
| Verify | [`qa-uat.md`](./qa-uat.md) · [`uat/`](./uat/) · [`requirements/`](./requirements/) | QA gates, UAT plan + evidence, FR trace |
| Govern | [`cpo.md`](./cpo.md) · [`scorecard.md`](./scorecard.md) | Authority, agile rollup, 11-pillar score |

## Rules

- **Author in `docs/product/roadmap/`, never in `machine/backlog.json`** — that's compiled output.
- **Every sprint item** has estimate, owner repo, pipeline set (ZenHub hygiene).
- **No orphan work** — every story maps to an epic/initiative; every issue closes with a witness (PR, audit path, ops evidence).
- **Ceremony ≠ state** — `agile/` holds process; live sprint state is `machine/roadmap/sprints/`.

> Spec: [`../../canon-os/machine/spec/repo-provisioning/L1-agile.json`](../../canon-os/machine/spec/repo-provisioning/L1-agile.json) · Reference impl: [`../agile-os/`](../agile-os/)
