---
title: 'Ecosystem OS migration plan'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: strategy
tier: critical
tags: ['migration', 'ai-native-company-os', 'product-architecture']
review_cycle: on-change
---

# Ecosystem OS Migration Plan

## Objective

Migrate Ecosystem OS from a fleet documentation home into the AI-native company operating system.

The target product model is:

```text
Kernel   governs
Graph    knows
Ledger   proves
Surface  exposes

Ethos      judges
Venture    invents
Agency     expresses
Bridge     coordinates
Agile      ships
Fabric     operates
Assurance  verifies
Canon      publishes
```

## Migration principles

1. **Do product migration before destructive repo moves.** Align doctrine, SoR, module boundaries, commands, and evidence first.
2. **Keep Canon as publishing OS.** Do not make Ecosystem OS responsible for GitBook/public documentation publishing long-term.
3. **Preserve operational continuity.** Bridge, Agile, and Fabric keep working until their module contracts are live inside Ecosystem OS.
4. **Use redirects and wrappers before deletion.** Legacy repo names should become redirect shells only after checks, CI, agents, and humans are repointed.
5. **Ledger every cutover.** Every phase produces a witness, rollback note, and owner signoff.
6. **Graph is not RAG.** Graph stores operating facts; RAG retrieves context; MCP acts; Ledger proves.
7. **Assurance verifies the migration.** No phase is complete without checks and replayable evidence.

## Target ownership

| Current surface | Target home | Notes |
| --------------- | ----------- | ----- |
| Current `ecosystem-os` docs/publish framing | Canon OS | Canon is documentation and publishing OS. Ecosystem OS keeps operating doctrine only. |
| `bridge-os` | `ecosystem-os/bridge` | AgentOps, coordination, integrations, MCP tool registry. |
| `agile-os` | `ecosystem-os/agile` | Planning, delivery, backlog, sprint rhythm, shipping state. |
| `fabric-os` | `ecosystem-os/fabric` | Cross-repo infra, services, DevOps, SecOps, FinOps, Ops. |
| Fleet assurance scripts and evidence | `ecosystem-os/assurance` | Compliance, QA, risk, 11PR, evidence verification. |
| Human doctrine / culture / leadership | `ecosystem-os/ethos` | Charter, ethics, roles, board, advisors, human profiles. |
| Innovation and IP strategy | `ecosystem-os/venture` | IP, product concepts, market theses, strategic bets. |
| Creative/comms/marketing | `ecosystem-os/agency` | Brand, campaigns, demos, launch assets, public narrative. |
| Company graph | `ecosystem-os/graph` | Entity and edge model, graph APIs, graph queries. |
| Evidence/provenance | `ecosystem-os/ledger` | Witness envelope, replay, audit history. |
| Operator command center | `ecosystem-os/surface` | CLI, console, dashboards. |
| Policy/authority/event substrate | `ecosystem-os/kernel` | Identity, authority, policy, event contracts. |

## Phase 0 — Stabilize The New Doctrine

**Goal:** Make the new model explicit without moving repos.

Tasks:

1. Land foundation doctrine, product architecture, 11PR audit, business portfolio, and research docs.
2. Update `docs/sor.json` and `pm/spec/product-goals.json` to reflect `ecosystem-operating-system`.
3. Add a decision record that Canon is publishing OS and Ecosystem OS is operating OS.
4. Create migration initiative IDs in `pm/roadmap/initiatives.json`.
5. Add current-state inventory for Bridge, Agile, Fabric, Assurance, Ethos, Venture, Agency, Graph, Ledger, Surface, Kernel.

Exit criteria:

1. `pnpm docs:foundation:check` passes.
2. Business/research additions are indexed.
3. Migration plan is linked from strategy README.
4. Known pre-existing doc decomposition gaps are listed, not hidden.

Rollback:

Revert docs and `product-goals.json` only. No repo structure changes occur in this phase.

## Phase 1 — Define Module Contracts

**Goal:** Define each module as a product surface before moving code.

Tasks:

1. Create module contract specs:
   - `kernel/module-contract.md`
   - `graph/module-contract.md`
   - `ledger/module-contract.md`
   - `surface/module-contract.md`
   - `ethos/module-contract.md`
   - `venture/module-contract.md`
   - `agency/module-contract.md`
   - `bridge/module-contract.md`
   - `agile/module-contract.md`
   - `fabric/module-contract.md`
   - `assurance/module-contract.md`
2. Define APIs, owned artifacts, commands, events, evidence outputs, and dependencies for each module.
3. Define `Kernel` primitives:
   - actor
   - identity
   - authority class
   - policy
   - approval
   - event
   - module
   - permission
4. Define initial `Graph` entities and edges.
5. Define `Ledger` witness envelope.
6. Define `Surface` command map.

Exit criteria:

1. Every module has a contract.
2. Cross-module ownership conflicts are resolved.
3. Assurance signs the module boundary map.

Rollback:

Contracts can be edited in place. No source movement has occurred.

## Phase 2 — Build Wrappers And Compatibility Layer

**Goal:** Make Ecosystem OS the command surface while existing repos still own implementation.

Tasks:

1. Add wrapper commands in Ecosystem OS:
   - `ecosystem bridge:*` delegates to `../bridge-os`
   - `ecosystem agile:*` delegates to `../agile-os`
   - `ecosystem fabric:*` delegates to `../fabric-os`
   - `ecosystem assurance:*` delegates to current assurance runners
2. Add `module-manifest.json` for each external module.
3. Add a compatibility resolver for legacy repo paths.
4. Emit Ledger witnesses for delegated commands.
5. Update agent instructions to prefer Ecosystem OS module commands.

