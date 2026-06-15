---
title: 'Repo hygiene protocol — ecosystem-os'
status: current
date: 2026-06-14
owner: ecosystem-os
tier: standard
tags: [['operations', 'repo-hygiene']]
review_cycle: on-change
document_type: runbook
role: protocol-architect
---

# Repo hygiene protocol — ecosystem-os

> **Machine allowlist:** [`root-allowlist.json`](./root-allowlist.json)  
> **Normative:** [Protocol 31](https://github.com/gtcx-ecosystem/canon-os/blob/main/docs/governance/protocols/31-ecosystem-root-allowlist/protocol.md) · [Protocol 32](https://github.com/gtcx-ecosystem/canon-os/blob/main/docs/governance/protocols/32-ecosystem-repo-document-standard/protocol.md) · [Protocol 33](https://github.com/gtcx-ecosystem/canon-os/blob/main/docs/governance/protocols/33-ecosystem-repo-governance-spine/protocol.md)

## Purpose

Keep repo root a **closed world** — only allowlisted bootstrap files. All governance docs live under `docs/operations/repo/`.

## Enforcement

```bash
pnpm check:workspace-root-cleanliness:strict
pnpm check:repo-document-manifest:strict
pnpm ops:check
pnpm validate
```

## Human-owned paths

Paths listed in `root-allowlist.json` → `human_owned_paths` are excluded from automated relocation. Agents must not delete them.
