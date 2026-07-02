---
title: gtcx-docs — Execution Roadmap
status: current
date: 2026-06-02
owner: gtcx-docs
tier: operating
review_cycle: on-change
---

# gtcx-docs — Execution Roadmap

**Repo:** gtcx-docs (GTCX Ecosystem Constitution)  
**Plan type:** CI moat + docs quality sprints (not mobile EXRs)  
**Persona default:** protocol-engineer / developer · **Frame:** development

## Active phase: **P4 — Fleet documentation & publishing (INIT-DOC-FLEET-PUBLISH)** — **sealed**

Hub automatable backlog **clear** (2026-06-13). Fleet owner extension + quarterly refresh per [`documentation-quarterly-refresh-protocol.md`](../governance/documentation-quarterly-refresh-protocol.md).

| Phase | Sprints | Goal                                                            |
| ----- | ------- | --------------------------------------------------------------- |
| P1    | S1–S2   | Truth in CI + nav/link integrity (closed)                       |
| P2    | S3–S5   | `ignoreDeadLinks: false`, registry moat, ratchet gates (closed) |
| P3    | S4–43   | Ecosystem AGENTS + Protocol 22 + INIT-CANON-MATURITY (closed)   |
| **P4** | **S44–47** | **Fleet GitBook · GTM · developer · onboarding · audit 100** |

**Program charter:** [`init-doc-fleet-publish.md`](./init-doc-fleet-publish.md)

---

## Critical handoffs (pilot order)

| ID          | Failure / gap                                | Story | Status |
| ----------- | -------------------------------------------- | ----- | ------ |
| H-LINKS     | VitePress still uses `ignoreDeadLinks: true` | S3-01 | done   |
| H-REG       | Registry hashes cover only moat subset       | S3-02 | done   |
| H-PROTO-SEL | Agents ask humans what to build next         | S3-04 | done   |

---

## Sprint 1 — Truth in CI (P1)

**Goal:** CI reflects real quality bar — scoped lint, single validate entrypoint.

| Story | Title                                     | Feature | JTBD impact            | Personas     | P   | Status |
| ----- | ----------------------------------------- | ------- | ---------------------- | ------------ | --- | ------ |
| S1-01 | Scope Prettier to canonical paths         | F-CI    | P10-J1 doc hygiene     | P10 Priya    | P0  | done   |
| S1-02 | Remove duplicate Prettier CI step         | F-CI    | P10-J1                 | P10          | P0  | done   |
| S1-03 | Align README and CLAUDE to pnpm + Node 22 | F-DX    | Contributor onboarding | P10          | P1  | done   |
| S1-04 | Add `pnpm run validate` meta-script       | F-CI    | P10-J1                 | P10          | P0  | done   |
| S1-05 | CI contract tests                         | F-CI    | P10-J1                 | P10          | P0  | done   |
| S1-06 | Document Sprint 1 outcomes                | F-DOC   | Audit trail            | P2 Dr. Ncube | P1  | done   |

---

## Sprint 2 — Link integrity (P1)

**Goal:** Nav/sidebar truth; lower dead-link baseline.

| Story | Title                                            | Feature | JTBD impact       | Personas | P   | Status   |
| ----- | ------------------------------------------------ | ------- | ----------------- | -------- | --- | -------- |
| S2-01 | Validate VitePress nav/sidebar links             | F-LINK  | P10-J1            | P10      | P0  | done     |
| S2-02 | Improve dead-link ratchet (sister-repo, schemes) | F-LINK  | P10-J1            | P10      | P0  | done     |
| S2-03 | Fix security/GTM/protocol cross-links            | F-LINK  | P2-J2 consistency | P2       | P0  | done     |
| S2-04 | Lower baseline ≥100 (640 → 537)                  | F-LINK  | P10-J1            | P10      | P0  | done     |
| S2-05 | Flip `ignoreDeadLinks: false`                    | F-LINK  | Build truth       | P10      | P0  | deferred |

> S2-05 deferred to **S3-01** (452 in-build dead links remain).

---

## Sprint 3 — Registry moat + VitePress cleanup (P2) — **complete**

**Goal:** Enforce link truth in build; expand registry hash moat.

| Story | Title                                                       | Feature | JTBD impact                      | Personas | P   | Status |
| ----- | ----------------------------------------------------------- | ------- | -------------------------------- | -------- | --- | ------ |
| S3-01 | Flip `ignoreDeadLinks: false` when build &lt; 50 dead links | F-LINK  | P10-J1 publishable site          | P10      | P0  | done   |
| S3-02 | Extend registry content hashes beyond moat subset           | F-REG   | P2-J3 tamper-evident docs        | P2       | P0  | done   |
| S3-03 | CI gate: fail when dead-link baseline increases             | F-CI    | P10-J1                           | P10      | P1  | done   |
| S3-04 | Wire Protocol 22 in gtcx-docs (manifest + script + AGENTS)  | F-GOV   | All personas — autonomous agents | P10      | P0  | done   |
| S3-05 | Expand Prettier scope to additional doc trees               | F-CI    | P10-J1                           | P10      | P2  | done   |

**Evidence:** `01-docs/audits/sprint-1-truth-in-ci-2026-06-02.md`, `01-docs/audits/sprint-2-link-integrity-2026-06-02.md`

---

## Sprint 4 — Ecosystem AGENTS compliance (P3) — **complete**

