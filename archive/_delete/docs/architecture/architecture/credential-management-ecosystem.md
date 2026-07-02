---
title: 'Credential Management — Ecosystem Architecture'
status: 'current'
date: '2026-05-28'
owner: 'gtcx-docs'
role: 'protocol-architect'
agent_id: 'agent://canon-os/2026-05-28/doc-organization'
trust_score: 60
autonomy_level: 'permissioned'
tier: operating
tags: ['documentation', 'architecture', 'security', 'credentials']
review_cycle: 'on-change'
---

# Credential Management — Ecosystem Architecture

> **Canonical location:** `canon-os/01-docs/architecture/credential-management-ecosystem.md`  
> **Scope:** Cross-repo credential flow for the entire GTCX ecosystem (inbound / operator credentials)  
> **Product implementation:** See `@baselineos/vault` in `baseline-os/03-platform/packages/vault/`  
> **Agent integration:** See `gtcx-agentic/01-docs/09-security/vault-integration.md`  
> **External customer & government API access:** See [external-access-credential-plane.md](./external-access-credential-plane.md) — **separate plane**, not Baseline Vault.

---

## Credential planes (inbound vs outbound)

| Plane | Direction | Examples | System |
| --- | --- | --- | --- |
| **Inbound** (this doc) | GTCX → providers | `ANTHROPIC_API_KEY`, DB URLs | Baseline Vault, Protocol 19 |
| **Outbound** (EAP) | Customers → GTCX | `GTCX_API_KEY`, OAuth clients, regulator mTLS | External Access Plane — [research doc](./external-access-credential-plane.md) |

Do not store customer API keys in Baseline Vault as the long-term issuer. Vault may cache smoke-test references only until EAP ships.

---

## The Complete Picture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECRET LIFECYCLE                                    │
│                                                                             │
│  CREATE ──► STORE ──► ACCESS ──► USE ──► EXPIRE ──► ROTATE ──► AUDIT      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         WHO HOLDS WHAT                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │   HUMAN      │    │   GITHUB     │    │  BASELINEOS  │                 │
│  │  (You + Ops) │    │   (CI Only)  │    │   (Runtime)  │                 │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                 │
│         │                   │                   │                           │
│         │ Creates           │ Stores            │ Stores + Controls         │
│         │                   │                   │                           │
│         ▼                   ▼                   ▼                           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │ 4 CI Secrets │    │ TURBO_TOKEN  │    │ ANTHROPIC_   │                 │
│  │ (rotated by  │    │ NPM_TOKEN    │    │ API_KEY      │                 │
│  │  you)        │    │ TURBO_TEAM   │    │ OPENAI_      │                 │
│  └──────────────┘    │ GITHUB_TOKEN │    │ API_KEY      │                 │
│                      └──────────────┘    │ TAVILY_KEY   │                 │
│                                          │ SENTRY_DSN   │                 │
│                                          │ Agent keys   │                 │
│                                          │ Cross-repo   │                 │
│                                          │   leases     │                 │
│                                          └──────────────┘                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         ACCESS FLOW                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CI BUILD (GitHub Actions)                                                  │
│  ─────────────────────────                                                  │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                 │
│  │  Repo A │───►│  Repo B │───►│  Repo C │───►│  Repo D │  ... 24 repos   │
│  └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘                 │
│       │              │              │              │                        │
│       └──────────────┴──────────────┴──────────────┘                        │
│                      │                                                      │
│                      ▼                                                      │
│            ┌─────────────────┐                                              │
│            │  GitHub Org     │  ◄── TURBO_TOKEN, NPM_TOKEN                 │
│            │  Secrets        │                                              │
│            └─────────────────┘                                              │
│                                                                             │
│  RUNTIME (BaselineOS Vault)                                                 │
│  ───────────────────────────                                                │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                 │
│  │  Repo A │───►│  Repo B │───►│  Repo C │───►│  Repo D │  ... 24 repos   │
│  └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘                 │
│       │              │              │              │                        │
│       └──────────────┴──────────────┴──────────────┘                        │
│                      │                                                      │
│                      ▼                                                      │
│            ┌─────────────────┐                                              │
│            │  BaselineOS     │  ◄── ANTHROPIC_KEY, OPENAI_KEY, etc.        │
│            │  Vault          │                                              │
│            │  (1 source of   │                                              │
│            │   truth)        │                                              │
│            └────────┬────────┘                                              │
│                     │                                                       │
│         ┌───────────┼───────────┐                                           │
│         │           │           │                                           │
│         ▼           ▼           ▼                                           │
│    ┌────────┐  ┌────────┐  ┌────────┐                                      │
│    │ Claude │  │  Kimi  │  │ Cursor │  ... all agents                     │
│    │ (lease)│  │ (lease)│  │ (lease)│                                      │
│    └────────┘  └────────┘  └────────┘                                      │
│                                                                             │
│  AGENT ACCESS (Scoped Leases via gtcx-agentic MCP)                          │
│  ─────────────────────────────────────────────────                          │
│  Agent: "I need anthropic key for task-123"                                 │
│     │                                                                       │
│     ▼                                                                       │
│  gtcx-agentic: "Trust score 75. Accessing vault..."                         │
│     │                                                                       │
│     ▼                                                                       │
│  Vault: "Scoped to anthropic + openai. 1h lease issued."                   │
│     │                                                                       │
│     ▼                                                                       │
│  Audit: "Agent accessed anthropic at 14:23 for task-123"                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Rule of One

