---
title: 'Inbound: ledger-ui — republish @gtcx/ui with dist tarball'
status: in_progress
date: 2026-06-12
from: canon-os
to: ledger-ui
priority: P2
gate_id: XR-303-follow-up
xr_id: XR-303
owner: ledger-ui
evidence_repo: ledger-ui
---

# XR-303 follow-up — `@gtcx/ui@0.4.1` npm tarball missing `dist/`

## Context

XR-303 closed in gtcx-platforms with **file:** links to ledger-ui `@0.4.1` and **agx `next build` exit 0** (`gtcx-os@df4fc658`).

Registry tarball `@gtcx/ui@0.4.1` contains **source only** (no `dist/`). npm consumers cannot build without sibling clone or republish.

## Ask (owner repo)

1. Ensure `files` in `@gtcx/ui` package.json includes `dist/`.
2. Run release gates (`pnpm build` + publish) for `@gtcx/ui@0.4.2` or repatch `0.4.1` per npm policy.
3. Verify: `tar -tzf $(npm pack @gtcx/ui@<version>) | grep dist/index.js`.

## Hub witness

Platforms can revert `file:` links to semver npm once tarball includes `dist/`.

## Acceptance

- [x] `files` includes `dist/`; `prepack` build guard added
- [x] `@gtcx/ui@0.4.2` versioned; local `npm pack` includes `dist/index.js` (1461 tests pass)
- [ ] npm publish `@gtcx/ui@0.4.2` — **blocked** (NPM_TOKEN unset; registry ETIMEDOUT on `changeset publish`)
- [ ] gtcx-platforms semver install without `file:` links

**Owner witness:** `ledger-ui@2b417d27`
