---
title: 'Product capability matrix — ecosystem-os'
status: current
date: 2026-06-15
owner: ecosystem-os
tier: operating
tags: ['documentation', 'capabilities', 'matrix']
review_cycle: on-change
document_type: protocol
goals: 'Fleet documentation home — capability matrix'
---

# Product capability matrix — ecosystem-os

Capabilities of the fleet documentation home. Maturity legend: ✅ production · 🟡 partial · ⬜ gap.

| ID | Capability | Maturity | Owner | Evidence / SoR |
| -- | ---------- | -------- | ----- | -------------- |
| CAP-DOC-001 | GitBook `gtcx-ecosystem` space publish | ✅ | ecosystem-os | [`pm/publish-register.json`](../../pm/publish-register.json) · `docs/gitbook/ecosystem/` |
| CAP-DOC-002 | Owner-repo GitBook mirror sync | 🟡 | ecosystem-os + owner | [`docs/reference/gitbooks/`](../../docs/reference/gitbooks/) · sync contracts in `ops/gtm/inbound-tickets/` |
| CAP-DOC-003 | Fleet onboarding paths | 🟡 | ecosystem-os | [`docs/onboarding/`](../../docs/onboarding/) · [`docs/reference/onboarding/README.md`](../../docs/reference/onboarding/README.md) |
| CAP-DOC-004 | GTM catalog index | 🟡 | ecosystem-os | [`ops/gtm/fleet-catalog-index.md`](../../ops/gtm/fleet-catalog-index.md) |
| CAP-DOC-005 | Architecture narrative index | ✅ | ecosystem-os | [`docs/architecture/`](../../docs/architecture/) |
| CAP-DOC-006 | Legal/compliance pointers | ✅ | ecosystem-os | [`ops/legal/`](../../ops/legal/) · [`docs/governance/`](../../docs/governance/) |
| CAP-DOC-007 | Publish register | ✅ | ecosystem-os | [`pm/publish-register.json`](../../pm/publish-register.json) |
| CAP-DOC-008 | Fleet coverage matrix | 🟡 | ecosystem-os | [`docs/reference/documentation-fleet-coverage-matrix.md`](../../docs/reference/documentation-fleet-coverage-matrix.md) |
| CAP-DOC-009 | Cross-repo sync contracts | 🟡 | ecosystem-os | `ops/gtm/inbound-tickets/` |
| CAP-DOC-010 | Automated ops/check gate | 🟡 | ecosystem-os | [`platform/scripts/ops-check.mjs`](../../platform/scripts/ops-check.mjs) |

## Capability-to-initiative map

| Capability | Initiative | Epic | Feature |
| ---------- | ---------- | ---- | ------- |
| CAP-DOC-001–010 | INIT-ECOSYSTEM-DOCS | EPIC-P35-PM-LIFT | FEAT-PM-FOLDER-R1 |
| CAP-DOC-002, 008, 009 | INIT-DOC-FLEET-PUBLISH | (hub coordination) | sync contracts |
