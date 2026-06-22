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

**Principle:** canon-os is standards SoR — **writes: false** — link, never fork.

| Artifact | Role |
| -------- | ---- |
| [`canon-os-consumption.json`](./canon-os-consumption.json) | Resolve table + gate list |
| [`docs-ia-contract.json`](./docs-ia-contract.json) | CANON-DOCS-IA-V1 pin → bridge-os enforcement |
| [`../machine/spec/docs-folder-pillar-contract.json`](../machine/spec/docs-folder-pillar-contract.json) | CANON-DOCS-PILLAR-V1 pin → canon-os spec |
| [`product-canon-contract.json`](./product-canon-contract.json) | CANON-PRODUCT-CANON-V1 pin → canon-os synthesizer |
| [`folder-rename-policy.json`](./folder-rename-policy.json) | Folder identity policy pin |
| [`folders.json`](./folders.json) | Local folder registry |
| [`../platform/scripts/lib/folder-registry.mjs`](../platform/scripts/lib/folder-registry.mjs) | Resolver — `remoteFolderPath('../<repo>', id)` for cross-repo paths |
| [`../machine/spec/canon-os-fleet-contracts.json`](../machine/spec/canon-os-fleet-contracts.json) | Local consumer registry (writes: false) |
| [`../machine/spec/fleet-repo-rollout-program.json`](../machine/spec/fleet-repo-rollout-program.json) | Rollout phase pin — execute Class R, log in canon coordination log |

**Resolve (paths in [`ecosystem-central-sor.json`](../canon-os/config/ecosystem-central-sor.json)):**

| Domain | Resolve to |
| ------ | ---------- |
| Protocols | `../canon-os/docs/governance/protocols/` (index `…/README.md`) |
| Constitution | `../canon-os/docs/governance/constitution/` |
| Provisioning | `../canon-os/machine/spec/repo-provisioning/{L0,L1}-*.json` |
| Docs IA | `../canon-os/machine/spec/docs-folders/INDEX.json` + `docs-ia-pillar-map.json` |
| Audit save-format | `../canon-os/machine/spec/repo-provisioning/L1-audit.json` |
| Rubric | `../canon-os/platform/tools/audit/audit-framework/UNIVERSAL_RUBRIC.md` |
| Templates | `../canon-os/docs/reference/templates/` |

**Gates:** `pnpm canon:consumption:check` · `pnpm docs:ia:check` · `pnpm docs:pack:pillar-contract:check` · `pnpm canon:synthesize:check` · `pnpm canon:contracts:check`

**Rollout:** follow `machine/spec/fleet-repo-rollout-program.json` phases; record completion in [`canon-os` coordination log](../canon-os/operations/coordination/hub-narrative/agent-coordination-log.md).

## Baseline-os runtime (fixture — spec authority is canon-os)

| Artifact | Role |
| -------- | ---- |
| [`agent-consumption-contract.json`](./agent-consumption-contract.json) | Session spine wiring — bin, shims, legacy path detection |
| [`../baseline-os`](../baseline-os) | AI runtime provider + reference fixture (not spec SoR) |

**Session spine:** `pnpm session` · `pnpm next` · `pnpm gates` · `pnpm hub` · `pnpm mcp` / `pnpm serve`

**Drift gate:** `pnpm agent:consumption:check` — fails on contract `legacyPathFragments` (stale baseline bin/shim paths)

**Fixture copy (PHASE-*):** mirror baseline shapes from contract `fixtureCopyTargets`; adapt domains; standards resolve via [`canon-os-consumption.json`](./canon-os-consumption.json).
