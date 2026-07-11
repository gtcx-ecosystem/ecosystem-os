# Ecosystem — `PLATFORM/ecosystem`

Fleet documentation / GitBook / GTM package shell (folded from the retired `gtcx.ecosystem` hub).

**Nested `.git` is Class A** — see `NESTED-GIT.md` and `fleet/coordination/blockers/BLK-ECOSYSTEM-NESTED-GIT-001.md`. Domain cwd for orchestration remains `gtcx.infrastructure`.

## Package shell

| Path | Role |
| ---- | ---- |
| `platform/` | Runtime hub |
| `fundraising/` | Extra L0 exception (investor / capital decks) |
| `deploy/` | Pointer → `infrastructure/deploy/ecosystem/` |
| `./config` | → `config/members/ecosystem/` |
| `./workstream` | → `workstream/members/ecosystem/` |
| `./audit` | → `audit/members/ecosystem/` |
| `./docs` | → `product/members/ecosystem/documentation` |

## Domain hubs

| Hub | Path |
| --- | ---- |
| product | `product/members/ecosystem/` · GitBook under `product/gitbook/` / member docs |
| operations | `operations/members/ecosystem/` |
| agents | `agents/members/ecosystem/` |
| config | `config/members/ecosystem/` |
| workstream | `workstream/members/ecosystem/` |
| audit | `audit/members/ecosystem/` |

Venture is a **peer** at `PLATFORM/venture` — not nested here.

## Operator entry

```bash
cd gtcx.infrastructure
pnpm operations:check
cd PLATFORM/ecosystem   # nested checkout — Class A absorb deferred
```

See [`AGENTS.md`](./AGENTS.md) · [`NESTED-GIT.md`](./NESTED-GIT.md).
