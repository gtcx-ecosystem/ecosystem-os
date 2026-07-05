---
id: ECO-FEAT-002
title: Operator onboarding documentation
status: current
date: 2026-07-05
owner: ecosystem-os
productGoalsRef: machine/spec/product-goals.json
features: [ECO-FEAT-002]
---

# PRD — Operator onboarding documentation

> Registry-authoritative PRD provisioned by agile-os fleet rollout. Spec ref: `docs/onboarding/README.md`

## Vision

Operator onboarding documentation is a shipped capability in ecosystem-os traced to the machine feature registry.

## Mission

Deliver and maintain Operator onboarding documentation with machine-witnessed acceptance and audit evidence.

## Product goals

| Goal | Metric | Target | Evidence |
| ---- | ------ | ------ | -------- |
| G1 | Ship witness | pass | `audit/evidence/docs-foundation-latest.json` |

## Target customers

| Segment | ICP | Buyer | Job to be done |
| ------- | --- | ----- | -------------- |
| Fleet operators | ecosystem-os owners | Product lead | Ship with traceable evidence |

## Competition

| Alternative | Weakness | Our differentiation |
| ----------- | -------- | ------------------- |
| Ad-hoc docs | No registry trace | Registry + machine record chain |

## Value proposition

**For** ecosystem-os operators **who** need Operator onboarding documentation, **our product** delivers the capability **that** runs with witnesses. **Unlike** untraced backlog items, **we** link PRD → registry → machine record.

## GTM

| Motion | Tier | Channel | Proof required |
| ------ | ---- | ------- | -------------- |
| Internal fleet | GR-T2-partial | Owner repo CI | `operations:check` |

## Features

1. ECO-FEAT-002 — Operator onboarding documentation

## Success metrics

- Primary: registry + PRD + machine record alignment
- Secondary: audit witness current
- Guardrails: no ship claim without run-path evidence

## Non-goals

- Cross-repo implementation from agile-os hub session

## Milestones

| Milestone | Shippable outcome | PRD status |
| --------- | ----------------- | ---------- |
| M1 | Operator onboarding documentation shipped | current |
