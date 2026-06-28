---
title: phase 2 agentic product architecture
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: product-architecture
tier: strategic
tags: ['kaleidoscope-ai', 'phase-2', 'agentic-ai', 'graph', 'rag', 'mcp', 'signal']
review_cycle: weekly
---

# phase 2 agentic product architecture

## Purpose

Phase 1 restored the operating substrate: repo-local graph, RAG, MCP, and eval configuration can now be reasoned about as a fleet concern.

Phase 2 turns that substrate into Kaleidoscope AI: an ecosystem-level intelligence product that answers strategic questions, detects movement, identifies innovation/IP patterns, and converts evidence into execution plans.

The product should not be a generic chat layer over documents. It should be a decision system with evidence discipline, graph awareness, agentic maturity scoring, and controlled execution.

## Product stance

Kaleidoscope AI should be built around five product claims:

1. It knows the ecosystem as an operating graph, not just a pile of files.
2. It distinguishes evidence, inference, assumption, recommendation, and approved action.
3. It can explain movement from prior audit to current state.
4. It can synthesize market, IP, venture, and readiness narratives across repos.
5. It can turn decisions into gated work without bypassing human approval.

The strongest first workflow remains:

```text
Get GTCX to 8.5 readiness and identify the highest-value market wedge.
```

Phase 2 should make that workflow repeatable, inspectable, and shippable.

## The product

### Observatory

The Observatory is the live ecosystem intelligence surface.

It should show:

- all real repos and symlink aliases
- current graph/RAG/MCP readiness
- latest audit score and prior audit score
- movement since the last audit
- blocker severity
- driver repo dependencies
- market opportunity ranking
- SIGNAL agentic maturity
- MPR excellence/investability posture
- evidence freshness
- claim confidence

The Observatory should answer "what is true right now?" without needing an agent to improvise.

### Decision room

The Decision room is evidence-backed strategic Q&A.

It should support questions like:

- Which repos improved the most since the last audit?
- Which repos are closest to 8.5?
- What is the highest-leverage repo to unblock first?
- Which African market wedge has the strongest venture potential?
- Where is the defensible IP across the ecosystem?
- Which claims are unsupported or stale?
- Which product narrative is credible for banks, DFIs, regulators, exchanges, and operators?
- Where should Cortex stop and Kaleidoscope begin?

Every answer should include:

- direct evidence links
- reasoning path
- confidence
- stale-data warnings
- unresolved assumptions
- recommended next actions

### Execution studio

The Execution studio converts decisions into artifacts.

It should draft:

- repo audit reports
- 8.5 uplift plans
- product specs
- implementation tickets
- validation plans
- partner briefs
- investor memos
- board updates
- release gates
- MCP tool manifests
- graph projection diffs

The default mode is draft-only. Any repo edit, ticket creation, external communication, or deployment action requires explicit approval.

### Signal lab

The Signal lab operationalizes SIGNAL as the agentic maturity counterpart to MPR.

It should show:

- SIGNAL-P maturity for product intelligence
- SIGNAL-E maturity for engineering intelligence
- lowest-dimension ceiling
- bottleneck dimension
- next maturity unlock
- evidence required for the next level
- relation between agentic maturity and MPR `agenticEmpowerment`

This surface is where Kaleidoscope becomes more than audit automation. It should reveal where the ecosystem has genuine AI-native leverage and where it is only using AI as documentation or workflow assistance.

## System architecture

```text
source repos
  -> extractors
  -> normalized evidence
  -> graph projection
  -> retrieval mesh
  -> agent runtime
  -> evaluator and policy gates
  -> product surfaces
  -> witness ledger
```

### Layer 1: source repos

Source repos remain the system of record for code, docs, specs, audits, evidence, and validation scripts.

Kaleidoscope should ingest from repos, not silently become their owner.

Repo-local ownership rules:

| Repo family | Role in Phase 2 |
| --- | --- |
| `ecosystem-os` | Kaleidoscope product planning, fleet graph, cross-repo intelligence, product surfaces, fleet witnesses. |
| `baseline-os` | Schemas, contracts, scoring calibration, machine-readable specs, witness formats. |
| `bridge-os` | Runners, repo/fleet orchestration, connectors, graph/RAG/MCP checks, evidence generation. |
| `canon-os` | Governance frameworks, SIGNAL doctrine, audit definitions, operating principles. |
| `agile-os` | Work management, execution planning, task decomposition, sprint/release operating model. |
| `fabric-os` | Deployment, infra, runtime, observability, environment and platform integration. |

