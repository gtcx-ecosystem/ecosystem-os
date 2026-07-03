---
title: 'BETSI — ecosystem-os audit-readiness'
status: current
date: 2026-07-03
owner: ecosystem-os
document_type: runbook
tier: operating
tags: [betsi, governance, audit-readiness]
review_cycle: quarterly
---

# BETSI — ecosystem-os

Framework SoR: `../fabric-os/machine/spec/betsi-framework.json`. Contract: `machine/spec/betsi-contract.pin.json`. Gate: `betsi:check`.

Stage target: **S1**. Run `node ../fabric-os/platform/scripts/checks/betsi-check.mjs --repo-root . --write` for the honest per-domain gap list (witness: `audit/evidence/betsi-latest.json`).

Design-adequacy (S1/Type I) never implies operating-effectiveness (S2/Type II) or attestation (S3). See fabric-os `docs/governance/betsi/README.md`.
