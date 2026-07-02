---
title: 'Fleet naming reconciliation glossary'
status: current
date: 2026-06-12
owner: canon-os
tier: operating
tags: [['glossary', 'naming', 'fleet']]
review_cycle: on-change
document_type: protocol
promotionManifestId: DOC-NAMING-RECONCILIATION
---

# Fleet naming reconciliation glossary

Resolves overloaded terms across the GTCX fleet. On conflict, audit-grounded specs win.

## Veritas

| Name | What it is | SoR |
| ---- | ---------- | --- |
| **Veritas (platforms service)** | Read-only compliance/market intelligence API in GTCX Sovereign/Cloud | `gtcx-os/platform/platforms` |
| **veritas-ai** | Publication engine for industry oracle drafts | `veritas-ai` repo |
| **Veritas54 / Griot** | Media and continental intel surfaces | `griot-ai` — not the oracle product |

## World model

| Name | What it is | Reliance |
| ---- | ---------- | -------- |
| **Intelligence World Model** | LLM-orchestrated cross-domain simulation | R&D only |
| **TerraOS world model** | Land/cadastral authoritative model | Domain truth |
| **ComplianceOS Core12** | Compliance graph / ML research | Domain truth |

## Oracle

| Name | What it is |
| ---- | ---------- |
| **Internal GTCX oracle** | Authority registry + fail-closed projections |
| **Industry oracle product** | Veritas publish + PANX delivery + `/verify` |

## CORTEX

| Name | What it is |
| ---- | ---------- |
| **CORTEX (brain)** | Fleet-wide ingest + learn loop (metaphor) |
| **Cortex service** | HTTP `/cortex/*` anomaly/risk APIs in Intelligence SDK |

## Identity & predicates

| Name | What it is |
| ---- | ---------- |
| **TradePass** | L1 identity protocol (`@gtcx/protocol-tradepass`) |
| **ComplianceCredential** | Domain credential type — not interchangeable with TradePass DID |
| **@gtcx/workproof predicates** | gtcx-core registry (40 production predicates) |
| **TradePass parallel predicates** | Reconciliation needed — see VF2 §1.3 |

## References

- [`verification-fabric-v2.md`](../../../../gtcx-os/platform/intelligence/01-docs/specs/verification-fabric-v2.md)
- [`internal-gtcx-oracle.md`](../../../../gtcx-os/platform/protocols/01-docs/architecture/internal-gtcx-oracle.md)
- Manifest: `docs/governance/doc-promotion/manifest.json`
