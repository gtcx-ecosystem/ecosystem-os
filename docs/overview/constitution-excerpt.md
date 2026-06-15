---
title: 'GTCX Ecosystem Constitution'
status: current
date: 2026-06-12
owner: canon-os
tier: operating
tags: ['protocol', 'documentation']
review_cycle: quarterly
document_type: protocol
document_id: CONSTITUTION-001
classification: internal
---

# GTCX Ecosystem Constitution

> **Living document.** Like Anthropic's [Responsible Scaling Policy](https://www.anthropic.com/responsible-scaling-policy), this constitution is revised as capability and risk evolve. Benefits must exceed costs; safeguards upgrade before scale.

---

## Preamble — why Anthropic is our primary reference

GTCX builds **AI-native infrastructure** for regulated markets. We adopt [Anthropic's](https://www.anthropic.com) public framework as our **primary governance reference** — not as vendor lock-in, but as the best-published model for aligning powerful agents with human values at scale.

| Anthropic concept | GTCX adaptation |
| ----------------- | ----------------- |
| [**Constitutional AI**](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) — train and steer models with explicit principles, not only ad-hoc corrections | **Protocols + this constitution** are the principle set every GTCX agent reads before acting |
| **Responsible Scaling Policy (RSP)** — capability thresholds trigger stronger safeguards; living document; public accountability | **Responsible Execution Policy (REP)** — multi-pillar (foundation + transformational) thresholds, Class S gates, witnesses before fleet scale |
| **AI Safety Levels (ASL)** — proportional safeguards to demonstrated capability | **Execution Safety Levels ESL-1..4** + **Authority classes S/A/R** (Protocol 28) |
| **Capability thresholds → required safeguards** | `capability-thresholds.json` — CT-* signals raise ESL before action |
| **Risk Reports & external review** — systematic disclosure; independent scrutiny | **Audit witnesses** + `audit/evidence/*-latest.json`; hostile replay (Trust pillar) |
| **Helpful, honest, harmless** — principle hierarchy for model behaviour | **Ship, prove, protect** — execute work (P27), evidence over claims, sovereign gates for harm |
| **Living organizational knowledge** | **[AI Intelligence Charter](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/reference/intelligence/GTCX-AI-INTELLIGENCE-CHARTER.md)** — Layer 1 corpus (baseline-os); refreshed topic syntheses for RAG |

We are not Anthropic. We **adapt** their discipline to a **multi-repo product fleet** building proof-based markets infrastructure.

---

## Article I — Purpose

GTCX exists to replace **permission with proof** in African and global natural-resource markets — sovereign data, auditable transactions, AI-native operator experience.

Every commit either moves toward that mission or it does not. See [Developer Manifesto](../../engineering/authoritative/ethos/manifesto/DEVELOPER-MANIFESTO.md) and the [30 Principles](../../engineering/authoritative/ethos/principles/PRINCIPLES.md).

**Non-negotiable:** infrastructure must be **auditable without trusting us** (proof, immutability, sovereignty — Principles 1–10).

---

## Article II — Constitutional agents (Anthropic Constitutional AI → GTCX)

Anthropic shows that AI systems can be steered by a **written constitution** — principles agents critique against and revise toward — rather than only by post-hoc human patches.

**GTCX rule:** Autonomous engineering agents are **constitutional agents**.

| Requirement | Implementation |
| ----------- | -------------- |
| Written principles | **This document** + [Protocols](../protocols/README.md) |
| Self-critique before harm | [Protocol 26 Proceed Brief](../protocols/agent-proceed-confirmation/protocol.md); forbidden operator menus |
| Transparency of reasoning | Proceed Brief + Status Update; `agent_trace_id` on handoffs |
| Human oversight where stakes are high | **Class S** gates — legal, sovereign, production secrets ([Protocol 28](../protocols/agent-authority-classification/protocol.md)) |
| No evasive refusal of accountability | [Protocol 27](../protocols/agent-execution-obligation/protocol.md) — run commands; report exit codes |

**Agent session order (mandatory):**

1. Read this constitution (Articles I, III, V).
2. Read [AI Acceptable Use Charter](../ai-acceptable-use-charter.md).
3. `pnpm agent:next-work` — [Protocol 22](../protocols/agent-work-selection/protocol.md).
4. Proceed Brief — [Protocol 26](../protocols/agent-proceed-confirmation/protocol.md).
5. Execute in-session — [Protocol 27](../protocols/agent-execution-obligation/protocol.md).

---

## Article III — Responsible execution (Anthropic RSP → GTCX REP)

Anthropic's RSP commits: **do not scale capability without scaling safeguards**. GTCX adopts the same shape for **engineering and fleet scale**.

### III.1 Capability thresholds

When a threshold is crossed, **upgrade safeguards before proceeding** — parallel work may continue only where explicitly `blocksIR: false`.

| Threshold type | GTCX signal | Required safeguard upgrade |
| -------------- | ----------- | -------------------------- |
| **Autonomy** | Agent can merge, deploy, or attest without human | Class **A** evidence + [Protocol 28](../protocols/agent-authority-classification/protocol.md) |
| **Fleet blast radius** | Change affects ≥2 repos or production | [Protocol 24](../protocols/cross-repo-coordination/protocol.md) handoff + witness |
| **Assurance** | Money movement, PII, sovereign crypto | Class **S** register; implement queue continues per [human gates](../../operations/human-gate-navigation.md) |
| **Quality** | Publishing pillar scores or shipping pilot | Foundation-tier (F-PiLLAR) **unlock** ≥85 on prerequisite pillars ([multi-pillar spec](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/audit/fractal-multi-pillar-audit.md)) |
| **Documentation** | External GitBook / customer-facing narrative | canon-os PublishaaS; local `docs/gitbook/` remains SoR |

### III.1b Execution Safety Levels (ESL)

Anthropic **ASL** maps to GTCX **ESL** — engineering execution tiers, not model-training tiers:

| ESL | Anthropic analogue | GTCX scope | Min P28 class |
| --- | ------------------ | ---------- | ------------- |
| **ESL-1** | ASL-1 | Single-repo Class R — ops check, compliance witness | R |
| **ESL-2** | ASL-2 | Custody — settlement gates, git safety, foundation-tier witness (`five-pillar-latest.json`) | A |
| **ESL-3** | ASL-3 | Fleet — cross-repo P24, trust replay, audit cadence | A |
| **ESL-4** | ASL-3+ sovereign | Production, money/PII — human gates + independent review | S |

**Foundation-tier publish gates:** compliance/TE/trust → ESL-1; craft → ESL-2; world-class → ESL-3. Transformational tier (T-PiLLAR) publishes after F-PiLLAR prerequisites unlock.

Spec: [execution-safety-levels.json](https://github.com/gtcx-ecosystem/bridge-os/blob/main/pm/spec/execution-safety-levels.json) · `pnpm ecosystem:esl:check`

### III.2 Living document & risk reports

Like RSP v3.0 **Risk Reports** and **Frontier Safety Roadmaps**, GTCX maintains:

| Artifact | Owner | Cadence |
| -------- | ----- | ------- |
| Master audit / fleet stress | bridge-os harness | on change + sprint boundary |
| `audit/evidence/*-latest.json` | each repo | per story / gate |
| Initiative roadmaps | bridge-os `pm/roadmap/initiatives.json` | per initiative |
| Constitution review | canon-os | quarterly |

**Principle:** Claims without fresh witnesses are **provisional** (Trust pillar confidence D).

### III.3 Benefits must exceed costs

No feature, refactor, or doc expansion ships because it is easy for agents. It ships because it **advances proof-based markets** with acceptable risk — documented in Proceed Brief and audit notes.

---

## Article IV — Planes of work

Do not collapse layers. [Execution engine](https://github.com/gtcx-ecosystem/bridge-os/blob/main/pm/spec/gtcx-execution-engine.json):

| Plane | Repo | Role |
| ----- | ---- | ---- |
| **Product** | markets-os, compliance-os, … | Execute code, local `docs/`, product witnesses |
| **Fabric** | fabric-os | Infra/policy services once (DaaS, SECaaS, legal registers) |
| **Canon** | canon-os (legacy gtcx-docs) | Constitution, protocols, doc **utilities** — not monolith of all markdown |
| **Program office** | bridge-os | Registries, harnesses, PM engine, fleet gates |
| **Runtime** | baseline-os | session → next → gates; MCP; vault |

**Product repos execute. Platform repos assure and delegate. Constitution lives in canon; machinery lives in bridge.**

---

## Article V — Authority (safeguards scale with stakes)

Adapted from Anthropic's proportional safeguards and GTCX [Protocol 28](../protocols/agent-authority-classification/protocol.md):

| Class | Who | Examples |
| ----- | --- | -------- |
| **S** | Sovereign human | Legal sign-off, pen-test SOW, H-03, explicit **stop** |
| **A** | Custodian agent + evidence | XR attestations, trust ceremony writes, authorized `gh` posts |
| **R** | Routine agent | Tests, docs, commits when gates green, P22 work |

**Hierarchy (Constitutional AI analogue):** When principles conflict, **safety and sovereignty beat speed**; **evidence beats narrative**; **protocol beats chat**.

Forbidden: treating Class **S** approval as a **merge freeze** on unrelated Class **R** work ([unblock playbook](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/main/01-docs/04-ops/coordination/ecosystem-unblock-playbook-2026-06.md)).

---

## Article VI — Work discipline

| Rule | Protocol |
| ---- | -------- |
| One story per session (owner repo) | P22 |
| Proceed Brief before substantive work | P26 |
| You run the commands | P27 |
| Durable cross-repo records | P24 |
| Nine workspace domains | P29 |

**Forbidden:** operator menus, "run locally" without in-session attempt, duplicate legal/GTM policy in product repos.

---

## Article VII — Documentation jurisdiction

**canon-os is a documentation service — not the home of all documentation.**

| Lives in canon-os | Lives in `<repo>/docs/` |
| ----------------- | ------------------------- |
| This constitution, protocols, audit methodology | Architecture, specs, ADRs, local agent entry |
| Publish utilities (GitBook sync) | `docs/gitbook/` **source markdown** |
| Templates & fleet onboarding patterns | Product narrative execution |

**Golden rule:** Fleet-wide → canon authors or templates; repo-specific → owner repo houses it.

Spec: [documentation-jurisdiction.json](https://github.com/gtcx-ecosystem/bridge-os/blob/main/pm/spec/documentation-jurisdiction.json)

---

## Article VIII — Evidence, quality, and trust

Anthropic emphasizes **eval-driven** quality and **independent verification**. GTCX uses the **multi-pillar model** (11PR: F-PiLLAR + T-PiLLAR):

| Pillar | Question | Anthropic parallel |
| ------ | -------- | ------------------ |
| **P1 Compliance** | Hygiene & protocol adherence? | Security baseline / ASL-1 |
| **P2 Technical Excellence** | Engineering depth? | Capability evals before scale |
| **P3 Craft** | Authored excellence vs commodity? | Constitutional refinement vs generic output |
| **P4 World-class** | vs global bar? | Frontier benchmarks |
| **P5 Trust & Safety** | Can scores be replayed? | External review + risk reports |

**Unlock:** P1 ≥85 before publishing P2 scores; chain continues. **Trust caps composite.**

Hygiene ≠ quality. Compliance pass is **necessary**, not **sufficient**.

### VIII.1 Documentation archival (anti-drift)

Like RSP **superseding risk reports**, only **`*-latest` witnesses** remain in active trees. Dated audit outputs and generated docs older than **24 hours** — or superseded by a newer version — move to `audit/archive/YYYY-MM-DD/`.

**Minimum audit cadence:** daily (24h witness freshness).

Spec: [documentation-archival-policy.json](https://github.com/gtcx-ecosystem/bridge-os/blob/main/pm/spec/documentation-archival-policy.json) · `pnpm ecosystem:documentation-archival:check`

---

## Article IX — Amendment

1. **Quarterly review** — canon-os owner + quality-evidence-lead.
2. **Material changes** — PR to canon-os; bridge-os harness updated if machine index changes.
3. **Protocol detail** — amend individual protocols; constitution **summarizes**, does not duplicate every norm.
4. **Versioning** — git is SoR; no parallel `CONSTITUTION-v2.md` forks ([compliance rubric](https://github.com/gtcx-ecosystem/bridge-os/blob/main/pm/spec/compliance-rubric.json)).
5. **Public commitment** — redacted fleet summaries may publish; Class S detail stays in sovereign register.

---

## Quick reference card

```text
MISSION     Proof over permission
AGENTS      Constitutional — read this + protocols before act
SCALE       Safeguards before capability (REP / RSP shape)
AUTHORITY   S > A > R — safety beats speed
WORK        P22 → P26 → P27 → witness
DOCS        canon = service; repos = home
QUALITY     Multi-pillar (F-PiLLAR + T-PiLLAR); trust caps all
```

**Machine index:** `config/gtcx-constitution.json`  
**Check:** `pnpm ecosystem:constitution:check` (bridge-os harness)

---

*Primary references: [Anthropic Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) · [Anthropic RSP](https://www.anthropic.com/responsible-scaling-policy) · GTCX [AI Acceptable Use Charter](../ai-acceptable-use-charter.md)*
