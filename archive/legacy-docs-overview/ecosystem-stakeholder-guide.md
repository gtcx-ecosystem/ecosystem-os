---
title: 'GTCX Agentic — Enterprise Overview & Stakeholder Guide'
status: current
date: 2026-05-22
owner: protocol-architect
tier: operating
tags: [['overview', 'enterprise', 'gtm', 'architecture', 'agentic']]
review_cycle: bi-weekly
document_type: protocol
role: protocol-architect
---

# GTCX Agentic — Enterprise Overview & Stakeholder Guide

> **Single source of truth for executives, enterprise buyers, internal stakeholders, and new team members.**  
> **Current audit composite:** 9.9/10 (docs standard) | **RAG tests:** 21/21 passing | **ESLint plugin:** 5 rules | **Cross-repo audits:** 7 repos scored  
> **Last updated:** 2026-05-22 | **Next review:** 2026-06-05

---

## Executive Summary

> **Single source of truth for executives, enterprise buyers, internal stakeholders, and new team members.**

## How to Use This Document

| Stakeholder                | Read These Sections | Time   |
| -------------------------- | ------------------- | ------ |
| **Executive / Investor**   | 1, 2, 3, 5, 8, 10   | 8 min  |
| **Enterprise Buyer / DFI** | 1, 3, 4, 5, 8, 11   | 12 min |
| **New Team Member**        | 1, 2, 6, 7, 9, 12   | 15 min |
| **Technical Evaluator**    | 1, 4, 8, 9, 10      | 10 min |
| **Partner / Integrator**   | 1, 4, 5, 9, 11      | 10 min |

---

## 1. Executive Brief

### What GTCX Agentic Is

GTCX Agentic is the **AI agent orchestration and governance layer** for the GTCX ecosystem. It coordinates autonomous agents across 12 repositories, enforces documentation standards, maintains a RAG knowledge index, and provides the trust and governance substrate that keeps the ecosystem coherent.

Unlike a single AI assistant, GTCX Agentic is a **multi-agent operating system**:

- **Orchestrator** — decides which agent does what, when, with what trust level
- **Knowledge Engine** — ChromaDB-backed RAG with cross-repo indexing
- **Governance Layer** — ABAC roles, trust scores, approval chains, Charter commitment tracking
- **Audit Framework** — Automated docs scoring, link checking, forensic evidence collection
- **MCP Server** — BaselineOS integration for external tool consumption

### The Problem We Solve

The GTCX ecosystem spans 12 repositories, 6 Charter commitments, and hundreds of contributors. Without orchestration:

- **Documentation drifts** across repos — no unified standard, no automated enforcement
- **Cross-repo integration breaks silently** — dependency graph is architectural intent, not package reality
- **Charter commitments stall** — 5 of 6 are blocked by cross-repo coordination failures, not individual capacity
- **Agent actions go unaudited** — no trust model, no escalation chains, no governance
- **Knowledge is fragmented** — 118+ docs across repos with no unified search or indexing

### Our Solution

GTCX Agentic closes this gap with a **closed-loop governance system**:

```
BaselineOS Primitives (trust, identity, ABAC)
    ↓
Knowledge Index (ChromaDB + cross-repo RAG)
    ↓
Agent Orchestrator (personas, priorities, trust scores)
    ↓
Governance Engine (approvals, escalation, audit)
    ↓
Cross-Repo Coordination (sprint alignment, blocker detection)
    ↓
Audit & Evidence (scoring, compliance, forensic docs)
    ↓
[Loop — each cycle makes the ecosystem more coherent]
```

### Key Metrics at a Glance

