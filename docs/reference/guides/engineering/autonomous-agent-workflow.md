---
title: 'Guide: Autonomous Agent Workflow'
status: current
date: 2026-05-24
owner: engineering-lead
tier: operating
tags: [['agentic', 'testing']]
review_cycle: annual
document_type: onboarding
role: engineering-lead
---

# Guide: Autonomous Agent Workflow

## The Problem

AI agents can do enormous amounts of work — but only when properly structured. Without structure, they:

- Stall when encountering ambiguity (ask questions instead of deciding)
- Loop on errors without trying alternative approaches
- Lose coherence on multi-hour tasks as context degrades
- Make architectural decisions that conflict with project conventions
- Produce work that doesn't integrate with the existing codebase
- Over-engineer or under-engineer without calibration

The goal: give agents enough structure to work autonomously for hours, producing work that meets quality standards without human babysitting.

## The Framework: Bounded Autonomy

Agents work best with clear boundaries and decision rights:

**Give them**: Clear objective, quality criteria, reference patterns, constraints, decision rights within scope

**Don't give them**: Vague goals, unlimited scope, decisions that require business judgment, tasks that require information they can't access

## Structuring Large Tasks

### 1. Task Decomposition

Break large tasks into autonomous work units (AWUs). Each AWU should be:

- Completable in one session (1-3 hours of agent work)
- Independently verifiable (tests pass, lint clean, builds)
- Bounded in scope (touches specific files/modules)
- Self-contained in context (doesn't require recalling 5 hours of prior work)

Bad: "Build the content management system"

Good: "Create the NestJS content module with CRUD endpoints matching the spec at 01-docs/specs/engines/editorial/07_backend/backend.md. Follow the existing health module pattern at services/api/03-platform/src/modules/health/. Include XState content state machine and Vitest tests."

### 2. Agent Briefing Document

Before any large autonomous work, create a briefing:

```markdown
# Agent Briefing — {task-name}

## Objective

{one sentence — what to build/do}

## Success Criteria

- [ ] {specific, measurable criterion 1}
- [ ] {criterion 2 — e.g., "all tests pass"}
- [ ] {criterion 3 — e.g., "follows NestJS module pattern"}

## Reference Files

- Pattern to follow: {path to existing code that demonstrates the pattern}
- Spec to implement: {path to spec document}
- Types to use: {path to shared types}

## Constraints

- DO: {use Vitest, follow existing error handling, use Prisma}
- DO NOT: {install new dependencies without listing them, modify shared types, change existing tests}

## Decision Rights

- You MAY: {choose function names, organize internal module structure, add helper functions}
- You MUST ASK: {before adding new dependencies, before changing API contracts, before modifying shared code}

## Context Files

Read these before starting:

1. {CLAUDE.md}
2. {relevant service overview}
3. {relevant spec}
```

### 3. Checkpoint Pattern

For multi-step autonomous work, define checkpoints:

**Checkpoint**: A point where the agent should verify its work before continuing.

After each checkpoint:

1. Run tests (do they pass?)
2. Run lint (is it clean?)
3. Verify against success criteria
4. Save progress (commit or session recap)
5. If anything is wrong, fix before moving to next phase

Example:

```
Phase 1: Scaffold module structure → CHECKPOINT (files exist, imports resolve)
Phase 2: Implement data model → CHECKPOINT (prisma generate works, types correct)
Phase 3: Implement service layer → CHECKPOINT (unit tests pass)
Phase 4: Implement controller → CHECKPOINT (integration tests pass, lint clean)
Phase 5: Documentation → CHECKPOINT (README complete, links valid)
```

### 4. Error Recovery Protocol

When an agent hits an error during autonomous work:

1. **Try the obvious fix** (typo, missing import, wrong path)
2. **Try an alternative approach** (different API, different pattern)
3. **Check reference code** (how does the existing codebase handle this?)
4. **Document and skip** (if non-blocking, log the issue and continue)
5. **Stop and report** (if blocking, save state and explain what's stuck)

NEVER: retry the same failing approach more than twice, brute-force through type errors, ignore test failures and keep building.

## [AI System] Agent Architecture

For GTCX's content production system specifically:

### Agent Hats

[AI System] orchestrates specialized agent roles. Each hat has:

- **Scope**: What this agent is responsible for
- **Inputs**: What it needs to start
- **Outputs**: What it produces
- **Quality gate**: How output is verified before handoff
- **Autonomy level**: What decisions it can make independently

### Production Pipeline

```
Trigger → Research Scout → Synthesis Agent → Production Agent → QA Agent → Distribution
```

Each stage:

1. Receives structured input from previous stage
2. Has clear output format/schema
3. Has quality gate before passing to next stage
4. Can flag issues back to previous stage (not just forward)

### Orchestration Principles

- **Iterate until done**: [AI System] loops an agent until quality gate passes, not just once
- **Fail fast**: If source data is insufficient, fail at Research Scout, not at Production
- **Audit trail**: Every agent decision is logged for hallucination auditing
- **Cost awareness**: Track token usage per agent per run, set budgets
- **Human gates**: Define which outputs require human review before publishing (SEV by content type)

## Empowering Long-Running Autonomous Work

### Pre-Flight

Before starting a large autonomous task:

1. CLAUDE.md is current
2. Memory files are up to date
3. Agent briefing document is written
4. Checkpoints are defined
5. Success criteria are measurable
6. Reference patterns are identified
7. Test infrastructure is working

### During Execution

- Agent follows checkpoint pattern
- Agent commits at each checkpoint (atomic, reviewable)
- Agent writes session recap notes as it goes (not just at end)
- Agent updates memory files when discovering new patterns
- Agent stops at decision points marked "MUST ASK"

### Post-Flight

1. Run full test suite
2. Run lint/typecheck
3. Write session recap
4. Update memory files
5. Create PR with structured description
6. Flag any decisions that need human review

## Measuring Agent Effectiveness

| Metric                | Target                                         | How to Measure                  |
| --------------------- | ---------------------------------------------- | ------------------------------- |
| Task completion rate  | >90% AWUs completed without human intervention | Track stalls/escalations        |
| First-pass quality    | >80% pass code review without changes          | Track review rounds             |
| Context recovery time | <2 min for quick, <10 min for deep             | Time to first productive output |
| Hallucination rate    | <5% of claims/references                       | Hallucination audit template    |
| Rework rate           | <15% of completed work needs redo              | Track reverts/rewrites          |

## Anti-Patterns

- Giving agents a vague goal and hoping for the best
- Not defining checkpoints for multi-step work
- Letting agents make architectural decisions without reference patterns
- Never reviewing AI-generated code ("it compiled, ship it")
- Micro-managing every function name (defeats the purpose)
- Not tracking agent effectiveness (can't improve what you don't measure)

## Reference

- [Agent context recovery](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/guides/engineering/agent-context-recovery.md) — Context recovery protocol
- [AI-assisted development](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/guides/engineering/ai-assisted-development.md) — AI code generation practices
- [Hallucination audit template](https://github.com/gtcx-ecosystem/gtcx-agile/tree/main/reference/templates/agile/4-audits/templates/hallucination-audit.md) — Content accuracy verification
- [Session recap template](https://github.com/gtcx-ecosystem/gtcx-agile/tree/main/reference/templates/sessions/5-session-recaps/session-recap.md) — Session handoff
- [Project insights template](https://github.com/gtcx-ecosystem/gtcx-agile/tree/main/reference/templates/sessions/4-session-insights/project-insights.md) — Accumulated knowledge
- [Code standards (P5)](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/governance/protocols/5-code-standards/protocol.md) — Code quality standards
- [Testing (P6)](https://github.com/gtcx-ecosystem/canon-os/tree/main/01-docs/governance/protocols/6-testing/protocol.md) — Testing requirements
