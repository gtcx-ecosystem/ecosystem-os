---
title: 'Fundraising Listener Coverage Model'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-model
tier: strategic
tags: ['fundraising', 'sources', 'coverage', 'listeners']
review_cycle: monthly
---

# Fundraising Listener Coverage Model

The fundraising listener system should scale in layers. The goal is not one big
list; it is a repeatable coverage model that can grow from 50 sources to 500,
then 5,000 monitored pages, queries, and organizations.

## Coverage Layers

| Layer | Purpose | Asset |
| ----- | ------- | ----- |
| L1 Canonical sources | Official portals and high-value sources with direct URLs | `web-source-database.json` |
| L2 Organization watchlist | Funders, investors, DFIs, accelerators, trade bodies, and commodity bodies to monitor | `organization-watchlist.json` |
| L3 Country coverage | Region/country search patterns for Africa-wide discovery | `country-coverage.json` |
| L4 Query library | Recurring theme searches for opportunities not tied to one source | `search-query-library.json` |
| L5 Human networks | LinkedIn, referrals, events, advisors, and warm-intro paths | ClickUp manual capture form |

## 100x Target

| Horizon | Target |
| ------- | ------ |
| v1 | 50-100 canonical sources, 15-30 recurring queries |
| v2 | 250-500 monitored organizations/pages, 50-100 recurring queries |
| v3 | 1,000+ monitored URLs plus country-specific source maps |
| v4 | 5,000+ records across URLs, organizations, people, queries, and historical opportunities |

## Source Classes To Keep Expanding

1. Official grant portals.
2. Public procurement portals.
3. MDB and DFI procurement/business-opportunity pages.
4. Bilateral donor calls and business forecasts.
5. Foundation grants and prizes.
6. Africa startup accelerators and incubators.
7. Black founder and underrepresented founder funds.
8. Africa-focused VC and angel networks.
9. Trade bodies, AfCFTA organizations, customs and export agencies.
10. Commodity, responsible sourcing, ESG, traceability, and standards bodies.
11. Country government procurement and innovation agencies.
12. Events, conferences, demo days, and speaker/sponsor lists.
13. Newsletters and media feeds that reveal open funding windows.
14. Product revenue targets: buyers, refineries, exporters, banks, insurers, logistics firms, and compliance teams.

## Expansion Rules

- Prefer official opportunity URLs over media summaries.
- Store organizations separately from opportunities.
- Store query patterns separately from concrete source URLs.
- Mark restricted platforms as `manual_review`.
- Treat pages without feeds as `page_watch`.
- Treat public APIs as `api`.
- Promote sources when they produce qualified ClickUp opportunities.
- Demote sources that produce noise for two review cycles.

## Minimum Record Quality

Every source must have:

1. Stable ID.
2. Name.
3. URL.
4. Source type.
5. Listener type.
6. Cadence.
7. Priority.
8. Region coverage.
9. Funding types.
10. Themes.
11. Capture fields.

Every organization-watchlist entry must have:

1. Name.
2. URL.
3. Themes.
4. Group.
5. Cadence.
6. Priority.

## Operating Review

Monthly source review:

1. Count sources by type, listener, cadence, region, and priority.
2. Count leads produced by source.
3. Count qualified leads produced by source.
4. Promote high-yield sources to daily cadence.
5. Move low-yield daily sources to weekly or monthly.
6. Add missing country and topic coverage.
7. Archive broken or stale links.

