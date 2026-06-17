---
title: 'GTCX Cloud vs GTCX Sovereign'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['deployment', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# GTCX Cloud vs GTCX Sovereign

This page describes how **protocols** fit the **two product lines** defined in **gtcx-platforms**. Product shape, operator boundaries, and deployment topology are canonical in:

**[ADR-007: Two-Product Consolidation — GTCX Cloud + GTCX Sovereign](https://github.com/gtcx-ecosystem/gtcx-platforms/blob/main/01-docs/architecture/decisions/ADR-007-two-product-consolidation.md)**

`gtcx-protocols` is the **jurisdiction-neutral verification rail** (six protocols + SDK + CSP packs). It does not choose countries — **deals** choose Cloud, Sovereign, or both.

## Two products, one rail

| Product | Where it lives | Operator | Typical buyer |
| ------- | -------------- | -------- | ------------- |
| **GTCX Cloud** | Multi-tenant SaaS (AGX, Veritas, hosted TradePass, …) | GTCX | Exchanges, consortia, NGOs, co-ops, private operators, integrators |
| **GTCX Sovereign** | One deployable stack per government (CRX + SGX + Pathways + Operations) | Government in-country | Ministry, customs, minerals commission, revenue authority |

Both products embed the same protocol libraries and interoperate (e.g. Sovereign-issued identity usable on Cloud — see ADR-007).

**Do not map ISO country codes to a product line in documentation.** The same jurisdiction can have Cloud tenants and a Sovereign deployment in parallel when separate deals close.

## GTCX Cloud

| Aspect | Cloud |
| ------ | ----- |
| **Tenancy** | Multi-tenant; `X-GTCX-Tenant-Id` scopes data by jurisdiction/config |
| **Keys** | GTCX-operated (KMS / Vault Transit) for hosted paths |
| **CSP** | Often **provisional** (GTCX-signed) until a sovereign countersignature exists for that jurisdiction |
| **SLA** | Best-effort until CSP ratification where applicable — see [Trust center](../trust/trust-center.md) |
| **Time to integrate** | Days — API key, tenant, SDK |

**Examples of Cloud-shaped opportunities** (illustrative, not a priority list): mercantile exchanges, industry associations, private corridors, field programs consuming hosted APIs via mobile or platforms.

## GTCX Sovereign

| Aspect | Sovereign |
| ------ | --------- |
| **Tenancy** | Dedicated; residency per CSP `residency.yaml` |
| **Keys** | Production authority keys in sovereign HSM (per engagement) |
| **CSP** | **Ratified** when GTCX and in-country authority cosign |
| **SLA** | [GTCX Sovereign Edition SLA](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/main/01-docs/ops/gtm/sla.md) from ratification date |
| **Time to deploy** | Longer — ceremony, UAT, countersignature |

**Examples of Sovereign-shaped opportunities** (illustrative): national permit and export systems (CRX/SGX), ASM formalization (Pathways), government-operated field operations.

## Jurisdiction-as-config (protocols + platforms)

New geography does not require new protocol code:

1. Add or extend a **Country Support Package** — `country-support-03-platform/packages/<iso>/v1.0.0/` in gtcx-protocols.
2. Load **jurisdiction config** in gtcx-platforms (`JurisdictionConfigService` — rates, commodities, rules).
3. Point mobile and integrators at tenant `<iso>` and the correct API host from the Welcome Pack.

Pursue **parallel opportunities**; the **first deal to close** drives the reference case study — not a fixed calendar in this documentation.

## Same protocol release pin

Every deployment should align to a single release line (currently **v0.4.4**):

- Container: `ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4`
- SDK: `@gtcx/sdk@^0.4.0`
- See [Compatibility matrix](../release/compatibility-matrix.md)

## Upgrade path (per deal, per jurisdiction)

When a jurisdiction moves from provisional to ratified trust:

1. Complete HSM ceremony and sovereign countersignature on the CSP.
2. Update authority `key_status` to `production` for that jurisdiction's authorities.
3. Apply Sovereign SLA and residency where the contract requires it.

Cloud pilots do not block Sovereign work, and Sovereign ratification does not block Cloud tenants in the same or other jurisdictions.

## What to tell procurement

| Question | Cloud-oriented answer | Sovereign-oriented answer |
| -------- | --------------------- | ------------------------- |
| Who operates the software? | GTCX (multi-tenant SaaS) | Government (in-country) |
| Where is data? | Per tenant + CSP residency rules | Enforced per ratified CSP |
| Who signs authority credentials? | GTCX-operated until rotation | Sovereign HSM-backed authorities |
| Is the CSP ratified? | May be provisional | Target state is ratified |
| Which protocols? | Same six — see [protocol guides](../protocols/tradepass.md) | Same six, embedded in Sovereign binary |

## Documentation discipline

External docs (this GitBook) should:

- Describe **operator type** and **product line**, not "country X is Cloud."
- Use `<iso>` or fictional examples in API samples — not "lead country" labels.
- Link **ADR-007** for product truth; link **compatibility matrix** for version pins.

Country-specific GTM detail belongs in **private deal packs** or internal runbooks, not in versioned public docs that are hard to scrub later.

## Related

- [Ecosystem integrations](ecosystem-integrations.md)
- [Verify a lot](../verify-a-lot.md)
- [Trust center](../trust/trust-center.md)
- [gtcx-platforms README](https://github.com/gtcx-ecosystem/gtcx-platforms/blob/main/README.md)
