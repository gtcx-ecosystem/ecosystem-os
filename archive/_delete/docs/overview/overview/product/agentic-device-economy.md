---
title: 'Agentic Device Economy'
status: 'current'
date: '2026-05-22'
owner: 'product-lead'
role: 'product-lead'
tier: operating
tags: ['product', 'feature']
review_cycle: 'monthly'
---

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Product Lead

# Agentic Device Economy

> **Operational status (2026-05-31):** This document represents strategic
> vision. The lease-to-own device economy it describes depends on MTN device
> financing + MoMo auto-deduction, which are at the LOI / business-development
> stage per `gtcx-intelligence/01-docs/engagement/mno-ussd-partnership-spec.md`.
> Engineering work should not depend on signed-partnership device-financing
> capabilities for binding work until partnership is confirmed.

## Executive Summary

> **Status:** Current

## The Strategic Insight

| Traditional Approach         | GTCX HaaS Model                         |
| ---------------------------- | --------------------------------------- |
| Miners buy their own devices | GTCX provides devices as infrastructure |
| Cost barrier to entry        | Verification revenue pays for device    |
| Fragmented device ecosystem  | Standardized, optimized hardware        |
| No ongoing relationship      | Continuous service + upgrade path       |
| Device is a cost             | Device is a revenue-generating asset    |

**The Core Thesis:** The device isn't a cost center — it's the **physical manifestation of market access**. A miner with a GTCX device can prove their legitimacy and access premium markets. Without it, they're invisible to the formal economy.

## Business Model Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GTCX HARDWARE ECONOMY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 DEVICE FINANCING LAYER                   │    │
│  │                                                          │    │
│  │   Capital Partners    ───▶   GTCX Device Fund           │    │
│  │   (DFIs, Impact)             (SPV or Foundation)        │    │
│  │                                                          │    │
│  └──────────────────────────────┬──────────────────────────┘    │
│                                 │                                │
│                                 ▼                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 DEVICE DEPLOYMENT LAYER                  │    │
│  │                                                          │    │
│  │   Bulk Purchase  ───▶  Configuration  ───▶  Distribution │    │
│  │   (OEM deals)          (GTCX stack)        (Field ops)   │    │
│  │                                                          │    │
│  └──────────────────────────────┬──────────────────────────┘    │
│                                 │                                │
│                                 ▼                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 MINER ACCESS LAYER                       │    │
│  │                                                          │    │
│  │   Lease-to-Own    OR    Revenue Share    OR    Subsidy   │    │
│  │   (monthly payment)     (% of sales)         (DFI/Govt)  │    │
│  │                                                          │    │
│  └──────────────────────────────┬──────────────────────────┘    │
│                                 │                                │
│                                 ▼                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 VALUE GENERATION LAYER                   │    │
│  │                                                          │    │
│  │   Verification     Market Access     Premium Prices      │    │
│  │   Activity    ───▶  Unlocked    ───▶  Achieved          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Financing Models

### Model A: Lease-to-Own (Primary Recommendation)

**Structure:**

- Miner pays monthly fee
- After 18-24 months, device ownership transfers
- Fee includes device + service + support

**Economics for Standard Device ($400 cost):**

| Component           | Monthly | 24 Months | Notes                           |
| ------------------- | ------- | --------- | ------------------------------- |
| Device amortization | $20     | $480      | 120% of cost (financing margin) |
| Service fee         | $10     | $240      | Platform access                 |
| Support/insurance   | $5      | $120      | Replacement coverage            |
| **Total**           | **$35** | **$840**  |                                 |

**Miner Perspective:**

- $35/month = ~175 GHS (Ghana Cedis)
- Average ASM miner earns $300-800/month
- Device payment is 4-12% of income
- Premium market access could increase income 20-40%

**GTCX Perspective (5,000 devices):**
| Metric | Value |
|--------|-------|
| Monthly recurring revenue | $175,000 |
| Annual recurring revenue | $2,100,000 |
| Gross margin (after device cost) | ~60% after Year 1 |
| Customer lifetime value | $840 over 24 months |

