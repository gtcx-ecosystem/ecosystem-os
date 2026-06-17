---
title: 'n8n Workflow — ClickUp Meeting Follow-Up'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: implementation-spec
tier: strategic
tags: ['fundraising', 'n8n', 'clickup', 'calendar', 'gmail']
review_cycle: on-change
---

# n8n Workflow — ClickUp Meeting Follow-Up

## Purpose

Turn ClickUp fundraising tasks into Calendar/Meet events and enforce same-day
follow-up.

## Trigger

ClickUp Webhook:

- Task status changes to `Meeting Scheduled`
- Meeting date custom field changes

## Nodes

1. ClickUp Trigger or Webhook
2. HTTP Request: get full task and custom fields
3. IF: `Calendar Event ID` exists
4. Google Calendar: create event if missing
5. HTTP Request: set `Calendar Event ID`
6. HTTP Request: add ClickUp comment with meeting URL
7. Wait: until event end + 30 minutes
8. Gmail: create draft follow-up
9. HTTP Request: create ClickUp subtask `Send follow-up`

## Calendar Event Template

Title:

`GTCX Fundraising — {Organization}`

Description:

- Opportunity: ClickUp task URL
- Funding type
- Product match
- Ask
- Source URL
- Desired outcome
- Questions to answer

Attendees:

- Primary contact email
- Internal owner

Conference:

- Google Meet link enabled.

## Follow-Up Draft Template

Subject:

`Follow-up: GTCX / {Organization}`

Body:

```text
Hi {Contact Name},

Thank you for the conversation today. Based on the discussion, the clearest next step is:

{Next Action}

I am sharing the relevant material here:
{Drive Folder URL or Deck URL}

Please let me know if there is anything else you need from us before the next step.

Best,
Amani
```

## Human Gate

The workflow creates a Gmail draft and ClickUp subtask. Human sends the email.
