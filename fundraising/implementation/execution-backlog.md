---
title: 'Fundraising Engine Execution Backlog'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: backlog
tier: tactical
tags: ['fundraising', 'backlog', 'implementation', 'clickup']
review_cycle: weekly
pmInitiative: INIT-ECOSYSTEM-VENTURE
pmStories:
  - ECO-VEN-004
  - ECO-VEN-FR-001
  - ECO-VEN-FR-002
  - ECO-VEN-FR-003
  - ECO-VEN-FR-004
  - ECO-VEN-FR-005
  - ECO-VEN-FR-006
  - ECO-VEN-FR-007
  - ECO-VEN-FR-008
---

# Fundraising Engine Execution Backlog

> **PM trace:** `pm/backlog.json` · parent story `STORY-VEN-FUNDRAISE-SYNC` · handoff `STORY-VEN-OS-HANDOFF` (venture-os)

## Epic 1: Operating Foundation (`ECO-VEN-FR-001` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Confirm `hello@gtcx.trade` alias map | ECO-VEN-FR-001 | Inbox/Calendar Agent | Alias list and routing rules | P0 |
| Create fundraising Drive folder structure | ECO-VEN-FR-001 | Chief of Staff Agent | Folder tree and permissions | P0 |
| Create ClickUp Space/List | ECO-VEN-FR-001 | CRM ClickUp Agent | Live ClickUp CRM | P0 |
| Configure statuses and custom fields | ECO-VEN-FR-001 | CRM ClickUp Agent | Pipeline schema | P0 |
| Load task templates | ECO-VEN-FR-001 | CRM ClickUp Agent | Opportunity, outreach, application, finance, collateral templates | P0 |
| Publish authority matrix in ClickUp | ECO-VEN-FR-001 | Chief of Staff Agent | Approval gates visible in workflow | P0 |

Repo readiness witness:
[`operating-foundation-readiness.md`](./operating-foundation-readiness.md)
maps the operating foundation to repo evidence, private runtime variables, and
the live activation checklist. Repo-owned contracts are ready; live activation
requires private Gmail, Calendar, Drive, and ClickUp IDs plus a smoke-test
record outside the repo.

## Epic 2: Source Intelligence (`ECO-VEN-FR-002` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Validate source database | ECO-VEN-FR-002 | Source Intelligence Agent | Passing source validation | P0 |
| Load first source batch into ClickUp | ECO-VEN-FR-002 | CRM ClickUp Agent | 50 source tasks or records | P0 |
| Assign review cadence by source tier | ECO-VEN-FR-002 | Source Intelligence Agent | Daily/weekly/monthly review plan | P0 |
| Expand country source coverage | ECO-VEN-FR-002 | Source Intelligence Agent | Country-specific ministries, regulators, DFIs, events | P1 |
| Expand commodity source coverage | ECO-VEN-FR-002 | Revenue Buyer Desk Agent | Buyer/refiner/trader/vault/watchlist | P1 |
| Build events calendar | ECO-VEN-FR-002 | Source Intelligence Agent | Africa/Global South event tracker | P1 |

## Epic 3: Inbox And Calendar Operations (`ECO-VEN-FR-003` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Configure Gmail labels | ECO-VEN-FR-003 | Inbox/Calendar Agent | Label taxonomy | P0 |
| Configure Gmail filters | ECO-VEN-FR-003 | Inbox/Calendar Agent | Alias-based routing | P0 |
| Configure fundraising calendar | ECO-VEN-FR-003 | Inbox/Calendar Agent | Shared calendar and event labels | P0 |
| Create meeting prep template | ECO-VEN-FR-003 | Investor Relations Agent | Agenda and outcome template | P0 |
| Create follow-up workflow | ECO-VEN-FR-003 | Inbox/Calendar Agent | Post-meeting task template | P0 |
| Implement n8n Gmail to ClickUp workflow | ECO-VEN-FR-003 | CRM ClickUp Agent | Email-created ClickUp tasks | P1 |
| Implement n8n Calendar to ClickUp workflow | ECO-VEN-FR-003 | CRM ClickUp Agent | Meeting updates in pipeline | P1 |