| Story | Title                                              | Feature | P   | Status |
| ----- | -------------------------------------------------- | ------- | --- | ------ |
| S4-01 | Publish Protocol 22 rollout checklist for 24 repos | F-GOV   | P1  | done   |
| S4-02 | Add `agent:next-work` smoke to CI (this repo)      | F-CI    | P2  | done   |

**Evidence:** `01-docs/audits/sprint-4-protocol-22-rollout-2026-06-02.md`

---

## Sprint 5 — Protocol 22 rollout audit (P3) — **complete**

**Goal:** Measure W1–W4 rollout progress from local ecosystem clones; keep matrix truthful.

| Story | Title                                            | Feature | JTBD impact               | Personas | P   | Status |
| ----- | ------------------------------------------------ | ------- | ------------------------- | -------- | --- | ------ |
| S5-01 | Add Protocol 22 ecosystem rollout audit script   | F-GOV   | P10-J2 rollout visibility | P10      | P0  | done   |
| S5-02 | Refresh rollout checklist matrix from live audit | F-GOV   | P10-J2                    | P10      | P0  | done   |
| S5-03 | Add rollout audit test and package script        | F-CI    | P10-J1                    | P10      | P1  | done   |

**Evidence:** `01-docs/audits/sprint-5-protocol-22-audit-2026-06-02.md`

---

## Sprint 6 — Hub W2 hardening (P3) — **complete**

**Goal:** Register W2 diligence handoff protocol; complete constitution-repo Protocol 22 CI parity with exploration-os.

| Story | Title                                            | Feature | JTBD impact        | Personas | P   | Status |
| ----- | ------------------------------------------------ | ------- | ------------------ | -------- | --- | ------ |
| S6-01 | Register Protocol 25 licence intelligence in hub | F-GOV   | W2 diligence index | P10      | P0  | done   |
| S6-02 | Add `agent:work-selection:check` to CI           | F-CI    | P10-J1             | P10      | P0  | done   |
| S6-03 | Record W2 pilot adoption in Protocol 22 evidence | F-GOV   | P10-J2             | P10      | P1  | done   |

**Evidence:** `01-docs/audits/sprint-6-hub-w2-hardening-2026-06-02.md`

---

## Sprint 7 — W2 CI rollout visibility (P3) — **complete**

**Goal:** Track CI `agent:next-work` and `agent:work-selection:check` across ecosystem; refresh matrix for W2 wave.

| Story | Title                                              | Feature | JTBD impact | Personas | P   | Status |
| ----- | -------------------------------------------------- | ------- | ----------- | -------- | --- | ------ |
| S7-01 | Extend P22 audit with CI adoption check dimensions | F-GOV   | P10-J2      | P10      | P0  | done   |
| S7-02 | Regenerate rollout matrix from live audit          | F-GOV   | P10-J2      | P10      | P0  | done   |
| S7-03 | Document W2 CI wave targets in rollout checklist   | F-GOV   | P10-J1      | P10      | P1  | done   |

**Evidence:** `01-docs/audits/sprint-7-w2-ci-rollout-2026-06-02.md`

---

## Sprint 8 — Cross-repo execution kickoff (P3) — **complete**

**Goal:** Start S-XR-5 governance wave — P22 CI in W2 repos; hub tickets + playbook for agent handoffs.

| Story | Title                                                          | Feature | P   | Status |
| ----- | -------------------------------------------------------------- | ------- | --- | ------ |
| S8-01 | P22 CI rollout playbook in coordination hub                    | F-GOV   | P0  | done   |
| S8-02 | File inbound tickets XR-511–514                                | F-GOV   | P0  | done   |
| S8-03 | Wire P22 CI in compliance, exploration, intelligence, terminal | F-GOV   | P0  | done   |
| S8-04 | Refresh P22 audit matrix after CI wave                         | F-GOV   | P1  | done   |
| S8-05 | Sprint 8 evidence + bridge/log update                          | F-DOC   | P1  | done   |

**Cross-repo IDs:** XR-511–514 · Playbook: `01-docs/06-coordination/p22-ci-rollout-playbook.md`

**Evidence:** `01-docs/audits/sprint-8-cross-repo-p22-ci-2026-06-03.md`

---

## Sprint 9 — P0 escalation + coordination hygiene (P3) — **complete**

**Goal:** Align hub with live S-XR-1 probes; file P0 infra tickets; Grade-D stubs; publish audit v2 index.

| Story | Title                                                  | Feature | P   | Status |
| ----- | ------------------------------------------------------ | ------- | --- | ------ |
| S9-01 | Sync workplan/bridge with XR-102 partial + XR-104      | F-GOV   | P0  | done   |
| S9-02 | Hub inbound tickets XR-201 + XR-104 (infra P0)         | F-GOV   | P0  | done   |
| S9-03 | Grade-D coordination stub playbook + 3 inbound tickets | F-GOV   | P1  | done   |
| S9-04 | Audit v2 hub index (XR-521)                            | F-DOC   | P1  | done   |
| S9-05 | Sprint 9 evidence + inventory refresh                  | F-DOC   | P1  | done   |

**Cross-repo:** XR-201, XR-104, XR-521 · Playbooks: `01-docs/06-coordination/grade-d-coordination-stub-playbook.md`

**Evidence:** `01-docs/audits/sprint-9-p0-escalation-2026-06-03.md`

---

## Sprint 10 — Grade-D landings + core/platforms P22 CI (P3) — **complete**

**Goal:** Close hub inbound stubs; extend P22 CI to gtcx-core and gtcx-platforms (7/22).

