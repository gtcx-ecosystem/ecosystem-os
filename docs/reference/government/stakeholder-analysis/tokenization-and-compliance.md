---
title: 'Tokenization & Compliance'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Tokenization & Compliance

- Regulatory Classification: Are AGX tokens “virtual assets” under FATF definitions? If so, AGX must register as a Virtual Asset Service Provider (VASP) and enforce KYC/AML. Token transfers should be allowed only between approved accounts, or using identity-layer integrations. Paxos, for instance, only allows the minting of PAXG by KYC’d clients.
- Cross-Border Flow: Trading gold tokens across borders could trigger forex controls. AGX might restrict conversions to fiat to specific jurisdictions or use licensed brokers. It must comply with each country’s export/import laws for currency and commodities.
- Tax Compliance: How is capital gains tax or import/export duty applied? AGX should calculate taxes on trades and ideally remit them to governments, avoiding loopholes. A built-in tax accounting system could simplify compliance.
- Sanctions Screening: Given gold’s use in money laundering, AGX should screen transactions for sanctioned individuals or countries. This may mean geofencing (blocking) parties from high-risk areas or requiring additional checks on large trades.
- Reporting & Auditing: AGX must provide regulators with audit trails. Blockchain helps here: every transfer is recorded immutably. Reports on volumes and counterparties should be generated automatically. This aligns with OECD due diligence guidance, which urges transparency in mineral flows. AGX could claim alignment with OECD standards for responsible supply chains.
- Smart Contract Compliance: If tokens are on a blockchain, the smart contracts themselves should embed compliance logic (e.g. lock tokens if laws are broken, or allow revocation in fraud cases). This is advanced but could be a selling point (regulators love built-in controls).
