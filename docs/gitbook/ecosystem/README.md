---
title: GTCX Ecosystem — GitBook canon
status: current
date: 2026-06-14
owner: ecosystem-os
gitbook_space: gtcx-ecosystem
review_cycle: monthly
---

# GTCX Ecosystem — operator canon

Fleet GitBook entry every agent loads at session start. Source lives in **ecosystem-os** (`docs/gitbook/ecosystem/`).

## What belongs here

| Section | Audience | SoR |
| ------- | -------- | --- |
| Vision & mission | All stakeholders | `docs/overview/` |
| Constitution & governance (links) | All agents | `canon-os/docs/governance/` |
| Onboarding | Contributors | `docs/onboarding/` |
| Architecture | Engineering | `docs/architecture/` |
| Developer documentation | Engineers | `developer-docs.md` + fleet matrix |
| GTM | Operators | `ops/gtm/` |

## What does **not** belong here

- Normative protocols → **canon-os** (link only)
- Product PRDs → owner repo `docs/`
- Implementation code → owner repo `platform/`

## Agent init

Read order: [canon-os AGENT-INIT-CANON](../../../canon-os/docs/agents/provisioning/AGENT-INIT-CANON.md) → Constitution Articles I, III, V → P22 `agent:next-work`.

## Publish

Register: `pm/publish-register.json` · GitBook space: `gtcx-ecosystem`
