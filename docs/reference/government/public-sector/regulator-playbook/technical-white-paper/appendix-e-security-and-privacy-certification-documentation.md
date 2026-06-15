---
title: 'Appendix E — Security & Privacy Certification Documentation'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Appendix E — Security & Privacy Certification Documentation

**Appendix E — Security & Privacy Certification Documentation**

> **Purpose:** Present regulators, auditors, and enterprise partners with clear evidence of GTCX’s security posture, privacy controls, and formal certification roadmap. This appendix consolidates third‑party attestations, audit results, and the continuous assurance program that underpins the platform.

---

### 1. Current Certifications & Attestations

<table><thead><tr><th width="175.16796875">Certification / Framework</th><th>Scope</th><th>Issuing / Auditing Body</th><th>Status</th><th>Renewal Cycle</th></tr></thead><tbody><tr><td><strong>ISO 27001:2022</strong></td><td>Entire ISMS (Edge → Core)</td><td>TÜV SÜD</td><td>Certified (Mar 2025)</td><td>Annual surveillance, 3‑yr recert.</td></tr><tr><td><strong>SOC 2 Type II</strong></td><td>Security, Availability, Confidentiality</td><td>Grant Thornton</td><td>Report issued (Jan 2025)</td><td>Annual</td></tr><tr><td><strong>GDPR Compliance</strong></td><td>Data subjects in EU</td><td>Self‑assessment + external legal review</td><td>Compliant (ongoing)</td><td>Continuous</td></tr><tr><td><strong>CCPA Compliance</strong></td><td>California residents</td><td>Self‑assertion + third‑party gap scan</td><td>Compliant (Jan 2025)</td><td>Annual</td></tr><tr><td><strong>CIS Benchmark L2</strong></td><td>Ubuntu 22.04 server images</td><td>Automated CIS‑CAT scan</td><td>95 %+ pass (Apr 2025)</td><td>Quarterly</td></tr><tr><td><strong>OWASP ASVS v4 L2</strong></td><td>Core API services</td><td>Veracode</td><td>Passed (Feb 2025)</td><td>Annual</td></tr></tbody></table>

### 2. Upcoming Certification Roadmap

| Target                              | Quarter | Notes                                                  |
| ----------------------------------- | ------- | ------------------------------------------------------ |
| **ISO 22301** (Business Continuity) | Q4 FY25 | Align DR/BCP with EU DORA requirements                 |
| **FedRAMP Moderate**                | FY26    | Enables US government cloud deployments                |
| **PCI‑DSS 4.0 SAQ D**               | FY26    | Required for tokenised payment flows in future modules |
| **CSA STAR Level 2**                | FY26    | Cloud security assurance for donor‑funded projects     |

### 3. Privacy Programme Overview

#### 3.1 Data Protection Impact Assessments (DPIA)

- DPIA template library maintained; mandatory for new jurisdictions.
- Reviewed by external counsel (Fieldfisher) every 12 months.

#### 3.2 Data Subject Rights Workflow

| Request Type                      | SLA            | Mechanism                                                |
| --------------------------------- | -------------- | -------------------------------------------------------- |
| Access / Export                   | 30 days        | `/privacy/export` API or web portal                      |
| Rectification                     | 30 days        | Support ticket + signed user affidavit                   |
| Erasure (“Right to be Forgotten”) | 30 days        | Privacy service tombstones PII, retains hashed reference |
| Objection to Processing           | Immediate hold | Flag cascades via Kafka topic to pause processing        |

#### 3.3 Data Residency Controls

- **Region‑Locked Buckets:** Object storage buckets pinned to regulator‑chosen regions.
- **Key Management:** Customer‑managed keys (CMK) option via HSM integration.

### 4. Security Architecture Highlights

1. **Zero‑Trust Network Model** — Mutual TLS between all micro‑services.
2. **Runtime Hardening** — SELinux enforcing; seccomp & AppArmor profiles for containers.
3. **Secret Management** — HashiCorp Vault; secrets rotated automatically every 24 h.
4. **SBOM Transparency** — Sigstore `cosign` + `rekor`; public attestations for every build.
5. **Immutable Logging** — Loki + Object‑lock WORM, 365‑day retention.

### 5. Third‑Party Penetration Tests & Vulnerability Scans

| Provider              | Scope                    | Key Findings                | Remediation Status    |
| --------------------- | ------------------------ | --------------------------- | --------------------- |
| Bishop Fox (Aug 2024) | External perimeter + API | 3 medium, 0 high            | All patched Sept 2024 |
| NCC Group (Dec 2024)  | Edge firmware            | 1 medium (FTPS cipher)      | Mitigated Jan 2025    |
| Veracode (ongoing)    | Static & dynamic scans   | CVSS >7 auto‑block pipeline | Continuous            |

### 6. Coordinated Vulnerability Disclosure (CVD)

- **Hall of Fame** page for researchers.
- 90‑day public disclosure window after fix.
- PGP key fingerprint: `3F72 BC1E A2C8 D127 ...` (full key on website).

### 7. Continuous Assurance Programme

| Control                 | Frequency   | Tool / Process         |
| ----------------------- | ----------- | ---------------------- |
| Infrastructure CIS Scan | Nightly     | CIS‑CAT Pro            |
| Dependency SCA          | On merge    | Renovate + Trivy       |
| Chaos DR Drill          | Semi‑annual | ChaosMesh + GameDay    |
| Red‑Team Exercise       | Annual      | External vendor        |
| Privacy Audit           | Annual      | Independent DPO report |

### 8. Security Incident Response

- 24×7 on‑call rotation; PagerDuty severity policies (SEV‑1 under 30 min).
- Post‑incident review (PIR) within 72 h; public RCAs for SEV‑1 affecting regulators.
- Regulator notification SLA: within 24 h of confirmed data breach.

---

_End of Appendix E – Security & Privacy Certification Documentation_
