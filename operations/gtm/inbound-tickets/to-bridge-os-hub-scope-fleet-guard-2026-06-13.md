---
title: 'Inbound: bridge-os — fleet hub-scope guardrails (INIT-HUB-SCOPE-GUARD)'
status: open
date: 2026-06-13
from: canon-os
to: bridge-os
priority: P1
gate_id: INIT-HUB-SCOPE-GUARD
initiative: INIT-HUB-SCOPE-GUARD
protocol: P24
hub_only: true
owner: bridge-os
evidence_repo: bridge-os
blocksIR: false
---

# INIT-HUB-SCOPE-GUARD — bridge-os fleet harness

| Field | Value |
| ----- | ----- |
| **To** | bridge-os |
| **From** | canon-os (gtcx-docs / Layer 0) |
| **Owner repo** | bridge-os |
| **Implementation repo** | bridge-os (+ baseline-os for session-core changes) |
| **Hub only?** | `no` — bridge implements fleet guards; canon-os holds register + inbound only |
| **Work ID** | INIT-HUB-SCOPE-GUARD / HSG-B01–B06 |
| **Priority** | `blocked-path` — recurrence risk on every `execute_roadmap` / coordination tier session |

## Context

On **2026-06-12**, a canon-os agent session treated P22 **coordination tier** (`backlogClear: true`) as permission to **implement owner-repo work** (ledger-ui `@gtcx/ui` prepack/0.4.2, gtcx-platforms agx `npm install` probes) instead of **documentation + register witness only**.

Normative hub scope already exists ([`hub-scope-enforcement.md`](../../coordination/hub-narrative/hub-scope-enforcement.md), Protocol 24, P28). **Enforcement failed at session/runtime**, not at spec level.

**Incident register:** [`hub-scope-incident-register-2026-06-13.md`](../../coordination/hub-narrative/hub-scope-incident-register-2026-06-13.md)

## Ask — bridge-os (fleet harness owner)

### HSG-B01 — Workspace root gate (fail-closed)

Extend baseline **`repo-session-core`** / `baseline start` / `pnpm session` chain:

1. After P22 selection, if `repo === gtcx-docs|canon-os` **and** `coordination.implementOwner !== canon-os` **and** next action requires code → emit **HubScopeViolation** (exit ≠ 0) with owner repo name.
2. JSON field: `workspaceGuard: { requiredRoot, actualRoot, allowedActions: ['inbound','log','rollup','validate'] }`.

**Owner path:** `baseline-os` session package + bridge-os fleet contract tests.

### HSG-B02 — `ecosystem:workspace:check` (new fleet script)

Add bridge harness command:

```bash
pnpm ecosystem:workspace:check -- --expected-owner ledger-ui
```

- Compares `git rev-parse --show-toplevel` vs P22 `owner_repo` / inbound ticket `owner`.
- Wired into `baseline start` Phase 0b when `agentAutonomy.canExecute === true`.
- Witness: `pm/ci/workspace-guard-latest.json` in bridge-os.

### HSG-B03 — Syndicate canon hub charter to fleet agent specs

Update bridge-os SoR copies (do not fork normative text — link canon-os):

| Target | Action |
| ------ | ------ |
| [`bridge-os/docs/agents/specs/gtcx-docs.md`](https://github.com/gtcx-ecosystem/bridge-os/blob/main/docs/agents/specs/gtcx-docs.md) | Replace aspirational "aggregator" with **Layer 0 FORBIDDEN** table + coordination-tier rules |
| [`bridge-os/docs/operations/agent-ecosystem-rollout-sor.md`](https://github.com/gtcx-ecosystem/bridge-os/blob/main/docs/operations/agent-ecosystem-rollout-sor.md) | Add **Hub scope** subsection under Harness |
| Fleet template sync | Propagate `hub-layer-0-scope` rule snippet to owner repos via existing sync templates |

**Forbidden examples (must appear verbatim in syndicated spec):**

- npm publish / package.json edits in owner repos while cwd = canon-os
- `npm install` / portal builds in gtcx-platforms from hub workspace
- Marking XR done without owner SHA

### HSG-B04 — P22 JSON hardening (all repos consuming bridge harness)

When `backlogClear && coordination.tier`:

```json
"executionPolicy": {
  "hubRegisterOnly": true,
  "forbiddenCwd": ["*/ledger-ui/*", "*/gtcx-platforms/*"],
  "allowedHubActions": ["inbound", "coordination-log", "rollup", "validate", "audit:protocol-22"]
}
```

Ship in bridge-os `agent-next-work` adapter or document contract for canon-os consumer — **single schema** in `pm/spec/hub-scope-execution-policy.json`.

### HSG-B05 — Fleet CI contract test

Add bridge-os test (or extend `test-ci-contract.mjs` syndication):

- canon-os `agent:next-work --json` with `backlogClear: true` **must** include `implementOwner` ≠ product code paths.
- Regression fixture referencing incident id `HSG-INC-001`.

### HSG-B06 — Ack + fleet bulletin

1. Post ack: `bridge-os/docs/operations/coordination/from-canon-os-hub-scope-guard-ack-2026-06-13.md`
2. One-paragraph fleet bulletin in bridge coordination README (dated).

## Acceptance criteria

- [ ] `baseline start` in canon-os with simulated owner task prints **HubScopeViolation** (test log attached)
- [ ] `pnpm ecosystem:workspace:check` exists; exit 0 when cwd matches owner; exit 1 on mismatch
- [ ] `gtcx-docs` agent spec updated in bridge-os with FORBIDDEN table
- [ ] `pm/spec/hub-scope-execution-policy.json` committed in bridge-os (or baseline-os if shared)
- [ ] Fleet contract test green in bridge-os CI
- [ ] Ack file linked from this ticket

## Out of scope (bridge-os must NOT)

- Implement ledger-ui npm publish or package fixes (owner: **ledger-ui**)
- Change canon-os hub allowlist (canon-os owns `validate-hub-scope.mjs`)
- Bypass Class S gates (NPM_TOKEN, XR-516 human)

## Evidence / contracts

| Item | Path |
| ---- | ---- |
| Hub scope normative | [`hub-scope-enforcement.md`](../../coordination/hub-narrative/hub-scope-enforcement.md) |
| Incident register | [`hub-scope-incident-register-2026-06-13.md`](../../coordination/hub-narrative/hub-scope-incident-register-2026-06-13.md) |
| P22 coordination tier | canon-os `docs/operations/AGENT-WORK-SELECTION.md` § Coordination tier |
| agile-os program slice | [`to-agile-os-hub-scope-program-2026-06-13.md`](./to-agile-os-hub-scope-program-2026-06-13.md) |

## Ack

Reply within **5 business days** with ack path + first witness SHA for HSG-B01 or HSG-B02.
