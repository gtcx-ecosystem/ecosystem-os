---
title: 'GTCX Ownership Bootstrap Framework'
status: current
date: 2026-05-26
owner: canon-os
tier: operating
tags: ['runbook', 'documentation']
review_cycle: on-change
document_type: runbook
---

# GTCX Ownership Bootstrap Framework

## The Core Problem

**Pre-Platform:**

- No transactions to measure
- No volume to allocate by
- Need capital and partners now
- Must promise ownership to attract early participants

**Post-Platform:**

- Transaction volume can drive allocation
- Participation becomes measurable
- But early risk-takers deserve reward
- How do you transition fairly?

---

## Solution: Three-Phase Ownership Model

### Phase 1: Founding Allocation (Pre-Launch)

**Duration:** Now through platform launch (~18 months)

**Who Gets Ownership:**
| Stakeholder | Basis for Allocation | Allocation |
|-------------|----------------------|------------|
| **Founders/Builders** | Sweat equity, IP creation, risk | 15% (fixed) |
| **Founding Capital** | Cash investment at highest risk | 10-15% |
| **Founding Partners** | Strategic value (govts, DFIs, first refiners) | 10-15% |
| **Reserved Pool** | For transaction-based distribution | 55-65% |

\*_How It Works:_

```
┌─────────────────────────────────────────────────────────────────┐
│              PRE-LAUNCH OWNERSHIP (100M Units)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FOUNDER CLASS (15M units)                                       │
│  ├── Founding Executive: 10M units                                     │
│  ├── Early technical team: 3M units                             │
│  └── Advisors: 2M units                                         │
│  Status: Locked 3 years, vest over 4 years                      │
│                                                                  │
│  FOUNDING CAPITAL CLASS (10-15M units)                          │
│  ├── Seed investors: Proportional to capital                   │
│  ├── DFI grants (if converted): Proportional                   │
│  └── Strategic investors                                        │
│  Status: 1 year lock, 2 year vest                               │
│                                                                  │
│  FOUNDING PARTNER CLASS (10-15M units)                          │
│  ├── Ghana government: 3-5M units (first SGX)                  │
│  ├── First 3 refineries: 2M units each                         │
│  ├── First 5 cooperatives: 500K units each                     │
│  └── IFC/AfDB: 2-3M units                                       │
│  Status: Immediate, but with participation requirements         │
│                                                                  │
│  RESERVED POOL (55-65M units)                                   │
│  ├── Transaction-based distribution: 40M                       │
│  ├── Participation rewards: 15M                                │
│  └── Future member classes: 10M                                │
│  Status: Distributed over 7-10 years based on platform activity │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Founding Member Agreement Terms:**

| Class             | Minimum Commitment              | Units Received | Vesting                         | Requirements                           |
| ----------------- | ------------------------------- | -------------- | ------------------------------- | -------------------------------------- |
| **Government**    | MOU + pilot participation       | 2-5M units     | Immediate (no vest)             | Must operate SGX or participate in CRX |
| **DFI**           | $500K+ investment/grant         | $1 = 100 units | 1 year cliff, 2 year vest       | Must participate in governance         |
| **Refinery**      | Commitment to purchase verified | 1-3M units     | 50% immediate, 50% over 2 years | Volume commitment                      |
| **Cooperative**   | 100+ members enrolled           | 250K-1M units  | Immediate                       | Active participation                   |
| **Seed Investor** | $100K+ investment               | $1 = 100 units | 1 year cliff, 3 year vest       | Standard investor terms                |

---

### Phase 2: Early Operations (Pilot → Scale)

**Duration:** Platform launch through Year 3

**New Ownership Sources:**

1. **Transaction-based distribution** — Units allocated proportional to verified transactions
2. **Participation rewards** — Units earned through governance, referrals, milestones
3. **New member purchases** — Later members buy in at current unit price

**The Transaction-Based Formula:**

```python
# Monthly distribution from reserved pool
monthly_distribution = min(
    reserved_pool_remaining * 0.02,  # Max 2% of remaining pool per month
    1_000_000  # Cap at 1M units/month
)

# Distribution by transaction contribution
for member in active_members:
    member_share = (
        member.verified_transactions / total_verified_transactions
    ) * monthly_distribution * 0.60  # 60% by transaction volume

    member_participation = (
        member.participation_score / total_participation
    ) * monthly_distribution * 0.40  # 40% by participation

    member.units += member_share + member_participation
