---
title: 'GitBook ecosystem expansion plan (S45-01)'
status: current
date: 2026-06-13
owner: canon-os
initiative: INIT-DOC-FLEET-PUBLISH
sprint: 45
review_cycle: on-change
---

# GitBook ecosystem expansion plan

**Goal:** Expand `docs/gitbook/ecosystem/SUMMARY.md` from **6** to **≥20** curated pages without hand-copying owner-repo product truth.

**Method:** Link-first promotion from existing canon-os markdown (already audited) + staged legacy migration from `docs/reference/guides/`.

---

## Wave A — Immediate (S45-02 execute)

Add to ecosystem SUMMARY — source already in repo:

| # | SUMMARY title | Source path | Audience |
| - | ------------- | ----------- | -------- |
| 1 | Getting started | `docs/gitbook/getting-started/README.md` | All |
| 2 | Quickstart | `docs/gitbook/getting-started/quickstart.md` | Developer |
| 3 | Why GTCX | `docs/gitbook/getting-started/why.md` | Executive |
| 4 | Audiences | `docs/gitbook/getting-started/audiences.md` | GTM |
| 5 | API overview | `docs/gitbook/api/README.md` | Developer |
| 6 | Authentication | `docs/gitbook/api/authentication.md` | Developer |
| 7 | Endpoints | `docs/gitbook/api/endpoints.md` | Developer |
| 8 | SDKs | `docs/gitbook/api/sdks.md` | Developer |
| 9 | Webhooks | `docs/gitbook/api/webhooks.md` | Integrator |
| 10 | Rate limits | `docs/gitbook/api/rate-limits.md` | Developer |
| 11 | Integrations | `docs/gitbook/api/integrations.md` | Integrator |
| 12 | Resources & FAQ | `docs/gitbook/resources/README.md` | All |
| 13 | Support | `docs/gitbook/resources/support.md` | Operator |
| 14 | Glossary | `docs/gitbook/glossary/glossary.md` | All |
| 15 | Accessibility | `docs/gitbook/accessibility/README.md` | Product |
| 16 | Offline / USSD | `docs/gitbook/accessibility/offline.md` | Field |
| 17 | Fleet coverage matrix | `docs/reference/documentation-fleet-coverage-matrix.md` | Internal |
| 18 | Publish register | `pm/publish-register.json` (link to README stub) | Internal |
| 19 | Doc promotion | `docs/governance/doc-promotion/protocol.md` | Governance |
| 20 | Hub scope | `ops/coordination/hub-narrative/hub-scope-enforcement.md` | Agents |
| 21 | Onboarding | `docs/reference/organization/onboarding/README.md` | Contributor |
| 22 | Developer quickstart | `docs/reference/agent-sops/1-onboarding/developer-quickstart.md` | Developer |

**Exit S45-02:** SUMMARY ≥20 lines · `pnpm validate:publish` green · publish register `gtcx-ecosystem.status` → `live-candidate`

---

## Wave B — Legacy guides migration (S45-02 / S46)

| Legacy guide | Target | GTM? |
| ------------ | ------ | ---- |
| `anisa-quickstart.md` | ecosystem page or link to intelligence gitbook | no |
| `agentic-ai-architecture.md` | ecosystem | no |
| `via-vxa-overview.md` | ecosystem | no |
| `enterprise-via-vxa-overview.md` | `ops/gtm/` | yes |

---

## Wave C — Product GitBook spaces (S45-03 inbounds)

| Repo | Hub sync path | Status |
| ---- | ------------- | ------ |
| gtcx-protocols | `docs/reference/gitbooks/gtcx-protocols/` | **synced** |
| compliance-os | pending inbound | gap |
| gtcx-mobile | pending inbound | gap |
| ledger-ui | pending inbound | gap |

---

## Non-goals

- Duplicate protocols API reference inside ecosystem space (link to product space)
- Edit synced `gtcx-protocols/` tree by hand
- Publish without `validate:publish` witness
