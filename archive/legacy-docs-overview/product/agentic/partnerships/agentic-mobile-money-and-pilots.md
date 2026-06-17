---
title: 'Agentic Mobile Money And Pilots'
status: current
date: 2026-05-22
owner: product-lead
tier: operating
tags: [['product', 'feature']]
review_cycle: monthly
document_type: protocol
role: product-lead
---

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Product Lead

# Agentic Mobile Money and Pilots

> **Operational status (2026-05-31):** This document represents strategic
> vision. The MTN MoMo, M-Pesa, EcoCash, and other mobile-money integrations
> it describes are at the LOI / business-development stage per
> `gtcx-intelligence/01-docs/engagement/mno-ussd-partnership-spec.md`.
> Payment-rail integrations exist in the protocol layer
> (`gtcx-protocols/protocols/pvp/03-platform/src/payment-rails.ts`) for routing only;
> KYC-confirmed identity attestation via these providers requires signed
> contracts and is partnership-blocked.

## Executive Summary

> **Status:** Current

## Integration with Mobile Money

### Payment Collection Infrastructure

```
┌─────────────────────────────────────────────────────────────────┐
│                 PAYMENT COLLECTION CHANNELS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PRIMARY: MOBILE MONEY                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Ghana: MTN MoMo, Vodafone Cash, AirtelTigo Money       │    │
│  │  Kenya: M-Pesa, Airtel Money                            │    │
│  │  Nigeria: OPay, PalmPay, Paga                           │    │
│  │                                                          │    │
│  │  Integration: Direct API for auto-debit (with consent)  │    │
│  │  Fees: 1-2% per transaction                             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  SECONDARY: TRANSACTION DEDUCTION                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  When miner completes verified sale:                    │    │
│  │  • Payment comes through GTCX settlement                │    │
│  │  • Device fee automatically deducted                    │    │
│  │  • Net amount sent to miner's mobile money              │    │
│  │                                                          │    │
│  │  Advantage: No separate payment action required         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  TERTIARY: AGENT COLLECTION                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  For miners without mobile money access:                │    │
│  │  • GTCX field agents collect cash                       │    │
│  │  • Receipt issued via device                            │    │
│  │  • Agent deposits to GTCX account                       │    │
│  │                                                          │    │
│  │  Higher cost but necessary for financial inclusion      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Auto-Deduction from Sales

```typescript
class TransactionSettlement {
  async settleWithDeductions(
    transaction: VerifiedTransaction,
    miner: TradePassIdentity
  ): Promise\<SettlementResult\> {
    const grossAmount = transaction.amount;

    // Calculate deductions
    const deductions: Deduction[] = [];

    // 1. Device lease payment (if applicable)
    const deviceLease = await this.getDeviceLease(miner);
    if (deviceLease && deviceLease.paymentDue) {
      deductions.push({
        type: 'device_lease',
        amount: Math.min(deviceLease.monthlyPayment, grossAmount * 0.15), // Cap at 15%
        recipient: 'gtcx_device_fund',
      });
    }

    // 2. Platform fee
    const platformFee = this.calculatePlatformFee(transaction);
    deductions.push({
      type: 'platform_fee',
      amount: platformFee,
      recipient: 'gtcx_operations',
    });

    // 3. Any other agreed deductions (savings, cooperative dues, etc.)
    const otherDeductions = await this.getOtherDeductions(miner, grossAmount);
    deductions.push(...otherDeductions);

    // Calculate net to miner
    const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
    const netToMiner = grossAmount - totalDeductions;

    // Execute settlement
    await this.executeSettlement({
      miner,
      grossAmount,
      deductions,
      netToMiner,
      paymentMethod: miner.preferredPaymentMethod,
    });

    // Notify miner with clear breakdown
    await this.sendSettlementNotification(miner, {
      grossAmount,
      deductions,
      netToMiner,
      deviceLeaseRemaining: deviceLease?.remainingPayments,
    });

    return { success: true, netToMiner, deductions };
  }
}
```

**Notification to Miner:**

```
┌─────────────────────────────────────────────────────────────────┐
│                   SALE COMPLETE! 🎉                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Gold sold: 45.2 grams                                          │
│  Buyer: Swiss Refiner AG                                        │
│  Sale price: $2,850.00                                          │
│                                                                  │
│  ─────────────────────────────────────────                      │
│  Breakdown:                                                      │
│    Sale amount:              $2,850.00                          │
│    Device payment:           -   $35.00  (18 of 24 paid ✓)      │
│    Platform fee (2%):        -   $57.00                         │
│    Cooperative savings:      -   $50.00                         │
│  ─────────────────────────────────────────                      │
│  Sent to your MoMo:          $2,708.00                          │
│                                                                  │
│  Your device will be fully yours in 6 more payments!            │
│                                                                  │
│  [View Details]  [Transaction History]  [Contact Support]       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Risk Management