| Story  | Title                                               | Feature | P   | Status |
| ------ | --------------------------------------------------- | ------- | --- | ------ |
| S10-01 | Land coordination README in core, terra-os, markets | F-GOV   | P0  | done   |
| S10-02 | P22 check script + CI in gtcx-core                  | F-CI    | P0  | done   |
| S10-03 | P22 check script + CI in gtcx-platforms             | F-CI    | P0  | done   |
| S10-04 | Hub inventory + audit matrix refresh                | F-GOV   | P1  | done   |
| S10-05 | Sprint 10 evidence + bridge/log                     | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-10-grade-d-and-p22-ci-2026-06-03.md`

---

## Sprint 11 — W1 P22 CI wave 2 (P3) — **complete**

**Goal:** Extend P22 CI smoke + adoption check to gtcx-agile, baseline-os, and gtcx-mobile (~13/22 CI adoption).

| Story  | Title                                            | Feature | P   | Status |
| ------ | ------------------------------------------------ | ------- | --- | ------ |
| S11-01 | P22 CI smoke in gtcx-agile                       | F-CI    | P0  | done   |
| S11-02 | P22 check script + CI in baseline-os             | F-CI    | P0  | done   |
| S11-03 | P22 check script + CI in gtcx-mobile             | F-CI    | P0  | done   |
| S11-04 | Hub P22 audit matrix + rollout checklist refresh | F-GOV   | P1  | done   |
| S11-05 | Sprint 11 evidence + bridge/log                  | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-11-p22-ci-wave2-2026-06-03.md`

---

## Sprint 12 — W1 P22 CI wave 3 (P3) — **complete**

**Goal:** Close adoption-check gap on ledger-ui; wire gtcx-agentic CI; confirm gtcx-protocols already at full CI.

| Story  | Title                                  | Feature | P   | Status |
| ------ | -------------------------------------- | ------- | --- | ------ |
| S12-01 | P22 adoption check + CI on ledger-ui   | F-CI    | P0  | done   |
| S12-02 | P22 CI smoke in gtcx-agentic           | F-CI    | P0  | done   |
| S12-03 | Verify gtcx-protocols P22 CI (no diff) | F-GOV   | P1  | done   |
| S12-04 | Hub audit matrix refresh               | F-GOV   | P1  | done   |
| S12-05 | Sprint 12 evidence + bridge/log        | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-12-p22-ci-wave3-2026-06-03.md`

---

## Sprint 13 — Staging P0 reconcile (P3) — **complete**

**Goal:** Align hub bridge/workplan with gtcx-infrastructure SoR; close stale XR-201/XR-104 blocked state.

| Story  | Title                                        | Feature | P   | Status |
| ------ | -------------------------------------------- | ------- | --- | ------ |
| S13-01 | Reconcile XR-201/104/202/102 in hub workplan | F-GOV   | P0  | done   |
| S13-02 | Inbound ticket status tracker                | F-GOV   | P0  | done   |
| S13-03 | Refresh bridge critical path + mermaid       | F-GOV   | P0  | done   |
| S13-04 | Inventory: gtcx-infrastructure Grade A       | F-GOV   | P1  | done   |
| S13-05 | Sprint 13 evidence                           | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-13-staging-reconcile-2026-06-03.md`

---

## Sprint 14 — S-XR-1 closure (P3) — **complete**

**Goal:** Close hub staging sprint when intelligence + mobile evidence lands; shift critical path to S-XR-2.

| Story  | Title                                        | Feature | P   | Status |
| ------ | -------------------------------------------- | ------- | --- | ------ |
| S14-01 | Mark XR-202/102/203 done in workplan         | F-GOV   | P0  | done   |
| S14-02 | Close S-XR-1 calendar + checklist            | F-GOV   | P0  | done   |
| S14-03 | Refresh bridge critical path → S-XR-2        | F-GOV   | P0  | done   |
| S14-04 | Update inbound ticket status (S-XR-1 closed) | F-GOV   | P1  | done   |
| S14-05 | Sprint 14 evidence                           | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-14-s-xr-1-closure-2026-06-03.md`

---

## Sprint 15 — Publish truth (P3) — **complete**

**Goal:** Green `docs:build`; nav-visible links use GitHub URLs for `srcExclude` trees (protocols, inbound-tickets, GTM matrix).

| Story  | Title                                                | Feature | P   | Status |
| ------ | ---------------------------------------------------- | ------- | --- | ------ |
| S15-01 | Fix VitePress dead links (coordination, GTM, audits) | F-LINK  | P0  | done   |
| S15-02 | DTF framework link (GitHub until Sprint 16 relocate) | F-LINK  | P0  | done   |
| S15-03 | CI contract: hub gates + docs:build in workflow      | F-CI    | P0  | done   |
| S15-04 | Sprint 15 evidence doc                               | F-DOC   | P1  | done   |

> S3-01 “done” requires **`pnpm run docs:build` exit 0** — satisfied 2026-06-03 (Sprint 15).

**Evidence:** `01-docs/audits/sprint-15-publish-truth-2026-06-03.md`

---

## Sprint 16 — Layer 0 scope integrity (P3) — **complete**

**Goal:** Green `validate` + `lint`; DTF/SEF under `01-docs/governance/frameworks/`; no repo-root `frameworks/`.

| Story  | Title                                                     | Feature | P   | Status |
| ------ | --------------------------------------------------------- | ------- | --- | ------ |
| S16-01 | Relocate `frameworks/` → `01-docs/governance/frameworks/` | F-GOV   | P0  | done   |
| S16-02 | Hub-scope structural check + hygiene config               | F-CI    | P0  | done   |
| S16-03 | Prettier scoped paths                                     | F-CI    | P0  | done   |
| S16-04 | Align `01-docs/CLAUDE.md` to pnpm                         | F-DX    | P1  | done   |
| S16-05 | Sprint 16 evidence                                        | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-16-layer-0-scope-2026-06-03.md`

