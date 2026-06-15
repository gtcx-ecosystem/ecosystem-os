---
title: 'PANX — Oracle Consensus'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['protocol', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
protocol_spec_version: 3.2.0
---

# PANX — oracle consensus

**Role:** Decentralized price and attestation consensus — quorum of oracle submissions with Ed25519 verification (real signatures required in tests and production paths).

**SPEC version:** `3.2.0` · **Package:** `@gtcx/protocol-panx`

## Capabilities

| Capability | Detail |
| ---------- | ------ |
| Consensus | `buildConsensus`, quorum checks, attestations |
| Oracles | Reputation, stake, feed registration |
| Settlement tie-in | PvP release gated on consensus where configured |

## SDK / REST

Invoked via protocol dispatch `POST /v1/panx/buildConsensus` or platform wrappers.

## Canonical specification

[protocols/panx/SPEC.md](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/v0.4.4/protocols/panx/SPEC.md)

## Related

- [PvP](pvp.md)
- [Integration guide](../integration-guide.md)
