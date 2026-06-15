---
title: Planning
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Planning

1. **Ingest licensed operators** directly from the registry
2. **On-chain/tagged lot management** (attach each export batch to a registered operator)
3. **Compliance gating** (apply your GCI™ or custom risk checks before export sign-off)
4. **Customs & export workflows** (automate forms, e-signatures, duty calculations, generate export certificates)
5. **TradePass™ integration** (enable downstream buyers and vaults to verify provenance and licensing in real time)

#### Phase 1: Operator Registry & Licensing MVP

- **User Roles & Access**
  - Administrator (Ministry/Gold Board)
  - Registrar (clerks issuing/renewing licenses)
  - Operator (miner, aggregator, exporter)
- **Core Features**
  - Operator profiles (identity, location, entity type)
  - License application workflows (form-driven, attachments for IDs, fees)
  - Renewal & amendment processes (expiration reminders, digital signatures)
  - Audit trail & reporting (who applied/approved when)
- **Tech Stack**
  - Modular web app (React + Node/Python API)
  - Lightweight database (Postgres or equivalent)
  - Optional blockchain or append-only ledger for tamper evidence
  - Cloud-hosted PaaS for quick deployment

#### Phase 2: SGX Export-Approval Platform

- **Operator Linkage**
  - Auto-sync of active licenses and operator profiles
- **Lot Registration & Tagging**
  - APIs for batch creation (QR/NFC tags, serial IDs)
  - Metadata capture (weight, purity, origin GPS)
- **Compliance & Risk Engine**
  - Plug-in your GCI™ scoring or OECD/LBMA rules
  - Conditional workflows: flag high-risk lots for manual review
- **Customs/Export Workflow**
  - Digital export dossiers (forms, manifests)
  - Duty/tax calculation module
  - E-signature & certificate issuance
- **Buyer/Vault Portal**
  - Read-only view of registry + lot history
  - Export certificate validation endpoint
