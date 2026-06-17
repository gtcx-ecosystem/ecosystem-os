---
title: 'Fundraising Engine Implementation Roadmap'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: roadmap
tier: strategic
tags: ['fundraising', 'roadmap', 'implementation']
review_cycle: weekly
---

# Fundraising Engine Implementation Roadmap

## Phase 0: Foundation

Status: in progress.

Deliverables:

- Root-level `fundraising/` package.
- Source database and opportunity map.
- Agentic team roster and authority matrix.
- Email/calendar operating contract for `hello@gtcx.trade`.
- ClickUp setup contract.
- Template library.
- Implementation specs.

Acceptance:

- Docs pass repo checks.
- Roster JSON validates.
- Source JSON validates.

## Phase 1: Manual-First Operating System

Objective: run the fundraising office manually with agent assistance.

Deliverables:

1. `hello@gtcx.trade` aliases and labels configured.
2. ClickUp Space/List/fields/views configured.
3. Task templates created in ClickUp.
4. First 25 forensic backlog items loaded into ClickUp.
5. Daily brief task created and run for five business days.
6. Human approval workflow operational.

Acceptance:

- 50 source signals processed.
- 10 qualified opportunities created.
- 5 drafts created.
- 0 external sends without approval.
- 0 active tasks missing source URL/owner/next action.

## Phase 2: Low-Code Automation

Objective: connect inbox, calendar, and source listeners.

Deliverables:

1. n8n Gmail label -> ClickUp workflow.
2. n8n Calendar -> ClickUp meeting update workflow.
3. n8n daily fundraising digest.
4. RSS listener for feeds.
5. Page-watch webhook for priority sources.
6. Search-query sweep workflow.

Acceptance:

- Inbound emails create/update ClickUp tasks.
- Calendar invites update meeting fields.
- Daily digest posts every weekday.
- Source listener outputs deduped candidates.

## Phase 3: Intelligence App MVP

Objective: build the fundraising intelligence app.

Stack:

- Postgres.
- Next.js or internal web app.
- ClickUp API.
- Gmail/Calendar API.
- n8n for listeners.
- Postgres full-text search or Meilisearch.

MVP Modules:

1. Sources.
2. Organizations.
3. Opportunities.
4. Signals.
5. Search queries.
6. Events.
7. ClickUp sync.
8. Daily digest dashboard.

Acceptance:

- App stores sources, organizations, signals, and opportunities.
- ClickUp sync creates/updates tasks.
- Dedupe works by source URL, organization, and source-specific ID.
- Dashboard shows P1 opportunities and stale tasks.

## Phase 4: Agentic Workbench

Objective: give each agent a controlled operating surface.

Deliverables:

1. Agent work queues.
2. Draft review queue.
3. Claims review queue.
4. Finance review queue.
5. Collateral request board.
6. Human approval dashboard.

Acceptance:

- Every draft has review state.
- Every approval is recorded.
- Every agent action is auditable.

## Phase 5: Scale Coverage

Objective: expand toward continent-wide coverage.

Deliverables:

1. Country source maps for all 54 African countries.
2. Regulator/ministry/procurement source records.
3. Africa investor/contact graph.
4. Events calendar.
5. Buyer/refiner/trader/vault target graph.
6. Producer-network and association graph.

Acceptance:

- 1,000+ monitored records.
- 100+ recurring queries.
- 54-country coverage.
- Weekly source quality report.

