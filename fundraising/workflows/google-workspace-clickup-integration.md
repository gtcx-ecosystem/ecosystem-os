---
title: 'Google Workspace + ClickUp Fundraising Integration'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-playbook
tier: strategic
tags: ['fundraising', 'clickup', 'gmail', 'calendar', 'automation']
review_cycle: on-change
---

# Google Workspace + ClickUp Fundraising Integration

This is the v1 integration plan for the GTCX fundraising engine. ClickUp is the
operating layer. Gmail, Calendar, Drive, and Meet are the communication layer.
n8n is the free/self-hosted automation layer.

## Goals

1. Convert inbound fundraising email into ClickUp opportunities.
2. Draft and track outbound fundraising emails without losing human approval.
3. Sync meetings, reminders, and follow-ups between ClickUp and Google Calendar.
4. Keep funder documents, decks, and notes linked from every opportunity.
5. Produce a daily fundraising digest from email, calendar, and ClickUp state.

## System Roles

| System | Role |
| ------ | ---- |
| ClickUp | Source of truth for opportunities, contacts, tasks, owners, stage, next action |
| Gmail | Inbound and outbound investor, grant, partner, and pilot communication |
| Google Calendar | Meetings, diligence calls, grant deadlines, follow-up reminders |
| Google Drive | Decks, one-pagers, grant attachments, diligence room material |
| Google Meet | Meeting links for scheduled calls |
| n8n | Scheduled pulls, event handlers, task creation, field updates, digest generation |
| Postgres + pgvector | Optional scoring cache and semantic matching store |

## ClickUp Objects

Use one Space: `GTCX Fundraising Engine`.

Core list:

| List | Purpose |
| ---- | ------- |
| Fundraising Opportunities | Master CRM pipeline for leads, grants, investors, partners, pilots, and revenue opportunities |

Core statuses:

| Status | Purpose |
| ------ | ------- |
| Inbox | Raw leads from Gmail, forms, LinkedIn capture, grants, RSS, and APIs |
| Qualified | Human-approved leads with product/channel fit |
| Outreach Ready | Leads with approved narrative and collateral |
| Contacted | Outreach sent; awaiting reply |
| Meeting Scheduled | Calendar event exists |
| Diligence | Active investor, grant, partner, or customer diligence |
| Proposal Submitted | Grant/pilot/proposal submitted |
| Won | Capital, revenue, partnership, or pilot closed |
| Lost / Parked | Not active, too early, not fit, or no response |

Required custom fields:

| Field | Type |
| ----- | ---- |
| Channel | Dropdown: Gmail, LinkedIn Manual, Africa DFI/MDB, Trade Body, Commodity Body, Regulator/Ministry, Buyer/Trader, Bank/DFI Desk, Foundation/Challenge, VC/Investor, RSS, Newsletter, Referral, Inbound |
| Funding Type | Dropdown: Catalytic Capital, Equity, Sponsorship, Pilot, Revenue, Partnership, Accelerator, Challenge, Procurement, Technical Assistance |
| Product Match | Labels: ComplianceOS, MarketsOS, Nyota, BaselineOS, Griot, Terminal/FIFTY-FOUR |
| Fit Score | Number, 0-100 |
| Ticket Size | Money |
| Deadline | Date |
| Source URL | URL |
| Gmail Thread ID | Text |
| Calendar Event ID | Text |
| Drive Folder URL | URL |
| Contact Name | Text |
| Contact Email | Email |
| Organization | Text |
| Country / Region | Dropdown or text |
| Warm Intro Path | Text |
| Next Action | Text |
| Owner | People |

## Gmail Workflows

### 1. Inbound Lead Capture

Trigger options:

- v1 simple: n8n Gmail trigger or IMAP polling every 5-15 minutes.
- v1 robust: Gmail API `watch` with Google Cloud Pub/Sub push notifications.

Filter labels:

- `fundraising/inbound`
- `fundraising/grants`
- `fundraising/investors`
- `fundraising/partners`
- `fundraising/pilots`

Processing:

1. Read sender, subject, snippet, date, attachments, and thread ID.
2. Classify funding type and channel.
3. Create or update a ClickUp task in `Inbox`.
4. Set `Gmail Thread ID`, `Contact Email`, `Organization`, `Source URL`, and first-pass `Fit Score`.
5. Add a comment with the email summary and recommended next action.

