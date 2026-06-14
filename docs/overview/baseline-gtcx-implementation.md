---
title: 'Baseline Gtcx Implementation'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['strategy']
review_cycle: 'bi-weekly'
---

# BaselineOS — GTCX Implementation Guide

> **Status:** Current
> **Date:** 2026-03-09
> **Owner:** Protocol Architect

**Date:** 2026-03-09
**Scope:** How the BaselineOS Design Bible translates to GTCX's specific implementation
**Source docs:** BaselineOS AI Design Bible v1.0, BaselineOS Technical Spec, `gtcx-rag-pack-enterprise`

---

## Executive Summary

> **Status:** Current

## The Contract

BaselineOS is not a framework you configure. It is a convention you adopt. Once adopted, it disappears — agents operate with full GTCX organizational context automatically, and you stop thinking about it.

The Design Bible defines this moment:

> "A developer running `baseline init` and watching the system understand their organization in 5 seconds. An agent completing 100 tasks overnight with zero escalations. A CTO who forgot AI operations were happening because they just work."

That is the target state for GTCX. This document describes how we get there.

---

## What the Design Bible Established (Non-Negotiable)

These design decisions from the BaselineOS AI Design Bible v1.0 are locked. GTCX's implementation honors all of them.

### The Three Emotional Beats

Every interaction in BaselineOS must produce one of these feelings. If a feature doesn't land on one, cut it:

- **RECOGNITION** — "It already knows my org." (Zero-config init, schema inheritance cascade)
- **CONFIDENCE** — "I understand why I can trust this." (Trust score with history, self-verification evidence)
- **RELIEF** — "I didn't have to do that." (Context compression, supervisor auto-correction, overnight production cutover)

Every agent interaction in GTCX targets one of these. The agent behavior playbook enforces this — see Agent Voice section below.

### The Eight Revolutionary Moments

Each moment is a screenplay. Each must be achievable in the GTCX implementation.

| Moment                          | Trigger              | Target Emotion | What Must Never Happen               |
| ------------------------------- | -------------------- | -------------- | ------------------------------------ |
| 01 Zero-config init             | `baseline init`      | RECOGNITION    | Setup wizard, config form            |
| 02 Context compression reveal   | First task           | RELIEF         | Context window dump, manual curation |
| 03 Self-verification checkpoint | Task complete        | CONFIDENCE     | Output without evidence              |
| 04 Supervisor override          | Self-verify fails    | RELIEF         | Silent correction                    |
| 05 Trust score accumulation     | Agent profile view   | CONFIDENCE     | Score without history                |
| 06 Human escalation             | Cannot resolve       | CONFIDENCE     | "An error occurred."                 |
| 07 Inheritance cascade          | Schema change        | RECOGNITION    | "Rebuild required."                  |
| 08 Production cutover           | Shadow week complete | RELIEF         | "Go live" button                     |

GTCX Moment 01 translation: When any agent initializes in a GTCX repo, it scans the codebase, reads the ADRs, identifies protocol usage, and presents what it found. The agent does not ask "what are you working on?" It says "I found 3 TradePass integrations. One is missing Zod validation at the boundary (P2 violation). Two are current. Shall I proceed?"

### The Anti-Pattern Blacklist

Banned forever. If any GTCX agent surface contains these, it has failed:

**Interface:**

- Setup wizard at any point
- "Getting started" checklist
- Configuration form before first use
- Dropdown with more than 5 options in an agent decision surface
- Loading spinner with no narration

**Copy:**

- "An error occurred" without explanation
- "Trust us" without evidence
- "Looks good to me" as verification
- Suggestions instead of facts ("you might want to" → "I found")
- Apologies for system behavior

**Agent behavior:**

- Agent waits to be asked what it found
- Claim without evidence
- Confidence percentage without history
- Silent correction
- Question the agent could answer itself

---

## Token Efficiency — GTCX Implementation

