---
title: 'Agent Work Selection Manifest'
status: pointer
date: 2026-06-28
owner: ecosystem-os
tier: standard
tags: [[protocol-22, protocol-24, protocol-26, protocol-27, protocol-28, agents]]
review_cycle: on-change
document_type: runbook
role: protocol-engineer
document_id: OPS-AWS-001
protocol: canon-os/docs/governance/protocols/22-agent-work-selection/protocol.md
---

# Agent Work Selection — ecosystem-os

Canonical manifest: [`coordination/agent-work-selection.md`](coordination/agent-work-selection.md)

This compatibility pointer is retained because the fleet protocol gate resolves `docs/operations/agent-work-selection.md` directly.

Protocol 22, Protocol 24, Protocol 26, Protocol 27, and Protocol 28 are active. Agents must run `pnpm agent:next-work` and must **Never ask the operator to choose** between backlog items when the computed next work unit is available.

