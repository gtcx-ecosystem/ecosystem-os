---

title: "IV – Detailed System Architecture"
status: "current"
date: "2026-05-26"

---

# IV – Detailed System Architecture

**Section IV — Detailed System Architecture**

> **Purpose:** Offer a deep architectural view of GTCX, illustrating how regulatory interfaces, compliance services, and field‑level infrastructure interact across secure, scalable tiers. This document provides diagrams, data‑flow explanations, and fault‑tolerance design patterns required by regulator IT teams and third‑party auditors.

---

### 1. Layered Reference Model

| Layer                       | Purpose                                                 | Core Components                                              | Primary Standards                    |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| **L‑0 Field Level**         | Secure capture of identity, custody, geo & assay events | Edge Agent, Rugged Android Device, IoT Assay Probe           | W3C VC, ISO/IEC 19794‑2 (biometrics) |
| **L‑1 Message Transport**   | Guaranteed, encrypted event delivery                    | NATS / Apache Pulsar broker at Regional POP                  | NIST SP 800‑52r2 (TLS)               |
| **L‑2 Compliance Core**     | Real‑time rule evaluation, audit ledger, dashboards     | Rule Engine VM, TimescaleDB, Audit Merkle Ledger, Grafana UI | ISO 27001, OECD DDG, LBMA RSP        |
| **L‑3 Regulator Interface** | Licensing, export approvals, analytics APIs             | OIDC Gateway, License Micro‑service, Reporting API           | GDPR Art 5/30, ISO 27001 A.5, A.18   |

---

### 2. High-Level Logical Architecture Diagram

```
+──────────────────────────────────────────────────────────────────────────+
|                          Layer 3 – Regulator Interface                 |
| ┌──────────────────┐   REST/gRPC   ┌──────────────────────────────┐     |
| | License Service | ◀────────────▶ |  Analytics & Reporting API  | ⋯   |
| └──────────────────┘               └──────────────────────────────┘     |
+────────────────────▲────────────────────────────────▲──────────────────+
                     │ mTLS / JWT                     │ WebSocket feeds
+────────────────────┴────────────────────────────────┴──────────────────+
|                          Layer 2 – Compliance Core                    |
| ┌───────────────┐  gRPC  ┌──────────────┐  pgSQL  ┌─────────────────┐ |
| | Rules Engine  |◀──────▶| Event Router |◀───────▶| TimescaleDB     | |
| └───────────────┘        └──────────────┘         └─────────────────┘ |
|        ▲                               │               ▲               |
|        │                               │ Ledger hash   │               |
|        │                               ▼               │               |
|   Failure bus                 ┌──────────────────┐     │               |
|   (Dead‑letter)               |   Audit Ledger    |─────┘               |
|                               └──────────────────┘                     |
+────────────────────▲────────────────────────────────────────────────────+
                     │ Pulsar / NATS
+────────────────────┴────────────────────────────────────────────────────+
|                     Layer 1 – Message Transport                       |
|   Region POP Edge Broker (TLS, Quorum 3)                               |
+────────────────────▲────────────────────────────────────────────────────+
                     │ gRPC / HTTPS
+────────────────────┴────────────────────────────────────────────────────+
|                    Layer 0 – Field Level                              |
|  Rugged Android Device  ── Edge Agent (Go) ── TPM secure keys         |
|  IoT Assay Probe (optional)                                           |
+──────────────────────────────────────────────────────────────────────────+
```

---

### 3. Data Flow Sequence (Happy Path)

1. **Capture** – Edge Agent signs payload (`Ed25519`) and transmits via gRPC streaming.
2. **Broker** – Pulsar assigns partition key by `actor_id`; stores for 7 days retention.
3. **Router** – Event Router applies schema validation; forwards to Rules Engine.
4. **Rules Evaluation** – JSON‑Logic VM executes rule pack; returns verdict.
5. **Persist** – Pass: insert into Timescale hypertable; Fail: insert + flag.
6. **Audit** – Merkle hash of row appended to Audit Ledger; nightly root notarised.
7. **Notify** – WebSocket alert pushed to Regulator Dashboard; optional webhook.

Average end‑to‑end latency (Edge → Dashboard): **< 800 ms** at 10 k events/sec.

---

### 4. Fault‑Tolerance & DR Patterns

| Component          | Failure Mode             | Mitigation                                                     |
| ------------------ | ------------------------ | -------------------------------------------------------------- |
| Edge Agent         | Offline / no network     | Local queue (SQLite) max 5 000 events; back‑fills on reconnect |
| Broker node loss   | Partition unavailability | Pulsar quorum (3); replica re‑election < 15 s                  |
| DB node loss       | Write failures           | Patroni HA; synchronous replica in secondary AZ                |
| Full region outage | Service downtime         | Async WAL shipping to DR region; RTO < 15 min                  |

---

### 5. Security Architecture By Layer

| Layer     | Key Controls                                                                   |
| --------- | ------------------------------------------------------------------------------ |
| Field     | TPM key store, on‑device AES‑XTS storage, biometric template hash only         |
| Transport | mTLS (TLS 1.3), forward‑secrecy ciphers (X25519+AES‑256‑GCM)                   |
| Core      | Kubernetes PSPs, network policy (Calico), OPA sidecars, Vault secret injection |
| Regulator | OIDC PKCE login, RBAC by claim, audit log tamper proof                         |

---

### 6. Multi‑Tenancy & Data Isolation

- **Namespace Isolation:** Each regulator / commodity domain deploys into separate K8s namespace.
- **Row‑Level Security:** PostgreSQL RLS ensures tenant separation at data layer.
- **Edge Key Space:** Device keys mapped to tenant UUID; broker ACL restricts topic access.

---

### 7. Observatory & Telemetry Stack

| Metric Plane  | Tool                  | Dashboard Frequency |
| ------------- | --------------------- | ------------------- |
| System        | Prometheus            | 15 s scrape         |
| Logs          | Loki (json/labels)    | Real‑time stream    |
| Traces        | OpenTelemetry + Tempo | 1 %, sampled        |
| Business KPIs | Grafana panels        | 60 s refresh        |

---

### 8. Extensibility & Plugin System

- **Rules Engine OPS** – gRPC plugin interface for custom functions (e.g., carbon intensity calc).
- **Edge Scripting** – Lua 5.4 filter sandbox; 50 ms budget.
- **Dashboard Widgets** – React micro‑frontend loader with provider handshake.

---

_End of Section V — Component Breakdown & Technical Specifications_