This is the operational detail that matters at scale. Once GTCX agents are running 100+ tasks per day, token costs compound quickly without these controls.

### 5-Level Compression in Practice

The context engine auto-selects compression level based on task complexity. GTCX mapping:

| Level    | Tokens | GTCX Use Case                                       | Auto-trigger         |
| -------- | ------ | --------------------------------------------------- | -------------------- |
| Oneliner | ~20    | "What does TradePass do?"                           | Single entity lookup |
| Summary  | ~100   | "Explain GCI Score to a DFI"                        | Concept explanation  |
| Working  | ~500   | "How should I structure this service?"              | Design question      |
| Full     | ~10K   | "Implement TradePass credential issuance"           | Code generation      |
| Expanded | ~50K   | "Audit the entire protocol layer for P2 violations" | Full system review   |

**Rule:** Agents never load Full or Expanded context for tasks that Working can handle. The context engine enforces this, not the human.

### Semantic Cache Design

Three-level matching — each level faster and cheaper than the next fallback:

```
Query arrives
  → Level 1: Exact hash match (cache hit: immediate return, ~0ms)
  → Level 2: Semantic match (vector cosine > 0.92, ~8ms lookup)
  → Level 3: Pattern match (regex for common query forms, ~15ms)
  → Level 4: Cache miss → full retrieval → cache result for next time
```

GTCX steady-state targets:

- **70-80% cache hit rate** (combined Levels 1-3)
- **45% exact match** (repeated queries within sessions)
- **30% semantic match** (rephrased but equivalent queries)
- **8% pattern match** (query forms covered by regex patterns)
- **< 25% cache miss** (novel queries requiring full retrieval)

Cache statistics are visible in every session. This is ambient cost narration — users see "Estimated savings: $4.23 this session" without asking.

### Token Budget Allocation

Every agent task respects this allocation:

```
Context: 40%  — Organizational context (baseline config, ADRs, protocol specs)
Execution: 50% — Task-specific reasoning and generation
Overhead: 10% — System prompts, verification metadata, audit logging
```

Tasks that approach the token ceiling via context consumption trigger automatic level downgrade. The agent narrates this: "Compressed context from Working to Summary to fit task within budget. Confidence: 91%."

### Cost Narration Pattern

Every task completion includes:

```
Task: Implement TradePass credential validation
Tokens used: 3,847
Context tokens: 1,538 (Working level, 12 sources)
Cache savings: 6,203 tokens (~$0.19 saved vs. uncached)
Compression efficiency: 87% (vs. loading full TradePass spec)
```

This is not a report the user generates. It appears automatically. Cost awareness is ambient.

---

## Caching Architecture — GTCX Specific

### Collection-Level TTLs

Different GTCX knowledge changes at different rates. TTLs reflect this:

| Collection                    | TTL      | Rationale                                     |
| ----------------------------- | -------- | --------------------------------------------- |
| `decisions` (ADRs)            | 7 days   | ADRs rarely change                            |
| `protocols` (specs)           | 7 days   | Protocol specs are stable                     |
| `domain` (commodity model)    | 7 days   | Domain knowledge is stable                    |
| `compliance` (rules, pillars) | 24 hours | Compliance rules update moderately            |
| `errors` (known patterns)     | 24 hours | Error library grows but entries are stable    |
| `codebase` (source code)      | 1 hour   | Code changes frequently in active development |

### Cache Invalidation Triggers

Cache is invalidated automatically on:

- `baseline.config.ts` commit to main — full cache bust
- New ADR committed — `decisions` collection invalidated
- Protocol SPEC.md updated — `protocols` collection invalidated
- CI reports new P2 violation pattern — `errors` collection invalidated

Cache invalidation is silent. The next request retrieves fresh content. The user never sees a "cache cleared" notification.

---

## Memory Architecture — GTCX Scopes

### Four Persistent Scopes

