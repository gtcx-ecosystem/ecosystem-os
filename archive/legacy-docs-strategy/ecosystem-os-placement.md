---
title: 'Ecosystem OS placement'
status: current
date: 2026-06-14
owner: ecosystem-os
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Ecosystem OS — fleet documentation placement

## Split

| Concern | Owner repo | Path |
| ------- | ---------- | ---- |
| Constitution, protocols P1–P39, audit rubric | **canon-os** | `docs/governance/`, `platform/tools/audit/` |
| GitBook, GTM, onboarding, publish register | **ecosystem-os** | `docs/gitbook/`, `ops/gtm/`, `pm/` |
| P35 layout enforcement | **bridge-os** | `config/ecosystem-layout-contract.json` |
| Product GitBook authoring | **owner slices** | `gtcx-os/platform/<slice>/docs/gitbook/` |

## Migrated from canon-os (2026-06-14)

- `docs/gitbook/` → `ecosystem-os/docs/gitbook/`
- `docs/reference/gitbooks/` → `ecosystem-os/docs/reference/gitbooks/`
- `docs/reference/organization/onboarding/` → `ecosystem-os/docs/onboarding/`
- `ops/gtm/` → `ecosystem-os/ops/gtm/`
- `pm/publish-register.json` → `ecosystem-os/pm/publish-register.json`
- Fleet coverage matrices → `ecosystem-os/docs/reference/`

canon-os retains copies until bridge-os [#28](https://github.com/gtcx-ecosystem/bridge-os/issues/28) reconciles publish topology and redirects.

## GitBook sync model (v5)

```text
Owner slice:  gtcx-os/platform/protocols/docs/gitbook/
       ↓ sync
Hub mirror:   ecosystem-os/docs/reference/gitbooks/gtcx-protocols/
       ↓ GitBook
Space:        gtcx-protocols
```

No `01-docs/` paths. Archived standalone repo names are not valid sync sources.

## Next steps

1. Register `ecosystem-os` in bridge-os ecosystem manifest
2. Repoint GitBook GitHub connection from canon-os to ecosystem-os
3. Add canon-os pointer stubs where fleet doc paths moved
4. Close bridge-os #28 when publish register reflects monorepo slices
