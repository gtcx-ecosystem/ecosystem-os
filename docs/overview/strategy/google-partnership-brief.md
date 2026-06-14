---
title: 'Google Partnership Brief — GTCX Ecosystem'
status: 'current'
date: '2026-05-24'
owner: 'chief-of-staff'
role: 'chief-of-staff'
tier: 'operating'
tags: ['testing']
review_cycle: 'annual'
---

# Google Partnership Brief — GTCX Ecosystem

**Date:** April 2026
**Classification:** Internal — Partnership Discussion
**Prepared for:** Google Cloud / Android / AI partnership meeting

---

## What GTCX Is

A sovereign verification protocol suite for commodity supply chains in the Global South. Six cryptographic protocols (identity, location, compliance, custody, settlement, oracle consensus) + AI intelligence layer + field hardware integration. Target: government-grade commodity traceability from mine site to export.

---

## What We've Built

| Layer                  | What                                                                           | Evidence                                                 |
| ---------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| **Protocols**          | 6 verification protocols, 63 API handlers, TypeScript + Python SDKs            | 3,177 tests, 27/31 NIST 800-53 controls                  |
| **Crypto**             | Ed25519, ZKP (Groth16/Bulletproofs), PBFT consensus                            | 19 TS packages + 6 Rust crates, zero unsafe code         |
| **Edge Runtime**       | <50MB RAM, <10MB binary, 30+ day offline, WASM-compatible                      | Rust crate with resource constraint profiling            |
| **Hardware HAL**       | 5 provider interfaces (Identity, Location, Measurement, Custody, AI)           | Zod-validated proof schemas, any-device compatibility    |
| **AI Services**        | ANISA (cultural intelligence), Cortex (pattern recognition), Veritas (KYC/AML) | 207 tests, Anthropic + OpenAI inference backends         |
| **Field Architecture** | Offline-first, 45-day disconnected operation, 2G/low-bandwidth optimized       | Conflict resolution, sync queue, 100K operation capacity |

---

## Partnership Asks

### 1. Android Hardware Partnership

**Ask:** GTCX-certified Android devices for field operations.

**Context:** The #1 device in West African mining communities is the Tecno Pop 7 — 2GB RAM, Android Go, no NFC on base variant. GTCX needs:

- Android Go certified devices with NFC for tap-to-verify identity at mine sites
- Ruggedized form factors — dust, water, drop resistance for mining environments
- Guaranteed 3-year security updates — government procurement requires it

**Google product alignment:** Android Enterprise, Android Go, OEM certification program. Introductions to Tecno, Samsung, or Nokia for Africa-optimized hardware bundles.

**GTCX delivers:** Real-world Android Enterprise deployment in mining sector, Identity Credential API adoption.

---

### 2. Google Cloud — Compute + Edge

**Ask:** GCP partnership pricing or credits for protocol infrastructure.

| Service                | GTCX Use                                 | Why Google                              |
| ---------------------- | ---------------------------------------- | --------------------------------------- |
| Cloud Run              | Protocol server deployment (63 handlers) | Scales to zero in low-traffic regions   |
| Cloud SQL (PostgreSQL) | Operational + audit databases with PITR  | Managed, encrypted, FIPS-compliant      |
| Artifact Registry      | Container images + SBOM                  | Already using Sigstore for signing      |
| Cloud KMS              | Key management for signing keys          | FIPS 140-2 validated HSMs               |
| Cloud Monitoring       | Prometheus-compatible metrics            | Already OTel instrumented (63 handlers) |
| Firebase               | Mobile app distribution (Expo → Android) | Direct path to regional Play Store      |

**Architecture:** Cloud-agnostic (Terraform, Docker, K8s). GCP is the natural fit — `africa-south1` (Johannesburg) is the closest region to West Africa operations. Multi-region data residency architecture documented (US/EU/Africa).

**GTCX delivers:** GCP footprint in underserved African markets, government contract references.

---

### 3. Tensor / Edge TPU for On-Device AI

**Ask:** Access to Coral Edge TPU or Tensor G-series for GTCX hardware devices.

**Context:** The HAL spec defines 5 AI models running on-device:

| Model                    | Size      | Purpose                      |
| ------------------------ | --------- | ---------------------------- |
| Identity verification    | 25MB      | Biometric + document check   |
| Document OCR             | 35MB      | Permit and license scanning  |
| Quality assessment       | 45MB      | Mineral grade classification |
| VIA conversational agent | 150MB     | Multilingual field guidance  |
| **Total**                | **255MB** | Fits on 128GB device         |

**Google product alignment:**

