---
title: 'Developer docs fleet matrix (API/SDK/onboarding)'
status: current
date: 2026-06-13
owner: canon-os
initiative: INIT-DOC-FLEET-PUBLISH
sprint: 46
tier: operating
review_cycle: weekly
---

# Developer docs fleet matrix

**Dimensions:** API reference · SDK/package docs · contributor onboarding · runbook entry  
**Parent matrix:** [`documentation-fleet-coverage-matrix.md`](./documentation-fleet-coverage-matrix.md)

| Repo | API/SDK | Onboarding | Runbook | Hub index | Inbound |
| ---- | ------- | ---------- | ------- | --------- | ------- |
| canon-os | 🟡 `docs/gitbook/api/` | 🟡 org + agent SOPs | 🟡 ops/ | ✅ [ecosystem dev hub](../gitbook/ecosystem/developer-docs.md) | — |
| gtcx-protocols | ✅ REST/MCP/SDK | ⬜ | ⬜ | ✅ gitbook sync | — |
| compliance-os | ⬜ | ⬜ | ⬜ | ⬜ | [gitbook sync](../../ops/gtm/inbound-tickets/to-compliance-os-gitbook-sync-contract-2026-06-13.md) |
| gtcx-mobile | ⬜ Expo/RN | ⬜ | ⬜ | ⬜ | [gitbook sync](../../ops/gtm/inbound-tickets/to-gtcx-mobile-gitbook-sync-contract-2026-06-13.md) |
| ledger-ui | 🟡 `@gtcx/ui` npm | ⬜ | ⬜ | ⬜ | [ui republish](../../ops/gtm/inbound-tickets/to-ledger-ui-ui-dist-republish-2026-06-12.md) · [gitbook](../../ops/gtm/inbound-tickets/to-ledger-ui-gitbook-sync-contract-2026-06-13.md) |
| gtcx-platforms | ⬜ AGX/CRX | ⬜ | ⬜ | ⬜ | [dev-docs wave 1](../../ops/gtm/inbound-tickets/to-gtcx-platforms-dev-docs-wave1-2026-06-13.md) |
| gtcx-core | ⬜ | ⬜ | ⬜ | ⬜ | [dev-docs wave 1](../../ops/gtm/inbound-tickets/to-gtcx-core-dev-docs-wave1-2026-06-13.md) |
| gtcx-infrastructure | ⬜ terraform/k8s | ⬜ | ⬜ | ⬜ | [dev-docs wave 1](../../ops/gtm/inbound-tickets/to-gtcx-infrastructure-dev-docs-wave1-2026-06-13.md) |
| gtcx-intelligence | ⬜ ANISA/CORTEX | ⬜ | ⬜ | ⬜ | [dev-docs wave 1](../../ops/gtm/inbound-tickets/to-gtcx-intelligence-dev-docs-wave1-2026-06-13.md) |
| terminal-os | ⬜ | ⬜ | ⬜ | ⬜ | [dev-docs wave 1](../../ops/gtm/inbound-tickets/to-terminal-os-dev-docs-wave1-2026-06-13.md) |
| exploration-os | ⬜ validators | ⬜ | ⬜ | ⬜ | [dev-docs wave 1](../../ops/gtm/inbound-tickets/to-exploration-os-dev-docs-wave1-2026-06-13.md) |
| *remaining 11 repos* | ⬜ | ⬜ | ⬜ | ⬜ | Sprint 47 batch |

**Wave 1 filed:** 6 owner inbounds · **Coverage:** API/SDK **1/22** · onboarding **2/22** (baseline)

## Owner deliverable (wave 1)

1. `docs/onboarding/README.md` — clone, build, test, PR flow
2. `docs/api/README.md` or package README with public surface
3. Link in owner `AGENTS.md` or `README.md` to both paths
4. Notify hub → matrix row update
