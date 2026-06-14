# AGENTS.md — Ecosystem OS

**Role:** Fleet documentation and publishing home (GitBook, GTM, onboarding, architecture narratives).

**Upstream (read-only):** [`canon-os`](../canon-os/) — constitution, protocols, audit rubric. Do not fork normative protocol text here.

**Program office:** [`bridge-os`](../bridge-os/) — P35 layout, fleet gates.

## Protocols

Protocol 22 (work selection — **delegated to bridge-os**), Protocol 24, Protocol 26, Protocol 27, Protocol 28 in force.

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
