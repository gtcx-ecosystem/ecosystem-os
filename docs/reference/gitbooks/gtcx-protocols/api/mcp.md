---
title: 'MCP Integration'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['api', 'mcp', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# MCP integration

The **Model Context Protocol (MCP)** exposes GTCX verification operations to AI agents without hand-written REST orchestration.

**Catalog version:** `v0.1.0` — **9 tools**

## Transports

| Transport | Use case |
| --------- | -------- |
| **stdio** | Local agent subprocess (`npx @gtcx/mcp --stdio`) |
| **streamable-http** | Remote agents with streaming HTTP |

Both share the same tool catalog and RBAC rules as REST.

## Tool catalog

| Tool | Purpose | Permission |
| ---- | ------- | ---------- |
| `verify_credential` | Verify TradePass VC by ID | `protocol:read` |
| `verify_lot` | Build VerifiedLotProof + confidence | `protocol:read` |
| `verify_seal` | VaultMark seal verification | `protocol:read` |
| `get_gci_score` | Compliance score lookup | `protocol:read` |
| `discover_jurisdictions` | List loaded CSPs + status | `protocol:read` |
| `predicate.resolve` | Resolve predicate URI | `protocol:read` |
| `catalog.list_commodities` | T0–T3 commodity coverage | `protocol:read` |
| `catalog.coverage_status` | Tier + ratification per commodity/jurisdiction | `protocol:read` |
| `audit_query` | Scoped audit chain read | `admin:audit` |

## Authentication

| Transport | Auth |
| --------- | ---- |
| stdio | Permissions injected at process spawn |
| streamable-http | Same as REST — `Authorization` + `X-GTCX-Tenant-Id` |

Unauthorized tool calls return JSON-RPC errors mapped to HTTP 403 on HTTP transport.

## Discovery

Well-known advertisement (when enabled on deployment):

```bash
curl -sS "${GTCX_API_URL}/.well-known/mcp.json" | jq .
```

## Example: verify lot

Agent invokes `verify_lot` with:

```json
{
  "lotId": "lot:xx-gld-20260120-001",
  "operatorDid": "did:gtcx:tp_producer_001"
}
```

Response mirrors REST `/v1/proof/lot` and SDK `assembleLotProof`.

## Run locally (development)

```bash
pnpm --filter @gtcx/mcp build
npx @gtcx/mcp --stdio
```

Production agents should target the **hosted** MCP endpoint from your Welcome Pack.

## Related

- [API overview](overview.md)
- [Getting started](../getting-started.md)
- [Ecosystem integrations](../deployment/ecosystem-integrations.md) — `gtcx-intelligence` Wire #2
