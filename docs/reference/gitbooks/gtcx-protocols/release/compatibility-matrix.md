---
title: 'Compatibility Matrix — v0.4.4'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['release', 'gitbook']]
review_cycle: on-release
document_type: protocol
version: 0.4.4
---

# Compatibility matrix — v0.4.4

Use this table to align **runtime**, **SDK**, and **jurisdiction packs** for a single deployment. Mismatched versions are a common source of `SCHEMA_VALIDATION_FAILED` and signature verification failures.

## Core artifacts

| Component | Version / pin | Notes |
| --------- | ------------- | ----- |
| **Git tag** | `v0.4.4` | GitHub Release + workflow artifacts |
| **Container image** | `ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4` | Also `0.4`, `sha-<commit>`; semver tag omits leading `v` |
| **Image digest** | See [GitHub Release v0.4.4](https://github.com/gtcx-ecosystem/gtcx-protocols/releases/tag/v0.4.4) | Pin K8s manifests with `@sha256:…` from release `docker` job output |
| **TypeScript SDK** | `@gtcx/sdk@^0.4.0` | Published from release workflow when `NPM_TOKEN` is configured |
| **Python SDK** | `gtcx-sdk` (match TS minor) | `pip install gtcx-sdk` |
| **REST API** | `/v1/` | OpenAPI YAML on Release assets + `openapi-publish` CI artifact |
| **Protocol SPECs** | `3.2.0` | Per-package `protocols/*/SPEC.md` at tag `v0.4.4` |
| **MCP tool catalog** | `v0.1.0` (9 tools) | stdio + streamable-http |
| **Platforms product line** | ADR-007 | [gtcx-platforms](https://github.com/gtcx-ecosystem/gtcx-platforms) — Cloud + Sovereign |

## Network presets (`GTCXClient.fromNetwork`)

| Preset | API base | Use |
| ------ | -------- | --- |
| `testnet` | `https://api.testnet.gtcx.trade` | Integration development |
| `mainnet` | `https://api.gtcx.trade` | Production multi-tenant |

Additional regional presets (e.g. `ghana`) exist in the SDK when that host is deployed — use the **Welcome Pack** URL for your tenant instead of assuming a preset is live.

For **GTCX Cloud** or **dedicated Sovereign** hosts, pass explicit `apiUrl`, `networkId`, and `chainId` from the pack.

## Country Support Packages (CSP)

**Pattern:** `country-support-03-platform/packages/<iso>/v1.0.0/`

Each pack includes jurisdiction metadata, authority DID JSON-LDs, weights, and conformance scenarios. Packs in the repository are **candidates for deployment**; which ISO is live in production depends on your deal and environment — not on a global priority list in this doc.

| CSP field | Meaning |
| ------- | ------- |
| **Provisional** | GTCX-signed; suitable for Cloud UAT and pilots |
| **Ratified** | Sovereign cosignature; required for Sovereign SLA claims |
| **`gtcx.key_status`** on authorities | `dev` until HSM rotation; `production` when ceremony completes |

List available packs: browse the [country-support-packages](https://github.com/gtcx-ecosystem/gtcx-protocols/tree/main/country-support-packages) directory at tag `v0.4.4`.

## gtcx-core npm (cryptographic foundation)

This monorepo installs **published** `@gtcx/*` from [gtcx-core](https://github.com/gtcx-ecosystem/gtcx-core) for crypto primitives (not the protocols SDK).

| Package | Pin (provenance baseline) | Notes |
| ------- | ------------------------- | ----- |
| `@gtcx/crypto`, `@gtcx/types` | `^3.1.4` | Root devDependencies; lockfile must resolve to 3.1.4+ |
| `@gtcx/verification` | `^3.1.4` | `protocol-tradepass` |
| `@gtcx/workproof` | `^1.0.4` | `protocol-tradepass` |

Verify Sigstore: `npm view @gtcx/crypto@3.1.4 dist.attestations`. Details: [gtcx-core npm supply chain](../supply-chain/gtcx-core-npm.md).

## Downstream consumers (ecosystem)

| Repo | Consume | Align to |
| ---- | ------- | -------- |
| `gtcx-platforms` | `@gtcx/sdk`, `/v1/*` REST; ADR-007 Cloud/Sovereign | Server `0.4.4` + SDK `0.4.x` |
| `gtcx-mobile` | `@gtcx/sdk`, mobile-auth, SSE audit | SDK pin; CSP per tenant `<iso>` |
| `gtcx-nyota` | Cloud tenant provisioning | Same API + CSP version |
| `ledger-ui` | `@gtcx/sdk` | Operator UX against same API |
| `compliance-os` | TradePass + VaultMark surfaces | SDK `0.4.x` |
| `gtcx-intelligence` | Wire #2 evidence, audit stream | Server `0.4.4`; keys from active CSP |

## Verify container signature

```bash
cosign verify ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4 \
  --certificate-identity-regexp='.*' \
  --certificate-oidc-issuer='https://token.actions.githubusercontent.com'
```

## Local parity (contributors only)

```bash
git checkout v0.4.4
pnpm install --frozen-lockfile
pnpm build && pnpm test
docker pull --platform linux/amd64 ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4
```

Integrators should not need to clone the monorepo — use this site, npm/PyPI, and Release OpenAPI instead.
