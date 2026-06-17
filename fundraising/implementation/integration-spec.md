---
title: 'Fundraising Engine Integration Spec'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: integration-spec
tier: strategic
tags: ['fundraising', 'integrations', 'clickup', 'gmail', 'calendar', 'n8n']
review_cycle: monthly
---

# Fundraising Engine Integration Spec

## Systems

| System | Role |
| ------ | ---- |
| ClickUp | Execution layer, task status, owners, due dates, approvals |
| Gmail / `hello@gtcx.trade` | Email, aliases, account registrations, application communication |
| Google Calendar | Meetings, event deadlines, reminders |
| Google Drive | Data rooms, collateral, submitted documents |
| n8n | Low-code automation and listeners |
| changedetection.io | Page-watch listener |
| Source JSON | V1 source intelligence |
| Future app DB | V2 intelligence layer |

## ClickUp Required Objects

Space:

```text
GTCX Fundraising Engine
```

Master list:

```text
Fundraising Opportunities
```

Required views:

- Daily Inbox.
- Hot Deadlines.
- Catalytic Capital.
- Partnerships & Pilots.
- Revenue Deals.
- Investor Pipeline.
- Collateral Blockers.
- Finance Review.
- Drafts Awaiting Approval.
- No Next Action.

## Gmail Labels

Use labels from `fundraising/workflows/agent-email-operations.md`.

Required automation labels:

- `fundraising/inbox`
- `fundraising/accounts`
- `fundraising/applications`
- `fundraising/calendar`
- `fundraising/events`
- `fundraising/action-needed`
- `fundraising/draft-ready`
- `fundraising/replied`

## n8n Workflows

| Workflow | Trigger | Action |
| -------- | ------- | ------ |
| Gmail to ClickUp | New labeled email | Create/update opportunity or account task |
| Calendar sync | New/updated event | Update task meeting fields |
| Daily digest | Weekday schedule | Summarize pipeline, inbox, calendar, deadlines |
| Source RSS listener | New feed item | Create source signal |
| Page-watch webhook | Changed page | Create source signal or research task |
| Search query sweep | Scheduled | Create candidate signals |
| Draft tracker | ClickUp status/comment | Create Gmail draft or review task |
| Approval tracker | Approval comment/status | Move task and record audit note |

## Sync Rules

1. App/source DB creates candidate signal.
2. Candidate signal becomes ClickUp task only if actionable.
3. ClickUp task owns execution state.
4. Gmail/Calendar events link to ClickUp via thread/event ID.
5. Drive folders link to ClickUp task.
6. Approvals must be stored in ClickUp comments in V1.
7. App audit log becomes approval SoT in V2.

## Security

- Use least-privilege OAuth scopes.
- Store credentials in n8n credential store or approved vault.
- Do not store secrets in repo.
- Do not store passwords in ClickUp/Gmail/docs.
- Do not automate restricted-platform scraping.
- Human approval required for all external sends/submissions.

