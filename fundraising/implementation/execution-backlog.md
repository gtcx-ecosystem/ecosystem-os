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

> **PM trace:** `pm/backlog/venture-backlog.json` · parent story `ECO-VEN-004` · product handoff `ECO-VEN-005` (venture-os)

## Epic 1: Operating Foundation (`ECO-VEN-FR-001`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Confirm `hello@gtcx.trade` alias map | Inbox/Calendar Agent | Alias list and routing rules | P0 |
| Create fundraising Drive folder structure | Chief of Staff Agent | Folder tree and permissions | P0 |
| Create ClickUp Space/List | CRM ClickUp Agent | Live ClickUp CRM | P0 |
| Configure statuses and custom fields | CRM ClickUp Agent | Pipeline schema | P0 |
| Load task templates | CRM ClickUp Agent | Opportunity, outreach, application, finance, collateral templates | P0 |
| Publish authority matrix in ClickUp | Chief of Staff Agent | Approval gates visible in workflow | P0 |

Repo readiness witness:
[`operating-foundation-readiness.md`](./operating-foundation-readiness.md)
maps the operating foundation to repo evidence, private runtime variables, and
the live activation checklist. Repo-owned contracts are ready; live activation
requires private Gmail, Calendar, Drive, and ClickUp IDs plus a smoke-test
record outside the repo.

## Epic 2: Source Intelligence (`ECO-VEN-FR-002`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Validate source database | Source Intelligence Agent | Passing source validation | P0 |
| Load first source batch into ClickUp | CRM ClickUp Agent | 50 source tasks or records | P0 |
| Assign review cadence by source tier | Source Intelligence Agent | Daily/weekly/monthly review plan | P0 |
| Expand country source coverage | Source Intelligence Agent | Country-specific ministries, regulators, DFIs, events | P1 |
| Expand commodity source coverage | Revenue Buyer Desk Agent | Buyer/refiner/trader/vault/watchlist | P1 |
| Build events calendar | Source Intelligence Agent | Africa/Global South event tracker | P1 |

## Epic 3: Inbox And Calendar Operations (`ECO-VEN-FR-003`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Configure Gmail labels | Inbox/Calendar Agent | Label taxonomy | P0 |
| Configure Gmail filters | Inbox/Calendar Agent | Alias-based routing | P0 |
| Configure fundraising calendar | Inbox/Calendar Agent | Shared calendar and event labels | P0 |
| Create meeting prep template | Investor Relations Agent | Agenda and outcome template | P0 |
| Create follow-up workflow | Inbox/Calendar Agent | Post-meeting task template | P0 |
| Implement n8n Gmail to ClickUp workflow | CRM ClickUp Agent | Email-created ClickUp tasks | P1 |
| Implement n8n Calendar to ClickUp workflow | CRM ClickUp Agent | Meeting updates in pipeline | P1 |

## Epic 4: Pipeline And Qualification (`ECO-VEN-FR-004`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Define fit scoring rubric in ClickUp | Opportunity Analyst Agent | Weighted scoring fields | P0 |
| Create opportunity classes | Opportunity Analyst Agent | GTCX-specific class taxonomy | P0 |
| Load forensic backlog | CRM ClickUp Agent | First 25 opportunities/tasks | P0 |
| Run first daily triage | Chief of Staff Agent | Triage notes and owner assignments | P0 |
| Publish weekly pipeline report | Chief of Staff Agent | KPI report | P1 |

## Epic 5: Outreach And Relationship Development (`ECO-VEN-FR-005`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Finalize email templates | Outreach Drafting Agent | Approved draft library | P0 |
| Finalize LinkedIn templates | Outreach Drafting Agent | Manual outreach scripts | P0 |
| Finalize WhatsApp templates | Outreach Drafting Agent | Warm follow-up scripts | P1 |
| Build warm-intro tracker | Investor Relations Agent | Relationship path field/view | P1 |
| Create outreach approval queue | Chief of Staff Agent | Review/approval ClickUp view | P0 |

## Epic 6: Collateral And Applications (`ECO-VEN-FR-006`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Create collateral asset inventory | Capital Collateral Design Agent | Decks, one-pagers, concept notes, data room links | P0 |
| Create claims review checklist | Claims Compliance Reviewer Agent | Evidence and review template | P0 |
| Create application checklist template | Application Proposal Agent | Requirements/deadline/submission checklist | P0 |
| Draft Africa/Global South master concept note | Capital Collateral Design Agent | Reusable concept note | P1 |
| Build audience-specific one-pagers | Capital Collateral Design Agent | Investor, DFI, sovereign, buyer, accelerator versions | P1 |

## Epic 7: Finance And Deal Economics (`ECO-VEN-FR-007`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Create budget intake template | Finance Deal Economics Agent | Standard budget assumptions form | P0 |
| Create deal terms review template | Finance Deal Economics Agent | Dilution, valuation, revenue share, exclusivity checklist | P0 |
| Build pilot economics template | Finance Deal Economics Agent | Paid pilot and implementation pricing model | P1 |
| Build runway dashboard | Finance Deal Economics Agent | Funding need and timing view | P1 |

## Epic 8: Automation And App Build (`ECO-VEN-FR-008`)

| Task | Owner | Output | Priority |
| ---- | ----- | ------ | -------- |
| Implement daily digest workflow | CRM ClickUp Agent | Weekday digest | P1 |
| Implement web listener workflow | Source Intelligence Agent | RSS/page-watch/search sweep candidates | P1 |
| Define app database schema | Product/Engineering | Postgres schema from data model | P2 |
| Build source and opportunity MVP screens | Product/Engineering | Internal web app MVP | P2 |
| Implement ClickUp sync | Product/Engineering | One-way task creation/update | P2 |
| Implement approval audit log | Product/Engineering | App-backed approval history | P2 |

## First Sprint Definition

Sprint 1 is complete when:

1. ClickUp CRM is live with statuses, fields, and templates.
2. Gmail labels and calendar workflow are configured.
3. First 25 backlog items are loaded.
4. First five daily briefs are published.
5. At least 10 qualified opportunities have owners and next actions.
6. Approval queue is used for every external draft.
