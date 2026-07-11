# platforms/ecosystem — nested git (Class A — sealed)

**Status:** **keep-as-nested** (DOMAIN-INFRA-060 · 2026-07-11)

`platforms/ecosystem/` retains a nested `.git` from the OP-ECO hub fold (remote: `gtcx-ecosystem/ecosystem-os`). Vertical infra git **gitignores** this tree. Shell hygiene does **not** absorb or delete nested history.

| Action | Class | Status |
| ------ | ----- | ------ |
| Thin polyrepo leftovers | R | Done |
| Keep nested `.git` (SoR = ecosystem-os remote) | A | **Sealed** |
| Absorb into vertical history | A | Deferred — new story + runbook required |
| Force-delete nested `.git` | S | Forbidden |

**Decision:** `product/gitbook/architecture/decision-ecosystem-nested-git-keep-2026-07-11.md`  
**Blocker:** `fleet/coordination/blockers/BLK-ECOSYSTEM-NESTED-GIT-001.md` (resolved)
