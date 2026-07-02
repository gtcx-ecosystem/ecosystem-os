---
title: 'Inbound: gtcx-protocols — XR-509 @gtcx/mcp NPM publish'
status: done
date: 2026-06-12
from: canon-os
to: gtcx-protocols
priority: P0
gate_id: H-04
xr_id: XR-509
owner: gtcx-protocols
evidence_repo: gtcx-os/platform/protocols
---

# XR-509 — Publish `@gtcx/mcp` to NPM

## Context

Hub maturity initiative **INIT-CANON-MATURITY** is **done** (composite **89** full-unlock). Critical path remains **XR-509** — fleet consumers blocked until `@gtcx/mcp` is on NPM.

**Owner repo:** `gtcx-os/platform/protocols` (`03-platform/packages/mcp/package.json` → `@gtcx/mcp`)

**Class S gate:** [`to-human-npm-publish-2026-06-03.md`](./to-human-npm-publish-2026-06-03.md) (H-04 NPM_TOKEN + provenance)

## Ask (owner repo — not hub)

1. Publish `@gtcx/mcp` per H-04 attestation packet after org `NPM_TOKEN` is live.
2. Record version + provenance in `audit/evidence/` or release witness.
3. Notify hub: append `ops/coordination/hub-narrative/agent-coordination-log.md` with **done** + npm version.

## Hub witness (canon-os)

| Field | Value |
| ----- | ----- |
| Workplan row | XR-509 **blocked** · consumers |
| Package path | `gtcx-os/platform/protocols/03-platform/packages/mcp` |
| Blocker | H-04 Class S — human NPM credentials |
| Owner prep (2026-06-12) | `@gtcx/mcp` **build exit 0** · **47/47** tests · workspace dep fix in `platform/protocols/package.json` (`@gtcx/crypto` removed; `@gtcx/zkp-kat-vectors` → `link:../core/...`) |
| Publish gate | H-04 Class S — `NPM_TOKEN` + provenance attestation still required |

## Acceptance

- [x] `@gtcx/mcp@0.1.0` on npm (published 2026-06-04)
- [x] Consumer repos can `pnpm add @gtcx/mcp@0.1.0`
- [x] Hub workplan XR-509 → **done** — registry `https://registry.npmjs.org/@gtcx/mcp`
