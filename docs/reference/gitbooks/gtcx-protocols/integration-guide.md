---
title: 'Integration Guide'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
tags: ['integration', 'gitbook']
review_cycle: 'on-release'
---

# Integration guide

Patterns for **platform builders**, **mobile field apps**, and **settlement operators** connecting to GTCX Cloud or Sovereign APIs.

**Version:** [v0.4.4 compatibility matrix](release/compatibility-matrix.md)

## Integration patterns

| Pattern | Typical consumer | Operations |
| ------- | ---------------- | ---------- |
| **Read** | DFIs, auditors, buyers | Verify credentials, scores, custody, lot proofs |
| **Write** | Producers, custodians | Issue credentials, capture GeoTag, custody transfers |
| **Settlement** | Exchanges, trading desks | PvP escrow, PANX price consensus |
| **Agent** | Compliance automation | MCP tools (`verify_lot`, `get_gci_score`, …) |

## Authentication

```typescript
import { GTCXClient } from '@gtcx/sdk';

const client = GTCXClient.fromNetwork('testnet', {
  apiKey: process.env.GTCX_API_KEY,
});
```

Every request needs:

- `Authorization: Bearer gtcx_api_…`
- `X-GTCX-Tenant-Id` matching key scope
- Unique `X-GTCX-Request-Id` per attempt

Role-gated routes return `UNAUTHORIZED` (403) when the key lacks permission — see [Error codes](api/error-codes.md).

## Read integration

### Verify a credential

```typescript
const credential = await client.tradepass.resolve('did:gtcx:tp_producer_001');
if (!credential) throw new Error('not found');

const result = await client.tradepass.verify(credential);
if (!result.valid) throw new Error(result.reason ?? 'invalid');
```

### GCI score

```typescript
const score = await client.gci.getScore('did:gtcx:tp_producer_001');
console.log(score.tier, score.score);
```

### Custody history

```typescript
const history = await client.vaultmark.getHistory('lot:xx-gld-20260120-001', {
  limit: 20,
});
```

### DFI bundle

```typescript
const proof = await client.assembleLotProof(
  'lot:xx-gld-20260120-001',
  'did:gtcx:tp_producer_001'
);
```

Full UAT: [Verify a lot](verify-a-lot.md).

## Write integration (sketch)

Issuance and custody writes require elevated permissions (`credential:issue`, custody roles). Exact payloads match OpenAPI schemas at tag `v0.4.4`.

Typical producer flow:

1. GeoTag capture at origin
2. TradePass credential for operator
3. VaultMark custody record for lot
4. GCI score update
5. Optional PvP settlement

Runnable local demo (contributors): `npx tsx 03-platform/examples/00-quickstart.ts` against local server.

## Ecosystem channels

| Channel | Repo | Notes |
| ------- | ---- | ----- |
| **GTCX Cloud** | `gtcx-platforms` (AGX, Veritas, …), `gtcx-mobile`, onboarding tools | Multi-tenant; see [ADR-007](https://github.com/gtcx-ecosystem/gtcx-platforms/blob/main/01-docs/architecture/decisions/ADR-007-two-product-consolidation.md) |
| **GTCX Sovereign** | `gtcx-platforms/sovereign`, `gtcx-infrastructure` | Government-operated stack per deal |
| **Intelligence** | `gtcx-intelligence` | Wire #2 evidence into TradePass |

Details: [Cloud vs Sovereign](deployment/cloud-vs-sovereign.md), [Ecosystem integrations](deployment/ecosystem-integrations.md).

## Offline and field

Mobile clients queue operations when connectivity is poor. Respect protocol-specific offline windows documented in your mobile release notes; PvP settlement requires online quorum.

## Errors

| Code | Action |
| ---- | ------ |
| `SIGNATURE_INVALID` | Check authority `key_status` in CSP |
| `REPLAY_DETECTED` | New `X-GTCX-Request-Id` |
| `RATE_LIMITED` | Back off per `Retry-After` |

[Full reference](api/error-codes.md)

## Test environments

| Network | URL |
| ------- | --- |
| Testnet | `https://api.testnet.gtcx.trade` |
| Mainnet | `https://api.gtcx.trade` |

Tenant-specific and Sovereign hosts are in your Welcome Pack — do not assume a regional preset is live without confirmation.

## Related

- [Getting started](getting-started.md)
- [REST API](api/rest.md)
- [MCP](api/mcp.md)
