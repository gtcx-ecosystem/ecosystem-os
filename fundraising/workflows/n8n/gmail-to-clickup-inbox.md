---
title: 'n8n Workflow — Gmail to ClickUp Inbox'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: implementation-spec
tier: strategic
tags: ['fundraising', 'n8n', 'gmail', 'clickup']
review_cycle: on-change
---

# n8n Workflow — Gmail to ClickUp Inbox

## Purpose

Create or update ClickUp fundraising tasks from labeled Gmail threads.

## Trigger

Use one of:

- Gmail Trigger node watching labels:
  - `fundraising/inbound`
  - `fundraising/grants`
  - `fundraising/investors`
  - `fundraising/partners`
  - `fundraising/pilots`
- IMAP Email Trigger if Gmail OAuth is not ready.

## Nodes

1. Gmail Trigger
2. Function: normalize email
3. Function: classify funding type
4. HTTP Request: search ClickUp for existing `Gmail Thread ID`
5. IF: existing task found
6. HTTP Request: create ClickUp task when new
7. HTTP Request: update ClickUp task when existing
8. HTTP Request: add ClickUp comment with email summary
9. Gmail: add processed label

## Classification Rules

| Signal | Funding Type |
| ------ | ------------ |
| grant, call for proposals, foundation, award, RFP | Grant |
| investor, VC, fund, partner, principal, seed, Series | Equity |
| sponsor, sponsorship, corporate partner | Sponsorship |
| pilot, design partner, sandbox, cohort | Pilot |
| procurement, tender, contract, solicitation | Procurement |
| customer, subscription, license, paid pilot | Revenue |

## Product Match Rules

| Signal | Product Match |
| ------ | ------------- |
| EUDR, CSDDD, ESG, compliance, supply chain, audit | ComplianceOS |
| capital formation, LP, fund, securities, exchange, SPV | MarketsOS |
| WhatsApp, producer, local language, extension agent | Nyota |
| AI operating system, agent runtime, organizational AI | BaselineOS |
| intelligence, media, African markets, data feed | Griot |
| terminal, research, commodity intelligence | Terminal54 |

## Fit Score v1

Start at 50, then:

- +20 if Africa or Global South is explicit.
- +15 if commodities, trade, compliance, agriculture, mining, or financial infrastructure is explicit.
- +15 if funding type is grant, pilot, partnership, or revenue.
- +10 if deadline is inside 30 days.
- -20 if geography excludes Africa.
- -20 if sector excludes trade, compliance, AI, infrastructure, agriculture, mining, finance, or public goods.

Clamp to 0-100.

## ClickUp Task Name

`{Funding Type}: {Organization or Sender} — {Subject}`

## ClickUp Description

Include:

- Source: Gmail
- Sender
- Subject
- Received date
- Thread ID
- Summary
- Recommended next action
- Original Gmail link if available

## Deduplication

Primary key: `Gmail Thread ID`.

Fallback keys:

- `Source URL`
- sender email + normalized subject
- organization + funding type + deadline

## Human Gate

The workflow may create tasks and comments. It must not send outbound email.
