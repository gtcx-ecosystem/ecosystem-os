---
title: "Cloud placement — documentation index"
status: current
date: 2026-06-05
owner: gtcx-docs
document_id: OPS-CLOUD-PLACE-INDEX
canonical_hub: true
review_cycle: quarterly
classification: internal
---

# Cloud placement documentation

**SoR:** `gtcx-docs` — ecosystem-wide architecture (AWS control plane + GCP ML plane). **Not** owned by any product repo.

**Purpose:** Single entry point for how the GTCX ecosystem optimizes across **AWS** (control plane) and **GCP** (ML factory), without single-cloud migration.

---

## Read order (agents)

| Order | Document | Audience |
| ----- | -------- | ---------- |
| 1 | [`gtcx-ecosystem-2026-06-05.md`](./gtcx-ecosystem-2026-06-05.md) | Everyone — **normative matrix** (short) |
| 2 | [`repo-register-2026-06-05.md`](./repo-register-2026-06-05.md) | Architects, leads — **per-repo placement spec** |
| 3 | Repo annex (your repo only) | Implementers — see § Repo annexes below |
| 4 | [compliance-os W2 hosting decision](https://github.com/gtcx-ecosystem/compliance-os/blob/main/01-docs/04-ops/coordination/w2-hosting-decision-2026-06-05.md) | W2 / terminal / compliance deploy owners (product ops) |

**Session start (ecosystem):** [gtcx-protocols playbook §6](https://github.com/gtcx-ecosystem/gtcx-protocols/blob/main/01-docs/04-ops/coordination/ecosystem-unblock-playbook-2026-06.md) → this README → normative spec.

---

## Document taxonomy

| Layer | Location | Role |
| ----- | -------- | ---- |
| **Normative** | `gtcx-ecosystem-2026-06-05.md` | Workload matrix, bridge, anti-patterns, agent checklists — **do not duplicate** |
| **Register** | `repo-register-2026-06-05.md` | Every Tier 1–3 repo: role, hosting, AWS/GCP, optimize / do-not, blockers |
| **Repo annex** | Each repo `01-docs/04-ops/coordination/cloud-placement-*.md` | Team-specific execution detail (≤2 pages) |
| **W2 hosting** | `compliance-os/01-docs/04-ops/coordination/w2-hosting-decision-2026-06-05.md` | D3: EKS vs Vercel — **product coordination**, not in this hub |
| **Legacy pointer** | `compliance-os/01-docs/04-ops/cloud-placement-2026-06-05.md` | Compliance one-pager → points here |

---

## Repo annexes (maintained by owner repo)

| Repo | Annex path |
| ---- | ---------- |
| gtcx-infrastructure | [`cloud-placement-aws-control-plane-2026-06-05.md`](https://github.com/gtcx-ecosystem/gtcx-infrastructure/blob/main/01-docs/04-ops/coordination/cloud-placement-aws-control-plane-2026-06-05.md) |
| gtcx-intelligence | [`cloud-placement-gcp-ml-plane-2026-06-05.md`](https://github.com/gtcx-ecosystem/gtcx-intelligence/blob/main/01-docs/04-ops/coordination/cloud-placement-gcp-ml-plane-2026-06-05.md) |

Other repos: **no annex required** unless they host workloads — use register row only.

---

## Hub mirrors (read-only pointers)

| Hub | Pointer |
| --- | ------- |
| gtcx-protocols | `ecosystem-unblock-playbook-2026-06.md` §6 |
| baseline-os | `workstream/coordination/inbound/from-gtcx-docs-cloud-placement-2026-06-05.md` |
| gtcx-intelligence bridge | `cross-repo-bridge.md` Latest updates |
| gtcx-docs REGISTRY | **OPS-CLOUD-001** |

**Do not** copy the register into protocols or baseline-os — link only.

---

## Maintenance

| When | Action |
| ---- | ------ |
| New repo in ecosystem | Add row to `repo-register-2026-06-05.md` + coordination inventory |
| New workload type | Update normative matrix first, then register |
| Phase 3 GCP bridge enabled | Update infra epic + intelligence annex; register maturity column |
| Quarterly review | Owner: **gtcx-docs** (protocol-architect) + gtcx-infrastructure platform lead |

**Document ID:** OPS-CLOUD-PLACE-001 (normative), OPS-CLOUD-PLACE-002 (register).