### Model B: Revenue Share (Lower Barrier)

**Structure:**

- Device provided at no upfront cost
- GTCX takes percentage of verified sales
- No fixed monthly payment

**Economics:**

| Sale Size | GTCX Share | Miner Receives |
| --------- | ---------- | -------------- |
| $500      | 5% ($25)   | $475           |
| $2,000    | 4% ($80)   | $1,920         |
| $10,000   | 3% ($300)  | $9,700         |

**Break-even Analysis:**

- Device cost: $400
- Average transaction: $1,500
- Average GTCX share: 4% ($60)
- Transactions to break even: 7
- Typical miner transactions/year: 12-24
- Device payback: 4-8 months

**Advantages:**

- Zero barrier to entry for miners
- Aligns GTCX success with miner success
- Scales revenue with market activity

**Risks:**

- Revenue volatility
- Device loss before payback
- Requires transaction infrastructure

### Model C: Hybrid (Recommended for Pilot)

**Structure:**

- Small upfront deposit (skin in the game)
- Reduced monthly fee
- Revenue share kicks in after threshold

**Economics:**

| Component       | Amount                       |
| --------------- | ---------------------------- |
| Upfront deposit | $50 (refundable)             |
| Monthly fee     | $20                          |
| Revenue share   | 2% after $500/month in sales |

**Why This Works:**

- Deposit creates commitment, reduces abandonment
- Lower monthly reduces burden
- Revenue share captures upside
- Deposit returns when device is owned (24 months)

## Device Strategy

### Tiered Device Portfolio

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVICE TIERS                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TIER 1: BASIC                         Cost: $150               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  • Entry-level rugged smartphone                        │    │
│  │  • Basic GPS + camera                                   │    │
│  │  • Voice-first interface (limited on-device AI)         │    │
│  │  • For: New miners, low-volume producers                │    │
│  │  • Models: Nokia XR21, CAT S22 Flip                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  TIER 2: STANDARD (Primary)            Cost: $350-450           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  • Mid-range rugged smartphone                          │    │
│  │  • High-accuracy GPS + quality camera                   │    │
│  │  • Full on-device AI (Phi-3, Whisper)                   │    │
│  │  • For: Active miners, regular verification             │    │
│  │  • Models: Samsung XCover6 Pro, CAT S75                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  TIER 3: PROFESSIONAL                  Cost: $700-900           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  • High-end rugged device or tablet                     │    │
│  │  • Survey-grade GPS + professional camera               │    │
│  │  • Advanced AI + multi-device hub capability            │    │
│  │  • For: Cooperative leaders, high-volume operations     │    │
│  │  • Models: Samsung Tab Active4 Pro, Panasonic Toughbook │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  TIER 4: HUB DEVICE                    Cost: $1,500-2,500       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  • Ruggedized compute unit with connectivity            │    │
│  │  • Serves multiple miners in remote areas               │    │
│  │  • Satellite connectivity option                        │    │
│  │  • For: Remote sites, cooperative centers               │    │
│  │  • Models: Custom Jetson-based unit                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Recommended Device: Samsung Galaxy XCover6 Pro

| Specification | Value               | Why It Matters              |
| ------------- | ------------------- | --------------------------- |
| Rugged rating | IP68, MIL-STD-810H  | Survives mining environment |
| GPS           | Dual-band + GLONASS | High accuracy for GeoTag    |
| Camera        | 50MP main           | Quality verification photos |
| Processor     | Snapdragon 778G     | Runs Phi-3 efficiently      |
| RAM           | 6GB                 | Sufficient for AI models    |
| Battery       | 4050mAh, removable  | Field-replaceable           |
| Price (bulk)  | ~$350               | Volume discount achievable  |

**Bulk Procurement Strategy:**

