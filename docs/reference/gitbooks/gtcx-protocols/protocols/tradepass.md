---
title: TradePass
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

# TradePass — identity and credentials

**Role:** W3C DID + Verifiable Credentials for every participant in the commodity chain — producers, custodians, refiners, regulators, and platforms.

**SPEC version:** `3.2.0` · **Package:** `@gtcx/protocol-tradepass`

## Capabilities

| Capability | Detail |
| ---------- | ------ |
| Subject identity | `did:gtcx:tp_*` operator credentials |
| Authority identity | `did:gtcx:auth:<iso>:<slug>` sovereign/regulator DIDs in CSP bundles |
| Verification | Signature, revocation, predicate claims |
| Offline | Cached credentials for field use (mobile) |

## SDK quick reference

```typescript
const cred = await client.tradepass.resolve('did:gtcx:tp_producer_001');
const result = await client.tradepass.verify(cred!);
await client.tradepass.issue({ did, name, role, entityId, jurisdiction });
```

## REST

| Method | Path |
| ------ | ---- |
| `GET` | `/v1/tradepass/:did` |
| `POST` | `/v1/tradepass/verify` |
| `POST` | `/v1/tradepass/issue` |

## Canonical specification

Full normative spec (GitHub, tag `v0.4.4`):

[protocols/tradepass/SPEC.md](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/v0.4.4/protocols/tradepass/SPEC.md)

## Related

- [Getting started](../getting-started.md)
- [Verify a lot](../verify-a-lot.md)
- [GCI](gci.md) — compliance scoring for subjects
