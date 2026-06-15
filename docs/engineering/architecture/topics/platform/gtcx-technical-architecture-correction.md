---
title: 'GTCX Technical Architecture Clarification'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['architecture', 'documentation']
review_cycle: on-change
document_type: architecture
---

# GTCX Technical Architecture Clarification

## Purpose

Clarify that GTCX relies on cryptographic verification and distributed proofs, not blockchain infrastructure.

## Core Statement

GTCX does **not** use blockchain. It uses cryptographic proofs, hash‑chained audit logs, and distributed verification to achieve trust without on‑chain consensus.

## Core Components

- **Identity**: signed credentials and selective disclosure
- **Location**: hardware‑attested GeoTag events
- **Compliance**: executable rule packs and evidence outputs
- **Custody**: hash‑chained custody events
- **Settlement**: payment‑versus‑physical orchestration

## Implications

- Faster finality and lower operational cost
- Better regulatory compatibility
- Stronger offline‑first support

## Usage

Use this statement in all external technical descriptions and remove any blockchain references.
