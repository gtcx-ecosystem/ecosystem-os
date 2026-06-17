---
title: 'Fundraising Agentic Team Operating Model'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-model
tier: strategic
tags: ['fundraising', 'agents', 'team', 'clickup', 'gmail', 'calendar']
review_cycle: monthly
---

# Fundraising Agentic Team Operating Model

GTCX needs an agentic fundraising team that can operate across Africa/Global
South capital, pilots, partnerships, venture, revenue, startup resources, events,
applications, and ecosystem exposure.

The team is not one general-purpose agent. It is a coordinated operating system
of specialized agents with clear responsibilities, shared memory, ClickUp
execution, email/calendar integration, and human approval gates.

## Team Shape

```text
Chief of Staff Agent
  -> Source Intelligence Agent
  -> Opportunity Analyst Agent
  -> CRM / ClickUp Operations Agent
  -> Inbox + Calendar Agent
  -> Outreach Drafting Agent
  -> Capital Collateral + Design Agent
  -> Application + Proposal Agent
  -> Finance + Deal Economics Agent
  -> Diligence + Data Room Agent
  -> Partnership / Sovereign Desk Agent
  -> Revenue / Buyer Desk Agent
  -> Investor Relations Agent
  -> Claims + Compliance Reviewer Agent
```

## Team Roles

| Agent | Mission | Primary Systems | Core Outputs |
| ----- | ------- | --------------- | ------------ |
| Chief of Staff Agent | Orchestrate the fundraising machine and keep priorities coherent | ClickUp, Gmail, Calendar, Drive | Daily brief, weekly agenda, escalation list |
| Source Intelligence Agent | Monitor sources, search queries, events, programs, and organization watchlists | Source DB, n8n, web listeners, ClickUp | New source signals, source freshness, daily source sweep |
| Opportunity Analyst Agent | Convert raw signals into qualified GTCX opportunities | Source DB, opportunity map, lead schema | Fit score, product match, routing note, next action |
| CRM / ClickUp Operations Agent | Keep ClickUp clean, deduped, owner-assigned, and stage-accurate | ClickUp | Task creation, field hygiene, stale-task cleanup |
| Inbox + Calendar Agent | Manage `hello@gtcx.trade`, aliases, labels, meeting flows, reminders | Gmail, Calendar, ClickUp | Thread summaries, draft-ready labels, meeting prep tasks |
| Outreach Drafting Agent | Draft high-quality external messages matched to audience and proof | Gmail drafts, decks, templates | Outreach drafts, follow-up drafts, intro notes |
| Capital Collateral + Design Agent | Create pitch decks, one-pagers, visual assets, branded concept notes, and collateral packages | Fundraising decks, Drive, brand assets, product docs | Deck outline, one-pager, concept note, visual brief, collateral pack |
| Application + Proposal Agent | Prepare applications, challenge submissions, grant packs, and pilot proposals | ClickUp, Drive, docs, source materials | Submission plan, answer drafts, attachments checklist |
| Finance + Deal Economics Agent | Own budgeting, financial models, investment economics, offer analysis, dilution, runway, and deal-term scenarios | Financial models, ClickUp, Drive, fundraising financials | Budget scenarios, runway model, term comparison, economics memo |
| Diligence + Data Room Agent | Maintain investor/partner diligence materials and evidence links | Drive, ClickUp, repo docs | Data room index, diligence tracker, evidence checklist |
| Partnership / Sovereign Desk Agent | Handle DFIs, ministries, regulators, trade bodies, and pan-African institutions | Source DB, ClickUp, Drive | Partner brief, meeting prep, stakeholder map |
| Revenue / Buyer Desk Agent | Handle buyers, refineries, traders, vaults, banks, and paid pilots | ClickUp, decks, product docs | Pilot proposal, buyer brief, commercial ask |
| Investor Relations Agent | Handle VCs, angels, family offices, catalytic capital, and investor updates | ClickUp, Drive, Gmail | Investor brief, update draft, warm-intro plan |
| Claims + Compliance Reviewer Agent | Review claims, risk, source support, and approval readiness | Repo docs, source links, ClickUp | Red-flag note, claim support check, approval gate |

## Authority Levels

| Level | Meaning | Examples |
| ----- | ------- | -------- |
| A0 Observe | Read, summarize, classify | Summarize inbox, scan source pages, classify event leads |
| A1 Prepare | Create internal drafts and tasks | Draft email, create ClickUp task, prepare application outline |
| A2 Recommend | Recommend decision with rationale | Recommend pursue/park, suggest owner, suggest next action |
| A3 Execute Internally | Update internal systems | Move task stage, update fields, create meeting prep task |
| A4 External Action | Send, submit, schedule, accept, commit | Requires human approval unless a narrow template is pre-approved |