### 2. Outbound Drafting

Rule: the system drafts; a human sends.

Flow:

1. Task moves to `Outreach Ready`.
2. n8n generates a draft from the selected template and task fields.
3. Draft is created in Gmail or posted as a ClickUp comment for approval.
4. Human reviews and sends.
5. On send, task moves to `Contacted`, and `Last Contacted` is updated.

### 3. Reply Tracking

Flow:

1. Gmail reply arrives on a tracked thread.
2. n8n matches `Gmail Thread ID` to ClickUp task.
3. Positive replies move to `Meeting Scheduled` or `Diligence`.
4. No-response timers create follow-up tasks after 3, 7, and 14 days.

## Calendar Workflows

### 1. Meeting Creation

Trigger:

- Task status changes to `Meeting Scheduled`, or a meeting date field is set.

Flow:

1. Create Google Calendar event with attendees.
2. Add Google Meet conference link.
3. Write the event URL and `Calendar Event ID` back to ClickUp.
4. Add agenda from task fields: ask, product match, source, and desired outcome.

### 2. Meeting Intake

Trigger:

- New event appears on fundraising calendar.

Flow:

1. Match attendee email to ClickUp contact/opportunity.
2. If no opportunity exists, create a task in `Inbox`.
3. If one exists, add a ClickUp comment and move to `Meeting Scheduled`.

### 3. Follow-Up Enforcement

Flow:

1. After a meeting ends, n8n waits 30 minutes.
2. Create a ClickUp subtask: `Send follow-up`.
3. Draft Gmail follow-up using meeting context.
4. Set due date to same day.

## Drive Workflows

For every qualified opportunity:

1. Create a Drive folder from a template.
2. Add links to relevant decks from `fundraising/investor-decks/`.
3. Store the folder URL in ClickUp.
4. Add final submitted documents back to the task as links.

Folder naming:

`YYYY-MM-DD - {Organization} - {Funding Type} - {Product Match}`

## Daily Digest

Every weekday morning:

1. Pull ClickUp tasks changed in the last 24 hours.
2. Pull Gmail replies from tracked threads.
3. Pull today and tomorrow fundraising calendar events.
4. Pull deadlines in the next 14 days.
5. Post digest to ClickUp and email it to the fundraising team.

Digest sections:

- Top 10 new leads
- Hot replies
- Meetings today/tomorrow
- Deadlines inside 14 days
- Stale opportunities with no next action
- Collateral requests blocking outreach

## Permissions

Use least-privilege OAuth scopes. Avoid broad mailbox access unless needed.

Initial v1 scopes:

| API | Purpose |
| --- | ------- |
| Gmail read/search | Inbound capture and reply tracking |
| Gmail draft/send | Human-approved outreach drafts and sends |
| Calendar events | Create/read fundraising meetings |
| Drive file metadata | Link folders and collateral |
| ClickUp task/custom fields | Create/update opportunities |

If GTCX uses Google Workspace admin controls, prefer domain-approved OAuth apps.
Use domain-wide delegation only for service accounts that need organization-wide
access and only after admin approval.

## Implementation Phases

### Phase 1: No-Code / Low-Code

- ClickUp Space, Lists, statuses, custom fields.
- ClickUp Form for LinkedIn/manual lead capture.
- n8n Gmail polling and ClickUp task creation.
- n8n Calendar event creation from ClickUp status.

### Phase 2: Durable Automation

- Gmail API push notifications via Pub/Sub.
- Calendar push notifications.
- Postgres scoring cache.
- Duplicate detection by email, domain, source URL, and thread ID.

### Phase 3: Intelligence

- Semantic matching against GTCX product portfolio.
- Outreach template selection by funding type and product match.
- Daily brief with ranked next actions.
- Win/loss analysis by channel and narrative.

## Source References

- Gmail API overview: https://developers.google.com/workspace/gmail/api/guides
- Gmail push notifications: https://developers.google.com/workspace/gmail/api/guides/push
- Calendar API overview: https://developers.google.com/workspace/calendar/api/guides/overview
- Google service accounts and delegation: https://developers.google.com/identity/protocols/oauth2/service-account
- ClickUp API: https://developer.clickup.com