| Scope     | Lives               | Populated By           | Example GTCX Content                                                |
| --------- | ------------------- | ---------------------- | ------------------------------------------------------------------- |
| Working   | Request only        | Agent scratch work     | Intermediate TradePass parsing results                              |
| Session   | Conversation        | Agent + context engine | "User is working on the protocols layer today"                      |
| Long-term | Per-agent permanent | Agent learning         | "This reviewer agent tends to flag P6 violations in 5-intelligence" |
| Shared    | Org-wide permanent  | Human decisions only   | "We use 'Member Operator' not 'user'"                               |

### Shared Memory as Organizational Learning

Every human escalation that results in a resolved terminology dispute or architecture decision updates shared memory permanently. This is the mechanism by which "the system learns."

GTCX example:

- Agent generates "user" where the Charter says "Member Operator"
- Agent self-verification misses it
- Supervisor agent escalates to human (Three-Things Contract: use "Member Operator" / use "participant" / escalate to legal)
- Human selects "Member Operator"
- Shared memory updated: `terminology.resolved['user→MemberOperator'] = true`
- No future agent in any GTCX session uses "user" in this context again

---

## Agent Voice — GTCX Implementation

The Design Bible's agent voice playbook defines four tones. GTCX maps each to specific interaction contexts:

### Tone 1: OPERATIONAL (Default)

**Trigger:** Task execution, progress reporting, standard completions
**GTCX example:**

> "TradePass credential validation implemented. P2 (Zod at API boundary) satisfied. P6 (commodity abstraction) satisfied. Self-verification: passed. 3 acceptance criteria met."

### Tone 2: ADVISORY

**Trigger:** Design questions, architecture reviews, principle enforcement
**GTCX example:**

> "Found a P6 violation in `platforms/agx/03-platform/src/trade-service.ts:47`. Commodity type is hardcoded as 'gold'. The commodity-agnostic principle requires this be a parameter. Here is the corrected version."

### Tone 3: ESCALATION

**Trigger:** Self-verification failure, supervisor disagreement, human judgment required
**GTCX example:**

> "Human judgment required. The supervisor agent and I disagree on whether this GCI Score calculation should enforce a minimum transaction history. Here is my reasoning. Here is the supervisor's. Your decision will update the compliance rules collection."

### Tone 4: ALERT

**Trigger:** Charter blocker identified, security violation, critical principle breach
**GTCX example:**

> "Charter blocker detected. The implemented AML/KYC pipeline does not align with FATF Recommendation 10 for commodity-linked transactions. This blocks CC-03. Escalating immediately."

### Fundamental Rules (from Design Bible — never violated)

1. The agent speaks first. It does not wait to be asked what it found.
2. Claims are facts, not suggestions. "I found" not "You might want to check."
3. Every claim has evidence. No claim stands alone.
4. Silence is a feature. Nothing valuable to say? Say nothing.
5. The agent never apologizes for the system. It explains, it does not excuse.
6. The agent never asks a question it could answer itself.
7. The user's time is the most expensive resource in the system.

---

## Supervision Chain — GTCX Targets

```
GTCX Agent Execution Flow:

Task received
  ↓
Baseline context loaded (auto-selected level)
RAG retrieval from gtcx-rag-pack-enterprise
  ↓
Agent executes with real Anthropic SDK call
  ↓
Self-verification (target: resolves 80% of issues)
  ├── Pass → deliver output + log + update trust score
  └── Fail → supervisor agent reviews
         ↓
         Supervisor review (target: resolves 95% combined)
         ├── Pass → deliver output + log + update trust
         └── Fail → human escalation
                  ↓
                  Three-Things Contract
                  Full context pre-loaded
                  Decision updates shared memory
                  Trust score adjusted
```

GTCX human escalation rate target: **< 5%** of tasks.

The escalation experience (from Design Bible Moment 06):

