---
title: Kaleidoscope AI phase 3 QA handoff
status: draft
date: 2026-06-29
owner: ecosystem-os
document_type: qa-handoff
tier: strategic
tags: ['kaleidoscope-ai', 'phase-3', 'qa', 'acceptance', 'handoff']
review_cycle: on-change
---

# Kaleidoscope AI phase 3 QA handoff

## Message to QA agent

Please perform an independent QA review of the Kaleidoscope AI Phase 2 closure and Phase 3 internal development work.

Do not use hosted GitHub CI for this review. Hosted Actions are not part of the acceptance signal for this phase. Use local validation only, and treat any GitHub billing or Actions lock as out of scope unless it changes repo mergeability or source content.

## Scope

Validate that the merged session work establishes a safe internal foundation for Phase 3:

- graph/RAG/MCP/eval readiness is restored and witnessed across the ecosystem;
- Phase 2 is closed for internal draft use only;
- Phase 3 product-surface response envelope is specified;
- trace/eval sink work in `fabric-os` is locally validated and audit-remediated;
- new Phase 3 read-only resources in `ecosystem-os` return approval-aware, cited, fresh product-surface envelopes;
- external use remains blocked until explicit artifact and audience approval exists.

## Merged work to review

| Repo | PR | Merge commit | Review focus |
| --- | --- | --- | --- |
| `ecosystem-os` | #36 | `e5c811e3fb98a47363d806c6c695ad1b03cc106f` | Phase 2 completion gate, witness, report, scripts, schema. |
| `ecosystem-os` | #37 | `54f0225d04b16befb5adf9c50dbdd241976960f6` | Phase 3 product surface/API spec and response envelope. |
| `fabric-os` | #117 | `89ceecf8038bb79709e4407695a6639097a1373a` | Trace/eval sink ops spec and schema. |
| `fabric-os` | #118 | `9e04ed7afde708502f5901a1fa61a6718cc9ee9f` | Local trace/eval sink writer, witness, runbook, scripts. |
| `fabric-os` | #119 | `8c31030731a34147e1579b5a7ea7d88ababbc02a` | Audit remediation: event IDs include canonicalized `inputRefs`; runbook points to tracked schema path. |
| `ecosystem-os` | #38 | `b45705fe74915586d639b5272fc66b4611615d07` | Closure/readiness report and independent session audit. |

## Current Phase 3 branch under review

The active internal-development branch adds the read-only Phase 3 resource harness:

- `platform/scripts/kaleidoscope-phase-3-resources.mjs`
- `pm/spec/kaleidoscope-ai/phase-3-resources.schema.json`
- `audit/evidence/kaleidoscope-phase-3-resources-latest.json`
- `docs/business/research/kaleidoscope-ai/phase-3-resources-latest.md`
- `docs/business/research/kaleidoscope-ai/phase-3-qa-handoff-2026-06-29.md`

## Acceptance criteria

| ID | Criterion | Expected result |
| --- | --- | --- |
| qa-01 | Phase 2 closure remains internal-only. | `kaleidoscope-phase-2-completion-latest.json` says `phase-2-complete-for-internal-draft-use` and external use is blocked. |
| qa-02 | Product-surface responses conform to the envelope. | `/fleet`, `/graph`, `/signal`, `/release`, and `/phase-2` responses include `resource`, `generatedAt`, `mode`, `decision`, `freshness`, `citations`, `approval`, and `witnesses`. |
| qa-03 | Responses are evidence-backed. | Every response has non-empty citations and source witness lineage. |
| qa-04 | Responses are freshness-aware. | Every response includes source dates and a freshness status. |
| qa-05 | Approval boundaries are preserved. | Read resources remain read-only; release/external-use responses stay blocked until explicit approval. |
| qa-06 | No external or write action is performed. | The runner only reads evidence and writes generated local witness/report files when `--write` is used. |
| qa-07 | Fabric trace/eval sink remediation holds. | `inputRefs` are canonicalized into event IDs and schema docs use tracked `machine/spec/...` paths. |
| qa-08 | Documentation is discoverable. | Kaleidoscope index links the handoff, Phase 3 resource schema, witness, and generated report. |
| qa-09 | File naming stays lowercase. | New files use lowercase paths. |
| qa-10 | Local validation is sufficient and recorded. | Commands below pass or document pre-existing unrelated failures. |

## Local validation commands

Run from `ecosystem-os`:

```bash
pnpm kaleidoscope:phase-3-resources:check
pnpm docs:business:check
pnpm ops:check
pnpm test
git diff --check
```

Run from `fabric-os` if rechecking prior merged work:

```bash
pnpm kaleidoscope:trace-eval-sink:write
pnpm kaleidoscope:trace-eval-sink:check
pnpm aiops:check
git diff --check
```

## Known residual risks and waivers

| Risk | Status | QA handling |
| --- | --- | --- |
| `fabric-os` docs operations gate has pre-existing hygiene failures. | Known residual. | Do not count as regression unless touched files introduce new failures. |
| `fabric-os` workspace check has a pre-existing missing `docs/agile/roadmap.md` issue. | Known residual. | Track as follow-up, not a blocker for this Phase 3 resource harness. |
| Phase 3 resources are a deterministic local harness, not a deployed service. | Intentional for MVP order. | Verify contract and evidence first; service runtime is later. |
| External use is not approved. | Intentional. | Fail QA if any artifact implies partner, investor, deployment, or publication use is allowed. |

## Expected QA output

Return findings first, ordered by severity with file and line references. Include:

- pass/fail matrix against the acceptance criteria above;
- validation commands run and exact pass/fail result;
- any regression from the merged session baseline;
- explicit readiness verdict for Phase 3 internal development;
- follow-up recommendations split into blocker, high, medium, and low severity.
