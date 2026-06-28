---
title: 'GTCX Hybrid Structure: Commercial Products + User-Owned Exchange'
status: current
date: 2026-05-26
owner: canon-os
tier: operating
tags: ['runbook', 'documentation']
review_cycle: on-change
document_type: runbook
---

# GTCX Hybrid Structure: Commercial Products + User-Owned Exchange

## The Insight

**Separate the layers:**

| Layer                                | Entity             | Model                    | Why                                             |
| ------------------------------------ | ------------------ | ------------------------ | ----------------------------------------------- |
| **Verification** (TradePass, GeoTag) | Commercial company | VC-backed, equity upside | Innovation layer — patentable, competitive moat |
| **Exchange/Clearing** (GTCX)         | User-owned utility | Cooperative, cost-plus   | Trust layer — must be neutral, no single owner  |

**You make money on the tools. You keep the exchange pure.**

---

## Real-World Precedents

This isn't novel. It's how critical infrastructure often works:

| Infrastructure    | Commercial Layer                              | Utility Layer                                  |
| ----------------- | --------------------------------------------- | ---------------------------------------------- |
| **Stock markets** | Trading technology vendors (Nasdaq tech, FIS) | Exchange itself (some user-owned, some public) |
| **Banking**       | Core banking software (Temenos, FIS)          | Payment rails (SWIFT = cooperative)            |
| **Credit cards**  | Processors (Stripe, Adyen)                    | Network (Visa/MC were cooperatives before IPO) |
| **Commodities**   | Price reporting (Platts, Argus)               | Exchanges (LME was member-owned until 2012)    |
| **Telecom**       | Equipment vendors (Ericsson, Nokia)           | Network (some co-ops, especially rural)        |

**The pattern:** Commercial companies build and sell the technology. The network/exchange that requires trust is user-owned.

---

## The GTCX Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMMERCIAL LAYER                             │
│                  (VC-backed, equity upside)                      │
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │   TradePass™     │         │    GeoTag™       │              │
│  │   Technologies   │         │   Technologies   │              │
│  │                  │         │                  │              │
│  │ • Identity SDK   │         │ • Location SDK   │              │
│  │ • Biometric APIs │         │ • Anti-spoof     │              │
│  │ • Trust scoring  │         │ • Env fingerprint│              │
│  │ • ZK proof libs  │         │ • Offline sync   │              │
│  └────────┬─────────┘         └────────┬─────────┘              │
│           │                            │                         │
│           │ Licenses / SaaS            │                         │
│           │                            │                         │
└───────────┼────────────────────────────┼─────────────────────────┘
            │                            │
            ▼                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      UTILITY LAYER                               │
│              (User-owned, cost-plus, neutral)                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    GTCX Exchange                          │   │
│  │                                                           │   │
│  │  • OriginMark™ certificate issuance                      │   │
│  │  • Producer ↔ Buyer matching                             │   │
│  │  • Settlement and clearing                               │   │
│  │  • Compliance verification                               │   │
│  │  • Audit trail / chain of custody                        │   │
│  │                                                           │   │
│  │  Owned by: Producers, Buyers, Governments, DFIs          │   │
│  │  Governed by: Multi-stakeholder board                    │   │
│  │  Priced at: Cost + 10% reserve                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Why This Works

### For the Commercial Layer (TradePass/GeoTag)

| Factor                   | Benefit                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Clear IP ownership**   | Patents, trade secrets, defensible moat                                                              |
| **Multiple customers**   | GTCX Exchange is one customer, but also: other exchanges, governments, banks, supply chain companies |
| **VC-compatible**        | Standard equity structure, clear exit path                                                           |
| **Innovation incentive** | Profit motive drives R&D investment                                                                  |
| **Pricing power**        | Charge market rates (not cost-plus)                                                                  |

### For the Utility Layer (GTCX Exchange)

