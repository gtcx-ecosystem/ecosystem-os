---
title: 'GeoTag'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
protocol_spec_version: '3.2.0'
tags: ['protocol', 'gitbook']
review_cycle: 'on-release'
---

# GeoTag — location verification

**Role:** Cryptographic location claims for mines, warehouses, corridors, and ports — anchor for origin in custody and lot proofs.

**SPEC version:** `3.2.0` · **Package:** `@gtcx/protocol-geotag`

## Capabilities

| Capability | Detail |
| ---------- | ------ |
| Capture | GPS / assisted coordinates with accuracy metadata |
| Verification | Bounding boxes, jurisdiction checks vs CSP |
| Field offline | Queued captures on mobile (see mobile release notes) |

## SDK quick reference

```typescript
const claims = await client.geotag.listClaims({ limit: 20 });
// GeoTag leg included in assembleLotProof when linked to lot
```

## Canonical specification

[protocols/geotag/SPEC.md](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/v0.4.4/protocols/geotag/SPEC.md)

## Related

- [VaultMark](vaultmark.md) — custody chain
- [Integration guide](../integration-guide.md)
