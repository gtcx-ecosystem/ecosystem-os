---
title: 'Fundraising Agent Authority Matrix'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: control-matrix
tier: strategic
tags: ['fundraising', 'agents', 'authority', 'approval']
review_cycle: monthly
---

# Fundraising Agent Authority Matrix

Agents can accelerate the fundraising office, but they cannot become the legal,
financial, or relationship authority for GTCX.

## Authority Matrix

| Action | Agent Allowed | Human Approval | Notes |
| ------ | ------------- | -------------- | ----- |
| Read labeled `hello@gtcx.trade` mail | Yes | No | Only approved labels/aliases |
| Summarize email thread | Yes | No | Store summary, not full private body |
| Create ClickUp task | Yes | No | Must include source link and next action |
| Update ClickUp fields | Yes | No | Internal execution only |
| Move task to `Qualified` | Yes | No | If required fields and score are present |
| Move task to `Lost / Parked` | Yes | No | Must include reason |
| Draft outbound email | Yes | No | Draft only |
| Create pitch deck / one-pager / concept note draft | Yes | No | Draft only; must include audience and proof sources |
| Create visual asset or branded collateral | Yes | Review before external use | Must follow brand and claim support rules |
| Publish or send collateral externally | No | Yes | External representation |
| Use generated/stock imagery in external collateral | Draft only | Yes | Rights and brand review required |
| Send outbound email | No | Yes | Unless later covered by approved narrow template |
| Reply to investor/DFI/bank/buyer | Draft only | Yes | Human relationship control |
| Schedule meeting | Propose only | Yes | Human approves external meeting |
| Create calendar hold | Yes | No | Internal hold only |
| Accept external calendar invite | No | Yes | External commitment |
| Create portal account | Prepare only | Yes | Human controls MFA/recovery |
| Accept terms | No | Yes | Legal gate |
| Submit application | No | Yes | External representation |
| Enter billing/payment info | No | Yes | Financial gate |
| Change financial model assumptions | Draft only | Yes | Finance lead prepares; human approves |
| Recommend budget allocation | Yes | Review for material decisions | Must show assumptions and tradeoffs |
| Analyze SAFE/equity/debt/revenue-share terms | Yes | Yes before negotiation/use | Not legal advice; requires human/legal review |
| Quote valuation, dilution, runway, or pricing externally | No | Yes | External financial representation |
| Share deck/data room | No | Yes | Confidentiality gate |
| Make legal/financial claim | No | Yes | Claims reviewer must inspect first |
| Update source database | Yes | No | Internal intelligence |
| Add organization to watchlist | Yes | No | Internal intelligence |
| Recommend pursue/park | Yes | No | Recommendation only |

## Escalation Triggers

Escalate immediately when an item involves:

1. Legal terms.
2. Payment, billing, or bank details.
3. Equity, SAFE, debt, revenue share, exclusivity, or IP terms.
4. Government, regulator, DFI, bank, investor, buyer, or press relationship.
5. Confidential decks, data rooms, financial models, or private source material.
6. Claims about production readiness, signed mandates, regulatory status, or revenue.
7. New branded collateral, investor deck, concept note, or visual asset intended for external use.
8. Any uncertainty about whether an external action binds GTCX.

## Approval Record

Every external action should leave an approval record in ClickUp:

```text
Approved by:
Approved action:
Date/time:
Related draft/link:
Material risks:
Follow-up owner:
```
