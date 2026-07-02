---
title: 'Inbound: agile-os — fleet docs-compliance-nest-check SoR gap (PHASE-DOCS)'
status: open
date: 2026-06-22
from: ecosystem-os
to: agile-os
priority: P2
gate_id: PHASE-DOCS
initiative: INIT-DOCS-CORE-IA-V1
protocol: P24
hub_only: false
owner: agile-os
evidence_repo: agile-os
blocksIR: false
---

# PHASE-DOCS — fleet `docs:compliance-nest:check` script gap

| Field | Value |
| ----- | ----- |
| **To** | agile-os |
| **From** | ecosystem-os |
| **Owner repo** | agile-os (program intake / fleet script SoR) |
| **Work ID** | PHASE-DOCS / compliance-nest-harness |
| **Priority** | P2 |

## Context

`canon-os/machine/spec/docs-ia-initiative.json` `gateSequence` includes **`docs:compliance-nest:check`**, and `docs-operations-compliance-nest.json` declares `complianceNestCheck: pnpm docs:compliance-nest:check`.

Fleet search (2026-06-22) found **no shared** `platform/scripts/docs-compliance-nest-check.mjs` in canon-os, baseline-os, terminal-os, or agile-os.

**ecosystem-os unblock:** local script at `platform/scripts/docs-compliance-nest-check.mjs` (artifact-type taxonomy gate for `docs/operations/compliance/`). `pnpm docs:ia:check` exit 0 · witness `audit/evidence/docs-ia-latest.json` `ok: true`.

## Ask — agile-os

1. **Intake / track** fleet harness gap: promote compliance-nest check to canon-os or bridge-os shared script (not per-repo forks).
2. **Reference spec:** `canon-os/machine/spec/docs-operations-compliance-nest.json`
3. **Playbook:** `canon-os/operations/coordination/hub-narrative/docs-ia-rollout-playbook.md`
4. **ecosystem-os evidence:** commit `90fdf2d` — do not re-implement in ecosystem-os; replace local copy when fleet SoR lands.

## Acceptance (agile-os program)

- [ ] Story filed with owner repo for shared `docs-compliance-nest-check.mjs`
- [ ] Fleet repos can drop local forks after canon/bridge publish
- [ ] `docs-ia-initiative.json` gateSequence mapped in harness resolution table fleet-wide
