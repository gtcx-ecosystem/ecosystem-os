---

title: "GTCX Product Architecture Pattern"
status: "current"
date: "2026-05-24"
owner: "quality-evidence-lead"
role: "quality-evidence-lead"
tier: "operating"
tags: ["architecture", "testing"]
review_cycle: "annual"

---

# GTCX Product Architecture Pattern

**Date:** 2026-03-10
**Status:** Canonical — all products follow this model.

---

## The Pattern

Every GTCX product that is also a standalone application follows a three-layer architecture:

| Layer                | Location                                                                       | Purpose                                                                   |
| -------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Engine**           | `5-intelligence/intelligence/\{product\}/` or `1-agentic/agentic/\{product\}/` | Core logic, algorithms, models. No HTTP, no UI. Pure domain intelligence. |
| **Platform surface** | `6-platforms/platforms/\{product\}/`                                           | Web app, API routes, dashboards. Consumes the engine as a dependency.     |
| **Product repo**     | `gtcx-ecosystem/\{product\}/` or `ai-*-\{product\}/`                           | Standalone product repository. External-facing, independently deployable. |

Not every product needs all three layers. The pattern has two variants:

### Variant A: Standalone Products

Products that are independently deployable applications consumed by GTCX and potentially external customers.

| Product          | Engine                                 | Platform Surface                 | Product Repo           |
| ---------------- | -------------------------------------- | -------------------------------- | ---------------------- |
| **Veritas**      | `5-intelligence/intelligence/veritas/` | `6-platforms/platforms/veritas/` | `veritasOS` (external) |
| **BaselineOS**   | `1-agentic/agentic/baseline/`          | —                                | `ai-1-baseline/`       |
| **TerraOS**      | —                                      | —                                | `ai-6-terra/`          |
| **ComplianceOS** | —                                      | —                                | `compliance-os/`       |
| **Sensei**       | —                                      | —                                | `sensei-ai/`           |

### Variant B: Internal Intelligence Layers

Core AI capabilities consumed by products. No standalone repo — they exist to serve the ecosystem.

| Component        | Location                                    | Consumed By                    |
| ---------------- | ------------------------------------------- | ------------------------------ |
| **ANISA**        | `5-intelligence/intelligence/anisa/`        | AGX, CRX, SGX, mobile surfaces |
| **Cortex**       | `5-intelligence/intelligence/cortex/`       | All platforms (data ingestion) |
| **Underwriting** | `5-intelligence/intelligence/underwriting/` | AGX, Veritas                   |
| **SDK**          | `5-intelligence/intelligence/sdk/`          | All TypeScript consumers       |

---

## Layer Responsibilities

### Engine Layer (intelligence/ or agentic/)

- Pure domain logic — screening algorithms, governance validators, scoring models
- No framework dependencies (no NestJS, no Next.js, no Express)
- Exports TypeScript modules consumed by platform surfaces and standalone repos
- Tests live alongside the engine
- Example: Veritas screening engine (`nameSimilarity`, `VeritasScreener`, `screenAgainstList`)

### Platform Surface Layer (platforms/)

- Web applications, API routes, admin dashboards
- NestJS, Next.js, or similar framework
- Imports engine as a dependency — never duplicates engine logic
- Handles HTTP, auth, sessions, UI rendering
- Example: AGX web platform consumes ANISA intelligence + Cortex data

### Product Repo (standalone)

- Independently deployable product
- Has its own CI/CD, deployment, customer-facing documentation
- May bundle the engine directly or consume it via API
- Owns its own domain, brand surface, and release cycle
- Example: `veritasOS` — the external Veritas product

---

## Where Each Product's Engine Lives

The engine location depends on the product's domain:

| Domain                             | Engine Home                    | Rationale                            |
| ---------------------------------- | ------------------------------ | ------------------------------------ |
| AI/ML, screening, analytics, NLP   | `5-intelligence/intelligence/` | AI intelligence is intelligence      |
| AI governance, agent orchestration | `1-agentic/agentic/`           | Governance is agentic infrastructure |
| Shared types, crypto, primitives   | `2-core/`                      | Foundation layer                     |
| Verification protocols             | `3-protocols/`                 | Protocol layer                       |

---

## Key Rules

1. **Engine never imports platform.** The dependency arrow is one-way: platform → engine.
2. **No logic duplication.** If the screening algorithm exists in `intelligence/veritas/`, the platform surface in `platforms/veritas/` imports it — never reimplements it.
3. **Product repos are consumers.** They compose engines and surfaces. They do not redefine domain logic.
4. **AI intelligence lives in `intelligence/`.** Platform or web layers live in their respective folders. This boundary is non-negotiable.
5. **Commodity-agnostic (P6).** Engines are parameterized by jurisdiction, commodity type, and regulatory context — never hardcoded.

---

## Remotes

| Product      | Remote                                            |
| ------------ | ------------------------------------------------- |
| VeritasOS    | `https://github.com/gtcx-ecosystem/veritasOS.git` |
| BaselineOS   | `ai-1-baseline/` (internal)                       |
| TerraOS      | `ai-6-terra/` (internal)                          |
| ComplianceOS | `compliance-os/` (internal)                       |
| Sensei       | `sensei-ai/` (internal)                           |

---

## Visual

```
┌─────────────────────────────────────────────────────┐
│                  Product Repos                       │
│  veritasOS  │  ai-1-baseline  │  compliance-os  │ … │
└──────┬──────┴────────┬────────┴────────┬────────┘
       │               │                │
┌──────▼──────┐ ┌──────▼──────┐  ┌──────▼──────┐
│  6-platforms │ │             │  │             │
│  platforms/  │ │   (none)    │  │   (none)    │
│  veritas/    │ │             │  │             │
└──────┬──────┘ └─────────────┘  └─────────────┘
       │
┌──────▼──────────────────────────────────────────┐
│              Engine Layer                        │
│  5-intelligence/         1-agentic/              │
│  intelligence/veritas/   agentic/baseline/       │
│  intelligence/anisa/     agentic/agents/         │
│  intelligence/cortex/    agentic/config/         │
└──────┬──────────────────────────┬───────────────┘
       │                          │
┌──────▼──────────────────────────▼───────────────┐
│              Foundation                          │
│  2-core/  │  3-protocols/  │  4-infrastructure/  │
└─────────────────────────────────────────────────┘
```
