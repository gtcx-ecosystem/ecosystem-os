---
title: 'REST API'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['api', 'rest', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# REST API

Base path: **`/v1/`** on your deployment URL (testnet, Cloud, or Sovereign host).

## Discovery

```bash
curl -sS "${GTCX_API_URL}/v1" | jq .
curl -sS "${GTCX_API_URL}/health" | jq .
```

## TradePass

| Method | Path | Body | Purpose |
| ------ | ---- | ---- | ------- |
| `GET` | `/v1/tradepass/:did` | — | Resolve credential by DID |
| `POST` | `/v1/tradepass/verify` | `{ "credential": … }` | Verify signature and status |
| `POST` | `/v1/tradepass/issue` | subject payload | Issue (requires `credential:issue`) |
| `POST` | `/v1/tradepass/:did/revoke` | `{ "reason": "…" }` | Revoke |

## Proof assembly

```bash
curl -sS -X POST "${GTCX_API_URL}/v1/proof/lot" \
  -H "Authorization: Bearer ${GTCX_API_KEY}" \
  -H "X-GTCX-Tenant-Id: <iso>" \
  -H "Content-Type: application/json" \
  -H "X-GTCX-Request-Id: $(uuidgen)" \
  -d '{"lotId":"lot:xx-example-20260120-001","operatorDid":"did:gtcx:tp_producer_001"}'
```

Response includes `summary.allValid` and per-protocol legs — same shape as SDK `assembleLotProof`.

## Generic protocol dispatch

```bash
curl -sS -X POST "${GTCX_API_URL}/v1/gci/createGCIScore" \
  -H "Authorization: Bearer ${GTCX_API_KEY}" \
  -H "X-GTCX-Tenant-Id: <iso>" \
  -H "Content-Type: application/json" \
  -d @score-payload.json
```

Supported protocols: `tradepass`, `gci`, `geotag`, `vaultmark`, `pvp`, `panx`.

## Audit stream (SSE)

```bash
curl -N "${GTCX_API_URL}/v1/audit/stream?tenantId=<iso>" \
  -H "Authorization: Bearer ${GTCX_API_KEY}" \
  -H "Accept: text/event-stream"
```

Requires `admin:audit` permission. Events are signed in transit on current server builds.

## Platform compatibility routes

Legacy `gtcx-platforms` URLs are bridged under dedicated compat routes during migration. New integrations should use `/v1/*` only.

## OpenAPI

Full machine-readable contract: download from [Release v0.4.4](https://github.com/gtcx-ecosystem/gtcx-protocols/releases/tag/v0.4.4) or generate:

```bash
pnpm exec tsx 03-platform/scripts/generate-openapi.ts
```

## Related

- [API overview](overview.md)
- [Error codes](error-codes.md)
- [Verify a lot](../verify-a-lot.md)
