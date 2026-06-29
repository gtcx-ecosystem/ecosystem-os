---
title: Kaleidoscope AI phase 3 QA handoff
status: current
date: 2026-06-29
owner: ecosystem-os
document_type: qa-handoff
tier: strategic
tags: ['kaleidoscope-ai', 'phase-3', 'qa', 'acceptance', 'handoff']
review_cycle: on-change
---

# Kaleidoscope AI phase 3 QA handoff

## Message to QA agent

Please perform an independent QA review of the Kaleidoscope AI Phase 2 closure and Phase 3 internal product-resource work merged on 2026-06-29.

Your job is to verify whether this work is acceptable for internal Phase 3 development. It is not a production launch, not an external partner release, and not authorization to execute repo writes, tickets, deployments, publication, partner contact, investor sharing, or external distribution.

Do not use hosted GitHub CI for this review. Hosted Actions are not part of the acceptance signal for this phase. Use local validation only, and treat any GitHub billing or Actions lock as out of scope unless it changes source content or mergeability.

Start with findings. Use file and line references for every issue. If there are no blocker/high findings, say that clearly and identify remaining medium/low risks.

## Scope

Validate that the merged session work establishes a safe internal foundation for Phase 3:

- graph/RAG/MCP/eval readiness is restored and witnessed across the ecosystem;
- Phase 2 is closed for internal draft use only;
- Phase 3 product-surface response envelope is specified;
- trace/eval sink work in `fabric-os` is locally validated and audit-remediated;
- new Phase 3 internal product resources in `ecosystem-os` return approval-aware, cited, fresh product-surface envelopes;
- external use remains blocked until explicit artifact and audience approval exists.

## Review decision requested

Answer one question:

> Is the merged Kaleidoscope AI Phase 3 internal resource foundation acceptable for continued internal development?

Use one of these verdicts:

| Verdict | Meaning |
| --- | --- |
| `pass` | Acceptance criteria pass; only low-risk follow-ups remain. |
| `pass_with_follow_up` | No blocker/high issues; medium follow-ups should be tracked before service/UI expansion. |
| `fail` | One or more blocker/high issues materially break the envelope, evidence lineage, approval boundary, or local validation. |

## Merged work to review

| Repo | PR | Merge commit | Review focus |
| --- | --- | --- | --- |
| `ecosystem-os` | #36 | `e5c811e3fb98a47363d806c6c695ad1b03cc106f` | Phase 2 completion gate, witness, report, scripts, schema. |
| `ecosystem-os` | #37 | `54f0225d04b16befb5adf9c50dbdd241976960f6` | Phase 3 product surface/API spec and response envelope. |
| `ecosystem-os` | #38 | `b45705fe74915586d639b5272fc66b4611615d07` | Closure/readiness report and independent session audit. |
| `ecosystem-os` | #39 | `7000253e7efc6781ed4312fb766fdef05a2620a0` | Phase 3 resource harness for `/fleet`, `/graph`, `/signal`, `/release`, and `/phase-2`. |
| `ecosystem-os` | #40 | `3dbb316170bab56e7a232d6bf04b5d3a136e71b0` | Phase 3 resource harness extension for `/query` and `/decision-room`. |
| `ecosystem-os` | #41 | `e2953d0241d89adf2884cedb96dcee304b1a14b8` | Draft-only `/actions` and `/partner-room` resources with approval boundaries. |
| `fabric-os` | #117 | `89ceecf8038bb79709e4407695a6639097a1373a` | Trace/eval sink ops spec and schema. |
| `fabric-os` | #118 | `9e04ed7afde708502f5901a1fa61a6718cc9ee9f` | Local trace/eval sink writer, witness, runbook, scripts. |
| `fabric-os` | #119 | `8c31030731a34147e1579b5a7ea7d88ababbc02a` | Audit remediation: event IDs include canonicalized `inputRefs`; runbook points to tracked schema path. |

## Primary artifacts

Review these first:

