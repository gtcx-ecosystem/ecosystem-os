---
title: mpr relation gap
status: current
date: 2026-06-29
owner: ecosystem-os
document_type: evidence-report
tier: operational
tags: ['kaleidoscope-ai', 'mpr', 'signal', 'evidence-gap']
review_cycle: on-change
---

# mpr relation gap

## Purpose

This report makes the current MPR relation gap explicit for Kaleidoscope, SIGNAL, and Observatory consumers.

It does not change repo scores. It records the gap so the team can decide whether each repo should publish repo-local MPR evidence or an approved no-MPR relation witness.

Machine witness:

- `audit/evidence/mpr-relation-gap-latest.json`

Schema:

- `pm/spec/kaleidoscope-ai/mpr-relation-gap.schema.json`

## Current gaps

| Repo | Current SIGNAL-E | MPR relation | Current handling |
| --- | ---: | --- | --- |
| `bridge-os` | L1 | missing | Keep SIGNAL process evidence capped until MPR evidence or approved no-MPR relation exists. |
| `terminal-os` | L1 | missing | Keep SIGNAL process evidence capped until MPR evidence or approved no-MPR relation exists. |

## Resolution options

| Option | When to use | Effect |
| --- | --- | --- |
| Publish repo MPR evidence | Repo should be evaluated like other real repos. | MPR relation becomes direct and SIGNAL process evidence can be re-evaluated. |
| Publish approved no-MPR relation witness | Repo is intentionally evaluated through ecosystem-level evidence instead of repo-local MPR. | MPR relation becomes explicit, but scoring only changes after approval. |
| Leave as missing | Evidence owner is not ready to decide. | SIGNAL remains conservative and Observatory keeps MPR as `n/a`. |

## Approval boundary

Changing this relation can affect SIGNAL process scoring and Observatory rollups. The current gap witness is therefore draft evidence only and keeps `scoreChangeAllowed` as `false`.

## Validation

```sh
pnpm kaleidoscope:signal:check
pnpm kaleidoscope:observatory:check
pnpm kaleidoscope:operate:check
```

