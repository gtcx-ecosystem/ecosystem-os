---
title: 'gtcx-core npm packages (@gtcx/*)'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-protocols'
version: '0.4.4'
tags: ['supply-chain', 'gitbook']
review_cycle: 'on-release'
---

# gtcx-core npm packages (`@gtcx/*`)

**Audience:** Procurement, security review, and monorepo maintainers that install cryptographic primitives from [gtcx-core](https://github.com/gtcx-ecosystem/gtcx-core) via npm — not `@gtcx/sdk` (protocols) or `@gtcx/ui` (ledger-ui).

## What this repo consumes

The **gtcx-protocols** monorepo pins these **published** packages from gtcx-core (semver floors, lockfile-resolved):

| Package | `package.json` floor | Resolved (2026-06-01) |
| ------- | -------------------- | --------------------- |
| `@gtcx/crypto` | `^3.1.4` | 3.1.4 (root devDependency) |
| `@gtcx/types` | `^3.1.4` | 3.1.4 (root devDependency) |
| `@gtcx/verification` | `^3.1.4` | 3.1.4 (`protocol-tradepass`) |
| `@gtcx/workproof` | `^1.0.4` | 1.0.4 (`protocol-tradepass`) |

Other `@gtcx/*` names in this monorepo (`@gtcx/auth`, `@gtcx/protocols-crypto`, …) are **workspace packages** — they are not the gtcx-core npm train.

## Why pin at 3.1.4+

| Installed version | Sigstore attestation on npm? |
| ----------------- | ---------------------------- |
| `@gtcx/crypto@3.1.4` | Yes |
| `@gtcx/crypto@3.1.3` | No |
| `@gtcx/crypto@3.1.0` | No |

Ranges like `^3.0.0` can still resolve to unattested builds if the lockfile is stale. Pin the **provenance baseline** intentionally and commit `pnpm-lock.yaml`.

Full version table (all 21 packages): [gtcx-core trust portal — Published versions](https://github.com/gtcx-ecosystem/gtcx-core/blob/main/01-docs/governance/trust-portal.md#published-versions).

## Verify after install

From the **gtcx-protocols repo root** (after `pnpm install`):

```bash
pnpm ls @gtcx/crypto @gtcx/types
pnpm --filter @gtcx/protocol-tradepass ls @gtcx/verification @gtcx/workproof
```

Registry attestation (example):

```bash
npm view @gtcx/crypto@3.1.4 dist.attestations
```

Expect a non-empty `url` and `provenance.predicateType` of `https://slsa.dev/provenance/v1`.

## Ecosystem consumers (gtcx-core npm only)

| Repo | Packages | Status |
| ---- | -------- | ------ |
| **gtcx-protocols** | crypto, types, verification, workproof | Pinned 2026-06-01 |
| **gtcx-infrastructure** | `@gtcx/crypto` in `03-platform/tools/replay-protection` | Pinned 2026-06-01 |

Repos using `workspace:*`, `link:`, or `file:` for `@gtcx/*` do not need this bump. **ledger-ui** `@gtcx/ui` / `@gtcx/utils` are a different product scope.

## Container vs npm provenance

| Artifact | Provenance |
| -------- | ---------- |
| `ghcr.io/gtcx-ecosystem/gtcx-protocols:0.4.4` | Cosign + SLSA (GitHub Release) — see [Trust center](../trust/trust-center.md) |
| `@gtcx/crypto@3.1.4` on npm | Sigstore via gtcx-core `release.yml` |

Both matter for a full supply-chain review; they are independent release lines.