```

**Year 1-3 Projected Distribution:**

| Year | Monthly Distribution | Annual Total | Cumulative | Pool Remaining |
| ---- | -------------------- | ------------ | ---------- | -------------- |
| 1    | 500K units           | 6M units     | 6M         | 54M            |
| 2    | 750K units           | 9M units     | 15M        | 45M            |
| 3    | 1M units             | 12M units    | 27M        | 33M            |

**Who Earns What (Example Year 2):**

| Member Type                    | Avg Monthly Transactions | Participation Score | Monthly Units | Annual Units |
| ------------------------------ | ------------------------ | ------------------- | ------------- | ------------ |
| Large cooperative (500 miners) | 10,000                   | High                | 25,000        | 300,000      |
| Small cooperative (50 miners)  | 1,000                    | Medium              | 3,500         | 42,000       |
| Individual producer            | 50                       | Low                 | 200           | 2,400        |
| Major refinery                 | 50,000                   | High                | 100,000       | 1,200,000    |
| Regional trader                | 5,000                    | Medium              | 15,000        | 180,000      |
| Government (SGX operator)      | N/A                      | High                | 50,000        | 600,000      |

---

### Phase 3: Steady State (Year 4+)

**Ownership becomes primarily transaction-driven:**

```
┌─────────────────────────────────────────────────────────────────┐
│              YEAR 5 OWNERSHIP (Projected)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FOUNDER CLASS                           12%  (diluted from 15%) │
│  ├── Still locked/vesting                                       │
│  └── Percentage shrinks as pool distributes                    │
│                                                                  │
│  FOUNDING CAPITAL                         8%  (diluted from 12%) │
│  └── Early investors still hold, but smaller %                  │
│                                                                  │
│  FOUNDING PARTNERS                       10%  (grew slightly)    │
│  └── Governments, DFIs earned more through participation        │
│                                                                  │
│  EARNED BY TRANSACTION/PARTICIPATION     45%                     │
│  ├── Producer class: 20%                                        │
│  ├── Buyer class: 15%                                           │
│  ├── Financial class: 10%                                       │
│  └── Distributed to thousands of active participants            │
│                                                                  │
│  RESERVED (remaining)                    25%                     │
│  └── For future distribution and new member classes             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Inclusion & Accessibility: How Non-Crypto Participants Hold Ownership

### The Problem with Tokens

| Issue                   | Impact on Inclusion              |
| ----------------------- | -------------------------------- |
| Requires wallet         | Rural producer can't manage keys |
| Needs smartphone + data | Excludes feature phone users     |
| Crypto complexity       | Confuses non-technical members   |
| Regulatory uncertainty  | Governments won't participate    |
| Speculation risk        | Mission drift                    |

### The Solution: Custodied Units

**Units are database entries, not on-chain tokens.**

Every member has a **Member Account** that holds:

- Unit balance
- Cash balance (for dues, dividends)
- Transaction history
- Governance rights

**The member doesn't need to know it's "crypto."** They just see:

- "You own X units"
- "Your share is X%"
- "Vote on this proposal"
- "Receive dividend via mobile money"

### Multi-Channel Access to Ownership

| Channel         | User Experience                    | Technical Implementation    |
| --------------- | ---------------------------------- | --------------------------- |
| **USSD (SMS)**  | Dial \*123#, select "My Ownership" | Gateway → API → Database    |
| **Mobile App**  | See dashboard, vote, withdraw      | Native app → API → Database |
| **Web Portal**  | Full dashboard, all features       | React app → API → Database  |
| **Field Agent** | Agent assists member               | Agent app → API → Database  |
| **API**         | Enterprise integration             | Direct API → Database       |

### Example: Rural Producer Experience

```
USSD Flow for Tarkwa Gold Cooperative member:

*384*123#

1. Check Balance
2. Vote on Proposal
3. Withdraw Dividend
4. View Ownership

> 1

Your GTCX Membership:
Units: 2,400
Ownership: 0.0004%
Pending dividend: $12.50
Press 1 to withdraw to MTN

> 1

Enter MTN number:
> 0244123456

$12.50 sent to 0244123456.
Transaction ID: GTX-2025-xxx
```