| Question                        | Answer                                                                     |
| ------------------------------- | -------------------------------------------------------------------------- |
| **One place to create secrets** | Human creates in the right tier (GitHub for CI, Vault for runtime)         |
| **One place to store secrets**  | GitHub org secrets (4) + BaselineOS vault (everything else)                |
| **One place to access secrets** | GitHub Actions for CI / `baseline_vault` MCP tool for runtime              |
| **One place to rotate secrets** | You rotate CI quarterly / Vault auto-rotates runtime monthly               |
| **One place to audit secrets**  | GitHub audit log for CI / Vault SQLite + gtcx-agentic AuditLog for runtime |
| **One place to revoke secrets** | GitHub org settings for CI / Vault MCP tool for runtime                    |

---

## The Decision Tree

```
Is this credential for an EXTERNAL actor calling GTCX APIs?
├── YES ──► External Access Plane (EAP) — NOT Baseline Vault
│           └── See external-access-credential-plane.md (OAuth / API key / mTLS tiers)
│
└── NO ──► Inbound / operator credential (continue below)

Is this secret needed at BUILD time? (Turborepo, npm, GitHub API)
├── YES ──► GitHub Org Secret
│           └── Set via: gh secret set --org gtcx-ecosystem
│
└── NO ──► Is this secret needed by an AGENT? (Claude, Kimi, etc.)
    ├── YES ──► BaselineOS Vault + Agent Scope + gtcx-agentic MCP
    │           └── Access via: baseline_vault MCP tool
    │
    └── NO ──► Is this secret shared across REPOS? (LLM key, DB creds)
        ├── YES ──► BaselineOS Vault + Repo Lease
        │           └── Access via: vault.issueLease() (1h TTL)
        │
        └── NO ──► BaselineOS Vault + Standard Lease
                    └── Access via: vault.issueLease(workflowId)
```

---

