---
title: 'Agentic Team Workflows'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: operating-playbook
tier: strategic
tags: ['fundraising', 'agents', 'workflows', 'handoffs']
review_cycle: monthly
---

# Agentic Team Workflows

These workflows turn the fundraising agent roster into repeatable execution.

## Core Flow

```text
Source signal
  -> Opportunity analysis
  -> ClickUp task creation
  -> Owner / product routing
  -> Collateral selection or request
  -> Draft outreach / application / proposal
  -> Claims + finance review
  -> Human approval
  -> External action
  -> Follow-up / meeting / diligence
  -> Close / park / learn
```

## Workflow: New Source Signal

| Step | Agent | Output |
| ---- | ----- | ------ |
| 1 | Source Intelligence | Source signal with URL, excerpt, source ID, and detected category |
| 2 | Opportunity Analyst | Fit score, product match, opportunity class, next action |
| 3 | CRM / ClickUp | New or updated ClickUp task |
| 4 | Chief of Staff | Daily brief inclusion if P1 or urgent |

Handoff object:

```json
{
  "source_url": "",
  "source_excerpt": "",
  "source_id": "",
  "organization": "",
  "opportunity_class": "",
  "product_match": [],
  "fit_score": 0,
  "recommended_next_action": ""
}
```

## Workflow: Outreach

| Step | Agent | Output |
| ---- | ----- | ------ |
| 1 | Opportunity Analyst | Audience and desired action |
| 2 | Capital Collateral + Design | Suggested collateral package |
| 3 | Outreach Drafting | Email/LinkedIn/WhatsApp draft |
| 4 | Claims + Compliance Reviewer | Claim support note |
| 5 | Finance + Deal Economics | Economics note if pricing, valuation, or terms appear |
| 6 | Human Approver | Send / revise / park |
| 7 | Inbox + Calendar | Reply tracking and meeting setup |

## Workflow: Application / Challenge / Program

| Step | Agent | Output |
| ---- | ----- | ------ |
| 1 | Source Intelligence | Program source and deadline |
| 2 | Opportunity Analyst | Fit score and pursue/park recommendation |
| 3 | Application + Proposal | Requirements checklist, answer drafts, attachments |
| 4 | Capital Collateral + Design | Concept note, one-pager, visual assets if needed |
| 5 | Finance + Deal Economics | Budget, use of funds, runway, matching funds analysis |
| 6 | Claims + Compliance Reviewer | Claims and eligibility review |
| 7 | Human Approver | Submit / revise / park |
| 8 | CRM / ClickUp | Submission evidence, deadline, follow-up task |

## Workflow: Investor / Capital Conversation

| Step | Agent | Output |
| ---- | ----- | ------ |
| 1 | Investor Relations | Investor profile and warm-intro plan |
| 2 | Finance + Deal Economics | Ask, runway, use of funds, terms scenarios |
| 3 | Capital Collateral + Design | Investor one-pager/deck/concept note |
| 4 | Outreach Drafting | Intro or follow-up draft |
| 5 | Claims + Compliance Reviewer | Claim and risk review |
| 6 | Human Approver | Send and relationship decision |
| 7 | Diligence + Data Room | Data room and diligence tracker if interested |

## Workflow: Partnership / Sovereign / DFI

| Step | Agent | Output |
| ---- | ----- | ------ |
| 1 | Partnership / Sovereign Desk | Stakeholder map and policy fit |
| 2 | Opportunity Analyst | Product routing and opportunity class |
| 3 | Capital Collateral + Design | Partner brief or concept note |
| 4 | Finance + Deal Economics | Implementation economics and funding model |
| 5 | Outreach Drafting | Formal outreach draft |
| 6 | Claims + Compliance Reviewer | Claims and policy-safety review |
| 7 | Human Approver | Send / schedule / revise |

## Workflow: Revenue / Buyer / Paid Pilot

| Step | Agent | Output |
| ---- | ----- | ------ |
| 1 | Revenue / Buyer Desk | Buyer brief and commercial pain |
| 2 | Opportunity Analyst | Product match and proof needed |
| 3 | Finance + Deal Economics | Pilot pricing, fee model, revenue-share options |
| 4 | Capital Collateral + Design | Buyer one-pager or pilot proposal deck |
| 5 | Outreach Drafting | Commercial outreach draft |
| 6 | Claims + Compliance Reviewer | Claims and evidence review |
| 7 | Human Approver | Send / revise / park |

## Handoff Rules

1. Every handoff happens inside a ClickUp task comment or linked document.
2. Every handoff includes owner, next action, due date, and blocker if any.
3. No draft goes to human approval without source links and claim notes.
4. No financial recommendation goes out without finance review.
5. No collateral goes out without claims review and human approval.

