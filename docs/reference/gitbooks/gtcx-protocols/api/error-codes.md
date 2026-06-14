---
title: 'Error Codes'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
tags: ['api', 'gitbook']
review_cycle: 'on-release'
---

# Error codes

Every error from GTCX APIs uses one of **12 canonical** `GTCXError` codes (TypeScript and Python SDKs).

## The canonical 12

| Code | HTTP | Means | What you do |
| ---- | ---- | ----- | ----------- |
| `INVALID_ARGUMENT` | 400 | Semantically invalid input (DID format, enum, timestamp) | Fix request data |
| `SCHEMA_VALIDATION_FAILED` | 422 | Body failed JSON/schema validation | Validate with SDK Zod schemas first |
| `UNAUTHORIZED` | 401 | Missing/invalid auth | Refresh credentials |
| `UNAUTHORIZED` | 403 | Valid auth, insufficient permission | Request elevated scope |
| `NOT_FOUND` | 404 | Resource missing (or wrong tenant RLS) | Verify ID and tenant |
| `EXPIRED` | 410 | Credential or claim TTL exceeded | Re-issue; do not reuse ID |
| `STATE_TRANSITION_INVALID` | 409 | Invalid lifecycle transition | Read current state |
| `VERSION_CONFLICT` | 409 | Optimistic concurrency conflict | Re-read and retry |
| `REPLAY_DETECTED` | 409 | Duplicate `X-GTCX-Request-Id` | New UUID per attempt |
| `SIGNATURE_INVALID` | 401 | Signature verification failed | Check keys and `key_status` |
| `RATE_LIMITED` | 429 | Tenant rate limit | Honor `Retry-After` |
| `NOT_IMPLEMENTED` | 501 | Route not wired yet | Contact support for ETA |
| `INTERNAL` | 500 | Server error | Report with `requestId` |

## Error envelope

```json
{
  "code": "INVALID_ARGUMENT",
  "message": "Human-readable message",
  "details": { "field": "subject", "expected": "did:gtcx:…" },
  "requestId": "uuid-from-X-GTCX-Request-Id"
}
```

Always include **`requestId`** in support and security reports.

## Common fixes

### `INVALID_ARGUMENT`

Use SDK DID parsers at the boundary:

```typescript
import { SubjectDidSchema, AuthorityDidSchema } from '@gtcx/sdk';

SubjectDidSchema.parse('did:gtcx:tp_producer_001');
AuthorityDidSchema.parse('did:gtcx:auth:xx:example-authority');
```

### `SIGNATURE_INVALID`

Authority documents in Country Support Packages expose `gtcx.key_status`. Values other than `production` mean the deployment is not yet on sovereign HSM keys:

```typescript
// Load authority JSON-LD from CSP bundle for your jurisdiction
// If gtcx.key_status !== 'production', expect verification failures in prod UAT
```

### `REPLAY_DETECTED`

```typescript
headers: { 'X-GTCX-Request-Id': crypto.randomUUID() }
```

### `RATE_LIMITED`

Read `Retry-After` (seconds), back off, and avoid tight retry loops.

## Pre-flight validation

```typescript
import { SubjectDidSchema } from '@gtcx/sdk';

const did = SubjectDidSchema.parse(inputDid);
const credential = await client.tradepass.issue({
  did,
  name: 'Example Producer',
  role: 'producer',
  entityId: 'entity_001',
  jurisdiction: 'XX',
});
```

## Security reports

See [Vulnerability disclosure](../trust/vulnerability-disclosure.md) for `INTERNAL` and cryptographic issues.
