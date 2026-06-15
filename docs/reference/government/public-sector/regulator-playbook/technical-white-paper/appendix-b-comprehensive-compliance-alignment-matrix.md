---
title: 'Appendix B — Comprehensive Compliance Alignment Matrix'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Appendix B — Comprehensive Compliance Alignment Matrix

**Appendix B — Comprehensive Compliance Alignment Matrix**

> **Purpose:** Demonstrate how each functional component of the Global Trust & Compliance Exchange (GTCX) directly supports, satisfies, or extends recognised international regulatory and compliance frameworks.

---

### 1. Reference Standards

| Acronym       | Full Name                                                             | Domain                                  |
| ------------- | --------------------------------------------------------------------- | --------------------------------------- |
| **OECD DDG**  | OECD Due Diligence Guidance for Responsible Supply Chains of Minerals | Responsible sourcing & chain‑of‑custody |
| **LBMA RSP**  | London Bullion Market Association Responsible Sourcing Programme      | Precious‑metal traceability & ESG       |
| **ISO 27001** | Information Security Management System                                | Data security & risk management         |
| **GDPR**      | General Data Protection Regulation (EU 2016/679)                      | Data privacy & subject rights           |
| **CCPA**      | California Consumer Privacy Act                                       | Data privacy (US)                       |
| **UNGP**      | UN Guiding Principles on Business & Human Rights                      | Human‑rights due diligence              |

### 2. GTCX Component‑to‑Standard Mapping

| GTCX Component            | Key Capability                    | OECD DDG                                   | LBMA RSP                      | ISO 27001                   | GDPR/CCPA                       | UNGP                                          |
| ------------------------- | --------------------------------- | ------------------------------------------ | ----------------------------- | --------------------------- | ------------------------------- | --------------------------------------------- |
| **Field Identity Module** | Digital ID, biometric KYC         | ✔ Step 1: Identify supply‑chain actor risk | ✔ Know‑Your‑Counterparty      | A.9 Access Control          | Art 5 Data minimisation         | Principle 17 Human‑rights risk identification |
| **Geo‑Trace Engine**      | GPS + custody proofs              | ✔ Step 2: Risk assessment (origin)         | ✔ Mine‑of‑origin verification | —                           | —                               | Principle 18 Due diligence                    |
| **Rules Engine (ComReg)** | Declarative policy & risk scoring | ✔ Step 3: Design & implement response      | ✔ Compliance scoring          | A.18 Compliance & audit     | Art 24 Controllers & processors | Principle 19 Track effectiveness              |
| **Audit Ledger**          | Immutable signed records          | ✔ Step 2 & 4: Documentation                | ✔ Transaction chain           | A.12 Ops security (logging) | Art 30 Record keeping           | Principle 20 Reporting                        |
| **Regulator Dashboard**   | Real‑time analytics & alerts      | ✔ Step 5: Report publicly                  | ✔ Regulator reporting         | A.15 Supplier relationships | Art 33 Breach notification      | Principle 21 Remedy & grievance               |
| **Data Governance Layer** | Encryption, residency, RBAC       | —                                          | —                             | Entire standard scope       | Entire regulation scope         | —                                             |

✔ = Fully aligned functionality — = Not applicable / outside scope

### 3. Compliance Validation Criteria

| Standard            | Minimum Requirement               | GTCX Mechanism                              | Evidence Artifact                                   |
| ------------------- | --------------------------------- | ------------------------------------------- | --------------------------------------------------- |
| **OECD DDG Step 2** | Supply‑chain risk assessment      | Geo‑Trace Engine + Rules Engine risk models | Risk‑score export (CSV/JSON), dashboard screenshot  |
| **LBMA RSP Pt D**   | Demonstrate end‑to‑end provenance | Geo‑Trace + Audit Ledger                    | Chain‑of‑custody report, merkle‑proof file          |
| **ISO 27001 A.9**   | Secure user access                | RBAC + MFA (Keycloak)                       | Access‑control policy doc, penetration‑test results |
| **GDPR Art 17**     | Data subject erasure              | Privacy micro‑service with “erase” API      | Audit log showing erase event, controller sign‑off  |

### 4. Gap Analysis & Extension Opportunities

| Standard Area                     | Current Coverage         | Identified Gap                | Planned Mitigation (Roadmap)                     |
| --------------------------------- | ------------------------ | ----------------------------- | ------------------------------------------------ |
| OECD DDG – Risk Score Granularity | 5‑tier score             | Regulator wants 10‑tier       | Expand Rules Engine schema (Q3 FY26)             |
| LBMA ESG – Carbon Footprint       | Partial (transport only) | Mine‑site emissions           | Integrate IoT environmental sensors (pilot FY25) |
| ISO 27001 – Business Continuity   | DR tested yearly         | Need ISO 22301 alignment      | Joint BC/DR audit (FY25)                         |
| GDPR – DPIA Template              | Basic DPIA toolkit       | Regulator‑specific DPIA forms | Template library (Q4 FY24)                       |

### 5. Continuous Monitoring & Assurance

1. **Automated Control Tests** — Nightly CIS benchmarks on core clusters.
2. **Monthly Compliance Scan** — Rules Engine executes synthetic transactions; discrepancies trigger PagerDuty alert.
3. **Quarterly External Audit** — Independent auditor reviews sample data sets, risk models, and privacy controls.
4. **Annual Assurance Report** — SOC 2 Type II style report published to regulators and stakeholders.

---

_End of Appendix B – Compliance Alignment Matrix_
