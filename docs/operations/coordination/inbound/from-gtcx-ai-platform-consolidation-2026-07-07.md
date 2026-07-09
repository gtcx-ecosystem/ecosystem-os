---
title: 'P24 inbound — gtcx.ai platform consolidation rollup'
status: closed
date: 2026-07-07
from: gtcx.ai
to: gtcx.ecosystem
protocol: P24
owner: ecosystem-os
tier: coordination
---

# P24 inbound — ecosystem rollup for gtcx.ai platform consolidation

## Actions

| Artifact | Status |
|----------|--------|
| Root `sor.json` — gtcx.ai axis `ai-platform` | Materialized at workspace parent; tracked copy `machine/ecosystem-parent/sor.json` |
| `REORG-REMEDIATION-2026-07-05.md` Phase 4 | Roll-up note committed; tracked copy `machine/ecosystem-parent/REORG-REMEDIATION-2026-07-05.md` |
| `machine/meta-workspace/members.json` | baseline-os ? `gtcx.ai/platforms/baseline-os`; gtcx-os ? `gtcx.trade/platforms/gtcx-os`; ledger-ui ? `gtcx.design/platforms/ledger-ui` |
| Root `pnpm-workspace.yaml` | Regenerated via `pnpm meta:workspace:write` (untracked parent per meta-workspace policy) |

## gtcx.ai nogit domain shell (not in any git repo)

Vertical shell at `gtcx.ai/` is **polyrepo nogit** per `sor.json` `workspaceNote`. Files on disk only:

- `sor.json`, `README.md`, `index.md`, `AGENTS.md`, `REMEDIATION.md`
- `domain/manifest.json`, `docs/architecture/ai-platform-vertical-2026-07-07.md`
- `package.json` (fleet scripts)

Lead runtime repo: `gtcx.ai/platforms/baseline-os` (git). Commit note mirrored in baseline-os inbound.

## gtcx.systems shell (not in any git repo)

`gtcx.systems/` has no vertical git root. Updated shell files (`sor.json`, `README.md`, `domain/manifest.json`) remain filesystem-only until domain monorepo cutover.

## Evidence

- DOJO D7 11/11 in baseline-os
- `ecosystem:ai-consumption:check` PASS in bridge-os
- RFC: `gtcx.ai/docs/architecture/ai-platform-vertical-2026-07-07.md`