Product repos should expose evidence. Driver repos should provide the operating system that makes the evidence comparable, executable, and governable.

### Layer 2: normalized evidence

Kaleidoscope should normalize evidence before agents see it.

Evidence records should preserve:

- repo
- file path or command source
- source type
- generated date
- git ref when available
- extraction date
- freshness status
- related score or claim
- confidence
- primary versus derived status

Generated summaries must not be treated as primary evidence unless they link back to primary sources.

### Layer 3: typed ecosystem graph

The graph is the operating truth layer.

Core nodes:

- repo
- product
- capability
- audit
- score
- signal witness
- mpr witness
- evidence
- blocker
- dependency
- market
- partner
- claim
- assumption
- decision
- action
- validation gate

Core edges:

- repo owns product
- repo exposes capability
- repo depends on repo
- audit scores repo
- score cites evidence
- blocker affects score
- claim cites evidence
- assumption supports recommendation
- action resolves blocker
- validation gate verifies action
- market values product
- partner enables market

The graph should be the first retrieval step for strategic and operating-state questions. RAG should fill in source detail after the graph has narrowed the scope.

### Layer 4: retrieval mesh

Kaleidoscope needs hybrid retrieval, not one index.

Retrieval modes:

| Mode | Use |
| --- | --- |
| graph query | Repo relationships, blockers, scores, dependencies, product ownership, evidence lineage. |
| semantic RAG | Narrative docs, audits, specs, market research, partner strategy, architecture docs. |
| lexical search | Exact file names, command names, schema IDs, repo names, PR IDs, symlink aliases. |
| structured evidence read | JSON witnesses, scorecards, eval results, graph snapshots. |
| rerank/evaluate | High-value answers that need precision before synthesis. |

The orchestrator should choose retrieval mode explicitly and record the choice in trace output.

### Layer 5: MCP tool plane

MCP should be the standard interface for tools, resources, prompts, and repo-local context.

Initial MCP tool classes:

| Class | Examples | Default permission |
| --- | --- | --- |
| read | repo search, file read, graph query, witness read | allowed |
| verify | run non-mutating local checks, docs checks, config validation | allowed |
| draft | generate report, draft spec, draft ticket, draft memo | allowed |
| write | edit repo files, regenerate witnesses, create branches | approval required |
| external | GitHub issue/PR action, email, partner doc, deployment | approval required |

MCP should be used before A2A. A2A becomes useful when Kaleidoscope delegates to independent agents that live outside the same runtime, trust boundary, or framework. For Phase 2, the product should first get MCP, graph state, evidence, and evals right.

### Layer 6: agent runtime

Agents should be used only where agency adds value.

Use deterministic code for:

- repo discovery
- symlink detection
- schema validation
- graph projection
- score parsing
- freshness checks
- config checks
- witness generation

Use agents for:

- ambiguity resolution
- synthesis across evidence
- strategy
- market ranking
- IP pattern recognition
- execution planning
- narrative generation
- critique

The runtime should support:

- planner-router pattern
- specialist handoffs
- tool permission checks
- structured outputs
- sessions for task continuity
- trace output for every tool and agent path
- human approval interrupts
- evaluator passes before release

### Layer 7: evaluator and policy gates

Evaluator gates should run before product outputs become official artifacts.

Minimum gates:

- evidence coverage
- citation correctness
- stale evidence detection
- unsupported claim detection
- graph consistency
- score movement consistency
- SIGNAL/MPR relation consistency
- approval requirement detection
- market/IP overclaim detection
- action ownership completeness

No strategic answer should be released without a clear distinction between:

- fact
- inference
- assumption
- recommendation
- approved action

### Layer 8: witness ledger

Kaleidoscope should emit witnesses so its own work can be audited.

Witnesses:

- fleet graph snapshot
- retrieval eval witness
- answer trace witness
- audit movement witness
- SIGNAL repo witness
- MPR relation witness
- phase execution witness
- release gate witness

Witnesses should be small, machine-readable, and linked from docs or product surfaces.