---

## Sprint 17 — Agent state machine (P3) — **complete**

**Goal:** Protocol 22 selects hub work again; coordination tier when roadmap backlog clear; operator state matches sprints 8–16.

| Story  | Title                                     | Feature | P   | Status |
| ------ | ----------------------------------------- | ------- | --- | ------ |
| S17-01 | Refresh `auto-dev-state` sprint index     | F-GOV   | P0  | done   |
| S17-02 | `agent:next-work` coordination tier       | F-GOV   | P0  | done   |
| S17-03 | Document dual gates (ratchet + VitePress) | F-DOC   | P1  | done   |
| S17-04 | Test coordination payload when clear      | F-CI    | P1  | done   |
| S17-05 | Sprint 17 evidence                        | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-17-agent-state-machine-2026-06-03.md`

---

## Sprint 18 — Deploy and gate alignment (P3) — **complete**

**Goal:** Static site deploy workflow; hygiene fail-closed; publish gate in `validate`.

| Story  | Title                                | Feature | P   | Status |
| ------ | ------------------------------------ | ------- | --- | ------ |
| S18-01 | GitHub Pages deploy workflow         | F-CI    | P0  | done   |
| S18-02 | Docs publish runbook                 | F-DOC   | P1  | done   |
| S18-03 | Hygiene CI fail-closed               | F-CI    | P1  | done   |
| S18-04 | `validate:publish` in validate chain | F-CI    | P2  | done   |
| S18-05 | Sprint 18 evidence                   | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-18-deploy-gates-2026-06-03.md`

---

## Sprint 19 — Trust surface for pilots (P3) — **complete**

**Goal:** P26–P28 adoption closed in hub; PR + bridge carry Proceed Brief and S-XR-2 truth.

| Story  | Title                                  | Feature | P   | Status |
| ------ | -------------------------------------- | ------- | --- | ------ |
| S19-01 | P26–P28 adoption checklist (gtcx-docs) | F-GOV   | P0  | done   |
| S19-02 | PR template Proceed Brief + authority  | F-GOV   | P0  | done   |
| S19-03 | S-XR-2 rows in inbound + bridge sync   | F-GOV   | P1  | done   |
| S19-04 | Link P26–P28 in AGENT-WORK-SELECTION   | F-DOC   | P1  | done   |
| S19-05 | Sprint 19 evidence                     | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-19-trust-surface-2026-06-03.md`

---

## Sprint 20 — Moat hardening (P3) — **complete**

**Goal:** DTF registry + hashes; machine-readable ecosystem index; P22 audit resolves gtcx-docs; dead-link baseline refresh.

| Story  | Title                                       | Feature | P   | Status |
| ------ | ------------------------------------------- | ------- | --- | ------ |
| S20-01 | Register DTF in REGISTRY + registry hashes  | F-GOV   | P0  | done   |
| S20-02 | `ecosystem-index.json` generator + validate | F-GOV   | P0  | done   |
| S20-03 | P22 audit: gtcx-docs resolves to DOCS_ROOT  | F-CI    | P0  | done   |
| S20-04 | Dead-link baseline refresh (ratchet)        | F-LINK  | P1  | done   |
| S20-05 | Protocol 23 EAP Phase B link-only index     | F-GOV   | P1  | done   |
| S20-06 | Sprint 20 evidence                          | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-20-moat-hardening-2026-06-03.md`

---

## Sprint 21 — Coordination reconcile (P3) — **complete**

**Goal:** Sync hub bridge/workplan with owner-repo witnesses; refresh critical path and rollup after S-XR-2/3 closures.

| Story  | Title                                             | Feature | P   | Status |
| ------ | ------------------------------------------------- | ------- | --- | ------ |
| S21-01 | Mark XR-302 + XR-402–405 done in hub workplan     | F-GOV   | P0  | done   |
| S21-02 | Bridge + inbound status critical path → XR-510    | F-GOV   | P0  | done   |
| S21-03 | Regenerate ecosystem-index + remaining-work notes | F-GOV   | P1  | done   |
| S21-04 | Refresh completion rollup + P22 audit snapshot    | F-DOC   | P1  | done   |
| S21-05 | Coordination log + auto-dev-state                 | F-DOC   | P1  | done   |
| S21-06 | Sprint 21 evidence                                | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-21-coordination-reconcile-2026-06-04.md`

---

## Sprint 22 — P22 W4 playbook (P3) — **complete**

**Goal:** Refresh P22 rollout matrix from live audit; prepare W4 inbound wave for remaining repos.

| Story  | Title                                             | Feature | P   | Status |
| ------ | ------------------------------------------------- | ------- | --- | ------ |
| S22-01 | Refresh P22 rollout matrix from live audit        | F-GOV   | P0  | done   |
| S22-02 | Inbound ticket wave for W4 repos (6 core gaps)    | F-GOV   | P0  | done   |
| S22-03 | `adoption_status: established` gap list (7 repos) | F-GOV   | P1  | done   |
| S22-04 | Update AGENT-WORK-SELECTION phase table (S1–S21)  | F-DOC   | P1  | done   |
| S22-05 | Sprint 22 evidence                                | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-22-p22-w4-playbook-2026-06-04.md`

---