### Default Risk Mitigation

| Risk                  | Mitigation                        | Implementation                       |
| --------------------- | --------------------------------- | ------------------------------------ |
| Non-payment           | Progressive feature restriction   | MDM payment lock system              |
| Device loss           | GPS tracking + remote lock        | Always-on location service           |
| Device theft          | IMEI blacklisting + police report | Integration with national registries |
| Device resale         | Hardware binding to TradePass     | Secure enclave + activation lock     |
| Fraud (fake identity) | Biometric verification            | Fingerprint/face on device setup     |
| Mass default          | Diversification across regions    | Geographic distribution requirements |

### Insurance Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                 DEVICE INSURANCE PROGRAM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  COVERAGE TIERS:                                                 │
│                                                                  │
│  Basic (included in $5/month support fee):                       │
│  • Accidental damage: 80% replacement value                     │
│  • Theft with police report: Full replacement                   │
│  • Deductible: $25                                              │
│                                                                  │
│  Premium (+$3/month):                                            │
│  • Accidental damage: 100% replacement                          │
│  • Theft: Full replacement, no report required                  │
│  • Water damage: Covered                                        │
│  • Deductible: $0                                               │
│                                                                  │
│  CLAIMS PROCESS:                                                 │
│  1. Report via app or agent                                     │
│  2. AI validates claim against usage patterns                   │
│  3. Replacement shipped within 48 hours (urban) / 7 days (rural)│
│  4. Old device remotely wiped                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Expansion: Beyond Phones

### The Device Ecosystem

```
┌─────────────────────────────────────────────────────────────────┐
│                 GTCX DEVICE ECOSYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CORE: SMARTPHONES                                               │
│  └── Primary verification device, lease-to-own                  │
│                                                                  │
│  ACCESSORIES:                                                    │
│  ├── Portable scales (Bluetooth)           $50-150              │
│  │   └── Weight verification for transactions                   │
│  │                                                               │
│  ├── Solar chargers                        $30-80               │
│  │   └── Off-grid power for remote sites                        │
│  │                                                               │
│  ├── Rugged cases + screen protectors      $20-40               │
│  │   └── Extended device lifespan                               │
│  │                                                               │
│  └── External GPS modules                  $80-200              │
│      └── Survey-grade accuracy for boundary verification        │
│                                                                  │
│  COOPERATIVE-LEVEL:                                              │
│  ├── Hub devices (shared compute)          $1,500-2,500         │
│  │   └── Serves 20-50 miners in remote areas                    │
│  │                                                               │
│  ├── XRF analyzers (gold purity)           $15,000-30,000       │
│  │   └── On-site assay capability                               │
│  │                                                               │
│  └── Satellite terminals                   $500-2,000           │
│      └── Connectivity for off-grid sites                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### XRF Analyzer Leasing (High-Value Opportunity)

**The Problem:** Miners currently can't verify gold purity on-site. They're dependent on buyers' assays, creating information asymmetry.

**The Solution:** Lease portable XRF analyzers to cooperatives.

| Metric                   | Value     |
| ------------------------ | --------- |
| Device cost              | $25,000   |
| Monthly lease            | $500      |
| Lease term               | 60 months |
| Total lease revenue      | $30,000   |
| Miners served per device | 50-200    |
| Cost per miner/month     | $2.50-10  |

**Value Proposition:**

- Cooperative knows true purity before negotiating
- Buyers can't underpay due to "questionable purity"
- Creates audit trail for quality verification
- Integrated with GeoTag system

## Pilot Program Design

### Ghana Pilot: 5,000 Devices

**Timeline:**

| Phase              | Duration   | Devices | Activities                    |
| ------------------ | ---------- | ------- | ----------------------------- |
| Soft Launch        | Month 1-2  | 100     | Test with cooperative leaders |
| Controlled Rollout | Month 3-4  | 500     | Expand to active miners       |
| Scale              | Month 5-8  | 2,000   | Regional deployment           |
| Full Deployment    | Month 9-12 | 5,000   | National coverage             |

**Budget:**

| Category                          | Amount         |
| --------------------------------- | -------------- |
| Device procurement (5,000 @ $310) | $1,550,000     |
| Logistics + deployment            | $200,000       |
| MDM platform                      | $50,000        |
| Field team (12 months)            | $180,000       |
| Insurance reserve                 | $100,000       |
| Working capital                   | $300,000       |
| Contingency (10%)                 | $238,000       |
| **Total**                         | **$2,618,000** |

**Funding Sources:**

| Source                    | Amount     | Terms               |
| ------------------------- | ---------- | ------------------- |
| IFC/AfDB (debt)           | $1,500,000 | 8% over 4 years     |
| Impact investors (mezz)   | $600,000   | 14% + revenue share |
| GTCX Foundation (equity)  | $400,000   | First-loss position |
| Ghana Minerals Commission | $118,000   | Grant/subsidy       |

## Governance + Ethics

### Device Sovereignty Principles

```
┌─────────────────────────────────────────────────────────────────┐
│              GTCX DEVICE SOVEREIGNTY CHARTER                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. OWNERSHIP PATHWAY                                            │
│     Every device has a clear path to miner ownership.           │
│     No perpetual rental traps.                                  │
│                                                                  │
│  2. DATA SOVEREIGNTY                                             │
│     Miners own their data. GTCX holds it in trust.              │
│     Full export available on request.                           │
│                                                                  │
│  3. FAIR LOCKOUT                                                 │
│     Device restrictions are proportionate and reversible.       │
│     Emergency calls always work.                                │
│     Clear escalation path before any restriction.               │
│                                                                  │
│  4. TRANSPARENT PRICING                                          │
│     All fees disclosed upfront in local language.               │
│     No hidden charges or surprise deductions.                   │
│                                                                  │
│  5. RIGHT TO REPAIR                                              │
│     Miners can repair devices at authorized local shops.        │
│     Repair doesn't void lease agreement.                        │
│                                                                  │
│  6. UPGRADE PATH                                                 │
│     Trade-in program for device upgrades.                       │
│     Credit for early payoff.                                    │
│                                                                  │
│  7. EXIT RIGHTS                                                  │
│     Return device, settle balance, exit program.                │
│     No penalties beyond outstanding balance.                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Negative Scope

