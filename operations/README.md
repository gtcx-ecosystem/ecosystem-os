# operations — ecosystem-os

Runnable verify surface — **Protocol 27** execution obligation.

| Artifact        | Path                                             |
| --------------- | ------------------------------------------------ |
| Manifest        | [`manifest.json`](./manifest.json)               |
| Verify commands | [`verify.json`](./verify.json)                   |
| Fabric contract | [`fabric-contract.json`](./fabric-contract.json) |
| COO connection  | [`coo.md`](./coo.md)                             |

**Narrative:** [`docs/operations/README.md`](../docs/operations/README.md) · [`docs/gitbook/PUBLISH.md`](../docs/gitbook/PUBLISH.md)

Agents **must** run listed commands in-session and report **command → exit code**.

## Fabric domain mapping

[`fabric-contract.json`](./fabric-contract.json) binds this repo to the seven
domains required by [`fabric-os/pm/spec/fabric-ops-policy-contract.json`](../../fabric-os/pm/spec/fabric-ops-policy-contract.json)
(verified fleet-wide by `pnpm --dir ../fabric-os fabric:ops-contracts:check`).

| Fabric domain  | Local backing                                                  |
| -------------- | -------------------------------------------------------------- |
| compliance     | `compliance/` · `audit/evidence/compliance-pillar-latest.json` |
| apiTokens      | `security/` · `config/ops.manifest.json`                       |
| deployment     | `docs/operations/deployment/` · `config/ops.manifest.json`     |
| security       | `security/` · `docs/operations/repo/SECURITY.md`               |
| observability  | `attestation/`                                                 |
| evidence       | `audit/evidence/five-pillar-latest.json` · `ops-latest.json`   |
| opsConsumption | `coo.md` · `manifest.json` · `machine/spec/ops-pack.json`      |

**Repo-local domains** (intentionally *not* fabric-synced): `assurance/`,
`coordination/`, `gtm/`, `legal/`, `machine/` — owned here, no central
`fabric-os/ops/*` counterpart.

> Cross-repo note: `fabric-os` resolves this contract at `operations/fabric-contract.json`
> (canonical) and via the back-compat `ops/` symlink until central alias support ships.
> **Do not** remove the `ops → operations` shim unilaterally.

**Self-check:** `pnpm --dir ../fabric-os fabric:ops-contracts:check` · **Taxonomy:** [`config/folders.json`](../config/folders.json)
