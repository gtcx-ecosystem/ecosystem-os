---
title: Third party tool evaluation
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: research
tier: strategic
tags: ['tools', 'graph', 'rag', 'mcp', 'evals', 'observability']
review_cycle: weekly
---

# Third party tool evaluation

## Tooling principle

Kaleidoscope AI should own the canonical schema and evidence model.

Third-party tools can accelerate extraction, indexing, graph construction, evals, observability, and UX. They should not define the permanent GTCX operating graph.

## Recommended roles

| Tool | Role | Recommendation |
| --- | --- | --- |
| Graphify | Code/repo graph extraction and artifact generation | Pilot as extractor. Normalize output into GTCX schema. |
| Understand Anything | Codebase comprehension, guided graph UX, diff understanding | Pilot as comprehension layer and UX reference. Normalize output into GTCX schema. |
| OpenAI Agents SDK | Agent runtime, handoffs, guardrails, tracing, MCP | Strong candidate for orchestrator. |
| LangGraph | Durable workflow engine for long-running stateful flows | Use where state machines, interrupts, and human review paths are needed. |
| LlamaIndex | Ingestion, retrieval, structured extraction, graph/RAG workflows | Strong candidate for RAG and graph retrieval orchestration. |
| Microsoft GraphRAG | Large-corpus community summarization pattern | Use as reference or offline pilot, not first production dependency. |
| Neo4j GraphRAG | Graph-backed retrieval and graph store integration | Strong candidate if we want mature graph operations. |
| Kuzu | Embedded graph database | Strong candidate for local/dev graph snapshots. |
| Qdrant | Vector database | Strong candidate for production vector search and filtering. |
| pgvector | Postgres vector search | Use if simpler Postgres-first operations matter more than vector specialization. |
| Ragas | RAG eval metrics | Use for faithfulness, retrieval quality, answer relevance. |
| Arize Phoenix | LLM tracing and observability | Use for local/open observability and eval workflows. |
| Braintrust | Evals and experiment tracking | Consider if hosted eval operations are acceptable. |
| OpenTelemetry GenAI | Trace standardization | Use for portable observability events. |
| tree-sitter | Code parsing | Use for deterministic code graph extraction. |
| Semgrep | Static analysis | Use for security/code pattern evidence. |
| Docling, MarkItDown, Unstructured | Document parsing | Use selectively for PDFs, office docs, and heterogeneous corpora. |

## Pilot stack

Pilot on five repos:

```text
baseline-os
bridge-os
ecosystem-os
gtcx-os
markets-os
```

Run:

1. Graphify extraction.
2. Understand Anything extraction.
3. Custom audit/evidence parser.
4. LlamaIndex ingestion prototype.
5. Graph normalization into `ecosystem-graph-schema.md`.
6. RAG eval over golden questions.
7. MCP smoke over read-only tools.

## Decision criteria

| Criterion | What good looks like |
| --- | --- |
| Extraction value | Finds meaningful nodes and edges, not only file links. |
| Schema compatibility | Output maps cleanly into repo/product/spec/audit/evidence schema. |
| Determinism | Same input produces stable enough graph deltas. |
| Cost | First run and incremental run are affordable. |
| Security | Can run locally or with controlled provider settings. |
| Evidence trace | Every generated fact can point to source file or command output. |
| CI fit | Can run in non-mutating mode. |
| Noise control | Generated artifacts can be filtered and excluded from RAG loops. |

## Adoption recommendation

Use Graphify and Understand Anything now as accelerators.

Do not let either become the source of truth.

Canonical model:

```text
extractor output
-> normalization
-> ecosystem graph
-> evidence snapshot
-> Kaleidoscope intelligence
```

## Sources

- OpenAI Agents SDK: https://openai.github.io/openai-agents-python/
- MCP architecture: https://modelcontextprotocol.io/docs/learn/architecture
- LangGraph overview: https://docs.langchain.com/oss/python/langgraph/overview
- LlamaIndex docs: https://docs.llamaindex.ai/
- Graphify: https://github.com/safishamsi/graphify
- Understand Anything: https://github.com/Egonex-AI/Understand-Anything

