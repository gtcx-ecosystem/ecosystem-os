---
title: "GTCX ecosystem cloud placement — per-repo register"
status: current
date: 2026-06-05
owner: gtcx-docs
document_id: OPS-CLOUD-PLACE-002
supersedes: informal chat / audit notes only
parent: gtcx-ecosystem-2026-06-05.md
review_cycle: quarterly
---

# Per-repo cloud placement register

**Normative parent:** [`gtcx-ecosystem-2026-06-05.md`](./gtcx-ecosystem-2026-06-05.md)  
**Index:** [`README.md`](./README.md)

**Principle:** AWS = compliance control plane + intelligence **runtime** on EKS · GCP = training/analytics ML (Vertex, GCS, BigQuery) · LLM API calls = **cloud-agnostic**.

---

## 1. Optimization model

### 1.1 Planes

| Plane         | Optimize for                                  | Primary cloud      | Primary optimizer repo              |
| ------------- | --------------------------------------------- | ------------------ | ----------------------------------- |
| Control       | Trust, secrets, prod data, M2M, residency, DR | **AWS**            | `gtcx-infrastructure`               |
| ML factory    | Training, lineage, batch analytics            | **GCP** (Phase 3+) | `gtcx-intelligence`                 |
| API inference | Routing, eval, chokepoint, cost               | **Agnostic**       | `gtcx-intelligence` + `baseline-os` |

### 1.2 Data boundary (GCP ↔ AWS)

| May cross bridge                    | Must not cross                          |
| ----------------------------------- | --------------------------------------- |
| Scrubbed/anonymized training traces | Raw evidence, diligence DB rows         |
| Model binaries / checkpoints        | Hub secrets, `compliance-os-w2-secrets` |
| DynamoDB registry metadata          | Live Postgres replication to GCS        |
| S3 artifact receipts (audit)        | Customer PII                            |

