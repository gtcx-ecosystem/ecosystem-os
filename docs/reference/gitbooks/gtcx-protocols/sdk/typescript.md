---
title: 'TypeScript SDK — @gtcx/sdk'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['sdk', 'typescript', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# TypeScript SDK (`@gtcx/sdk`)

Official TypeScript/JavaScript client for all six GTCX protocols.

## Install

```bash
pnpm add @gtcx/sdk@^0.4.0
npm install @gtcx/sdk@^0.4.0
```

Align with server release **v0.4.4** — [compatibility matrix](../release/compatibility-matrix.md).

## Client setup

```typescript
import { GTCXClient, GTCXError, NETWORKS } from '@gtcx/sdk';

// Preset network
const client = GTCXClient.fromNetwork('testnet', {
  apiKey: process.env.GTCX_API_KEY,
});

// Or explicit (Cloud / Sovereign Welcome Pack)
const dedicated = new GTCXClient({
  apiUrl: process.env.GTCX_API_URL!,
  networkId: process.env.GTCX_NETWORK_ID!,
  chainId: process.env.GTCX_CHAIN_ID!,
  apiKey: process.env.GTCX_API_KEY,
  timeout: 30_000,
  retries: 2,
});
```

## Sub-clients

| Property | Protocol |
| -------- | -------- |
| `client.tradepass` | Identity and credentials |
| `client.gci` | Compliance scoring |
| `client.geotag` | Location claims |
| `client.vaultmark` | Custody |
| `client.settlement` | PvP settlement |
| `client.audit` | Audit stream (SSE) |

## Core flows

```typescript
// Resolve + verify
const cred = await client.tradepass.resolve('did:gtcx:tp_producer_001');
if (cred) {
  const v = await client.tradepass.verify(cred);
  console.log(v.valid);
}

// Verified lot proof (DFI bundle)
const proof = await client.assembleLotProof(
  'lot:xx-gld-20260120-001',
  'did:gtcx:tp_producer_001'
);

// GCI score
const score = await client.gci.getScore('did:gtcx:tp_producer_001');
```

## Types and validation

Import Zod-backed schemas at boundaries:

```typescript
import { AuthorityDidSchema, SubjectDidSchema, classifyGtcxDid } from '@gtcx/sdk';

AuthorityDidSchema.parse('did:gtcx:auth:xx:example-authority');
classifyGtcxDid('did:gtcx:tp_producer_001'); // 'subject'
```

## Errors

```typescript
import { GTCXError, type ErrorCode } from '@gtcx/sdk';
```

See [Error codes](../api/error-codes.md).

## API reference generation

Package maintainers can generate TypeDoc locally:

```bash
pnpm --filter @gtcx/sdk docs
## output: 03-platform/packages/sdk-typescript/api-docs/
```

Hosted reference: published to docs.gtcx.trade on each release (target).

## Related

- [Getting started](../getting-started.md)
- [Python SDK](python.md)
- [API overview](../api/overview.md)