## Sprint 23 — Rollup automation (P3) — **done**

**Goal:** Generate completion rollup and critical-path JSON from live sources; gate drift in `validate`.

| Story  | Title                                             | Feature | P   | Status |
| ------ | ------------------------------------------------- | ------- | --- | ------ |
| S23-01 | `generate-completion-rollup.mjs` + `--write`      | F-GOV   | P0  | done   |
| S23-02 | `validate:rollup` in validate chain               | F-CI    | P0  | done   |
| S23-03 | `rollup-critical-path.json` + agent-next-work     | F-GOV   | P1  | done   |
| S23-04 | Regenerate rollup + ecosystem-index (XR-510 done) | F-GOV   | P1  | done   |
| S23-05 | Sprint 23 evidence                                | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-23-rollup-automation-2026-06-04.md`

---

## Sprint 24 — Inbound status automation (P3) — **done**

**Goal:** Keep W4 inbound tracker in sync with filed tickets; close gtcx-operations CI gap; file established-promotion wave.

| Story  | Title                                             | Feature | P   | Status |
| ------ | ------------------------------------------------- | ------- | --- | ------ |
| S24-01 | `generate-inbound-status-wave.mjs` + markers      | F-GOV   | P0  | done   |
| S24-02 | `validate:inbound-status` in validate chain       | F-CI    | P0  | done   |
| S24-03 | `to-gtcx-operations` P22 CI ticket + regen status | F-GOV   | P1  | done   |
| S24-04 | Established-promotion inbound wave (7 repos)      | F-GOV   | P1  | done   |
| S24-05 | Sprint 24 evidence + coordination log             | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-24-inbound-status-automation-2026-06-04.md`

---

## Sprint 25 — P22 live refresh chain (P3) — **done**

**Goal:** One command refreshes live P22 audit, checklist matrix, rollup, and inbound status from `ECOSYSTEM_ROOT`.

| Story  | Title                                                     | Feature | P   | Status |
| ------ | --------------------------------------------------------- | ------- | --- | ------ |
| S25-01 | `coordination-refresh.mjs` + `coordination:refresh`       | F-GOV   | P0  | done   |
| S25-02 | `validate:p22-checklist` (--check on matrix sync)         | F-CI    | P0  | done   |
| S25-03 | Live `ECOSYSTEM_ROOT` refresh + regen derived docs        | F-GOV   | P1  | done   |
| S25-04 | `to-exploration-os` XR-501 inbound + AGENT-WORK-SELECTION | F-GOV   | P1  | done   |
| S25-05 | Sprint 25 evidence                                        | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-25-p22-live-refresh-2026-06-04.md`

---

## Sprint 26 — Coordination drift CI + runbook (P3) — **done**

**Goal:** Fast CI job for derived coordination artifacts; operator runbook for live refresh; XR/product inbound tracker section.

| Story  | Title                                       | Feature | P   | Status |
| ------ | ------------------------------------------- | ------- | --- | ------ |
| S26-01 | `validate:coordination-drift` + GH workflow | F-CI    | P0  | done   |
| S26-02 | `coordination-refresh-runbook.md`           | F-DOC   | P0  | done   |
| S26-03 | INBOUND-PRODUCT wave (XR / P22 CI tickets)  | F-GOV   | P1  | done   |
| S26-04 | Coordination README + CI contract tests     | F-DOC   | P1  | done   |
| S26-05 | Sprint 26 evidence                          | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-26-coordination-drift-ci-2026-06-04.md`

---

## Sprint 27 — P25 W2 inbound wave (P3) — **done**

**Goal:** File S-XR-4 diligence inbound tickets; unblock XR-303 in workplan; extend inbound tracker.

