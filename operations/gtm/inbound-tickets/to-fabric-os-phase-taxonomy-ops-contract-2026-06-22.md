---
title: 'Inbound: fabric-os — PHASE-TAXONOMY ops contract verifier + operations/ alias'
status: open
date: 2026-06-22
from: ecosystem-os
to: fabric-os
priority: P1
gate_id: PHASE-TAXONOMY
initiative: INIT-DOCS-CORE-IA-V1
protocol: P24
hub_only: false
owner: fabric-os
evidence_repo: fabric-os
blocksIR: false
---

# TO fabric-os — ops contract verifier of record (PHASE-TAXONOMY)

| Field | Value |
| ----- | ----- |
| **To** | fabric-os |
| **From** | ecosystem-os |
| **Owner repo** | fabric-os |
| **Work ID** | PHASE-TAXONOMY / fabric-ops-policy-contract |
| **Priority** | P1 |

## Context

Repos rolling **PHASE-TAXONOMY** adopt canon-os standard: `ops→operations`, `pm→machine`, 7-domain `operations/fabric-contract.json`. **fabric-os** owns the operational contract suite verifier.

**ecosystem-os status:** PHASE-TAXONOMY sealed (`1e0f8a3`) · `operations/fabric-contract.json` 7 domains · `fabric:ops-contracts:check` OK · shims `ops→operations`, `pm→machine` (mode 120000).

**Playbook (per-repo #2):** `canon-os/operations/coordination/hub-narrative/folder-taxonomy-audit-rollout-playbook.md`

**Save-format SoR (link, don't fork):** `canon-os/machine/spec/repo-provisioning/L1-operations.json` + `L1-audit.json`

## Ask 1 — Verify fleet conformance (fabric-os runs, fleet-wide)

```bash
pnpm fabric:ops:check          # ops-contracts + ops-consumption + legalops + ops-authority
pnpm fabric:ops:check:strict   # + ops-lanes-11pr + ecosystem:fabric + ecosystem:ops-lanes-11pr
```

7-domain ops-contract is part of PHASE-TAXONOMY — every repo must declare it.

**Snapshot @ flag time:** `pnpm fabric:ops-contracts:check` → **19/19 PASS** (2026-06-22). Sustain + publish witness; non-conformant repos fix via per-repo taxonomy playbook standard #2.

## Ask 2 — operations/ alias support (retire shims)

Central contract `fabric-os/pm/spec/fabric-ops-policy-contract.json` historically read each repo at hardcoded `ops/fabric-contract.json` (`localContractPath`) and `ops/*` in `requiredLocalRefs`. Renamed repos resolve only via back-compat `ops→operations` symlink.

**Requested:** Central contract accepts **both** `ops/` and `operations/` (`localContractPath` aliases + `requiredLocalRefs` variants). **Until shipped:** shims stay — do **not** flip `localContractPath` to `operations/` unilaterally (legacy repos still use `ops/` and would break).

**Alignment:** Keep every repo `centralRef` pointed at **`fabric-os/ops/*`** (fabric-os has not renamed).

**Note:** `fabric-ops-policy-contract.json` updated 2026-06-22 shows `localContractPathAliases` + dual `operations/`/`ops/` refs — confirm verifier + fleet docs reflect shipped behavior and shim retirement criteria.

## Acceptance (fabric-os)

- [ ] `pnpm fabric:ops:check` + `:strict` green fleet-wide with published witness
- [ ] Alias resolution documented; shim retirement track explicit
- [ ] Non-conformant repo list + remediation pointer to taxonomy playbook when drift > 0
