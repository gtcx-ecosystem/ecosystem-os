---
title: "GTCX ecosystem cloud placement — AWS control plane + GCP ML plane"
status: current
date: 2026-06-05
owner: gtcx-docs
document_id: OPS-CLOUD-PLACE-001
canonical: true
review_cycle: quarterly
---

# GTCX ecosystem cloud placement

**Normative for:** entire GTCX ecosystem (`gtcx-infrastructure`, `gtcx-intelligence`, `compliance-os`, and sibling repos). **SoR:** `canon-os/01-docs/architecture/cloud-placement/`.  
**Principle:** Optimize by **workload**, not by picking one cloud for everything. GCP is stronger for **training/analytics ML**; AWS is the default for **compliance control plane, secrets, data residency, and production orchestration** already built in this ecosystem.

**Documentation map (read order):**

| Doc                                                                                            | ID                  | Role                                    |
| ---------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------- |
| [`README.md`](./README.md)                                     | INDEX               | Entry point, taxonomy, maintenance      |
| **This file**                                                  | OPS-CLOUD-PLACE-001 | Normative matrix (short — do not bloat) |
| [`repo-register-2026-06-05.md`](./repo-register-2026-06-05.md) | OPS-CLOUD-PLACE-002 | Per-repo register (all Tier 1–3 repos)  |

**Related:** [`gtcx-intelligence/01-docs/roadmap/global-trade-phase-3-ml-pipeline.md`](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/roadmap/global-trade-phase-3-ml-pipeline.md) (Vertex, GCS, BigQuery, GCP→AWS WIF bridge).

---

## Placement matrix (by workload)

| Workload                                                        | Primary cloud             | Typical services                                                     | Owning repos                               |
| --------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| Compliance web + API + diligence                                | **AWS**                   | EKS, RDS/Postgres, ElastiCache, ALB, Secrets Manager, S3 Object Lock | `compliance-os`, `gtcx-infrastructure`     |
| Gateway, sovereign, audit signing                               | **AWS**                   | EKS (`compliance-gateway`), SM, IRSA                                 | `gtcx-infrastructure`, `gtcx-core`         |
| Intelligence **runtime** (orchestrator, cost router, `/health`) | **AWS** (today)           | EKS `intelligence` namespace, staging/prod clusters                  | `gtcx-infrastructure`, `gtcx-intelligence` |
| Intelligence **training / eval lineage / batch ML**             | **GCP**                   | Vertex AI Pipelines, GCS, BigQuery, Artifact Registry                | `gtcx-intelligence` (Phase 3)              |
| LLM **inference via API** (Claude, etc.)                        | **Cloud-agnostic**        | HTTPS + vault keys; no benefit from hosting Next.js on GCP           | `compliance-os`, `gtcx-intelligence`       |
| Mobile / field sync                                             | **AWS** (+ edge)          | API backends on EKS; MinIO/S3 regional buckets                       | `compliance-mobile`, `via-api`, `vxa-api`  |
| Protocols / staging DID                                         | **AWS** (staging cluster) | Kong, gateway, cluster secrets                                       | `gtcx-protocols`, `gtcx-infrastructure`    |

---

## AWS control plane (gtcx-infrastructure optimizes here)

**Owns:**

- Regional EKS (e.g. `af-south-1`, staging/production namespaces)
- Secrets Manager → External Secrets Operator → pod env
- RDS / Postgres, Redis, CouchDB where applicable
- S3 regional buckets, WORM/audit retention, KMS
- IRSA / pod identity, network policies, validate-all gates
- Cross-repo unblock: INT-S9-01 **cluster auth wiring** (not GCP migration)

**Do not** move compliance-os or gateway to GCP without a dedicated migration epic (new cluster, WI, Secret Manager, DR re-proof).

**Repo anchors:**

- K8s: `compliance-os/04-ship/compliance-os/k8s/`
- Infra coordination: `gtcx-infrastructure/01-docs/04-ops/coordination/`
- Hub #17: `compliance-os-staging` secrets + EKS deploy — **AWS path**, not Vertex

---

## GCP ML plane (gtcx-intelligence optimizes here)

**Owns (Phase 3+):**

- GCP project `gtcx-intelligence-ml` (or org-standard name)
- GCS datasets/models (lifecycle to Nearline/Coldline)
- Vertex AI Pipelines (training, fine-tune, eval cycles)
- BigQuery `ml_lineage` tables
- **Zero customer PII in GCP** — anonymized/scrubbed traces only (audit gate)

**Inference/runtime stays on AWS until explicitly migrated:**

- `intelligence-staging.gtcx.trade` / orchestrator Deployment on **existing EKS**
- `ENABLE_COST_ROUTER`, `qualityScores` on `/health` — cluster env, not GKE requirement
- Credentialed smoke (INT-S9-01) — protocols token + **AWS-hosted** staging route

**Do not** justify compliance-os GCP migration for “AI strength”; API-based agents do not need GKE.

---

## GCP ↔ AWS bridge (both teams)

Canonical design: [`global-trade-phase-3-ml-pipeline.md`](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/roadmap/global-trade-phase-3-ml-pipeline.md) § GCP→AWS credential bridge.

| Direction | Data                             | Mechanism                                                                     |
| --------- | -------------------------------- | ----------------------------------------------------------------------------- |
| GCP → AWS | Model artifacts (no PII)         | WIF → IAM role `intelligence-gcp-ml-bridge` → S3 `gtcx-intelligence-models/*` |
| GCP → AWS | Registry metadata                | DynamoDB `intelligence-model-registry`                                        |
| AWS → GCP | Anonymized training exports only | Batch job; no live prod DB replication to GCS                                 |

