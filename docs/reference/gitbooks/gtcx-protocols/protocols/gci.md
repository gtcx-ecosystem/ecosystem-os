---
title: 'GCI — Global Compliance Index'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
protocol_spec_version: '3.2.0'
tags: ['protocol', 'gitbook']
review_cycle: 'on-release'
---

# GCI — Global Compliance Index

**Role:** Weighted compliance score (0–100) across environmental, social, governance, legal, operational, and financial domains — calibrated per **Country Support Package**.

**SPEC version:** `3.2.0` · **Package:** `@gtcx/protocol-gci`

## Capabilities

| Capability | Detail |
| ---------- | ------ |
| Scoring | Domain weights from CSP `gci-weights.yaml` |
| Tiers | Bronze → platinum; blocked below threshold |
| JSON-LD export | DFI due-diligence reports (server/SDK helpers) |
| Regulatory overlays | EU CRMA, Battery Reg, CBAM predicates where configured |

## SDK quick reference

```typescript
const score = await client.gci.getScore('did:gtcx:tp_producer_001');
const page = await client.gci.getHistory('did:gtcx:tp_producer_001', { limit: 10 });
```

GCI is included in `assembleLotProof` summaries.

## Canonical specification

[protocols/gci/SPEC.md](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/v0.4.4/protocols/gci/SPEC.md)

## Related

- [TradePass](tradepass.md)
- [Verify a lot](../verify-a-lot.md)
