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

It does not change repo scores. It records an explicit no-MPR relation witness so the fleet can distinguish "missing relation" from "intentionally evaluated through ecosystem-level MPR context."

Machine witness:

- `audit/evidence/mpr-relation-gap-latest.json`

Schema:

- `pm/spec/kaleidoscope-ai/mpr-relation-gap.schema.json`

## Current explicit relations

| Repo | Current SIGNAL-E | MPR relation | Current handling |
| --- | ---: | --- | --- |
| `bridge-os` | L1 | explicit no-MPR relation witness | Keep SIGNAL process evidence capped until repo MPR evidence exists or scoring approval is granted. |
| `terminal-os` | L1 | explicit no-MPR relation witness | Keep SIGNAL process evidence capped until repo MPR evidence exists or scoring approval is granted. |

## Resolution options

| Option | When to use | Effect |
| --- | --- | --- |
| Publish repo MPR evidence | Repo should be evaluated like other real repos. | MPR relation becomes direct and SIGNAL process evidence can be re-evaluated. |
| Keep explicit no-MPR relation witness | Repo is intentionally evaluated through ecosystem-level evidence instead of repo-local MPR. | MPR relation coverage becomes explicit, but scoring stays conservative. |
| Leave as missing | Evidence owner is not ready to decide. | SIGNAL remains conservative and Execution Studio keeps the repo in the missing-relation queue. |

## Approval boundary

Changing this relation can affect SIGNAL process scoring and Observatory rollups. The current witness is therefore draft evidence only and keeps `scoreChangeAllowed` as `false`.

## Validation

```sh
pnpm kaleidoscope:signal:check
pnpm kaleidoscope:observatory:check
pnpm kaleidoscope:operate:check
```