**gtcx-infrastructure** implements and audits the AWS side (IAM, S3, DynamoDB).  
**gtcx-intelligence** implements GCP side (Vertex, GCS, BQ) and proves PII-free exports.

---

## Anti-patterns

| Anti-pattern                                                                   | Why                                                                   |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Single-cloud mandate “everything on GCP for AI”                                | Duplicates AWS investment; does not speed Claude API compliance flows |
| Single-cloud mandate “everything on AWS”                                       | Blocks Vertex/BQ training roadmap                                     |
| Staging compliance on GCP while prod on Vercel/AWS without a documented origin | Breaks hub #17 / exploration retest (`COMPLIANCE_OS_URL`)             |
| Prod Postgres or PII in GCP for convenience                                    | Violates Phase 3 acceptance (“zero customer PII in GCP”)              |
| New services defaulting to “wherever” without updating this matrix             | Drift in secrets, runbooks, and validate-all                          |

---

## Agent optimization checklist

### gtcx-infrastructure

- [ ] Default new **platform** secrets, EKS manifests, RDS, S3, DR runbooks to **AWS**
- [ ] Implement **GCP→AWS bridge** IAM/S3/Dynamo when intelligence Phase 3 starts — do not block on full GCP compliance migration
- [ ] Keep **intelligence orchestrator** on EKS; enable feature flags (`ENABLE_COST_ROUTER`) via Deployment env
- [ ] Document canonical **public origins** per environment (e.g. `compliance.gtcx.trade` vs ingress hostnames)

### gtcx-intelligence

- [ ] Phase 3 ML work in **GCP** (Vertex, GCS, BQ) per roadmap
- [ ] Runtime smoke / cost router / INT-S9-01 on **AWS staging cluster** until GKE epic approved
- [ ] Export only **anonymized** traces to GCS; never copy `licence_diligence_reviews` or raw evidence to GCP
- [ ] Publish model artifacts to **AWS S3** via bridge; shadow deploy from AWS registry

### compliance-os (and siblings)

- [ ] Compliance web, API, CaaS production path: **AWS** + regional residency
- [ ] LLM calls: provider APIs (Anthropic); optional routing via intelligence service over HTTPS
- [ ] Do not add GCP-only deploy as blocker for ER-1-10 / hub #17

---

## Regional residency (unchanged)

| Region overlay | Primary use                          |
| -------------- | ------------------------------------ |
| `af-south-1`   | Africa — default Global South anchor |
| `eu-central-1` | EU data residency                    |
| `us-east-1`    | Americas                             |

GCP regions for ML (e.g. `us-central1` for Vertex) are **training-plane only**; production compliance data stays in AWS regional buckets/RDS per overlay.

---

## Phase 3 Terraform bridge (gtcx-infrastructure)

| Artifact                                        | Status                                                                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Module `04-ship/terraform/modules/gcp-ml-bridge/` | **Shipped** — `enabled = false` by default                                                                                                                    |
| Epic                                            | [`intelligence-phase-3-gcp-ml-bridge-epic-2026-06-05.md`](https://github.com/gtcx-ecosystem/gtcx-infrastructure/blob/main/01-docs/04-ops/intelligence-phase-3-gcp-ml-bridge-epic-2026-06-05.md) |

## Ecosystem filing

| Hub                        | Doc                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Index**                  | [`README.md`](./README.md)                                                                                                  |
| **Per-repo register**      | [`repo-register-2026-06-05.md`](./repo-register-2026-06-05.md)                                                              |
| gtcx-protocols playbook §6 | [`ecosystem-unblock-playbook-2026-06.md`](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/main/01-docs/04-ops/coordination/ecosystem-unblock-playbook-2026-06.md)                    |
| baseline-os inbound        | [`from-gtcx-docs-cloud-placement-2026-06-05.md`](https://github.com/gtcx-ecosystem/baseline-os/blob/main/workstream/coordination/inbound/from-gtcx-docs-cloud-placement-2026-06-05.md) |

## References

| Doc                                                                                                                                                          | Repo                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| [cloud-placement-aws-control-plane-2026-06-05.md](https://github.com/gtcx-ecosystem/gtcx-infrastructure/blob/main/01-docs/04-ops/coordination/cloud-placement-aws-control-plane-2026-06-05.md) | gtcx-infrastructure annex  |
| [cloud-placement-gcp-ml-plane-2026-06-05.md](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/04-ops/coordination/cloud-placement-gcp-ml-plane-2026-06-05.md)             | gtcx-intelligence annex    |
| [repo-register-2026-06-05.md](./repo-register-2026-06-05.md)                                                                                 | OPS-CLOUD-PLACE-002        |
| [ecosystem-blockers-witness-2026-06-05.md](https://github.com/gtcx-ecosystem/compliance-os/blob/main/01-docs/04-ops/coordination/ecosystem-blockers-witness-2026-06-05.md)                                                          | compliance-os witness      |
| [w2-hub-17-ticket-map-2026-06-05.md](https://github.com/gtcx-ecosystem/compliance-os/blob/main/01-docs/04-ops/coordination/w2-hub-17-ticket-map-2026-06-05.md)                                                                      | Hub #17 (AWS secrets path) |
