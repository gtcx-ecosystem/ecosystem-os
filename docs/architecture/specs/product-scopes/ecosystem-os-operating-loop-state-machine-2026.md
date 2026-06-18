---
title: 'Ecosystem OS — operating loop state machine 2026'
status: current
date: 2026-06-18
owner: ecosystem-os
document_type: state-machine
tier: critical
tags: [state-machine, operating-loop]
review_cycle: monthly
canonical: true
---

# Ecosystem OS — operating loop state machine

> Canonical SoR for the company operating loop at ecosystem-os scope. Implementation spans fleet repos; this spec defines states, transitions, and witness contracts.

## States

| State | Module owner | Entry witness |
| ----- | ------------ | ------------- |
| `know` | Graph | Graph query / backlog snapshot |
| `judge` | Ethos | doctrine + authority matrix |
| `invent` | Venture | innovation-register / venture profile |
| `express` | Agency | agency:check + campaign pack |
| `coordinate` | Bridge | agent:next-work selection |
| `ship` | Agile | story done + sprint seal |
| `operate` | Fabric | deploy gate / staging health |
| `verify` | Assurance | multi-pillar / composite audit |
| `publish` | Canon | promotion witness (link) |
| `learn` | Graph + Ledger | audit replay → backlog intake |

## Transitions (happy path)

```text
know → judge → invent → express → coordinate → ship → operate → verify → publish → learn → know
```

## Authority classes

| Transition | Class | Human stop |
| ---------- | ----- | ---------- |
| invent → express (campaign publish) | A | claim→witness map review |
| ship → operate (production deploy) | A/S | deploy approval |
| verify → publish (canon promotion) | S | legal / compliance sign-off |
| All Class R | R | P22 + gates green |

## Cross-module events

See [`ecosystem-os-cross-module-events-2026.md`](./ecosystem-os-cross-module-events-2026.md).
