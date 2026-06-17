---
title: 'Fundraising Web Listener Operating Model'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-playbook
tier: strategic
tags: ['fundraising', 'sources', 'listeners', 'n8n', 'clickup']
review_cycle: monthly
---

# Fundraising Web Listener Operating Model

This workflow turns the fundraising source database into recurring listening
runs, ClickUp leads, and daily review queues.

## Inputs

| Input | Path | Role |
| ----- | ---- | ---- |
| Source database | `fundraising/sources/web-source-database.json` | Websites, portals, databases, and organizations to monitor |
| GTCX opportunity map | `fundraising/sources/gtcx-opportunity-map.json` | Ecosystem-specific opportunity classes for routing, proof selection, and owner assignment |
| Search queries | `fundraising/sources/search-query-library.json` | Recurring search strings by GTCX funding theme |
| Lead schema | `fundraising/schema/lead.schema.json` | Normalized output contract for ClickUp opportunity creation |

## Listener Types

| Listener | Use For | Tooling | Output |
| -------- | ------- | ------- | ------ |
| API listener | Structured opportunity APIs and public feeds | n8n HTTP Request node | Normalized lead candidate JSON |
| RSS listener | Feeds, grant XML/RSS, media feeds | n8n RSS node | New item candidates |
| Page-watch listener | Portals without feeds | changedetection.io or n8n HTML extraction | Page-change candidate |
| Search-query listener | Thematic open web discovery | Programmable search/manual export | Search result candidates |
| Newsletter listener | Emails and alerts | Gmail label -> n8n | Email-derived lead candidates |
| Manual-review listener | LinkedIn, VC databases, restricted sites | Human review + ClickUp form | Human-approved lead candidate |

## Daily Listener Run

```text
Load source database
  -> select due sources by cadence
  -> fetch source or run query
  -> normalize candidate
  -> dedupe
  -> score
  -> create/update ClickUp task
  -> post daily digest
```

## Normalized Candidate Fields

Every listener should emit these fields before creating or updating ClickUp:

| Field | Required | Notes |
| ----- | -------- | ----- |
| `source_id` | Yes | ID from `web-source-database.json` or `search-query-library.json` |
| `source_url` | Yes | Canonical opportunity, program, article, or source URL |
| `source_channel` | Yes | API, RSS, page watch, search query, newsletter, manual |
| `title` | Yes | Human-readable opportunity title |
| `organization` | If known | Funder, buyer, investor, partner, or publisher |
| `funding_type` | Yes | Catalytic capital, procurement, equity, pilot, revenue, partnership, technical assistance, etc. |
| `regions` | If known | Africa, Ghana, Rwanda, Global South, etc. |
| `deadline` | If known | Do not invent deadlines |
| `source_excerpt` | Yes | Short excerpt or generated summary, not full copied body |
| `product_matches` | Yes | ComplianceOS, GTX Markets, Nyota, BaselineOS, etc. |
| `fit_score` | Yes | Initial 0-100 score |
| `next_action` | Yes | Concrete human action |

## Dedupe Keys

Use these in order:

1. Exact `source_url`.
2. Source-specific ID: notice ID, grant number, solicitation number, call ID.
3. `organization + title + deadline`.
4. Gmail thread ID for newsletter/inbound sources.
5. Manual duplicate review for similar titles from media reposts.

## Listener-to-ClickUp Routing

| Candidate Type | ClickUp Status | Owner Queue |
| -------------- | -------------- | ----------- |
| Fit score 85+ and deadline inside 30 days | Qualified | Same-day owner assignment |
| Fit score 70-84 | Inbox | Qualify within 48 hours |
| Fit score 50-69 | Inbox | Research queue |
| Fit score under 50 | Lost / Parked | Park with reason unless strategic |
| Duplicate of active task | Existing status | Add comment to existing task |
| Page changed but no clear opportunity | Inbox | Research owner confirms relevance |

## Scoring Rules

Start with the operating-model fit score, then add listener-specific modifiers:

| Signal | Adjustment |
| ------ | ---------- |
| Official pilot/procurement/capital/source page | +10 |
| Deadline inside 30 days | +10 |
| Source is priority 1 | +10 |
| Search result only, no official source page yet | -10 |
| Media article without application/contact path | -15 |
| Restricted site or terms-sensitive source | -20 and route to manual review |
| LinkedIn source captured by human with clear URL/context | No penalty |

## Listener Cadence

| Cadence | Use |
| ------- | --- |
| Continuous | Gmail labels and inbound forms |
| Daily | Grant portals, procurement portals, priority page watches, priority search queries |
| Weekly | Accelerators, VC databases, newsletters, events, foundations |
| Monthly | Standards bodies, strategic partners, long-tail research sources |

## Daily Digest Sections

1. New priority 1 leads.
2. Deadlines inside 14 days.
3. High-score search results needing source confirmation.
4. New page changes from priority source pages.
5. Duplicates merged into active opportunities.
6. Manual-review queue: LinkedIn, VC databases, restricted sites, unclear eligibility.

## Guardrails

- Do not scrape LinkedIn, Crunchbase, or other restricted platforms.
- Use APIs, RSS, exports, email alerts, page-watch tools, or human capture where allowed.
- Store short excerpts and summaries, not full pages, articles, or private email bodies.
- Never create an outbound email automatically; create a draft or ClickUp task for human approval.
- Prefer official source URLs over media reposts for pilots, partnerships, catalytic capital, buyer demand, tenders, and application windows.
- Generic US grants and US federal procurement are non-core and should not run as daily listeners.
