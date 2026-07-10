---
title: 'zenhub — board hygiene'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: protocol
tier: operating
tags: ['documentation', 'agile']
review_cycle: on-change
---

# Zenhub — ecosystem-os

Board hygiene and label contract for workspace **GTCX**.

## Bindings

| Artifact | Path |
| -------- | ---- |
| Fleet standard | [`../agile-os/pm/spec/pm-zenhub-standard.json`](../agile-os/pm/spec/pm-zenhub-standard.json) |
| Fleet plan SoR | [`../agile-os/pm/zenhub-plan.json`](../agile-os/pm/zenhub-plan.json) |
| Label registry | [`../bridge-os/config/zenhub-ecosystem-registry.json`](../bridge-os/config/zenhub-ecosystem-registry.json) |
| Workspace | **GTCX** |
| Repo plan | (none — inherit fleet plan) |

## Label contract

| Level | ZenHub type | Default pipeline |
| ----- | ----------- | ---------------- |
| Goal | Initiative | Icebox |
| Initiative | Project | Product Backlog |
| Epic | Epic | Product Backlog |
| Story / Task | Issue | Sprint Backlog |

## Story fields (per fleet standard)

Required on every story in `machine/backlog.json`: `id`, `title`, `owner`, `priority`, `type`, `status`, `acceptance`.

Recommended: `parentId`, `gtcxLevel`, `zenhubIssueNumber`.

Status enum: `open` · `in_progress` · `done` · `blocked` · `cancelled`.

Pipelines: Sprint Backlog · Product Backlog · Review/QA · Icebox · Done · In Progress · New Issues.

## Hygiene rules

- Every sprint item has **estimate**, **owner repo**, and **pipeline** set.
- Cross-repo blockers use `dependsOn` — witness in agile-os plan rollup.
- No orphan issues: every open issue maps to an epic or initiative.
- Close issues only with witness link (PR, audit path, or ops evidence).

## Commands

```bash
pnpm ecosystem:zenhub:plan    # dry-run plan (from agile-os / bridge-os)
pnpm ecosystem:zenhub:apply   # apply when green
```
