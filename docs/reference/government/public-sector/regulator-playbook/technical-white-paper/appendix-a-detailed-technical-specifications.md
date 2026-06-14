---

title: "Appendix A · Detailed Technical Specifications"
status: "current"
date: "2026-05-26"

---

# Appendix A · Detailed Technical Specifications

### 1. System Architecture Diagrams

```
[Diagram template-token: High‑level GTCX architecture showing Regulatory Interface → Compliance Hub → Field Infrastructure]
```

#### 1.1 Layered Component View

- **Regulatory Authority Interface**
  - Web portal (React/TypeScript) served via NGINX
  - Role‑based access (RBAC) enforced by Keycloak
- **Compliance Management Platform**
  - Micro‑services on Kubernetes (K8s 1.30)
  - Event bus: Apache Kafka 3.x
  - Rules Engine: JSON Logic interpreter + custom DSL
  - Data store: PostgreSQL 16 (row‑level security) + Elasticsearch 8.x
- **Field Verification Infrastructure**
  - Edge devices (Android 12 rugged tablets)
  - Biometric sensor modules (ISO/IEC 19794‑2 compliant)
  - GNSS module accuracy ≤2 m (RTK optional)

### 2. Hardware Requirements

| Tier        | Minimum Spec                           | Recommended Spec                                    |
| ----------- | -------------------------------------- | --------------------------------------------------- |
| Edge Device | 4 GB RAM, 32 GB storage, GNSS + camera | 8 GB RAM, 64 GB, dual‑band GNSS, fingerprint sensor |
| Server Node | 16 vCPU, 32 GB RAM, NVMe SSD           | 32 vCPU, 64 GB RAM, redundant NVMe RAID             |
| Network     | 10 Mbps uplink                         | ≥100 Mbps uplink, redundant ISP                     |

### 3. Software Stack Versions

- **Backend**: Go 1.22 / Python 3.12 micro‑services
- **Frontend**: React 18, Next.js 14
- **Containerisation**: Docker 26, Kubernetes 1.30, Helm 3.15
- **Security**: Keycloak 24 (OIDC), HashiCorp Vault 1.15
- **Messaging**: Apache Kafka 3.7
- **Database**: PostgreSQL 16 (Timescale 2.14), Elasticsearch 8.13

### 4. Performance Benchmarks

| Metric                      | Baseline             | Target               |
| --------------------------- | -------------------- | -------------------- |
| Transaction throughput      | 1 000 tx/s sustained | 5 000 tx/s sustained |
| Latency (field → regulator) | P95 < 3 s            | P95 < 1 s            |
| Uptime SLA                  | 99.5 %               | 99.9 %               |

### 5. Scalability & Redundancy

- **Horizontal scaling** via K8s HPA (CPU + queue length)
- **Geo‑replication** across 3 availability zones (active‑active)
- **Disaster Recovery**: <1 h RTO, <15 min RPO (PostgreSQL logical replication)

### 6. Environmental Requirements

- Edge devices rated IP67, –10 °C to +50 °C
- Server rooms require 21 °C ±2 °C, 40–60 % RH

---

_End of Appendix A_
