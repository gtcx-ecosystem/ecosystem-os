---
title: 'n8n Web Source Listener Workflow'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: implementation-spec
tier: strategic
tags: ['fundraising', 'n8n', 'listeners', 'sources', 'clickup']
review_cycle: monthly
---

# n8n Web Source Listener Workflow

This is the implementation spec for converting the source database and search
query library into ClickUp fundraising candidates.

## Workflow: Daily Source Sweep

Trigger:

- Cron: weekdays at 06:30 local team time.

Inputs:

- `fundraising/sources/web-source-database.json`
- `fundraising/sources/search-query-library.json`
- n8n credentials for ClickUp, Gmail, optional search API, and approved structured opportunity APIs.

Nodes:

1. Read source database.
2. Filter sources due today by `cadence`.
3. Split in batches by `listener_type`.
4. Execute listener:
   - `api`: HTTP Request.
   - `rss`: RSS Read.
   - `page_watch`: changedetection.io webhook or HTTP Request + HTML extract.
   - `search_query`: search API or manual import.
   - `newsletter`: Gmail label query.
   - `manual_review`: create review task only.
5. Normalize item to lead candidate.
6. Dedupe against ClickUp by Source URL and source-specific identifiers.
7. Score candidate.
8. Create or update ClickUp task.
9. Add source summary as ClickUp comment.
10. Add candidate to daily digest.

## Workflow: Page Watch Webhook

Trigger:

- changedetection.io webhook when a watched page changes.

Steps:

1. Receive changed page URL.
2. Match URL to `source_id`.
3. Fetch current page snapshot or summary.
4. Extract likely opportunity title, deadline, organization, and action path.
5. If actionable, create/update ClickUp task.
6. If unclear, create ClickUp research task in `Inbox`.

## Workflow: Search Query Sweep

Trigger:

- Cron: daily for priority 1 queries, weekly for priority 2 queries.

Steps:

1. Load `search-query-library.json`.
2. Run due queries through approved search provider or manual export.
3. Keep top results from official, funder, DFI, government, university, and accelerator domains.
4. Drop low-authority reposts unless no official source is found.
5. Create ClickUp `Inbox` task only when there is a clear opportunity or target organization.

## ClickUp Task Mapping

| Lead Candidate | ClickUp Field |
| -------------- | ------------- |
| `title` | Task name |
| `source_channel` | Channel |
| `funding_type` | Funding Type |
| `product_matches` | Product Match |
| `fit_score` | Fit Score |
| `source_url` | Source URL |
| `source_excerpt` | Source Excerpt |
| `organization` | Organization |
| `deadline` | Deadline |
| `next_action` | Next Action |

## Environment Variables

| Name | Purpose |
| ---- | ------- |
| `CLICKUP_LIST_ID_FUNDRAISING_OPPORTUNITIES` | Master fundraising list |
| `CLICKUP_FIELD_SOURCE_URL` | Source URL custom field |
| `CLICKUP_FIELD_FIT_SCORE` | Fit Score custom field |
| `CLICKUP_FIELD_FUNDING_TYPE` | Funding Type custom field |
| `CLICKUP_FIELD_PRODUCT_MATCH` | Product Match custom field |
| `SEARCH_API_KEY` | Optional search-query listener |
| `GMAIL_LABEL_FUNDRAISING_ALERTS` | Newsletter/search alert label |

## Manual Review Rules

Manual review is required when:

1. The source is LinkedIn or another restricted platform.
2. The source is a paid database with export limits.
3. The result is a media article and the official opportunity page is missing.
4. Eligibility is unclear.
5. The opportunity implies legal, financial, or regulatory commitments.
