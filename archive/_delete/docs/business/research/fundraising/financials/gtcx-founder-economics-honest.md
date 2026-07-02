---
title: 'Founder Economics: Honest Math'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Founder Economics: Honest Math

## The Question

How do founder outcomes actually compare between VC-backed and user-owned models?

**Spoiler:** The answer depends entirely on scale and probability of success. Let me show the real numbers.

---

## Model 1: VC-Backed Exit

### Assumptions

**Financing Path:**
| Round | Valuation (Post) | Raised | Founder Ownership After |
|-------|------------------|--------|------------------------|
| Founding | $1M (sweat) | $0 | 100% |
| Seed | $12M | $3.5M | 71% |
| Series A | $40M | $10M | 53% |
| Series B | $120M | $25M | 42% |
| Exit | ??? | — | ~35% (after ESOP) |

**Exit Scenarios:**

| Outcome     | Exit Value | Probability | Founder Take |
| ----------- | ---------- | ----------- | ------------ |
| Failure     | $0         | 60%         | $0           |
| Acqui-hire  | $5M        | 15%         | $1.75M       |
| Modest exit | $50M       | 15%         | $17.5M       |
| Good exit   | $150M      | 8%          | $52.5M       |
| Great exit  | $500M      | 2%          | $175M        |

\*_Expected Value Calculation:_

```
E[Founder] = 0.60 × $0
           + 0.15 × $1.75M
           + 0.15 × $17.5M
           + 0.08 × $52.5M
           + 0.02 × $175M

         = $0 + $262K + $2.625M + $4.2M + $3.5M
         = $10.6M expected value
```

**But expected value is misleading.**

The _median_ outcome is **$0** (60% fail).
The _75th percentile_ is **$1.75M** (acqui-hire).
Only 10% of founders see >$17.5M.

### Salary During the Journey

| Year | Annual Salary | Cumulative |
| ---- | ------------- | ---------- |
| 1    | $100,000      | $100,000   |
| 2    | $120,000      | $220,000   |
| 3    | $150,000      | $370,000   |
| 4    | $180,000      | $550,000   |
| 5    | $200,000      | $750,000   |
| 6    | $220,000      | $970,000   |
| 7    | $250,000      | $1,220,000 |

**Salary before exit: ~$1.2M over 7 years**

### Total VC Path Economics

| Scenario   | Salary        | Exit   | Total  | Probability |
| ---------- | ------------- | ------ | ------ | ----------- |
| Failure    | $750K (5 yrs) | $0     | $750K  | 60%         |
| Acqui-hire | $750K         | $1.75M | $2.5M  | 15%         |
| Modest     | $1.2M         | $17.5M | $18.7M | 15%         |
| Good       | $1.2M         | $52.5M | $53.7M | 8%          |
| Great      | $1.2M         | $175M  | $176M  | 2%          |

**Expected total: $11.8M**
**Median total: $750K** (you fail and get only salary)
**80th percentile: $2.5M** (acqui-hire)

---

## Model 2: User-Owned Utility

### Revenue Model

The utility makes money from:

1. **Transaction fees** — per verification
2. **Membership dues** — annual fees from institutional members
3. **Government licensing** — national deployment fees
4. **API access** — buyer/refiner integration fees

### Scale Scenarios

**Year 5 - Modest Scale (Ghana + 1 country)**
| Revenue Stream | Units | Rate | Annual |
|----------------|-------|------|--------|
| Verifications | 2M/year | $0.08 | $160,000 |
| Mining coop members | 20 | $2,000 | $40,000 |
| Refinery members | 5 | $25,000 | $125,000 |
| Government licenses | 2 | $50,000 | $100,000 |
| **Total Revenue** | | | **$425,000** |

Operating costs: $350,000 (small team, infrastructure)
**Surplus: $75,000**

**Year 7 - Medium Scale (5 countries, growing adoption)**
| Revenue Stream | Units | Rate | Annual |
|----------------|-------|------|--------|
| Verifications | 20M/year | $0.08 | $1,600,000 |
| Mining coop members | 100 | $2,000 | $200,000 |
| Refinery members | 20 | $25,000 | $500,000 |
| Government licenses | 5 | $75,000 | $375,000 |
| Buyer API access | 15 | $50,000 | $750,000 |
| **Total Revenue** | | | **$3,425,000** |

