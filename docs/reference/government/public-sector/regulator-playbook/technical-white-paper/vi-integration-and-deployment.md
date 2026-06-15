---
title: 'VI — Integration & Deployment'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# VI — Integration & Deployment

**Section VI — Integration & Deployment**

> **Objective:** Provide a practitioner‑level blueprint for connecting external systems to GTCX and rolling the platform into production—whether as a sovereign‑hosted cloud stack, on‑prem installation, or hybrid edge deployment. This section covers integration patterns, deployment topologies, environment hardening, and an end‑to‑end rollout playbook.

---

### 1. Integration Patterns

| Pattern                  | When to Use                                           | Key Interfaces                         | Latency Budget            |
| ------------------------ | ----------------------------------------------------- | -------------------------------------- | ------------------------- |
| **REST API**             | ERP, supply‑chain apps, low‑volume data entry         | `/v1/events`, `/v1/rules/validate`     | P95 < 200 ms              |
| **gRPC Streaming**       | High‑throughput field telemetry, IoT assay feeds      | `events.v1.EventIngest.BatchSubmit`    | P95 < 50 ms               |
| **Webhook Callbacks**    | Alerting into SIEM / SOAR, 3rd‑party audit trail sync | `POST /webhook` (configurable)         | Near‑real‑time            |
| **Kafka / Pulsar Topic** | Data‑lake & analytics pipeline offloading             | `gtcx.events.raw`, `gtcx.audit.ledger` | Sub‑second (internal LAN) |

_All integrations inherit OAuth 2.1 JWT authentication; gRPC channel leverages mutual TLS with service certificates issued by the platform CA._

---

### 2. Deployment Topologies

#### 2.1 Sovereign Cloud (Most Common)

```
Field Nodes → Regional POP (Edge Broker) → GovCloud VPC (Kubernetes Core) → Regulator Dashboard
```

- **Pros:** Rapid spin‑up, managed SLAs, geography‑locked storage.
- **Cons:** Requires national cloud policy clearance.

#### 2.2 Hybrid Edge + On‑Prem

```
Field Nodes → Local Edge Cluster → Gov Datacenter (OpenShift) → DR Site (Cloud)
```

- **Pros:** Low‑latency rule evaluation; no PII leaves country.
- **Cons:** Higher capex; datacenter ops responsibility.

#### 2.3 Fully Air‑Gapped (Sensitive Exports)

```
Field Nodes (offline bundles) ⇄ Sneakernet → Secure Vault Cluster → Regulator Console (air‑gapped)
```

- **Pros:** Maximum isolation for high‑risk commodities.
- **Cons:** Manual data transfer; limited real‑time insights.

---

### 3. Environment Provisioning & Hardening

| Layer                      | Toolchain                          | Hardening Controls                                    |
| -------------------------- | ---------------------------------- | ----------------------------------------------------- |
| **Infrastructure‑as‑Code** | Terraform + Terragrunt             | CIS Benchmarks auto‑apply (Ubuntu L2)                 |
| **Kubernetes**             | Kube 1.29 + Calico                 | Pod Security Standards (restricted), Kyverno policies |
| **CI/CD**                  | GitHub Actions → Sigstore → ArgoCD | Signed container images, SLSA Level 3                 |
| **Secrets**                | HashiCorp Vault                    | PKI auto‑rotation, dynamic DB creds                   |
| **Observability**          | Prometheus, Grafana, Loki          | SSO via OIDC; RBAC‑scoped dashboards                  |

---

### 4. End‑to‑End Rollout Playbook

| Phase                        | Duration | Key Deliverables                                             | Exit Criteria                                   |
| ---------------------------- | -------- | ------------------------------------------------------------ | ----------------------------------------------- |
| **1. Discovery & Alignment** | 2‑4 wks  | Stakeholder matrix, data model mapping, pilot MoU            | Signed scope & KPI sheet                        |
| **2. Secure Sandbox**        | 4 wks    | Single‑node Compliance Hub in staging VPC, synthetic dataset | Regulator acceptance of workflows               |
| **3. Field Pilot**           | 8‑12 wks | 20‑site onboarding, real data ingestion, rule‑pack tuning    | ≥ 90 % event capture, < 5 % false‑positive rate |
| **4. Scale‑Up**              | 3‑6 mo   | Nation‑wide device rollout, SLA dashboards live              | 95 % target supply digitised                    |
| **5. Handover & Sustain**    | 4 wks    | Ops playbooks, DR drill, support contract                    | Regulator signs production acceptance           |

_Iterative DevOps sprints run bi‑weekly throughout phases 2‑4 to incorporate feedback._

---

### 5. Interoperability & Data Formats

- **Event Schema:** JSON (OpenAPI 3.1) with `$schema` version pinning.
- **Bulk Export:** Parquet & Avro for analytics lakes; CSV for legacy systems.
- **Digital Signatures:** Ed25519; SHA‑256 content hash in `X-Payload-Digest` header.
- **Binary Attachments:** Assay certificate PDFs stored in object storage; referenced via pre‑signed URLs in event body.

---

### 6. Deployment KPIs & Health Checks

| KPI                           | Target   | Alert Threshold | Measurement                 |
| ----------------------------- | -------- | --------------- | --------------------------- |
| Ingest success rate           | ≥ 99.8 % | < 99 % / 5 min  | PromQL `successful / total` |
| Rule evaluation latency (P95) | < 40 ms  | > 70 ms         | gRPC histogram              |
| API error rate (5xx)          | < 0.1 %  | > 0.5 % / 1 h   | ALB metrics                 |
| Disk utilisation core         | < 70 %   | > 85 %          | Node exporter               |

---

### 7. Support & Maintenance

- **Tier 1** (Regulator Helpdesk): 24×7 chat + phone; P1 response ≤ 2 h.
- **Tier 2** (Platform Ops): Patch critical CVEs within 24 h; monthly patch release.
- **Tier 3** (Engineering): Quarterly feature releases; roadmap review with regulator.

---

### 8. Decommission & Data Portability

- Data export via `/v1/ledger/export` (JSONL, Parquet).
- 30‑day secure wipe procedure with audit certificate.
- Regulator holds encryption keys; platform cannot access data post‑decommission.

---

_End of Section VI — Integration & Deployment_
