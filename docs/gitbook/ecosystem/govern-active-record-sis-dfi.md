---
title: 'Govern — ActiveRecord for governance (SIS / DFI reference)'
status: current
date: 2026-06-13
owner: canon-os
tier: operating
tags: ['gitbook-chapter', 'documentation']
review_cycle: quarterly
document_type: gitbook-chapter
gitbook_space: gtcx-ecosystem
sourceOfRecord: baseline-os
ticket: XR-CANON-GOVERN-GTM-001
canonicalSoR: https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/00-sis-dfi-golden-day.md
syndicatedFrom: baseline-os/docs/gitbook/ecosystem/govern-active-record-sis-dfi.md
---

# Govern — ActiveRecord for governance

> **Pointer chapter:** Engineering and GTM truth stay in **baseline-os**. Canon-os syndicates summary + URLs only — no GTM fork.

## One-line wow

**Compliance is a side effect of work, not a separate process.**

When your team emails a Tier-1 bank, closes a Nigeria trade deal, and files an inspection report the same afternoon, each interaction needs **different law and voice**. Govern makes that automatic.

---

## The problem

One ChatGPT tone. Paste compliance paragraphs. Hope someone remembers Ghana ≠ Nigeria ≠ EU.

BaselineOS replaces that with one **organizational constitution** and an **inferred regime slice** per interaction — cascaded through every OS layer before output ships.

---

## SIS golden afternoon (three constitutional orders)

**T0:** SIS Inspections · commodities · Africa · banking client graph

| Step | Operator says | What shifts |
| ---- | ------------- | ----------- |
| 1 | `terra-os: sales: fast-close: nigeria` | Speed bias · `ng:commercial` · concise sales voice |
| 2 | `generate:email @client:standardbank` | Institutional voice · `za:financial` · bank-grade comms |
| 3 | `generate:report #south-africa inspection:warehouse` | Audit fidelity · collateral-grade report · evidence bundle |

**Same operator. Same day. Zero prompt rewrites.**

Full narrative: [SIS + DFI golden day (baseline-os SoR)](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/00-sis-dfi-golden-day.md)

---

## DFI slice (sovereign finance)

| Step | Operator says | What shifts |
| ---- | ------------- | ----------- |
| IM | `generate:im #sierra-leone exploration:dfi` | Project finance · ESG · anti-corruption blocks |
| Gov relations | `regime:ghana:gov-relations focus:sovereign` | Ministry protocol · formal diplomatic register |
| Field partner | `onboard:field-partner #sierra-leone` | Plain language · consent · data minimization |

---

## How inference works

```text
Frame + task class + counterparty + data sensitivity
  → GRP (Governance Regime Profile inference)
  → activeLawProfile (strictest wins)
  → cascade → Lang · Frame · Persona · Experience · Autonomy · Studio
```

Operators rarely type regimes. They **pin** when they know better: `regime:eu:privacy`.

Normative spec: [Govern layer (baseline-os)](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/layers/govern.md)

---

## Customer segments (same stack)

| Segment | Reference profile | Business case |
| ------- | ----------------- | --------------- |
| DFI | IFC | [01-dfi-ifc](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/segments/01-dfi-ifc-business-case.md) |
| Trade bank | Afreximbank | [02-bank-afreximbank](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/segments/02-bank-afreximbank-business-case.md) |
| Continental operator | Rand Refinery | [03-rand-refinery](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/segments/03-continental-operator-rand-refinery-business-case.md) |
| Trade finance | ATG | [04-atg](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/segments/04-trade-finance-atg-business-case.md) |

Index: [Segment business cases](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/segments/README.md)

---

## Positioning guardrails

- Govern is **one OS layer** — not the whole product identity.
- Regime seeds (NDPC, AfCFTA, `bank-grade:*`) are **programmable hooks** — not certified regulatory products.
- SIS/DFI and segment stories are **reference architecture** for composability demos.

---

## Audience routing

| Audience | Entry |
| -------- | ----- |
| GTM / sales | Golden day + [demo scripts](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/03-illustrations-demo-scripts.md) + segment cases |
| Client onboarding | [Week 0–4 narrative](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/01-customer-onboarding-narrative.md) |
| Dev / integrator | [Layer guides](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/layers/guides/README.md) → spec + pack + [developer narrative](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/02-developer-docs-narrative.md) |
| Non-technical | [Layer one-pagers](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/layers/guides/one-pagers/README.md) |

---

## Go deeper

| Audience | Link |
| -------- | ---- |
| GTM pack index | [govern/README.md](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/govern/README.md) |
| Engineering | [GOVERN-PACK-001 handoff](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/layers/packs/GOVERN-PACK-001-handoff.md) |
| Institutional lexicon | [GTCX Lexicon Registry](../../governance/institutional/lexicon/README.md) |
| Lang (Layer 1) | [Organizational AI language](organizational-ai-language.md) |

---

## Related (canon-os)

- [GTCX Deliverable Registry](../../governance/institutional/deliverables/README.md) — INST-D templates
- [Compliance Officer persona](../../governance/institutional/personas/compliance-officer.md)
- Outbound: `baseline-os/workstream/coordination/outbound/to-canon-os-govern-gtm-sis-dfi-2026-06-12.md`