| Volume       | Per-Unit Price | Total      | Discount |
| ------------ | -------------- | ---------- | -------- |
| 100 units    | $380           | $38,000    | 5%       |
| 1,000 units  | $340           | $340,000   | 15%      |
| 5,000 units  | $310           | $1,550,000 | 22%      |
| 10,000 units | $290           | $2,900,000 | 28%      |

## Device Management Platform

### Remote Device Management (MDM)

```typescript
interface GTCXDeviceManager {
  // Fleet management
  fleet: {
    totalDevices: number;
    activeDevices: number;
    devicesByTier: Record\<DeviceTier, number\>;
    devicesByRegion: Record\<Region, number\>;
  };

  // Individual device control
  device: {
    // Identification
    id: string;
    imei: string;
    assignedMiner: TradePassId;

    // Status
    status: 'active' | 'suspended' | 'lost' | 'returned';
    lastSeen: timestamp;
    location: GeoPoint;
    batteryLevel: number;
    storageUsed: number;

    // Lease status
    lease: {
      model: 'lease_to_own' | 'revenue_share' | 'hybrid';
      startDate: timestamp;
      paymentsCompleted: number;
      paymentsDue: number;
      currentBalance: number;
      ownershipTransferDate?: timestamp;
    };

    // Security
    security: {
      lockStatus: 'unlocked' | 'payment_locked' | 'lost_locked';
      lastPolicyUpdate: timestamp;
      complianceStatus: 'compliant' | 'non_compliant';
    };
  };

  // Remote actions
  actions: {
    pushUpdate(deviceId: string, update: SoftwareUpdate): Promise\<void\>;
    lockDevice(deviceId: string, reason: LockReason): Promise\<void\>;
    unlockDevice(deviceId: string): Promise\<void\>;
    wipeDevice(deviceId: string): Promise\<void\>; // Nuclear option
    locateDevice(deviceId: string): Promise\<GeoPoint\>;
    sendMessage(deviceId: string, message: string): Promise\<void\>;
  };
}
```

### Payment-Linked Device Control

```
┌─────────────────────────────────────────────────────────────────┐
│                 PAYMENT-LINKED DEVICE STATE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PAYMENT CURRENT                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ✓ Full device functionality                            │    │
│  │  ✓ All GTCX features enabled                            │    │
│  │  ✓ Market access active                                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PAYMENT 15 DAYS LATE                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ⚠ Gentle reminder notifications                        │    │
│  │  ✓ Full functionality continues                         │    │
│  │  ✓ Grace period active                                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PAYMENT 30 DAYS LATE                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ⚠ Prominent payment reminder                           │    │
│  │  ⚠ New verification uploads paused                      │    │
│  │  ✓ Existing verifications still valid                   │    │
│  │  ✓ Phone/SMS still works                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PAYMENT 60 DAYS LATE                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🔒 GTCX features locked                                │    │
│  │  ⚠ Market access suspended                              │    │
│  │  ✓ Basic phone functions work                           │    │
│  │  ✓ Can make payment to restore                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PAYMENT 90+ DAYS LATE                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🔒 Device locked to emergency calls only               │    │
│  │  📍 Device location tracked for recovery                │    │
│  │  ⚠ Account referred to collections                      │    │
│  │  ✓ Full restore possible with payment plan              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Important Design Principle:** Never fully brick a device. Even in default, emergency calls work. This is both ethical and legally required in most jurisdictions.

## Financing Infrastructure

### Capital Stack for Device Fund

```
┌─────────────────────────────────────────────────────────────────┐
│                 GTCX DEVICE FUND STRUCTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SENIOR DEBT (60% of fund)                    Rate: 8-10%       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Sources:                                               │    │
│  │  • Development Finance Institutions (IFC, AfDB, FMO)    │    │
│  │  • Impact-focused debt funds                            │    │
│  │  • Local banks (with DFI guarantees)                    │    │
│  │                                                          │    │
│  │  Security: Device receivables, first lien               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  MEZZANINE (25% of fund)                      Rate: 12-15%      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Sources:                                               │    │
│  │  • Impact investors                                     │    │
│  │  • Family offices                                       │    │
│  │  • Specialized fintech lenders                          │    │
│  │                                                          │    │
│  │  Security: Second lien, revenue participation           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  EQUITY/FIRST-LOSS (15% of fund)              Return: 20%+      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Sources:                                               │    │
│  │  • GTCX Foundation                                      │    │
│  │  • Strategic investors                                  │    │
│  │  • Government co-investment (Ghana)                     │    │
│  │                                                          │    │
│  │  Purpose: Absorb first losses, align incentives         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fund Economics (5,000 Device Deployment)

