---
title: 'Fundraising Pipeline and Deliverables Matrix'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-playbook
tier: strategic
tags: ['fundraising', 'pipeline', 'crm', 'deliverables', 'clickup']
review_cycle: monthly
---

# Fundraising Pipeline and Deliverables Matrix

This matrix defines what must exist before a fundraising opportunity advances
through ClickUp. It is the control surface for status tracking, owner handoffs,
and collateral production.

## Pipeline Gates

| Status | Required Fields | Required Artifact | Owner Action | Automation |
| ------ | --------------- | ----------------- | ------------ | ---------- |
| Inbox | Source URL, channel, funding type, source excerpt, product match, next action | Source summary | Confirm this is real and dedupe | Gmail/manual/source tasks enter here |
| Qualified | Organization, fit score, owner, why it matters, eligibility note | Qualification note | Accept or park within 48 hours | Alert if owner missing |
| Outreach Ready | Contact or submission path, selected narrative, selected deliverable | Outreach draft or submission plan | Approve message/package | Draft Gmail or create collateral task |
| Contacted | Contact date, contact method, sender, next follow-up date | Sent email/link record | Track reply and follow-up | Follow-up reminders at 3/7/14 days |
| Meeting Scheduled | Calendar event ID, attendees, agenda, desired outcome | Meeting prep note | Hold meeting and capture notes | Create Meet event and prep subtask |
| Diligence | Request list, Drive folder URL, response owner | Diligence tracker | Answer requests and maintain docs | Create/update Drive folder |
| Proposal Submitted | Submission date, package links, decision date if known | Submitted package | Track decision and next follow-up | Deadline/decision reminders |
| Won | Amount/value, terms, handoff owner, evidence links | Close note | Create operational handoff | Create implementation handoff task |
| Lost / Parked | Reason, learning note, revisit date if useful | Loss/park note | Close loop or schedule revisit | Remove from active digest |

## Deliverable Families

| Family | Best For | Standard Components | Source Location |
| ------ | -------- | ------------------- | --------------- |
| Ecosystem narrative | General investor, foundation, strategic partner | One-pager, ecosystem deck, product map, ask | `fundraising/investor-decks/ecosystem/` |
| Grant package | Grants, challenges, foundations, DFIs | Application answers, budget, impact metrics, attachments | Opportunity-specific folder |
| Investor package | VC, angels, family offices, strategic capital | Deck, executive summary, use of funds, financial model | `fundraising/investor-decks/ecosystem/` and `fundraising/financials/` |
| Partnership package | Corporates, NGOs, DFIs, governments | Partner brief, pilot scope, MoU outline, roles/responsibilities | `fundraising/investor-decks/partnership-outreach/` |
| Pilot proposal | Product revenue, design partners, public-sector pilots | Problem statement, scope, timeline, pricing, success metrics | Product-specific docs |
| Compliance package | EUDR, CSDDD, ESG, responsible sourcing | ComplianceOS brief, evidence model, regulatory alignment | `fundraising/investor-decks/compliance-esg/` |
| Markets package | GTX Markets, collateral, trading, finance | Executive brief, market structure, first-deals narrative | `fundraising/investor-decks/gtx-markets/` |
| Diligence room | Active investor/partner/customer diligence | Decks, financials, legal docs, technical briefs, meeting notes | Google Drive folder linked in ClickUp |

## Lead-Type Defaults

| Funding Type | Default Status Path | Default Deliverable | Primary Metric |
| ------------ | ------------------- | ------------------- | -------------- |
| Grant | Inbox -> Qualified -> Outreach Ready -> Proposal Submitted -> Won/Lost | Grant package | Applications submitted and awards |
| Equity | Inbox -> Qualified -> Outreach Ready -> Contacted -> Meeting Scheduled -> Diligence -> Won/Lost | Investor package | Meetings, diligence starts, commitments |
| Sponsorship | Inbox -> Qualified -> Contacted -> Meeting Scheduled -> Proposal Submitted -> Won/Lost | Sponsorship proposal | Sponsored pilots/events/programs |
| Pilot | Inbox -> Qualified -> Outreach Ready -> Meeting Scheduled -> Diligence -> Won/Lost | Pilot proposal | Paid pilots and design partners |
| Revenue | Inbox -> Qualified -> Outreach Ready -> Contacted -> Meeting Scheduled -> Diligence -> Won/Lost | Product proposal | ARR, services revenue, pilot fees |
| Partnership | Inbox -> Qualified -> Contacted -> Meeting Scheduled -> Diligence -> Proposal Submitted -> Won/Lost | Partnership package | MoUs, channel partners, implementation partners |
| Incubator / Accelerator | Inbox -> Qualified -> Proposal Submitted -> Won/Lost | Application package | Program acceptance and useful benefits |
| Procurement | Inbox -> Qualified -> Proposal Submitted -> Diligence -> Won/Lost | Bid/submission package | Submitted bids and awards |

## Status Hygiene

Every active task must have:

1. One owner.
2. One next action.
3. One source URL.
4. One product match.
5. One funding type.
6. One current status.

Blocked tasks must state the blocker directly in `Next Action`, for example:

```text
Need ComplianceOS one-pager approved before outreach to {organization}.
```

## ClickUp Views

| View | Purpose | Filter |
| ---- | ------- | ------ |
| Daily Command Center | What needs action today | Status not Won/Lost, due today/overdue or next action present |
| Source Inbox | Fresh leads | Status = Inbox |
| Outreach Queue | Ready but unsent | Status = Outreach Ready |
| Follow-Up Queue | Waiting on replies | Status = Contacted and last update older than 3 days |
| Diligence Board | Active high-value work | Status = Diligence or Proposal Submitted |
| Deliverable Blockers | Collateral needed | Linked collateral task status not Approved/Sent |
| Grants Calendar | Deadline-driven work | Funding Type = Grant/Procurement and deadline set |
| Revenue Pipeline | Product revenue and pilots | Funding Type = Revenue/Pilot |

## Weekly Operating Review

Use this agenda for the fundraising team:

1. Pipeline by status and owner.
2. Deadlines inside 30 days.
3. Qualified leads with no outreach.
4. Contacted leads with no response.
5. Diligence requests and collateral blockers.
6. Won/lost/parked learning.
7. Source performance and next week's top 25.

The meeting output is a ClickUp comment on the weekly review task with decisions,
owner changes, priority list changes, and collateral requests.
