---
title: Kaleidoscope AI agent architecture
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: architecture
tier: strategic
tags: ['kaleidoscope-ai', 'agents', 'mcp', 'guardrails', 'evals']
review_cycle: weekly
---

# Kaleidoscope AI agent architecture

## Design rule

Use agents only where agency creates value.

Use deterministic extractors and validators for repeatable evidence work. Use agents for synthesis, ambiguity resolution, strategy, planning, and narrative generation. Use evaluators to check every high-value output.

## Architecture

```text
source repos
  -> extractors
  -> retrieval index
  -> ecosystem graph
  -> orchestrator
  -> specialist agents
  -> evaluator
  -> approved outputs
  -> ledger/witness
```

## Orchestrator responsibilities

The orchestrator:

- decomposes user intent
- selects retrieval mode
- selects agents
- enforces permissions
- manages handoffs
- runs evaluator passes
- requires human approval for risky actions
- writes evidence/witness output

The orchestrator should not hide unsupported assumptions. It should surface uncertainty.

## Agent roster

| Agent | Role | Inputs | Outputs |
| --- | --- | --- | --- |
| Ecosystem cartographer | Builds repo/product/dependency map | graph, package scripts, docs, audit evidence | graph deltas, dependency maps |
| Audit analyst | Scores repos and detects movement | prior audits, current evidence, scorecards | normalized audits, movement analysis |
| IP synthesizer | Finds moat and innovation patterns | graph, audits, product docs, market docs | IP briefs, defensibility map |
| Market strategist | Ranks market and venture potential | market docs, repo readiness, GTM evidence | market rankings, partner paths |
| Integration architect | Finds missing cross-repo wires | graph, configs, specs, dependencies | integration plan, blocker map |
| QA deployment analyst | Assesses tests, CI, deployment, ops | package scripts, witnesses, deployment docs | readiness report, test gaps |
| Narrative agent | Writes board/investor/partner artifacts | approved analysis, evidence map | memos, briefs, decks outlines |
| Execution planner | Converts decisions into repo tasks | blockers, graph, ownership | ticket/spec/action plan |
| Evaluator | Critiques claims and evidence quality | all outputs, graph, source citations | pass/fail, corrections, confidence |

## Handoff model

Example:

```text
user asks "which repos can reach 8.5 fastest?"
  -> orchestrator
  -> audit analyst retrieves prior/current scores
  -> ecosystem cartographer retrieves dependency blockers
  -> QA deployment analyst checks gate state
  -> market strategist adds value ranking
  -> evaluator checks evidence and claims
  -> narrative agent formats answer
```

## Tool model

Tools should be exposed through MCP where practical.

Tool categories:

- read repo file
- search repo
- read audit evidence
- run validation gate
- query ecosystem graph
- query retrieval index
- generate report
- create ticket draft
- write witness draft
- request approval

Risk classes:

| Class | Examples | Approval |
| --- | --- | --- |
| read | search, graph query, evidence read | no |
| draft | generate report, draft spec, draft ticket | no unless external |
| local verify | run non-mutating validation | no |
| local write | edit repo files, regenerate evidence | yes for production repos unless operator has authorized workstream |
| external | email, issue creation, deployment, partner docs | yes |

## Memory model

Use three memory layers:

| Memory | Purpose |
| --- | --- |
| Session memory | Current task state and decisions. |
| Graph memory | Typed operating state. |
| Evidence memory | Source documents, witnesses, audit outputs, traces. |

Do not store strategic claims only as chat memory. Promote them to graph nodes with evidence links or mark them as assumptions.

## Evaluation loops

Every major output should pass:

1. Evidence check: all claims cite sources or are labeled assumptions.
2. Staleness check: evidence dates are current enough.
3. Scope check: output stays within repo/product authority.
4. Approval check: action plan marks approval gates.
5. Regression check: compared against prior audit or graph snapshot.
6. Risk check: identifies likely false positives and overclaims.

## AI-native optimization

Kaleidoscope should optimize for:

- graph-first reasoning for operating state
- RAG for source evidence
- MCP for tool/action standardization
- evaluator loops before user-facing conclusions
- human approval gates for state-changing actions
- tracing for every agent/tool path
- snapshot comparison for movement intelligence
- structured outputs for reports, rankings, and tasks

## Research basis

- OpenAI Agents SDK supports agents, handoffs, guardrails, tracing, sessions, and MCP integration: https://openai.github.io/openai-agents-python/
- MCP defines a client-server pattern for tools, resources, and prompts: https://modelcontextprotocol.io/docs/learn/architecture
- LangGraph is useful when workflows require state, persistence, interrupts, or human-in-the-loop paths: https://docs.langchain.com/oss/python/langgraph/overview