## Secrets Tier Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECRETS TIER MODEL                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TIER 1: CI / Build Secrets (GitHub Org)                        │
│  ├── TURBO_TOKEN          ──► GitHub org secret                 │
│  ├── NPM_TOKEN            ──► GitHub org secret                 │
│  └── GITHUB_TOKEN         ──► GitHub-provided                   │
│                                                                  │
│  TIER 2: Runtime Secrets (BaselineOS Vault)                     │
│  ├── ANTHROPIC_API_KEY    ──► CredentialVault (opaque lease)    │
│  ├── OPENAI_API_KEY       ──► CredentialVault (opaque lease)    │
│  ├── TAVILY_API_KEY       ──► CredentialVault (opaque lease)    │
│  └── Provider tokens      ──► CredentialVault (OAuth refresh)   │
│                                                                  │
│  TIER 3: Agent Secrets (BaselineOS Vault + Per-Agent Scope)     │
│  ├── Claude API key       ──► Scoped to claude persona          │
│  ├── Kimi API key         ──► Scoped to kimi persona            │
│  └── Cursor API key       ──► Scoped to cursor persona          │
│                                                                  │
│  TIER 4: Cross-Repo Secrets (BaselineOS Vault + Repo Lease)     │
│  ├── Shared LLM key       ──► Repo-scoped lease (TTL: 1h)       │
│  ├── Shared db creds      ──► Repo-scoped lease (TTL: 24h)      │
│  └── Registry tokens      ──► Repo-scoped lease (TTL: 1h)       │
│                                                                  │
│  OUT OF SCOPE HERE — EXTERNAL ACCESS PLANE (EAP)                │
│  ├── GTCX_API_KEY / OAuth clients  ──► EAP (future service)     │
│  └── Regulator mTLS + TradePass DIDs ──► EAP + TradePass        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Tier 1: CI / Build Secrets

**What stays in GitHub:** Secrets needed at build time, before BaselineOS is running.

| Secret         | Scope | Why GitHub                                               |
| -------------- | ----- | -------------------------------------------------------- |
| `TURBO_TOKEN`  | Org   | Turborepo remote caching needs this before any code runs |
| `TURBO_TEAM`   | Org   | Turborepo team slug for cache namespace                  |
| `NPM_TOKEN`    | Org   | npm publish in CI release workflows                      |
| `GITHUB_TOKEN` | Auto  | GitHub-provided, used for releases, issues, triggers     |

**Policy:**

- Set once at org level via `gh secret set --org gtcx-ecosystem`
- Rotation: quarterly, coordinated with BaselineOS vault rotation
- Audit: GitHub audit log + `check-secrets.mjs` scans

**Commands to run (one-time setup):**

```bash
gh secret set TURBO_TOKEN --org gtcx-ecosystem --visibility all
gh variable set TURBO_TEAM --org gtcx-ecosystem --body "<team-slug>"
gh secret set NPM_TOKEN --org gtcx-ecosystem --visibility all
```

### Tier 2: Runtime Secrets (BaselineOS Vault)

All application runtime secrets. Resolved via `@baselineos/vault` with:

- AES-256-GCM encryption at rest
- PBKDF2 key derivation (100k iterations)
- SQLite persistence with WAL mode
- Time-boxed opaque leases
- Per-credential audit trail
- Health monitoring

**Mapping:**

| Secret              | Current Location    | Target Location  | Lease TTL   |
| ------------------- | ------------------- | ---------------- | ----------- |
| `ANTHROPIC_API_KEY` | `.env` in 5+ repos  | BaselineOS Vault | 1 hour      |
| `OPENAI_API_KEY`    | `.env` in 3+ repos  | BaselineOS Vault | 1 hour      |
| `TAVILY_API_KEY`    | `.env` in 2 repos   | BaselineOS Vault | 24 hours    |
| `SENTRY_DSN`        | `.env` in all repos | BaselineOS Vault | 30 days     |
| `BASELINE_API_KEY`  | `.env`              | BaselineOS Vault | Per-session |

### Tier 3: Agent Secrets (Per-Agent Scope)

All agent keys flow through BaselineOS vault with per-agent scoping. See `gtcx-agentic/01-docs/09-security/vault-integration.md` for the TrustManager + ABAC integration.

### Tier 4: Cross-Repo Secrets (Repo-Scoped Leases)

One key in BaselineOS vault. Repo-scoped leases on demand. See Protocol 19 for lease API conventions.

---

## Before vs After

### Before (Today)

```
24 repos × 5 keys × .env files = 120 secret locations

Repo A: .env ──► ANTHROPIC_KEY=v1
Repo B: .env ──► ANTHROPIC_KEY=v1  (duplicate)
Repo C: .env ──► ANTHROPIC_KEY=v1  (duplicate)
...
Repo X: .env ──► ANTHROPIC_KEY=v1  (duplicate)

Rotation: Change in 24 places
Audit: None (who used what? no idea)
Scope: Any process can read any key
```