| Factor                | Benefit                                      |
| --------------------- | -------------------------------------------- |
| **Neutral ownership** | No single party controls the exchange        |
| **Government trust**  | "You own part of this" conversation          |
| **Cost-plus pricing** | Lowest sustainable fees for users            |
| **No exit risk**      | Infrastructure persists regardless of market |
| **Mission alignment** | Ubuntu Economics in legal form               |

### For You (Founder)

| Factor                       | Benefit                                            |
| ---------------------------- | -------------------------------------------------- |
| **Equity upside**            | TradePass/GeoTag have real exit potential          |
| **Mission integrity**        | Exchange stays pure, user-owned                    |
| **Multiple revenue streams** | Equity + service contracts + board seat            |
| **Defensible position**      | Exchange depends on your technology                |
| **Narrative coherence**      | "We built the tools AND kept the exchange neutral" |

---

## Revenue Model

### TradePass Technologies (Commercial)

| Customer                  | Product                   | Pricing                 | Year 3 Revenue |
| ------------------------- | ------------------------- | ----------------------- | -------------- |
| GTCX Exchange             | Identity verification API | $0.05-0.10/verification | $500K          |
| Other commodity exchanges | White-label identity      | $200K-500K/year license | $400K          |
| Governments               | National ID integration   | $100K-300K/year         | $300K          |
| Banks/DFIs                | KYC-as-a-service          | $0.15-0.25/verification | $200K          |
| Supply chain companies    | Worker verification       | $0.10/verification      | $100K          |
| **Total**                 |                           |                         | **$1.5M**      |

| Customer                  | Product                   | Pricing                 | Year 5 Revenue |
| ------------------------- | ------------------------- | ----------------------- | -------------- |
| GTCX Exchange             | Identity verification API | $0.05/verification      | $2.0M          |
| Other commodity exchanges | White-label identity      | $300K-750K/year         | $1.5M          |
| Governments               | National ID integration   | $150K-500K/year         | $1.0M          |
| Banks/DFIs                | KYC-as-a-service          | $0.10-0.20/verification | $1.0M          |
| Supply chain companies    | Worker verification       | $0.08/verification      | $500K          |
| **Total**                 |                           |                         | **$6.0M**      |

### GeoTag Technologies (Commercial)

| Customer                  | Product                   | Pricing            | Year 3 Revenue |
| ------------------------- | ------------------------- | ------------------ | -------------- |
| GTCX Exchange             | Location verification API | $0.03-0.05/geotag  | $300K          |
| Other commodity exchanges | White-label location      | $150K-400K/year    | $300K          |
| Supply chain companies    | Provenance verification   | $0.05/verification | $200K          |
| Logistics companies       | Anti-fraud location       | $0.02/check        | $100K          |
| Insurance                 | Claims verification       | $0.10/claim        | $100K          |
| **Total**                 |                           |                    | **$1.0M**      |

| Customer                  | Product                   | Pricing            | Year 5 Revenue |
| ------------------------- | ------------------------- | ------------------ | -------------- |
| GTCX Exchange             | Location verification API | $0.03/geotag       | $1.5M          |
| Other commodity exchanges | White-label location      | $250K-600K/year    | $1.0M          |
| Supply chain companies    | Provenance verification   | $0.04/verification | $800K          |
| Logistics companies       | Anti-fraud location       | $0.015/check       | $400K          |
| Insurance                 | Claims verification       | $0.08/claim        | $300K          |
| **Total**                 |                           |                    | **$4.0M**      |

### Combined Commercial Revenue

| Year | TradePass | GeoTag | Combined | Growth |
| ---- | --------- | ------ | -------- | ------ |
| 1    | $100K     | $50K   | $150K    | —      |
| 2    | $400K     | $250K  | $650K    | 333%   |
| 3    | $1.5M     | $1.0M  | $2.5M    | 285%   |
| 4    | $3.5M     | $2.5M  | $6.0M    | 140%   |
| 5    | $6.0M     | $4.0M  | $10.0M   | 67%    |
| 6    | $8.0M     | $5.5M  | $13.5M   | 35%    |
| 7    | $10.0M    | $7.0M  | $17.0M   | 26%    |

---

### GTCX Exchange (User-Owned Utility)