**No wallet. No keys. No crypto complexity.**

---

## The Conversion Path: If You Want Tokens Later

### Year 1-3: Custodied Units Only

```
Units exist in GTCX database
├── Legally: Shares in GTCX Ltd (Rwanda)
├── Technically: Database entries with cryptographic audit trail
├── Access: USSD, mobile, web, API
└── No blockchain involved
```

### Year 3-5: Optional Token Representation

If/when you decide to add token layer:

```
Same units, now ALSO representable on-chain
├── Member chooses: Keep custodied OR claim as token
├── Token = wrapped representation of database units
├── 1:1 backing (token represents, doesn't replace)
├── Non-custodied option for sophisticated members
└── Custodied option remains for others
```

**This is like:**

- Stock certificates → electronic book entry (1970s-80s)
- Electronic book entry → optional blockchain representation (2020s)

You don't force everyone to use the new form. You offer it as an option.

---

## Pre-Launch: How to Allocate Without Transaction Data

### Founding Member Criteria

Since you can't measure transactions yet, measure:

| Criteria                      | How to Measure           | Weight         |
| ----------------------------- | ------------------------ | -------------- |
| **Capital at risk**           | $$ committed             | High           |
| **Strategic value**           | Qualitative assessment   | High           |
| **Commitment to participate** | MOU, binding agreement   | Medium         |
| **Network contribution**      | Other members they bring | Medium         |
| **Mission alignment**         | Track record, reputation | Low (but veto) |

### Founding Member Tiers

| Tier          | Criteria                                    | Unit Allocation | Example                               |
| ------------- | ------------------------------------------- | --------------- | ------------------------------------- |
| **Anchor**    | $1M+ commitment OR critical strategic value | 3-5M units      | IFC, Ghana government                 |
| **Strategic** | $250K-1M OR significant strategic value     | 1-3M units      | Major refinery, large cooperative     |
| **Founding**  | $50K-250K OR meaningful participation       | 250K-1M units   | Regional trader, mid-size cooperative |
| **Early**     | <$50K but early commitment                  | 50K-250K units  | Small cooperative, first movers       |

### Participation Requirements

**Ownership isn't free. Founding members must:**

| Member Type | Requirement                  | Consequence of Non-Compliance |
| ----------- | ---------------------------- | ----------------------------- |
| Government  | Operate SGX within 18 months | Units forfeit to reserve      |
| Refinery    | Source X% verified by Year 2 | Units vest frozen             |
| Cooperative | Enroll X members by Year 1   | Units reduced proportionally  |
| DFI         | Participate in governance    | N/A (no hard requirement)     |
| Investor    | N/A                          | Standard investor terms       |

---

## The Flywheel: How Transaction-Based Ownership Bootstraps

### Month 0-6: Founding Members Only

```
Ownership:
├── Founder: 15%
├── Founding Capital: 10%
├── Founding Partners: 10%
└── Reserved: 65%

Transactions: 0 (building platform)
Distribution: None yet
```

### Month 6-12: Pilot Launches

```
Ownership:
├── Founder: 15%
├── Founding Capital: 10%
├── Founding Partners: 11% (+1% earned)
├── Early Earned: 2%
└── Reserved: 62%

Transactions: 50,000/month
Distribution: 500K units/month to active participants
```

### Month 12-24: Growth Phase

```
Ownership:
├── Founder: 14% (diluted slightly)
├── Founding Capital: 9%
├── Founding Partners: 13%
├── Earned (Producers): 8%
├── Earned (Buyers): 5%
├── Earned (Financial): 3%
└── Reserved: 48%

Transactions: 500,000/month
Distribution: 750K units/month
```

### Month 24-36: Network Effect

```
Ownership:
├── Founder: 12%
├── Founding Capital: 8%
├── Founding Partners: 15%
├── Earned (Producers): 15%
├── Earned (Buyers): 12%
├── Earned (Financial): 8%
└── Reserved: 30%

Transactions: 2,000,000/month
Distribution: 1M units/month
```

---

## Anti-Concentration Mechanisms

### Problem: Large Players Could Dominate

Without limits, a single large refinery processing 50% of volume would earn 50% of transaction-based units.

### Solution: Caps and Curves

