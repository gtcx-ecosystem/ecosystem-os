---
title: 'Agency campaign review workflow'
status: current
date: 2026-06-17
owner: ecosystem-os
document_type: process
tier: critical
tags: ['agency', 'workflow', 'review', 'provenance']
review_cycle: on-change
---

# Campaign review workflow

Governed pipeline: **brief → generate → review → register → publish**.

Every stage has a machine-checkable gate or human approval record.

## Stages

| Stage | Owner | Output | Gate / witness |
| ----- | ----- | ------ | -------------- |
| **1. Brief** | creative-director | Campaign brief (audience, action, pack ID) | Brief references valid `pm/agency/packs/*/README.md`; audience + `intendedAction` filled |
| **2. Generate** | agency (human + tools) | Draft assets from templates | `pnpm agency:check` exit 0; brand tokens applied (`pm/agency/brand/tokens.json`) |
| **3. Review** | creative-director + compliance | Marked-up drafts | Quality bar checklist complete; claim→witness map updated for every external claim |
| **4. Register** | ecosystem-os | Catalog/registry entry | Asset ID + version in pack asset list; license/attribution verified per `license-governance.md` |
| **5. Publish** | canon coordination | External surface | No publish without linked witness; `agency:score` hard gates pass or explicit Class A waiver |

## Gate commands

```bash
pnpm agency:check        # catalogs + brand scaffold (stage 2)
pnpm agency:check:write  # refresh audit/evidence/agency-check-latest.json
pnpm agency:score:write  # composite + hard gates before publish (stage 5)
```

## Approval records

| Stage | Approval type | Evidence path |
| ----- | ------------- | ------------- |
| Brief | Product lead sign-off | `pm/agency/packs/{pack}/README.md` status `current` |
| Generate | Automated | `audit/evidence/agency-check-latest.json` → `ok: true` |
| Review | Human checklist | `docs/gitbook/business/agency/quality-bar.md` items checked in PR/commit message |
| Register | Automated + human | Pack `claim-witness-map.json` all claims `status: linked` |
| Publish | Hard gates | `audit/evidence/agency-score-latest.json` → `shippable: true` or Class A waiver |

## Escalation

- Unknown license → blocked at stage 2 (`agency:check` `unknown-license`)
- Unwitnessed claim → blocked at stage 3 (Trust & Safety)
- `shippable: false` at stage 5 → hold publish; complete brand/craft backlog or record Class A waiver
