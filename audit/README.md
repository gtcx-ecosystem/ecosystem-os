# audit — ecosystem-os

Audit workflow entry and forensic report registry for this repository.

| Resource | Path |
| -------- | ---- |
| **Agent start** | [`AGENT-START.md`](./AGENT-START.md) |
| **Five-core index** | [`FIVE-CORE-AUDITS.md`](./FIVE-CORE-AUDITS.md) |
| **Machine evidence** | [`evidence/`](./evidence/) |

Run layout gates before claiming audit complete: `pnpm ops:check`.

## Five-core save-format & compile-to-backlog

Methodology SoR is **bridge-os** ([`five-core-audits.json`](../../bridge-os/pm/spec/five-core-audits.json)); folder save-format is governed by [`L1-audit.json`](../../canon-os/machine/spec/repo-provisioning/L1-audit.json). Exactly five core audits per repo — no drift types.

| Core | Dated report | Witness |
| ---- | ------------ | ------- |
| A1 Product Excellence | `product-excellence-audit-{date}.md` | `evidence/product-excellence-audit-latest.json` |
| A2 Production Grade | `production-grade-audit-{date}.md` | `evidence/production-grade-audit-latest.json` |
| A3 Agentic Innovation | `agentic-innovation-audit-{date}.md` | `evidence/agentic-innovation-audit-latest.json` |
| A4 Compliance & Security | `compliance-security-audit-{date}.md` | `evidence/compliance-security-audit-latest.json` |
| A5 Repo Hygiene | `repo-hygiene-audit-{date}.md` | `evidence/repo-hygiene-audit-latest.json` |

**Compile-to-backlog:** five witnesses → weighted **composite** ([`evidence/composite-audit-latest.json`](evidence/composite-audit-latest.json)) → `machine/shipping-tracks.json` progressPct → delivery backlog (`machine/backlog.json`). Findings become work through the shipping-tracks pipeline, **not** by hand-editing the backlog.

Off-registry / superseded reports are scrubbed to `archive/superseded/audits/` — never deleted.

## Audit cadence

- **Drift check:** `pnpm --dir ../bridge-os ecosystem:five-core-audits:check -- --repo ecosystem-os`
- **Scrub:** `pnpm --dir ../bridge-os ecosystem:audit:scrub -- --repo ecosystem-os --write`