**1. Class Caps:**
No single class can exceed 35% of total ownership (except reserved pool).

**2. Member Caps:**
| Member Type | Max Ownership |
|-------------|---------------|
| Single producer/cooperative | 5% |
| Single buyer | 5% |
| Single government | 5% |
| Single financial institution | 3% |
| Founder class (total) | 15% |

**3. Diminishing Returns Curve:**

```python
def calculate_earned_units(member_volume, total_volume, base_distribution):
    # Linear share
    linear_share = member_volume / total_volume

    # Apply diminishing returns above 5% share
    if linear_share > 0.05:
        excess = linear_share - 0.05
        adjusted_share = 0.05 + (excess * 0.5)  # 50% haircut on excess
    else:
        adjusted_share = linear_share

    # Apply cap
    capped_share = min(adjusted_share, 0.10)  # Max 10% of any distribution

    return capped_share * base_distribution
```

**Effect:**

- Small producers get full credit for their volume
- Large players get diminishing returns
- No single entity can dominate through volume alone

---

## Governance Transition

### Pre-Launch: Founder-Led

```
Governance:
├── Founder has operational control
├── Founding Partners have advisory input
├── Board: 3 founders + 2 advisors
└── Decisions: Founder discretion with partner consultation
```

### Year 1-2: Transitional

```
Governance:
├── Board expands: 3 founders + 2 partners + 2 elected
├── Major decisions require board vote
├── Operational decisions remain with management
└── Member voting on constitutional issues only
```

### Year 3+: Member-Led

```
Governance:
├── Board: 2 founders (observer) + 9 elected by class
├── All major decisions by member vote
├── Management executes board decisions
└── Constitutional changes require supermajority
```

---

## Summary: Bootstrap to Steady State

| Phase            | Duration     | Ownership Basis                | Key Mechanism                     |
| ---------------- | ------------ | ------------------------------ | --------------------------------- |
| **Founding**     | 0-18 months  | Risk, capital, strategic value | Fixed allocation with vesting     |
| **Early Ops**    | 18-36 months | Transactions + participation   | Monthly distribution from pool    |
| **Growth**       | 36-60 months | Primarily transactions         | Diminishing pool, earned majority |
| **Steady State** | 60+ months   | Transaction-driven             | Pool exhausted, organic transfers |

**The key insight:**

Early members take risk → get fixed allocation.
Later members earn through participation → transaction-based.
Everyone benefits from growth → units appreciate.
No one can dominate → caps and curves.

---

## Implementation: What to Build Now

### Phase 1 (Months 1-6): Foundation

1. **Legal structure** — Rwanda company with share classes
2. **Founding member agreements** — Template for each tier
3. **Unit registry** — Database to track allocations
4. **Member portal (basic)** — View ownership, sign agreements

### Phase 2 (Months 6-12): Pre-Launch

1. **Full member portal** — All features for founding members
2. **USSD integration** — Basic balance/ownership check
3. **Governance (basic)** — Proposal and voting for founding members
4. **Dividend infrastructure** — Mobile money integration

### Phase 3 (Months 12-18): Launch

1. **Transaction tracking** — Connect to verification platform
2. **Automated distribution** — Monthly unit allocation
3. **Participation scoring** — Track engagement
4. **Public dashboard** — Transparency for all

### Phase 4 (Months 18-24): Scale

1. **Full governance** — Elections, all proposal types
2. **Multi-channel access** — Full USSD, web, mobile, API
3. **Reporting** — Regulatory, audit, member reports
4. **Optional token layer** — If/when decided

---

## Answers to Your Questions

### Q: How does this work before the platform is live?

**A:** Fixed allocations to founding members based on:

- Capital contributed
- Strategic value
- Commitment to participate
- Risk taken at early stage

These are "sweat equity" and "early adopter premium" — earned by being first, not by transactions.

### Q: How does transaction volume dictate ownership splits?

**A:** Once live:

- Monthly distribution from reserved pool
- 60% allocated by transaction volume
- 40% allocated by participation score
- Diminishing returns prevent concentration
- Caps ensure no single entity dominates

### Q: How do you include non-crypto participants?

**A:** Units are database entries, not tokens:

- Access via USSD, mobile, web
- Dividends via mobile money
- Voting via any channel
- No wallet, no keys, no complexity
- Optionally representable as tokens later
