---
title: 'INIT-DOC-FLEET-PUBLISH — Fleet documentation & publishing program'
status: reopened
date: 2026-06-15
owner: canon-os
initiative: INIT-DOC-FLEET-PUBLISH
tier: operating
review_cycle: quarterly
---

# INIT-DOC-FLEET-PUBLISH

**Authority:** canon-os (Layer 0 documentation services)  
**Mission:** World-class, crafted, maintained, refreshed, audited, protocoled, standardized documentation and publishing across the GTCX fleet.

**Status:** **Reopened v3** 2026-06-15 — P0 intake pillar 5 honest bar **NO** (scaffold PASS, quality gap 95). Prior hub seal 2026-06-13 retained as witness only; [`INIT-DOC-QUALITY-V3`](../governance/documentation-program-quality-bar.md) supersedes exit criteria until quality-bar fleet gate green.

**Not:** Product implementation in owner repos. **Is:** Publish register, GitBook canon, GTM index, developer surface matrix, doc promotion, audit cadence, owner inbounds for source gaps.

---

## Program exit (Definition of Done)

| Signal | Target |
| ------ | ------ |
| **Documentation audit pillars** | **100/100** each — compliance · technical excellence · craft · world-class · trust envelope |
| Documentation dimension | **100/100** published (from **85**) |
| Publish register | Every fleet repo row: GitBook · GTM · dev/onboarding · audit witness |
| GitBook | Ecosystem space **live** + ≥8 product spaces **synced** (not scaffold-only) |
| GTM | `ops/gtm/` catalog covers vertical + security + executive evidence |
| Legacy migration | v1.1 `guides/` + `overview/product/` promoted or archived per P1 v2.0 |
| Refresh cadence | Quarterly doc audit + publish register witness in `audit/evidence/` |

---

## Sprint map (hub execute-roadmap)

| Sprint | Theme | Exit |
| ------ | ----- | ---- |
| **44** | Register + matrix SoR | `pm/publish-register.json` v2 · coverage matrix green rows for canon-os + protocols |
| **45** | GitBook wave 1 | Ecosystem SUMMARY ≥20 pages · protocols + compliance + mobile sync contracts |
| **46** | GTM + developer index | GTM catalog · API/SDK/onboarding matrix · owner inbounds filed |
| **47** | Audit to 100 | **All five doc pillars 100** · LINKaaS ≤25 · craft uncapped · trust ≥98 |

---

## Owner split

| Layer | Repo | Role |
| ----- | ---- | ---- |
| **Governance SoR** | canon-os | Register, matrix, protocols, validate gates, GitBook hub paths |
| **Authoring** | Owner repos | Product API, runbooks, repo onboarding source |
| **Sync** | Owner → canon-os | `sync:gitbook` per product; hub never hand-edits synced trees |
| **Program tracking** | agile-os | Initiative rollup (HSG-A08 sibling) |
| **Fleet harness** | bridge-os | PublishaaS / ceremony checks |

---

## Related

- [`execution-roadmap.md`](./execution-roadmap.md) — Sprint 44–47 stories
- [`documentation-fleet-coverage-matrix.md`](../reference/documentation-fleet-coverage-matrix.md)
- [`pm/publish-register.json`](../../pm/publish-register.json)
- [`documentation-pillar-100-closure-plan-2026-06-13.md`](./documentation-pillar-100-closure-plan-2026-06-13.md)
- [`documentation-quarterly-refresh-protocol.md`](../governance/documentation-quarterly-refresh-protocol.md) — sustain cadence post seal