## Agent roster

### Planner-router

Routes requests to deterministic checks, retrieval paths, agents, or approval flows.

Responsibilities:

- classify user intent
- select graph/RAG/search/tool path
- decompose tasks
- enforce permission classes
- preserve trace
- avoid unsupported shortcuts

### Ecosystem cartographer

Builds and explains the repo/product/dependency graph.

Outputs:

- repo map
- dependency map
- product ownership map
- graph deltas
- alias/symlink report
- graph completeness gaps

### Audit analyst

Turns prior and current audit evidence into normalized movement analysis.

Outputs:

- current score
- prior score
- movement
- blocker explanation
- 8.5 uplift path
- confidence
- missing evidence

### SIGNAL analyst

Assesses agentic maturity.

Outputs:

- SIGNAL-P level
- SIGNAL-E level
- dimension scores
- ceiling bottleneck
- next unlock
- evidence requirements
- MPR integration note

### Market strategist

Ranks market opportunities and GTM paths.

Outputs:

- African market leadership ranking
- venture potential ranking
- ecosystem integration strength
- partner path
- sales motion
- wedge narrative
- assumption register

### IP synthesizer

Finds non-obvious defensibility across the ecosystem.

Outputs:

- innovation/IP brief
- moat map
- repo-combination thesis
- evidence-backed claims
- generic-claim rejection list
- patent/trade-secret/productization questions

The IP synthesizer should look for patterns across repos, not just features inside one repo. Example classes:

- graph/RAG/MCP governance loop
- audit-to-execution transformation
- evidence-backed market intelligence
- agentic maturity scoring
- compliance-aware AI workflows
- commodity-market trust infrastructure

### QA deployment analyst

Reads test, CI, deployment, and ops evidence.

Outputs:

- readiness risk
- failing checks
- stale witnesses
- deployment blockers
- observability gaps
- release gate recommendations

### Integration architect

Finds missing wires across repos.

Outputs:

- integration plan
- contract gap
- MCP server/tool gap
- graph projection gap
- API/data boundary issue
- repo owner map

### Execution planner

Converts decisions into repo-scoped work.

Outputs:

- task plan
- owner repo
- expected files
- validation gate
- approval gate
- rollback note
- sequencing rationale

### Narrative publisher

Turns approved evidence and analysis into human-facing artifacts.

Outputs:

- board memo
- investor memo
- partner brief
- customer narrative
- product one-pager
- executive summary

### Evaluator

Critiques every high-value output.

Outputs:

- pass/fail
- missing evidence
- unsupported claim list
- stale source list
- overclaim list
- confidence adjustment
- required revision

## Agentic design patterns

### Graph-grounded planning

Start with graph state for any question about repos, dependencies, movement, blockers, scores, ownership, market, or readiness.

This prevents the common RAG failure where a semantically similar but stale document overrides current operating state.

### Plan, act, observe loop

For multi-step work:

1. Plan the route.
2. Retrieve or run deterministic checks.
3. Observe evidence.
4. Update plan.
5. Synthesize.
6. Evaluate.
7. Ask for approval when action crosses a permission boundary.

### Evaluator-optimizer loop

Use evaluator passes for high-value outputs:

- audit ranking
- 8.5 readiness plan
- market ranking
- IP synthesis
- partner/investor narrative
- repo execution plan

The evaluator should not only score style. It should check evidence quality, source dates, graph consistency, and action authority.

### Durable workflows

Long workstreams should be resumable.

Examples:

- fleet audit refresh
- SIGNAL rollout
- market ranking update
- graph projection build
- cross-repo execution plan
- partner brief package

Each workflow should have state, evidence, trace, and next-step records.

### Human approval interrupts

Approval is required for:

- repo writes
- branch pushes
- PR creation
- issue creation
- generated evidence overwrite
- partner-facing docs
- deployment action
- external communications

Agents can recommend. Operators approve.

### Structured outputs

High-value outputs should use schemas.

Examples:

- `kaleidoscope_answer`
- `repo_movement_report`
- `market_ranking`
- `ip_synthesis`
- `signal_witness`
- `mpr_signal_relation`
- `execution_plan`
- `approval_request`

Structured outputs make the product auditable and allow UI/API surfaces to render consistently.

