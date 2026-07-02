---
title: '00 Executive Brief'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['gtm', 'enterprise', 'overview', 'agentic']
review_cycle: 'on-change'
---

# Executive Brief — GTCX Agentic

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect
> **Next Review:** On-change or bi-weekly

## Executive Summary

> **Status:** Current

## What It Is

GTCX Agentic is the **AI agent orchestration and governance layer** for the GTCX ecosystem — a production-grade coordination system that manages autonomous agents across 12 repositories. It is a **service**, not a library. It runs semantic search over cross-repo knowledge, enforces documentation standards via CI gates, and maintains a deterministic trust model that governs every agent action.

## Why It Matters

Multi-repo engineering ecosystems face a coherence crisis: documentation drifts, cross-repo integrations break silently, and agent actions go unaudited. Existing tools (GitHub Copilot, Cody, single-repo RAG) cannot reason across repository boundaries or enforce governance at scale. GTCX Agentic closes this gap with ecosystem-native orchestration, automated compliance, and a trust model that spans repositories.

## By the Numbers

| Metric                       | Value                                             |
| ---------------------------- | ------------------------------------------------- |
| Ecosystem repos managed      | 12                                                |
| Docs standard score          | 9.9/10                                            |
| RAG validation tests         | 21/21 passing                                     |
| ESLint plugin rules          | 5 rules enforcing docs conventions                |
| Sister repos audited         | 7 (scores: 10–95/100)                             |
| Cross-repo integration wires | 10 tracked                                        |
| Charter commitments          | 6 active                                          |
| Agent specifications         | 12 repos documented                               |
| Integration matrix           | 14×11 contract matrix                             |
| CI quality gates             | lint → typecheck → RAG tests → build → link check |

## Security Snapshot

| Control Area                   | Score  | Evidence                                                                                     |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------- |
| Authentication & Authorization | 8.0/10 | ABAC roles (`agent:builder`, `agent:reviewer`, `human:architect`); trust scores (default 70) |
| Data Protection                | 8.0/10 | RAG excludes screening events; no PII in vector DB; encrypted at rest                        |
| Input Validation               | 8.5/10 | Zod schemas; ESLint plugin; markdown link checker; cross-repo validator                      |
| Infrastructure Security        | 8.0/10 | K8s hardening via `gtcx-infrastructure`; non-root, read-only fs, NetworkPolicy               |
| Audit Logging                  | 8.0/10 | Hash-chained audit log; immutable evidence collection                                        |
| Dependency Security            | 8.0/10 | pnpm audit, SBOM, Trivy scan, Cosign signing                                                 |

Full assessment: [`01-security-posture.md`](./01-security-posture.md)

## Compliance Snapshot

| Framework               | Status         | Evidence                                                           |
| ----------------------- | -------------- | ------------------------------------------------------------------ |
| **SOC 2 Type I**        | 🟡 In progress | Q3 2026 target; [`01-docs/10-compliance/dpia.md`](../compliance/dpia.md) |
| **SOC 2 Type II**       | 🔴 Not started | H1 2027; requires Type I + 6-month observation                     |
| **ISO 27001**           | 🔴 Not started | H2 2027; gap analysis pending                                      |
| **GDPR / POPIA / NDPR** | 🟡 Partial     | DPIA draft; [`01-docs/10-compliance/dpia.md`](../compliance/dpia.md)     |
| **PCI-DSS**             | 🟡 Partial     | AES-256-GCM encryption; full scope TBD                             |

Full matrix: [`02-compliance-matrix.md`](./02-compliance-matrix.md)

## What's Not Done (Honestly)

1. **Wire 6 (Agentic → Intelligence orchestration) not started** — Planned for Q3 2026; 2–3 weeks of work
2. **`gtcx-agentic` reimplements BaselineOS primitives** — 575-line legacy config; Phase 2 migration to `defineBaseline()` planned
3. **Only 2 of 12 repos have real `@gtcx/*` dependencies** — Dependency graph is architectural intent, not package reality
4. **5 of 6 Charter commitments blocked** — Cross-repo coordination failures, not agentic capability gaps
5. **External pen-test pending vendor selection** — Internal pen-test done; third-party scheduled Q3–Q4 2026
6. **SOC 2 Type II observation period not started** — Type I first; 6-month observation required

These are 6–12 weeks of engineering plus two vendor engagements. The agentic layer is mature. The remaining work is cross-repo adoption and external validation.

## Negative Scope

This go-to-market document does **not** cover:

- Technical implementation or engineering architecture — see `01-docs/engineering/` and `01-docs/architecture/`
- Product feature specifications or API docs — see `01-docs/product/` and `01-docs/api/`
- Compliance certifications or security controls — see `01-docs/10-compliance/` and `01-docs/09-security/`