**Bridge:** `gtcx-infrastructure/04-ship/terraform/modules/gcp-ml-bridge/` — epic [`intelligence-phase-3-gcp-ml-bridge-epic-2026-06-05.md`](https://github.com/gtcx-ecosystem/gtcx-infrastructure/blob/main/01-docs/04-ops/intelligence-phase-3-gcp-ml-bridge-epic-2026-06-05.md).

### 1.3 Decision tree (new epics)

```
New capability?
├─ Stores customer compliance/audit/diligence data?  → AWS (+ residency overlay)
├─ Trains/fine-tunes on operational traces?           → GCP (scrubbed) + S3 bridge
├─ Calls Claude/OpenAI only?                         → Agnostic (router/eval)
├─ Mobile field data + offline?                        → Supabase OK; M2M keys from AWS SM
├─ PR preview only?                                  → Vercel OK; no prod secrets
└─ Unclear                                           → Update normative matrix FIRST
```

---

## 2. Summary matrix (all repos)

| Repo                | Tier | Plane           | Primary cloud         | GCP role      | LLM           | Maturity         |
| ------------------- | ---- | --------------- | --------------------- | ------------- | ------------- | ---------------- |
| baseline-os         | 1    | Hub             | —                     | —             | —             | N/A              |
| gtcx-core           | 1    | Artifact        | Consumer              | —             | Docs          | High             |
| gtcx-protocols      | 1    | Control         | **AWS** staging       | —             | —             | High             |
| gtcx-infrastructure | 1    | Control         | **AWS**               | Bridge module | —             | **SoR**          |
| gtcx-docs           | 1    | Hub             | —                     | —             | —             | N/A              |
| compliance-os       | 2    | Control         | **AWS** EKS           | —             | Anthropic API | Med (deploy)     |
| gtcx-intelligence   | 2    | Control + ML    | **AWS** runtime       | **GCP** P3    | Chokepoint    | High spec        |
| gtcx-platforms      | 2    | Control         | **AWS**               | —             | Via HTTP      | Med              |
| gtcx-agentic        | 2    | Hub             | Vault                 | —             | —             | High             |
| gtcx-agile          | 2    | Hub             | —                     | —             | —             | Low              |
| ledger-ui           | 2    | Artifact        | npm / AWS consumer    | —             | —             | Med              |
| terminal-os         | 2    | Control         | **Vercel → AWS**      | —             | Optional      | Low (D3)         |
| exploration-os      | 2    | Edge            | **Supabase** + AWS SM | —             | —             | Med              |
| terra-os            | 2    | Adapter         | Consumer              | —             | —             | Low              |
| gtcx-mobile         | 2    | Edge            | **AWS** SM            | —             | —             | Med              |
| nyota-ai            | 3    | Satellite       | AWS via intel         | —             | Intel API     | Med              |
| griot-ai            | 3    | Satellite       | AWS via intel         | —             | Intel API     | Med              |
| veritas-ai          | 3    | Satellite       | AWS via intel         | —             | Intel API     | Med              |
| sensei-ai           | 3    | **Out of band** | Own pilot             | —             | Own           | Separate product |
| gtcx-markets        | 3    | Satellite       | AWS when on           | —             | —             | Low              |
| gtcx-operations     | 3    | Satellite       | AWS when on           | —             | —             | Low              |
| gtcx-hardware       | 3    | Edge            | Device                | —             | —             | PRD              |

---

## 3. Tier 1 — Foundation

### baseline-os

| Field    | Value                                                                                    |
| -------- | ---------------------------------------------------------------------------------------- |
| Role     | Coordination hub, cost-router v1.1 contract, blocker index, `ecosystem:repo:report-work` |
| Hosting  | None                                                                                     |
| Optimize | Machine-readable gates; blocker truth; inbound links                                     |
| Do not   | Host workloads; freeze IR on XC blockers globally                                        |
| GCP      | None                                                                                     |

### gtcx-core

| Field    | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| Role     | Crypto, `@gtcx/*` npm packages, schemas, fuzz, CORE-004 ceremony |
| Hosting  | Build artifacts only                                             |
| Optimize | SLSA/npm integrity, API stability for protocols and intelligence |
| Do not   | Live API host; pen-test execution owner                          |
| GCP      | None — consumers run on AWS                                      |

### gtcx-protocols

| Field    | Value                                                                        |
| -------- | ---------------------------------------------------------------------------- |
| Role     | Schema SoR, staging probes, deployment-proof-index, pen-test index, playbook |
| Hosting  | **AWS** staging cluster (Kong, `api.staging.gtcx.trade`)                     |
| Optimize | Probe JSON, Wire #2 gates, witness links                                     |
| Do not   | Own compliance Postgres or Vertex pipelines                                  |
| Blockers | S11-03 npm (XC); INF-86 ceremony (XC)                                        |

### gtcx-infrastructure

| Field        | Value                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role         | **AWS control plane owner** — Terraform EKS/RDS/WAF/KMS, gateway, secret sealing, DR                                                                              |
| Hosting      | `environments/staging`, `production`, `testnet-pilot`                                                                                                             |
| Optimize     | SM→ESO, IRSA, validate-all, hub #17 GHCR + non-W2 secrets, S1-02 schema refresh, origins matrix                                                                   |
| GCP          | `gcp-ml-bridge` module only — enable with Phase 3                                                                                                                 |
| Annex        | [`cloud-placement-aws-control-plane-2026-06-05.md`](https://github.com/gtcx-ecosystem/gtcx-infrastructure/blob/main/01-docs/04-ops/coordination/cloud-placement-aws-control-plane-2026-06-05.md) |
| P22 examples | IR-3.2 runtime-evidence ops doc; S1-02; W2 staging blockers inbound                                                                                               |

### gtcx-docs

| Field    | Value                                                       |
| -------- | ----------------------------------------------------------- |
| Role     | Institutional baseline, governance registry                 |
| Hosting  | None                                                        |
| Optimize | Point to OPS-CLOUD-PLACE-001/002; do not duplicate matrices |

---

## 4. Tier 2 — Platform

### compliance-os

| Field      | Value                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role       | Compliance web/API, CaaS, agent-runtime, W2 diligence, trust-layer, via/vxa                                                                          |
| Workloads  | `apps/web`, `services/compliance-api`, `services/caas`, K8s `04-ship/compliance-os/k8s/`                                                               |
| Hosting    | **AWS EKS** (`compliance-os-staging` / production namespaces)                                                                                        |
| LLM        | Anthropic via `03-platform/packages/agent-runtime` — **host cloud irrelevant**                                                                                   |
| ML in repo | `via-ml`, `vxa-ml` — deploy on **same EKS**, not Vertex                                                                                              |
| Optimize   | W2 secret consumption, `pnpm w2:staging-prereq-check`, EKS-first hosting                                                                             |
| Do not     | GCP migration for AI branding; unilateral `kubectl apply` while infra blockers open                                                                  |
| Inbound    | [W2 hub-17 staging blockers](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/coordination) (file when filed) |

### gtcx-intelligence

| Field        | Value                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role         | ANISA, SDK services (Cortex, Sentinel, PANX, …), `@gtcx/ai`, inference chokepoint, eval signals                                                       |
| Runtime      | **AWS EKS** — `intelligence-staging.gtcx.trade`                                                                                                       |
| ML (Phase 3) | **GCP** — Vertex, GCS, BQ per [`global-trade-phase-3-ml-pipeline.md`](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/roadmap/global-trade-phase-3-ml-pipeline.md) |
| Optimize now | Cost-router in image (INT-S8-04), staging smoke, npm/SLSA witness path                                                                                |
| Optimize P3  | PII-free exports, Vertex pipelines, S3 promote via bridge                                                                                             |
| Do not       | GKE for runtime; PII in GCS; block hub #17                                                                                                            |
| Annex        | [`cloud-placement-gcp-ml-plane-2026-06-05.md`](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/04-ops/coordination/cloud-placement-gcp-ml-plane-2026-06-05.md) |

### gtcx-platforms

| Field    | Value                                                                  |
| -------- | ---------------------------------------------------------------------- |
| Role     | GTCX Cloud + Sovereign (ADR-007), shared TypeORM, CRX/SGX/ASM          |
| Hosting  | **AWS** — sovereign/cloud via infra                                    |
| Optimize | Schema parity (`platforms/shared` migrations), image rollout via infra |
| Recent   | S2-07 TypeORM phase 1 → infra S1-02 `01-schema.sql` refresh            |

### gtcx-agentic

| Field    | Value                                                     |
| -------- | --------------------------------------------------------- |
| Role     | Vault SoR, audit runners, H-05 / ceremony registers       |
| Hosting  | Local vault + optional infra CI injection                 |
| Optimize | Attestation, coordination registers — not cloud placement |
| Do not   | Host product clusters                                     |

### gtcx-agile

| Field | Value                          |
| ----- | ------------------------------ |
| Role  | Sprint tooling, audit dispatch |
| Cloud | N/A                            |

### ledger-ui

| Field    | Value                                           |
| -------- | ----------------------------------------------- |
| Role     | `@gtcx/ui` for platforms portals                |
| Hosting  | npm consumer                                    |
| Optimize | Publish when NPM_TOKEN available (XR-510 class) |
| Cloud    | Follow platforms (**AWS**)                      |

---

## 5. Tier 2 — W2 chain & field

### terminal-os

| Field         | Value                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Role          | Workflow receiver, W2 PATCH target, Postgres persistence (#18)                                         |
| Hosting today | **Vercel** (prod path in `production-deployment.md`)                                                   |
| Target        | **AWS EKS** — [W2 hosting decision](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/coordination) |
| Optimize      | EKS + ExternalSecret mirroring `COMPLIANCE_OS_TERMINAL_API_KEY`; staging smoke                         |
| Do not        | Long-term Vercel prod + EKS compliance hybrid                                                          |
| Infra ask     | `terminal-os-staging` Deployment + ingress + SM                                                        |

### exploration-os

| Field    | Value                                                     |
| -------- | --------------------------------------------------------- |
| Role     | mobile-v2, licence handoff, `w2:prod:retest`              |
| Hosting  | **Supabase** (app backend)                                |
| Secrets  | **AWS SM** for intake key — never `EXPO_PUBLIC_*` for M2M |
| Optimize | Credentialed retest vs single `COMPLIANCE_OS_URL`         |
| Blocker  | Retest fail until compliance web Ready + prod origin      |

### terra-os

| Field    | Value                                             |
| -------- | ------------------------------------------------- |
| Role     | Geospatial adapters → exploration handoff         |
| Hosting  | Library; no dedicated cluster in register         |
| Optimize | Adapter contracts; consumer-owned runtime secrets |

### gtcx-mobile

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| Role     | Mobile audit E2E, portal integration        |
| Hosting  | App builds; **AWS SM** for staging (XR-102) |
| Optimize | SM-populated credentials aligned with infra |

---

## 6. Tier 3 — Satellites

| Repo            | Depends on               | Cloud stance               | Rule                                                             |
| --------------- | ------------------------ | -------------------------- | ---------------------------------------------------------------- |
| nyota-ai        | intelligence / ANISA     | AWS-aligned GTCX narrative | HTTPS APIs; no new GCP project                                   |
| griot-ai        | intelligence             | Same                       | Media engine; no Vertex ownership                                |
| veritas-ai      | protocols + intelligence | Same                       | Derivative intelligence only                                     |
| gtcx-markets    | platforms, infra         | AWS when integrated        | `ops:evidence:check`; hub defers                                 |
| gtcx-operations | baseline                 | Link hub only              | No matrix row changes without review                             |
| gtcx-hardware   | mobile PRD               | Edge devices               | Out of cloud matrix                                              |
| **sensei-ai**   | —                        | **Separate product**       | docker-compose/k8s pilot — **not** GTCX EKS matrix unless merged |

---

## 7. Cross-repo friction (architectural debt)

| ID  | Friction                          | Repos                                 | Fix                                            |
| --- | --------------------------------- | ------------------------------------- | ---------------------------------------------- |
| F1  | Dual secret planes (Vercel + K8s) | terminal, compliance                  | EKS hosting decision Phase A                   |
| F2  | GHCR pull 403                     | compliance, infra                     | `imagePullSecret`                              |
| F3  | Supabase vs RDS for W2            | exploration, compliance               | SM for M2M only; keep Supabase for mobile data |
| F4  | Origin hostname drift             | exploration, infra, compliance        | Infra canonical origin doc                     |
| F5  | npm publish creds                 | core, intelligence, ledger, protocols | Release operator (XC)                          |
| F6  | Cost-router not in staging image  | intelligence, baseline-os             | AWS image rebuild                              |

---

## 8. Ninety-day program (by class)

| Class              | Repos                               | Actions                                                                    |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------------- |
| **A Infra**        | gtcx-infrastructure                 | Hub #17 blockers; S1-02; terminal EKS; enable gcp-ml-bridge when P3 starts |
| **B Platform**     | compliance-os, platforms, protocols | Single AWS path; W2 close; no GCP                                          |
| **C Intelligence** | gtcx-intelligence                   | AWS track + GCP track **parallel**, separate epics                         |
| **D W2 siblings**  | terminal, exploration, terra        | EKS terminal; retest; adapters                                             |
| **E Satellites**   | nyota, griot, veritas, markets      | Document intel HTTPS dependency                                            |
| **F Out of band**  | sensei-ai                           | Explicit exclusion until integration decision                              |

---

## 9. References

| Doc                    | ID                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Normative matrix       | OPS-CLOUD-PLACE-001                                                                                                     |
| This register          | OPS-CLOUD-PLACE-002                                                                                                     |
| Coordination inventory | [`coordination-inventory-2026-06-03.md`](../../../ops/coordination/hub-narrative/coordination-inventory-2026-06-03.md)                |
| W2 hosting D3          | [W2 hosting decision](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/coordination)                                |
| Phase 3 ML             | [`global-trade-phase-3-ml-pipeline.md`](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/roadmap/global-trade-phase-3-ml-pipeline.md) |

---

_Assessed 2026-06-05. Update on new repo, new workload class, or Phase 3 bridge enable._
