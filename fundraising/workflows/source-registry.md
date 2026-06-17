---
title: 'Fundraising Source Registry'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-playbook
tier: strategic
tags: ['fundraising', 'sources', 'lead-generation', 'crm']
review_cycle: monthly
---

# Fundraising Source Registry

This registry defines where the fundraising team looks for opportunities, how
each source is monitored, and what qualifies as a captured lead.

## Source Tiers

| Tier | Meaning | Operating Rule |
| ---- | ------- | -------------- |
| Tier 1 | High-fit, high-urgency, repeatable sources | Check daily and route same day if score is 70+ |
| Tier 2 | Useful sources with periodic windows | Check weekly and route only when fit is clear |
| Tier 3 | Long-tail discovery sources | Review monthly or when a specific campaign needs coverage |

## Registry

| Source | Tier | Lead Types | Monitoring Method | Cadence | Capture Standard |
| ------ | ---- | ---------- | ----------------- | ------- | ---------------- |
| Gmail inbound | 1 | Investors, grants, partners, pilots, revenue | Gmail labels -> n8n -> ClickUp | Continuous | Thread ID, sender, org, summary, next action |
| LinkedIn manual search/feed | 1 | Investors, grants, partnerships, events, pilots | Human review + ClickUp form | Daily | Post/profile/org URL, excerpt, author, why it matters |
| African DFI / MDB / trade infrastructure pages | 1 | Catalytic capital, pilots, partnerships, technical assistance | RSS/API/page watch/manual review | Daily | Program URL, funder, country, product fit, next action |
| African bank / DFI innovation desks | 1 | Paid pilots, design partners, strategic capital, regulatory sandbox work | Manual research + page watch | Weekly | Desk/org URL, buyer, decision-maker, pain, proof needed |
| Commodity buyers, refineries, traders, vaults | 1 | Revenue, integrations, verified-supply partnerships | Manual research + page watch | Weekly | Buyer URL, commodity, corridor, compliance pain, commercial ask |
| Sovereign regulator / ministry pages | 1 | Sovereign pilots, MoUs, public-sector implementation | changedetection.io/manual review | Weekly | Ministry/regulator URL, country, mandate, initiative, next action |
| Product portfolio inbound | 1 | Revenue, pilots, design partners | Gmail/forms/manual ClickUp entry | Continuous | Buyer/org, product match, business problem, next meeting/action |
| Warm referrals | 1 | Investors, partners, customers | Manual ClickUp entry | Continuous | Referrer, target org, intro path, ask |
| Newsletters | 2 | Grants, accelerators, ecosystem events | Gmail label or RSS | Weekly | Source URL, sender, deadline, relevance note |
| Accelerator/incubator pages | 2 | Non-dilutive programs, introductions, credits | changedetection.io/manual review | Weekly | Program URL, cohort deadline, benefits, eligibility |
| VC/family office public lists | 2 | Equity, strategic capital | Manual import or curated list | Weekly | Investor URL, thesis, check size if public, warm intro path |
| Events/webinars/conferences | 2 | Partners, funders, buyers, speakers | Manual research | Weekly | Event URL, speaker/sponsor/contact, reason for outreach |
| Government ministry/procurement pages | 2 | Africa/Global South public pilots, MoUs, tenders | changedetection.io/manual review | Weekly | Tender/call URL, ministry, geography, deadline |
| University/innovation challenge pages | 3 | Grants, pilots, credibility programs | Manual review | Monthly | Challenge URL, sponsor, deadline, fit note |
| Open data and public reports | 3 | Strategic targets, funder mapping | Manual research | Monthly | Report URL, target names, thesis note |

## Search Themes

Use these themes across LinkedIn, grants, procurement, newsletters, and funder
pages. Keep exact search strings in private team notes when they include target
people or sensitive strategy.

| Theme | Example Intent |
| ----- | -------------- |
| Digital public infrastructure | Grants and public-sector pilots for identity, registries, compliance, trust, and data exchange |
| Responsible minerals and commodities | Grants, DFI work, refineries, traceability, ASM formalization, EUDR/CSDDD compliance |
| Africa and Global South trade | Market access, export infrastructure, customs, AfCFTA, SME digitization |
| AI for operations/compliance | BaselineOS, evidence systems, due diligence automation, field intelligence |
| Financial inclusion and market infrastructure | GTX Markets, liquidity, collateral, settlement, compliant commodity finance |
| Climate, ESG, and supply chains | ComplianceOS, verification, audit evidence, sustainability reporting |
| Rural productivity and local-language access | Nyota, field agents, WhatsApp access, producer onboarding |

## Non-Core Sources

Generic US grants and US federal procurement are not daily source lanes for
GTCX. Keep them out of the active listener database unless a specific opportunity
is clearly tied to Africa/Global South implementation, African trade
infrastructure, responsible commodities, Black diaspora capital, or named buyer
demand.

## Source-to-CRM Rules

| Situation | Action |
| --------- | ------ |
| Same organization appears from multiple sources | Update the existing ClickUp task unless the opportunity/deadline is materially different |
| Same source has multiple contacts | Keep one opportunity task and add contacts in comments/subtasks |
| Same funder has multiple programs | Create one task per program/deadline |
| LinkedIn post names an opportunity but links elsewhere | Use the canonical program/deal URL as Source URL and keep LinkedIn URL in the source note |
| Source has no deadline | Set next action date, not fake deadline |
| Eligibility is unclear | Keep in `Inbox` with next action `Confirm eligibility` |
| Eligibility clearly excludes GTCX | Move to `Lost / Parked` with reason `not eligible` |

## Daily Source Sweep

Each weekday:

1. Check Gmail fundraising labels.
2. Review LinkedIn manually for saved searches, key people, funders, and partner posts.
3. Review Africa/Global South pilot, buyer, DFI, bank, regulator, and selective challenge sources with deadlines or active windows inside 30 days.
4. Capture only leads with a source URL and a clear next action.
5. Route score 70+ leads to an owner before end of day.
6. Add weak but interesting leads to the research queue, not the active pipeline.

## Weekly Source Review

Each week:

1. Rank sources by qualified leads produced.
2. Remove noisy sources from daily review.
3. Promote sources that generated meetings, replies, or submissions.
4. Add missing target organizations to manual LinkedIn/Gmail watchlists.
5. Update source themes based on product priorities and active campaigns.

## Guardrails

- LinkedIn is a human-sourced signal channel, not an automated scraping target.
- Store excerpts and summaries, not full copied posts or private email bodies.
- Never send outreach from a source unless the source URL, organization, funding
  type, product match, owner, and next action are present.