- Notification appears with full context already visible — no clicking required
- Decision framed as judgment: "Human judgment required" not "An error occurred"
- Exactly three options (Three-Things Contract), each with evidence and consequence
- Human's decision updates the lexicon permanently
- The human is asked because only a human can answer — not because checking is required

---

## The Three-Things Contract — GTCX Application

The most important interaction pattern. Applied everywhere human input is required.

**Contract:** When human input is required, present exactly three options. Not two (false binary). Not four (decision fatigue). Three options, each with:

- One-sentence description
- Evidence behind the option
- Consequence of choosing it
- Escape hatch: "None of these — escalate to [domain expert]"

**GTCX applications:**

- Terminology disputes (e.g., "gold" vs. "precious metal" vs. "critical mineral")
- Architecture choices (e.g., how ANISA connects to AGX)
- Escalation options when supervisor and agent disagree
- Configuration changes that touch Charter commitments

**Violation:** If an agent surfaces 4+ options, it failed. If it surfaces 1-2 options, it either assumed or false-binaried. Three is the contract.

---

## Production Operational Targets

Once the full agentic stack is live (all four layers per ADR-012):

| Metric                       | Target            | Rationale                                   |
| ---------------------------- | ----------------- | ------------------------------------------- |
| Cache hit rate               | 70-80%            | Steady-state token efficiency               |
| Human escalation rate        | < 5%              | Supervision chain resolves 95% autonomously |
| Self-verification pass rate  | ≥ 80%             | Agents catch their own issues               |
| Charter P0 task completion   | 100% pass CI      | Agents generate Charter-compliant code      |
| P6 violation rate            | 0%                | No hardcoded commodities in agent output    |
| P2 violation rate            | 0%                | Zod validation at all boundaries            |
| Daily token budget adherence | < 80% consumption | 20% headroom for peak days                  |
| Cost narration coverage      | 100% of tasks     | Every task reports token usage and savings  |

---

## Gap: What Must Be Built

The `baseline.config.ts` is written. The ADR is written. The Design Bible is understood.

What does not yet exist in GTCX:

### Immediate (Layer 1)

- `BaselineConfig` TypeScript type definition (`1-agentic/agentic/config/types.ts`)
- BaselineOS MCP server deployed and accessible
- Semantic cache store (Redis or SQLite for dev, Redis for production)
- Audit log storage (append-only, SHA-256 hash chain)
- Trust score persistence (PostgreSQL table in 1-agentic)

### Short-term (Layer 2)

- MCP server wrapper around `gtcx-rag-pack-enterprise`
- ChromaDB collections populated: `codebase`, `protocols`, `decisions`, `errors`, `compliance`, `domain`
- ABAC JWT claims validation middleware
- Hybrid retrieval (BM25 + vector) — not vector-only

### Medium-term (Layer 3)

- Controller class (routes tasks, manages agent lifecycle)
- Real Anthropic SDK calls in all 8 specialized agents
- Compliance gate validators (12 principles, not just types)
- Test suite

---

## The Single Most Important Principle

From the Design Bible, closing line:

> **"The schema is the product. Everything else is runtime."**

`baseline.config.ts` is not a config file. It is the encoded organizational intelligence that every GTCX agent inherits. It must be reviewed with the same rigor as a breaking API change. It must be tested when modified. It must be the first thing an engineer reads when joining the GTCX team.

Everything else — the agents, the MCP server, the Controller, the agile layer — is the runtime that executes the schema's intent.

---

## Negative Scope

This document does **not** cover:

- **Core GTCX protocol specifications (TradePass, GeoTag, GCI, etc.)**: See `01-docs/specs/` and the `gtcx-protocols/` repo for protocol-layer documentation
- **Frontend, mobile, or UI implementation details**: See `01-docs/guides/via-vxa-mobile-applications.md` and `01-docs/onboarding/` for surface-layer implementation guidance
- **Operational deployment runbooks or day-to-day agent procedures**: See `01-docs/04-ops/` for runbooks and agent operating procedures
