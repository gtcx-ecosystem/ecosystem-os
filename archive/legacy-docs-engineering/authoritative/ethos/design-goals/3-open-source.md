---
title: '3. Open Source'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['architecture', 'documentation']
review_cycle: on-change
document_type: architecture
---

# 3. Open Source

> **Transparent, auditable infrastructure preventing dependency on any single provider**

---

## Document Metadata

| Field          | Value                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Source**     | GitBook GTCX Protocol v2.0                                                                                                |
| **Section**    | Design Principles → 3. Open Source                                                                                        |
| **Sync Date**  | 2026-01-22                                                                                                                |
| **Source URL** | https://gtcx-protocol.gitbook.io/gtcx-open-source/QEzDNoYVhOOhfBbS0PAM/design-principles/design-principles/3.-open-source |

---

## Open Source Foundation

| Feature                            | Description                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Public Protocol Specifications** | Complete GTCX technical specifications available under Creative Commons licensing                           |
| **Transparent Algorithms**         | Open-source compliance scoring algorithms and verification protocols that can be audited by any stakeholder |
| **Community Development**          | Public contributions to protocol development through GitHub repositories and technical working groups       |
| **No Vendor Lock-in**              | Multiple implementation options prevent dependency on any single technology provider                        |

---

## Public Protocol Specifications

All GTCX technical specifications are publicly available:

| Component                     | License                    | Repository        |
| ----------------------------- | -------------------------- | ----------------- |
| **Protocol Core**             | Apache 2.0                 | `gtcx/protocol`   |
| **Documentation**             | Creative Commons BY-SA 4.0 | `gtcx/docs`       |
| **Reference Implementations** | MIT                        | `gtcx/reference`  |
| **Compliance Algorithms**     | Apache 2.0                 | `gtcx/gci-engine` |

---

## Transparent Algorithms

Open-source compliance scoring enables:

- **Stakeholder Auditing:** Any participant can verify how compliance scores are calculated
- **Independent Verification:** Third parties can validate scoring methodology
- **Continuous Improvement:** Community contributions enhance algorithm accuracy
- **Trust Building:** Transparency creates confidence in verification outcomes

```
┌─────────────────────────────────────────────────────────────────┐
│                 TRANSPARENT COMPLIANCE SCORING                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │              OPEN SOURCE ALGORITHMS                     │  │
│   │                                                         │  │
│   │  Input Data → Scoring Logic → Compliance Score          │  │
│   │      ↓              ↓              ↓                    │  │
│   │  [Auditable]   [Auditable]   [Verifiable]               │  │
│   └─────────────────────────────────────────────────────────┘  │
│                              │                                  │
│              ┌───────────────┼───────────────┐                  │
│              ▼               ▼               ▼                  │
│        ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│        │ Producers│   │Government│   │  Buyers  │              │
│        │  Verify  │   │  Audit   │   │  Trust   │              │
│        └──────────┘   └──────────┘   └──────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Community Development

| Channel                         | Purpose                                              |
| ------------------------------- | ---------------------------------------------------- |
| **GitHub Repositories**         | Code contributions, issue tracking, feature requests |
| **Technical Working Groups**    | Protocol evolution and standards development         |
| **Documentation Contributions** | Community-maintained guides and translations         |
| **Security Audits**             | Public vulnerability disclosure and bounty programs  |

---

## No Vendor Lock-in

Multiple implementation paths ensure independence:

| Approach                       | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| **Reference Implementations**  | Official implementations in multiple languages              |
| **Specification-First Design** | Any developer can build compliant implementations           |
| **Interoperability Testing**   | Certification program validates third-party implementations |
| **Migration Support**          | Tools and documentation for switching between providers     |

---

## Benefits of Open Source

| Stakeholder       | Benefit                                            |
| ----------------- | -------------------------------------------------- |
| **Governments**   | Can inspect, modify, and control infrastructure    |
| **Producers**     | Not dependent on any single service provider       |
| **Developers**    | Can build on top of proven, auditable code         |
| **Civil Society** | Can verify claims and hold operators accountable   |
| **Researchers**   | Access to real-world data and algorithms for study |

---

## Related Principles

| Principle                                | Connection                                    |
| ---------------------------------------- | --------------------------------------------- |
| [1. Interoperable](./1-interoperable.md) | Open standards enable interoperability        |
| [2. Accessible](./2-accessible.md)       | Open source reduces costs and improves access |
| [5. Sovereign](./5-sovereign.md)         | Transparency supports sovereign oversight     |

---

_Source: GitBook v2.0 — Synced January 22, 2026_
