---
title: GTCX meta-workspace
date: 2026-07-02
owner: ecosystem-os
status: active
---

# GTCX meta-workspace

## Decision

The GTCX ecosystem is **21 repos, each an independent pnpm workspace**, that
cross-reference each other's packages (e.g. gtcx-os platforms → ledger-ui
`@gtcx/ui`; intelligence/sdk + bridge-os → baseline-os `baselineos`).

pnpm cannot resolve a `workspace:*`/`file:` dependency whose target lives in a
*different* workspace — following such a link drags in the target's own
`workspace:*` deps, which are not members of the consuming workspace, and the
install fails. **Ad-hoc `file:` cross-repo linking does not work.**

**Adopted model — dual:**

1. **Meta-workspace for local co-development.** A single root
   `pnpm-workspace.yaml` at the ecosystem parent spans the member repos, so every
   cross-repo `workspace:*` dep resolves by membership. This is what makes a full
   local install + cross-repo iteration work.
2. **Publish shared packages for CI/release.** `@gtcx/ui`, `baselineos`,
   `@gtcx/protocols-crypto`, etc. are published (see the ecosystem-os publish
   registry) so pipelines install by version and don't depend on all repos being
   checked out.

## Why generated, never hand-edited

The root workspace is **generated** by
`platform/scripts/meta-workspace/setup.mjs` from
`machine/meta-workspace/members.json`. The generator unions each member repo's
**own** `pnpm-workspace.yaml` globs (prefixed with the repo dir), so the meta
root exactly mirrors each repo's authoritative package set — no drift, no manual
path maintenance. The root file carries a `# GENERATED` header.

The root lives at the **ecosystem parent** (untracked container dir), so it is
materialized deliberately by running the generator — not committed to any repo
and never edited by hand. The tracked source of truth (members + generator +
this doc) lives here in `ecosystem-os`.

## Usage

From `ecosystem-os`:

```bash
pnpm meta:workspace           # dry run — print what would be generated
pnpm meta:workspace:write     # materialize root pnpm-workspace.yaml at the parent
pnpm meta:workspace:check     # CI drift check (fails if root is stale/missing)
pnpm meta:workspace:remove    # tear down the root (restore standalone mode)
# add candidate members (baseline-os, bridge-os) once verified:
node platform/scripts/meta-workspace/setup.mjs --write --include-candidates
```

Then, for **meta mode**, run `pnpm install` from the ecosystem parent. For
**standalone mode**, run pnpm from inside a repo (its own `pnpm-workspace.yaml`
still governs). pnpm resolves the nearest workspace root going up from the cwd,
so the two modes coexist — but do not run both installs concurrently against the
same trees.

## Membership + rollout

`machine/meta-workspace/members.json` lists members with a `status`:

- **verified** — installs cleanly standalone; included by default. Currently:
  `gtcx-os`, `ledger-ui` (proven: gtcx-os protocols subtree builds + tests
  green 470/470; ledger-ui installs clean and provides `@gtcx/ui`).
- **candidate** — cross-referenced but not yet verified-healthy; included only
  with `--include-candidates`. Currently: `baseline-os`, `bridge-os`.

**To promote a candidate:** verify `pnpm install` succeeds in it standalone
(reconcile its workspace globs + broken deps first, as was done for gtcx-os),
then flip `status` to `verified`.

## Prerequisites / caveats

- **Tooling alignment.** Members must agree on pnpm (9.15) and a compatible node
  (gtcx-os pins node ≥22; ledger-ui ≥20 — compatible). Reconcile before adding a
  member whose engines conflict.
- **Per-repo internal health first.** The meta-workspace only resolves *cross*-
  repo linkage; each member must already install standalone. Expect per-repo
  repair (stale globs, broken deps, tsc-version drift) before promotion.
- **Nested workspaces.** Each member keeps its own `pnpm-workspace.yaml`. The
  meta root is additive for cross-repo dev/CI; it does not replace them.
