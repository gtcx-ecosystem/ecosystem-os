---
title: 'PRD — ecosystem-os product charter'
status: current
date: 2026-06-15
owner: ecosystem-os
document_type: prd
tier: operating
tags: ['documentation', 'product-charter']
review_cycle: on-change
---

# PRD — ecosystem-os product charter

## Vision

Ecosystem OS is the fleet documentation and publishing home — one governed surface for onboarding, GTM, architecture narratives, and GitBook spaces without normative protocol forks.

## Mission

Make proof, coordination, and delivery discoverable for humans and agents across the GTCX fleet — evidence-linked publishing over ad-hoc doc sprawl.

## Product goals

| Goal | Outcome | Measure |
| ---- | ------- | ------- |
| PG1 Fleet docs home | Current fleet docs without owner drift | ops:check + publish register |

## Shipping goals

| ID | Target | Witness |
| -- | ------ | ------- |
| SG1 | ops:check green | CI |

## Features

| Capability | Description |
| ---------- | ----------- |
| CAP-ECO-PUBLISH | GitBook publish register and mirror contracts |
| CAP-ECO-ONBOARD | Fleet onboarding and contributor guides |
| CAP-ECO-GTM | GTM catalog and partnership doc lanes |

## Problem

The GTCX fleet ships documentation across 20+ repositories. Operators, agents, and external stakeholders cannot reliably find the current version of:

- Fleet vision and governance pointers
- Onboarding paths
- Developer documentation
- GTM and partnership materials
- Architecture narratives

Owner repos often duplicate or drift from canonical sources, and cross-repo sync is handled ad hoc.

## Product

**ecosystem-os** is the fleet documentation and publishing home. It centralizes:

- GitBook source for the `gtcx-ecosystem` space
- Mirrored owner-repo GitBooks (read-only sync)
- Fleet onboarding and contributor guides
- GTM catalog and legal-review workflows
- Architecture index and reference guides
- Publish register (`pm/publish-register.json`)

## Non-goals

- Normative protocols (owned by `canon-os`)
- Product implementation docs (owned by product repos)
- Audit evidence (owned by each repo's `audit/evidence/`)
- Hand-editing synced owner-repo GitBook mirrors

## Success metrics

| Metric | Target | Witness |
| ------ | ------ | ------- |
| ops:check pass rate | 100% | `pnpm ops:check` |
| Live GitBook spaces in publish register | 100% of fleet spaces | `pm/publish-register.json` |
| Fleet doc coverage matrix green | ≥ 80% by 2026-Q4 | `docs/reference/documentation-fleet-coverage-matrix.md` |
| New-repo doc onboarding time | ≤ 1 day | `pm/templates/new-repo-doc-onboarding/` |

## Milestones

1. **ECO-DOC-001** (2026-Q3) — Publish register operational, ops:check green, PM folder R1.
2. **ECO-DOC-002** (2026-Q3) — Owner-repo GitBook sync contracts signed (S45-03 inbounds).
3. **ECO-DOC-003** (2026-Q4) — Fleet coverage matrix ≥ 80% green.
4. **ECO-DOC-004** (2026-Q4) — Automated mirror refresh on owner release.

## Definition of done

- Every shipped feature has a publish witness or passing check.
- Every story traces to this PRD, a capability ID, and milestone ECO-DOC-001.
- No normative protocol text is forked into this repo.