The exchange charges fees to cover operations, not to generate profit for shareholders.

| Revenue Stream                   | Year 3    | Year 5    | Year 7     |
| -------------------------------- | --------- | --------- | ---------- |
| Transaction fees (0.1% of value) | $500K     | $3.0M     | $10.0M     |
| Membership dues                  | $100K     | $300K     | $500K      |
| OriginMark certificates          | $50K      | $200K     | $500K      |
| **Total Revenue**                | **$650K** | **$3.5M** | **$11.0M** |

| Expense                           | Year 3    | Year 5     | Year 7    |
| --------------------------------- | --------- | ---------- | --------- |
| TradePass license                 | $150K     | $500K      | $1.5M     |
| GeoTag license                    | $100K     | $300K      | $1.0M     |
| Operations (staff, infra)         | $300K     | $1.5M      | $5.0M     |
| Governance/compliance             | $50K      | $200K      | $500K     |
| Reserve (10%)                     | $50K      | $350K      | $1.1M     |
| **Total Expenses**                | **$650K** | **$2.85M** | **$9.1M** |
| **Surplus (returned to members)** | **$0**    | **$650K**  | **$1.9M** |

**Key insight:** TradePass and GeoTag are _customers_ of the exchange too — but they're also _vendors_. The exchange pays them for verification services. This is a real, arm's-length business relationship.

---

## Founder Economics (Revised)

### Commercial Equity Path

You own equity in TradePass Technologies and GeoTag Technologies (combined or separate entities).

**Financing:**
| Round | Valuation (Post) | Raised | Founder Ownership |
|-------|------------------|--------|-------------------|
| Founding | $1M | $0 | 100% |
| Seed | $10M | $3.5M | 65% |
| Series A | $35M | $8M | 49% |
| Series B | $100M | $20M | 39% |

**Exit Scenarios (Year 7):**

| Outcome | Revenue Multiple | Exit Value | Founder Take (39%) |
| ------- | ---------------- | ---------- | ------------------ |
| Modest  | 4x on $10M       | $40M       | $15.6M             |
| Good    | 6x on $15M       | $90M       | $35.1M             |
| Great   | 8x on $17M       | $136M      | $53M               |

**Probability-Weighted:**
| Outcome | Value | Probability | Weighted |
|---------|-------|-------------|----------|
| Failure | $0 | 35% | $0 |
| Acqui-hire | $3M | 15% | $450K |
| Modest | $15.6M | 25% | $3.9M |
| Good | $35.1M | 18% | $6.3M |
| Great | $53M | 7% | $3.7M |
| **Expected Value** | | | **$14.4M** |

### Plus: Exchange Governance Role

As founder of the technology companies, you'd likely have:

- Board observer seat on GTCX Exchange
- Technical advisory role (paid)
- Ongoing service contracts for protocol development

| Year | Advisory/Service Fee |
| ---- | -------------------- |
| 1-3  | $50K/year            |
| 4-7  | $100K/year           |
| 8+   | $150K/year           |

Not huge, but ongoing income regardless of exit.

### Total Founder Outcome

| Component                         | Value      |
| --------------------------------- | ---------- |
| Salary (7 years)                  | $1.2M      |
| Commercial equity exit (expected) | $14.4M     |
| Advisory fees (15 years)          | $1.5M      |
| **Total Expected**                | **$17.1M** |

**Median outcome: ~$7-10M** (modest exit + salary + fees)

---

## Structure Comparison

| Model                   | Founder Expected Value | Exchange Purity | Mission Alignment | Complexity |
| ----------------------- | ---------------------- | --------------- | ----------------- | ---------- |
| **All VC-backed**       | $11.3M                 | ❌ Low          | ❌ Low            | Low        |
| **All user-owned**      | $4.4M                  | ✅ High         | ✅ High           | Medium     |
| **Hybrid (this model)** | $17.1M                 | ✅ High         | ✅ High           | High       |

**The hybrid model wins on all dimensions except complexity.**

---

## Legal Structure