Exit criteria:

1. Existing Bridge/Agile/Fabric commands can be invoked through Ecosystem OS wrappers.
2. Ledger captures delegated execution.
3. Agents can discover the new command surface.

Rollback:

Agents and humans can still call original repo commands directly.

## Phase 3 — Move Documentation And Specs

**Goal:** Move operating doctrine/specs into Ecosystem OS and publishing docs into Canon OS.

Tasks:

1. Move or mirror Canon-facing GitBook/publish docs to Canon OS.
2. Move Bridge program-office specs into `ecosystem-os/bridge/specs`.
3. Move Agile planning/delivery specs into `ecosystem-os/agile/specs`.
4. Move Fabric service/Ops specs into `ecosystem-os/fabric/specs`.
5. Move assurance specs into `ecosystem-os/assurance/specs`.
6. Keep legacy repo pointers that say "edit in Ecosystem OS".

Exit criteria:

1. Canon publishes official docs.
2. Ecosystem OS owns operating specs.
3. Link checks and docs checks pass or have explicit waived legacy gaps.

Rollback:

Legacy repos retain copies until cutover is complete.

## Phase 4 — Move Code And Automation

**Goal:** Move implementation modules into Ecosystem OS with history-preserving strategy.

Recommended approach:

1. Use `git subtree` or history-preserving import for `bridge-os`, `agile-os`, and `fabric-os`.
2. Import into:
   - `ecosystem-os/bridge/`
   - `ecosystem-os/agile/`
   - `ecosystem-os/fabric/`
3. Preserve old repos as redirect shells after validation.
4. Add path-scoped CI and ownership:
   - `bridge/**`
   - `agile/**`
   - `fabric/**`
   - `assurance/**`
   - `kernel/**`
   - `graph/**`
   - `ledger/**`
   - `surface/**`
5. Split deploy credentials and environment protections for Fabric.

Exit criteria:

1. Original repo checks pass from new module paths.
2. Ecosystem OS root checks pass.
3. CI validates path-scoped module changes.
4. Legacy repos are read-only redirect shells.
5. Rollback branch/tag exists for each imported repo.

Rollback:

Switch agents and CI back to original sibling repos. Redirect shells are not deleted until at least one stable release cycle has passed.

## Phase 5 — Activate Kernel, Graph, Ledger, Surface

**Goal:** Turn Ecosystem OS from consolidated modules into a real operating platform.

Tasks:

1. Kernel:
   - implement identity, authority, policy, event, module contract registry.
2. Graph:
   - populate repos, products, services, people, agents, initiatives, stories, risks, approvals, witnesses.
3. Ledger:
   - standardize witness envelope and replay records.
4. Surface:
   - expose CLI and initial operator console.
5. Bridge:
   - expose MCP tools over Kernel permissions.
6. Assurance:
   - verify every module against 11PR.

Exit criteria:

1. Operator can ask "what should happen next?" and receive graph-backed, authority-aware guidance.
2. MCP actions produce Ledger witnesses.
3. Assurance can replay representative workflows.
4. Surface shows Graph state, work state, service state, risk state, and evidence state.

Rollback:

Disable Surface and MCP actions; keep Graph and Ledger read-only until fixed.

## Phase 6 — Productize

**Goal:** Package Ecosystem OS as an internal platform, open-source core, and eventual commercial product.

Tasks:

1. Define packages:
   - `@gtcx/ecosystem-kernel`
   - `@gtcx/ecosystem-graph`
   - `@gtcx/ecosystem-ledger`
   - `@gtcx/ecosystem-cli`
   - `@gtcx/bridge`
   - `@gtcx/agile`
   - `@gtcx/fabric`
   - `@gtcx/assurance`
2. Decide first OSS wedge:
   - Kernel schemas
   - Ledger witness envelope
   - MCP servers
   - CLI
3. Define hosted/enterprise features:
   - private Graph
   - managed Ledger
   - SSO/RBAC
   - evidence retention
   - enterprise MCP gateway
   - compliance packs
4. Create Canon-published product docs.

Exit criteria:

1. Internal reference deployment is documented.
2. OSS/core packaging decision is made.
3. Enterprise packaging strategy is approved.
4. Canon publishing pack is ready.

## 11PR Migration Gates

| Pillar | Gate |
| ------ | ---- |
| Compliance | No phase completes without authority, owner, witness, and rollback note. |
| Technical Excellence | Wrapper, import, and module checks pass from new paths. |
| Craft | Module boundaries stay narrow; no generic catch-all folders. |
| World-class | Surface and CLI provide a coherent operator workflow. |
| Trust & Safety | Ledger records every cutover, delegated command, and exception. |
| Creativity & Innovation | Venture and Agency are first-class modules. |
| Commercial Value | Product packaging and OSS strategy are explicit. |
| Defensive Moat | Graph, Ledger, and operating history compound across phases. |
| Agentic Empowerment | Bridge exposes governed MCP tools and agent handoffs. |
| Product & Ecosystem Integration | Canon, GTCX OS, Baseline OS, and Ecosystem OS boundaries remain explicit. |
| IP Magic | Operator can move from question to governed action to verified proof. |

## Immediate next actions

1. Add `INIT-ECOSYSTEM-OS-MIGRATION` to roadmap.
2. Create module contract stubs.
3. Inventory Bridge/Agile/Fabric commands and artifacts.
4. Define Kernel entity model.
5. Define Graph ontology draft.
6. Define Ledger witness envelope.
7. Decide whether code import uses subtree, filter-repo, or clean module import.
