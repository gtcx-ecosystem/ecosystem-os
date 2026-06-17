---
title: 'Fundraising Workflow Operating Model'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-model
tier: strategic
tags: ['fundraising', 'workflow', 'sources', 'crm', 'pipeline', 'deliverables']
review_cycle: on-change
---

# Fundraising Workflow Operating Model

This is the day-to-day operating model for the GTCX fundraising engine. It
covers sources, CRM intake, pipeline/status tracking, deliverables, review
cadence, and handoffs.

Supporting workflow contracts:

- [`source-registry.md`](./source-registry.md) defines source tiers, capture
  rules, and daily/weekly source review.
- [`pipeline-deliverables-matrix.md`](./pipeline-deliverables-matrix.md)
  defines status gates, required artifacts, and ClickUp operating views.

## Workflow Spine

```text
Sources
  -> Lead Capture
  -> CRM Intake
  -> Qualification
  -> Routing
  -> Deliverable Selection
  -> Outreach / Submission
  -> Follow-up
  -> Diligence / Negotiation
  -> Close / Park / Learn
```

ClickUp is the operating system for the workflow. Every lead, opportunity,
deliverable request, meeting, follow-up, and close decision should be visible in
ClickUp.

## Source Channels

| Source | Capture Method | Owner | Frequency | Notes |
| ------ | -------------- | ----- | --------- | ----- |
| LinkedIn manual search | ClickUp lead capture form | Research owner | Daily | No automated LinkedIn scraping. Capture URL, excerpt, author, org, and why it matters. |
| Gmail inbound | Gmail label -> n8n -> ClickUp | Ops owner | Continuous | Labels: `fundraising/inbound`, `fundraising/grants`, `fundraising/investors`, `fundraising/partners`, `fundraising/pilots`. |
| Africa DFI / MDB / trade infrastructure pages | RSS/API/page watch | Partnerships owner | Daily | AfDB, IFC, World Bank Africa programs, Afreximbank, TradeMark Africa, FSD Africa, AfCFTA, regional bodies. |
| African bank / DFI innovation desks | Manual research + page watch | Revenue owner | Weekly | Tier-2 African banks, trade finance teams, capital markets desks, and DFI portfolio teams. |
| Commodity buyers, refineries, traders, vaults | Manual research + page watch | Revenue owner | Weekly | Buyer demand, responsible sourcing, verified supply, custody, collateral, and integration opportunities. |
| Sovereign regulators and ministries | Manual research + page watch | Partnerships owner | Weekly | Mines ministries, minerals commissions, trade ministries, customs, export agencies, financial regulators. |
| Accelerator/incubator pages | RSS or changedetection.io | Startup programs owner | Weekly | Track cohorts, deadlines, sector fit, non-dilutive benefits. |
| VC/family office databases | Manual export/import | Investor owner | Weekly | OpenVC and public investor lists; no paid dependency required. |
| Events/webinars | Manual capture | Partnerships owner | Weekly | Capture speakers, sponsors, attendee lists where public/allowed. |
| Product portfolio inbound | Gmail/form/manual | Revenue owner | Continuous | Paid pilots, subscription prospects, strategic customers. |
| Referrals | Manual or Gmail | Founding executive | Continuous | Highest-priority path; always record warm intro path. |

## Lead Capture Contract

Every captured lead must include:

| Field | Required | Why |
| ----- | -------- | --- |
| Source URL | Yes | Traceability and dedupe |
| Source Channel | Yes | Channel performance |
| Funding Type | Yes | Routing and deliverable selection |
| Organization | Yes | CRM entity |
| Contact Name / Email | If known | Outreach and relationship tracking |
| Source Excerpt | Yes | Context without copying full pages/posts |
| Product Match | Yes | Portfolio routing |
| Why It Matters | Yes | Human judgment and prioritization |
| Deadline | If known | Daily digest and urgency |
| Ticket Size | If known | Pipeline value |
| Suggested Next Action | Yes | Avoid dead tasks |

## CRM Intake

All leads enter the ClickUp list `Fundraising Opportunities` with status
`Inbox`.

Intake rules:

1. Dedupe by source URL, Gmail thread ID, organization, and deadline.
2. Set funding type and channel.
3. Assign an initial product match.
4. Assign first-pass fit score.
5. Add next action.
6. Assign owner if fit score is 70 or higher.
7. Park or reject immediately if eligibility is impossible.

## Pipeline Statuses

| Status | Entry Criteria | Exit Criteria | Required Deliverable |
| ------ | -------------- | ------------- | -------------------- |
| Inbox | Captured from any source | Human reviewed | Source summary |
| Qualified | Fit confirmed, no hard eligibility blocker | Owner and next action set | Qualification note |
| Outreach Ready | Narrative and collateral selected | Outreach sent or proposal started | Outreach draft or submission plan |
| Contacted | First outreach sent | Reply, meeting, or no-response follow-up | Sent email/link record |
| Meeting Scheduled | Calendar event exists | Meeting held or cancelled | Agenda/prep note |
| Diligence | Active back-and-forth | Proposal submitted, closed, or parked | Diligence request tracker |
| Proposal Submitted | Formal proposal/deck/application submitted | Decision or follow-up requested | Submitted package |
| Won | Capital/revenue/pilot/partnership accepted | Evidence archived | Close note and evidence links |
| Lost / Parked | Not active | Revisit date or closed learning | Loss/park reason |

