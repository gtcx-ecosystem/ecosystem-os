---
title: 'ADR-001: EAP Control Plane and Secret Storage'
status: accepted
date: 2026-06-02
owner: gtcx-docs
tier: critical
tags: [['adr', 'eap', 'architecture', 'credentials']]
review_cycle: on-change
document_type: architecture
deciders: ['protocol-architect', 'security', 'platform']
supersedes: null
---

# ADR-001: EAP control plane and secret storage

## Status

**Accepted** (2026-06-02) — Phase A architecture lock for Phase B implementation.

## Context

External customers and governments need API access to GTCX services. Today, `AUTH_API_KEYS` in AWS Secrets Manager are updated manually (see `gtcx-intelligence` deploy runbook). Baseline Vault correctly holds **inbound** provider keys but must not become the issuer for customer credentials.

Open questions from [external-access-credential-plane.md](../external-access-credential-plane.md) §12:

1. Where does EAP run?
2. Where do secrets live?
3. Naming and vault bridge?

## Decision

### 1. Hosting — EAP control plane in `gtcx-core`

- **Decision:** Implement Phase B EAP as a module/service in **`gtcx-core`** (admin API + registry + audit).
- **Rationale:** `gtcx-core` already targets platform services (SOC2 readiness mentions future key issuance). Keeps Intelligence focused on product runtime, not credential minting.
- **Not chosen (Phase B):** Intelligence-embedded auth service (couples product to issuance); Kong-only (no audit/evidence story without custom plugin).

### 2. Storage — split control plane and secret SoR

- **Decision:**
  - **Metadata + audit:** EAP database (Postgres recommended; SQLite acceptable for local dev only).
  - **Secret material:** **AWS Secrets Manager** per environment, paths owned by EAP (`eap/clients/{client_id}` + sync into service-specific keys like `AUTH_API_KEYS`).
- **Rationale:** Matches existing Intelligence staging pattern; SOC2-friendly rotation; avoids duplicating encryption in a new vault product.
- **Not chosen:** Baseline Vault as SoR for customer keys (violates plane separation).

### 3. Naming — backward compatible smoke env

- **Decision:** Keep `GTCX_API_KEY` and aliases for credentialed evidence packs. Introduce `GTCX_CLIENT_ID` / `GTCX_CLIENT_SECRET` when OAuth E2 ships (Phase C).
- **Rationale:** `deployment-proof-index` and intelligence runners already canonicalize `GTCX_API_KEY`.

### 4. Vault bridge — evidence cache only

- **Decision:** Baseline Vault MAY store `external_evidence_cache` entries for CI/smoke with fingerprint metadata and TTL ≤ 90 days. Production tenant keys MUST NOT use vault as SoR.
- **Rationale:** Unblocks credentialed evidence while EAP MVP is built.

### 5. Protocol number — Protocol 23

- **Decision:** **Protocol 23** governs external access credentials. Protocol 19 remains inbound-only.

## Consequences

### Positive

- Clear repo ownership for Phase B build (`gtcx-core` + infra IAM).
- Intelligence adapter is sync-only, smaller blast radius.
- Agents have explicit prohibition (Protocol 23 §7).

### Negative / risks

- Two systems to operate (EAP DB + SM) until unified portal (Phase C).
- Sync latency must be monitored for revocation SLA.

### Follow-ups

| Item | Owner | Target |
| --- | --- | --- |
| EAP admin API skeleton | gtcx-core | Phase B week 1–2 |
| SM path + IAM | gtcx-infrastructure | Phase B week 1 |
| Intelligence sync adapter | gtcx-intelligence | Phase B week 3–4 |
| Evidence validator in CI | gtcx-protocols | Phase B week 2 |
| Security review → Protocol 23 `current` | gtcx-docs | End Phase A |

## Compliance

Supports SOC2 CC6.x (logical access, rotation) and CC7.x (audit) via issuance evidence contract and EAP audit tables.
