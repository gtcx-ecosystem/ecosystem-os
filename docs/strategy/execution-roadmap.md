---
title: 'Execution roadmap — ecosystem-os'
status: current
date: 2026-06-15
owner: ecosystem-os
tier: operating
tags: ['protocol', 'documentation', 'roadmap']
review_cycle: on-change
document_type: protocol
goals: 'Fleet documentation home — execution roadmap'
---

# Execution roadmap — ecosystem-os

> SoR: [`pm/execution-roadmap.md`](../pm/execution-roadmap.md) · reconcile via [`pm/roadmap/initiatives.json`](../roadmap/initiatives.json) · program office: [`bridge-os`](../../AGENTS.md).

## Active milestone

- **[ECO-DOC-001](../spec/product-goals.json)** — *Fleet GitBook publish register operational*  
  Target: **2026-Q3** · Program: `PROG-FLEET-DOCUMENTATION` · Head story: [`ECO-DOCS-001`](../backlog.json)

## Current initiative

### INIT-ECOSYSTEM-DOCS — Fleet documentation home

Status: `in_progress` · Completion: 65% · Deploy readiness: 55%

| Epic | Dimension | Target | Current | Features |
| ---- | --------- | ------ | ------- | -------- |
| EPIC-P35-PM-LIFT | compliance | 100 | 59 | FEAT-P35-LAYOUT (80%), FEAT-PM-FOLDER-R1 (70%) |

### Immediate priorities

1. **P35 strict GREEN** — close remaining layout-check violations.
2. **PM folder R1** — complete `pm/product/`, `pm/ux/`, and generated backlog alignment.
3. **ops:check stable** — no missing required paths, no manual witness re-seal.

## Next milestones

| Milestone | Goal | Target | Dependency |
| --------- | ---- | ------ | ---------- |
| ECO-DOC-002 | Owner-repo GitBook sync contracts signed (S45-03 inbounds) | 2026-Q3 | bridge-os coordination |
| ECO-DOC-003 | Fleet coverage matrix ≥ 80% green | 2026-Q4 | Owner dev-docs wave 1 |
| ECO-DOC-004 | Automated mirror refresh on owner release | 2026-Q4 | baseline-os MCP/bridge-os fabric |

## Protocol 22

Run `pnpm agent:next-work` — delegates to bridge-os program office. Do not ask the operator to choose among backlog items when P22 returns a story.

## Authority

- **Class R** commit/push when gates green.
- **Class A** for normative signoffs and production secrets.
- **Class S** for operator stop.
