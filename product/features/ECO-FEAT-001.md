---
id: ECO-FEAT-001
title: Fleet GitBook documentation home
status: current
date: 2026-07-05
owner: ecosystem-os
productGoalsRef: machine/spec/product-goals.json
features: [ECO-FEAT-001]
---

# PRD — Fleet GitBook documentation home

> Registry-authoritative PRD provisioned by agile-os fleet rollout. Spec ref: `docs/gitbook/ecosystem/README.md`

## Vision

Fleet GitBook documentation home is a shipped capability in ecosystem-os traced to the machine feature registry.

## Mission

Deliver and maintain Fleet GitBook documentation home with machine-witnessed acceptance and audit evidence.

## Product goals

| Goal | Metric | Target | Evidence |
| ---- | ------ | ------ | -------- |
| G1 | Ship witness | pass | `audit/evidence/docs-tree-latest.json` |

## Target customers

| Segment | ICP | Buyer | Job to be done |
| ------- | --- | ----- | -------------- |
| Fleet operators | ecosystem-os owners | Product lead | Ship with traceable evidence |

## Competition

| Alternative | Weakness | Our differentiation |
| ----------- | -------- | ------------------- |
| Ad-hoc docs | No registry trace | Registry + machine record chain |

## Value proposition

**For** ecosystem-os operators **who** need Fleet GitBook documentation home, **our product** delivers the capability **that** runs with witnesses. **Unlike** untraced backlog items, **we** link PRD → registry → machine record.

## GTM

| Motion | Tier | Channel | Proof required |
| ------ | ---- | ------- | -------------- |
| Internal fleet | GR-T2-partial | Owner repo CI | `operations:check` |

## Features

1. ECO-FEAT-001 — Fleet GitBook documentation home

## Success metrics

- Primary: registry + PRD + machine record alignment
- Secondary: audit witness current
- Guardrails: no ship claim without run-path evidence

## Non-goals

- Cross-repo implementation from agile-os hub session

## Milestones

| Milestone | Shippable outcome | PRD status |
| --------- | ----------------- | ---------- |
| M1 | Fleet GitBook documentation home shipped | current |
