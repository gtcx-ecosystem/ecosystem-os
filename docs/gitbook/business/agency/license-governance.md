---
title: 'Agency license governance'
status: current
date: 2026-06-17
owner: ecosystem-os
document_type: policy
tier: critical
tags: ['agency', 'license', 'compliance', 'attribution']
review_cycle: on-change
---

# Agency license governance

## Policy

Every catalog entry in `pm/agency/catalogs/` must declare a **known license** — never `unknown` or empty.

| Status | Meaning |
| ------ | ------- |
| `allowed` | Cleared for campaign use with attribution rules below |
| `recommended` | Preferred default for new work |
| `restricted` | Requires legal review before external use |
| `forbidden` | Must not appear in shipped assets |

## Forbidden licenses (hard block)

`agency:check` fails on any catalog item using:

- `unknown` (missing or explicit)
- `proprietary` without `restricted` status + review record
- `all-rights-reserved` without written clearance
- Any license marked `forbidden` in the catalog entry

## Attribution requirements

| License family | Requirement |
| -------------- | ------------- |
| MIT / Apache-2.0 | Preserve copyright notice in asset credits |
| CC0-1.0 | No attribution required; document source in registry |
| CC-BY-* | Visible attribution on export surfaces |
| Commercial stock | Follow vendor terms; store receipt/ID in registry |

## Verification

```bash
pnpm agency:check        # fails on unknown-license per item
pnpm agency:check:write  # refreshes audit/evidence/agency-check-latest.json
```

Registry SoR: `pm/agency/catalogs/tools.json`, `assets.json`, `resources.json`.
