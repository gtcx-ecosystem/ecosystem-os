---

title: 'Via Tm Virtual Instructor Agent'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['guides', 'how-to']
review_cycle: 'on-change'

---

## Executive Summary

> **Status:** Current

# VIA (Virtual Instructor Agent)

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

### White Paper v1.1

**Date:** 6 June 2025

#### Abstract

The **Verification & Inspection Agent (VIA)** is an offline‑capable, AI‑driven field companion that captures, verifies, and synchronizes compliance data for **any physical‑asset supply chain**—from precious metals and critical minerals to agricultural commodities and pharmaceuticals. Operating as a key pillar of the GTCX Trust Fabric, VIA bridges last‑mile data gaps by issuing cryptographically signed attestations of identity, provenance, custody, and safety—even in connectivity‑constrained environments. This paper details VIA’s purpose, architecture, functional specifications, economic rationale, and phased roadmap for roll‑out across frontier and emerging markets.

### 1 · Background & Problem Statement

Fragmented verification workflows, paper‑based logs, and limited digital infrastructure create opacity and risk across many asset classes. Governments, producers, traders, and financiers struggle to trust provenance claims, while legitimate actors are excluded from premium markets and fair financing. A field‑ready, low‑cost verification layer is needed to transform ground‑truth observations into portable, auditable proof—regardless of commodity type.

### 2 · Purpose & Scope

VIA serves as the primary “boots‑on‑the‑ground” agent within the GTCX ecosystem, responsible for:

- **Identity Proofing** – binding individuals, equipment, and operating sites to cryptographic credentials.
- **Inspection & Data Capture** – recording GPS‑stamped media, sensor readings, and rule‑based checklists.
- **Real‑Time or Deferred Attestation** – producing signed verification records compatible with TradePass and ComReg Toolkit schemas.
- **Offline Resilience** – operating 30 + days without network access while maintaining data integrity.

While the initial pilots focus on West African mining, VIA is designed to be **commodity‑agnostic** and extensible via the VXA SDK.

### 3 · System Overview

#### 3.1 Role in the GTCX Trust Fabric

VIA converts physical observations into verifiable digital events that feed scoring engines (e.g., **Compliance Index, CI**) and liquidity applications (GTCX Exchange).

> **Diagram 1 · VIA System Context**\
> &#xNAN;_(template-token: VIA  EventCore  ComReg Toolkit  TradePass data flows.)_

#### 3.2 Offline‑First Design Principles

- **Store‑and‑Forward Sync** using content‑addressed blobs and Merkle proofs.
- **Deterministic Rule Packs** (JSON Logic) for on‑device validation.
- **Edge‑Model Inference** for OCR, biometric checks, and anomaly detection (runs on ARM A55 + @ < 2 W).

### 4 · Architecture

#### 4.1 Core Modules

| Module             | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Identity Spine** | DID key‑pair vault; supports FIDO2 hardware keys & biometrics.                      |
| **Rules Engine**   | Hot‑swap JSON Logic rule packs (licensing, environmental, KYC, commodity‑specific). |
| **Data Capture**   | Abstracts camera, GNSS, BLE sensor feeds into typed events.                         |
| **Sync Engine**    | Opportunistic LoRaWAN, Wi‑Fi, or GSM; ensures forward‑secrecy.                      |

#### 4.2 Reference Hardware Footprint

- **Raspberry Pi CM4** or **Qualcomm QRB5165** module.
- 12 MP global‑shutter camera, dual‑band GNSS, barometer, BLE reader.
- 10 h active / 30 d standby on 10 000 mAh Li‑ion (solar top‑up).
- Tamper‑evident enclosure, IP54,  3 kg total kit weight.

#### 4.3 Interoperability APIs

```json
{
  "event_type": "via.verification",
  "schema_version": "1.2.0",
  "actor_did": "did:gctx:xyz123",
  "geo_hash": "sp3e9yg",
  "captured_at": "2025-08-14T09:12:34Z",
  "commodity": "Au", // ISO 4217 or custom code
  "evidence": [{ "type": "photo", "cid": "bafy...", "sha256": "d2c7..." }],
  "rules_evaluated": [{ "rule_id": "license.active", "result": true }],
  "sig": "0xabc..."
}
```

