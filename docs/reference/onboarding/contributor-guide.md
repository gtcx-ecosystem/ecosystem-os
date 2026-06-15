---

title: 'Contributor Guide'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['onboarding']
review_cycle: 'monthly'

---

# Contributor Guide — gtcx-agentic

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

---

## Executive Summary

> **Status:** Current

## Getting Started

Complete the Developer Setup (see CLAUDE.md at repo root) before contributing. Ensure all verification checks pass.

---

## Branching Strategy

**Base branch:** `main`

**Branch naming convention:**

| Prefix      | Use Case                                | Example                            |
| ----------- | --------------------------------------- | ---------------------------------- |
| `feature/`  | New functionality                       | `feature/agent-task-streaming`     |
| `fix/`      | Bug fixes                               | `fix/orchestrator-retry-loop`      |
| `chore/`    | Maintenance, dependencies, config       | `chore/upgrade-anthropic-sdk`      |
| `01-docs/`     | Documentation changes                   | `01-docs/update-agent-guide`          |
| `refactor/` | Code restructuring (no behavior change) | `refactor/extract-tool-registry`   |
| `test/`     | Adding or updating tests                | `test/add-orchestrator-edge-cases` |

```bash
# Create a new branch

git checkout main
git pull origin main
git checkout -b feature/{short-description}
```

---

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

**Format:** `type(scope): description`

| Type       | When to Use                             |
| ---------- | --------------------------------------- |
| `feat`     | A new feature                           |
| `fix`      | A bug fix                               |
| `docs`     | Documentation only                      |
| `style`    | Formatting, missing semicolons          |
| `refactor` | Code change that neither fixes nor adds |
| `test`     | Adding or correcting tests              |
| `chore`    | Build process, dependencies             |
| `perf`     | Performance improvement                 |
| `ci`       | CI configuration changes                |

**Examples:**

```
feat(agents): add streaming support for long-running tool calls
fix(orchestrator): handle retry loop when tool returns null
docs(agent-guide): update onboarding steps for new tooling
refactor(tools): extract tool registry to shared util
test(orchestrator): add edge cases for concurrent task execution
```

**Breaking changes:** Add `!` after the type or include `BREAKING CHANGE:` in the footer.

```
feat(api)!: change agent task response shape
```

---

## Pull Request Process

1. **Create your branch** following the naming convention above
2. **Make your changes** with clear, atomic commits
3. **Write or update tests** for any changed behavior
4. **Run the full test suite** locally before pushing
5. **Push and open a PR** against `main`
6. **Fill out the PR template** completely
7. **Request review** from at least 1 reviewer
8. **Address review feedback** with new commits (do not force-push during review)
9. **Merge** once approved and all CI checks pass

**PR expectations:**

- Title follows conventional commit format
- Description explains what and why (not just how)
- Linked to relevant issue(s) where applicable
- No unrelated changes bundled in

**CI checks that must pass:**

- [ ] Lint
- [ ] Type check
- [ ] Tests
- [ ] Build

---

## Code Style

**Linter:** ESLint — configuration in per-package `eslint.config.js`

**Formatter:** Prettier — run via `pnpm format

`

```bash
# Check linting
pnpm lint

# Auto-fix lint issues
pnpm lint --fix

# Format code
pnpm format

# Check formatting without writing
pnpm format:check
```

**Configure auto-formatting on save** in your editor to avoid style-only commits.

---

## Testing Requirements

- All new features must include tests
- All bug fixes must include a regression test
- Tests must pass on CI before merge
- Agent behaviour must be tested with deterministic tool mocks — do not test against live LLM APIs in CI

**Test naming convention:**

```
describe('ModuleName', () => {
  it('should \<expected-behavior\> when \<condition\>', () => {
    // ...
  });
});
```

**Key rules:**

- All Anthropic SDK calls must go through the shared agent client — no direct `new Anthropic()` instantiation in agent code
- Never log raw prompt content or user-supplied data in production
- Agents are infrastructure — changes to tool interfaces or orchestration must not break consuming workflows

---

## Review Checklist

Reviewers should evaluate PRs against the following:

- [ ] Code is readable and well-structured
- [ ] Changes match the stated intent of the PR
- [ ] Tests cover the new or changed behavior
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] All SDK calls route through the shared agent client
- [ ] No raw prompt content or user data logged
- [ ] Tool interface changes are backward-compatible (or breaking change documented)
- [ ] Agent changes tested with deterministic mocks — not live API calls
- [ ] No leftover debugging code (console.log, TODO hacks)

---

## Release Process

gtcx-agentic packages are consumed as workspace dependencies across the GTCX ecosystem. They do not publish independently.

1. Changes merged to `main`
2. CI validates all gates (lint, typecheck, test, build)
3. Downstream repos pick up updated packages via pnpm workspace resolution
4. Breaking changes to agent interfaces: coordinate with consuming repos before merging

---

## Getting Help

| Channel            | Use For                                                      |
| ------------------ | ------------------------------------------------------------ |
| GitHub Issues      | Bug reports, feature requests, questions                     |
| GitHub PR comments | Code review feedback, design discussions                     |
| CLAUDE.md          | Repo-specific rules, agent constraints, SDK usage guidelines |

If you are unsure about an approach, open a draft PR early and ask for guidance.

## Negative Scope

This document does **not** cover:

- Topics outside the scope of this specific guide
- Implementation details covered in linked documents
- Cross-repo specifics — see individual repo documentation
