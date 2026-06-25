# PM — product roadmap & completion

**Single agile SoR (P35 v5).** Audits update scores; `pnpm audit:pm-reconcile` recalculates completion.

| Artifact | Role | Edit? |
| -------- | ---- | ----- |
| [`initiatives.json`](./initiatives.json) | Initiatives → epics → features | **Yes** |
| [`completion-model.json`](./completion-model.json) | DoD gates, weights, 100/100 thresholds | **Yes** |
| [`manifest.json`](./manifest.json) | Paths + reconcile config | **Yes** |
| [`readiness-snapshot.json`](./readiness-snapshot.json) | Latest audit scores | Generated |
| [`execution-roadmap.md`](./execution-roadmap.md) | Human roadmap view | Generated |
| [`backlog.json`](./backlog.json) | P22 machine backlog | Generated |

```bash
pnpm audit:pm-reconcile   # after dimension audits
pnpm pm:sync
pnpm pm:status
```

Spec: [pm-completion-spec.md](../01-docs/shadow/gtcx-docs/03-platform/tools/audit/audit-engine/pm-completion-spec.md)
