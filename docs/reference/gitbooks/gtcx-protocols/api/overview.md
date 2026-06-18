---
title: 'API Overview'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['api', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# API overview

GTCX exposes **REST `/v1`**, **MCP** (agents), and **SDKs** over the same protocol logic.

## Choose your surface

| Surface | When to use |
| ------- | ----------- |
| [`@gtcx/sdk`](../sdk/typescript.md) | Application integration (recommended) |
| [REST](rest.md) | Language-agnostic, gateway proxies, curl UAT |
| [MCP](mcp.md) | AI agents, compliance automation, tool discovery |

## Authentication

```http
Authorization: Bearer gtcx_api_<key>
X-GTCX-Tenant-Id: <iso-lower>
X-GTCX-Request-Id: <uuid>
```

Sovereign-grade deployments may require **mTLS + JWT** in addition — details in your Welcome Pack.

## High-value operations

| Operation | Method | Path |
| --------- | ------ | ---- |
| Verify credential | `POST` | `/v1/tradepass/verify` |
| Resolve credential | `GET` | `/v1/tradepass/:did` |
| GCI score | `POST` | `/v1/gci/score` (via dispatcher) |
| Verified lot proof | `POST` | `/v1/proof/lot` |
| Audit stream | `GET` | `/v1/audit/stream` (SSE) |
| Protocol dispatch | `POST` | `/v1/{protocol}/{operation}` |

SDK equivalent for lot proof:

```typescript
await client.assembleLotProof(lotId, operatorDid);
```

## OpenAPI

- **Spec file:** `server/openapi.yaml` in the repository at tag `v0.4.4`
- **CI artifact:** generated on every push to `main` (`openapi-publish` workflow)
- **Release attachment:** download from [GitHub Releases](https://github.com/gtcx-ecosystem/gtcx-protocols/releases)

Hosted mirror target: `https://docs.gtcx.trade/api/openapi.yaml`

## Pagination

List endpoints (`gci.getHistory`, `geotag.listClaims`, `vaultmark.getHistory`) use **cursor** pagination:

```typescript
let cursor: string | undefined;
do {
  const page = await client.gci.getHistory(entityId, { limit: 50, cursor });
  // process page.items
  cursor = page.nextCursor;
} while (cursor);
```

## Rate limits

| Tier | Requests/min | Burst |
| ---- | ------------ | ----- |
| Staging / dev | 100 | 200 |
| Production default | 1,000 | 2,000 |
| Sovereign (contract) | Per engagement | — |

## Errors

All surfaces return the same [12 error codes](error-codes.md).

## Versioning

| Layer | Policy |
| ----- | ------ |
| REST path | `/v1/` — breaking changes → `/v2/` |
| SDK npm | Semver — `0.4.x` matches server `v0.4.4` |
| Protocol SPEC | `3.2.0` at `v0.4.4` tag |
| CSP | Per country `v1.0.0` + ratification semver |

## Related

- [REST reference](rest.md)
- [MCP guide](mcp.md)
- [Compatibility matrix](../release/compatibility-matrix.md)
