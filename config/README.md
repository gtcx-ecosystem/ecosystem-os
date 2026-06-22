---
title: 'config'
status: current
date: 2026-06-22
owner: ecosystem-os
document_type: overview
review_cycle: on-change
---

# config — machine SoR

Machine config only — narrative index lives in [`docs/sor.json`](../docs/sor.json).

## Canon-os consumption (read-only)

| Artifact | Role |
| -------- | ---- |
| [`canon-os-consumption.json`](./canon-os-consumption.json) | Resolve table — **writes: false** |
| [`docs-ia-contract.json`](./docs-ia-contract.json) | CANON-DOCS-IA-V1 pin → bridge-os enforcement |
| [`docs-folder-pillar-contract.json`](../machine/spec/docs-folder-pillar-contract.json) | CANON-DOCS-PILLAR-V1 pin → canon-os spec |
| [`product-canon-contract.json`](./product-canon-contract.json) | CANON-PRODUCT-CANON-V1 pin → canon-os synthesizer |
| [`folder-rename-policy.json`](./folder-rename-policy.json) | Folder identity policy pin |
| [`folders.json`](./folders.json) | Local folder registry |
| [`../platform/scripts/lib/folder-registry.mjs`](../platform/scripts/lib/folder-registry.mjs) | Resolver — never hardcode cross-repo folder paths |

Standards SoR: [`../canon-os/config/ecosystem-central-sor.json`](../canon-os/config/ecosystem-central-sor.json)

**Gates:** `pnpm docs:ia:check` · `pnpm docs:pack:pillar-contract:check` · `pnpm canon:synthesize:check` · `pnpm canon:contracts:check`

## Baseline-os runtime (fixture — spec authority is canon-os)

| Artifact | Role |
| -------- | ---- |
| [`agent-consumption-contract.json`](./agent-consumption-contract.json) | Session spine wiring — bin, shims, legacy path detection |
| [`../baseline-os`](../baseline-os) | AI runtime provider + reference fixture (not spec SoR) |

**Session spine:** `pnpm session` · `pnpm next` · `pnpm gates` · `pnpm hub` · `pnpm mcp` / `pnpm serve`

**Drift gate:** `pnpm agent:consumption:check` — fails on contract `legacyPathFragments` (stale baseline bin/shim paths)

**Fixture copy (PHASE-*):** mirror baseline shapes from contract `fixtureCopyTargets`; adapt domains; standards resolve via [`canon-os-consumption.json`](./canon-os-consumption.json).
