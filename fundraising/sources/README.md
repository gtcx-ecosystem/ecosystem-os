---
title: 'Fundraising Sources'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: index
tier: strategic
tags: ['fundraising', 'sources', 'listeners', 'database']
review_cycle: monthly
---

# Fundraising Sources

This package is the seed source database for the GTCX fundraising listener
system. It is designed to feed ClickUp and n8n with recurring source checks,
web searches, and manual capture workflows.

## Files

| File | Purpose |
| ---- | ------- |
| [`web-source-database.json`](./web-source-database.json) | Machine-readable database of websites, portals, funders, investors, accelerators, and partner sources to monitor |
| [`organization-watchlist.json`](./organization-watchlist.json) | High-value organizations to monitor for grants, capital, partnerships, pilots, events, and procurement |
| [`country-coverage.json`](./country-coverage.json) | Africa regional/country search patterns for source expansion and recurring discovery |
| [`gtcx-opportunity-map.json`](./gtcx-opportunity-map.json) | Ecosystem-derived opportunity classes for routing leads to products, proofs, and owners |
| [`forensic-africa-opportunity-landscape-2026.md`](./forensic-africa-opportunity-landscape-2026.md) | Forensic landscape memo for Africa/Global South funding, venture, pilots, events, and resources |
| [`forensic-tracking-backlog.json`](./forensic-tracking-backlog.json) | Compact backlog of high-priority opportunities/resources to convert into ClickUp monitoring tasks |
| [`search-query-library.json`](./search-query-library.json) | Recurring web search queries by GTCX funding theme |
| [`source.schema.json`](./source.schema.json) | JSON Schema for source database entries |
| [`validate-sources.mjs`](./validate-sources.mjs) | Local validator for sources, queries, watchlists, and country coverage |
| [`listener-coverage-model.md`](./listener-coverage-model.md) | Coverage model for scaling from v1 sources to thousands of monitored records |
| [`ecosystem-opportunity-review.md`](./ecosystem-opportunity-review.md) | GTCX-specific opportunity review for Africa/Global South capital, pilots, revenue, and partnerships |

## Operating Rule

Sources are raw intelligence. A source becomes a ClickUp opportunity only when
there is a specific opportunity, contact, deadline, program, fund, procurement,
grant, pilot, partnership, or warm path worth pursuing.

## Priority Themes

1. Africa and Global South trade.
2. Commodities, responsible minerals, agriculture, and supply chains.
3. Digital public infrastructure, compliance, identity, registries, and trust.
4. African founder, Black diaspora, frontier-market, and catalytic infrastructure capital.
5. Sovereign pilots, African bank/DFI partnerships, commodity buyer revenue, telecom/mobile money distribution, and selective Global South grants/challenges.

## Non-Core

Generic US grants and US federal procurement are not active daily source lanes.
Only include US-linked sources when they are clearly Africa/Global South
implementation capital, Black diaspora capital, buyer demand, or strategic network
access.
