---
title: 'Fundraising Engine Requirements'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: requirements
tier: strategic
tags: ['fundraising', 'requirements', 'controls', 'clickup', 'gmail']
review_cycle: weekly
---

# Fundraising Engine Requirements

## Objective

Build a fundraising operating system that lets GTCX continuously discover,
qualify, pursue, and close Africa/Global South capital, pilots, partnerships,
revenue opportunities, startup programs, and ecosystem exposure with auditable
human control.

## Functional Requirements

| ID | Requirement | V1 System Of Record | Acceptance |
| -- | ----------- | ------------------- | ---------- |
| FR1 | Maintain source database for monitored web links, organizations, events, programs, and queries | `fundraising/sources/` | Every source has owner, listener mode, category, geography, and URL |
| FR2 | Convert source signals into qualified opportunities | ClickUp + source docs | Opportunity has source URL, fit score, class, owner, status, and next action |
| FR3 | Track CRM pipeline and status | ClickUp | No active opportunity lacks owner, deadline, status, or next action |
| FR4 | Manage fundraising email and calendar | Gmail/Calendar + ClickUp | Every relevant thread/meeting maps to a task or contact record |
| FR5 | Produce collateral and deliverables | Drive + ClickUp | Each asset has audience, version, status, claims review, and approval state |
| FR6 | Route finance and deal economics review | ClickUp + financial model docs | All terms, budgets, pricing, runway, dilution, and revenue-share claims are reviewed |
| FR7 | Support applications, proposals, and challenge submissions | ClickUp + Drive | Submission checklist, deadline, attachments, approval, and confirmation are linked |
| FR8 | Publish daily fundraising brief | ClickUp/n8n/manual digest | Brief includes top opportunities, replies, meetings, deadlines, blockers, and approvals |
| FR9 | Maintain agentic team handoffs | Team docs + ClickUp | Handoff includes context, requested output, due date, source links, and approval need |
| FR10 | Preserve human approval for external actions | ClickUp custom field | External sends, submissions, commitments, and sensitive claims require approval |

## Data Requirements

| Entity | Required Fields |
| ------ | --------------- |
| Source | ID, name, URL, category, geography, listener mode, priority, owner, review cadence |
| Organization | Name, type, geography, relevance, relationship status, contacts, source links |
| Signal | Source, URL, excerpt, detected date, deadline, organization, tags, dedupe key |
| Opportunity | Title, type, class, stage, fit score, amount/value, deadline, owner, next action |
| Contact | Name, organization, role, channel, relationship path, consent/context, last touch |
| Deliverable | Type, audience, opportunity, status, version, owner, reviewers, final link |
| Approval | Action, requester, approver, approval state, timestamp, notes, evidence link |

## Integration Requirements

| Integration | Requirement | Constraint |
| ----------- | ----------- | ---------- |
| ClickUp | Primary CRM, task workflow, status tracking, dashboards | Must work manually before app sync |
| Gmail | Managed inbox for `hello@gtcx.trade` and aliases | Agents draft; humans approve sends |
| Calendar | Meeting prep, agenda, follow-up, deadline management | Meetings must link to task/opportunity |
| Drive | Collateral, data room, submissions, evidence | Assets must use controlled folders and version labels |
| n8n | Low-code automation for inbox, calendar, digest, listeners | Automation cannot bypass approval gates |
| LinkedIn | Manual capture, outreach drafting, relationship research | No automated scraping or sending in V1 |
| Web sources | RSS, page watch, search sweeps, manual review | Must save source URL and excerpt |
| Future app | Intelligence database and dashboard | ClickUp remains execution system until migration decision |

## Control Requirements

| Control | Rule |
| ------- | ---- |
| External communications | No send without human approval |
| LinkedIn activity | No automated scraping, posting, connection requests, or messaging in V1 |
| Applications | No submission without eligibility confirmation and approval |
| Finance claims | No budget, valuation, pricing, ROI, dilution, or revenue-share claim without finance review |
| Legal/commercial terms | No signature, commitment, exclusivity, or binding term without human/legal review |
| Claims | No market, regulatory, impact, ESG, traceability, or product claim without evidence link |
| Credentials | Agents do not hold owner credentials unless explicitly delegated through approved systems |
| Data retention | Keep source, communication, approval, and submission evidence linked to the opportunity |

## Non-Functional Requirements

| Area | Requirement |
| ---- | ----------- |
| Auditability | Every opportunity should be reconstructable from source signal to decision |
| Speed | Daily source signals should be triaged within one business day |
| Coverage | System must scale toward all African countries and major Global South capital corridors |
| Dedupe | Duplicate opportunities must merge or link across source, email, LinkedIn, and ClickUp |
| Portability | Core source and workflow data must remain exportable outside any paid SaaS |
| Cost | V1 uses existing/free/open-source tooling wherever possible |
| Security | Access to inbox, calendar, and Drive must follow least privilege |
| Reliability | Manual fallback must exist for every automated workflow |

## MVP Definition

The MVP is complete when GTCX can run a full fundraising week with:

1. A live ClickUp fundraising CRM.
2. `hello@gtcx.trade` labels and aliases mapped to workflows.
3. Daily source review across the seed database, watchlist, and query library.
4. At least 50 processed signals and 10 qualified opportunities.
5. At least 5 approved outreach drafts.
6. Meeting prep and follow-up tasks created for all fundraising meetings.
7. At least 2 collateral assets drafted, reviewed, and linked.
8. Zero external actions without recorded approval.