### Snapshot diffing

Movement intelligence depends on snapshots.

Compare:

- prior audit to current audit
- prior graph to current graph
- prior RAG/MCP gate to current gate
- prior SIGNAL witness to current SIGNAL witness
- prior market ranking to current ranking

The diff should explain what changed, why it changed, and whether the change is evidence-backed.

## Role of driver operating systems

### `canon-os`

Canon owns doctrine and governance.

Phase 2 needs `canon-os` to:

- update SIGNAL framework criteria
- define maturity anti-patterns
- anchor approval and evidence doctrine
- define what claims require primary evidence
- prevent superficial agentic maturity claims

### `baseline-os`

Baseline owns machine-readable contracts.

Phase 2 needs `baseline-os` to:

- define graph, RAG, MCP, eval, SIGNAL, and answer schemas
- calibrate score bands
- encode evidence requirements
- version witness contracts
- support cross-repo compatibility checks

### `bridge-os`

Bridge owns execution runners and connectors.

Phase 2 needs `bridge-os` to:

- run repo and fleet checks
- generate witnesses
- coordinate graph projection
- expose repo-local MCP tools
- publish normalized evidence
- execute read-only and approved write workflows

### `agile-os`

Agile owns turning intelligence into work.

Phase 2 needs `agile-os` to:

- convert insights into epics, tasks, and gates
- map work to 8.5 readiness outcomes
- structure sprint and release plans
- preserve action ownership
- make cross-repo sequencing explicit

### `fabric-os`

Fabric owns runtime, deployment, and observability.

Phase 2 needs `fabric-os` to:

- define deployable architecture for product surfaces
- provide environment contracts
- define telemetry and trace sinks
- support eval and release gates in CI/CD
- connect product runtime to graph/RAG/MCP services

### `ecosystem-os`

Ecosystem owns Kaleidoscope product coherence.

Phase 2 needs `ecosystem-os` to:

- coordinate the product plan
- own fleet-level graph semantics
- own Kaleidoscope product docs and UI/API specs
- aggregate evidence from all repos
- publish strategic rollups

## Phase 2 roadmap

### P2.1: fleet graph projection writer

Goal: produce a current, queryable graph snapshot from repo-local evidence.

Deliverables:

- graph projection contract finalized
- graph writer reads all real repos
- symlink aliases mapped
- stale generated files excluded or labeled
- graph snapshot witness emitted
- graph diff emitted against prior snapshot

Primary repos:

- `ecosystem-os`
- `baseline-os`
- `bridge-os`

Exit gate:

- all real repos represented as graph nodes
- all scores and claims link to evidence or are marked as assumptions

### P2.2: unified query service

Goal: provide one query path over graph, RAG, lexical search, and structured witnesses.

Deliverables:

- query API contract
- retrieval route selector
- graph-first strategic question path
- RAG source expansion path
- lexical exact-match path
- citation and freshness metadata

Primary repos:

- `ecosystem-os`
- `bridge-os`
- `baseline-os`

Exit gate:

- golden questions return cited answers with source dates and confidence

Initial implementation:

- `pnpm kaleidoscope:query:check` runs deterministic golden questions over the latest graph snapshot.
- `pnpm kaleidoscope:query:write` emits `audit/evidence/kaleidoscope-query-service-latest.json`.
- `platform/scripts/kaleidoscope-query-service.mjs` records route selection, graph node ids, evidence paths, citations, source dates, freshness, and confidence.
- `pm/spec/kaleidoscope-ai/query-service.schema.json` is the machine contract for the P2.2 witness.

### P2.3: Observatory MVP

Goal: ship a read-only surface for ecosystem truth.

Deliverables:

- repo readiness table
- graph/RAG/MCP status
- prior/current score movement
- blocker heatmap
- SIGNAL/MPR columns
- evidence freshness indicator
- symlink alias warning surface

Primary repos:

- `ecosystem-os`
- `fabric-os`
- `bridge-os`

Exit gate:

- Observatory can answer "what changed since the last audit?" from current evidence

Initial implementation:

- `pnpm kaleidoscope:observatory:check` reads the graph snapshot, query witness, SIGNAL fleet witness, and per-repo MPR witnesses.
- `pnpm kaleidoscope:observatory:write` emits `audit/evidence/kaleidoscope-observatory-latest.json` and `docs/business/research/kaleidoscope-ai/observatory-latest.md`.
- The witness includes repo readiness, graph/RAG/MCP status, blocker heatmap inputs, SIGNAL/MPR columns, evidence freshness, symlink alias warnings, and an explicit current-evidence answer to "what changed since the last audit?"

### P2.4: Decision room MVP

Goal: ship evidence-backed strategic Q&A.

Deliverables:

- question classifier
- retrieval trace
- structured answer output
- evaluator pass
- citations and assumptions
- confidence display
- unsupported-claim warnings

Primary repos:

- `ecosystem-os`
- `bridge-os`
- `baseline-os`
- `canon-os`

Exit gate:

- top strategic questions pass citation and stale-evidence gates

Initial implementation:

- `pnpm kaleidoscope:decision-room:check` evaluates four strategic questions for market leadership, venture potential, ecosystem integration, and execution focus.
- `pnpm kaleidoscope:decision-room:write` emits `audit/evidence/kaleidoscope-decision-room-latest.json` and `docs/business/research/kaleidoscope-ai/decision-room-latest.md`.
- The witness includes question classification, retrieval trace, structured answers, assumptions, citations, confidence, unsupported-claim warnings, and evaluator gates.

### P2.5: SIGNAL runner and MPR integration

Goal: make agentic maturity measurable like MPR.

Deliverables:

- updated SIGNAL criteria
- SIGNAL schema
- repo runner
- fleet runner
- sample repo witnesses
- MPR `agenticEmpowerment` relation
- Signal lab product spec

Primary repos:

- `canon-os`
- `baseline-os`
- `bridge-os`
- `ecosystem-os`

Exit gate:

- every real repo can emit a SIGNAL witness or a structured "not enough evidence" witness

### P2.6: Execution studio draft mode

Goal: turn insights into gated work artifacts.

Deliverables:

- 8.5 uplift plan generator
- task/spec draft generator
- validation plan generator
- approval request format
- repo owner routing
- release gate output

Primary repos:

- `agile-os`
- `ecosystem-os`
- `baseline-os`
- `bridge-os`

Exit gate:

- every draft action includes owner repo, evidence, validation gate, and approval status

### P2.7: eval, safety, and release hardening

Goal: make Kaleidoscope safe enough for strategic use.

Deliverables:

- golden question set
- retrieval eval runner
- answer eval runner
- unsupported-claim fixture set
- stale-evidence fixture set
- trace witness
- release checklist

Primary repos:

- `baseline-os`
- `bridge-os`
- `canon-os`
- `fabric-os`
- `ecosystem-os`

Exit gate:

- product release cannot pass if high-value answers lack citations, freshness, confidence, and approval boundaries

## Near-term backlog

| Priority | Work item | Owner repo | Output |
| ---: | --- | --- | --- |
| 1 | Define Kaleidoscope answer schema | `baseline-os` | schema for cited answers, assumptions, confidence, and actions |
| 2 | Define graph snapshot witness | `baseline-os` | machine-readable graph witness contract |
| 3 | Implement fleet graph projection writer | `bridge-os` | graph snapshot and diff runner |
| 4 | Add graph/RAG/MCP status API contract | `ecosystem-os` | Observatory data contract |
| 5 | Update SIGNAL framework criteria | `canon-os` | SIGNAL v1.1 criteria with graph/RAG/MCP and eval evidence |
| 6 | Add SIGNAL repo witness schema | `baseline-os` | `signal-repo-witness` schema |
| 7 | Implement SIGNAL repo/fleet runner | `bridge-os` | repo and fleet witnesses |
| 8 | Draft Observatory UI/API spec | `ecosystem-os` | product spec for read-only first surface |
| 9 | Define trace and eval sinks | `fabric-os` | deployable observability contract |
| 10 | Define 8.5 uplift task format | `agile-os` | execution artifact contract |

## Key product decisions

### Decision 1: graph first, RAG second

Strategic questions should start from graph state, then use RAG for supporting text and context.

Reason:

- graph state is better for current operating truth
- RAG is better for narrative and source context
- many ecosystem failures come from stale generated docs being treated as current truth

### Decision 2: MCP first, A2A later

