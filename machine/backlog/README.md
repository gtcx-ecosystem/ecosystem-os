# pm/backlog — Ecosystem OS machine backlog

**SoR:** [`backlog.json`](../backlog.json) · **Registry:** [`pm/spec/backlog-registry.json`](../spec/backlog-registry.json)

## Domains

| Domain | Initiative | Slice | Stories |
| ------ | ---------- | ----- | ------- |
| Kernel (governed substrate) | `INIT-ECOSYSTEM-CORE` | _(registry-led)_ | ECO-CORE-* |
| Graph (company state) | `INIT-ECOSYSTEM-CORE` | _(registry-led)_ | ECO-CORE-* |
| Ledger (evidence + replay) | `INIT-ECOSYSTEM-CORE` | _(registry-led)_ | ECO-CORE-* |
| Surface (command center) | `INIT-ECOSYSTEM-CORE` | _(registry-led)_ | ECO-CORE-* |
| Ethos (doctrine + judgment) | `INIT-ECOSYSTEM-ETHOS` | _(registry-led)_ | ECO-ETHOS-* |
| Fleet docs home | `INIT-ECOSYSTEM-DOCS` | [`docs-backlog.json`](./docs-backlog.json) | ECO-DOCS-* |
| Agency (GTM expression) | `INIT-ECOSYSTEM-AGENCY` | [`agency-backlog.json`](./agency-backlog.json) | ECO-AGY-* |
| Venture (portfolio + thesis) | `INIT-ECOSYSTEM-VENTURE` | [`venture-backlog.json`](./venture-backlog.json) | ECO-VEN-* |
| Quarter ship | `INIT-ECOSYSTEM-SHIP` | _(in main backlog)_ | ECO-SHIP-* |

## Boundaries

- **ecosystem-os** leads Kernel, Graph, Ledger, Surface, Ethos, Venture, and Agency as product modules.
- Supporting repos implement adapters, surfaces, ceremonies, infrastructure, or evidence; they do not replace ecosystem-os as product lead for these seven modules.
- **venture-os** owns Venture app/product implementation; Venture module strategy, portfolio thesis, and fundraising coordination stay here.
- **agile-os** owns fleet program sprint backlog — link only; do not fork.

## P22

Agents select work from `pm/backlog.json` in this repo. Cross-repo stories (`ECO-VEN-005`) execute in the owner repo after handoff.

## Commands

```bash
pnpm pm:folder:check
pnpm agency:check
pnpm ops:check
```
