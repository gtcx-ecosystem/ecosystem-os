---
title: 'GTCX Structure & Market Sizing: Corrected'
status: 'current'
date: '2026-05-26'
---

# GTCX Structure & Market Sizing: Corrected

## Part 1: What Is the "Exchange" in GTCX Terms?

Looking at your protocol architecture:

```
PROTOCOL LAYER (The Tools)
├── TradePass™ — Identity verification
├── GeoTag™ — Location verification
├── GCI™ — Compliance intelligence
├── VaultMark™ — Custody verification
├── PvP™ — Payment vs payment settlement
└── PANX Oracle™ — Consensus mechanism

OPERATIONS LAYER (Field Infrastructure)
├── VIA — Producer mobile app
├── VXA — Agent/verifier mobile app
└── Compliance services

EXCHANGE LAYER (Markets)
├── CRX — Commodity Regulatory Exchange (government workflows)
├── SGX — Sovereign Governance Exchange (national exchanges)
└── AGX — Authenticated Global Exchange (global marketplace)
```

### The DTCC Equivalent

**DTCC is not one thing.** It's actually:

| DTCC Subsidiary                               | Function                                 | GTCX Equivalent                  |
| --------------------------------------------- | ---------------------------------------- | -------------------------------- |
| **DTC** (Depository Trust Company)            | Holds securities, settles trades         | **VaultMark** + custody partners |
| **NSCC** (National Securities Clearing)       | Clears trades, manages counterparty risk | **PvP Settlement**               |
| **FICC** (Fixed Income Clearing)              | Clears government bonds, mortgage-backed | N/A for commodities              |
| **DTCC ITP** (Institutional Trade Processing) | Trade matching, confirmation             | **CRX** (matching, validation)   |

So the user-owned "clearing" layer isn't one thing — it's:

```
USER-OWNED INFRASTRUCTURE (The "DTCC" of GTCX)
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  GTCX Clearing Foundation (Swiss)                        │    │
│  │                                                          │    │
│  │  Owns/operates:                                          │    │
│  │  • CRX Protocol — Trade matching, compliance validation  │    │
│  │  • Settlement Rules — How PvP actually executes          │    │
│  │  • OriginMark Issuance — Certificate authority           │    │
│  │  • Interoperability Standards — How SGXs connect         │    │
│  │                                                          │    │
│  │  Does NOT own:                                           │    │
│  │  • TradePass (licensed from commercial entity)           │    │
│  │  • GeoTag (licensed from commercial entity)              │    │
│  │  • Individual SGXs (nationally owned)                    │    │
│  │  • AGX (could be separate entity or part of Foundation)  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Where Do the Pieces Sit?

| Component        | Ownership                         | Why                                              |
| ---------------- | --------------------------------- | ------------------------------------------------ |
| **TradePass**    | Commercial (VC-backed)            | Innovation layer, multiple customers beyond GTCX |
| **GeoTag**       | Commercial (VC-backed)            | Innovation layer, multiple customers beyond GTCX |
| **GCI**          | Commercial (VC-backed)            | Compliance scoring is value-add service          |
| **CRX Protocol** | User-owned Foundation             | Must be neutral — trade matching/clearing        |
| **PvP Rules**    | User-owned Foundation             | Settlement rules must be trusted                 |
| **OriginMark**   | User-owned Foundation             | Certificate authority must be neutral            |
| **SGX (Ghana)**  | Ghana government                  | National sovereignty                             |
| **SGX (Rwanda)** | Rwanda government                 | National sovereignty                             |
| **AGX**          | User-owned Foundation OR separate | Global marketplace                               |
| **VaultMark**    | Partnership with vaults           | Physical custody is separate business            |

### The Cleaner Picture

```
COMMERCIAL LAYER (Your Equity)
┌─────────────────────────────────────────────────────────────────┐
│  GTCX Technologies (Delaware C-Corp)                             │
│                                                                  │
│  Products:                                                       │
│  • TradePass™ — Identity verification platform                   │
│  • GeoTag™ — Location verification platform                      │
│  • GCI™ — Compliance intelligence platform                       │
│                                                                  │
│  Customers: GTCX Foundation, OTHER exchanges, governments,       │
│             banks, supply chain companies, logistics, etc.       │
│                                                                  │
│  Revenue: SaaS licenses, per-transaction fees, enterprise deals  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Licenses technology to
                              ▼