Default authority: agents operate at A0-A3. A4 requires human approval.

## Shared Systems

| System | Role |
| ------ | ---- |
| `hello@gtcx.trade` | Managed mailbox for fundraising, accounts, calendar, events, and intake aliases |
| Google Calendar | Meetings, deadlines, event attendance, follow-up reminders |
| Google Drive | Diligence folders, application packages, deck links, submitted evidence |
| ClickUp | Execution layer: opportunity status, owners, next actions, deliverables |
| `fundraising/sources/` | Intelligence layer: sources, watchlists, search queries, opportunity map |
| `fundraising/workflows/` | Operating playbooks and integration specs |
| `fundraising/investor-decks/` | Collateral and narrative source material |

## Daily Operating Loop

Every weekday:

1. Source Intelligence Agent runs source/query/event sweep.
2. Inbox + Calendar Agent processes new `hello@gtcx.trade` messages and calendar changes.
3. Opportunity Analyst Agent scores new signals and proposes routing.
4. CRM Agent dedupes, assigns fields, and creates/updates ClickUp tasks.
5. Chief of Staff Agent publishes daily fundraising brief.
6. Outreach/Application agents draft priority work for human review.
7. Claims Reviewer flags risky claims before external send/submission.

Daily brief sections:

- Top P1 opportunities.
- Hot replies.
- Meetings today/tomorrow.
- Deadlines inside 14 days.
- Drafts ready for human approval.
- Collateral blockers.
- Accounts/applications needing verification.
- Escalations.

## Weekly Operating Loop

Every week:

1. Review active pipeline by opportunity class.
2. Select top 25 opportunities for active pursuit.
3. Review source performance and add missing coverage.
4. Review ClickUp hygiene: no ownerless active tasks, no stale next actions.
5. Review application/proposal deadlines.
6. Review investor/partner conversations and warm-intro paths.
7. Update source database and opportunity backlog.

## Handoff Rules

| From | To | Handoff Object |
| ---- | -- | -------------- |
| Source Intelligence | Opportunity Analyst | Source URL, excerpt, source ID, detected category |
| Opportunity Analyst | CRM Agent | Fit score, product match, funding type, next action |
| CRM Agent | Outreach/Application Agent | ClickUp task with complete required fields |
| Opportunity Analyst | Capital Collateral + Design Agent | Audience, opportunity class, product match, desired asset, proof needed |
| Capital Collateral + Design Agent | Claims Reviewer | Collateral draft, claim list, visuals, source links |
| Outreach/Application Agent | Claims Reviewer | Draft, source links, claims requiring support |
| Finance + Deal Economics Agent | Human Approver | Budget/terms memo, model changes, recommended negotiation posture |
| Claims Reviewer | Human Approver | Approval note with risks and recommended edits |
| Human Approver | Inbox/CRM Agent | Approved send/submission/scheduling instruction |
| Inbox/Calendar Agent | Chief of Staff | Reply/meeting/deadline signal for daily brief |

## Quality Bar

World-class means:

1. Every opportunity has source traceability.
2. Every active task has owner, stage, next action, and product match.
3. Every external message has audience fit and a concrete ask.
4. Every claim is supportable by existing docs, source URLs, or clear inference.
5. Every collateral asset has a target audience, desired action, proof source, version, and approval state.
6. Every financial recommendation states assumptions, sensitivity, risk, and founder/company tradeoff.
7. Every meeting has agenda, desired outcome, prep note, and follow-up task.
8. Every application has deadline, requirements checklist, owner, and submission evidence.
9. Every won/lost/parked item creates a learning note.

## Metrics

| Metric | Weekly Target |
| ------ | ------------- |
| New source signals reviewed | 100+ |
| Qualified opportunities created | 20+ |
| P1 opportunities advanced | 10+ |
| Drafts ready for approval | 10+ |
| Outreach sent after approval | 5-10 |
| Meetings booked | 3+ |
| Applications/proposals submitted | 1-3 |
| Ownerless active tasks | 0 |
| Active tasks with no next action | 0 |
| Drafts sent without human approval | 0 |

## Build Phases

| Phase | Outcome |
| ----- | ------- |
| Phase 1 | Agent-assisted inbox, calendar, ClickUp, and source review with human-approved drafts |
| Phase 2 | Automated source sweeps, scoring, dedupe, daily digest, and account/application trackers |
| Phase 3 | App-backed source graph, opportunity intelligence, ClickUp sync, and team dashboards |
| Phase 4 | Narrow external actions through pre-approved templates and high-confidence guardrails |