MCP should be the Phase 2 tool and context standard.

A2A should be evaluated later for independent agent collaboration across different runtimes or external partners.

Reason:

- Phase 2 primarily needs controlled access to repo tools, graph resources, witnesses, and local validation
- MCP is the right fit for agent-to-tool and agent-to-resource access
- A2A is valuable when multiple independent agents need to discover and collaborate with each other across boundaries

### Decision 3: deterministic gates before agent synthesis

Repo discovery, schema validation, symlink detection, graph projection, score extraction, and stale-evidence checks should be deterministic.

Agents should synthesize after those checks.

Reason:

- this keeps audits reproducible
- this reduces hallucinated repo state
- this lets evals catch errors before narrative generation

### Decision 4: Signal lab is a product surface, not just an audit metric

SIGNAL should become a first-class product surface because agentic maturity is strategic.

Reason:

- it explains whether AI-native claims are real
- it shows the bottleneck to maturity
- it links agentic capability to market readiness and venture potential
- it helps prioritize graph/RAG/MCP, eval, trace, and deployment investments

### Decision 5: every insight must become either a claim, assumption, or action

Insights are only useful if Kaleidoscope can preserve their status.

Reason:

- claims need evidence
- assumptions need labels
- actions need owners and gates
- decisions need traceability

## Innovation and IP thesis

The most compelling IP is not "AI audits" or "chat with repos." Those are generic.

The defensible opportunity is an ecosystem operating intelligence layer that combines:

- graph-governed repo/product/dependency state
- evidence-backed audit movement
- agentic maturity scoring through SIGNAL
- market and partner intelligence
- controlled execution planning
- MCP-standardized tool access
- human approval for state-changing work
- witness-based traceability

This creates a product pattern:

```text
operating evidence -> graph state -> strategic synthesis -> gated execution -> witness -> movement
```

The differentiated insight is that Kaleidoscope can become the operating system for ecosystem-level judgment. It can decide where readiness, market wedge, partner path, IP, and execution capacity converge.

Potential protectable assets:

- graph schema for commodity-market trust infrastructure
- scoring calibration across audit, MPR, SIGNAL, and market readiness
- evidence lineage model for AI-generated strategic decisions
- repo-to-market opportunity graph
- agentic maturity witness format
- evaluator fixtures for unsupported strategic claims
- audit-to-execution workflow design
- approval and witness ledger for AI-assisted ecosystem operations

## Research basis

This Phase 2 plan uses the following current public design references:

- OpenAI Agents SDK: agents, tools, handoffs, guardrails, tracing, sessions, human-in-the-loop paths, and MCP integration: https://openai.github.io/openai-agents-python/
- Model Context Protocol architecture: clients, servers, tools, resources, prompts, and dynamic capability discovery: https://modelcontextprotocol.io/docs/learn/architecture
- A2A Protocol: agent-to-agent communication and its complementarity with MCP: https://a2a-protocol.org/latest/
- LangGraph: stateful, durable, human-in-the-loop, long-running agent workflows: https://docs.langchain.com/oss/python/langgraph/overview

## Open questions

- Which graph backend should become the canonical first implementation: local JSON graph, SQLite, Neo4j, or a property graph service?
- Should Observatory ship as a static generated report first or a service-backed UI?
- Which repos should expose first-class MCP servers versus only config/resources?
- Should SIGNAL be calibrated at repo level first, product level first, or both in parallel?
- What is the minimum golden question set for strategic release readiness?
- Which partner/investor narratives are allowed to use Kaleidoscope outputs before release gates are hardened?

## Phase 2 definition of done

Phase 2 is done when:

- Kaleidoscope can ingest all real repos and map aliases.
- The graph snapshot is current, queryable, and witnessed.
- The retrieval mesh can answer golden strategic questions with citations.
- Observatory shows current readiness, movement, blockers, SIGNAL, MPR, and evidence freshness.
- Decision room produces cited, evaluated strategic answers.
- Execution studio drafts gated work artifacts.
- SIGNAL repo/fleet witnesses exist or report structured evidence gaps.
- Human approval boundaries are enforced.
- Release gates catch stale evidence and unsupported strategic claims.
- Kaleidoscope can explain the highest-value path to 8.5 readiness and the strongest market wedge from current evidence.
