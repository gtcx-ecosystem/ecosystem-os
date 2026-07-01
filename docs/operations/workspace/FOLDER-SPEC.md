---
title: 'operations/workspace - folder provisioning'
status: current
date: 2026-07-01
owner: ecosystem-os
document_type: folder-spec
tier: operating
tags: ['operations', 'documentation-hygiene', 'qasc']
review_cycle: on-change
---

# operations/workspace - provisioning

## Purpose

Defines the active operations documentation surface for ecosystem-os. Operational functions are routed through fabric-os and bridge-os contracts; this folder preserves repo-local consumption, runbook, coordination, and template references.

## Agent rules

1. Keep operational policy links as references to owner repos when fabric-os or bridge-os owns execution.
2. Do not place product release blockers here for security, compliance, GTM, or pen-test work; route those through operational roadmaps.
3. Keep README.md and FOLDER-SPEC.md present so documentation hygiene gates can replay deterministically.