- `platform/scripts/kaleidoscope-phase-3-resources.mjs`
- `pm/spec/kaleidoscope-ai/phase-3-resources.schema.json`
- `audit/evidence/kaleidoscope-phase-3-resources-latest.json`
- `audit/evidence/kaleidoscope-phase-3-resource-replay-latest.json`
- `docs/business/research/kaleidoscope-ai/phase-3-resources-latest.md`
- `docs/business/research/kaleidoscope-ai/phase-3-resource-replay-latest.md`
- `docs/business/research/kaleidoscope-ai/phase-3-qa-handoff-2026-06-29.md`
- `docs/business/research/kaleidoscope-ai/index.md`
- `pm/spec/kaleidoscope-ai/product-surface-api.schema.json`

The current harness covers `/fleet`, `/graph`, `/query`, `/decision-room`, `/signal`, `/actions`, `/partner-room`, `/release`, and `/phase-2`.

Expected current resource summary:

| Metric | Expected |
| --- | --- |
| Resource count | `9/9 valid` |
| Read-only resources | `7` |
| Draft-only resources | `2` |
| External use | `blocked_until_explicit_approval` |

Expected resource modes and approval states:

| Resource | Mode | Approval |
| --- | --- | --- |
| `/kaleidoscope/fleet` | `read` | `not_required/read` |
| `/kaleidoscope/graph` | `read` | `not_required/read` |
| `/kaleidoscope/query` | `read` | `not_required/read` |
| `/kaleidoscope/decision-room` | `read` | `not_required/read` |
| `/kaleidoscope/signal` | `read` | `not_required/read` |
| `/kaleidoscope/actions` | `draft` | `draft_pending_approval/draft` |
| `/kaleidoscope/partner-room` | `draft` | `blocked_until_explicit_approval/external` |
| `/kaleidoscope/release` | `read` | `blocked_until_explicit_approval/external` |
| `/kaleidoscope/phase-2` | `read` | `not_required/read` |

## Acceptance criteria

| ID | Criterion | Expected result |
| --- | --- | --- |
| qa-01 | Phase 2 closure remains internal-only. | `kaleidoscope-phase-2-completion-latest.json` says `phase-2-complete-for-internal-draft-use` and external use is blocked. |
| qa-02 | Product-surface responses conform to the envelope. | `/fleet`, `/graph`, `/query`, `/decision-room`, `/signal`, `/actions`, `/partner-room`, `/release`, and `/phase-2` responses include `resource`, `generatedAt`, `mode`, `decision`, `freshness`, `citations`, `approval`, and `witnesses`. |
| qa-03 | Responses are evidence-backed. | Every response has non-empty citations and source witness lineage. |
| qa-04 | Responses are freshness-aware. | Every response includes source dates and a freshness status. |
| qa-05 | Approval boundaries are preserved. | Read resources remain read-only; draft resources do not execute writes or external actions; release and partner-room external use stay blocked until explicit approval. |
| qa-06 | No external or write action is performed. | The runner only reads evidence and writes generated local witness/report files when `--write` is used. |
| qa-07 | Fabric trace/eval sink remediation holds. | `inputRefs` are canonicalized into event IDs and schema docs use tracked `machine/spec/...` paths. |
| qa-08 | Documentation is discoverable. | Kaleidoscope index links the handoff, Phase 3 resource schema, witness, and generated report. |
| qa-09 | File naming stays lowercase. | New files use lowercase paths. |
| qa-10 | Local validation is sufficient and recorded. | Commands below pass or document pre-existing unrelated failures. |
| qa-11 | The resource harness does not hide source truth. | Payloads are derived from existing witnesses rather than becoming a second source of truth. |
| qa-12 | Draft resources are product surfaces, not execution tools. | `/actions` and `/partner-room` expose draft state and approval requests only. |
| qa-13 | Product responses are replayable from the same witness set. | `kaleidoscope-phase-3-resource-replay-latest.json` records semantic fingerprints, witness file hashes, resource order, and approval-boundary validation for all nine resources. |