## Fit Scoring

Use a simple 100-point score until enough data exists for a model.

| Factor | Points |
| ------ | ------ |
| Africa / Global South explicit | +20 |
| Commodity trade, compliance, agriculture, mining, finance, infrastructure, AI, or public goods explicit | +20 |
| Matches a priority product narrative | +20 |
| Clear deadline or active buying/funding window | +15 |
| Warm intro path exists | +10 |
| Ticket size above $50K or strategic non-cash value | +10 |
| Named decision-maker/contact available | +5 |
| Geography excludes Africa or eligibility excludes GTCX | -30 |
| No plausible owner or next action | -20 |

Priority thresholds:

| Score | Action |
| ----- | ------ |
| 85-100 | Same-day owner assignment and outreach/submission plan |
| 70-84 | Qualify within 48 hours |
| 50-69 | Research queue |
| 0-49 | Park unless strategically important |

## Routing

| Lead Type | Primary Owner | Product/Narrative Default | Deliverable Default |
| --------- | ------------- | ------------------------- | ------------------- |
| EUDR / CSDDD / ESG / supply chain compliance | Compliance lead | ComplianceOS | ComplianceOS one-pager + EUDR proof-point brief |
| Capital formation / LP / exchange / SPV / frontier finance | Markets lead | MarketsOS / GTX Markets | GTX Markets executive brief + first-deals narrative |
| Producer access / WhatsApp / local-language commodity intelligence | Nyota lead | Nyota | Nyota pilot one-pager |
| Organizational AI / agent runtime / evidence / baseline | Baseline lead | BaselineOS | BaselineOS design-partner brief |
| Data/media/intelligence feeds | Intelligence lead | Griot / Terminal54 | FIFTY-FOUR/Terminal brief |
| Public-sector digital infrastructure | Partnerships lead | Ecosystem / ComplianceOS / BaselineOS | Ecosystem infrastructure brief |
| Paid pilot / enterprise buyer | Revenue lead | Relevant product | Product-specific pilot proposal |

## Deliverable System

Deliverables are tracked as ClickUp tasks in `Collateral & Deck Requests` and
linked back to the opportunity.

| Deliverable | Use When | Source |
| ----------- | -------- | ------ |
| Ecosystem one-pager | General investor/partner intro | `fundraising/investor-decks/ecosystem/` |
| ComplianceOS one-pager | EUDR, ESG, CSDDD, DFI, compliance buyer | Product GTM docs + compliance deck |
| GTX Markets brief | Capital formation, LP, family office, dealer-broker | `fundraising/investor-decks/gtx-markets/` |
| Nyota pilot brief | Cooperatives, DFI field programs, extension agents | Nyota PRD and README |
| BaselineOS design-partner brief | AI runtime, organizational AI, evidence systems | BaselineOS positioning canon |
| Grant application pack | Grant/foundation submission | Opportunity-specific template |
| Pilot proposal | Revenue/pilot/customer opportunity | Product-specific pilot scope |
| Diligence folder | Active diligence | Google Drive folder linked from ClickUp |
| Follow-up email | After meeting/reply | Gmail draft linked from ClickUp |

Deliverable statuses:

| Status | Meaning |
| ------ | ------- |
| Requested | Opportunity owner needs collateral |
| Drafting | Owner/writer assigned |
| Review | Human review needed |
| Approved | Ready to send |
| Sent / Submitted | Delivered to external party |
| Archived | Evidence stored and linked |

## Daily Workflow

Every weekday:

1. Review new `Inbox` leads.
2. Assign owners to score 70+ leads.
3. Move same-day opportunities to `Outreach Ready`.
4. Check `Hot Deadlines`.
5. Review Gmail replies and meeting follow-ups.
6. Close stale no-action items or set next action.
7. Publish daily digest.

Daily output:

- Top 10 new leads.
- Hot replies.
- Meetings today/tomorrow.
- Deadlines inside 14 days.
- Outreach ready but unsent.
- Collateral blockers.
- Owner-specific next actions.

## Weekly Workflow

Every week:

1. Review channel performance.
2. Review pipeline value by funding type.
3. Review win/loss/park reasons.
4. Refresh priority source list.
5. Select top 25 opportunities for active pursuit.
6. Identify missing collateral.
7. Update fundraising board metrics.

Weekly metrics:

| Metric | Target |
| ------ | ------ |
| New leads captured | 50+ |
| Qualified leads | 15+ |
| Outreach sent | 10+ |
| Meetings booked | 3+ |
| Proposals/applications submitted | 2+ |
| No-next-action tasks | 0 |
| Stale contacted tasks | 0 over 14 days |

## Close / Evidence

When a lead closes as won:

1. Move task to `Won`.
2. Add close note with amount/value, terms, owner, and next operational handoff.
3. Link signed docs, email confirmation, Drive folder, and proposal.
4. Create implementation handoff task in the relevant product repo/workstream.
5. Add learning note: what narrative/source/channel worked.

When a lead is lost or parked:

1. Move to `Lost / Parked`.
2. Set reason.
3. Set revisit date if useful.
4. Capture learning note.

## Guardrails

- Do not automate LinkedIn scraping.
- Do not send external outreach without human approval.
- Do not store full private email bodies in daily digests.
- Do not claim production readiness beyond product evidence.
- Do not let any active opportunity remain without an owner and next action.
