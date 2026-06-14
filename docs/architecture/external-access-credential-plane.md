---
title: 'External Access Credential Plane — Research & Target Architecture'
status: 'current'
date: '2026-06-02'
owner: 'gtcx-docs'
role: 'protocol-architect'
tier: 'critical'
tags: ['architecture', 'security', 'api-keys', 'tradepass', 'credentials', 'research']
review_cycle: 'on-change'
journey_phase: 'Agentic Ops'
feature_id: 'AGT-F-004'
exr_id: 'EXR-pending-external-access-issuance'
---

# External Access Credential Plane — Research & Target Architecture

> **Status:** Current research (2026-06-02). Normative rules: [Protocol 23](../governance/protocols/external-access-credentials/protocol.md). Architecture decisions: [ADR-001](./adr/001-eap-control-plane-and-storage.md).  
> **Audience:** Security, platform, protocols, intelligence, infrastructure, agentic ops.  
> **Problem:** External customers, governments, and integrators need secure API access to GTCX. This is **not** the same as Baseline Vault (internal agent/provider secrets).

---

## 1. Executive summary

GTCX operates two **credential planes** that must never be conflated:

| Plane | Direction | Who | Purpose | Canonical system (target) |
| --- | --- | --- | --- | --- |
| **Inbound / operator** | Ecosystem → third parties | GTCX agents, CI, operators | Anthropic, ComplyAdvantage, DB URLs, etc. | **Baseline Vault** (`gtcx-agentic` SoR, `@baselineos/vault`) — [Protocol 19](https://github.com/gtcx-ecosystem/canon-os/blob/main/01-docs/governance/protocols/agent-credential-access/protocol.md) |
| **Outbound / external** | Third parties → GTCX | Customers, integrators, governments, DFIs | Call Intelligence, protocols APIs, SDKs | **External Access Plane (EAP)** — _to be built_ (not Baseline Vault) |

**Critical correction:** Storing `GTCX_API_KEY` in Baseline Vault for smoke tests is a **temporary injection pattern** for credentialed evidence packs. It does **not** define customer API key issuance. Attacks on external access will target the **outbound plane**; architecture must be designed accordingly.

---

## 2. Threat model (where attacks happen)

### 2.1 Assets

- **HTTP/gRPC API surfaces** (`intelligence.gtcx.trade`, staging, future gateway)
- **SDK credentials** (TypeScript/Python clients, mobile backends)
- **TradePass identities** (DIDs, VCs, authority keys for regulators)
- **Audit and evidence** (forgeable access logs, repudiation)

### 2.2 Adversaries

| Actor | Goal | Typical technique |
| --- | --- | --- |
| Stolen API key | Data exfiltration, quota burn, lateral API abuse | Leaked env, git, logs, support tickets |
| Integrator compromise | Persistent access as “legitimate” client | Long-lived static keys |
| Insider | Issue keys without approval trail | Manual Secrets Manager edits |
| Government impersonation | Fake regulator credentials | Weak authority onboarding |
| Agent confusion | Store customer keys in wrong vault tier | Wrong SoR, no classification |

### 2.3 Design invariants (non-negotiable)

1. **Plane separation** — Inbound provider secrets never share issuance UI, DB schema, or audit index with external client credentials.
2. **No long-lived bearer by default** — Prefer short-lived tokens with rotation; static API keys only where explicitly tiered and monitored.
3. **Every credential has an owner** — `tenant_id`, `subject_did`, or `client_id` on every issuance and use.
4. **Fail closed** — Missing auth config denies access (Intelligence already: empty `AUTH_API_KEYS` → 503).
5. **Evidence by default** — Issuance, use, deny, revoke, rotate produce **redacted, signed** artifacts linkable to EXR/audit contracts.
6. **Agent-safe** — Agents request leases; they do not mint customer credentials.

---

## 3. Industry conventions (2025–2026)

Synthesis from B2B SaaS, government API, and secrets-management practice:

### 3.1 Authentication patterns by integration type

| Pattern | Best for | GTCX mapping |
| --- | --- | --- |
| **Static API key** (`x-api-key`) | Server-to-server, dev onboarding, low-friction pilots | Tier-1 integrators, staging smoke; **must** have rotation, scopes, rate limits |
| **OAuth 2.0 Client Credentials** | M2M, SaaS partners, expiring tokens | Default for commercial integrators and `developer.gtcx.trade` |
| **OAuth 2.0 + PKCE** | User-delegated dashboards | Partner portals, regulator consoles |
| **mTLS + JWT** | High-trust government / bank-grade | National regulator hubs, cross-border data exchange |
| **Workload identity** (IAM, SPIFFE) | Internal mesh only | Infra-to-infra inside VPC — **not** external customers |

**Industry default:** API keys alone are insufficient for regulated external access; pair with **short TTL**, **scoped permissions**, **central revocation**, and **anomaly detection**.

### 3.2 Key lifecycle (must be productized)

```
REGISTER → ISSUE → USE → MONITOR → ROTATE → REVOKE → AUDIT (retain)
```

- **Central secrets manager** for storage (AWS SM, Vault, Akeyless-class) — not git, not chat.
- **Automated rotation** (30–90 days high-security; event-driven on anomaly).
- **Per-key attribution** (which tenant, which environment, which scope).
- **Never log secret values** — fingerprints only (Intelligence smoke already redacts).

### 3.3 Government / regulated integrators

- Prefer **cryptographic identity** (mTLS client certs, signed JWTs from known CAs) over shared secrets.
- **TradePass Authority DIDs** align with W3C VC ecosystem expectations (see `gtcx-protocols/protocols/tradepass/SPEC.md` §1.2.2).
- Separate **sandbox / production** trust anchors; no shared keys across environments.

---

## 4. GTCX ecosystem — current state

### 4.1 What exists today

| Component | External access posture | Gap |
| --- | --- | --- |
| **Intelligence HTTP SDK** | `AUTH_API_KEYS` allowlist in env / AWS SM `gtcx-intelligence/staging` | Manual ops issuance; no self-service portal |
| **TradePass** | Subject + Authority DIDs, VC issuance in code | Government onboarding ceremony separate from HTTP API keys |
| **gtcx-protocols SDK** | `apiKey` in client config | Consumer-supplied; no central issuer service documented |
| **Baseline Vault** | Leases for **inbound** provider keys (Protocol 19) | Correct for agents; **wrong** as customer key mint |
| **Roadmap** | `developer.gtcx.trade` API key portal (S4 enterprise roadmap) | Planned, not shipped |
| **gtcx-core** | Future “key issuance + attestation API” (SOC2 readiness) | Aspirational |

### 4.2 Documented confusion to eliminate

- Protocol 19 and [credential-management-ecosystem.md](./credential-management-ecosystem.md) describe **inbound** tiers (GitHub CI + Baseline Vault). They do **not** define external customer issuance.
- `GTCX_API_KEY` in deployment smoke is an **integrator credential** naming convention (`gtcx-protocols` deployment-proof-index), not a vault taxonomy entry for Anthropic-class secrets.
- Pilot key flow in `gtcx-intelligence/01-docs/04-ops/deploy-runbook.md` Phase 9 is **ops-mediated**, not productized EAP.

---

## 5. Target architecture — External Access Plane (EAP)

### 5.1 Logical architecture

```
                    EXTERNAL ACTORS
        ┌──────────────┬──────────────┬──────────────┐
        │  Integrator  │  Government  │   Mobile/    │
        │  (M2M)       │  (Authority) │   Partner    │
        └──────┬───────┴──────┬───────┴──────┬───────┘
               │              │              │
               │ OAuth/mTLS   │ TradePass    │ API key
               │              │ + scoped JWT │
               ▼              ▼              ▼
┌──────────────────────────────────────────────────────────┐
│  API GATEWAY / AUTH SERVICE (NEW — product surface)       │
│  • tenant registry  • client credentials  • scopes/tiers   │
│  • rate limits  • revocation  • issuance API (admin)      │
│  • redacted audit stream  • evidence export hooks          │
└────────────────────────────┬─────────────────────────────┘
                             │ policy + attestations
                             ▼
┌──────────────────────────────────────────────────────────┐
│  GTCX SERVICES (Intelligence, Protocols gateway, etc.)    │
│  • validate token/key  • ABAC/scopes  • per-route trust    │
└──────────────────────────────────────────────────────────┘

        PARALLEL — NOT MERGED INTO VAULT
┌──────────────────────────────────────────────────────────┐
│  BASELINE VAULT (gtcx-agentic) — INBOUND ONLY               │
│  • ANTHROPIC_API_KEY, provider leases, agent trust        │
│  • baseline_vault MCP  • Protocol 19                      │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Recommended credential types (external)

| Tier | Actor | Mechanism | TTL | Evidence |
| --- | --- | --- | --- | --- |
| **E0** | Internal smoke / CI | Scoped smoke keys in infra SM; optional vault **cache** for runners only | 90d rotate | `01-docs/05-audit/evidence/deployment-smoke-*.json` |
| **E1** | Pilot integrator | Single API key + IP allowlist optional | 90d | Issuance ticket + fingerprint in audit |
| **E2** | Commercial SDK | OAuth client credentials + scoped JWT | 15–60 min access token | Usage dashboard + audit API |
| **E3** | Government / regulator | TradePass Authority DID + mTLS or signed JWT | Cert-bound / short JWT | VC issuance log + ceremony evidence |
| **E4** | High-risk operations | Human approval + step-up + break-glass | Minutes | Signed approval artifact |

### 5.3 Ownership (repos)

| Concern | Owner repo | Rationale |
| --- | --- | --- |
| EAP service / gateway | **gtcx-core** or **gtcx-infrastructure** (+ API in intelligence gateway) | Hosted product + IaC |
| TradePass identity | **gtcx-protocols** | Protocol + authority packages |
| HTTP route enforcement | **gtcx-intelligence**, **gtcx-protocols** gateways | Service-specific ABAC |
| Agent governance | **gtcx-agentic** | Trust scores, MCP, evidence collectors — **not** issuance |
| Canonical policy | **gtcx-docs** | EAP protocol (number pending) |
| Operator UX | **baseline-os** Desktop (optional) | **Approve/deny issuance**, analogous to FEAT-006 leases |

---

## 6. AI-native & BaselineOS primitives (reuse, don’t misuse)

BaselineOS already implements patterns EAP should **mirror**, not **merge**:

| BaselineOS primitive | Location | Reuse for EAP |
| --- | --- | --- |
| **Opaque credential leases** | `@baselineos/vault` `issueLease()` / `resolveLease()` | Model for **short-lived external tokens** (handle ≠ secret in logs) |
| **Trust-gated access** | FEAT-006, Autonomy layer, `TrustManager` in agentic | Map **tenant trust tier** → scopes (not agent trust for customers) |
| **Fail-closed API auth** | `03-platform/packages/api` — 503 if no keys configured | Already matches Intelligence pattern |
| **RBAC + API key hashing** | BaselineOS API (scrypt), security posture docs | Hash **stored** customer keys; compare with `timingSafeEqual` |
| **Evidence bundles** | Studio, SHA-256, Ed25519 signing | Every issuance/revocation → evidence doc |
| **LayerSweep / Govern** | Pre/post execution gates | Agent **cannot** call issuance APIs without human approval action |
| **7-layer OS** | Frame (authority), Govern (compliance), Autonomy (trust) | Frame = **who may issue**; Govern = **policy**; Autonomy = **customer risk tier** |

**Do not:** Store customer `client_secret` in the same SQLite vault DB as `ANTHROPIC_API_KEY` without schema separation and distinct audit indices.

**Do:** Use the same **lease + audit + evidence** *patterns* implemented as a **separate EAP service** with its own datastore and retention policy.

---

## 7. Agentic requirements

Agents (Cursor, Claude, etc.) interact with credentials under strict rules:

### 7.1 Agents may

- Request **inbound** provider credentials via `baseline_vault` (Protocol 19).
- Request **pre-issued** external smoke credentials via vault **only** when labeled `credential_class: inbound_evidence` and registered by infra.
- Run evidence packs that **consume** env injected at runtime (never persist secrets in repo).

### 7.2 Agents must never

- Mint customer API keys or OAuth clients.
- Add keys to `AUTH_API_KEYS` in production/staging without human-governed issuance API.
- Conflate `GTCX_API_KEY` with `ANTHROPIC_API_KEY` in vault taxonomy.

### 7.3 Governed issuance flow (human-in-the-loop)

```
Operator intent → LayerSweep/approval → EAP Issuance API →
  redacted evidence JSON → optional vault fingerprint cache for CI
```

Aligns with EXR-001 governed session: visible policy, signed artifact, recovery path.

---

## 8. Mapping to TradePass (governments)

HTTP API keys are **insufficient** for sovereign actors. Target pairing:

1. **Authority DID** registered (`did:gtcx:auth:{iso}:{slug}`) with `TradePassIssuanceEndpoint` in DID document.
2. **Ceremony evidence** (HSM/KMS-backed keys) — see protocols authority key ceremony, deployment-proof-index.
3. **Scoped HTTP access** via JWT signed by authority key **or** mTLS client cert — optional narrow REST surface for regulators.
4. **VCs** for operator/subject identity on-chain/off-chain verification flows.

TradePass answers **who**; EAP answers **what they may call on the API**.

---

## 9. Gap analysis vs “10,000x tight”

| Control | Industry | GTCX today | Target |
| --- | --- | --- | --- |
| Central issuance | Required | Ops/manual SM | EAP + developer portal |
| Key hashing at rest | Required | Partial (BaselineOS API) | All stored customer secrets hashed |
| Timing-safe compare | Required | Intelligence SDK tests | All services |
| Rotation automation | Required | Provider keys planned | EAP + SM rotation Lambdas |
| Per-tenant rate limits | Required | Partial (`INTELLIGENCE_RATE_LIMIT`) | Gateway-wide |
| Revocation < 5 min | Required | Manual pod sync | Event-driven revocation bus |
| Audit export | SOC2 | Vault access log + agentic AuditLog | EAP audit + evidence JSON |
| Agent issuance guard | AI-native | Protocol 19 inbound only | EAP admin API + approval |
| Environment separation | Required | staging/production SM | Hard-separated trust anchors |
| Government path | Regulated | TradePass DIDs exist | Ceremony + mTLS tier |

---

## 10. Proposed documentation & protocol split

| Artifact | Action |
| --- | --- |
| **Protocol 19** | Add explicit § “Out of scope: external customer credentials” pointing here |
| **Protocol 23** | External Access Credential Plane — issuance, tiers, evidence |
| **credential-management-ecosystem.md** | Add Tier 0: External Access (EAP) to decision tree |
| **gtcx-agentic** | Pointer doc; remove implication that vault issues customer keys |
| **EXR** | `EXR-pending-external-access-issuance` for portal + evidence |

---

## 11. Phased delivery (recommended)

### Phase A — Architecture lock (2–3 weeks)

- Review and approve this doc + proposed EAP protocol outline.
- ADR: EAP separate datastore vs extend AWS SM only.
- Threat model sign-off (security + government stakeholder).

### Phase B — Minimum viable EAP (4–6 weeks)

- Issuance API (admin-only): create / revoke / list fingerprints.
- Intelligence adapter: validate against EAP (or sync to `AUTH_API_KEYS` with automation).
- Redacted audit stream + `01-docs/05-audit/evidence/issuance-*.json` contract.

### Phase C — Self-service (S4 roadmap alignment)

- `developer.gtcx.trade` signup, OAuth clients, usage dashboard.
- Stripe tier linkage (existing enterprise roadmap).

### Phase D — Government tier

- TradePass authority onboarding + mTLS profile for regulator integrations.

---

## 12. Open decisions (need human review)

1. **EAP hosting:** New microservice in `gtcx-core` vs Kong/AWS API Gateway native vs Intelligence-embedded auth service?
2. **Storage:** Dedicated Postgres + hashed secrets vs AWS SM as SoR with EAP as control plane only?
3. **Naming:** Keep `GTCX_API_KEY` env for backward compat vs migrate to `GTCX_CLIENT_ID` + `GTCX_CLIENT_SECRET` (OAuth)?
4. **Vault bridge:** Allow vault to hold **references** (ARN + fingerprint) to external credentials for CI smoke only — never raw production customer keys?
5. ~~**Protocol number**~~ — **Resolved:** Protocol 23 (`external-access-credentials`).

---

## 13. References (ecosystem)

| Resource | Path |
| --- | --- |
| Protocol 19 — Agent credential access | `canon-os/01-docs/governance/protocols/agent-credential-access/protocol.md` |
| Credential management ecosystem | `canon-os/01-docs/architecture/credential-management-ecosystem.md` |
| BaselineOS FEAT-006 leases | `baseline-os/01-docs/specs/_project/overview/product/features/FEAT-006-credential-lease-workflow.md` |
| BaselineOS security posture | `baseline-os/01-docs/specs/_project/go-to-market/gtm/01-security-posture.md` |
| TradePass SPEC | `gtcx-protocols/protocols/tradepass/SPEC.md` |
| Intelligence deploy / pilot keys | `gtcx-intelligence/01-docs/04-ops/deploy-runbook.md` |
| Deployment proof index | `gtcx-protocols/01-docs/05-audit/evidence/deployment-proof-index.md` |
| Enterprise roadmap (developer portal) | `gtcx-protocols/01-docs/05-audit/agile/s4-enterprise-roadmap.md` |
| Regulator developer KPI | `canon-os/01-docs/government/public-sector/regulator-playbook/technical-white-paper/implementation-roadmap.md` |
| gtcx-core future issuance | `gtcx-core/01-docs/10-compliance/soc2-readiness.md` |

---

## 14. Research notes (external)

- B2B API authentication guides emphasize OAuth Client Credentials for M2M, API keys only with rotation/monitoring/IP controls.
- Compliance regimes (SOC2 CC6.x) require logical access controls, revocation, and audit — maps to EAP audit stream.
- Zero-trust direction: eliminate static credentials where possible; GTCX should trend E1 → E2, E3 for governments.

---

**Next step:** Implement Phase B per [Protocol 23 implementation guide](../governance/protocols/external-access-credentials/implementation-guide.md). Schedule security review to move Protocol 23 from `draft` to `current`.
