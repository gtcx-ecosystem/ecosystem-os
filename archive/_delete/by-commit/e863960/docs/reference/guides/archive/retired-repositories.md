---
title: 'Retired repositories'
status: current
date: 2026-06-01
owner: gtcx-docs
tier: operating
tags: [['documentation', 'reference', 'ecosystem']]
review_cycle: on-change
document_type: protocol
---

# Retired repositories

Repos removed from the `gtcx-ecosystem` GitHub org. **Local backups** (mirrors + bundles) live on disk for restore:

`/Users/amanianai/Sites/gtcx-ecosystem/_local-backups/2026-06-01-retired-repos/`

## Deleted from GitHub

| Repo | Deleted | Superseded by | Notes |
|------|---------|---------------|--------|
| `agx-demo1` | 2026-06-01 | — | Empty demo repo |
| `sgx-demo` | 2026-06-01 | — | Empty demo repo |
| `gtcx-core12` | 2026-06-01 | [`compliance-os`](https://github.com/gtcx-ecosystem/compliance-os) → `services/core12/` | Python Core12 knowledge-graph service |
| `sensei-ai-docs-developers` | 2026-06-01 | [`sensei-ai`](https://github.com/gtcx-ecosystem/sensei-ai) | GitBook mirror; review: all `integration/` + `reference/` **DROP** (ETL-era API) |
| `sensei-ai-docs-operations` | 2026-06-01 | `sensei-ai` → `01-docs/04-ops/` | Superseded by live ops runbooks |
| `sensei-ai-docs-enterprise` | 2026-06-01 | `sensei-ai` → `01-docs/ops/gtm/`, `01-docs/product/enterprise/` | template-token GTM; **DROP** |
| `gtcx-amis` | 2026-06-01 | [`sensei-ai`](https://github.com/gtcx-ecosystem/sensei-ai) | Persona archive [`01-docs/archive/_historical/amis-personas/`](../README.md) |
| `gtcx-complianceos` | 2026-06-02 | [`compliance-os`](https://github.com/gtcx-ecosystem/compliance-os) | CaaS curriculum archive [`complianceos-legacy/`](../README.md); migration [`MIGRATION-COMPLETE`](https://github.com/gtcx-ecosystem/compliance-os/blob/main/01-docs/_historical/gtcx-complianceos-migration/MIGRATION-COMPLETE.md) |

Review record: `gtcx-ecosystem/_repo-review/REVIEW-DECISIONS.md` (on disk in ecosystem checkout).

**Off-machine backups:** Desktop `gtcx-retired-repos-backup-2026-06-01`, iCloud, and `_local-backups/2026-06-01-retired-repos/`.

## Restore from backup

```bash
git clone /path/to/_local-backups/2026-06-01-retired-repos/bundles/gtcx-core12.bundle gtcx-core12-restored
git clone /path/to/_local-backups/2026-06-01-retired-repos/bundles/gtcx-complianceos.bundle gtcx-complianceos-restored
```
