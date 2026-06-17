---
title: 'ecosystem-os — repo layout (P35 v5)'
status: current
date: 2026-06-17
owner: ecosystem-os
document_type: runbook
tier: standard
tags: [['p35', 'layout', 'operations']]
review_cycle: on-change
---

# ecosystem-os repo layout (P35 v5)

This repo is a P35 v5 hub with a closed-world root allowlist:

- Root allowlist: `docs/operations/repo/root-allowlist.json`
- Layout enforcement: `pnpm layout:check`

## Root hubs (required)

- `archive/`
- `audit/`
- `config/`
- `deploy/`
- `docs/`
- `ops/`
- `platform/`
- `pm/`
- `workstream/`
- `agentic/`
- `fundraising/`
- `venture-os/` (stub pointer; standalone repo lives at `gtcx-ecosystem/venture-os`)