### 5 · Functional Specifications

#### 5.1 Verification Workflows (Examples)

- **License Check** – Scan QR on permit OCR text verify against regulator API sign.
- **Chain‑of‑Custody** – NFC scan of sealed container hash seal code append to custody record.

#### 5.2 Inspection Workflows (Configurable)

- **Environmental** – capture pH sensor readings; enforce rule thresholds per commodity.
- **Safety** – ensure PPE checklist completion via computer‑vision counts.

#### 5.3 Data Schemas & Extensions

All events conform to **EventCore 0.9**; VIA extensions are specified in _VIA‑ECS‑1_ RFC (companion spec).

#### 5.4 Security & Privacy

- **End‑to‑End Encryption** via XChaCha20‑Poly1305.
- **Selective Disclosure** using BBS+ signatures for zero‑knowledge proof generation.

### 6 · Economics & Sustainability

#### 6.1 Cost Model (USD, Years 0–3)

| Line Item                | Year 0 Pilot        | Year 1    | Year 2    | Year 3    |
| ------------------------ | ------------------- | --------- | --------- | --------- |
| Hardware kit (per unit)  | $250                | $210      | $190      | $180      |
| Software upkeep (agent)  | $0.30 /verification | $0.28     | $0.25     | $0.22     |
| Backhaul & cloud         | $0.10 /verification | $0.09     | $0.08     | $0.07     |
| **Total $/verification** | **$0.40**           | **$0.37** | **$0.33** | **$0.29** |

Field fees are covered by transaction spreads or compliance service fees; breakeven at moderate volumes (e.g., 1 000 verifications/month in pilot markets).

#### 6.2 Network Effects

Each verified asset enhances CI scoring accuracy, lowering risk premiums. Adoption curve follows Metcalfe‑style network dynamics (see Appendix B).

### 7 · Roadmap & Implementation Plan

| Phase               | Timeline | Milestones                                                                                                                 |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Alpha**           | Q3 2025  | 10 units deployed across mixed mining and agricultural sites; rule‑pack v0.1 validated.                                    |
| **Beta**            | Q4 2025  | 100 units; integrated with TradePass KYC Tier 2; two‑way ComReg ingestion.                                                 |
| **Scale‑Up**        | 2026     | 1 000 units across multiple commodities (minerals, agri, pharma); anomaly ML models deployed; API GA.                      |
| **Standardization** | 2027     | Adoption by regional trade blocs (e.g., ECOWAS, AfCFTA); open‑source governance under a Linux Foundation‑style consortium. |

### 8 · Governance & Continuous Improvement

- **Dual License** – AGX Public License 1.0 + commercial SLA option.
- **RFC Process** – governed via _Governance RFC Process v1.0_ (companion spec).
- **Field Council** – quarterly producer & regulator feedback loops to iterate rule packs.

### 9 · Conclusion

VIA operationalizes proof‑based compliance at the very edge of any supply chain. By coupling offline‑first AI with cryptographic attestations, it converts subjective inspections into quantitative trust signals—unlocking fair pricing, improved capital access, and ESG assurance across global markets.

### Appendix A · Glossary

- **DID** – Decentralized Identifier.
- **JSON Logic** – declarative rules format.
- **CI** – Compliance Index.

### Appendix B · References & Further Reading

1. OECD Annex II Risk Mitigation Framework (2016).
2. EU Battery Passport Technical Framework (2024).
3. EventCore 0.9 Technical Spec (GTCX Docs, 2025).

## Negative Scope

This document does **not** cover:

- **VXA inspection and evidence capture workflows** (smart checklists, photo quality checks, evidence bundles): See [VXA (Virtual Inspection Agent)](vxa-virtual-inspection-agent.md)
- **API and security implementation** (REST endpoints, cryptographic evidence integrity, offline security): See [VIA/VXA — API & Security](via-vxa-api-security.md)
- **Enterprise deployment and pricing models** (SaaS tiers, on-premise, data residency): See [Product VXA Enterprise](product-vxa-enterprise.md)

4. Metcalfe, R. (2013). Network Economics and Trust Networks.
