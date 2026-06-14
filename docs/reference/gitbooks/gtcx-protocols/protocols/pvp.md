---
title: 'PvP — Payment versus Physical'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
protocol_spec_version: '3.2.0'
tags: ['protocol', 'gitbook']
review_cycle: 'on-release'
---

# PvP — payment versus physical settlement

**Role:** Atomic settlement between payment and commodity delivery — escrow, confirm, dispute, with GCI gates and PANX price consensus where configured.

**SPEC version:** `3.2.0` · **Package:** `@gtcx/protocol-pvp`

## Capabilities

| Capability | Detail |
| ---------- | ------ |
| Escrow | Buyer/seller legs with configurable `minGciScore` |
| Lifecycle | Typed settlement transitions in SDK |
| Disputes | Mediation timers per spec |
| PANX link | Oracle quorum before release |

## SDK quick reference

```typescript
import { isValidSettlementTransition } from '@gtcx/sdk';
// Use client.settlement.* for create, confirm, dispute
```

## Canonical specification

[protocols/pvp/SPEC.md](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/v0.4.4/protocols/pvp/SPEC.md)

## Related

- [PANX](panx.md)
- [GCI](gci.md)
