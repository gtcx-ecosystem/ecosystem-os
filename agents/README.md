# agents/ — ecosystem-os terminal index

**Start here** for fleet documentation and publish-surface agent guidance. Universal protocols stay in canon-os; repo operations stay in `ops/` + `docs/`.

## Which file for my terminal?

| Terminal | Read first | Config location |
| -------- | ---------- | --------------- |
| **Any** | [`AGENTS.md`](../../AGENTS.md) | P22–P29 session card |
| **Cursor** | [`.cursor/`](../../.cursor/) | Workspace rules when present |
| **Claude Code** | [`.claude/CLAUDE.md`](../../.claude/CLAUDE.md) | When present |

## Layer map

| Layer | Path | Role |
| ----- | ---- | ---- |
| **Operational** | [`ops/`](../../ops/) | P29 domains, manifests, gates |
| **Narrative** | [`docs/`](../) | GitBook, GTM, onboarding, publish register |
| **Publish** | [`deploy/`](../../deploy/) | Static GitBook and deploy artifacts |
| **PM SoR** | [`pm/`](../../pm/) | Publish register, readiness snapshot |

## Session commands

```bash
pnpm ops:check
pnpm agent:next-work
```


> **Pack:** [`../../canon-os/pm/spec/docs-agents-pack.json`](../../canon-os/pm/spec/docs-agents-pack.json)  
> **Execution spine:** [`../operations/agent-spine/`](../operations/agent-spine/) · **Session runtime:** [`../../workstream/sessions/`](../../workstream/sessions/)