Operating costs: $2,000,000 (15 FTE, infrastructure, governance)
**Surplus: $1,425,000**

**Year 10 - Full Scale (Pan-African, expanding globally)**
| Revenue Stream | Units | Rate | Annual |
|----------------|-------|------|--------|
| Verifications | 100M/year | $0.06 | $6,000,000 |
| Mining coop members | 500 | $2,000 | $1,000,000 |
| Refinery members | 50 | $25,000 | $1,250,000 |
| Government licenses | 15 | $100,000 | $1,500,000 |
| Buyer API access | 50 | $75,000 | $3,750,000 |
| **Total Revenue** | | | **$13,500,000** |

Operating costs: $8,000,000 (40 FTE, global infrastructure)
**Surplus: $5,500,000**

### Founder Compensation Structure

**Option A: Service Contract + Economic Rights**

Founder receives:

- Management service contract (paid by utility)
- 10% Class B shares (economic rights to surplus)
- Class B converts to Class A over 10 years

| Year | Service Contract | 10% of Surplus | Total Annual |
| ---- | ---------------- | -------------- | ------------ |
| 1    | $100,000         | $0 (building)  | $100,000     |
| 2    | $120,000         | $0 (building)  | $120,000     |
| 3    | $140,000         | $0 (pilot)     | $140,000     |
| 4    | $160,000         | $0 (early ops) | $160,000     |
| 5    | $180,000         | $7,500         | $187,500     |
| 6    | $200,000         | $50,000        | $250,000     |
| 7    | $220,000         | $142,500       | $362,500     |
| 8    | $240,000         | $250,000       | $490,000     |
| 9    | $250,000         | $400,000       | $650,000     |
| 10   | $250,000         | $550,000       | $800,000     |

**Cumulative Year 1-10: $3,260,000**

| Year | Service Contract | 10% of Surplus | Total Annual |
| ---- | ---------------- | -------------- | ------------ |
| 11   | $250,000         | $600,000       | $850,000     |
| 12   | $250,000         | $650,000       | $900,000     |
| 13   | $250,000         | $700,000       | $950,000     |
| 14   | $250,000         | $750,000       | $1,000,000   |
| 15   | $250,000         | $800,000       | $1,050,000   |

**Cumulative Year 1-15: $8,010,000**

**Option B: Higher Economic Rights, Lower Service Fee**

Founder receives:

- Modest service contract
- 15% Class B shares

| Year | Service Contract | 15% of Surplus | Total Annual |
| ---- | ---------------- | -------------- | ------------ |
| 1    | $80,000          | $0             | $80,000      |
| 2    | $100,000         | $0             | $100,000     |
| 3    | $120,000         | $0             | $120,000     |
| 4    | $140,000         | $0             | $140,000     |
| 5    | $150,000         | $11,250        | $161,250     |
| 6    | $160,000         | $75,000        | $235,000     |
| 7    | $180,000         | $213,750       | $393,750     |
| 8    | $200,000         | $375,000       | $575,000     |
| 9    | $200,000         | $600,000       | $800,000     |
| 10   | $200,000         | $825,000       | $1,025,000   |

**Cumulative Year 1-10: $3,630,000**

---

## Honest Comparison

### Probability-Weighted Outcomes

**VC Path:**
| Outcome | Total (Salary + Exit) | Probability | Weighted |
|---------|----------------------|-------------|----------|
| Failure Year 3 | $370,000 | 30% | $111,000 |
| Failure Year 5 | $750,000 | 30% | $225,000 |
| Acqui-hire Year 5 | $2,500,000 | 15% | $375,000 |
| Modest Exit Year 7 | $18,700,000 | 15% | $2,805,000 |
| Good Exit Year 7 | $53,700,000 | 8% | $4,296,000 |
| Great Exit Year 7 | $176,000,000 | 2% | $3,520,000 |
| **Expected Value** | | | **$11,332,000** |

**User-Owned Path (assuming success):**
| Scenario | Year 10 Cumulative | Year 15 Cumulative |
|----------|-------------------|-------------------|
| Modest scale | $2,100,000 | $4,500,000 |
| Medium scale | $3,260,000 | $8,010,000 |
| Full scale | $4,500,000 | $12,000,000 |

