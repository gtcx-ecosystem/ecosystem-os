---
title: Graph RAG MCP restore plan
status: draft
date: 2026-06-28
owner: ecosystem-os
document_type: restore-plan
tier: critical
tags: ['graph', 'rag', 'mcp', 'restore', 'kaleidoscope-ai']
review_cycle: weekly
---

# Graph RAG MCP restore plan

## Objective

Restore the pioneering Graph/RAG/MCP substrate across the GTCX ecosystem and make it resilient against future config refreshes, taxonomy migrations, and generated witness churn.

The target is not just to make old checks pass. The target is to create a durable intelligence substrate for Kaleidoscope AI:

```text
repo evidence
-> normalized retrieval
-> typed ecosystem graph
-> permissioned MCP actions
-> evaluated agent workflows
-> replayable decisions and witnesses
```

## Current diagnosis

The June 11 fleet witness showed RAG/MCP green across the required consumers. The current gate does not reproduce that state.

The regression is not an MCP implementation failure. The strongest MCP implementation remains in `baseline-os` and `bridge-os`.

The regression is a config authority collision:

```text
RAG Model B config
and
BaselineOS L0 organization config
were written to the same canonical config path.
```

After June 11, repo configs that previously held `knowledge`, `include`, `exclude`, `paths`, `rag.topology`, and Model B metadata were replaced by minimal organization stubs:

```json
{
  "$schema": "gtcx://baseline-os/config/v1",
  "organization": {
    "name": "GTCX",
    "voice": "professional and clear",
    "formality": "neutral"
  }
}
```

The current validator still reads `config/baseline/baseline.config.json`, so it sees no RAG contract and fails.

## Restore principle

Do not restore by stuffing every concern back into one file.

Split authority by function:

| Concern | Proposed SoR | Reason |
| --- | --- | --- |
| Organization and style baseline | `config/baseline/baseline.config.json` | Safe target for BaselineOS L0 refresh. |
| RAG retrieval contract | `config/baseline/rag.config.json` | Prevents org refresh from erasing retrieval config. |
| MCP exposure and permissions | `config/baseline/mcp.config.json` | Makes tool/action surface explicit and reviewable. |
| Graph projection rules | `config/baseline/graph.config.json` | Maps repo-local facts into ecosystem graph entities. |
| Eval contract | `config/baseline/eval.config.json` | Separates RAG quality gates from extraction config. |

## Restore phases

### Phase 0: freeze and observe

1. Work only in isolated worktrees.
2. Record current primary branch per repo.
3. Record current dirty files per repo.
4. Do not clean witness churn unless explicitly instructed.
5. Snapshot current `validate:rag-config`, `rag:eval`, `mcp`, and graph evidence state.

Exit criteria:

- Current failure mode is reproducible.
- No primary checkout branch is changed.
- No dirty user work is overwritten.

### Phase 1: define contracts

Create versioned schemas for:

- `rag.config.json`
- `mcp.config.json`
- `graph.config.json`
- `eval.config.json`

Minimum `rag.config.json` fields:

```json
{
  "$schema": "gtcx://ecosystem-os/rag-config/v1",
  "repo": "repo-name",
  "topology": "local",
  "knowledge": [],
  "include": [],
  "exclude": [],
  "paths": {
    "index": ".baseline/index",
    "checkpoints": ".baseline/checkpoints"
  },
  "eval": {
    "golden": "config/baseline/rag-eval-golden.json",
    "mockCorpus": "config/baseline/rag-eval-mock-corpus.json"
  }
}
```

Minimum `mcp.config.json` fields:

```json
{
  "$schema": "gtcx://ecosystem-os/mcp-config/v1",
  "repo": "repo-name",
  "mode": "consumer",
  "server": "baseline-os",
  "tools": [],
  "permissions": [],
  "humanApprovalRequired": []
}
```

Minimum `graph.config.json` fields:

```json
{
  "$schema": "gtcx://ecosystem-os/graph-config/v1",
  "repo": "repo-name",
  "entities": [],
  "relations": [],
  "evidencePaths": [],
  "exclude": []
}
```

Exit criteria:

- Validators know which file owns which concern.
- No validator treats the organization baseline as the RAG SoR.

Implementation witness:

```bash
pnpm kaleidoscope:graph-rag-mcp:write
```

This emits `audit/evidence/kaleidoscope-graph-rag-mcp-latest.json` from a read-only scan of checked-out fleet repos. It is a baseline witness, not a strict restore gate yet.

Strict gate option:

```bash
pnpm kaleidoscope:graph-rag-mcp:strict
```

Strict mode fails when `restored === false`. Use it only when the local fleet checkout is pinned to the intended repo SHAs and canonical side-by-side topology. Non-canonical temp worktrees or missing sibling repos can produce topology failures that are useful for diagnosis but should not be treated as product readiness regressions.

