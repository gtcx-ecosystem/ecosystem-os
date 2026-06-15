---
title: 'Getting Started'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['onboarding', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# Getting started

> **Audience:** Integrators connecting to GTCX Cloud or a sovereign-hosted API — not monorepo contributors.
>
> **Time:** ~30 minutes to first `assembleLotProof`.
>
> **Version:** Documentation and examples target release **v0.4.4** — see [Compatibility matrix](release/compatibility-matrix.md).

## What you will do

1. Install the SDK
2. Connect to **testnet** (or your Welcome Pack URL)
3. Resolve and verify a TradePass credential
4. Assemble a **VerifiedLotProof** for a lot

## Prerequisites

| Requirement | Notes |
| ----------- | ----- |
| Node.js 22+ or Python 3.11+ | TypeScript examples below |
| API key | From your GTCX Cloud / Sovereign Welcome Pack |
| Tenant header | `X-GTCX-Tenant-Id` must match key scope (ISO 3166-1 alpha-2, e.g. `<iso>`) |

## Step 1 — Install

```bash
pnpm add @gtcx/sdk@^0.4.0
# or
npm install @gtcx/sdk@^0.4.0
```

```bash
pip install gtcx-sdk
```

See [TypeScript SDK](sdk/typescript.md) and [Python SDK](sdk/python.md) for package details.

## Step 2 — Create a client

```typescript
import { GTCXClient } from '@gtcx/sdk';

const client = GTCXClient.fromNetwork('testnet', {
  apiKey: process.env.GTCX_API_KEY,
});
```

Presets: `testnet`, `ghana`, `mainnet`. For Cloud/Sovereign dedicated hosts, use explicit config from your Welcome Pack:

```typescript
const client = new GTCXClient({
  apiUrl: process.env.GTCX_API_URL!,
  networkId: process.env.GTCX_NETWORK_ID!,
  chainId: process.env.GTCX_CHAIN_ID!,
  apiKey: process.env.GTCX_API_KEY,
});
```

## Step 3 — Verify a credential

```typescript
const did = 'did:gtcx:tp_producer_001';
const credential = await client.tradepass.resolve(did);

if (!credential) {
  throw new Error(`No credential for ${did}`);
}

const result = await client.tradepass.verify(credential);

if (!result.valid) {
  throw new Error(`Verification failed: ${result.reason ?? 'unknown'}`);
}
```

**Authority DIDs** (`did:gtcx:auth:<iso>:<slug>`) ship as JSON-LD in [Country Support Packages](https://github.com/gtcx-ecosystem/gtcx-protocols/tree/main/country-support-packages). Inspect `gtcx.key_status` (`dev` | `production`) before trusting signatures in production.

## Step 4 — Assemble VerifiedLotProof

```typescript
const proof = await client.assembleLotProof(
  'lot:xx-gld-20260120-001',
  'did:gtcx:tp_producer_001'
);

console.log(proof.summary.allValid);
console.log(proof.summary.compliance?.score);
console.log(proof.summary.confidence);
```

This bundles TradePass, GeoTag, VaultMark, and GCI checks into one DFI-ready artifact. Full UAT steps: [Verify a lot](verify-a-lot.md).

## Step 5 — Handle errors

All failures use `GTCXError` with a canonical code. See [Error codes](api/error-codes.md).

```typescript
import { GTCXError } from '@gtcx/sdk';

try {
  await client.assembleLotProof(lotId, operatorDid);
} catch (e) {
  if (e instanceof GTCXError) {
    console.error(e.code, e.status, e.message);
  }
  throw e;
}
```

## Local server (optional)

Contributors can run the reference server locally:

```bash
docker compose -f docker-compose.dev.yml up -d
pnpm --filter @gtcx/protocol-server dev
npx tsx 03-platform/examples/00-quickstart.ts
```

Integrators should use **hosted** testnet or Cloud URLs — not clone the monorepo.

## Deployment model

| If you are… | Read |
| ----------- | ---- |
| Platform / mobile / nyota engineer | [GTCX Cloud vs Sovereign](deployment/cloud-vs-sovereign.md) |
| DFI or auditor | [Verify a lot](verify-a-lot.md) |
| Security reviewer | [Trust center](trust/trust-center.md) |

## Next

- [Integration guide](integration-guide.md) — read/write/settlement patterns
- [API overview](api/overview.md) — REST + MCP
- [Compatibility matrix](release/compatibility-matrix.md) — version pins
