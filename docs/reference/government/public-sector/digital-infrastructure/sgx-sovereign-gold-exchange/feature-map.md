---

title: "Feature Map"
status: "current"
date: "2026-05-26"

---

# Feature Map

#### Integration Highlights

1. **TradePass™ Miner ID** ties each individual miner to their operator account.
2. **Gold ID™** uniquely marks metal—every batch of gold minted, refined or exported gets its own asset ID, separate from GeoTag’s location tag.
3. **Goldmine ID™** seeds mine metadata into Gold ID™ records automatically.
4. **GoldScore™** from GCI™ gates each Gold ID™ lot before it can enter the Export Approval Pipeline.

| Domain                  | Core Capability                                           | AGX Module                        |
| ----------------------- | --------------------------------------------------------- | --------------------------------- |
| **Operator Credential** | Onboard & verify corporate/exporter identities            | TradePass™ (corporate & exporter) |
| **Miner Identity**      | Issue & manage unique IDs for individual miners           | TradePass™ Miner ID               |
| **Gold Asset Identity** | Assign & track unique identifiers to each gold batch/lot  | Gold ID™                          |
| **Mine Site Registry**  | Register mine sites with geolocation & operator linkage   | Goldmine ID™                      |
| **Lot & Geo-Tagging**   | Attach tags (QR/NFC), capture GPS metadata per batch      | GeoTag™                           |
| **Risk & Compliance**   | Compute & gate on-chain risk scores                       | GCI™ → GoldScore™                 |
| **Custody & Vaulting**  | Sync approved lots with vault intake & audit trails       | VaultOS™                          |
| **Export Workflow**     | Automate export manifests, duty/tax, e-signatures         | Export Approval Pipeline          |
| **Verification API**    | Read-only lookups for TradePass, Gold ID, GeoTag & scores | SGX Verification API              |

SGX (Phase 2) Feature Landscape

| Domain                  | Core Capabilities                                        | AGX Products & Modules                        |
| ----------------------- | -------------------------------------------------------- | --------------------------------------------- |
| **Operator Identity**   | Sync active operator profiles + roles                    | TradePass™ credential issuance                |
| **Miner Identity**      | Onboarding & verification of individual miners           | GoldID™ smart-card & biometric binding        |
| **Mine Registry**       | Register mine sites with geolocation & metadata          | Goldmine ID™ site profiles                    |
| **Lot & Geo-Tagging**   | Batch creation API, QR/NFC tags, GPS metadata            | GeoTag™ lot tracking                          |
| **Risk & Compliance**   | Automated risk scoring, rule-based gating, alerts        | GCI™ (Gold Compliance Index) → **GoldScore™** |
| **Custody & Vaulting**  | Vault partner onboarding, inventory sync, audit trails   | VaultOS™ custody integration                  |
| **Export Workflow**     | Digital export manifests, duty/tax calc, e-signatures    | Export Approval Pipeline                      |
| **Verification API**    | Read-only endpoints for third-party validation           | TradePass™ & Registry API                     |
| **Analytics & Reports** | Dashboarding for volumes, license status, compliance KPI | Custom report builder                         |

#### Enhanced Integration Flows

1. **Operator ↔ Miner ↔ Mine**
   - **TradePass ID** ties to corporate or individual exporter.
   - **GoldID™** issues each miner a verifiable identity card.
   - **Goldmine ID™** registers the physical mine site (owner/operator linkage).
2. **Mine ↔ Lot**
   - Mine-level metadata (from Goldmine ID™) auto-populates lot origin fields when creating a GeoTag™ batch.
3. **Lot ↔ Risk Gate**
   - Every GeoTag™ lot passes through the GCI™ engine; the resulting **GoldScore™** determines whether it can proceed to export or requires review.
4. **Export → Vault**
   - Post-approval, VaultOS™ partners generate custody tickets tied back to TradePass™, GoldID™, and Goldmine ID™ records.
5. **Buyer Verification**
   - Buyers query a lot or certificate ID via the Verification API and receive a full chain-of-custody: TradePass, GoldID, Goldmine ID, GeoTag history, and GoldScore.
