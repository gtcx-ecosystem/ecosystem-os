---
title: 'Fundraising Agent Email Operations'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-contract
tier: strategic
tags: ['fundraising', 'gmail', 'agent', 'inbox', 'accounts', 'communications']
review_cycle: monthly
---

# Fundraising Agent Email Operations

This contract defines the mailbox, aliases, labels, permissions, and guardrails
for an agent-assisted fundraising inbox.

## Recommended Mailbox

Use the existing managed mailbox:

```text
hello@gtcx.trade
```

Display name:

```text
GTCX
```

Use this as the managed communications inbox for calendar, email, account
registrations, fundraising operations, and general ecosystem intake. Do not use a
founder's personal mailbox as the automation surface.

Operational rule: fundraising traffic is segmented by aliases, labels, filters,
and ClickUp task links. `hello@gtcx.trade` remains the underlying inbox.

## Public Aliases

Attach aliases or Google Groups that forward into `hello@gtcx.trade`:

| Address | Use |
| ------- | --- |
| `fundraising@gtcx.trade` | General capital, sponsorship, challenge, and investor communication |
| `investors@gtcx.trade` | VC, angel, family office, catalytic capital |
| `partnerships@gtcx.trade` | DFIs, banks, trade bodies, governments, ecosystem partners |
| `pilots@gtcx.trade` | Paid pilots, design partners, public-sector pilots |
| `applications@gtcx.trade` | Accelerator, challenge, grant, and program applications |
| `accounts@gtcx.trade` | Account registrations, portals, tools, startup credits |
| `calendar@gtcx.trade` | Meeting scheduling, calendar invites, event RSVPs |
| `events@gtcx.trade` | Conferences, pitch events, summits, side events, speaker applications |

Use plus-addressing for individual platforms when accepted:

```text
accounts+africarena@gtcx.trade
accounts+gitex@gtcx.trade
applications+abh@gtcx.trade
applications+gsma@gtcx.trade
events+miningindaba@gtcx.trade
calendar+investors@gtcx.trade
```

## Account Creation Rules

The agent may prepare account registrations, but account ownership stays with
GTCX.

| Rule | Requirement |
| ---- | ----------- |
| Legal owner | GTCX entity or named human admin, not the agent |
| Email | Use `accounts@gtcx.trade` or plus-addressed alias |
| Passwords | Store in shared password manager only; never in ClickUp, Gmail, docs, or chat |
| MFA | Use authenticator app/security key owned by human admin or approved vault workflow |
| Recovery | Recovery email and phone must be human-controlled |
| Paid services | Human approval before entering cards, billing, paid tiers, or trials that auto-renew |
| Terms | Human approval before accepting terms with legal, financial, IP, data, or exclusivity implications |

## Gmail Labels

Create these labels in the role mailbox:

| Label | Purpose |
| ----- | ------- |
| `fundraising/inbox` | Unprocessed fundraising email |
| `fundraising/investors` | Investors, angels, family offices, funds |
| `fundraising/partners` | DFIs, banks, governments, trade bodies, ecosystem partners |
| `fundraising/pilots` | Paid pilots, design partners, revenue opportunities |
| `fundraising/applications` | Accelerators, challenges, grants, program submissions |
| `fundraising/accounts` | Platform signups, verification links, portal access |
| `fundraising/calendar` | Meeting invites, scheduling, calendar changes |
| `fundraising/events` | Conferences, summits, side events, speaking, pitch events |
| `fundraising/action-needed` | Human decision required |
| `fundraising/draft-ready` | Agent draft ready for review |
| `fundraising/sent` | Outreach sent |
| `fundraising/replied` | External reply received |
| `fundraising/archive` | Processed and archived |

## ClickUp Mapping

Every actionable email should map to a ClickUp task in `Fundraising Opportunities`.

| Gmail Signal | ClickUp Action |
| ------------ | -------------- |
| New investor/program/partner email | Create or update opportunity task |
| Account verification email | Update account/setup task |
| Positive reply | Move task to `Meeting Scheduled` or `Diligence` |
| Application confirmation | Link confirmation to opportunity |
| Calendar invite or event update | Link event to opportunity and update meeting fields |
| Deadline reminder | Update deadline and daily digest |
| Rejection/no fit | Move to `Lost / Parked` with reason |

Store only summaries and links in ClickUp. Do not copy full private email bodies
unless explicitly needed and approved.

## Agent Permissions

Start with human-approved drafting only.

| Capability | Phase 1 | Phase 2 | Phase 3 |
| ---------- | ------- | ------- | ------- |
| Read labeled fundraising inbox | Yes | Yes | Yes |
| Create ClickUp tasks | Yes | Yes | Yes |
| Draft replies | Yes | Yes | Yes |
| Send emails | No | Human-approved only | Limited approved templates |
| Create portal accounts | Prepare only | Human-approved | Human-approved |
| Accept terms/contracts | No | No | No |
| Enter payment info | No | No | No |
| Delete emails | No | No | No |

## n8n Workflows

| Workflow | Trigger | Output |
| -------- | ------- | ------ |
| Gmail to ClickUp | New email with fundraising label | Create/update opportunity task |
| Account verification tracker | New email with `fundraising/accounts` | Update account setup task |
| Draft response | Task moves to `Outreach Ready` or reply arrives | Gmail draft + ClickUp comment |
| Application deadline watcher | Email or task deadline | Daily digest entry |
| Reply classifier | Reply on tracked thread | Stage update and follow-up task |
| Calendar event sync | New invite or event update | Update ClickUp meeting fields and daily digest |

## Human Approval Gates

Human approval is required before:

1. Sending external email from GTCX.
2. Submitting an application.
3. Accepting terms.
4. Creating accounts that bind GTCX to legal, financial, data, IP, or exclusivity terms.
5. Entering billing details.
6. Sharing confidential docs, decks, financials, source code, or data rooms.
7. Scheduling meetings with government, regulators, banks, DFIs, investors, or buyers.

## Daily Agent Routine

Each weekday:

1. Review new role-mailbox messages.
2. Label and summarize each relevant thread.
3. Create/update ClickUp tasks.
4. Draft replies for human review.
5. Update application/account setup trackers.
6. Add hot replies and deadlines to daily digest.
7. Park spam/no-fit messages.

## Security Baseline

- Enable 2FA on the mailbox.
- Restrict mailbox access to named admins and approved automation credentials.
- Use least-privilege OAuth scopes.
- Store secrets in the approved vault, not repo files.
- Keep account recovery human-controlled.
- Do not give the agent browser-stored passwords in an unmanaged profile.
- Keep audit trail: every sent message, account created, and application submitted
  must link to a ClickUp task.