USER-OWNED LAYER (Neutral Infrastructure)
┌─────────────────────────────────────────────────────────────────┐
│  GTCX Clearing Foundation (Swiss)                                │
│                                                                  │
│  Functions:                                                      │
│  • CRX Protocol — Trade matching, validation, clearing rules     │
│  • OriginMark — Certificate issuance and verification            │
│  • Settlement Standards — PvP execution rules                    │
│  • Interoperability — How SGXs and AGX connect                   │
│                                                                  │
│  Owned by: Producers (25%), Buyers (25%), Govts (25%), DFIs (25%)│
│                                                                  │
│  Revenue: Cost-plus transaction fees, membership dues            │
│  Surplus: Returned to members or reinvested                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Provides clearing/standards to
                              ▼
SOVEREIGN LAYER (Nationally Owned)
┌─────────────────────────────────────────────────────────────────┐
│  SGX Ghana    │    SGX Rwanda    │    SGX Kenya    │    etc.    │
│  (Ghana owns) │   (Rwanda owns)  │   (Kenya owns)  │            │
│               │                  │                 │            │
│  National exchanges using GTCX Clearing standards               │
│  Licensed TradePass/GeoTag from GTCX Technologies               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Connect via
                              ▼
GLOBAL MARKETPLACE
┌─────────────────────────────────────────────────────────────────┐
│  AGX — Authenticated Global Exchange (Global)                            │
│                                                                  │
│  Connects SGXs to international buyers                           │
│  Could be: Part of Foundation OR separate user-owned entity      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 2: The Real Market Size

You're right — I was modeling as if TradePass and GeoTag only serve GTCX. That's wrong.

**TradePass and GeoTag are horizontal infrastructure** that can serve:

- Every commodity exchange (not just gold)
- Every supply chain (not just mining)
- Every government (not just Ghana)
- Every financial institution (global)

Let me resize:

### TradePass: Global Identity Verification Market

**Total Addressable Market (TAM):**

| Segment                           | Market Size  | TradePass Fit |
| --------------------------------- | ------------ | ------------- |
| Global KYC/AML market             | $15B by 2027 | High          |
| Digital identity market           | $70B by 2030 | High          |
| Financial inclusion (2B unbanked) | Massive      | Core mission  |
| Supply chain worker verification  | $5B+         | High          |
| Government ID modernization       | $20B+        | High          |

**Serviceable Addressable Market (SAM):**

Focus on:

1. **Commodity supply chains** — Gold, cobalt, coffee, cocoa, tin, tungsten, tantalum, lithium
2. **Emerging market governments** — National ID programs
3. **Financial inclusion** — Mobile money, microfinance, trade finance
4. **EU due diligence compliance** — EUDR requires verified supply chains

| Segment                                       | Annual Verifications   | Rate  | Revenue Potential |
| --------------------------------------------- | ---------------------- | ----- | ----------------- |
| Artisanal mining (all minerals)               | 500M                   | $0.08 | $40M              |
| Commodity supply chains (coffee, cocoa, etc.) | 2B                     | $0.05 | $100M             |
| Emerging market KYC (banks, MFIs)             | 1B                     | $0.10 | $100M             |
| Government ID programs                        | 500M                   | $0.03 | $15M              |
| EU supply chain compliance                    | 500M                   | $0.15 | $75M              |
| **Total SAM**                                 | **4.5B verifications** |       | **$330M/year**    |

**Realistic Capture (SOM) — Year 7:**

| Scenario     | Market Share | Revenue |
| ------------ | ------------ | ------- |
| Conservative | 2%           | $6.6M   |
| Base         | 5%           | $16.5M  |
| Optimistic   | 10%          | $33M    |
| Aggressive   | 20%          | $66M    |

### GeoTag: Global Location Verification Market

**Total Addressable Market:**

| Segment                 | Market Size  |
| ----------------------- | ------------ |
| Supply chain visibility | $40B by 2027 |
| Asset tracking          | $35B by 2027 |
| Location-based services | $100B+       |
| Anti-fraud/verification | $20B+        |

**Serviceable Addressable Market:**

Focus on:

1. **Commodity provenance** — Where was it extracted/grown?
2. **Supply chain verification** — Is this shipment where it claims to be?
3. **Logistics anti-fraud** — Driver/vehicle verification
4. **Insurance claims** — Location verification for claims

