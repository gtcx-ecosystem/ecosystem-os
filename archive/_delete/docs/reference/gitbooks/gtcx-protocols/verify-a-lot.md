---
title: 'Verify a Lot — DFI and Auditor UAT'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['uat', 'dfi', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# Verify a lot — DFI and auditor UAT

Acceptance script for **due diligence**: prove that a commodity lot's evidence chain is cryptographically consistent on a **pinned** GTCX deployment.

Works on **GTCX Cloud** (provisional CSP) and **GTCX Sovereign** (ratified CSP). Sovereign countersignature upgrades trust; it is not required to execute this technical UAT on staging.

## Preconditions

| Item | How to confirm |
| ---- | -------------- |
| API access | Valid API key + `X-GTCX-Tenant-Id` for the jurisdiction |
| Server version | Operator confirms image `ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4` (or digest from Welcome Pack) |
| SDK | `@gtcx/sdk@^0.4.0` or `gtcx-sdk` equivalent |
| Sample lot | Operator provides `lotId` + `operatorDid` with known good evidence |

## UAT steps

### 1. Health and discovery

```bash
curl -sS "${GTCX_API_URL}/health" | jq .
curl -sS "${GTCX_API_URL}/v1" | jq '.endpoints | keys'
```

Expect `status` ok and protocol keys including `tradepass`, `gci`, `geotag`, `vaultmark`, `pvp`, `panx`.

### 2. Assemble VerifiedLotProof (SDK)

```typescript
import { GTCXClient, GTCXError } from '@gtcx/sdk';

const client = new GTCXClient({
  apiUrl: process.env.GTCX_API_URL!,
  networkId: process.env.GTCX_NETWORK_ID!,
  chainId: process.env.GTCX_CHAIN_ID!,
  apiKey: process.env.GTCX_API_KEY,
});

const lotId = process.env.GTCX_UAT_LOT_ID!;
const operatorDid = process.env.GTCX_UAT_OPERATOR_DID!;

const proof = await client.assembleLotProof(lotId, operatorDid);

if (!proof.summary.allValid) {
  throw new Error('Lot proof failed one or more protocol checks');
}

console.log('confidence', proof.summary.confidence);
console.log('compliance tier', proof.summary.compliance?.tier);
```

### 3. Assemble via REST (no SDK)

```bash
curl -sS -X POST "${GTCX_API_URL}/v1/proof/lot" \
  -H "Authorization: Bearer ${GTCX_API_KEY}" \
  -H "X-GTCX-Tenant-Id: ${GTCX_TENANT_ID}" \
  -H "Content-Type: application/json" \
  -H "X-GTCX-Request-Id: $(uuidgen)" \
  -d "{\"lotId\":\"${GTCX_UAT_LOT_ID}\",\"operatorDid\":\"${GTCX_UAT_OPERATOR_DID}\"}" \
  | jq '.summary'
```

### 4. Verify container signature (optional)

If you have GHCR read access:

```bash
cosign verify ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4 \
  --certificate-identity-regexp='.*' \
  --certificate-oidc-issuer='https://token.actions.githubusercontent.com'
```

On Apple Silicon: `docker pull --platform linux/amd64 ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4`.

### 5. Authority posture (Sovereign path)

For underwriting against **ratified** CSP:

1. Load authority DID document for the jurisdiction from the deployed CSP bundle.
2. Confirm `gtcx.key_status` is `production` (not `dev`).
3. Confirm CSP ratification record matches your engagement letter.

Until HSM ceremony completes, Cloud UAT may show `dev` — document that gap in your diligence memo; do not treat it as production sovereign trust.

## Pass criteria

| Check | Pass |
| ----- | ---- |
| `proof.summary.allValid` | `true` |
| TradePass leg | Signature valid, not revoked |
| GeoTag leg | Claim verifies for lot origin |
| VaultMark leg | Custody chain consistent |
| GCI leg | Score present; tier documented |
| Request trace | Save `X-GTCX-Request-Id` for support correlation |

## Failures

| Symptom | Likely cause |
| ------- | ------------- |
| `SIGNATURE_INVALID` | Authority still on `dev` keys; wrong tenant |
| `NOT_FOUND` | Lot not registered in this tenant |
| `UNAUTHORIZED` | API key or tenant mismatch |
| `RATE_LIMITED` | Back off per `Retry-After` |

See [Error codes](api/error-codes.md).

## Evidence to retain

- JSON export of `VerifiedLotProof` (SDK response or REST body)
- Server version / image digest from operator
- Date and environment (staging vs production)
- CSP version (`v1.0.0`) and ratification status

## Related

- [Trust center](trust/trust-center.md)
- [GTCX Cloud vs Sovereign](deployment/cloud-vs-sovereign.md)
- [Compatibility matrix](release/compatibility-matrix.md)
