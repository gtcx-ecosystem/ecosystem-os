---
title: 'Fleet documentation coverage matrix'
status: current
date: 2026-06-13
owner: canon-os
tier: operating
tags: ['protocol', 'documentation']
review_cycle: weekly
document_type: protocol
initiative: INIT-DOC-FLEET-PUBLISH
---

# Fleet documentation coverage matrix

**SoR for INIT-DOC-FLEET-PUBLISH.** Updated by hub agents only. Owner repos supply source; this matrix tracks **publish readiness**.

**Legend:** ✅ done · 🟡 partial · ⬜ gap · 📋 inbound filed

| Repo | GitBook | GTM slice | API/SDK docs | Onboarding | Hub publish row | Owner inbound |
| ---- | ------- | --------- | ------------ | ---------- | --------------- | ------------- |
| canon-os | constitution + audit rubric | — | audit-framework | — | — |
| ecosystem-os | 🟡 ecosystem + dev hub | 🟡 ops/gtm | 🟡 fleet dev matrix | 🟡 onboarding + agent | ✅ | — |
| gtcx-protocols | ✅ synced hub | ⬜ | ✅ REST/MCP/SDK | ⬜ | ✅ | — |
| compliance-os | ⬜ planned | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [gitbook S45](../../ops/gtm/inbound-tickets/to-compliance-os-gitbook-sync-contract-2026-06-13.md) |
| gtcx-mobile | ⬜ planned | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [gitbook S45](../../ops/gtm/inbound-tickets/to-gtcx-mobile-gitbook-sync-contract-2026-06-13.md) |
| ledger-ui | ⬜ planned | ⬜ | ⬜ npm package | ⬜ | ⬜ | 📋 [ui](../../ops/gtm/inbound-tickets/to-ledger-ui-ui-dist-republish-2026-06-12.md) · [gitbook](../../ops/gtm/inbound-tickets/to-ledger-ui-gitbook-sync-contract-2026-06-13.md) |
| gtcx-platforms | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [dev wave1](../../ops/gtm/inbound-tickets/to-gtcx-platforms-dev-docs-wave1-2026-06-13.md) |
| gtcx-core | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [dev wave1](../../ops/gtm/inbound-tickets/to-gtcx-core-dev-docs-wave1-2026-06-13.md) |
| gtcx-infrastructure | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [dev wave1](../../ops/gtm/inbound-tickets/to-gtcx-infrastructure-dev-docs-wave1-2026-06-13.md) |
| gtcx-intelligence | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [dev wave1](../../ops/gtm/inbound-tickets/to-gtcx-intelligence-dev-docs-wave1-2026-06-13.md) |
| exploration-os | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [dev wave1](../../ops/gtm/inbound-tickets/to-exploration-os-dev-docs-wave1-2026-06-13.md) |
| terminal-os | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 📋 [dev wave1](../../ops/gtm/inbound-tickets/to-terminal-os-dev-docs-wave1-2026-06-13.md) |
| baseline-os | ⬜ | ⬜ | ⬜ | 🟡 baseline start | ⬜ | pending S46 |
| gtcx-agentic | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| gtcx-agile | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| bridge-os | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| gtcx-markets | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| terra-os | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| sensei-ai | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| nyota-ai | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| griot-ai | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| veritas-ai | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| gtcx-hardware | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |
| gtcx-operations | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | pending S46 |

**Coverage (2026-06-13):** GitBook **2/22** · GTM indexed **1/22** · API/SDK matrix **1/22** · dev inbounds filed **9/22** · onboarding **2/22**

**Developer matrix:** [`developer-docs-fleet-matrix-2026-06-13.md`](./developer-docs-fleet-matrix-2026-06-13.md)

---

## Refresh protocol

Normative: [`documentation-quarterly-refresh-protocol.md`](../governance/documentation-quarterly-refresh-protocol.md)

1. Hub agent updates this matrix after each owner sync or inbound close.
2. `pnpm validate` + documentation pack audit **weekly during active program**; **quarterly** post seal.
3. Witness: [`audit/evidence/documentation-fleet-coverage-latest.json`](../../audit/evidence/documentation-fleet-coverage-latest.json) (S47-03 · refreshed each quarter).