| Segment                  | Annual Verifications   | Rate  | Revenue Potential |
| ------------------------ | ---------------------- | ----- | ----------------- |
| Mining site verification | 200M                   | $0.05 | $10M              |
| Agricultural provenance  | 1B                     | $0.03 | $30M              |
| Shipment tracking        | 2B                     | $0.02 | $40M              |
| Logistics verification   | 500M                   | $0.04 | $20M              |
| Insurance/claims         | 200M                   | $0.10 | $20M              |
| **Total SAM**            | **3.9B verifications** |       | **$120M/year**    |

**Realistic Capture (SOM) — Year 7:**

| Scenario     | Market Share | Revenue |
| ------------ | ------------ | ------- |
| Conservative | 2%           | $2.4M   |
| Base         | 5%           | $6M     |
| Optimistic   | 10%          | $12M    |
| Aggressive   | 20%          | $24M    |

---

## Part 3: Revised Revenue Projections

### GTCX Technologies (Commercial — TradePass + GeoTag + GCI)

**Conservative Scenario (2% market share by Year 7):**

| Year | TradePass | GeoTag | GCI   | Total | Growth |
| ---- | --------- | ------ | ----- | ----- | ------ |
| 1    | $200K     | $100K  | $0    | $300K | —      |
| 2    | $800K     | $400K  | $100K | $1.3M | 333%   |
| 3    | $2.5M     | $1.2M  | $500K | $4.2M | 223%   |
| 4    | $5M       | $2.5M  | $1.5M | $9M   | 114%   |
| 5    | $8M       | $4M    | $3M   | $15M  | 67%    |
| 6    | $12M      | $6M    | $5M   | $23M  | 53%    |
| 7    | $16M      | $8M    | $7M   | $31M  | 35%    |

**Base Scenario (5% market share by Year 7):**

| Year | TradePass | GeoTag | GCI   | Total  | Growth |
| ---- | --------- | ------ | ----- | ------ | ------ |
| 1    | $300K     | $150K  | $0    | $450K  | —      |
| 2    | $1.5M     | $750K  | $200K | $2.45M | 444%   |
| 3    | $5M       | $2.5M  | $1M   | $8.5M  | 247%   |
| 4    | $12M      | $6M    | $3M   | $21M   | 147%   |
| 5    | $22M      | $11M   | $7M   | $40M   | 90%    |
| 6    | $35M      | $17M   | $12M  | $64M   | 60%    |
| 7    | $50M      | $25M   | $18M  | $93M   | 45%    |

**Optimistic Scenario (10% market share by Year 7):**

| Year | TradePass | GeoTag | GCI   | Total | Growth |
| ---- | --------- | ------ | ----- | ----- | ------ |
| 1    | $500K     | $250K  | $0    | $750K | —      |
| 2    | $3M       | $1.5M  | $500K | $5M   | 567%   |
| 3    | $12M      | $6M    | $3M   | $21M  | 320%   |
| 4    | $30M      | $15M   | $8M   | $53M  | 152%   |
| 5    | $55M      | $28M   | $17M  | $100M | 89%    |
| 6    | $85M      | $42M   | $30M  | $157M | 57%    |
| 7    | $120M     | $60M   | $45M  | $225M | 43%    |

---

## Part 4: Revised Founder Economics

### Exit Scenarios (Year 7)

**Financing Path:**
| Round | Valuation (Post) | Raised | Founder Ownership |
|-------|------------------|--------|-------------------|
| Founding | $2M | $0 | 100% |
| Seed | $15M | $4M | 73% |
| Series A | $60M | $15M | 55% |
| Series B | $200M | $40M | 44% |
| Series C | $500M | $75M | 37% |

**Exit Value by Scenario:**

| Scenario     | Year 7 Revenue | Multiple | Exit Value | Founder (37%) |
| ------------ | -------------- | -------- | ---------- | ------------- |
| Conservative | $31M           | 6x       | $186M      | $69M          |
| Base         | $93M           | 7x       | $651M      | $241M         |
| Optimistic   | $225M          | 8x       | $1.8B      | $666M         |

**Probability-Weighted:**