### Entity Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    FOUNDER / HOLDING                             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  GTCX Holding (Delaware or Cayman)                       │    │
│  │  • Founder: 65% (post-seed)                              │    │
│  │  • Investors: 35%                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                    │                                             │
│        ┌──────────┴───────────┐                                 │
│        ▼                      ▼                                 │
│  ┌───────────────┐    ┌───────────────┐                        │
│  │ TradePass     │    │ GeoTag        │                        │
│  │ Technologies  │    │ Technologies  │                        │
│  │ (Delaware)    │    │ (Delaware)    │                        │
│  │               │    │               │                        │
│  │ 100% owned by │    │ 100% owned by │                        │
│  │ GTCX Holding  │    │ GTCX Holding  │                        │
│  └───────────────┘    └───────────────┘                        │
│        │                      │                                 │
│        │ License              │ License                         │
│        ▼                      ▼                                 │
└────────┼──────────────────────┼─────────────────────────────────┘
         │                      │
         ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    USER-OWNED UTILITY                            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  GTCX Exchange Foundation (Swiss)                        │    │
│  │                                                          │    │
│  │  Members:                                                │    │
│  │  • Mining cooperatives (25%)                             │    │
│  │  • Refineries/Buyers (25%)                               │    │
│  │  • Governments (25%)                                     │    │
│  │  • DFIs/Banks (20%)                                      │    │
│  │  • Technical Founder seat (5% advisory, no economics)    │    │
│  │                                                          │    │
│  │  Board: 9 seats (elected by member class)                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                    │                                             │
│                    ▼                                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  GTCX Exchange Operating Company (Ghana/Regional)        │    │
│  │  • 100% owned by Foundation                              │    │
│  │  • Day-to-day operations                                 │    │
│  │  • Contracts with TradePass/GeoTag                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Relationships

| Relationship               | Type                | Terms                                     |
| -------------------------- | ------------------- | ----------------------------------------- |
| TradePass → GTCX Exchange  | Software license    | Per-verification fee, multi-year contract |
| GeoTag → GTCX Exchange     | Software license    | Per-geotag fee, multi-year contract       |
| Founder → GTCX Exchange    | Technical advisory  | Annual retainer, no equity                |
| Founder → TradePass/GeoTag | CEO + equity holder | Salary + 65% ownership                    |

### Conflict of Interest Management

Since you own the tech companies AND have a role in the exchange, you need:

1. **Independent pricing committee** — Exchange board subcommittee (without founder) approves all vendor contracts
2. **Market-rate benchmarking** — TradePass/GeoTag fees must be at or below market alternatives
3. **Right to fork** — Exchange has contractual right to switch vendors or develop in-house
4. **Transparency** — All related-party transactions disclosed to members

This is exactly how DTCC manages relationships with technology vendors who may also be members.

---

## Fundraising Implications

### For Commercial Layer (TradePass + GeoTag)

**Pitch:** "We're building the identity and location verification infrastructure for commodity markets. Our first customer is GTCX Exchange, a user-owned utility we helped establish. But the technology is applicable to any commodity exchange, supply chain, or identity use case."

**Raise:** $3.5M Seed
**Use:** Build products, establish exchange relationship, prove revenue model
**Investors:** Traditional VC (Fintech, Supply Chain, Impact)

### For Utility Layer (GTCX Exchange)

**Pitch:** "We're establishing a user-owned commodity exchange for verified artisanal production. The verification technology is licensed from TradePass and GeoTag. Your contribution makes you a founding member with governance rights."

**Raise:** $2-3M founding member contributions
**Use:** Operations, governance setup, initial staff
**Contributors:** DFIs (grants), governments (in-kind), refineries (cash), cooperatives (sweat + small cash)

### Sequencing

| Phase           | Commercial                | Utility                             |
| --------------- | ------------------------- | ----------------------------------- |
| **Month 1-6**   | Raise $3.5M Seed          | Begin founding member recruitment   |
| **Month 6-12**  | Build MVP                 | Establish Foundation, sign MOUs     |
| **Month 12-18** | Launch with Exchange      | Exchange goes live, licenses signed |
| **Month 18-24** | Expand to other customers | Exchange scales, proves model       |
| **Month 24-36** | Series A ($10M+)          | Self-sustaining on fees             |

