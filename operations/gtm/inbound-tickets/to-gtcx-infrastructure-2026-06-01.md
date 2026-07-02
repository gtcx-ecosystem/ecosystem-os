---
title: 'Inbound: Protocols GitBook hub sync (v0.4.4)'
status: 'current'
date: '2026-06-01'
owner: 'gtcx-docs'
tier: 'operating'
tags: ['gtm', 'gitbook', 'gtcx-protocols']
review_cycle: 'on-change'
---
> **Archive note (2026-06-30):** `gtcx-infrastructure` is archived. Its live
> successor is `fabric-os`. New work or reopens should route to `fabric-os`, not
> the archived repo.


# Inbound: Protocols GitBook hub sync (v0.4.4)

**To:** gtcx-infrastructure (FYI)
**From:** gtcx-protocols / gtcx-docs
**Date:** 2026-06-01

## Subject

Sync `gtcx-protocols` GitBook to `gtcx-docs` hub after documentation release **v0.4.4**.

## What changed (protocols)

Public GitBook under `gtcx-protocols/01-docs/gitbook/` includes:

- [Cloud vs Sovereign](../gitbooks/gtcx-protocols/deployment/cloud-vs-sovereign.md) (aligned with gtcx-platforms ADR-007)
- [Verify-a-lot](../gitbooks/gtcx-protocols/verify-a-lot.md) (DFI UAT framing)
- Release line **v0.4.4** across README, SDK, API, compatibility matrix

Authoritative session audit: `gtcx-protocols/01-docs/05-audit/forensic-session-2026-06-01.md`.

## Action (docs hub)

From `gtcx-protocols`:

```bash
pnpm sync:gitbook
```

Commits go to **`gtcx-docs/01-docs/gitbooks/gtcx-protocols/`** (generated mirror + `.sync-manifest.json`).

Publish flow: `gtcx-protocols/01-docs/gitbook/PUBLISH.md` and `gtcx-docs/01-docs/gitbooks/README.md`.

## Infra impact

**None required** for this sync. No CI or Terraform changes. GitBook SaaS spaces may point at `gtcx-docs` or source repos per your existing publish config.

## Related (ecosystem hygiene — separate track)

Repo retirements and link updates: `gtcx-docs/01-docs/reference/retired-repositories.md`.