| Story  | Title                                           | Feature | P   | Status |
| ------ | ----------------------------------------------- | ------- | --- | ------ |
| S27-01 | Inbound XR-502–504 (compliance-os P25 W2)       | F-GOV   | P0  | done   |
| S27-02 | Inbound XR-303 (`@gtcx/ui` consumer, platforms) | F-GOV   | P0  | done   |
| S27-03 | Workplan XR-303 **ready** + regen rollup/index  | F-GOV   | P1  | done   |
| S27-04 | `INBOUND-P25W2` wave in status generator        | F-GOV   | P1  | done   |
| S27-05 | Sprint 27 evidence                              | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-27-p25-w2-inbound-wave-2026-06-04.md`

---

## Sprint 28 — Bridge P1 sync (P3) — **done**

**Goal:** Generate bridge P1 critical-path rows from workplan; extend `rollup-critical-path.json`; expose in `agent:next-work`.

| Story  | Title                                              | Feature | P   | Status |
| ------ | -------------------------------------------------- | ------- | --- | ------ |
| S28-01 | `buildP1Rows()` in rollup generator                | F-GOV   | P0  | done   |
| S28-02 | `BRIDGE-P1` markers + sync on rollup `--write`     | F-GOV   | P0  | done   |
| S28-03 | `agent:next-work` exposes `p1Rows` in coordination | F-GOV   | P1  | done   |
| S28-04 | Regenerate bridge + critical-path JSON             | F-GOV   | P1  | done   |
| S28-05 | Sprint 28 evidence                                 | F-DOC   | P1  | done   |

**Evidence:** `01-docs/audits/sprint-28-bridge-p1-sync-2026-06-04.md`

---

## Quality gates (every story)

```bash
pnpm run validate
pnpm run lint
pnpm run test
pnpm run docs:build
```

---

## Sprint 32 — M4 reference interim (P4) — **complete**

**Goal:** Dead-link ratchet, script path v5 cleanup, `validate:m4-reference` gate toward core **9.5+**.

| Story  | Title                                          | Feature | P   | Status |
| ------ | ---------------------------------------------- | ------- | --- | ------ |
| S32-01 | Dead-link baseline ≤440 + directory resolution | F-LINK  | P1  | done   |
| S32-02 | Platform script v5 path cleanup                | F-P35   | P1  | done   |
| S32-03 | `validate:m4-reference` composite gate         | F-CI    | P1  | done   |
| S32-04 | M4 re-audit core ≥9.5                          | F-AUD   | P1  | done   |

**10/10 IDs:** BG-10-18 … BG-10-21 · Gate: `pnpm run validate:m4-reference`

---

## Sprint 33 — M5 reference grade 10.0 (P4) — **complete**

**Goal:** Dead-link ratchet 440 → ≤300; protocol corpus semantic paths; M5 re-audit toward core **10.0**.

| Story  | Title                                          | Feature | P   | Status  |
| ------ | ---------------------------------------------- | ------- | --- | ------- |
| S33-01 | Protocol corpus numbered → semantic link paths | F-LINK  | P0  | done    |
| S33-02 | Agent provider README root link fixes          | F-LINK  | P1  | done    |
| S33-03 | Dead-link baseline ≤370 (interim ratchet)      | F-LINK  | P1  | done    |
| S33-04 | Dead-link baseline ≤300 (10.0 publish gate)    | F-LINK  | P0  | done    |
| S33-05 | M5 re-audit core ≥10.0                         | F-AUD   | P1  | done        |

**10/10 IDs:** BG-10-22 … BG-10-26 · Authority: `audit/master-audit-m4-2026-06-10.md` §Remaining P1

## Sprint 34 — Constitution hub maturity (P5) — **complete**

**Goal:** Rubric-driven five-core composite; unlock technical-excellence pillar via audit-output witness.

| Story        | Title                                      | Feature | P   | Status      |
| ------------ | ------------------------------------------ | ------- | --- | ----------- |
| CANON-P1-001 | Seed `audit-output` + five-core refresh    | F-AUD   | P0  | done        |
| CANON-P1-002 | Shipping culture witnesses                   | F-PM    | P1  | done        |
| CANON-P1-003 | P35 strict sustained (ops/coordination)    | F-P35   | P1  | done        |
| CANON-P2-001 | Dead links < 200 (126 after basename repair) | F-LINK  | P2  | done        |

**Authority:** `audit/10-10-roadmap-2026-06-11.md` · `pm/roadmap/sprints/active.json`

## Sprint 35 — M3 reference burn-down (P5) — **complete**

**Goal:** P35 strict GREEN; dead-link ratchet toward M3 &lt; 100; refresh five-pillar witnesses.

| Story        | Title                                              | Feature | P   | Status      |
| ------------ | -------------------------------------------------- | ------- | --- | ----------- |
| CANON-P3-001 | P35 Q2 — retire stale `docs/agent-provisioning/`   | F-P35   | P0  | done        |
| CANON-P3-002 | Dead links &lt; 100 (M3 reference gate) — **79**     | F-LINK  | P1  | done        |
| CANON-P3-003 | Five-pillar refresh after P35 strict GREEN         | F-AUD   | P1  | done        |

**Authority:** `audit/10-10-roadmap-2026-06-11.md` · INIT-CANON-MATURITY M3

## Sprint 36 — M3 hygiene + validate green (P5) — **complete**

**Goal:** Full `pnpm validate` green; refresh fleet witnesses; advance composite toward 85.

| Story        | Title                                      | Feature | P   | Status      |
| ------------ | ------------------------------------------ | ------- | --- | ----------- |
| CANON-P4-001 | Frontmatter tier enum alignment (6 docs)   | F-DOC   | P0  | done        |
| CANON-P4-002 | `validate:m3-hub` + full validate gate       | F-CI    | P1  | done        |
| CANON-P4-003 | Five-pillar + readiness snapshot refresh   | F-AUD   | P1  | done        |

**Authority:** `audit/10-10-roadmap-2026-06-11.md` §M3 Reference · INIT-CANON-MATURITY

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 36 sealed)

## Sprint 37 — Compliance 100 sustain + TE path (P5) — **complete**

**Goal:** Sustain compliance **100** published; burn dead links; advance TE toward **85** unlock.

| Story        | Title                                              | Feature | P   | Status      |
| ------------ | -------------------------------------------------- | ------- | --- | ----------- |
| CANON-P5-001 | Witness-latest + audit-output findings reconcile   | F-AUD   | P0  | done        |
| CANON-P5-002 | Dead-link ratchet hygiene (checker + active fixes) | F-LINK  | P1  | done        |
| CANON-P5-003 | Five-pillar + five-core refresh (TE evidence)      | F-AUD   | P1  | done        |

**Outcomes:** compliance **100** · dead links **43** (was 78) · TE **77** (unlock at 85 deferred) · five-core **78.7**

**Authority:** `audit/10-10-roadmap-2026-06-11.md` · INIT-CANON-MATURITY M1→M2

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 37 sealed)

## Sprint 38 — TE unlock + security SoR (P5) — **complete**

**Goal:** TE pillar **≥ 85** published; security/access-control SoR; dead links **< 10**.

| Story        | Title                                           | Feature | P   | Status |
| ------------ | ----------------------------------------------- | ------- | --- | ------ |
| CANON-P6-001 | Security SoR — access matrix + gitleaks witness | F-SEC   | P0  | done   |
| CANON-P6-002 | Ops doc stubs — git workflow + docs playbook    | F-DOC   | P1  | done   |
| CANON-P6-003 | Dead links **6** + prune-dated-audit-reports    | F-LINK  | P1  | done   |
| CANON-P6-004 | TE **85** published + five-pillar refresh       | F-AUD   | P0  | done   |

**Outcomes:** compliance **100** · TE **85** published · composite **83** · five-core **85.8** · dead links **6**

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 38 sealed)

## Sprint 39 — Craft unlock + dead links zero (P5) — **complete**

**Goal:** Craft pillar **≥ 85** published; dead links **0**; composite toward **85**.

| Story        | Title                                        | Feature | P   | Status |
| ------------ | -------------------------------------------- | ------- | --- | ------ |
| CANON-P7-001 | Dead links **0** + template ratchet hygiene   | F-LINK  | P0  | done   |
| CANON-P7-002 | Craft evidence spec (`canon-hub-craft-evidence`) | F-AUD | P1  | done   |
| CANON-P7-003 | Craft **85** published + five-pillar refresh | F-AUD   | P0  | done   |
| CANON-P7-004 | Hub coordination witness (XR-509 still blocked)| F-COORD | P1  | done   |

**Outcomes:** Craft **85** published · TE **87** · composite **84** · five-core **88.5** · dead links **0**

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 39 sealed)

## Sprint 40 — World-class unlock + full composite (P5) — **complete**

**Goal:** World-class **≥ 85** published; `hygieneDimensionScores` wired for WC rollup; composite **≥ 85** full-unlock.

| Story        | Title                                              | Feature | P   | Status |
| ------------ | -------------------------------------------------- | ------- | --- | ------ |
| CANON-P8-001 | `hygieneDimensionScores` in audit-output for WC    | F-AUD   | P0  | done   |
| CANON-P8-002 | World-class **93** + composite **89** full-unlock  | F-AUD   | P0  | done   |
| CANON-P8-003 | INIT-CANON-MATURITY sealed at target composite     | F-MAT   | P0  | done   |

**Outcomes:** WC **93** published · composite **89** full-unlock · Trust cap **94** · INIT-CANON-MATURITY **done**

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 40 sealed · maturity initiative complete)

---

## Coordination phase — post INIT-CANON-MATURITY (active)

**Goal:** Hub bridge + inbound for owner-repo XR; no product implementation in canon-os.

| Work ID   | Owner            | Status    | Hub action                                      |
| --------- | ---------------- | --------- | ----------------------------------------------- |
| **XR-516** | human           | blocked   | SPEC §17 co-author sign-off (Class S)             |
| **INIT-HUB-SCOPE-GUARD** | bridge-os + agile-os | open | Fleet guardrails + DoD — inbounds 2026-06-13 |
| —         | ledger-ui        | in_progress | `@gtcx/ui@0.4.2` ready — npm publish blocked (NPM_TOKEN Class S) |

**Closed (Sprint 41–43):** XR-509 · XR-501 · XR-502–504 · XR-303 · XR-515 (`fabric-os@22dc602`)

**Hub gates:** `pnpm validate` · `validate:hub-workplan` · `validate:hub-claims` — green 2026-06-12

**Last reconciled:** 2026-06-12 (execute-roadmap — hub coordination sync; owner repos only)

---

## Sprint 41 — Coordination execute (P6) — **complete**

**Goal:** Advance P0 XR-509 owner prep; sustain hub bridge + gates while maturity initiative sealed.

| Story        | Title                                              | Feature | P   | Status |
| ------------ | -------------------------------------------------- | ------- | --- | ------ |
| CANON-C1-001 | execute-roadmap reconcile — coordination sprint seed | F-COORD | P0  | done   |
| CANON-C1-002 | XR-509 `@gtcx/mcp` owner build + test witness      | F-XR    | P0  | done   |
| CANON-C1-003 | Protocols workspace dep fix (`crypto` / `zkp-kat`) | F-XR    | P0  | done   |
| CANON-C1-004 | XR-509 NPM publish witness reconcile               | F-XR    | P0  | done   |

**Outcomes:** `@gtcx/mcp@0.1.0` on npm (published 2026-06-04) · registry verify 2026-06-12 · hub stale blocker cleared

**Owner evidence:** `https://registry.npmjs.org/@gtcx/mcp` · `mcp-npm-publish-readiness-2026-06-04.json`

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 41 sealed · XR-509 done)

