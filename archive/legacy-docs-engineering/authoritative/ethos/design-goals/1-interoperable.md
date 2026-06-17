---
title: '1. Interoperable'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['architecture', 'documentation']
review_cycle: on-change
document_type: architecture
---

# 1. Interoperable

> **Universal standards enabling seamless integration while preventing vendor lock-in**

---

## Document Metadata

| Field          | Value                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Source**     | GitBook GTCX Protocol v2.0                                                                                                  |
| **Section**    | Design Principles → 1. Interoperable                                                                                        |
| **Sync Date**  | 2026-01-22                                                                                                                  |
| **Source URL** | https://gtcx-protocol.gitbook.io/gtcx-open-source/QEzDNoYVhOOhfBbS0PAM/design-principles/design-principles/1.-interoperable |

---

## Overview

| Feature                          | Description                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Cross-Platform Compatibility** | GTCX protocol standards enable seamless integration across different regional implementations (i.e. West Africa, Latin America, South East Asia) |
| **Universal Standards**          | ISO 20022 financial messaging, W3C verifiable credentials, and GS1 supply chain standards ensure global compatibility                            |
| **API-First Design**             | RESTful APIs, GraphQL endpoints, and standardized data schemas enable third-party innovation and integration                                     |
| **Multi-Protocol Support**       | WebSocket, HTTPS, MQTT, and AMQP messaging accommodate diverse technological environments                                                        |

---

## Cross-Platform Compatibility

- GTCX protocol standards enable seamless integration across different regional implementations
- RESTful APIs, GraphQL endpoints, and standardized data schemas enable third-party innovation
- Multi-protocol support (WebSocket, HTTPS, MQTT, AMQP) accommodates diverse technological environments

---

## Universal Standards Integration

| Standard                       | Purpose                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| **ISO 20022**                  | Financial messaging for global financial system compatibility     |
| **W3C Verifiable Credentials** | Identity and compliance verification                              |
| **GS1**                        | Supply chain standards for physical asset tracking and provenance |
| **Open-source algorithms**     | Compliance scoring that can be audited by any stakeholder         |

---

## Modular and Adaptive Design

- Core protocols customizable for different commodities, regulatory frameworks, and cultural contexts
- Configurable compliance frameworks that accommodate different national and regional requirements
- Horizontal and vertical scaling capabilities that grow with market development
- Functions across varying levels of technological infrastructure and connectivity

---

## Incremental Adoption Support

| Capability                 | Description                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **Enhancement-First**      | Designed to enhance and work with existing systems rather than replace them          |
| **Gradual Implementation** | Can be adopted without requiring system-wide changes                                 |
| **Sector Agnostic**        | Architecture that transcends domain-specific limitations                             |
| **No Vendor Lock-in**      | Multiple implementation options prevent dependency on any single technology provider |

---

## Technical Implementation

```
┌─────────────────────────────────────────────────────────────────┐
│                 INTEROPERABILITY LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────┐  │
│   │   ISO 20022     │   │  W3C Verifiable │   │    GS1      │  │
│   │   Financial     │   │   Credentials   │   │  Supply     │  │
│   │   Messaging     │   │                 │   │  Chain      │  │
│   └────────┬────────┘   └────────┬────────┘   └──────┬──────┘  │
│            │                     │                    │         │
│            └─────────────────────┼────────────────────┘         │
│                                  │                              │
│                                  ▼                              │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │              GTCX PROTOCOL ABSTRACTION                  │  │
│   │                                                         │  │
│   │  • RESTful APIs        • GraphQL Endpoints              │  │
│   │  • WebSocket           • MQTT / AMQP                    │  │
│   │  • Standardized Schemas                                 │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                  │                              │
│                                  ▼                              │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐  │
│   │ West Africa │   │   Latin     │   │   Southeast Asia    │  │
│   │   Region    │   │   America   │   │      Region         │  │
│   └─────────────┘   └─────────────┘   └─────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Related Principles

| Principle                              | Connection                                                                |
| -------------------------------------- | ------------------------------------------------------------------------- |
| [2. Accessible](./2-accessible.md)     | Interoperability enables accessibility across diverse infrastructure      |
| [4. Configurable](./4-configurable.md) | Modular design enables configurability                                    |
| [5. Sovereign](./5-sovereign.md)       | Standards-based approach preserves sovereignty while enabling integration |

---

_Source: GitBook v2.0 — Synced January 22, 2026_
