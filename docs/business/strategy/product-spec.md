---
title: 'Ecosystem OS — whole-product spec / PRD'
status: current
date: 2026-06-18
owner: ecosystem-os
tier: strategic
document_type: prd
canonical: true
tags: [prd, product-spec, ecosystem-os, operating-modules, strategic-layer]
review_cycle: monthly
audience: founders, team, partners, fleet operators
---

# Ecosystem OS — whole-product spec / PRD

> **Canonical SoR for ecosystem-os as the category product + documentation home.** Strategic layer above substrate repos (Kernel, Graph, Ledger, Surface) and seven operating modules (Ethos, Venture, Agency, Bridge, Agile, Fabric, Assurance).

## Product identity

| Field | Value |
| ----- | ----- |
| **Product name** | Ecosystem OS |
| **Repo** | `ecosystem-os` |
| **One-line** | AI-native company operating system — governed loop for humans and agents. |
| **Category claim** | Proof, coordination, and delivery are one product — not three vendors. |
| **Claim boundary** | Ecosystem OS owns **operating-model spec + fleet documentation + module SoR for Ethos/Venture/Agency**. Trade execution lives in gtcx-os/markets-os; infra in fabric-os; sprint authority in agile-os. |
| **Tier** | Strategic / canonical |

## Why Ecosystem OS exists

Regulated trade and capital formation require **witnessed evidence**, **fleet coordination**, and **agent execution** at the same time. Incumbent stacks bolt AI onto siloed SaaS; GTCX dogfoods a single operating loop where Graph knows, Ledger proves, Assurance scores, and Surface commands.

## Primary user classes

1. **Fleet operators** — run P22 work selection, witness gates, GitBook publish
2. **Product leads** — module contracts, venture profiles, portfolio thesis
3. **GTM / Agency** — campaign packs with claim→witness maps
4. **Compliance / Assurance** — multi-pillar audit, promotion gates
5. **Engineering** — owner-repo implementation with hub inbound tickets
6. **Institutional buyers** — read GitBook + strategy pack for category proof

## Seven operating modules + substrate

| Layer | Modules / repos | Pillar SoR |
| ----- | --------------- | ---------- |
| **Substrate** | baseline-os, agile-os, ledger-ui, gtcx-os, markets-os, terminal-os | Kernel, Graph, Ledger, Surface |
| **Operating** | Ethos, Venture, Agency (ecosystem-os) · Bridge, Agile, Fabric, Assurance (fleet) | Judge → Learn loop |

See [`../../architecture/specs/product-scopes/ecosystem-os-pillar-ownership-2026.md`](../../architecture/specs/product-scopes/ecosystem-os-pillar-ownership-2026.md).

## Packaging

| Package | Buyer | Modules |
| ------- | ----- | ------- |
| **Core** | Platform team | Kernel + Graph + Ledger |
| **Operator** | Trade desk | Surface + Bridge + Agile + Assurance |
| **Company** | CEO / COO | Ethos + Venture + Agency + Operator |
| **Enterprise** | Regulated deploy | Operator + Fabric |

## Non-goals

- Implementing trade rails or market matching (markets-os)
- Owning normative protocol law (canon-os)
- Replacing owner-repo CI or deploy (fabric-os)

## Success criteria (foundation)

| Dimension | Target | Witness |
| --------- | ------ | ------- |
| Product-scopes spine | ≥15 canonical specs | `docs/architecture/specs/product-scopes/` |
| Strategy pack | product-spec + matrix + journeys | `docs/business/strategy/` |
| Feature matrix | ≥90% coverage on module capabilities | `pm/ci/feature-coverage-matrix.json` |
| MPR layer composite | foundation ≥95 | `audit/evidence/mpr-product-layer-latest.json` |