---

## Sprint 42 — P1 coordination execute (P6) — **complete**

**Goal:** Advance P1 XR rows in owner repos; hub bridge witness only.

| Story        | Title                                    | Feature | P   | Status |
| ------------ | ---------------------------------------- | ------- | --- | ------ |
| CANON-C2-001 | XR-509 hub reconcile (npm already live)  | F-COORD | P0  | done   |
| CANON-C2-002 | XR-303 `@gtcx/ui` consumer (platforms) | F-XR    | P1  | done   |
| CANON-C2-003 | XR-501 validators 0.5.0 (exploration-os) | F-XR  | P1  | done   |
| CANON-C2-004 | XR-502–504 W2 diligence (compliance-os)  | F-XR    | P1  | done   |

**Outcomes:** XR-303 agx/crx/sgx `@gtcx/ui@0.4.1` file consumer · **agx `next build` exit 0** · npm tarball lacks `dist/` (ledger-ui republish follow-up)

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 42 sealed)

---

## Sprint 43 — Hub bridge sustain (P6) — **complete**

**Goal:** Sustain gates after P1 register clear; document Class S + P2 follow-ups.

| Story        | Title                                      | Feature | P   | Status  |
| ------------ | ------------------------------------------ | ------- | --- | ------- |
| CANON-C3-001 | Coordination phase table sync post S42     | F-COORD | P0  | done    |
| CANON-C3-002 | Rollup test fix (empty P1 rows allowed)    | F-CI    | P1  | done    |
| CANON-C3-003 | ledger-ui `@gtcx/ui` dist republish inbound | F-XR   | P2  | done    |
| CANON-C3-004 | XR-516 human gate inbound (Class S)        | F-COORD | P0  | blocked |