| Outcome            | Exit Value | Probability | Founder Value | Weighted  |
| ------------------ | ---------- | ----------- | ------------- | --------- |
| Failure            | $0         | 25%         | $0            | $0        |
| Acqui-hire         | $20M       | 10%         | $7.4M         | $740K     |
| Below expectations | $100M      | 20%         | $37M          | $7.4M     |
| Conservative       | $186M      | 20%         | $69M          | $13.8M    |
| Base               | $651M      | 15%         | $241M         | $36.2M    |
| Optimistic         | $1.8B      | 8%          | $666M         | $53.3M    |
| Moonshot           | $5B        | 2%          | $1.85B        | $37M      |
| **Expected Value** |            |             |               | **$148M** |

**Median outcome: ~$50-70M** (between below expectations and conservative)

---

## Part 5: Revised Structure Summary

### The Entities

| Entity                       | Type                  | Ownership                      | Revenue Model           | Year 7 Revenue    |
| ---------------------------- | --------------------- | ------------------------------ | ----------------------- | ----------------- |
| **GTCX Technologies**        | Commercial (Delaware) | VC-backed, founder 37%         | SaaS + per-verification | $31-225M          |
| **GTCX Clearing Foundation** | User-owned (Swiss)    | Producers, Buyers, Govts, DFIs | Cost-plus               | $5-15M            |
| **SGX [Country]**            | Sovereign             | National governments           | Transaction fees        | Varies by country |
| **AGX**                      | pending                   | Part of Foundation or separate | Global marketplace fees | pending               |

### The Revenue Flows

```
VERIFICATION FEES (Commercial)
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Every identity verification → $0.05-0.15 to GTCX Technologies  │
│  Every location verification → $0.02-0.08 to GTCX Technologies  │
│  Every compliance score → $0.03-0.10 to GTCX Technologies       │
│                                                                  │
│  Customers: GTCX Foundation, SGXs, other exchanges, govts,      │
│             banks, supply chain companies, logistics, etc.       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

CLEARING FEES (User-Owned)
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Every trade matched → $0.001-0.01 to GTCX Foundation           │
│  Every OriginMark issued → $0.05-0.20 to GTCX Foundation        │
│  Every settlement → $0.01-0.05 to GTCX Foundation               │
│                                                                  │
│  Revenue covers: Operations, governance, technology licenses     │
│  Surplus: Returned to members or reinvested                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

TRANSACTION FEES (Sovereign)
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Every trade on SGX Ghana → % to Ghana government               │
│  Every trade on SGX Rwanda → % to Rwanda government             │
│  Etc.                                                            │
│                                                                  │
│  National exchanges keep national transaction fees               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 6: The Pitch (Final)

### To VCs

> "GTCX Technologies is building the verification infrastructure for global commodity markets — identity, location, and compliance in one platform.
>
> **The market:** $500B+ in commodities require verified provenance. EU regulations (EUDR) mandate it. 2B people lack the identity documents to participate.
>
> **The product:** TradePass (identity), GeoTag (location), GCI (compliance). Per-verification SaaS model.
>
> **The traction:** Anchor customer is GTCX Clearing Foundation, a user-owned exchange for African commodities. But we're already in discussions with [governments, banks, supply chain companies].
>
> **The ask:** $4M Seed to launch Ghana pilot and prove unit economics. Path to $30-100M revenue by Year 7."

### To DFIs (for the Foundation)

> "GTCX Clearing Foundation is user-owned infrastructure for verified commodity trading — the DTCC of artisanal production.
>
> Producers, buyers, and governments own it together. The verification technology is licensed from GTCX Technologies (a separate commercial entity). The Foundation stays pure — cost-plus pricing, no exit, no single controlling shareholder.
>
> Your founding member contribution gets you governance rights and shapes how this infrastructure evolves."

### To Governments

> "You own your national exchange (SGX). You have a seat on the Foundation that governs clearing standards. The technology vendors (TradePass, GeoTag) are replaceable — if they get acquired, you switch vendors. Your infrastructure is independent.
>
> This isn't dependency on foreign tech. This is sovereignty-preserving infrastructure you partly own."

---

## Part 7: What Changes in the Decks

I need to update:

1. **Market sizing** — TAM/SAM/SOM reflecting global opportunity
2. **Revenue projections** — $30-100M Year 7, not $10-17M
3. **Raise amount** — Probably $4-5M Seed (not $3.5M) given larger opportunity
4. **Structure explanation** — Clear separation of commercial vs. user-owned
5. **Valuation expectations** — Seed at $12-15M pre, not $8-10M

Want me to update the partnership decks with this corrected framing?
