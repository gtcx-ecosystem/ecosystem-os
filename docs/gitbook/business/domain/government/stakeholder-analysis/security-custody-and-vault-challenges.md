---
title: 'Security, Custody & Vault Challenges'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Security, Custody & Vault Challenges


## Overview

###

- Vault Standards: AGX needs trustworthy vault operators. Vaults should meet international security standards (e.g. LLMA’s Responsible Gold Guidance) and be insured. Third-party audits (e.g. KPMG) should verify inventories and reconcile them to tokens regularly. As DMCC did, each gold bar could carry unique IDs and certifications.
- Insurance: Storing vast amounts of gold invites theft. Insurance costs can be a major expense. AGX might share risk via an industry insurance pool or get backstops from development banks (similar to how central banks insure reserves).
- Physical vs Digital Control: There must be strict controls over who can issue or burn tokens (issue = deposit of physical gold; burn = withdrawal). This likely means only approved vaults can trigger token creation when they receive gold, using multi-sig keys held by AGX, the vault, and an auditor. Losing custody keys (e.g. vault theft) should freeze token redemption until resolved.
- Cybersecurity: Vault operators and AGX platforms are high-value targets. Frequent security drills, employee vetting, and network isolation (air-gapped storage for private keys) are required.
- Proof-of-Reserve: To build trust, AGX should adopt “proof-of-reserve” techniques. For example, periodically publishing Merkle proofs that the total token supply equals recorded vault gold. Auditors could verify this confidentially, assuring holders.
