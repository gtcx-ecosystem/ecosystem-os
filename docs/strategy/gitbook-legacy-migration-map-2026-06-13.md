---
title: 'GitBook legacy guides migration map (S45-02)'
status: current
date: 2026-06-13
owner: canon-os
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
initiative: INIT-DOC-FLEET-PUBLISH
sprint: 45
---

# Legacy guides → GitBook migration map

**Source of truth for legacy inventory:** [`docs/reference/guides/README.md`](../reference/guides/README.md)

**Target space:** `docs/gitbook/ecosystem/` (external) · **GTM fork:** `ops/gtm/`

| Legacy guide | Migration target | Wave | Owner action |
| ------------ | ---------------- | ---- | ------------ |
| anisa-quickstart.md | ecosystem/anisa-quickstart.md | B | Promote link-first |
| anisa-advanced-usage.md | ecosystem/anisa-advanced.md | B | Promote |
| anisa-troubleshooting.md | ecosystem/anisa-troubleshooting.md | B | Promote |
| via-vxa-overview.md | ecosystem/via-vxa-overview.md | B | Promote |
| via-vxa-implementation.md | ecosystem/via-vxa-implementation.md | B | Promote |
| enterprise-via-vxa-overview.md | ops/gtm/enterprise-via-vxa-overview.md | B | GTM evidence |
| agentic-ai-architecture.md | ecosystem/agentic-ai-architecture.md | B | Promote |
| agentic-architecture-overview.md | docs/reference/architecture/ (stay internal) | — | No GitBook |
| ai-agents-specification.md | ecosystem/ai-agents-specification.md | B | Promote |
| deployment-+-agentic-ai.md | docs/operations/ (stay internal) | — | No GitBook |
| agent-troubleshooting.md | ecosystem/agent-troubleshooting.md | B | Promote |

## Execution rules

1. **Link-first:** Add SUMMARY entry pointing at legacy path until content is rewritten for GitBook tone.
2. **No duplicate SoR:** Product truth stays in owner repos; hub pages are curated entry points.
3. **GTM split:** Enterprise/sales-facing guides land under `ops/gtm/`, not ecosystem space.
4. **Gate:** Each wave batch requires `pnpm validate:publish` before `live-candidate`.

## Related

- Expansion plan: [`gitbook-ecosystem-expansion-plan-2026-06-13.md`](./gitbook-ecosystem-expansion-plan-2026-06-13.md)
- Fleet matrix: [`documentation-fleet-coverage-matrix.md`](../reference/documentation-fleet-coverage-matrix.md)
