---
title: 'Developer documentation — fleet entry'
status: current
date: 2026-06-13
owner: canon-os
tier: operating
tags: ['gitbook-chapter', 'documentation']
review_cycle: monthly
document_type: gitbook-chapter
gitbook_space: gtcx-ecosystem
initiative: INIT-DOC-FLEET-PUBLISH
story: S46-03
---

# Developer documentation

Curated entry for engineers integrating with GTCX protocols, hub tooling, and fleet repos. Product API truth lives in **owner repos**; this page links audited hub surfaces and tracks fleet coverage.

## Start here

| Path | Audience | SoR |
| ---- | -------- | --- |
| [Developer quickstart](../../reference/agent-sops/1-onboarding/developer-quickstart.md) | First local run | canon-os template |
| [API overview](../api/README.md) | REST integrators | `docs/gitbook/api/` |
| [Protocols GitBook](../../reference/gitbooks/gtcx-protocols/README.md) | REST · MCP · SDK | gtcx-protocols sync |
| [Contributor onboarding](../../reference/organization/onboarding/README.md) | Hub contributors | org onboarding |

## Hub API reference

| Topic | Page |
| ----- | ---- |
| Authentication | [authentication.md](../api/authentication.md) |
| Endpoints | [endpoints.md](../api/endpoints.md) |
| SDKs | [sdks.md](../api/sdks.md) |
| Webhooks | [webhooks.md](../api/webhooks.md) |
| Rate limits | [rate-limits.md](../api/rate-limits.md) |
| Integrations | [integrations.md](../api/integrations.md) |

## Engineering standards

| Standard | Path |
| -------- | ---- |
| Docs writing guide | [docs-writing-guide.md](../../reference/guides/engineering/docs-writing-guide.md) |
| New repo checklist | [new-repo-checklist.md](../../reference/guides/engineering/new-repo-checklist.md) |
| System design template | [system-design-template.md](../../engineering/system-design/system-design-template.md) |
| Doc promotion protocol | [protocol.md](../../governance/doc-promotion/protocol.md) |

## Fleet coverage

| Index | Purpose |
| ----- | ------- |
| [Developer docs fleet matrix](../../reference/developer-docs-fleet-matrix-2026-06-13.md) | API · SDK · onboarding · runbook per repo |
| [Documentation coverage matrix](../../reference/documentation-fleet-coverage-matrix.md) | GitBook · GTM · publish register |
| [Dev-docs owner wave 1 inbounds](../../../ops/gtm/inbound-tickets/dev-docs-owner-wave-1-index-2026-06-13.md) | Owner tickets filed (S46-02) |

**Owner deliverable (wave 1):** `docs/onboarding/README.md` · `docs/api/README.md` · links from owner `AGENTS.md` → notify hub for matrix update.

## GTM & Govern (baseline-os SoR)

| Surface | Path |
| ------- | ---- |
| Govern — SIS / DFI (GitBook) | [govern-active-record-sis-dfi.md](./govern-active-record-sis-dfi.md) |
| Golden day hero | [baseline-os 00-sis-dfi-golden-day](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/00-sis-dfi-golden-day.md) |
| Segment business cases | [baseline-os segments index](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/segments/README.md) |
| Integrator narrative | [02-developer-docs-narrative](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/02-developer-docs-narrative.md) |

## What not to duplicate here

- Product-specific PRDs and runbooks → owner repo `docs/`
- Synced protocol specs → [`gtcx-protocols` GitBook](../../reference/gitbooks/gtcx-protocols/README.md) only
- Implementation code → owner repo `src/` / `platform/`