But what's the probability of reaching each scale?

| Scale              | Probability | Year 15 Value          | Weighted       |
| ------------------ | ----------- | ---------------------- | -------------- |
| Failure            | 40%         | $500,000 (salary only) | $200,000       |
| Modest             | 30%         | $4,500,000             | $1,350,000     |
| Medium             | 20%         | $8,010,000             | $1,602,000     |
| Full               | 10%         | $12,000,000            | $1,200,000     |
| **Expected Value** |             |                        | **$4,352,000** |

---

## The Honest Answer

### Expected Value Comparison

| Path           | Expected Value (15 years) |
| -------------- | ------------------------- |
| **VC-Backed**  | **$11.3M**                |
| **User-Owned** | **$4.4M**                 |

**VC path has higher expected value** — because of the small probability of a big exit.

### But Expected Value Isn't Everything

**Median Outcome Comparison:**

| Path       | Median Outcome                |
| ---------- | ----------------------------- |
| VC-Backed  | $750K (failure after 5 years) |
| User-Owned | $4.5M (modest scale achieved) |

**User-owned has higher median** — because you keep earning even without a "win."

**Variance:**

| Path       | Std Deviation | Range        |
| ---------- | ------------- | ------------ |
| VC-Backed  | ~$30M         | $0 - $176M   |
| User-Owned | ~$3M          | $500K - $12M |

**User-owned is much lower variance** — more predictable outcome.

---

## When Each Path Makes Sense

### Choose VC If:

1. **You're risk-seeking** — willing to accept 60%+ chance of $0 exit for small chance of $50M+
2. **Speed matters** — VC capital lets you move faster
3. **You want to exit** — not interested in 15-year stewardship
4. **Market is winner-take-all** — need to outspend competitors

### Choose User-Owned If:

1. **You're risk-averse** — prefer $4-8M certain over $50M possible
2. **Mission matters** — user ownership IS the point
3. **Permanence matters** — building infrastructure, not a company
4. **Government trust is critical** — ownership accelerates adoption
5. **You want ongoing income** — $500K-1M/year indefinitely

---

## The GTCX-Specific Question

Given the mission ("cathedrals not companies"), the philosophy (Ubuntu Economics), and the stakeholders (governments, cooperatives), which path is more _aligned_?

**The honest answer:**

VC path has higher expected financial return to founder.
User-owned path has higher alignment with stated mission.

**The question is:** How much alignment is worth in dollars?

If user-owned gets you:

- Government MOUs 12 months faster
- 50% lower customer acquisition cost (trust)
- 3x longer customer lifetime (no exit risk)
- Personal meaning and legacy

...then the economics might actually favor user-owned, but through _different mechanisms_ than the simple surplus calculation above.

---

## Revised Founder Economics Table

| Scenario                    | VC Exit                               | User-Owned Utility       |
| --------------------------- | ------------------------------------- | ------------------------ |
| **Year 1-5 Salary**         | $750K cumulative                      | $620K cumulative         |
| **Year 6-10 Salary**        | $1.1M cumulative (if still operating) | $1.1M cumulative         |
| **Year 6-10 Surplus Share** | $0 (no dividends pre-exit)            | $800K-1.2M cumulative    |
| **Year 10 Exit/Value**      | 60% = $0, 25% = $2-18M, 15% = $50M+   | No exit; ongoing income  |
| **Year 11-15**              | $0 (you're out)                       | $3-5M cumulative         |
| **Expected Value**          | **$11.3M**                            | **$4.4M**                |
| **Median Value**            | **$750K**                             | **$4.5M**                |
| **Risk Profile**            | High variance, binary                 | Low variance, cumulative |

---

## What I Got Wrong Earlier

My original table implied:

- User-owned produces $5-15M vs VC's $2-10M
- This was misleading

**The truth:**

- VC has higher _expected_ value due to tail outcomes
- User-owned has higher _median_ value due to steady income
- The right choice depends on your risk preference and mission alignment

---

## The Real Decision

**If you're optimizing for expected financial return:** VC

**If you're optimizing for:**

- Median outcome
- Mission alignment
- Government trust
- Permanence
- Lower stress
- Predictable income

**Then:** User-owned utility

**There is no objectively "right" answer. It's a values question.**
