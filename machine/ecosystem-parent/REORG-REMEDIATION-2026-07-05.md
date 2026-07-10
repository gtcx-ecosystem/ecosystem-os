# GTCX ecosystem reorg — remediation log (2026-07-05)

Folder-by-folder remediation after the vertical reorg (`gtcx.infrastructure/`, `gtcx.systems/`, …).
Each vertical gets a `REMEDIATION.md` with repo-level status. This file is the **roll-up SoR**.

## Remediation order (vertical folders)

| # | Folder | Axis | Status | Notes |
|---|--------|------|--------|-------|
| 1 | `gtcx.infrastructure/` | fleet-spine | **done** | bridge decouple complete; agile migrated; fabric qasc 98/100 |
| 2 | `gtcx.ecosystem/` | fleet hub | **done** | meta-workspace + WIP reconciled — see `gtcx.ecosystem/REMEDIATION.md` |
| 3 | `gtcx.systems/` | consumer-general | **done** | path decouple + husky + scripts — see `gtcx.systems/REMEDIATION.md` |
| 4 | `gtcx.trade/` | trade rail | **done** | path decouple all 5 repos — see `gtcx.trade/REMEDIATION.md` |
| 5 | `gtcx.markets/` | commodity consumer | **done** | path decouple markets-os, terminal-os, griot-ai — see `gtcx.markets/REMEDIATION.md` |
| 6 | `gtcx.design/` | design clutch | **done** | ledger-ui decouple + all members 0 dirty — see `gtcx.design/REMEDIATION.md` |
| 7 | `gtcx.ai/` | AI experiments | **done** | all 3 git repos 0 dirty — see `gtcx.ai/REMEDIATION.md` |
| 8 | `gtcx.capital/` | capital | **done** | all 3 repos 0 dirty — see `gtcx.capital/REMEDIATION.md` |
| 9 | `gtcx.org/` | properties | **done** | websites/ SoR + README stubs — see `gtcx.org/REMEDIATION.md` |
| 10 | `document-os/` | doc machine | **done** | onboarding R1–R4 + REMEDIATION committed — see `document-os/REMEDIATION.md` |
| 11 | `gtcx.network/` · `gtcx.protocols/` · `gtcx.research/` | content | low | no git repos; docs-only |

**Cross-cutting P0 (blocks multiple verticals):** root `pnpm-workspace.yaml` and `ecosystem-os` meta-workspace generator still assume **flat sibling layout** (`baseline-os/`, `gtcx-os/` at ecosystem parent). After vertical move, paths must be **vertical-qualified** (`gtcx.ai/platforms/baseline-os`, `gtcx.trade/gtcx-os`, …) or resolved via published `@baselineos/*` packages (bridge decouple path).

## Per-folder checklist (repeat for each vertical)

1. **Assess** — git branch, dirty count, ahead/behind, remote URL vs GitHub name
2. **SoR** — `sor.json` members match on-disk repos; README/AGENTS paths updated
3. **Path audit** — `../baseline-os`, `../bridge-os`, `../canon-os`, `../agile-os` sibling refs
4. **Agent entry** — `AGENTS.md`, `.claude/CLAUDE.md` present and accurate
5. **Reconcile** — micro-commit WIP (≤600 lines/file) when an agent slice completes or pre-push; **do not chase 0 dirty** under multi-agent concurrency
6. **Verify** — `pnpm operations:check` (or repo equivalent); typecheck/qasc where applicable
7. **Document** — vertical `REMEDIATION.md` reconciliation log
8. **Push** — Class A; operator approval per repo

**Policy:** no symlinks for cross-vertical resolution (operator 2026-07-05). Use workspace paths, package artifacts, or env (`BASELINE_OS_ROOT`).

## Multi-agent concurrency (2026-07-06)

With many repo agents active in parallel, **working trees will not stay clean**. That is expected — not a regression signal.

