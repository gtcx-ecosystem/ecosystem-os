---
title: 'Implementation Truth — gtcx-agile'
status: 'current'
date: '2026-05-24'
owner: 'chief-of-staff'
role: 'chief-of-staff'
tier: 'operating'
tags: ['documentation']
review_cycle: 'annual'
---

# Implementation Truth — gtcx-agile

**Date:** 2026-03-09
**Scope:** ai-1-agile — coordination infrastructure and planning artifact status

---

## What This Repo Actually Is

ai-1-agile is a documentation-only repo. No packages, no compiled output, no CI pipeline, no build graph. It produces markdown that governs how the other 14 repos are built. Its value is entirely in whether the documents inside it are accurate, current, and acted upon.

The repo is on the `restore/from-backup` branch, 7 commits ahead of main. It has not been merged to main.

---

## What Actually Exists

### SOP Infrastructure (present and structured)

The `_sop/` directory is organized and populated following the GTCX SOP standard:

```
_sop/1-agents/       — Agent onboarding, roles, workflows, governance
_sop/2-docs/         — Product, company, engineering, devops, specs docs
_sop/3-agile/        — Sprint frameworks, scrum board templates, audits
_sop/4-sessions/     — Session transcripts and analysis
_sop/5-release/      — Release planning
_sop/6-metrics/      — Metrics tracking
_sop/7-03-platform/examples/     — Examples
_sop/8-03-platform/scripts/      — Scripts
```

The orientation file (`_sop/1-agents/1-onboarding/orientation.md`) is repo-specific and usable. It correctly describes the coordination-only nature of this repo, lists the read-before-touching-code sequence, and identifies security-sensitive areas (sprint priorities, ADRs).

### Agile Framework Templates (present, generic)

The scrum board (`_sop/3-agile/2-scrum-board/`) contains:

- `executive-summary.md` — template shell, all `[Product Name]` placeholders
- `phased-roadmap.md` — template shell, no GTCX-specific content
- `backlog.md` — template shell, bracketed placeholders throughout
- `sprint-plan.md` — template shell, no active sprint content
- `sprint-planning.md`, `standup.md`, `sprint.md` — all templates

**Verdict:** The agile framework scaffolding exists. None of the actual GTCX roadmap data has been written into these templates. The templates describe how to plan; they contain no actual plans.

### Priority Framework (present, usable)

`_sop/3-agile/2-scrum-board/4-development-priorities/priority-framework.md` is a complete, generic priority classification system (P0–P3 with response times, matrices, templates). It is usable as-is for triage decisions. It is not ecosystem-specific.

### Session Records (present)

`_sop/3-agile/2-scrum-board/1-work-sessions/` contains: transcripts, analysis, hygiene reports. These are the closest thing to active planning artifacts — they record what was worked on during recent sprints, but in an ad-hoc format, not a structured sprint plan.

### Handoff Document (present, informative)

`01-docs/chats/sop-hygiene-handoff.md` is the highest-value planning artifact in the repo. It names:

- 9 completed repos from the SOP hygiene sprint
- 7 remaining repos with `_sop/` folders needing remediation (including this repo itself)
- Step-by-step instructions for completing each remaining repo

### Decision Records

`_sop/reference/archive/legacy-authoritative/_archive/decisions/` — referenced but not directly inspected. ADR presence requires explicit human approval to mark Accepted.

---

## What Is Missing

### No GTCX Ecosystem Roadmap

There is no document in this repo that describes, in concrete terms, what is being built across the 15 GTCX repos, in what order, for what timeline, with what dependencies. The phased-roadmap.md template exists. The roadmap itself does not.

### No Active Sprint Record

There is no document stating what any team is working on this sprint, what was completed last sprint, what is blocked. The sprint template exists. No sprint has been logged.

### No Cross-Repo Dependency Map

The orientation doc says "Cross-repo dependencies must be called out explicitly in sprint plans." No such plan exists, and therefore no dependencies are mapped.

### No Backlog with Real Items

The backlog template has MoSCoW categories with bracketed placeholders. There are no actual backlog items for any GTCX product.

### This Repo Is in Its Own Remediation Queue

The handoff document lists `gtcx-agile` as one of the 7 repos needing SOP hygiene completion — meaning this repo has not yet completed the same cleanup it coordinated for 9 other repos.

---

## Honest Assessment

| Artifact                        | Status                              |
| ------------------------------- | ----------------------------------- |
| SOP structure                   | Present and organized               |
| Agent orientation               | Repo-specific and usable            |
| Agile templates                 | Present but all template-token content |
| GTCX roadmap                    | Does not exist                      |
| Active sprint                   | Does not exist                      |
| Cross-repo dependency map       | Does not exist                      |
| Product backlog with real items | Does not exist                      |
| SOP hygiene (self-remediation)  | Incomplete                          |

The coordination infrastructure has been built. The coordination itself has not been done.

---

## What This Means for the Ecosystem

The 14 other repos are developing without a shared written plan. Six platforms are spec-only with no implementation. The frontend (ai-3-fiftyfour) is building 13 surfaces against API routes that may not be implemented. This is the coordination gap this repo exists to close — and it is currently empty at the planning layer.

The repo's next job is not infrastructure. It is content: an actual GTCX Q2 roadmap, an actual sprint plan for the critical-path repos, and an actual dependency map showing what blocks what.