This document does **not** cover:

- **GeoTag verification architecture or anti-fraud systems:** The full four-layer verification stack, cross-reference agents, and fraud detection are documented in [Agentic GeoTag Verification and Agents Layers 1-2](agentic-geotag-verification-and-agents-layers-1-2.md) and [Agentic GeoTag Agents Layers 3-4, Anti-Fraud, and Integration](agentic-geotag-agents-layers-3-4-anti-fraud-and-integration.md).
- **Sovereign infrastructure or self-hosted AI deployment:** National node hardware specs, edge model strategies, and data sovereignty architecture are covered in [Agentic Sovereign Infrastructure](agentic-sovereign-infrastructure.md).
- **Exchange layer trading mechanics or settlement protocols:** CRX/SGX/AGX agent specifications and implementation roadmaps are detailed in [Agentic AI Exchange, Implementation, and SGX](agentic-ai-exchange-implementation-and-sgx.md).

---

## Related Documents

- [Agentic Verification Thesis](agentic-verification-thesis.md)
- [Agentic Sovereign Infrastructure](agentic-sovereign-infrastructure.md)
- [Agentic TradePass Personal Economic Agent](agentic-tradepass-pea.md)
- [Agentic GeoTag Verification and Agents Layers 1-2](agentic-geotag-verification-and-agents-layers-1-2.md)
- [Agentic GeoTag Agents Layers 3-4, Anti-Fraud, and Integration](agentic-geotag-agents-layers-3-4-anti-fraud-and-integration.md)
- [Agentic Device Economy](agentic-device-economy.md)
- [Agentic MTN Partnership and Services](agentic-mtn-partnership-and-services.md)
- [Agentic MTN Operations and Revenue](agentic-mtn-operations-and-revenue.md)
- [Agentic AI Protocol and Operations](agentic-ai-protocol-and-operations.md)
- [Agentic AI Exchange, Implementation, and SGX](agentic-ai-exchange-implementation-and-sgx.md)
- [Agentic SGX Governance and Deck Creation](agentic-sgx-governance-and-deck-creation.md)
- [Agentic Deck Refinement and Protocol Explanations](agentic-deck-refinement-and-protocol-explanations.md)
- [Agentic Protocol Insights](agentic-protocol-insights.md)
