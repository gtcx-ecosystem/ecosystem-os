# pm/backlog — Ecosystem OS machine backlog

**SoR:** [`backlog.json`](../backlog.json) · **Registry:** [`pm/spec/backlog-registry.json`](../spec/backlog-registry.json)

## Domains

| Domain | Initiative | Slice | Stories |
| ------ | ---------- | ----- | ------- |
| Fleet docs home | `INIT-ECOSYSTEM-DOCS` | [`docs-backlog.json`](./docs-backlog.json) | ECO-DOCS-* |
| Agency (GTM expression) | `INIT-ECOSYSTEM-AGENCY` | [`agency-backlog.json`](./agency-backlog.json) | ECO-AGY-* |
| Venture (portfolio + thesis) | `INIT-ECOSYSTEM-VENTURE` | [`venture-backlog.json`](./venture-backlog.json) | ECO-VEN-* |
| Quarter ship | `INIT-ECOSYSTEM-SHIP` | _(in main backlog)_ | ECO-SHIP-* |

## Boundaries

- **ecosystem-os** owns Venture **module** strategy (portfolio, thesis, fundraising coordination).
- **venture-os** owns the Venture **product** (app, fundraising engine implementation).
- **agile-os** owns fleet program sprint backlog — link only; do not fork.

## P22

Agents select work from `pm/backlog.json` in this repo. Cross-repo stories (`ECO-VEN-005`) execute in the owner repo after handoff.

## Commands

```bash
pnpm pm:folder:check
pnpm agency:check
pnpm ops:check
```
