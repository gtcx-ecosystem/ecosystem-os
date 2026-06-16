---
title: 'Universal agent guidance — ecosystem-os'
status: current
date: 2026-06-15
owner: ecosystem-os
document_type: protocol
tier: operating
tags: ['agents', 'provisioning', 'documentation']
review_cycle: on-change
---

# Universal agent guidance — ecosystem-os

> **Universal protocols and constitution stay in [`canon-os`](../../../canon-os/).** This file is repo-local operational guidance only.

## Start here

1. Read root [`AGENTS.md`](../../../AGENTS.md).
2. Read [`docs/agents/provisioning/AGENT-INIT-CANON.md`](../provisioning/AGENT-INIT-CANON.md) for canonical session init.
3. Run `pnpm ops:check` before substantive work.
4. Run `pnpm agent:next-work` for P22 work selection.

## Scope boundaries

| In scope | Out of scope |
| -------- | ------------ |
| `docs/` narratives, GitBook source, onboarding | Normative protocols — canon-os |
| `ops/gtm/` catalog and inbound tickets | Product implementation — owner repos |
| `pm/publish-register.json` | Audit evidence — owner repos |
| `docs/reference/gitbooks/<repo>/` mirrors (synced) | Hand-editing synced mirrors |

## Common commands

```bash
pnpm ops:check
pnpm agent:next-work
pnpm layout:check
pnpm pm:folder:check
```

## Escalation

- Cross-repo coordination: [`docs/operations/cross-repo-coordination.md`](../../operations/cross-repo-coordination.md)
- Work selection protocol: [`docs/operations/agent-work-selection.md`](../../operations/agent-work-selection.md)
