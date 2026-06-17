---
title: 'Fundraising Engine Workflow Spec'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: workflow-spec
tier: strategic
tags: ['fundraising', 'workflows', 'acceptance']
review_cycle: weekly
---

# Fundraising Engine Workflow Spec

## W1 Source Signal To Opportunity

Trigger:

- Source listener finds a new item.
- Agent manually captures a source.
- Email/newsletter creates signal.

Flow:

1. Create signal.
2. Dedupe by URL, source ID, organization, deadline.
3. Score signal.
4. If fit score >= 70, create ClickUp opportunity.
5. If fit score 50-69, create research task.
6. If fit score < 50, park/reject.

Acceptance:

- Source URL present.
- Excerpt present.
- Opportunity class present.
- Product match present.
- Next action present.

## W2 Email To Pipeline

Trigger:

- New email in `hello@gtcx.trade` with fundraising label.

Flow:

1. Summarize thread.
2. Match to existing ClickUp task by thread ID/contact/org.
3. Create/update task.
4. Label action-needed if human reply is needed.
5. Draft response if appropriate.

Acceptance:

- No duplicate task if thread already exists.
- ClickUp task links to Gmail thread.
- Drafts are not sent automatically.

## W3 Calendar To Meeting Workflow

Trigger:

- New fundraising calendar event or invite.

Flow:

1. Match attendees to opportunity/contact.
2. Update ClickUp meeting fields.
3. Create meeting prep task.
4. After meeting, create follow-up task.

Acceptance:

- Meeting has agenda.
- Desired outcome is stated.
- Follow-up owner is assigned.

## W4 Collateral Production

Trigger:

- Opportunity requires deck, one-pager, concept note, proposal, or visual asset.

Flow:

1. Create collateral request task.
2. Define audience, desired action, proof needed.
3. Draft asset.
4. Claims review.
5. Finance review if needed.
6. Human approval.
7. Link final asset to opportunity.

Acceptance:

- Asset has version and status.
- Claims are reviewed.
- External use is approved.

## W5 Finance / Deal Economics Review

Trigger:

- Opportunity includes budget, valuation, dilution, terms, pricing, revenue share, or runway.

Flow:

1. Finance Agent states financial question.
2. Draft assumptions.
3. Build scenarios.
4. State sensitivity and tradeoffs.
5. Recommend options.
6. Human approves or revises.

Acceptance:

- Assumptions are explicit.
- External financial claims are approved.
- Risk/tradeoff note is present.

## W6 Application / Proposal Submission

Trigger:

- Challenge, accelerator, program, DFI call, or pilot proposal is pursued.

Flow:

1. Confirm eligibility.
2. Create requirements checklist.
3. Draft answers and attachments.
4. Finance review.
5. Claims review.
6. Human approval.
7. Submit.
8. Save confirmation.
9. Set follow-up.

Acceptance:

- Submission evidence is linked.
- Deadline is recorded.
- Human approval is recorded.

## W7 Daily Brief

Trigger:

- Weekday schedule.

Flow:

1. Pull ClickUp changes.
2. Pull inbox replies.
3. Pull calendar events.
4. Pull deadlines.
5. Pull drafts awaiting approval.
6. Publish daily brief.

Acceptance:

- Brief includes top opportunities, replies, meetings, deadlines, blockers, approvals.
- Brief links to ClickUp tasks.

