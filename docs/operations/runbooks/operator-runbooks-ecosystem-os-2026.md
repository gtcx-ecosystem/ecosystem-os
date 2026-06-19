---
title: 'Ecosystem OS — operator runbooks 2026'
status: current
date: 2026-06-18
owner: ecosystem-os
tier: operating
document_type: runbook
canonical: true
tags: [runbook, operator, ecosystem-os, docs, agency]
review_cycle: monthly
audience: ops, documentation, GTM
---

# Ecosystem OS — operator runbooks

> Canonical SoR for internal operators running the **documentation + module SoR** home (`ecosystem-os`). Implementation repos have sibling runbooks; this doc covers hub duties.

## 1. Operator identity

Ecosystem OS operators keep **GitBook sources**, **venture/agency module SoR**, and **product-scopes spine** honest. They do not implement trade rails or deploy production infra (owner repos).

## 2. Daily verbs

1. **Witness** — audit/evidence JSON fresh after gate runs
2. **Probe** — ops:check, layout:check, agency:check
3. **Publish** — publish-register paths resolve
4. **File** — inbound tickets for cross-repo work (P24)
5. **Coordinate** — P22 in bridge-os; execute in owner repo

## 3. Morning routine

```bash
cd ecosystem-os
pnpm ops:check
pnpm layout:check --strict
pnpm agency:check
pnpm docs:foundation:check
pnpm docs:business:check
```

Any non-zero exit → fix or record blocker in agile-os backlog.

## 4. Agency campaign ship

1. Edit pack under `pm/agency/packs/<campaign>/`
2. `pnpm agency:export:write` for HTML/PDF exports
3. `pnpm agency:check` — claim paths must exist on disk
4. Class A review for external-facing claims
5. Update publish register when GitBook space updates

## 5. Venture profile maintenance

1. One profile per product repo under `docs/gitbook/business/venture/profiles/`
2. Link to owner backlog via initiative field
3. Innovation register entry for new INIT-*

## 6. Product-scopes spine

When adding a module or OS boundary:

1. Add/update scope spec in `docs/architecture/specs/product-scopes/`
2. Update README index reading order
3. Refresh `feature-matrix-2026.md` + `pm/ci/feature-coverage-matrix.json`
4. Re-roll `audit/evidence/mpr-product-layer-latest.json`

## 7. Incident classes

| Class | Example | Action |
| ----- | ------- | ------ |
| P0 | agency:check passes with missing claim file | Stop publish; fix paths |
| P1 | layout:check strict fail on hub | Block merge until green |
| P2 | stale MPR witness | Schedule re-roll same sprint |

## 8. Class S boundaries

Operators **never** promote canon law or sign legal claims. Escalate to human Class S; file witness of escalation.

## 9. References

- State machine: `docs/architecture/specs/product-scopes/ecosystem-os-operating-loop-state-machine-2026.md`
- P22: bridge-os `agent:next-work`
- Module map: `bridge-os/pm/spec/ecosystem-module-repo-map.json`
