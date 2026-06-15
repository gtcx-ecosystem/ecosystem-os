---
title: 'Trust Center'
status: current
date: 2026-06-01
owner: gtcx-protocols
tier: operating
tags: [['trust', 'gitbook']]
review_cycle: quarterly
document_type: protocol
version: 0.4.4
publication_target: https://trust.gtcx.trade
---

# Trust center

Public trust posture for **GTCX Cloud**, **GTCX Sovereign**, DFIs, and enterprise security review. Assertions here match internal audits — **no score inflation**.

**Last refreshed:** 2026-06-01 · **Release line:** v0.4.4

## At a glance

| Dimension | State |
| --------- | ----- |
| **Production deployments** | GTCX Cloud and Sovereign rollouts proceed per deal; jurisdictions and ratification status vary by contract |
| **Cryptography** | Ed25519 + AES-256-GCM; hybrid post-quantum signing available |
| **Container integrity** | Cosign-signed images on GHCR; SLSA provenance on tagged releases |
| **FIPS 140-3 / CMVP** | Submission targeted 2026-Q3; certificate ETA 2027-Q1–Q2 |
| **SOC 2 Type II** | Firm engaged; report ETA 6–12 months |
| **Penetration test** | External engagement scheduled 2026-Q3 |
| **Sovereign ratifications** | Per engagement; provisional CSPs may be live before countersignature |
| **Production HSM (authorities)** | Sovereign ceremony per jurisdiction when required (`gtcx-infrastructure` #49-54); Cloud uses KMS/Vault Transit until rotation |
| **Vulnerability disclosure** | [Active policy](vulnerability-disclosure.md) — 72h response target |

## Supply chain (release v0.4.4)

| Artifact | Verification |
| -------- | -------------- |
| Container | `ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4` |
| Signature | `cosign verify` with GitHub Actions OIDC issuer |
| SBOM | CycloneDX on GitHub Release |
| Provenance | SLSA attestation on container image (GitHub Release) |
| **gtcx-core npm** | `@gtcx/crypto@3.1.4+` with Sigstore attestations — [pinning guide](../supply-chain/gtcx-core-npm.md) |

```bash
cosign verify ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4 \
  --certificate-identity-regexp='.*' \
  --certificate-oidc-issuer='https://token.actions.githubusercontent.com'
```

## Open source

Protocol implementation: [github.com/gtcx-ecosystem/gtcx-protocols](https://github.com/gtcx-ecosystem/gtcx-protocols)

Reviewers can run `pnpm test` on tag `v0.4.4` to reproduce behavioral claims.

## Deployment models

| Model | SLA | CSP |
| ----- | --- | --- |
| **GTCX Cloud** | Best-effort until ratification | Provisional (GTCX-signed) |
| **GTCX Sovereign** | Contractual SLA from ratification date | Countersigned by in-country authority |

Details: [GTCX Cloud vs Sovereign](../deployment/cloud-vs-sovereign.md)

## Data residency

Configured per **Country Support Package** (`residency.yaml`). Default posture: data remains in the jurisdiction selected for the tenant unless sovereign opts into cross-border DR.

## What we publish vs hold

| Published | Held (NDA / in progress) |
| --------- | ------------------------ |
| Open code, ADRs, VDP | Pen-test reports (post-engagement) |
| Cosign + SBOM + SLSA pointers | SOC 2 Type II report |
| This trust center | CMVP certificate (until awarded) |
| Compatibility matrix | Customer list (pre-consent) |

## Honest limitations

- Authority DIDs may show `key_status: dev` until HSM ceremony — signatures are not production-sovereign until rotation.
- Provisional CSPs are suitable for **Cloud UAT and pilots**; underwriting at scale should wait for ratification where required by policy.

## Related

- [Vulnerability disclosure](vulnerability-disclosure.md)
- [Verify a lot](../verify-a-lot.md)
- [Compatibility matrix](../release/compatibility-matrix.md)
