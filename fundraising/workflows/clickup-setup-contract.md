---
title: 'ClickUp Fundraising Setup Contract'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: implementation-contract
tier: strategic
tags: ['fundraising', 'clickup', 'crm', 'workflow']
review_cycle: on-change
---

# ClickUp Fundraising Setup Contract

This is the exact ClickUp configuration for the GTCX fundraising engine.
After the workspace is configured, record the real ClickUp IDs in a private
runtime config, not in this repo.

## Space

`GTCX Fundraising Engine`

## Folders

| Folder | Purpose |
| ------ | ------- |
| Opportunity Intelligence | Raw and qualified cross-channel leads across capital, pilots, partners, buyers, and revenue |
| Investor Pipeline | VC, angels, family offices, corporate venture, impact investors |
| Catalytic Capital | Africa/Global South catalytic capital, DFI facilities, foundations, and selective challenge programs |
| Partnerships & Pilots | Strategic partners, design partners, DFI/government pilots |
| Revenue Deals | Product portfolio sales opportunities and paid pilots |
| Daily Research Ops | Research tasks, source monitoring, enrichment, daily digest |
| Collateral & Deck Requests | One-pagers, decks, grant attachments, diligence requests |

## Lists

Start with one master list for velocity:

`Fundraising Opportunities`

Add separate pipeline lists only when volume demands it. A single master list
keeps automation simpler in v1.

## Statuses

| Status | Meaning | Automation |
| ------ | ------- | ---------- |
| Inbox | Unreviewed lead | Created by forms, Gmail, n8n, manual capture |
| Qualified | Human confirmed fit | Owner assigned, next action required |
| Outreach Ready | Narrative and collateral ready | Trigger outbound draft |
| Contacted | First outreach sent | Start follow-up timers |
| Meeting Scheduled | Calendar event exists | Trigger agenda and prep task |
| Diligence | Active evaluation | Track requests and documents |
| Proposal Submitted | Pilot, partnership, catalytic capital, challenge, or deal proposal sent | Track deadline / decision date |
| Won | Closed funding, revenue, pilot, or partnership | Trigger evidence capture |
| Lost / Parked | Not active | Record reason and revisit date |

## Custom Fields

| Field | Type | Values / Notes |
| ----- | ---- | -------------- |
| Channel | Dropdown | Gmail, LinkedIn Manual, Africa DFI/MDB, Trade Body, Commodity Body, Regulator/Ministry, Buyer/Trader, Bank/DFI Desk, Foundation/Challenge, VC/Investor, RSS, Newsletter, Referral, Inbound, Event, Manual |
| Funding Type | Dropdown | Catalytic Capital, Equity, Sponsorship, Pilot, Revenue, Partnership, Accelerator, Challenge, Procurement, Technical Assistance |
| Product Match | Label | ComplianceOS, MarketsOS, Nyota, BaselineOS, Griot, Terminal54, LedgerUI, FabricOS, GTCX Core |
| Fit Score | Number | 0-100 |
| Ticket Size | Money | Estimated amount |
| Deadline | Date | Grant close, proposal due, meeting, or decision deadline |
| Source URL | URL | Original source |
| Source Excerpt | Long Text | Short excerpt, not full scraped content |
| Gmail Thread ID | Short Text | Used for reply matching |
| Calendar Event ID | Short Text | Used for meeting sync |
| Drive Folder URL | URL | Diligence/collateral folder |
| Contact Name | Short Text | Primary contact |
| Contact Email | Email | Primary email |
| Organization | Short Text | Funder, investor, buyer, or partner |
| Country / Region | Short Text | Geography |
| Warm Intro Path | Long Text | Who can introduce us |
| Next Action | Long Text | Concrete next step |
| Revisit Date | Date | For parked leads |
| Loss / Park Reason | Dropdown | No fit, too early, no response, not eligible, duplicate, budget mismatch |

## Form: Manual Lead Capture

Use a ClickUp Form connected to `Fundraising Opportunities`.

Required fields:

1. Source URL
2. Channel
3. Funding Type
4. Organization
5. Source Excerpt
6. Why it matters
7. Product Match
8. Suggested next action

Use this for LinkedIn discoveries. The form captures human-selected source
material instead of automated LinkedIn scraping.

## Views

| View | Filter |
| ---- | ------ |
| Daily Inbox | Status = Inbox, sorted by created date |
| Hot Deadlines | Deadline within 14 days, status not Won/Lost |
| Investor Pipeline | Funding Type = Equity |
| Catalytic Capital | Funding Type = Catalytic Capital, Technical Assistance, Challenge, or Procurement |
| Product Revenue | Funding Type = Revenue or Pilot |
| Partnerships | Funding Type = Partnership or Sponsorship |
| No Next Action | Next Action empty, status not Won/Lost |
| Stale Contacted | Status = Contacted, no update in 7 days |

## Required IDs For Automation

Store these as n8n credentials/environment variables:

| Name | Meaning |
| ---- | ------- |
| `CLICKUP_TEAM_ID` | Workspace ID |
| `CLICKUP_SPACE_ID` | Fundraising Space ID |
| `CLICKUP_LIST_ID_FUNDRAISING_OPPORTUNITIES` | Master opportunities list |
| `CLICKUP_FIELD_CHANNEL` | Channel custom field UUID |
| `CLICKUP_FIELD_FUNDING_TYPE` | Funding Type custom field UUID |
| `CLICKUP_FIELD_PRODUCT_MATCH` | Product Match custom field UUID |
| `CLICKUP_FIELD_FIT_SCORE` | Fit Score custom field UUID |
| `CLICKUP_FIELD_SOURCE_URL` | Source URL custom field UUID |
| `CLICKUP_FIELD_GMAIL_THREAD_ID` | Gmail Thread ID custom field UUID |
| `CLICKUP_FIELD_CALENDAR_EVENT_ID` | Calendar Event ID custom field UUID |
| `CLICKUP_FIELD_DRIVE_FOLDER_URL` | Drive Folder URL custom field UUID |