| Signal | Meaning |
|--------|---------|
| **Vertical done** | Path decouple committed, SoR/README accurate, gates green on last reconcile, structural WIP landed |
| **Dirty tree** | Concurrent agent work in flight — witnesses, specs, product packs, baseline session churn |
| **Reconcile when** | Agent session closes a slice, pre-push, or operator asks — not on every `continue` |

Do **not** treat fleet-wide dirty counts as remediation failure. Track **committed baseline** (branch, ahead, last reconcile commit) and **deferred operator items** (Class A push, merges, remote creates).

---

## Resolved (2026-07-05)

### 1. failuremode-ai — RESOLVED
Stale `.git/index.lock` cleared; initial commit landed. Remote configured (push-ready).

### 2. No-remote repos — PARTIAL (local done, GitHub pending)
Canonical remotes configured locally (`origin → github.com/gtcx-ecosystem/<name>`):
- gtcx.ai: 10x-ai, jedi-ai, failuremode-ai
- gtcx.design: fidelity-ai, mona-ai, copycat-ai
- gtcx.systems: competence-ai, stratum-os
- gtcx.capital: capital-os, sovereign-fx, vault-os
- gtcx.org properties

Deferred (operator): create + push on GitHub.

### 3. Remote rename drift — DOCUMENTED
- `inspection-os` → GitHub `inspector-os`
- `sensei-os` → GitHub `sensei-ai`

### 4. gtcx-os scope — CLASSIFIED
Ecosystem platform monorepo; housed in `gtcx.trade/`. Operator decision: keep vs lift.

### 5. Strategic consolidations — DOCUMENTED
- **gtcx-infra monorepo:** bridge + fabric + agile + canon + venture + nyota-ai (`gtcx.infrastructure/sor.json`)
- **Design clutch:** copycat + fidelity + mona (`gtcx.design/sor.json`)

---

## Live fleet snapshot (2026-07-05 ~22:15)

> **Stale — superseded by multi-agent note above.** Dirty counts fluctuate while repo agents run; use per-vertical `REMEDIATION.md` for committed baseline and operator queue.

| Vertical | Repos | Dirty repos | Worst dirty |
|----------|-------|-------------|-------------|
| gtcx.infrastructure | 7 | 3 | bridge-os (16) |
| gtcx.ecosystem | 1 | 1 | ecosystem-os (23) |
| gtcx.systems | 6 | 2 | baseline-os WIP + sensei-os GTM evidence |
| gtcx.markets | 5 | 5 | markets-os (37) |
| gtcx.trade | 5 | 3 | gtcx-os (53) |
| gtcx.design | 4 | 3 | copycat-ai (30) |
| gtcx.ai | 3 | 1 | jedi-ai (6) |
| gtcx.capital | 3 | 2 | vault-os (18) |

---

## Phase 3 — complete (2026-07-05 evening)

- **gtcx.infrastructure:** bridge decouple tail closed (`e6603364`); agile CLI migration (`ea3e539`, `6c5ae8f`); fabric qasc witness (`352d4145`). Symlink removed.
- **gtcx.ecosystem:** meta-workspace vertical paths (`7263095`); root `pnpm-workspace.yaml` regenerated.
- **Verticals 3–10:** `REMEDIATION.md` written per folder with git health snapshot.
- **Class A pushes:** held per operator policy — canon, bridge, agile, fabric, ecosystem-os branches ahead.

## Phase 4 — baseline-os → gtcx.ai (2026-07-07)

**Reversal:** baseline-os moved from `gtcx.ai/platforms/baseline-os` to `gtcx.ai/platforms/baseline-os`.

- gtcx.ai redefined as **ai-platform** vertical (runtime + AI products)
- gtcx.systems consumer portfolio no longer hosts baseline-os
- All fleet AI consumed via bridge-os (`agent-consumption-contract` v4)
- Path resolver: `resolve-baseline-os-root.mjs` with gtcx.ai canonical + gtcx.systems compat
- Evidence: DOJO D7 11/11, `ecosystem:ai-consumption:check` PASS
- RFC: `gtcx.ai/docs/architecture/ai-platform-vertical-2026-07-07.md`