Pinned fleet reproducibility witness:

```bash
pnpm kaleidoscope:graph-rag-mcp:pin:write
```

This emits `audit/evidence/kaleidoscope-graph-rag-mcp-strict-fleet-pin-latest.json` and `docs/business/research/kaleidoscope-ai/graph-rag-mcp-strict-fleet-pin-latest.md`. The pin witness records the sibling repo paths, remotes, branches, HEAD SHAs, and dirty-state used for a strict run. A reviewer who cannot reproduce strict pass should compare their sibling repo SHAs and topology against this pin before treating `restored=false` as a product regression.

### Phase 2: update validators

Update the validation model:

- `validate:rag-config` reads `config/baseline/rag.config.json`.
- `validate:mcp-config` reads `config/baseline/mcp.config.json`.
- `validate:graph-config` reads `config/baseline/graph.config.json`.
- A compatibility shim may read legacy `config/baseline/baseline.config.json` only when the split files do not exist.

Rules:

- Warnings for legacy configs.
- Errors for missing split configs in tier-1 repos.
- Errors for missing normative RAG excludes.
- Errors for MCP tools without permission class.
- Errors for graph entities without stable IDs.

Exit criteria:

- `baseline-os` can validate the new split config pattern.
- Existing Model B repos can be migrated without changing product code.

### Phase 3: migrate tier-0 and tier-1 repos

Tier 0:

- `baseline-os`
- `bridge-os`
- `ecosystem-os`

Tier 1:

- `gtcx-os`
- `markets-os`
- `compliance-os`
- `terminal-os`
- `ledger-ui`

Actions:

1. Add split config files.
2. Restore knowledge paths and normative excludes.
3. Preserve organization config.
4. Re-run repo-local validation.
5. Re-run RAG eval where available.
6. Emit fresh evidence.

Exit criteria:

- Tier-0 and tier-1 validators pass.
- No repo loses organization/persona config.

### Phase 4: migrate tier-2 and tier-3 repos

Repos:

- `terra-os`
- `exploration-os`
- `veritas-ai`
- `sensei-os`
- `griot-ai`
- `nyota-ai`
- `fabric-os`
- `canon-os`
- `agile-os`
- `ledger-os`
- `inspection-os`
- `venture-os`

Actions:

1. Classify each repo as hub, product, consumer, or exception.
2. Add split configs appropriate to role.
3. Add minimum RAG eval only where the repo has enough stable source material.
4. Add documented MCP exception where no MCP surface is appropriate.
5. Add graph projection for repo, product, audits, docs, dependencies, and blockers.

Exit criteria:

- Fleet check reports tier-2/3 pass or explicit accepted exceptions.

### Phase 5: promote ecosystem graph

Move `ecosystem-os` from seed graph to operating graph.

Current state:

```text
.baseline/index/index.json: useful local document index
.baseline/frame/graph.json: 1 node, 0 edges
```

Target:

```text
repo -> product
repo -> owner
repo -> audit
repo -> score
repo -> blocker
repo -> dependency
product -> market
product -> partner
feature -> spec
spec -> evidence
claim -> source
action -> witness
witness -> confidence
```

Exit criteria:

- Graph has stable typed nodes for all repos.
- Graph has dependency edges for driver repos and product repos.
- Graph has audit/evidence edges for latest normalized audits.
- Graph has a machine-readable export consumed by Kaleidoscope AI.

### Phase 6: re-green fleet gates

Required gates:

```text
baseline-os: validate:rag-config
baseline-os: rag:mcp:fleet:audit:check
bridge-os: ecosystem:rag-mcp:smoke
repo-local: validate:rag-config
repo-local: rag:eval where configured
ecosystem-os: graph:check
ecosystem-os: kaleidoscope:graph:check
```

Exit criteria:

- Fresh witness is dated after migration.
- Old June 11 witness is retained as historical, not treated as current.

## Risks

| Risk | Mitigation |
| --- | --- |
| Generated config refresh overwrites RAG again | Split SoR files and enforce validator path. |
| RAG eval passes but config is invalid | Make fleet gate depend on both config validation and eval evidence. |
| MCP exists but permissions are implicit | Require `mcp.config.json` permission classes. |
| Graph becomes a document dump | Enforce typed entity schema and evidence edges. |
| Tool extraction output is noisy | Normalize Graphify and Understand Anything outputs into canonical schema only after filtering. |

## Research references

- OpenAI Agents SDK: https://openai.github.io/openai-agents-python/
- Model Context Protocol architecture: https://modelcontextprotocol.io/docs/learn/architecture
- LangGraph overview: https://docs.langchain.com/oss/python/langgraph/overview
- LlamaIndex documentation: https://docs.llamaindex.ai/