## Epic 4: Pipeline And Qualification (`ECO-VEN-FR-004` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Define fit scoring rubric in ClickUp | ECO-VEN-FR-004 | Opportunity Analyst Agent | Weighted scoring fields | P0 |
| Create opportunity classes | ECO-VEN-FR-004 | Opportunity Analyst Agent | GTCX-specific class taxonomy | P0 |
| Load forensic backlog | ECO-VEN-FR-004 | CRM ClickUp Agent | First 25 opportunities/tasks | P0 |
| Run first daily triage | ECO-VEN-FR-004 | Chief of Staff Agent | Triage notes and owner assignments | P0 |
| Publish weekly pipeline report | ECO-VEN-FR-004 | Chief of Staff Agent | KPI report | P1 |

## Epic 5: Outreach And Relationship Development (`ECO-VEN-FR-005` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Finalize email templates | ECO-VEN-FR-005 | Outreach Drafting Agent | Approved draft library | P0 |
| Finalize LinkedIn templates | ECO-VEN-FR-005 | Outreach Drafting Agent | Manual outreach scripts | P0 |
| Finalize WhatsApp templates | ECO-VEN-FR-005 | Outreach Drafting Agent | Warm follow-up scripts | P1 |
| Build warm-intro tracker | ECO-VEN-FR-005 | Investor Relations Agent | Relationship path field/view | P1 |
| Create outreach approval queue | ECO-VEN-FR-005 | Chief of Staff Agent | Review/approval ClickUp view | P0 |

## Epic 6: Collateral And Applications (`ECO-VEN-FR-006` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Create collateral asset inventory | ECO-VEN-FR-006 | Capital Collateral Design Agent | Decks, one-pagers, concept notes, data room links | P0 |
| Create claims review checklist | ECO-VEN-FR-006 | Claims Compliance Reviewer Agent | Evidence and review template | P0 |
| Create application checklist template | ECO-VEN-FR-006 | Application Proposal Agent | Requirements/deadline/submission checklist | P0 |
| Draft Africa/Global South master concept note | ECO-VEN-FR-006 | Capital Collateral Design Agent | Reusable concept note | P1 |
| Build audience-specific one-pagers | ECO-VEN-FR-006 | Capital Collateral Design Agent | Investor, DFI, sovereign, buyer, accelerator versions | P1 |

## Epic 7: Finance And Deal Economics (`ECO-VEN-FR-007` · `STORY-VEN-FUNDRAISE-SYNC`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Create budget intake template | ECO-VEN-FR-007 | Finance Deal Economics Agent | Standard budget assumptions form | P0 |
| Create deal terms review template | ECO-VEN-FR-007 | Finance Deal Economics Agent | Dilution, valuation, revenue share, exclusivity checklist | P0 |
| Build pilot economics template | ECO-VEN-FR-007 | Finance Deal Economics Agent | Paid pilot and implementation pricing model | P1 |
| Build runway dashboard | ECO-VEN-FR-007 | Finance Deal Economics Agent | Funding need and timing view | P1 |

## Epic 8: Automation And App Build (`ECO-VEN-FR-008` · `STORY-VEN-OS-HANDOFF`)

| Task | storyId | Owner | Output | Priority |
| ---- | ------- | ----- | ------ | -------- |
| Implement daily digest workflow | ECO-VEN-FR-008 | CRM ClickUp Agent | Weekday digest | P1 |
| Implement web listener workflow | ECO-VEN-FR-008 | Source Intelligence Agent | RSS/page-watch/search sweep candidates | P1 |
| Define app database schema | STORY-VEN-OS-HANDOFF | Product/Engineering | Postgres schema from data model | P2 |
| Build source and opportunity MVP screens | STORY-VEN-OS-HANDOFF | Product/Engineering | Internal web app MVP | P2 |
| Implement ClickUp sync | STORY-VEN-OS-HANDOFF | Product/Engineering | One-way task creation/update | P2 |
| Implement approval audit log | STORY-VEN-OS-HANDOFF | Product/Engineering | App-backed approval history | P2 |

## First Sprint Definition

Sprint 1 is complete when:

1. ClickUp CRM is live with statuses, fields, and templates.
2. Gmail labels and calendar workflow are configured.
3. First 25 backlog items are loaded.
4. First five daily briefs are published.
5. At least 10 qualified opportunities have owners and next actions.
6. Approval queue is used for every external draft.