**Outcomes:** Hub gates green · P1 register clear · XR-516 Class S inbound filed · ledger-ui dist follow-up inbound filed

**Last reconciled:** 2026-06-12 (execute-roadmap — Sprint 43 sealed · XR-516 Class S pending)

---

**Hub execute status:** **complete** — INIT-DOC-FLEET-PUBLISH hub phase **sealed** (Sprints 44–47). Fleet owner extension continues via inbounds + quarterly refresh protocol.

**Last reconciled:** 2026-06-13 (execute-roadmap — INIT-DOC-FLEET-PUBLISH hub sealed · S47-03)

---

## Sprint 44 — Publish register + fleet matrix (P4) — **sealed**

**Goal:** Establish SoR for fleet documentation coverage; expand `pm/publish-register.json` v2.

| Story | Title                                              | Feature | JTBD impact              | Personas     | P   | Status |
| ----- | -------------------------------------------------- | ------- | ------------------------ | ------------ | --- | ------ |
| S44-01 | Fleet coverage matrix + publish register v2         | F-DOC   | Doc program visibility   | Product lead | P0  | done   |
| S44-02 | Program charter + execution-roadmap P4 activation   | F-DOC   | Hub mission alignment    | Product lead | P0  | done   |
| S44-03 | Link matrix in REGISTRY + agent provisioning bundle | F-GOV | Agent session load       | P10          | P1  | done   |
| S44-04 | Sprint 44 evidence + documentation dimension plan | F-AUD   | Path to 100/100          | P2           | P1  | done   |

**Outcomes:** publish register **v2** · coverage matrix **22 rows** · initiative **INIT-DOC-FLEET-PUBLISH** active · evidence `docs/reference/audits/sprint-44-doc-fleet-seed-2026-06-13.md`

---

## Sprint 45 — GitBook wave 1 (P4) — **sealed**

**Goal:** Expand ecosystem GitBook; define sync contracts for next 3 product spaces.

| Story | Title                                      | Feature | P   | Status  |
| ----- | ------------------------------------------ | ------- | --- | ------- |
| S45-01 | Ecosystem SUMMARY expansion plan (≥20 pages) | F-DOC   | P0  | done   |
| S45-02 | Legacy guides → gitbook migration map      | F-DOC   | P0  | done   |
| S45-03 | Inbound sync contracts: compliance, mobile, ledger-ui | F-GOV | P1 | done   |

---

## Sprint 46 — GTM + developer index (P4) — **sealed**

| Story | Title                                           | Feature | P   | Status  |
| ----- | ----------------------------------------------- | ------- | --- | ------- |
| S46-01 | `ops/gtm/` fleet catalog index                  | F-DOC   | P0  | done   |
| S46-02 | API/SDK/onboarding matrix + owner inbound wave  | F-GOV   | P0  | done   |
| S46-03 | Developer docs entry in gitbook/ecosystem     | F-DOC   | P1  | done   |

---

## Sprint 47 — Documentation audit 100 (P4) — **sealed**

**Goal:** Every documentation-audit pillar at **100/100** (compliance · TE · craft · world-class · trust envelope). Plan: [`documentation-pillar-100-closure-plan-2026-06-13.md`](./documentation-pillar-100-closure-plan-2026-06-13.md)

| Story | Title                                           | Feature | P   | Status  |
| ----- | ----------------------------------------------- | ------- | --- | ------- |
| S47-C01 | Craft closure — ai-slop + scaffold burn         | F-AUD   | P0  | done   |
| S47-01 | LINKaaS integrity — internal links ≤25 (target 0) | F-LINK  | P0  | done   |
| S47-02 | World-class + documentation pack 100 witness    | F-AUD   | P0  | done   |
| S47-T01 | Trust envelope — confidence A + anti-hallucination | F-AUD | P0  | done   |
| S47-03 | Quarterly refresh protocol + INIT sealed        | F-GOV   | P1  | done   |

**Outcomes:** trust **100** · LINKaaS **0** · pack **100** · quarterly refresh protocol · INIT hub **sealed** · evidence [`sprint-47-init-sealed-2026-06-13.md`](../reference/audits/sprint-47-init-sealed-2026-06-13.md)

---

## Coordination milestone — hub automatable backlog (parallel)

**INIT-CANON-MATURITY** and **Sprint 41–43** hub stories **complete**. Remaining execution is **owner-repo XR** + **Class S human gates** (XR-516, H-03–H-07).

| Gate (2026-06-12) | Exit |
| ----------------- | ---: |
| `pnpm validate` | 0 |
| `pnpm test` | 40/40 |
| `validate:coordination-drift` | pass |

**Hub execute status:** **complete** — no further automatable stories until owner evidence or Class S unblock.

**Last reconciled:** 2026-06-12 (execute-roadmap — ledger-ui@2b417d27 ui dist prep; npm publish Class S)
