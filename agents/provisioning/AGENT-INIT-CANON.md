---
title: 'Agent initialization canon'
status: current
date: 2026-06-12
owner: canon-os
tier: critical
tags: ['onboarding', 'documentation']
review_cycle: on-change
document_type: onboarding
document_id: AGENT-INIT-001
---

# Agent initialization canon

> **Mandatory fleet read** — emitted in every `baseline start` / `pnpm agent:start` via `canonProvisioning` payload.

## Layer stack

| Layer | Artifact | Owner |
| ----- | -------- | ----- |
| **0** | [GTCX Constitution](../../governance/constitution/GTCX-CONSTITUTION.md) Articles **I, III, V** | canon-os |
| **0b** | [AI Acceptable Use Charter](../../governance/ai-acceptable-use-charter.md) | canon-os |
| **1** | [AI Intelligence Charter](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/reference/intelligence/GTCX-AI-INTELLIGENCE-CHARTER.md) | baseline-os |
| **2** | Domain skills (`baseline-os/docs/reference/skills/`) | baseline-os |
| **3** | Workflow skills (`bridge-os/docs/reference/skills/`) | bridge-os |

## Session sequence (normative)

1. **Constitution** — purpose, responsible execution (REP/ESL), multi-pillar evaluation (F-PiLLAR + T-PiLLAR).
2. **Acceptable use** — boundaries for agent behavior.
3. **This document** — init canon + GitBook ecosystem entry.
4. **Repo ops reads** — `docs/operations/agent-universal-instructions.md`, human-gate-navigation (owner repo).
5. **`pnpm agent:next-work`** — Protocol 22; never menu-pick stories.
6. **Proceed Brief** — persona + frame + authority class (P26).
7. **Execute** — run commands in-session (P27).

## GitBook ecosystem canon

External narrative publishes from [docs/gitbook/ecosystem/](../../gitbook/ecosystem/README.md). Product repos keep local `docs/gitbook/`; canon-os runs PublishaaS.

## Witness

```bash
pnpm agent:provisioning:check
pnpm agent:provisioning:check --write
```

Bundle spec: `pm/agent-provisioning-bundle.json`