### After (Holistic)

```
4 CI secrets in GitHub org
1 vault with all runtime secrets
24 repos get leases on demand

Repo A: lease ──► ANTHROPIC_KEY (1h, task-123)
Repo B: lease ──► ANTHROPIC_KEY (1h, task-456)
Repo C: lease ──► ANTHROPIC_KEY (1h, task-789)

Rotation: Change in 1 place (vault)
Audit: Full trail (who, when, why)
Scope: Leases enforce time + task boundaries
```

---

## What You Do vs What the System Does

| Task                    | Human (You)             | System (BaselineOS + gtcx-agentic) |
| ----------------------- | ----------------------- | ---------------------------------- |
| Create CI secrets       | ✅ `gh secret set`      | ❌                                 |
| Create runtime secrets  | ✅ Vault UI or API call | ❌                                 |
| Rotate CI secrets       | ✅ Quarterly, manual    | ❌                                 |
| Rotate runtime secrets  | ❌                      | ✅ Monthly, auto-alert             |
| Issue leases to repos   | ❌                      | ✅ On-demand via API               |
| Issue leases to agents  | ❌                      | ✅ Scoped per agent via MCP        |
| Audit access logs       | ✅ Review monthly       | ✅ Log every access                |
| Revoke leaked key       | ✅ Emergency revoke     | ✅ Auto-expire leases              |
| Scan for hardcoded keys | ✅ Review findings      | ✅ `check-secrets.mjs` in CI       |

---

## Success Metrics

| Metric                | Before                  | After                  |
| --------------------- | ----------------------- | ---------------------- |
| Secret locations      | 120 (24 repos × 5 keys) | 5 (4 CI + 1 vault)     |
| Rotation time         | Days (manual, 24 repos) | Hours (1 vault update) |
| Audit coverage        | ~20%                    | 100%                   |
| Hardcoded keys        | Periodic findings       | Zero (CI gate)         |
| Agent key consistency | Inconsistent            | Unified scope model    |
| Blast radius on leak  | 24 repos compromised    | 1 lease revoked        |

---

## Failure Modes

| Scenario                  | Impact                    | Mitigation                                                                                                  |
| ------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Vault master key lost     | All secrets irrecoverable | Daily backup + restore runbook. Shamir sharing is **demonstration only** — do not rely on it in production. |
| Vault DB corrupted        | Secrets lost              | Daily backup + restore runbook                                                                              |
| Vault service down        | Repos can't get keys      | Offline lease caching (15 min grace)                                                                        |
| GitHub org secret leaked  | CI builds compromised     | Immediate rotation, audit log review                                                                        |
| Agent scope misconfigured | Agent accesses wrong key  | `agent-docs-check` validation gate                                                                          |
| Cross-repo lease leaked   | One repo compromised      | Short TTL limits exposure window                                                                            |

---

## Related Documents

| Document                                | Repo                  | Role                                          |
| --------------------------------------- | --------------------- | --------------------------------------------- |
| Protocol 23: External Access Credentials | `gtcx-docs`           | Outbound API keys, OAuth, government tiers    |
| External Access Credential Plane (research) | `gtcx-docs`        | Threat model, phased roadmap                  |
| Protocol 19: Agent Credential Access    | `gtcx-docs`           | Canonical rules for all agents                |
| `@baselineos/vault` README              | `baseline-os`         | Package API and security model                |
| Credential Vault Security Model         | `baseline-os`         | Product-layer encryption and scoping          |
| Vault Integration (TrustManager + ABAC) | `gtcx-agentic`        | How agents access vault via MCP               |
| Agent Security Model                    | `gtcx-agentic`        | GTCX-specific threat model and defense layers |
| Vault Dynamic Credentials Spec          | `gtcx-infrastructure` | HashiCorp Vault production deployment         |
| Vault Recovery Runbook                  | `baseline-os`         | Operational procedures for vault recovery     |
