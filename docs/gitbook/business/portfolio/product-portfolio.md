---
title: 'Ecosystem OS product portfolio'
status: current
date: 2026-06-17
owner: ecosystem-os
document_type: strategy
tier: critical
tags: ['business', 'portfolio', 'product-architecture']
review_cycle: on-change
---

# Product Portfolio

## Substrate products

| Product | Buyer-facing promise | Internal capability |
| ------- | -------------------- | ------------------- |
| **Kernel** | Governed operating substrate for humans, agents, tools, and modules. | Identity, authority, policy, events, module contracts. |
| **Graph** | Company intelligence graph that knows how work, people, products, agents, services, risks, and evidence connect. | Entity model, relationship graph, query layer, signal extraction. |
| **Ledger** | Verifiable operating history for autonomous and human work. | Witnesses, provenance, replay, audit history, evidence envelopes. |
| **Surface** | Command center for the AI-native company. | Console, CLI, dashboards, operator workflows. |

## Operating products

| Product | Buyer-facing promise | Internal capability |
| ------- | -------------------- | ------------------- |
| **Ethos** | Human doctrine and leadership system. | Culture, acumen, philosophy, manifesto, people, board, advisors, C-suite, key roles, corporate charter, code of ethics. |
| **Venture** | Innovation and IP operating system. | IP portfolio, product concepts, market theses, venture design, strategic bets, competitive intelligence. |
| **Agency** | Creative, comms, marketing, and brand operating system. | Brand system, campaigns, demos, pitch materials, public narrative, launch assets. |
| **Bridge** | AgentOps and coordination layer. | MCP tools, integrations, handoffs, work routing, coordination, agent performance evidence. |
| **Agile** | Delivery and shipping operating system. | Planning, roadmap, sprint rhythm, backlog, ceremonies, release readiness. |
| **Fabric** | Service operations and infrastructure layer. | Cross-repo infra, shared services, DevOps, SecOps, FinOps, service operations. |
| **Assurance** | Compliance, QA, risk, and evidence layer. | Control mapping, independent verification, audit, 11PR scoring, release gates. |

## Packaging

| Package | Includes | Target user |
| ------- | -------- | ----------- |
| **Core** | Kernel, Graph, Ledger, CLI primitives | Developers and platform teams |
| **Operator** | Surface, Bridge, Agile, Assurance | Founders, PMs, operators, agent teams |
| **Service** | Fabric + Assurance + Bridge integrations | Infra, security, DevOps, compliance teams |
| **Company** | Ethos, Venture, Agency, Graph, Surface | Leadership, strategy, GTM, company builders |
| **Enterprise** | SSO, policy, audit, deployment controls, private integrations | Regulated companies and enterprise ecosystems |

## Open-source posture

Repo boundary is not product boundary. Each module can be an internal subsystem and still become an open-source product, package, schema, MCP server, template, or hosted service.

The open-source core should maximize trust and adoption without giving away the proprietary operating graph, accumulated evidence history, or customer-specific workflows.

## Module → backlog map

Every operating module traces to a backlog slice and owner repo. Registry SoR: `pm/spec/backlog-registry.json` · fleet module map: `bridge-os/pm/spec/ecosystem-module-repo-map.json`.

| Module | Portfolio row | Backlog slice | Initiative | Owner repo | Active stories |
| ------ | ------------- | ------------- | ---------- | ---------- | -------------- |
| **Kernel** | Substrate | `baseline-os/pm/` | — | baseline-os | runtime substrate |
| **Graph** | Substrate | `agile-os/pm/` + `bridge-os/pm/` | fleet program | agile-os, bridge-os | Graph MVP |
| **Ledger** | Substrate | `ledger-ui/pm/` | — | ledger-ui | evidence envelopes |
| **Surface** | Substrate | build-lane repos | `PROG-CONTINENTAL-CAPITAL` | gtcx-os, markets-os, terra-os | golden transaction |
| **Ethos** | Operating | `docs/gitbook/foundation/` | `INIT-ECOSYSTEM-DOCS` | ecosystem-os | doctrine + charter |
| **Venture** | Operating | `pm/backlog/venture-backlog.json` | `INIT-ECOSYSTEM-VENTURE` | ecosystem-os | `ECO-VEN-002`–`006` |
| **Agency** | Operating | `pm/backlog/agency-backlog.json` | `INIT-ECOSYSTEM-AGENCY` | ecosystem-os | sealed (`ECO-AGY-001`) |
| **Bridge** | Operating | `../agile-os/pm/ecosystem-sprint-backlog.json` | fleet program | bridge-os | program office |
| **Agile** | Operating | `../agile-os/pm/` | fleet program | agile-os | sprint authority |
| **Fabric** | Operating | `fabric-os/pm/` | `SECAS-S4` | fabric-os | assurance ops |
| **Assurance** | Operating | `fabric-os/pm/` + `canon-os/pm/` | audit lanes | fabric-os, canon-os | multi-pillar |

**Venture product implementation:** `venture-os` (handoff `ECO-VEN-005`).
