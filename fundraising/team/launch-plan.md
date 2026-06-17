---
title: 'Agentic Fundraising Team Launch Plan'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: launch-plan
tier: strategic
tags: ['fundraising', 'agents', 'launch', 'clickup', 'gmail']
review_cycle: weekly
---

# Agentic Fundraising Team Launch Plan

This is the practical launch path for the fundraising agentic team.

## Phase 0: Admin Setup

1. Confirm `hello@gtcx.trade` mailbox access.
2. Create aliases or groups:
   - `fundraising@gtcx.trade`
   - `investors@gtcx.trade`
   - `partnerships@gtcx.trade`
   - `pilots@gtcx.trade`
   - `applications@gtcx.trade`
   - `accounts@gtcx.trade`
   - `calendar@gtcx.trade`
   - `events@gtcx.trade`
3. Create Gmail labels from `agent-email-operations.md`.
4. Create Google Calendar or calendar labels for fundraising meetings/events.
5. Confirm password manager and MFA ownership.

## Phase 1: ClickUp Setup

1. Create `GTCX Fundraising Engine` Space.
2. Create `Fundraising Opportunities` master list.
3. Add statuses from `clickup-setup-contract.md`.
4. Add custom fields.
5. Add views:
   - Daily Inbox
   - Hot Deadlines
   - Catalytic Capital
   - Partnerships & Pilots
   - Revenue Deals
   - Investor Pipeline
   - No Next Action
   - Stale Contacted
6. Create task templates from `clickup-task-templates.md`.

## Phase 2: Agent Team Dry Run

Run one dry-run cycle without external sends:

1. Pick 10 source signals from `forensic-tracking-backlog.json`.
2. Source Intelligence Agent creates source signal notes.
3. Opportunity Analyst scores and routes each.
4. CRM Agent creates ClickUp tasks.
5. Capital Collateral + Design Agent drafts one one-pager request.
6. Outreach Agent drafts two emails.
7. Finance Agent reviews one funding/terms question.
8. Claims Reviewer reviews one draft.
9. Chief of Staff Agent publishes daily brief.

Success criteria:

- No ownerless tasks.
- No missing source URLs.
- No external send.
- Every draft has review status.
- Every P1 opportunity has next action.

## Phase 3: Live Inbox + Calendar

1. Connect Gmail labels to n8n.
2. Connect Calendar event watcher.
3. Route inbound messages to ClickUp.
4. Generate daily digest.
5. Start human-approved drafts.

## Phase 4: Source Listeners

1. Connect RSS sources.
2. Connect page-watch sources.
3. Connect search-query sweeps.
4. Route high-score signals to ClickUp.
5. Review source quality weekly.

## Phase 5: App Build

Build the fundraising intelligence app when ClickUp workflows are stable:

1. Postgres source/opportunity graph.
2. Source freshness dashboard.
3. Opportunity scoring and dedupe.
4. ClickUp sync.
5. Gmail/Calendar sync.
6. Agent dashboards.

## Launch Metrics

| Metric | Week 1 Target |
| ------ | ------------- |
| Source signals processed | 50 |
| Qualified opportunities | 10 |
| ClickUp task hygiene | 100% required fields |
| Drafts created | 5 |
| Drafts sent without approval | 0 |
| Meetings booked | 1-2 |
| Daily briefs published | 5 |