- Tensor G-series (Pixel) — if GTCX builds on Pixel hardware for premium tier
- Coral Edge TPU — for custom TapKit/VaultKit hardware modules
- TensorFlow Lite / MediaPipe — model runtime for on-device inference
- Google AI Edge SDK — latest on-device model deployment

**Specific ask:** Early access to TFLite/MediaPipe models optimized for commodity inspection (mineral identification, weight verification, document authentication).

**GTCX delivers:** Real-world edge AI deployment in frontier conditions, model performance data from field operations.

---

### 4. Android Identity Credentials API

**Ask:** Integration partnership for hardware-backed credential storage.

**Context:** TradePass issues W3C Verifiable Credentials for mining operators. Android's Identity Credential API (Android 11+) provides:

- Hardware-backed credential storage (StrongBox Keymaster)
- NFC presentation (same protocol as mobile Driver's License)
- Hardware attestation proving credential integrity

**Integration path:**

```
TradePass DID Credential → Android Identity Credential API → StrongBox → NFC Tap
```

**Google product alignment:** Android Identity Credential API, StrongBox Keymaster, Google Wallet for credential presentation.

**GTCX delivers:** First non-government VC implementation using Android Identity Credentials in Africa. Reference case for Google Wallet credential expansion beyond mDL.

---

### 5. Google Maps Platform — Licensed Site Verification

**Ask:** Maps Platform credits or partnership for GeoTag protocol.

**Context:** GeoTag verifies commodity origin by matching GPS coordinates to licensed mining sites. GTCX needs:

| API            | Use Case                                                             |
| -------------- | -------------------------------------------------------------------- |
| Geofencing API | Define and verify boundaries of licensed mining concessions          |
| Elevation API  | Altitude verification for anti-spoof (underground vs surface mines)  |
| Earth Engine   | Satellite change detection for illegal mining (deforestation, water) |
| Offline Maps   | Field operations in areas with zero connectivity                     |

**GTCX delivers:** Ground-truth commodity provenance data linked to satellite imagery. Use case for Earth Engine in regulatory enforcement.

---

### 6. Google Distributed Cloud (Future — 2027)

**Ask:** Early access or pathway discussion for on-premises deployment.

**Context:** Some GTCX customers are government agencies requiring on-premises or air-gapped deployment. Google Distributed Cloud would allow running the GTCX protocol stack on-prem while maintaining GCP service compatibility.

**Not needed now.** Signaling intent for the S5/S6 (Government/Defense) roadmap positions GTCX for GDC early access.

---

### 7. Chronicle / Security Operations

**Ask:** SIEM integration for enterprise customers.

**Context:** The S4 Enterprise roadmap requires SIEM integration. GTCX already produces:

- Structured JSON audit logs
- 23-pattern sensitive field redaction
- SHA-256 hash-chained audit trail
- OTel spans on all 63 protocol handlers

Chronicle ingestion would satisfy enterprise security team requirements on day one.

---

## Value Exchange Summary

| GTCX Brings                                       | Google Gets                                       |
| ------------------------------------------------- | ------------------------------------------------- |
| Government contracts in Africa (Ghana, Kenya, SA) | GCP footprint in underserved markets              |
| W3C DID/VC implementation on Android              | Identity Credential API real-world deployment     |
| Commodity supply chain ground-truth data          | Earth/Maps data from previously unmapped regions  |
| Field hardware HAL (any Android device)           | Android Enterprise adoption in mining sector      |
| AI-native edge architecture                       | Vertex AI / TFLite real-world frontier deployment |
| Open protocol suite (MIT license)                 | Developer ecosystem growth in Global South        |
| NIST 800-53 compliant infrastructure              | GCP compliance reference case                     |

---

## Meeting Preparation Notes

**Show, don't pitch:**

- Demo the protocol server health endpoint and a live GCI score computation
- Show the HAL provider interfaces — these are the integration contracts
- Show the Terraform configs (cloud-agnostic but GCP-ready)
- Show the controls matrix (27 NIST controls IMPLEMENTED)

**Don't ask for:**

- Google Cloud credits without showing the Terraform deployment plan
- Hardware without specifying the HAL interface contracts
- AI model training — ask for inference runtime optimization (models are ours)

**Lead with the field story:** Miners in Ghana using Android phones to register identity, capture location, and transfer custody — not the protocol architecture.

---

## One-Line Pitch

> "GTCX is the Android of commodity verification — open protocols, purpose-built hardware, government-grade trust. We need Google's edge AI, Android identity APIs, and Africa cloud infrastructure to deploy at scale."

---

**Document Status:** Internal — Partnership Discussion
**Owner:** Founder
**Next Review:** Post-meeting debrief
