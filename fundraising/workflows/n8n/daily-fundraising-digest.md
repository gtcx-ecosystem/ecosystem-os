---
title: 'n8n Workflow — Daily Fundraising Digest'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: implementation-spec
tier: strategic
tags: ['fundraising', 'n8n', 'clickup', 'gmail', 'calendar']
review_cycle: on-change
---

# n8n Workflow — Daily Fundraising Digest

## Purpose

Produce a weekday operating brief for the fundraising team.

## Trigger

Schedule Trigger:

- Weekdays
- 08:00 local operator time

## Data Pulls

1. ClickUp tasks created or updated in the last 24 hours.
2. ClickUp tasks with deadlines inside 14 days.
3. ClickUp tasks in `Contacted` with no update in 7 days.
4. Gmail replies on tracked fundraising labels in the last 24 hours.
5. Google Calendar events today and tomorrow on the fundraising calendar.

## Digest Sections

1. Hot replies
2. Meetings today
3. Meetings tomorrow
4. Deadlines inside 14 days
5. New leads to review
6. Outreach ready but unsent
7. Stale contacted leads
8. Collateral blockers
9. Recommended next actions

## Output

Create a ClickUp task in `Daily Research Ops`:

`Daily Fundraising Digest — YYYY-MM-DD`

Also email the digest to the fundraising team.

## Ranking Rules

Lead priority:

1. Positive reply from funder/investor/partner.
2. Deadline inside 7 days.
3. Fit Score >= 80.
4. Product Match includes ComplianceOS, MarketsOS, or Nyota.
5. Ticket Size >= 50000.
6. Warm intro path present.

## Guardrails

- Do not mark opportunities `Won`.
- Do not send outbound emails except digest to internal recipients.
- Do not include full private email bodies in the digest; include summary and task link.
