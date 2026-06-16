---
title: 'Cursor agent guidance — ecosystem-os'
status: current
date: 2026-06-15
owner: ecosystem-os
document_type: protocol
tier: operating
tags: ['agents', 'cursor', 'documentation']
review_cycle: on-change
---

# Cursor agent guidance — ecosystem-os

Cursor-specific guidance for working in `ecosystem-os`.

## Config

- Workspace rules: [`.cursor/rules`](../../../.cursor/rules) when present.
- Permissions: [`.cursor/permissions.json`](../../../.cursor/permissions.json).

## Session start

1. Load root [`AGENTS.md`](../../../AGENTS.md).
2. Run `pnpm ops:check` to establish baseline.
3. Run `pnpm agent:next-work` for P22 delegation.

## Special instructions

- **Do not hand-edit** synced GitBook mirrors under `docs/reference/gitbooks/<repo>/`.
- Add new `docs/` paths only after reading [`docs/FOLDER-SPEC.md`](../../FOLDER-SPEC.md).
- Update `pm/publish-register.json` when adding or changing a GitBook space.
- Keep normative protocol text in `canon-os`; link only.

## Verification

```bash
pnpm ops:check
pnpm layout:check
pnpm pm:folder:check
```