**Initial Fund Size:** $2.5M

| Use of Funds            | Amount     |
| ----------------------- | ---------- |
| Device procurement      | $1,550,000 |
| Deployment/logistics    | $200,000   |
| Working capital reserve | $500,000   |
| Operating expenses (Y1) | $250,000   |

**Projected Cash Flows:**

| Year | Lease Revenue | Defaults (est.) | Net Revenue | Debt Service | Net to Equity |
| ---- | ------------- | --------------- | ----------- | ------------ | ------------- |
| 1    | $2,100,000    | ($210,000)      | $1,890,000  | ($600,000)   | $1,290,000    |
| 2    | $2,100,000    | ($150,000)      | $1,950,000  | ($600,000)   | $1,350,000    |
| 3    | $1,500,000\*  | ($75,000)       | $1,425,000  | ($400,000)   | $1,025,000    |

\*Year 3 lower as devices transfer to ownership

**Key Metrics:**

- IRR to equity: 35-45%
- Payback period: 18 months
- Default rate assumption: 10% Y1, 7% Y2, 5% Y3

## Negative Scope

This document does **not** cover:

- **Mobile money integration or MoMo partnership specifics:** MTN MoMo API integration, auto-deduction flows, and revenue-sharing models are documented in [Agentic Mobile Money and Pilots](agentic-mobile-money-and-pilots.md) and [Agentic MTN Partnership and Services](agentic-mtn-partnership-and-services.md).
- **GeoTag verification or anti-fraud systems:** The four-layer verification architecture, cross-reference agents, and fraud detection are covered in [Agentic GeoTag Verification and Agents Layers 1-2](agentic-geotag-verification-and-agents-layers-1-2.md) and [Agentic GeoTag Agents Layers 3-4, Anti-Fraud, and Integration](agentic-geotag-agents-layers-3-4-anti-fraud-and-integration.md).
- **Exchange layer trading or settlement mechanics:** CRX/SGX/AGX agent specifications and atomic settlement are detailed in [Agentic AI Exchange, Implementation, and SGX](agentic-ai-exchange-implementation-and-sgx.md).

---

## Related Documents

- [Agentic Verification Thesis](agentic-verification-thesis.md)
- [Agentic Sovereign Infrastructure](agentic-sovereign-infrastructure.md)
- [Agentic TradePass Personal Economic Agent](agentic-tradepass-pea.md)
- [Agentic GeoTag Verification and Agents Layers 1-2](agentic-geotag-verification-and-agents-layers-1-2.md)
- [Agentic GeoTag Agents Layers 3-4, Anti-Fraud, and Integration](agentic-geotag-agents-layers-3-4-anti-fraud-and-integration.md)
- [Agentic Mobile Money and Pilots](agentic-mobile-money-and-pilots.md)
- [Agentic MTN Partnership and Services](agentic-mtn-partnership-and-services.md)
- [Agentic MTN Operations and Revenue](agentic-mtn-operations-and-revenue.md)
- [Agentic AI Protocol and Operations](agentic-ai-protocol-and-operations.md)
- [Agentic AI Exchange, Implementation, and SGX](agentic-ai-exchange-implementation-and-sgx.md)
- [Agentic SGX Governance and Deck Creation](agentic-sgx-governance-and-deck-creation.md)
- [Agentic Deck Refinement and Protocol Explanations](agentic-deck-refinement-and-protocol-explanations.md)
- [Agentic Protocol Insights](agentic-protocol-insights.md)