| Metric                      | Value         | Evidence                                                                                                                                                                     |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Docs standard score         | 9.9/10        | [`01-docs/05-audit/docs-standard-compliance-2026-05-22-final.md`](../../audit/README.md)                                     |
| RAG validation tests        | 21/21 passing | [`agentic/tests/rag-index-validation.test.ts`](https://github.com/gtcx-ecosystem/canon-os/tree/main/../agentic/tests/rag-index-validation.test.ts)                          |
| ESLint plugin rules         | 5 rules       | [`03-platform/packages/eslint-plugin-gtcx-docs/index.js`](https://github.com/gtcx-ecosystem/gtcx-agentic/tree/main/../03-platform/packages/eslint-plugin-gtcx-docs/index.js) |
| Cross-repo audits completed | 7 repos       | [`01-docs/05-audit/sister-repo-audit-2026-05-22.md`](../../audit/README.md)                                                                               |
| Agent specs created         | 12 repos      | [`01-docs/agent-specs/`](../agents/provisioning/AGENT-INIT-CANON.md)                                                                                                                                    |
| Integration wires tracked   | 10 wires      | [`01-docs/agent-specs/integration-matrix.md`](../agents/provisioning/AGENT-INIT-CANON.md)                                                                                          |
| Charter commitments         | 6 active      | [`01-docs/architecture/ecosystem-agentic-integration.md`](./ecosystem-integration.md)                                                                  |
| Ecosystem repos             | 12            | [`gtcx-agile/03-platform/src/ecosystem-graph.ts`](https://github.com/gtcx-ecosystem/canon-os/tree/main/../gtcx-agile/03-platform/src/ecosystem-graph.ts)                    |

### Current Stage

**S6 — External Validation.** 9.9/10 docs standard achieved. Pen-test and SOC 2 Type II pending external vendors (Q3–Q4 2026).

**Critical path blockers (3):**

1. **CC-01 (Protocol standardization)** — `enforceStubGuard` not 100% across services
2. **CC-02 (Mobile stability)** — Mobile crashes linked to backend API changes
3. **CC-06 (Intelligence rigor)** — ANISA uses `random.choice()` not real inference

> **Honest assessment:** GTCX Agentic is the most mature docs and governance layer in the ecosystem. The remaining gaps are cross-repo coordination failures, not agentic capability gaps. See §8 for full risk register.

---

## 2. Strategic Context

### Vision

**Every GTCX repository operates with perfect agentic coherence.**

### Mission

Build the definitive orchestration layer for the GTCX ecosystem — auditable, autonomous, and architected for multi-repo scale.

### Category-Defining Opportunity

Multi-repo AI orchestration in open ecosystems is an **emerging capability** with no category leader. Existing solutions (GitHub Copilot, Cody, single-repo RAG) are:

- **Single-repo only** — cannot reason across repository boundaries
- **No governance** — no trust scores, no approval chains, no audit trails
- **No ecosystem awareness** — no dependency graph integration, no Charter commitment tracking
- **Static knowledge** — no automated re-indexing, no drift detection

GTCX Agentic is the first system designed **from the ground up** for multi-repo agentic orchestration: trust models that span repositories, cross-repo RAG with semantic search, automated docs compliance, and Charter commitment tracking.

### Innovation & Moat

| Moat Layer          | What It Is                                       | Why It Defends                                                                                                       |
| ------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Knowledge Moat**  | ChromaDB index of 12 repos with semantic search  | 3+ years of architecture decisions, ADRs, and specs; a competitor can build an orchestrator, not an ecosystem memory |
| **Trust Moat**      | Deterministic trust model with growth/decay math | `trustGrowthRate: 0.02`, `trustDecayRate: 0.05`; one escalation wipes ~4 successes — mathematically rigorous         |
| **Governance Moat** | ABAC roles + approval chains + audit trails      | Every agent action is logged, scored, and reviewable                                                                 |
| **Ecosystem Moat**  | GTCX dependency graph integration                | Network effects — every new repo makes the orchestrator more valuable                                                |

---

## 3. Market & Customer Intelligence

### Market Sizing

| Segment | Value              | Rationale                                                    |
| ------- | ------------------ | ------------------------------------------------------------ |
| **TAM** | $50B+              | Global DevOps + AI orchestration tooling (2026, Gartner)     |
| **SAM** | $2–5B              | Multi-repo AI governance for enterprise engineering teams    |
| **SOM** | $5–15M ARR by 2030 | 10–20 enterprise tenants × $5K–$20K/mo + ecosystem contracts |

### Target Segments

| Segment                          | Priority | Annual Contract Value | Sales Cycle | Current Status                 |
| -------------------------------- | -------- | --------------------- | ----------- | ------------------------------ |
| **GTCX Ecosystem Repos**         | P0       | Internal              | Ongoing     | 12 repos under management      |
| **Enterprise Engineering Teams** | P1       | $60K–$240K            | 3–6 months  | Framework ready                |
| **Open Source Communities**      | P2       | Free / Sponsored      | N/A         | gtcx-agentic patterns reusable |
| **Consulting / SI Partners**     | P3       | $24K–$48K             | 2–4 months  | Partner framework pending          |

### Customer Personas & Jobs-to-be-Done

| Persona         | Role                  | Primary JTBD                                                        | Pain Point                                           | Agentic Solution                                            |
| --------------- | --------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| **Amina**       | Engineering Lead, DFI | "Ensure my 10-repo ecosystem stays coherent without manual audits"  | Docs drift, broken links, missing standards          | Automated docs standard enforcement with CI gates           |
| **Jean-Pierre** | Protocol Architect    | "Track 6 Charter commitments across 12 repos without losing signal" | Spreadsheets, manual status updates, blockers hidden | Real-time Charter tracking with dependency graph awareness  |
| **Dr. Osei**    | Security Auditor      | "Prove compliance with evidence that doesn't go stale"              | Evidence scattered, manually collected, untraceable  | Automated evidence collection with RAG-indexed audit trails |
| **Kai**         | Platform Engineer     | "Onboard AI agents that don't break production"                     | No trust model, no approval chains, no rollback      | ABAC governance with supervisor review thresholds           |

---

## 4. Product & Capability Architecture

### Core Capabilities

| #   | Capability                      | Maturity      | Evidence                                                                   |
| --- | ------------------------------- | ------------- | -------------------------------------------------------------------------- |
| 1   | **RAG Knowledge Index**         | ✅ Production | ChromaDB + 12-repo indexing; 21/21 validation tests passing                |
| 2   | **Agent Orchestrator**          | ✅ Production | 3 personas (builder, reviewer, agile); max 8 concurrent agents             |
| 3   | **Trust Model**                 | ✅ Production | Deterministic math; default 70; growth 0.02; decay 0.05                    |
| 4   | **ABAC Governance**             | ✅ Production | 5 roles; requireApproval for production config                             |
| 5   | **Docs Standard Enforcement**   | ✅ Production | ESLint plugin (5 rules); CI gate; 9.9/10 score                             |
| 6   | **Cross-Repo Link Checker**     | ✅ Production | `.markdown-link-check.json` + CI validation                                |
| 7   | **Exemption Registry**          | ✅ Production | [`01-docs/05-audit/exemption-registry.md`](../../audit/README.md) |
| 8   | **Audit Framework**             | ✅ Production | Automated scoring; sister-repo audits; forensic prompts                    |
| 9   | **Charter Commitment Tracking** | ⚠️ Partial    | 5 of 6 blocked by cross-repo failures                                      |
| 10  | **MCP Server Integration**      | ✅ Production | BaselineOS MCP consumed; cross-repo orchestration planned                  |

### Capability Maturity Summary

```
Overall:   █████████░  9.9/10  (docs standard — enterprise grade)
Code:      █████████▌  9.5/10  (zero TS errors, 21/21 tests, custom ESLint plugin)
Security:  ████████░░  8.0/10  (threat model, key rotation, incident response defined)
Resilience: ███████▌░  7.5/10  (cross-repo link checker; RAG validation)
Ecosystem: █████▌░░░  5.5/10  (7 repos audited; only 2 have real @gtcx/* deps)
Agentic:   ███████▌░  7.5/10  (single-repo mature; cross-repo wires partial)
```

Source: [`01-docs/05-audit/docs-standard-compliance-2026-05-22-final.md`](../../audit/README.md)

---

## 5. Go-to-Market & Commercial Model

### Value Model

GTCX Agentic is not a direct revenue product — it is an **ecosystem capability multiplier**. Its value is realized through:

| Value Stream            | Mechanism                      | Measurable Impact                                               |
| ----------------------- | ------------------------------ | --------------------------------------------------------------- |
| **Docs coherence**      | Automated standard enforcement | 9.9/10 score vs. ecosystem average of 62/100                    |
| **Charter velocity**    | Cross-repo blocker detection   | 6 commitments tracked, escalation paths defined                 |
| **Audit efficiency**    | Automated evidence collection  | 7 repo audits in 1 sprint vs. weeks manually                    |
| **Agent governance**    | Trust model + ABAC             | Zero ungoverned agent deployments                               |
| **Knowledge retention** | RAG-indexed ecosystem memory   | 12-repo semantic search; no knowledge loss on contributor churn |

### Adoption Motion

| Stage          | Activity                                       | Owner              | Timeline  |
| -------------- | ---------------------------------------------- | ------------------ | --------- |
| 1. Discovery   | Ecosystem repo identifies 01-docs/agentic gap  | Repo lead          | Week 0    |
| 2. Assessment  | `gtcx-agentic` runs audit + scores repo        | Agent:orchestrator | Week 1    |
| 3. Remediation | Per-repo remediation spec created              | Agent:builder      | Weeks 2–4 |
| 4. Integration | Repo adopts `@baselineos/core`, `@gtcx/core`   | Repo agent         | Weeks 4–8 |
| 5. Governance  | Repo added to cross-repo link checker          | Agent:orchestrator | Week 8+   |
| 6. Continuous  | Automated audits, RAG reindex, drift detection | Agent:orchestrator | Ongoing   |

---

## 6. Organizational Context

### Team Structure

| Role                         | Responsibility                                                  | Owner Alias                | Review Cycle |
| ---------------------------- | --------------------------------------------------------------- | -------------------------- | ------------ |
| **Protocol Architect**       | System design, roadmap, cross-repo integration, audit oversight | `protocol-architect`       | Bi-weekly    |
| **Crypto Security Engineer** | Threat models, key rotation, incident response                  | `crypto-security-engineer` | Bi-weekly    |
| **Frontier Infra Engineer**  | CI/CD, RAG infrastructure, observability                        | `frontier-infra-engineer`  | Weekly       |
| **Quality Evidence Lead**    | Test strategy, docs standard, audit evidence, lint rules        | `quality-evidence-lead`    | Weekly       |
| **Product Lead**             | GTM, Charter prioritization, stakeholder communication          | `product-lead`             | Weekly       |

### Decision Rights (RACI)

| Decision                       | R                  | A                  | C                            | I              |
| ------------------------------ | ------------------ | ------------------ | ---------------------------- | -------------- |
| Architecture changes           | Protocol Architect | Protocol Architect | Infra Engineer, Quality Lead | Product Lead   |
| Security findings (P1)         | Crypto Engineer    | Protocol Architect | Infra Engineer, Quality Lead | Product Lead   |
| Docs standard changes          | Quality Lead       | Protocol Architect | All repo leads               | —              |
| Charter commitment changes     | Protocol Architect | Protocol Architect | Product Lead                 | —              |
| Cross-repo integration changes | Protocol Architect | Protocol Architect | Infra Engineer               | All repo leads |
| Production config changes      | Agent:orchestrator | Human:architect    | Agent:reviewer               | —              |
| External vendor selection      | Product Lead       | Protocol Architect | Crypto Engineer              | —              |

---

## 7. Operating Model

### Development Rhythm

| Activity              | Cadence    | Evidence                                                                                                                                                           |
| --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sprint planning       | Bi-weekly  | [`01-docs/roadmap/roadmap-2026-q3.md`](roadmap/roadmap-2026-q3.md)                                                                                                 |
| Commit review         | Every PR   | GitHub Actions: lint, typecheck, test, build                                                                                                                       |
| RAG validation        | Every PR   | 21/21 tests in [`agentic/tests/rag-index-validation.test.ts`](https://github.com/gtcx-ecosystem/canon-os/tree/main/../agentic/tests/rag-index-validation.test.ts) |
| Docs standard audit   | On-change  | ESLint plugin + CI gate                                                                                                                                            |
| Cross-repo link check | Weekly     | [`03-platform/scripts/validate-cross-repo-links.sh`](https://github.com/gtcx-ecosystem/canon-os/tree/main/../03-platform/scripts/validate-cross-repo-links.sh)    |
| Sister-repo audit     | Per sprint | [`01-docs/05-audit/sister-repo-audit-2026-05-22.md`](../../audit/README.md)                                                                     |
| Master audit          | Monthly    | [`01-docs/05-audit/`](../../audit/README.md)                                                                                                                                   |

### Quality Gates

| Gate                  | Threshold | Current  | Owner           |
| --------------------- | --------- | -------- | --------------- |
| TypeScript errors     | 0         | 0 ✅     | Quality Lead    |
| ESLint warnings       | 0         | 0 ✅     | Quality Lead    |
| RAG validation tests  | 21/21     | 21/21 ✅ | Quality Lead    |
| Docs standard score   | ≥ 9.0     | 9.9 ✅   | Quality Lead    |
| Secret scan           | 0 leaks   | 0 ✅     | Crypto Engineer |
| Cross-repo link check | 0 broken  | 0 ✅     | Infra Engineer  |

---

## 8. Trust, Security & Compliance Architecture

### Certification State

| Certification           | Status         | Target Date | Evidence                                                             |
| ----------------------- | -------------- | ----------- | -------------------------------------------------------------------- |
| **SOC 2 Type I**        | 🟡 In progress | Q3 2026     | [`01-docs/10-compliance/dpia.md`](../../ops/compliance/README.md)             |
| **SOC 2 Type II**       | 🔴 Not started | H1 2027     | Requires Type I + 6-month observation                                |
| **ISO 27001**           | 🔴 Not started | H2 2027     | Gap analysis pending                                                 |
| **GDPR / POPIA / NDPR** | 🟡 Partial     | Q3 2026     | DPIA draft; [`01-docs/10-compliance/dpia.md`](../../ops/compliance/README.md) |

### Security Posture Summary

| Dimension                      | Score  | Status       | Key Controls                                           |
| ------------------------------ | ------ | ------------ | ------------------------------------------------------ |
| Authentication & Authorization | 8.0/10 | ✅ Strong    | ABAC roles, trust scores, supervisor review thresholds |
| Data Protection                | 8.0/10 | ✅ Strong    | RAG excludes screening events; no PII in vector DB     |
| Input Validation               | 8.5/10 | ✅ Strong    | Zod schemas, ESLint plugin, markdown link checker      |
| Dependency Security            | 8.0/10 | ✅ Strong    | pnpm audit, SBOM, Trivy scan                           |
| Infrastructure Security        | 8.0/10 | ✅ Strong    | K8s manifests in `gtcx-infrastructure`                 |
| Compliance Posture             | 7.5/10 | 🟡 Improving | DPIA draft, risk register, regulatory mapping          |

Full report: [`01-docs/09-security/`](../../ops/security/README.md)  
Threat model: [`01-docs/09-security/threat-model.md`](../../ops/security/README.md)

### Risk Register

| #   | Risk                                              | Likelihood | Impact | Mitigation                                     | Owner              | Status        |
| --- | ------------------------------------------------- | ---------- | ------ | ---------------------------------------------- | ------------------ | ------------- |
| 1   | Cross-repo integration debt stalls Charter        | High       | High   | Agent specs, integration matrix, wire tracking | Protocol Architect | 🟡 Mitigating |
| 2   | `gtcx-agentic` reimplements BaselineOS primitives | High       | Medium | Phase 2 migration to `defineBaseline()`        | Protocol Architect | 🟡 Mitigating |
| 3   | Wire 6 (orchestration) not started                | Medium     | High   | Q3 2026 sprint planned                         | Protocol Architect | 🟡 Monitoring |
| 4   | Sister repo docs quality varies (10–95/100)       | High       | Medium | Remediation specs created, adoption pending    | Quality Lead       | 🟡 Mitigating |
| 5   | External pen-test vendor delay                    | Medium     | High   | Vendor selection in progress                   | Crypto Engineer    | 🟡 Mitigating |
| 6   | SOC 2 Type II observation period                  | Medium     | Medium | Type I first; 6-month observation              | Quality Lead       | 🟡 Monitoring |
| 7   | AI provider changes break RAG                     | Low        | Medium | Multi-provider fallback planned                | Infra Engineer     | ✅ Mitigated  |
| 8   | Key person dependency                             | Medium     | High   | Documented runbooks, agent specs               | Protocol Architect | 🟡 Monitoring |

---

## 9. Technical Architecture (Summary)

> **For detailed technical documentation, see:** [`CLAUDE.md`](../../AGENTS.md) | [`01-docs/architecture/system-overview.md`](../governance/protocols/architecture-diagrams/architecture/system-overview.md) | [`01-docs/agent-specs/`](../agents/provisioning/AGENT-INIT-CANON.md)

### Stack

| Layer         | Technology                                                   |
| ------------- | ------------------------------------------------------------ |
| Runtime       | Node.js 22 LTS, TypeScript 5.7+ (strict mode)                |
| Orchestration | Custom agent orchestrator with trust model                   |
| RAG           | ChromaDB + OpenAI/Anthropic embeddings                       |
| AI SDK        | Anthropic SDK, LangChain, Zod                                |
| Testing       | Vitest (21/21 RAG tests passing)                             |
| CI/CD         | GitHub Actions: lint → typecheck → test → build → link check |
| Docs          | Markdown + YAML frontmatter + ESLint plugin                  |

### Integration Map

```
┌─────────────────────────────────────────────────────────────┐
│                     Ecosystem Repos (12)                     │
│  baseline-os │ gtcx-core │ gtcx-protocols │ gtcx-platforms  │
│  gtcx-mobile │ gtcx-intelligence │ gtcx-agile │ ...         │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   GTCX Agentic    │
                    │  Orchestrator     │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────┴────┐          ┌────┴────┐          ┌────┴────┐
   │   RAG   │          │Governance│          │  Audit  │
   │ ChromaDB│          │ ABAC    │          │Framework│
   │  Index  │          │ Trust   │          │ Scoring │
   └────┬────┘          └────┬────┘          └────┬────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │  BaselineOS MCP   │
                    │  @baselineos/core │
                    └─────────────────────┘
```

### Key Repositories

| Repository                 | Role                             | Integration                        |
| -------------------------- | -------------------------------- | ---------------------------------- |
| `gtcx-agentic` (this repo) | Orchestration & governance       | Core                               |
| `baseline-os`              | Trust, identity, ABAC primitives | `@baselineos/core` (partial)       |
| `gtcx-core`                | Domain types                     | `@gtcx/core` (target)              |
| `gtcx-intelligence`        | AI inference                     | ANISA, CORTEX, PANX APIs           |
| `gtcx-agile`               | Sprint coordination              | Dependency graph, Charter tracking |

---

## 10. Roadmap & Investment Thesis

### Q3 2026 Execution Timeline

| Phase                      | Weeks | Focus                                          | Key Deliverables                                           |
| -------------------------- | ----- | ---------------------------------------------- | ---------------------------------------------------------- |
| **A. Cross-Repo Wiring**   | 1–4   | Wire 6, BaselineOS migration, dependency truth | `defineBaseline()` adoption, `@gtcx/core` deps             |
| **B. Charter Unblocking**  | 5–8   | CC-01, CC-02, CC-06 remediation                | `enforceStubGuard` 100%, mobile stability, inference rigor |
| **C. External Validation** | 9–12  | Pen-test, SOC 2 Type I                         | External audit, evidence package                           |

Full roadmap: [`01-docs/roadmap/roadmap-2026-q3.md`](roadmap/roadmap-2026-q3.md)

### Success Metrics

| Metric                      | Current     | Q3 Target   | 6-Month Target |
| --------------------------- | ----------- | ----------- | -------------- |
| Docs standard score         | 9.9/10      | 10.0/10     | 10.0/10        |
| Cross-repo `@gtcx/*` deps   | 2 repos     | 6 repos     | 10 repos       |
| Charter commitments blocked | 3           | 0           | 0              |
| Wire 6 status               | Not started | Operational | Mature         |
| Sister repo average score   | 62/100      | 75/100      | 85/100         |
| RAG validation tests        | 21/21       | 25/25       | 30/30          |

### Investment Thesis

GTCX Agentic is the **most mature governance and documentation layer** in the GTCX ecosystem. With a 9.9/10 docs standard score, 21/21 RAG tests passing, a custom ESLint plugin, and 7 sister repos audited, the engineering foundations are enterprise-grade.

The moat is structural: a deterministic trust model, cross-repo RAG with semantic search, automated docs compliance, and Charter commitment tracking. No existing tool provides this combination for multi-repo ecosystems.

The next 12 weeks determine whether GTCX Agentic becomes **the** orchestration standard for the ecosystem, or remains a strong internal tool without cross-repo adoption. The critical path is clear: BaselineOS consumption → Wire 6 → Charter unblocking → external validation.

---

## 11. Stakeholder Onboarding

### For New Team Members

**Week 1 — Orientation:**

1. Read this document (§1, §2, §6, §7)
2. Set up local dev environment per [`CLAUDE.md`](../../AGENTS.md)
3. Review [`01-docs/05-audit/docs-standard-compliance-2026-05-22-final.md`](../../audit/README.md) for current state
4. Attend sprint standup + audit review
5. Pair with your role owner on first commit

**Week 2 — Integration:**

1. Take ownership of one `01-docs/` file update (machine-readable frontmatter)
2. Review [`01-docs/04-ops/runbook.md`](../operations/runbook.md) for operational procedures
3. Run full test suite locally: `pnpm test` (target: all 21 RAG tests pass)
4. Shadow a cross-repo audit (if Quality Lead)

**Ongoing:**

- All docs you create must include YAML frontmatter per Protocol 1
- All commits must follow conventional commits (`feat:`, `fix:`, `docs:`, `security:`)
- All PRs must pass: lint → typecheck → RAG tests → build → link check

### For Enterprise Buyers / DFI Partners

1. Review §1 (Executive Brief) and §8 (Security & Compliance)
2. Request security posture: [`01-docs/ops/gtm/01-security-posture.md`](../../ops/gtm/README.md)
3. Review compliance matrix: [`01-docs/ops/gtm/02-compliance-matrix.md`](../../ops/gtm/README.md)
4. Review agent specs: [`01-docs/agent-specs/`](../agents/provisioning/AGENT-INIT-CANON.md)

### For External Developers / Integrators

1. Review agent specs: [`01-docs/agent-specs/`](../agents/provisioning/AGENT-INIT-CANON.md)
2. Review integration matrix: [`01-docs/agent-specs/integration-matrix.md`](../agents/provisioning/AGENT-INIT-CANON.md)
3. Check BaselineOS integration: [`baseline-os`](https://github.com/gtcx-ecosystem/baseline-os)
4. MCP server docs: [`baseline-os/03-platform/packages/mcp-server/`](https://github.com/gtcx-ecosystem/baseline-os/tree/main/03-platform/packages/mcp-server)

### For Investors / Board

1. Read §1, §2, §3, §5, §10 only
2. Review latest audit: [`01-docs/05-audit/docs-standard-compliance-2026-05-22-final.md`](../../audit/README.md)
3. Review Charter commitments: [`01-docs/architecture/ecosystem-agentic-integration.md`](./ecosystem-integration.md)
4. Schedule monthly review with Protocol Architect

---

## 12. Reference & Navigation

### Document Taxonomy (v2.0)

```
01-docs/
├── overview/           ← You are here
├── gtm/                Go-to-market evidence, executive briefs
├── architecture/       System design, ADRs, integration patterns
├── engineering/        Build, deploy, test, local dev
├── api/                OpenAPI specs, contract definitions
├── security/           Audit reports, threat models, pen-tests
├── compliance/         DPIA, privacy policy, regulatory mapping
├── audit/              Master audits, scoring framework, evidence
├── operations/         Runbooks, SLOs, DR, sprint plans
├── agent-specs/        Per-repo agent specifications
├── onboarding/         Team onboarding, contributor guide
├── roadmap/            Strategic roadmaps, milestone tracking
├── reference/          Glossaries, taxonomies, canonical indices
├── gitbook/            External-facing product docs
└── governance/         External trust portal, model cards
```

### Canonical Documents

| Purpose                          | Document                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Engineering context**          | [`CLAUDE.md`](../../AGENTS.md)                                                                                                                |
| **System architecture**          | [`01-docs/architecture/system-overview.md`](../governance/protocols/architecture-diagrams/architecture/system-overview.md)                                                          |
| **Business logic & marketplace** | [`01-docs/architecture/business-logic.md`](./strategy/ecosystem-integration.md)                                                            |
| **Adoption model**               | [`01-docs/architecture/adoption-model.md`](./strategy/ecosystem-integration.md)                                                            |
| **Ecosystem integration**        | [`01-docs/architecture/ecosystem-integration.md`](./ecosystem-integration.md)                                              |
| **Agent specifications**         | [`01-docs/agent-specs/`](../agents/provisioning/AGENT-INIT-CANON.md)                                                                                                |
| **Integration matrix**           | [`01-docs/agent-specs/integration-matrix.md`](../agents/provisioning/AGENT-INIT-CANON.md)                                                      |
| **Security posture**             | [`01-docs/ops/gtm/01-security-posture.md`](../../ops/gtm/README.md)                                                                 |
| **Compliance matrix**            | [`01-docs/ops/gtm/02-compliance-matrix.md`](../../ops/gtm/README.md)                                                               |
| **Master audit**                 | [`01-docs/05-audit/docs-standard-compliance-2026-05-22-final.md`](../../audit/README.md) |
| **Strategic roadmap**            | [`01-docs/roadmap/roadmap-2026-q3.md`](roadmap/roadmap-2026-q3.md)                                                                       |
| **Runbook**                      | [`01-docs/04-ops/runbook.md`](../operations/runbook.md)                                                                                  |
| **Executive brief**              | [`01-docs/ops/gtm/00-executive-brief.md`](../../ops/gtm/README.md)                                                                   |

### Cross-Repository Navigation

| Repository          | Relationship                    | Access                                                                                             |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `baseline-os`       | Trust anchor, shared primitives | [github.com/gtcx-ecosystem/baseline-os](https://github.com/gtcx-ecosystem/baseline-os)             |
| `gtcx-core`         | Domain types                    | [github.com/gtcx-ecosystem/gtcx-core](https://github.com/gtcx-ecosystem/gtcx-core)                 |
| `gtcx-intelligence` | AI inference                    | [github.com/gtcx-ecosystem/gtcx-intelligence](https://github.com/gtcx-ecosystem/gtcx-intelligence) |
| `gtcx-agile`        | Sprint coordination             | [github.com/gtcx-ecosystem/gtcx-agile](https://github.com/gtcx-ecosystem/gtcx-agile)               |
| `gtcx-protocols`    | API contracts                   | [github.com/gtcx-ecosystem/gtcx-protocols](https://github.com/gtcx-ecosystem/gtcx-protocols)       |

---

_Document generated: 2026-05-22_  
_Next review: 2026-06-05_  
_Owner: protocol-architect_  
_Tier: strategic_  
_Methodology: Protocol 1 (v2.0) + griot-ai reference_

## Negative Scope

This document does **not** cover:

- Implementation details covered in linked engineering or code documentation
- Cross-repo specifics — see individual repo documentation for repo-local details
- Day-to-day operational procedures or incident response — see `01-docs/04-ops/` for runbooks
