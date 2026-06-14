---
title: 'VaultMark'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
protocol_spec_version: '3.2.0'
tags: ['protocol', 'gitbook']
review_cycle: 'on-release'
---

# VaultMark — custody chain

**Role:** Continuous custody record for lots — create, transfer, split, merge, seal verification (including hardware/NFC integrations).

**SPEC version:** `3.2.0` · **Package:** `@gtcx/protocol-vaultmark`

## Capabilities

| Capability | Detail |
| ---------- | ------ |
| Custody graph | Hash-linked events per `lotId` |
| Transfers | Dual-party acceptance where required |
| Seals | TapKit / VaultKit attestation paths |
| State machine | Typed transitions (`isValidCustodyTransition` in SDK) |

## SDK quick reference

```typescript
const custody = await client.vaultmark.getCustody('lot:xx-gld-20260120-001');
const history = await client.vaultmark.getHistory('lot:xx-gld-20260120-001');
```

VaultMark leg is part of `assembleLotProof`.

## Canonical specification

[protocols/vaultmark/SPEC.md](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/v0.4.4/protocols/vaultmark/SPEC.md)

## Related

- [GeoTag](geotag.md)
- [PvP](pvp.md)
