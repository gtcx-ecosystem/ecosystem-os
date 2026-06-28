---
title: partner proof packet templates
status: draft
date: 2026-06-29
owner: ecosystem-os
document_type: execution-template
tier: strategic
tags: ['kaleidoscope-ai', 'partners', 'proof-packets', 'market-leadership']
review_cycle: weekly
external_use: blocked_until_explicit_approval
---

# partner proof packet templates

> Internal draft. These templates are not approved for external use.

## Purpose

The partner execution room defines the market-leadership thesis. These proof packet templates define what evidence must be assembled before any partner-specific brief is exported.

Each packet must keep four classes separate:

| Class | Meaning | Rule |
| --- | --- | --- |
| Evidence | Current source artifact, witness, audit, pilot record, or repo output. | Must cite a path and source date. |
| Inference | Reasoned conclusion from cited evidence. | Must name the evidence and confidence. |
| Assumption | Belief that is not yet proven by current evidence. | Must be labeled and tracked as a gap. |
| Approved claim | Claim allowed for external use. | Requires explicit approval and current release-gate posture. |

No packet can become partner-facing until `pnpm kaleidoscope:partner-brief:check` and `pnpm kaleidoscope:release-gates:check` pass and a human explicitly approves the specific external artifact.

## Shared Packet Skeleton

Use this structure for every partner packet:

| Section | Required content |
| --- | --- |
| Partner question | One high-value question the partner is trying to answer. |
| Decision Room answer | Cited strategic answer and confidence. |
| Partner-specific thesis | One paragraph connecting the thesis to this partner type. |
| Evidence map | Source paths, dates, owner repos, and evidence class. |
| Repo ownership | Which repos own proof, execution, governance, deployment, and field context. |
| Claim controls | Approved, internal-only, assumption, and blocked claims. |
| Proof gaps | Missing evidence that must be produced before external use. |
| Validation gates | Commands and witnesses that must pass. |
| Approval record | Explicit approval requirement and owner. |
| External version notes | What must be removed, simplified, or caveated before export. |

## Bank or DFI Packet

Partner question:

```text
Can verified commodity activity become financeable operating evidence?
```

Evidence map:

| Evidence need | Owner repo | Required source |
| --- | --- | --- |
| Commodity programme or pilot activity | `markets-os` | current programme, pilot, or market execution witness |
| Platform/runtime proof | `gtcx-os` | current product/runtime evidence |
| Compliance posture | `compliance-os` | assurance, jurisdiction, or compliance witness |
| Verification evidence | `veritas-ai` | verification method, proof path, or inspection evidence |
| Capital formation workflow | `markets-os`, `venture-os` | finance workflow, sponsor profile, investor/DFI pathway |
| Operating evidence graph | `ecosystem-os` | Decision Room, Observatory, partner brief, release gates |

Allowed internal thesis:

```text
GTCX can package commodity-market activity as evidence that banks and DFIs can inspect earlier in the diligence process.
```

Blocked external claims until proof exists:

- "Financeable assets are already live."
- "A bank or DFI has approved the workflow."
- "Credit risk is reduced by a quantified amount."
- "The system satisfies a specific regulatory capital treatment."

Validation gates:

- `pnpm kaleidoscope:decision-room:check`
- `pnpm kaleidoscope:partner-brief:check`
- current `markets-os` and `compliance-os` proof reviewed by owner repos

## Regulator or Public-Sector Packet

Partner question:

```text
Can market activity become transparent without freezing innovation?
```

Evidence map:

| Evidence need | Owner repo | Required source |
| --- | --- | --- |
| Authority model | `canon-os`, `baseline-os` | governance doctrine, schemas, approval rules |
| Compliance posture | `compliance-os` | jurisdiction and compliance evidence |
| Operating record | `ecosystem-os`, `bridge-os` | witness ledger, release gates, evidence graph |
| Market execution scope | `markets-os`, `gtcx-os` | active or proposed programme boundaries |
| Human approval | `agile-os`, `ecosystem-os` | approval record and blocked-action list |

Allowed internal thesis:

```text
The operating layer can give regulators inspectable evidence trails without forcing every process into bespoke manual reporting.
```

Blocked external claims until proof exists:

- "Regulator-approved."
- "Legally compliant in a named jurisdiction."
- "Automated enforcement."
- "Official registry of record."

Validation gates:

- governance and authority evidence reviewed
- compliance evidence refreshed
- partner brief approval explicitly granted for regulator use

## Enterprise Buyer Packet

Partner question:

```text
Can buyers inspect sourcing confidence, supplier context, and verification evidence in one operating path?
```

Evidence map:

| Evidence need | Owner repo | Required source |
| --- | --- | --- |
| Verification workflow | `veritas-ai` | inspection, verification, or proof evidence |
| Supplier or producer context | `griot-ai` | field/operator context and language/channel evidence |
| Market workflow | `markets-os`, `gtcx-os` | buyer journey, order flow, or sourcing workflow |
| Compliance and assurance | `compliance-os` | buyer-facing compliance evidence |
| Evidence room | `ecosystem-os` | cited packet, claim controls, release posture |

Allowed internal thesis:

```text
The market wedge can reduce buyer diligence friction by combining verification, supplier context, and operating records.
```

Blocked external claims until proof exists:

- "Verified supply is available now."
- "Every supplier has been validated."
- "Buyer compliance is guaranteed."
- "Traceability is end-to-end across all transactions."

Validation gates:

- commodity-specific verification proof attached
- field context evidence attached
- buyer workflow reviewed by owner repos

## Market Operator Packet

Partner question:

```text
Can a market operator launch a trusted commodity programme faster with reusable operating infrastructure?
```

Evidence map:

| Evidence need | Owner repo | Required source |
| --- | --- | --- |
| Launch workflow | `markets-os`, `gtcx-os` | programme or product launch workflow |
| Execution model | `agile-os`, `bridge-os` | owner-routed work, coordination, runner evidence |
| Evidence model | `ecosystem-os` | Observatory, Decision Room, release gates |
| Deployment model | `fabric-os` | deployment, observability, environment evidence |
| Governance model | `canon-os`, `baseline-os` | authority and schema evidence |

Allowed internal thesis:

```text
GTCX can reduce market-launch overhead by turning roles, proofs, handoffs, and validation gates into reusable operating infrastructure.
```

Blocked external claims until proof exists:

- "Launch time is reduced by a specific percentage."
- "A full marketplace can be launched out of the box."
- "Deployment is production-ready in every country."
- "All integrations are live."

Validation gates:

- launch workflow proof attached
- deployment evidence attached
- release gates pass with partner external-use approval still explicit

## Investor Packet

Partner question:

```text
Where does venture-scale defensibility come from?
```

Evidence map:

| Evidence need | Owner repo | Required source |
| --- | --- | --- |
| Ecosystem graph and evidence loop | `ecosystem-os`, `bridge-os` | graph, RAG, MCP, Observatory, Decision Room |
| Agentic maturity | `canon-os`, `baseline-os`, `ecosystem-os` | SIGNAL/MPR evidence and maturity relation |
| Market wedge | `markets-os`, `gtcx-os`, `compliance-os` | commodity-market product and compliance evidence |
| Deployment leverage | `fabric-os` | runtime, deployment, observability evidence |
| Portfolio value | `venture-os`, `ecosystem-os` | venture scorecard and evidence gaps |

Allowed internal thesis:

```text
The defensibility is the governed ecosystem intelligence loop: graph, retrieval, maturity scoring, evidence, approval boundaries, and execution routing applied to African commodity-market infrastructure.
```

Blocked external claims until proof exists:

- "Category winner."
- "Defensible moat is proven externally."
- "Revenue, customer, or partner traction exists."
- "Venture-scale returns are validated."

Validation gates:

- Decision Room and Observatory pass
- SIGNAL/MPR relation evidence is current
- partner brief evaluator passes
- traction or revenue claims removed unless directly evidenced

## Export Checklist

Before any packet leaves internal draft:

1. Replace internal-only citations with approved partner-safe evidence excerpts.
2. Remove claims marked blocked or assumption unless explicitly approved.
3. Add current source dates for every cited evidence item.
4. Confirm owner repos have reviewed their proof.
5. Run `pnpm kaleidoscope:partner-brief:check`.
6. Run `pnpm kaleidoscope:release-gates:check`.
7. Capture explicit human approval for the exact artifact and audience.
