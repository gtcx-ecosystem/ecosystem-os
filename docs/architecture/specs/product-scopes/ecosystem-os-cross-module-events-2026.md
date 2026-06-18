---
title: 'Ecosystem OS — cross-module events 2026'
status: current
date: 2026-06-18
owner: ecosystem-os
document_type: protocol
tier: critical
tags: [events, choreography, operating-loop, bridge]
review_cycle: monthly
canonical: true
---

# Ecosystem OS — cross-module events

Typed events across the operating loop. Emitted to Ledger; consumed by Graph and Bridge.

## Event catalog

| Event ID | Producer | Consumers | Witness contract |
| -------- | -------- | ----------- | ---------------- |
| `eco.strategy.bet.registered` | Venture | Agile, Agency, Bridge | `pm/backlog/venture-backlog.json` row |
| `eco.campaign.pack.sealed` | Agency | Bridge, Canon | `audit/evidence/agency-check-latest.json` |
| `eco.sprint.story.done` | Agile | Assurance, Bridge | `pm/backlog.json` auditNotes |
| `eco.audit.pillar.published` | Assurance | Agency, Venture, Surface | `audit/evidence/five-pillar-latest.json` |
| `eco.agent.work.selected` | Bridge | Agile, Fabric | `bridge-os/pm/ci/sprint-authority-check-latest.json` |
| `eco.deploy.gate.passed` | Fabric | Assurance, markets-os | owner-repo deploy witnesses |
| `eco.doctrine.amended` | Ethos | Venture, Assurance | `docs/foundation/constitution.md` |
| `eco.portfolio.narrative.updated` | Venture | Agency | `docs/gitbook/business/portfolio/product-portfolio.md` |
| `eco.fleet.handoff.opened` | Bridge | owner repos | XR tickets in bridge coordination |
| `eco.publish.surface.promoted` | Canon | Agency, Surface | canon-os promotion witnesses |

## Authority

Protocol 24 cross-repo handoffs · Protocol 28 class on each emission path.
