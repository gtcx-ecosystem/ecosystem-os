---
title: 'GTCX fleet GTM catalog index'
status: current
date: 2026-06-13
owner: canon-os
initiative: INIT-DOC-FLEET-PUBLISH
tier: operating
review_cycle: on-change
---

# Fleet GTM catalog index

**Purpose:** Single hub entry for go-to-market artifacts across the fleet — what exists, where it lives, and owner gaps.

**SoR for doc coverage:** [`docs/reference/documentation-fleet-coverage-matrix.md`](../../docs/reference/documentation-fleet-coverage-matrix.md)  
**Publish register:** [`pm/publish-register.json`](../../pm/publish-register.json)

---

## Hub GTM artifacts (canon-os)

| Artifact | Path | Status |
| -------- | ---- | ------ |
| Executive brief | [`executive-brief.md`](./executive-brief.md) | current |
| Govern SIS/DFI (GitBook) | [`docs/gitbook/ecosystem/govern-active-record-sis-dfi.md`](../../docs/gitbook/ecosystem/govern-active-record-sis-dfi.md) | current (GOV-DOC-05b) |
| Scope manifest | [`scope.json`](./scope.json) | current |
| Inbound ticket index | [`inbound-tickets/index.md`](./inbound-tickets/index.md) | current |
| Inbound status rollup | [`inbound-tickets/inbound-ticket-status-2026-06-03.md`](./inbound-tickets/inbound-ticket-status-2026-06-03.md) | current |
| Doc fleet program | [`docs/strategy/init-doc-fleet-publish.md`](../../docs/strategy/init-doc-fleet-publish.md) | active |

---

## Fleet rows — GTM column

| Repo | GTM hub path | GitBook | Dev docs | Onboarding | Fleet status |
| ---- | ------------ | ------- | -------- | ---------- | ------------ |
| canon-os | `ops/gtm/` | ecosystem | `docs/gitbook/api/` | org onboarding | partial |
| gtcx-protocols | pending | synced | protocols gitbook | pending | synced |
| compliance-os | pending | inbound | owner | owner | gap |
| gtcx-mobile | pending | inbound | owner | owner | gap |
| ledger-ui | pending | inbound | owner | owner | gap |
| gtcx-platforms | pending | planned | owner | owner | gap |
| gtcx-core | pending | planned | owner | owner | gap |
| gtcx-infrastructure | pending | planned | owner | owner | gap |
| gtcx-intelligence | pending | planned | owner | owner | gap |
| exploration-os | pending | planned | owner | owner | gap |
| terminal-os | pending | planned | owner | owner | gap |
| baseline-os | [Govern GTM pack](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/README.md) | [ecosystem govern chapter](../../docs/gitbook/ecosystem/govern-active-record-sis-dfi.md) | govern narrative | layer guides | partial |
| gtcx-agentic | pending | planned | owner | owner | gap |
| bridge-os | pending | planned | owner | owner | gap |
| gtcx-markets | pending | planned | owner | owner | gap |
| terra-os | pending | planned | owner | owner | gap |
| sensei-ai | pending | planned | owner | owner | gap |
| nyota-ai | pending | planned | owner | owner | gap |
| griot-ai | pending | planned | owner | owner | gap |
| veritas-ai | pending | planned | owner | owner | gap |
| gtcx-hardware | pending | planned | owner | owner | gap |
| gtcx-operations | pending | planned | owner | owner | gap |

**Legend:** *partial* = hub artifacts exist · *synced* = GitBook mirror live · *gap* = owner inbound required · *inbound* = contract filed, awaiting owner

---

## Active inbounds (documentation program)

| To | Ticket | Story |
| -- | ------ | ----- |
| compliance-os | [`to-compliance-os-gitbook-sync-contract-2026-06-13.md`](./inbound-tickets/to-compliance-os-gitbook-sync-contract-2026-06-13.md) | S45-03 |
| gtcx-mobile | [`to-gtcx-mobile-gitbook-sync-contract-2026-06-13.md`](./inbound-tickets/to-gtcx-mobile-gitbook-sync-contract-2026-06-13.md) | S45-03 |
| ledger-ui | [`to-ledger-ui-gitbook-sync-contract-2026-06-13.md`](./inbound-tickets/to-ledger-ui-gitbook-sync-contract-2026-06-13.md) | S45-03 |

---

## Negative scope

- Product pricing, contracts, and buyer-specific decks stay in owner repos until promoted via inbound.
- Pen-test / SOC narrative slices remain Class A human gates — indexed here, not duplicated.
