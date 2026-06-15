---
title: 'Contributing Guidelines'
status: current
date: 2026-06-14
owner: ecosystem-os
tier: standard
tags: [['governance', 'contributing']]
review_cycle: on-change
document_type: runbook
role: protocol-architect
---

# Contributing to ecosystem-os

## Quick start

```bash
pnpm install
pnpm ops:check
```

Adjust commands for repo-specific entry (see root `README.md`).

## Quality gates

All contributions **must** pass:

1. **Layout** — `pnpm check:workspace-root-cleanliness:strict` (when wired)
2. **Documents** — `pnpm check:repo-document-manifest:strict` (when wired)
3. **Ops** — `pnpm ops:check`
4. **Validate** — `pnpm validate` (when defined)
5. **Lint** — `pnpm lint` (when defined)
6. **Tests** — `pnpm test` or `pnpm test:ci` (when defined)

## Commit convention

[Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(scope): subject
fix(scope): subject
docs(scope): subject
chore(scope): subject
```

One concern per commit. Do not push unless requested.

## Pull request process

1. Branch from `main`
2. Run quality gates locally
3. Update docs when behavior changes
4. Request review from a code owner

## Security

See [`SECURITY.md`](./SECURITY.md) for coordinated disclosure — do not open public issues for vulnerabilities.

## Agents

When using AI agents: read root `AGENTS.md` and follow bridge-os P22 delegation for fleet work selection.
