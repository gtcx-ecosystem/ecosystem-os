---
title: 'GTCX Protocols — Developer Documentation'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
tags: ['gitbook', 'documentation']
review_cycle: 'on-release'
publication_target: 'https://docs.gtcx.trade'
---

# GTCX Protocols

Jurisdiction-neutral, commodity-agnostic **verification rail** for global commodity supply chains. Six protocols — TradePass, GCI, GeoTag, VaultMark, PvP, and PANX — issue and verify cryptographic evidence that regulators, DFIs, and platforms can trust without re-auditing your stack.

**Documentation release:** `0.4.4` (aligned with container image `v0.4.4` and `@gtcx/sdk` `0.4.x`)

## Who this site is for

| Audience | Start here |
| -------- | ---------- |
| Integrators (fintech, platforms) | [Getting Started](getting-started.md) |
| DFI / compliance officers | [Verify a Lot](verify-a-lot.md) |
| Mobile / field engineers | [Ecosystem Integrations](deployment/ecosystem-integrations.md) |
| Security / procurement | [Trust Center](trust/trust-center.md) |
| Protocol authors | [Protocol guides](protocols/tradepass.md) + canonical SPECs on GitHub |

## Deployment models

Product lines are defined in **[gtcx-platforms ADR-007](https://github.com/gtcx-ecosystem/gtcx-platforms/blob/main/01-docs/architecture/decisions/ADR-007-two-product-consolidation.md)**. Protocols are the shared rail; **operator type** picks the product — not a fixed country list.

| Model | Operator shape | Trust / SLA |
| ----- | -------------- | ----------- |
| [**GTCX Cloud**](deployment/cloud-vs-sovereign.md#gtxc-cloud) | Exchanges, consortia, integrators, hosted field programs | Multi-tenant SaaS; provisional CSP common; best-effort until ratified |
| [**GTCX Sovereign**](deployment/cloud-vs-sovereign.md#gtxc-sovereign) | Government (permits, customs, formalization) | In-country deploy; ratified CSP; HSM authorities; Sovereign SLA |

See [Cloud vs Sovereign](deployment/cloud-vs-sovereign.md) — no country is assigned to a product line in public docs.

## Version line (release 0.4.4)

See the full matrix: [Compatibility Matrix](release/compatibility-matrix.md).

| Artifact | Pin |
| -------- | --- |
| Protocol server (container) | `ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4` |
| TypeScript SDK | `@gtcx/sdk@^0.4.0` |
| Python SDK | `gtcx-sdk` (PyPI; align minor with TS release notes) |
| REST API | `/v1/` — OpenAPI attached to each GitHub Release |
| Protocol SPECs | `3.2.0` per package (see protocol guides) |
| Country Support Packages | `country-support-03-platform/packages/<iso>/v1.0.0/` |

## The six protocols

| Protocol | Role |
| -------- | ---- |
| [TradePass](protocols/tradepass.md) | Identity and verifiable credentials |
| [GCI](protocols/gci.md) | Compliance scoring |
| [GeoTag](protocols/geotag.md) | Location verification |
| [VaultMark](protocols/vaultmark.md) | Custody chain |
| [PvP](protocols/pvp.md) | Payment-versus-physical settlement |
| [PANX](protocols/panx.md) | Oracle consensus |

## Quick paths

```bash
# TypeScript
pnpm add @gtcx/sdk

# Python
pip install gtcx-sdk
```

```typescript
import { GTCXClient } from '@gtcx/sdk';

const client = GTCXClient.fromNetwork('testnet', {
  apiKey: process.env.GTCX_API_KEY,
});

const proof = await client.assembleLotProof(
  'lot:xx-gld-20260120-001',
  'did:gtcx:tp_producer_001'
);
console.log(proof.summary.allValid);
```

## Supply chain

Release `v0.4.4` artifacts include:

- **Cosign-signed** container image (verify with GitHub Actions OIDC issuer)
- **SLSA** provenance on the container image (GitHub Release)
- **gtcx-core npm** — `@gtcx/crypto`, `@gtcx/types`, `@gtcx/verification`, `@gtcx/workproof` pinned to the **3.1.4 provenance train** ([supply chain](supply-chain/gtcx-core-npm.md))
- **CycloneDX SBOM** on the GitHub Release

Verification example (requires GHCR read access):

```bash
cosign verify ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4 \
  --certificate-identity-regexp='.*' \
  --certificate-oidc-issuer='https://token.actions.githubusercontent.com'
```

On Apple Silicon, pull with `--platform linux/amd64`.

## Support

- **Integration:** see [Getting Started](getting-started.md) and [API Overview](api/overview.md)
- **Security:** [Vulnerability Disclosure](trust/vulnerability-disclosure.md)
- **Commercial / sovereign programs:** contact your GTCX account team

## Source repository

Implementation and canonical SPECs: [github.com/gtcx-ecosystem/gtcx-protocols](https://github.com/gtcx-ecosystem/gtcx-protocols)

This GitBook is the **external** integrator surface. Internal engineering runbooks and audit evidence remain in the repository under restricted paths and are not linked from this site.

## Publishing

**Edit here** in `gtcx-protocols`. **Publish** via ecosystem hub:

```bash
pnpm sync:gitbook   # copies to canon-os/01-docs/gitbooks/gtcx-protocols/
```

GitBook should connect to **`gtcx-docs`** with root `01-docs/gitbooks/gtcx-protocols/`. See `PUBLISH.md` (maintainer-only, not synced).
