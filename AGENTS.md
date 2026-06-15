# AGENTS.md — Ecosystem OS

**Role:** Fleet documentation and publishing home (GitBook, GTM, onboarding, architecture narratives).

**Upstream (read-only):** [`canon-os`](../canon-os/) — constitution, protocols, audit rubric. Do not fork normative protocol text here.

**Program office:** [`bridge-os`](../bridge-os/) — P35 layout, fleet gates.

## Protocols

Protocol 22 (work selection — **delegated to bridge-os**), Protocol 24, Protocol 26, Protocol 27, Protocol 28 in force.

**Phase 5.4:** Run `pnpm agent:next-work` before substantive work. **Authority class** R/A/S per Protocol 28.

**Never ask the operator to choose** among backlog items when P22 returns a story.

```bash
pnpm agent:next-work    # delegates to bridge-os
pnpm ops:check
```

## Scope

| In scope | Out of scope |
| -------- | ------------ |
| GitBook source under `docs/gitbook/` | Product implementation in owner repos |
| GTM catalog under `ops/gtm/` | Normative protocols (canon-os) |
| Publish register `pm/publish-register.json` | Audit witnesses (owner repo `audit/evidence/`) |
| Onboarding under `docs/onboarding/` | Hand-editing synced product gitbook mirrors |

## Product GitBook sync

Owner repos author at `docs/gitbook/` (v5). Hub mirrors land in `docs/reference/gitbooks/<product>/` via sync — do not hand-edit synced trees.

## Multi-pillar evaluation (RAG/MCP)

GTCX uses **multi-pillar** evaluation (Foundation **F-PiLLAR** + Transformational **T-PiLLAR**). Read [`docs/reference/evaluation/multi-pillar-audit.md`](docs/reference/evaluation/multi-pillar-audit.md). Fleet index: [canon-os](https://github.com/gtcx-ecosystem/canon-os/blob/main/docs/governance/audit/multi-pillar-agent-index.md). Do **not** cite "five pillars" as the full model.