## Severity rubric

| Severity | Definition |
| --- | --- |
| Blocker | Breaks local validation, corrupts witness output, permits external use without approval, or makes a product response non-replayable from witnesses. |
| High | Violates the response envelope, omits required citations/freshness/approval state, or introduces a misleading readiness/release claim. |
| Medium | Creates ambiguity, weak discoverability, incomplete QA evidence, or a contract gap that should be resolved before service/UI promotion. |
| Low | Wording, naming, organization, or follow-up cleanup that does not affect safety, validation, or product-resource correctness. |

## Local validation commands

Run from `ecosystem-os`:

```bash
pnpm kaleidoscope:phase-3-resources:check
pnpm kaleidoscope:phase-3-resource-replay:check
pnpm docs:business:check
pnpm ops:check
pnpm test
git diff --check
```

Expected local results from the implementation session:

| Command | Expected result |
| --- | --- |
| `pnpm kaleidoscope:phase-3-resources:check` | Pass; `resources: 9/9`, `failed: 0`, `read-only: 7`, `draft-only: 2`, `external-use: blocked_until_explicit_approval`. |
| `pnpm kaleidoscope:phase-3-resource-replay:check` | Pass; `resources: 9/9`, `failed: 0`, `order: pass`, `external-use: blocked_until_explicit_approval`. |
| `pnpm docs:business:check` | Pass; `44/44`. |
| `pnpm ops:check` | Pass; `ops:check ok`. |
| `pnpm test` | Pass; `ops:check exits 0`. |
| `git diff --check` | Pass; no output. |

Run from `fabric-os` if rechecking prior merged work:

```bash
pnpm kaleidoscope:trace-eval-sink:write
pnpm kaleidoscope:trace-eval-sink:check
pnpm aiops:check
git diff --check
```

Expected prior Fabric local results:

| Command | Expected result |
| --- | --- |
| `pnpm kaleidoscope:trace-eval-sink:write` | Pass; writes local trace/eval sink witness. |
| `pnpm kaleidoscope:trace-eval-sink:check` | Pass. |
| `pnpm aiops:check` | Pass; previously `97/100`. |
| `git diff --check` | Pass. |

## Known residual risks and waivers

| Risk | Status | QA handling |
| --- | --- | --- |
| `fabric-os` docs operations gate has pre-existing hygiene failures. | Known residual. | Do not count as regression unless touched files introduce new failures. |
| `fabric-os` workspace check has a pre-existing missing `docs/agile/roadmap.md` issue. | Known residual. | Track as follow-up, not a blocker for this Phase 3 resource harness. |
| Phase 3 resources are a deterministic local harness, not a deployed service. | Intentional for MVP order. | Verify contract and evidence first; service runtime is later. |
| External use is not approved. | Intentional. | Fail QA if any artifact implies partner, investor, deployment, or publication use is allowed. |
| Hosted GitHub Actions may show `UNSTABLE` because hosted CI is locked by account/billing state. | Out of scope for this phase. | Do not use hosted CI status as a pass/fail signal. |

## Non-goals

Do not fail this review because these are not implemented yet:

- deployed API service runtime;
- UI shell;
- live vector database or managed graph database;
- production trace retention;
- external partner proof packet publication;
- autonomous ticket creation or repo-write execution;
- hosted CI execution.

Do fail this review if the current work claims any of the above is complete.

## Expected QA output

Return a concise report in this shape:

1. Findings ordered by severity, with file and line references.
2. Acceptance matrix for `qa-01` through `qa-13`.
3. Local validation commands run, including exact pass/fail results.
4. Regression check against PRs #36 through #41 and Fabric PRs #117 through #119.
5. Readiness verdict: `pass`, `pass_with_follow_up`, or `fail`.
6. Follow-up recommendations grouped as blocker, high, medium, and low.

If there are no findings for a severity level, write `none`.
