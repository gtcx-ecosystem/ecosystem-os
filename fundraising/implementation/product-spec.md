---
title: 'Fundraising Engine Product Specification'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: product-spec
tier: strategic
tags: ['fundraising', 'product-spec', 'agentic-team']
review_cycle: weekly
---

# Fundraising Engine Product Specification

## Product

The GTCX Fundraising Engine is an agentic operating system for finding,
qualifying, pursuing, and closing capital, partnerships, pilots, revenue deals,
startup resources, and ecosystem exposure across Africa and the Global South.

## Problem

GTCX has a large opportunity surface:

- Africa-focused venture and catalytic capital.
- DFIs, MDBs, trade bodies, and public-sector pilots.
- Commodity buyers, refiners, traders, vaults, and banks.
- Accelerators, events, challenges, and startup-resource programs.
- Country-by-country ministries, regulators, producer networks, and ecosystem partners.

Without a system, opportunities are lost in LinkedIn posts, emails, event pages,
funding windows, warm intros, and scattered docs. ClickUp alone cannot hold the
source graph, and a general-purpose assistant cannot run the workflow reliably.

## Users

| User | Job |
| ---- | --- |
| Founder / executive | Decide priorities, approve external moves, lead strategic relationships |
| Fundraising operator | Run daily pipeline, inbox, follow-ups, applications, and reporting |
| Agentic team | Monitor, analyze, draft, prepare, review, and maintain systems |
| Product leads | Supply product proof, collateral, pilot scopes, and diligence responses |
| Advisors / warm intro network | Provide introductions, review decks, validate strategy |

## Product Thesis

Build the intelligence layer separately from the execution layer:

| Layer | System |
| ----- | ------ |
| Intelligence | Source database, organization graph, opportunity map, search queries, scoring, dedupe |
| Execution | ClickUp tasks, owners, statuses, follow-ups, collateral requests, approvals |
| Communication | `hello@gtcx.trade`, aliases, Gmail, Calendar, WhatsApp, LinkedIn manual capture |
| Automation | n8n, RSS, page watch, email labels, calendar sync |
| Future app | Postgres-backed fundraising intelligence app with ClickUp sync |

## In Scope

1. Source intelligence and recurring web/search/email monitoring.
2. ClickUp CRM and pipeline setup.
3. Agentic team workflows and authority model.
4. Email/calendar operations through `hello@gtcx.trade`.
5. Collateral, concept notes, pitch decks, and data-room workflows.
6. Application, challenge, proposal, and program submission workflows.
7. Finance/deal economics review workflows.
8. Daily and weekly operating cadence.
9. Data model and integration specs for future app build.

## Out Of Scope For V1

1. Automated LinkedIn scraping.
2. Autonomous external sending.
3. Autonomous application submissions.
4. Autonomous legal/financial commitments.
5. Paid CRM replacement.
6. Public-facing investor portal.

## Key Capabilities

| Capability | V1 | V2 |
| ---------- | -- | -- |
| Source database | JSON + docs | App-backed Postgres |
| Search query library | Manual/n8n runs | Scheduled search ingestion |
| Source listeners | RSS/page watch/email labels | Full listener dashboard |
| Opportunity scoring | Rules-based | Model-assisted with human review |
| ClickUp sync | n8n/API | App two-way sync |
| Email/calendar | Gmail/Calendar labels + n8n | Inbox dashboard |
| Collateral workflow | ClickUp tasks + templates | Asset library with versioning |
| Finance review | Templates + docs | Model-linked scenario workspace |
| Daily digest | n8n/manual | App dashboard + email digest |

