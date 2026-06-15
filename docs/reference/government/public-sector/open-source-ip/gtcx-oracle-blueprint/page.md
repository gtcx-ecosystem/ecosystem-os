---
title: Page
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Page

### 1 | What Changes (and What Doesn’t)

<table data-header-hidden><thead><tr><th width="129.2421875"></th><th width="189.25"></th><th></th></tr></thead><tbody><tr><td>Aspect</td><td>“Oracle” in a Blockchain World</td><td><strong>PANX Oracle™ in a Non-Blockchain GTCX</strong></td></tr><tr><td><strong>Destination</strong></td><td>Smart-contract storage variables</td><td>Postgres/BigQuery tables, Kafka topics, REST/GraphQL endpoints</td></tr><tr><td><strong>Immutability</strong></td><td>Guaranteed by consensus &#x26; blocks</td><td>Achieved via: ① append-only, hash-chained log (e.g., AWS QLDB, Merkle Trees) ② periodic hash anchors to a public timestamping service (optional)</td></tr><tr><td><strong>Execution Triggers</strong></td><td>Solidity / Move / Rust on-chain functions</td><td>Micro­services, Lambda/Cloud Run workers, SGX settlement engine, compliance score recalculators</td></tr><tr><td><strong>Incentives</strong></td><td>Crypto staking &#x26; slashing</td><td>Contractual SLAs + fiat bonds + signed audit attestations; same economic logic, different instruments</td></tr></tbody></table>

_Key point:_ the integrity primitives (digital signatures, multi-source consensus, deviation rules, hardware attestation) stay exactly the same—the “consumer” of the feed simply moves from a smart contract to whatever backend you already run.

---

### 2 | High-Level Data Path (No Ledger Required)

```mermaid
graph TD
  A[AFI Devices<br>Rugged NFC + GPS] -->|signed JSON| B(PANX Ingest API)
  B --> C{Aggregator Rules<br>(median, outlier filter, heartbeat)}
  C --> D[Hash-Chained Log<br>(QLDB / Temporal DB)]
  D --> E[Event Bus<br>(Kafka / PubSub)]
  E --> F1[Compliance Engine<br>(TradePass tiers)]
  E --> F2[SGX Order-Book<br>(central exchange DB)]
  E --> F3[AGI Analytics<br>(risk models)]
```

#### Security Anchors

1. **Hardware keys** in AFI devices sign payloads.
2. **Multi-party signatures** (e.g., customs + vault) required before an “Export Cleared” event is accepted.
3. **Hash-chain log** makes the audit trail tamper-evident; if you ever want independent timestamping, you can periodically push the head-hash to a public notarisation service (e.g., OpenTimestamps, AWS Audit Manager) without exposing sensitive data.

---

### 3 | Data Feeds You’d Still Want

| Feed                       | Used For                             | Source Types                                    | Update Rule                       |
| -------------------------- | ------------------------------------ | ----------------------------------------------- | --------------------------------- |
| **Spot Gold Price**        | SGX settlement, collateral valuation | LBMA API, PMMC daily fix                        | 0.1 % deviation or 30 s heartbeat |
| **Compliance Status**      | TradePass tier upgrades              | Minerals Commission gateway, inspection uploads | Event-driven                      |
| **Vault Proof-of-Reserve** | Escrow release, investor reporting   | RFID scanners, third-party auditors             | Hourly                            |
| **GPS + Weight @ Field**   | Instant _Payout™_ to miners          | AFI scanners                                    | Real-time                         |

All of these can arrive as signed JSON and land in your message bus; the same median/outlier logic keeps them attack-resistant.

---

### 4 | Incentive & Governance Without Tokens

| Mechanism                     | Practical Implementation Today                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Staked Operator Guarantee** | Cash performance bond or bank guarantee held in escrow; triggered by SLA breach or falsification.                            |
| **Reputation Scores**         | Public dashboard that ranks each node’s latency, uptime, and accuracy; poor performers lose contracts.                       |
| **Redundancy**                | At least three independent data sources per feed; majority vote or median selected.                                          |
| **Watchdog**                  | Separate monitoring service (can be internal) that halts downstream actions if feeds go silent or deviate beyond thresholds. |

---

### 5 | Regulator & Customs On-Ramp (Ghana Example)

1. **Lightweight Gateway Node (LGN)**—a small box or secure VM—sits in the Minerals Commission office.
2. Officer scans/export-permit QR → LGN auto-hashes and signs → sends event to PANX Ingest API.
3. PANX waits for matching signatures from Airport Customs LGN _and_ Vault LGN; once quorum reached, the event is written to the tamper-proof log and pushed to SGX & TradePass.
4. Regulators get a read-only dashboard that shows the same immutable record industries and investors see—no blockchain required.

---

### 6 | Why Build It _Before_ You Add a Ledger

- **Faster Roll-Out:** No need for node incentives, wallet UX, or devops for validators.
- **Immediate Business Value:** Field payments, compliance automation, exchange settlement can begin as soon as the API is live.
- **Future-Proof:** All data are already cryptographically signed and hash-chained. If/when you migrate to a blockchain, you port the **log** not the devices.
- **Regulator Comfort:** Many agencies are still wary of “crypto”; a traditional but cryptographically verifiable pipeline is an easier first sell.

---

### 7 | Next Steps

1. **Decide on the tamper-proof log tech** (AWS QLDB, Chronicle, or a simple Merkle tree you anchor weekly).
2. **Draft SLA & bonding terms** for node operators (banks, vaults, customs, auditors).
3. **Prototype the Ingest API + Event Bus** (simple REST → Kafka/Postgres) and push a sample GPS + weight feed end-to-end.
4. **Design the regulator dashboard** showing how their uploads instantly propagate through SGX and TradePass.

Once you’re comfortable with that flow, we can turn the earlier blueprint into a detailed PRD (phase zero) that maps out sprint tasks, cost estimates, and approval checkpoints—all without touching a blockchain.

Let me know where you’d like to dig deeper: data-model schema, hardware spec for AFI scanners, SLAs, or the compliance-engine handshake.

#### Adding an ML / AI / LLM Layer to the PANX “Oracle”

Below is a concise map of **where machine-learning, advanced analytics, and large-language models plug into the trust-pipeline you already run** (Postgres / Kafka / hash-chained log) and how they upgrade each stage—from raw capture to user-facing insight—without forcing you onto a public blockchain.

---

###