---

## The Pitch (Combined)

### To VCs (Commercial Layer)

> "TradePass and GeoTag are the verification infrastructure for a new generation of commodity exchanges. Our anchor customer is GTCX, a user-owned exchange for artisanal gold. But the technology applies to any commodity, any supply chain, any market that needs to verify identity and location.
>
> We're raising $3.5M to build the products, establish the Exchange relationship, and prove the revenue model. At scale, this is a $100M+ revenue opportunity across multiple verticals."

### To DFIs (Utility Layer)

> "GTCX Exchange is user-owned infrastructure for verified commodity trading. Producers, buyers, and governments own it together. No Silicon Valley exit. No single controlling shareholder.
>
> We're seeking founding members to contribute $2-3M in cash and in-kind support. In return, you get governance rights, preferential fee structures, and permanent ownership of critical trade infrastructure.
>
> The verification technology comes from TradePass and GeoTag — commercial companies that we helped establish. They have their own investors. The Exchange remains pure."

### To Governments

> "GTCX Exchange is infrastructure your country can partly own. TradePass and GeoTag are the technology that powers it — licensed, not owned by the Exchange.
>
> This means: if the technology companies get acquired, nothing changes. The Exchange is independent. Your ownership stake is permanent. Your governance seat is permanent.
>
> You're not betting on a startup. You're investing in infrastructure."

---

## Why This Structure Makes Sense for GTCX

| Question                                  | Answer                                                           |
| ----------------------------------------- | ---------------------------------------------------------------- |
| **Where is the innovation?**              | TradePass (identity), GeoTag (location). Patentable, defensible. |
| **Where is the trust requirement?**       | Exchange/clearing. Must be neutral.                              |
| **Where should profit motive exist?**     | Innovation layer. Drives R&D.                                    |
| **Where should profit motive NOT exist?** | Trust layer. Would compromise neutrality.                        |
| **What do governments want to own?**      | Infrastructure (exchange), not vendors (tech).                   |
| **What do VCs want to own?**              | Scalable tech with multiple customers, not a utility.            |

**The hybrid structure gives everyone what they want.**

---

## Risks and Mitigations

### Risk: "Conflict of interest between tech companies and exchange"

**Mitigation:**

- Independent pricing committee on exchange board
- Market-rate benchmarking requirements
- Contractual right to switch vendors
- Full transparency on related-party transactions

### Risk: "VCs won't invest if anchor customer is user-owned"

**Mitigation:**

- Exchange is one customer, not the only customer
- Multi-year contracts provide revenue visibility
- Other customers (governments, banks, supply chain) are commercial
- Clear path to diversified revenue base

### Risk: "DFIs won't fund exchange if tech companies are VC-backed"

**Mitigation:**

- Exchange has contractual independence
- Technology is licensed, not owned
- Exchange can switch vendors or build in-house
- Founder advisory seat is non-economic

### Risk: "Too complex to execute"

**Mitigation:**

- Phase it: Start with tech companies, establish exchange once products work
- Use standard legal structures (Delaware C-corp, Swiss foundation)
- Precedents exist in other industries

---

## Summary

| Layer        | Entity             | Ownership  | Pricing     | Founder Role     | Founder Economics        |
| ------------ | ------------------ | ---------- | ----------- | ---------------- | ------------------------ |
| **Tech**     | TradePass + GeoTag | VC-backed  | Market rate | CEO + 65% equity | Exit: $15-50M expected   |
| **Exchange** | GTCX Exchange      | User-owned | Cost-plus   | Advisory seat    | $1.5M fees over 15 years |

**Total founder expected value: ~$17M**
**Exchange stays pure: Yes**
**Mission alignment: Yes**
**Fundable by VCs: Yes**
**Fundable by DFIs: Yes**

**This is the best of both worlds.**
