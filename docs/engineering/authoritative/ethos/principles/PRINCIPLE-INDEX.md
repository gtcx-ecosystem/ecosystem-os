---
title: 'GTCX Principle Index'
status: 'current'
date: '2026-05-26'
---

# GTCX Principle Index

> **Version:** 1.0  
> **Date:** January 26, 2026  
> **Purpose:** Map principles to ADRs, code locations, and key implementations

---

## Quick Navigation

| Category        | Principles | Primary ADRs                        |
| --------------- | ---------- | ----------------------------------- |
| 🔐 Trust        | 1-5        | ADR-005, ADR-007, ADR-0012          |
| 🏛️ Sovereignty  | 6-10       | ADR-0011, ADR-0013                  |
| ⚙️ Architecture | 11-15      | ADR-001, ADR-006, ADR-007, ADR-0014 |
| 🌍 Frontier     | 16-20      | ADR-004, ADR-0016, ADR-0019         |
| 🔄 Scale        | 21-25      | ADR-002, ADR-0010                   |
| 🧭 Craft        | 26-30      | ADR-003                             |

---

## 🔐 TRUST & VERIFICATION (Principles 1-5)

### 1. PROOF — Proof Over Permission

| Aspect        | Reference                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-005: Cryptographic Primitives](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-005-cryptographic-primitives.md) |
| **Core Code** | `rust/gtcx-crypto/03-platform/src/signatures/`                                                    |
| **Schemas**   | `03-platform/packages/schemas/src/verification/`                                                  |
| **Protocol**  | `protocols/tradepass/03-platform/src/credentials/`                                                |
| **Tests**     | `rust/gtcx-crypto/tests/signature_tests.rs`                                                       |

**Key Implementation Pattern:**

```typescript
// Every verification returns cryptographic proof, not boolean
interface VerificationResult {
  valid: boolean;
  proof: CryptographicProof; // Always present
  chain: HashChain; // Auditable trail
}
```

---

### 2. PRIVATE — Privacy Through Math

| Aspect        | Reference                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-005: Cryptographic Primitives](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-005-cryptographic-primitives.md) |
| **Core Code** | `rust/gtcx-zkp/03-platform/src/`                                                                  |
| **Schemas**   | `03-platform/packages/schemas/src/credentials/selective-disclosure.ts`                            |
| **Protocol**  | `protocols/tradepass/03-platform/src/privacy/`                                                    |

**Key Implementation Pattern:**

```typescript
// Selective disclosure - prove attribute without revealing value
const proof = await credential.proveAttribute('age', {
  predicate: 'greaterThan',
  threshold: 18,
  // Does NOT reveal actual age
});
```

---

### 3. AUDITABLE — Everything Traceable

| Aspect        | Reference                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0012: Event Sourcing Asset State](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0012-event-sourcing-asset-state.md) |
| **Core Code** | `03-platform/packages/events/src/`                                                                      |
| **Database**  | `04-ship/terraform/modules/database/` (audit DB)                                                        |
| **Protocol**  | `protocols/vaultmark/03-platform/src/audit/`                                                            |

**Key Implementation Pattern:**

```typescript
// All state changes are events - never direct mutations
class AssetService {
  async transfer(assetId: string, to: string): Promise\<void\> {
    // ❌ WRONG: this.db.update(assetId, { owner: to })
    // ✅ RIGHT: Emit event, let projection handle state
    await this.eventStore.append(
      new CustodyTransferEvent({
        assetId,
        to,
        timestamp: Date.now(),
        previousHash: await this.getLastHash(assetId),
      })
    );
  }
}
```

---

### 4. IMMUTABLE — Records Don't Change

| Aspect        | Reference                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0012: Event Sourcing Asset State](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0012-event-sourcing-asset-state.md) |
| **Core Code** | `03-platform/packages/events/src/store/`                                                                |
| **Database**  | Audit tables with no UPDATE/DELETE permissions                                                          |
| **Infra**     | `04-ship/terraform/modules/database/main.tf`                                                            |

**Key Implementation Pattern:**

```sql
-- Audit table permissions (enforced at DB level)
REVOKE UPDATE, DELETE ON audit_events FROM app_user;
GRANT INSERT, SELECT ON audit_events TO app_user;
```

---

### 5. TRANSPARENT — Operations Are Visible

| Aspect         | Reference                                       |
| -------------- | ----------------------------------------------- |
| **ADRs**       | —                                               |
| **Core Code**  | `03-platform/packages/api-client/src/`          |
| **Dashboards** | `apps/web/compliance/`                          |
| **Protocol**   | Role-based visibility in all protocol responses |

**Key Implementation Pattern:**

```typescript
// Responses include visibility metadata
interface ApiResponse\<T\> {
  data: T;
  visibility: {
    role: UserRole;
    redactedFields: string[]; // What was hidden
    fullAccessRoles: UserRole[]; // Who sees everything
  };
}
```

---

## 🏛️ SOVEREIGNTY & GOVERNANCE (Principles 6-10)

### 6. SOVEREIGN — Sovereignty Is Sacred

| Aspect        | Reference                                                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0011: SGX Sovereign Governance](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0011-sgx-sovereign-governance-exchange.md), [ADR-0013: Country Plugin](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0013-country-plugin-architecture.md) |
| **Core Code** | `platforms/sgx/`                                                                                                                                                                                           |
| **Config**    | `03-platform/packages/config/src/jurisdiction/`                                                                                                                                                            |
| **Infra**     | `04-ship/terraform/environments/` (per-country)                                                                                                                                                            |

**Key Implementation Pattern:**

```typescript
// Jurisdiction is ALWAYS a parameter, never hardcoded
interface DeploymentConfig {
  jurisdiction: ISO3166Alpha2; // 'GH', 'KE', 'RW'
  dataResidency: DataCenter; // Must be in-country
  regulatoryAuthority: string; // Local regulator
}
```

---

### 7. OPEN — Infrastructure, Not Product

| Aspect       | Reference                                                                             |
| ------------ | ------------------------------------------------------------------------------------- |
| **ADRs**     | [ADR-001: Monorepo Structure](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-001-monorepo-structure.md) |
| **Licenses** | `gtcx-protocol-01-docs/11-legal/LICENSE` (Apache 2.0), `LICENSE-SPEC.md` (CC-BY-SA)   |
| **Specs**    | `gtcx-protocol-docs/spec/`                                                            |

**Key Implementation Pattern:**

```typescript
// Protocols are open, implementations can be commercial
// ✅ Protocol spec: gtcx-protocol-docs/spec/03-tradepass.md
// ✅ Reference impl: protocols/tradepass/ (open source)
// ✅ Commercial services built ON the protocol, not IN it
```

---

### 8. FEDERATED — Sovereign Interoperability

| Aspect        | Reference                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| **ADRs**      | [ADR-0011: SGX Sovereign Governance](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0011-sgx-sovereign-governance-exchange.md) |
| **Core Code** | `protocols/panx/03-platform/src/federation/`                                                                 |
| **Protocol**  | `gtcx-protocol-docs/spec/09-network.md`                                                                      |

**Key Implementation Pattern:**

```typescript
// Cross-border = exchange proofs, not data
interface FederationMessage {
  type: 'verification_request' | 'proof_response';
  // Raw data NEVER crosses borders
  proof: CryptographicProof;
  sourceJurisdiction: ISO3166Alpha2;
  targetJurisdiction: ISO3166Alpha2;
}
```

---

### 9. GOVERNED — Community Stewardship

| Aspect        | Reference                                                     |
| ------------- | ------------------------------------------------------------- |
| **ADRs**      | All ADRs follow governance process                            |
| **Process**   | `gtcx-protocol-docs/spec/10-governance.md`                    |
| **Templates** | `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md` |

---

### 10. COMPLIANT — Regulatory by Design

| Aspect        | Reference                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0013: Country Plugin](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0013-country-plugin-architecture.md) |
| **Core Code** | `protocols/gci/03-platform/src/rules/`                                                       |
| **Config**    | `03-platform/packages/config/src/compliance/`                                                |
| **Spec**      | `gtcx-protocol-docs/spec/13-compliance.md`                                                   |

**Key Implementation Pattern:**

```typescript
// Compliance rules are configuration, not code
const ghanaRules: ComplianceRuleSet = {
  jurisdiction: 'GH',
  authority: 'Ghana Minerals Commission',
  rules: [
    { id: 'GH-LICENSE', weight: 0.25, ... },
    { id: 'GH-LOCATION', weight: 0.20, ... },
  ],
};
// Same code, different config per country
```

---

## ⚙️ ARCHITECTURE & RESILIENCE (Principles 11-15)

### 11. SECURE — Security Is Architecture

| Aspect         | Reference                                                                                                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADRs**       | [ADR-005: Cryptographic Primitives](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-005-cryptographic-primitives.md), [ADR-007: Rust Foundational Layer](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-007-rust-foundational-layer.md) |
| **Core Code**  | `rust/gtcx-crypto/` (ALL crypto here)                                                                                                                                                              |
| **Bridge**     | `03-platform/packages/crypto/` (TypeScript → Rust)                                                                                                                                                 |
| **Validation** | `03-platform/packages/schemas/` (Zod at all boundaries)                                                                                                                                            |

**Key Implementation Pattern:**

```typescript
// ALL cryptography in Rust, accessed via bridge
import { sign, verify } from '@gtcx/crypto'; // Calls Rust

// ❌ NEVER: import { createSign } from 'crypto';
// ❌ NEVER: npm install some-js-crypto-lib
```

---

### 12. RESILIENT — Graceful Degradation

| Aspect        | Reference                                                                         |
| ------------- | --------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0014: No Service Mesh](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0014-no-service-mesh.md) |
| **Core Code** | `03-platform/packages/connectivity/src/`                                          |
| **Patterns**  | Circuit breakers, retry with backoff, fallback modes                              |

**Key Implementation Pattern:**

```typescript
// Every external call has fallback
const result = await withResilience(() => api.verify(claim), {
  fallback: () => offlineVerify(claim), // Works without network
  retries: 3,
  circuitBreaker: true,
});
```

---

### 13. MODULAR — Building Blocks

| Aspect         | Reference                                                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADRs**       | [ADR-001: Monorepo Structure](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-001-monorepo-structure.md), [ADR-006: Package Boundaries](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-006-package-boundaries.md) |
| **Structure**  | `03-platform/packages/`, `protocols/`, `platforms/`, `apps/`                                                                                                                 |
| **Boundaries** | Each package has single `index.ts` entry point                                                                                                                               |

**Key Implementation Pattern:**

```typescript
// Clear layer boundaries
// ✅ apps/ → protocols/ → 03-platform/packages/ → rust/
// ❌ 03-platform/packages/ → apps/ (circular)
// ❌ protocols/ → platforms/ (wrong direction)
```

---

### 14. DEPLOYABLE — Run Anywhere

| Aspect      | Reference                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------- |
| **ADRs**    | [ADR-007: Rust Foundational Layer](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-007-rust-foundational-layer.md) |
| **Infra**   | `04-ship/docker/`, `04-ship/kubernetes/`, `04-ship/terraform/`                                  |
| **Targets** | Government DC, cloud, air-gapped, edge                                                          |

**Key Implementation Pattern:**

```yaml
# Same manifest, different overlays
# 04-ship/kubernetes/overlays/
#   development/
#   staging/
#   production/
#   air-gapped/  # Works without internet
```

---

### 15. OBSERVABLE — Always Visible

| Aspect        | Reference                                                                            |
| ------------- | ------------------------------------------------------------------------------------ |
| **ADRs**      | —                                                                                    |
| **Core Code** | `03-platform/packages/utils/src/logging/`, `03-platform/packages/utils/src/metrics/` |
| **Infra**     | `04-ship/docker/observability/` (Prometheus, Loki)                                   |

**Key Implementation Pattern:**

```typescript
// Structured logging with correlation
logger.info('Verification complete', {
  traceId: context.traceId,
  assetId,
  duration: performance.now() - start,
  result: 'success',
});
```

---

## 🌍 FRONTIER & INCLUSION (Principles 16-20)

### 16. UBUNTU — Collective Prosperity

| Aspect        | Reference                                        |
| ------------- | ------------------------------------------------ |
| **ADRs**      | —                                                |
| **Core Code** | `protocols/gci/03-platform/src/network-effects/` |
| **Economics** | `gtcx-protocol-docs/spec/01-introduction.md`     |

**Key Implementation Pattern:**

```typescript
// Network effects benefit all participants
interface ReputationBonus {
  individual: number; // Producer's own score
  cooperative: number; // Boost from cooperative membership
  regional: number; // Boost from regional compliance rate
  // Individual success → collective benefit → individual benefit
}
```

---

### 17. OFFLINE — Offline Is Default

| Aspect        | Reference                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-004: Offline-First Mobile](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-004-offline-first-mobile.md), [ADR-0016: Connectivity Profiles](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0016-connectivity-profiles.md) |
| **Core Code** | `03-platform/packages/sync/src/`, `03-platform/packages/connectivity/src/`                                                                                                               |
| **Mobile**    | `apps/mobile/gtcx/03-platform/src/offline/`                                                                                                                                              |

**Key Implementation Pattern:**

```typescript
// Queue operations, sync when connected
class OfflineQueue {
  async enqueue(operation: Operation): Promise\<void\> {
    await this.localStorage.append(operation);
    // Will sync when connectivity.isOnline()
  }

  // 30+ days of operations can queue
  readonly maxOfflineDays = 30;
}
```

---

### 18. LOCALIZED — Every Language Matters

| Aspect           | Reference                                        |
| ---------------- | ------------------------------------------------ |
| **ADRs**         | —                                                |
| **Core Code**    | `03-platform/packages/i18n/src/`                 |
| **Translations** | `03-platform/packages/i18n/locales/`             |
| **Languages**    | Twi, Hausa, Swahili, French, Portuguese, English |

**Key Implementation Pattern:**

```typescript
// Local languages are first-class, not afterthoughts
const supportedLocales = [
  'tw', // Twi (Ghana)
  'ha', // Hausa (Nigeria)
  'sw', // Swahili (East Africa)
  'fr', // French (West Africa)
  'pt', // Portuguese (Mozambique)
  'en', // English (fallback)
] as const;
```

---

### 19. ACCESSIBLE — Everyone Can Use It

| Aspect        | Reference                                                                 |
| ------------- | ------------------------------------------------------------------------- |
| **ADRs**      | —                                                                         |
| **Core Code** | `03-platform/packages/accessibility/src/`, `03-platform/packages/ui/src/` |
| **Standards** | WCAG 2.1 AA minimum                                                       |

**Key Implementation Pattern:**

```typescript
// Low-literacy support built-in
interface ActionButton {
  label: string; // Text label
  icon: IconComponent; // Visual icon (required)
  voiceLabel: string; // Screen reader / voice UI
  hapticFeedback: boolean; // Tactile confirmation
}
```

---

### 20. HARDWARE — Device-Ready

| Aspect        | Reference                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0019: USSD First-Class Channel](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0019-ussd-first-class-channel.md) |
| **Core Code** | `03-platform/packages/hardware/src/`, `operations/tapkit/`                                          |
| **Channels**  | Smartphone, feature phone (USSD/SMS), edge devices                                                  |

**Key Implementation Pattern:**

```typescript
// Feature phone support is not optional
interface Channel {
  type: 'smartphone' | 'ussd' | 'sms' | 'edge';
  capabilities: Capability[];
}

// Same operation, multiple channels
async function registerProducer(channel: Channel): Promise\<void\> {
  if (channel.type === 'ussd') {
    return ussdFlow.register();
  }
  return mobileApp.register();
}
```

---

## 🔄 UNIVERSALITY & SCALE (Principles 21-25)

### 21. UNIVERSAL — Commodity Agnostic

| Aspect        | Reference                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-002: Commodity-Agnostic Design](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-002-commodity-agnostic-design.md) |
| **Core Code** | `03-platform/packages/types/src/commodity/`                                                         |
| **Config**    | `03-platform/packages/config/src/commodities/`                                                      |

**Key Implementation Pattern:**

```typescript
// Commodity is ALWAYS a parameter
interface Asset {
  id: string;
  commodityType: CommodityType; // 'gold' | 'coffee' | 'cobalt' | ...
  // ❌ NEVER: interface GoldAsset, interface CoffeeAsset
}

// ❌ WRONG: if (asset.type === 'gold') { ... }
// ✅ RIGHT: commodityConfig[asset.commodityType].process(asset)
```

---

### 22. PORTABLE — Legitimacy Travels

| Aspect        | Reference                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-005: Cryptographic Primitives](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-005-cryptographic-primitives.md) |
| **Core Code** | `protocols/tradepass/03-platform/src/credentials/`                                                |
| **Standards** | W3C Verifiable Credentials, DID                                                                   |

**Key Implementation Pattern:**

```typescript
// Credentials work anywhere
const credential: VerifiableCredential = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiableCredential', 'GTCXProducerCredential'],
  // Standard format → verifiable by any compliant system
};
```

---

### 23. INTEROPERABLE — TCP/IP of Trust

| Aspect        | Reference                              |
| ------------- | -------------------------------------- |
| **ADRs**      | —                                      |
| **Core Code** | `03-platform/packages/api-client/src/` |
| **Standards** | ISO 20022, UN/CEFACT, W3C              |

**Key Implementation Pattern:**

```typescript
// Speak existing standards
interface SettlementMessage {
  format: 'ISO20022' | 'SWIFT_MT' | 'GTCX_NATIVE';
  // We adapt to existing systems, not vice versa
}
```

---

### 24. SCALABLE — 100 to 100 Million

| Aspect       | Reference                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| **ADRs**     | [ADR-0010: Platform Architecture Pattern](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0010-platform-architecture-pattern.md) |
| **Infra**    | `04-ship/kubernetes/` (HPA, resource limits)                                                                  |
| **Database** | Sharding-ready schema design                                                                                  |

**Key Implementation Pattern:**

```yaml
# Horizontal scaling built-in
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 2
  maxReplicas: 100 # Scale to demand
```

---

### 25. EXTENSIBLE — Built to Grow

| Aspect        | Reference                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| **ADRs**      | [ADR-0013: Country Plugin Architecture](../../../../reference/archive/legacy-authoritative/_archive/decisions/ADR-0013-country-plugin-architecture.md) |
| **Core Code** | Plugin interfaces throughout                                                                              |
| **Patterns**  | Feature flags, API versioning                                                                             |

**Key Implementation Pattern:**

```typescript
// Extension points are explicit
interface CompliancePlugin {
  jurisdiction: string;
  rules: ComplianceRule[];
  // Add new jurisdictions without changing core
}
```

---

## 🧭 CRAFT & DISCIPLINE (Principles 26-30)

### 26. RESEARCHED — Deeply Informed

| Aspect       | Reference                          |
| ------------ | ---------------------------------- |
| **ADRs**     | All ADRs include "Context" section |
| **Research** | `01-docs/research/`                |
| **Specs**    | `gtcx-protocol-docs/spec/`         |

---

### 27. DOCUMENTED — Documentation First

| Aspect      | Reference                         |
| ----------- | --------------------------------- |
| **ADRs**    | `01-docs/architecture/decisions/` |
| **READMEs** | Every package has README.md       |
| **JSDoc**   | Required on all public exports    |

**Key Implementation Pattern:**

```typescript
/**
 * Verifies a TradePass credential against the issuer's public key.
 *
 * @param credential - The credential to verify
 * @param options - Verification options
 * @returns Verification result with cryptographic proof
 *
 * @example
 * const result = await verifyCredential(credential, {
 *   checkRevocation: true
 * });
 *
 * @see {@link https://gtcx.trade/01-docs/tradepass | TradePass Documentation}
 * @since 1.0.0
 */
export async function verifyCredential(
  credential: VerifiableCredential,
  options?: VerifyOptions
): Promise\<VerificationResult\> { ... }
```

---

### 28. ADAPTIVE — Room to Emerge

| Aspect       | Reference                           |
| ------------ | ----------------------------------- |
| **ADRs**     | ADRs can be superseded              |
| **Patterns** | Feature flags, reversible decisions |

---

### 29. TESTED — Relentlessly Verified

| Aspect    | Reference                                        |
| --------- | ------------------------------------------------ |
| **ADRs**  | —                                                |
| **Tests** | `**/*.test.ts`, `**/*.spec.ts`, `rust/**/tests/` |
| **CI**    | `.github/workflows/`                             |

**Key Implementation Pattern:**

```typescript
// Test categories required
describe('verifyCredential', () => {
  // Unit tests
  it('returns valid for correctly signed credential', ...);
  it('returns invalid for tampered credential', ...);

  // Integration tests
  it('verifies against live issuer endpoint', ...);

  // Edge cases
  it('handles expired credentials', ...);
  it('handles revoked credentials', ...);
});
```

---

### 30. INTENTIONAL — Every Decision Deliberate

| Aspect      | Reference                                |
| ----------- | ---------------------------------------- |
| **ADRs**    | All architectural decisions documented   |
| **Process** | PR template requires principle alignment |

---

## ADR Cross-Reference Table

| ADR      | Title                         | Primary Principles                             |
| -------- | ----------------------------- | ---------------------------------------------- |
| ADR-001  | Monorepo Structure            | MODULAR (13), OPEN (7)                         |
| ADR-002  | Commodity-Agnostic Design     | UNIVERSAL (21)                                 |
| ADR-003  | AI-Native Architecture        | DOCUMENTED (27)                                |
| ADR-004  | Offline-First Mobile          | OFFLINE (17), HARDWARE (20)                    |
| ADR-005  | Cryptographic Primitives      | PROOF (1), PRIVATE (2), SECURE (11)            |
| ADR-006  | Package Boundaries            | MODULAR (13)                                   |
| ADR-007  | Rust Foundational Layer       | SECURE (11), DEPLOYABLE (14)                   |
| ADR-0010 | Platform Architecture Pattern | SCALABLE (24), MODULAR (13)                    |
| ADR-0011 | SGX Sovereign Governance      | SOVEREIGN (6), FEDERATED (8)                   |
| ADR-0012 | Event Sourcing Asset State    | AUDITABLE (3), IMMUTABLE (4)                   |
| ADR-0013 | Country Plugin Architecture   | SOVEREIGN (6), COMPLIANT (10), EXTENSIBLE (25) |
| ADR-0014 | No Service Mesh               | RESILIENT (12), DEPLOYABLE (14)                |
| ADR-0015 | Service Taxonomy              | MODULAR (13)                                   |
| ADR-0016 | Connectivity Profiles         | OFFLINE (17), RESILIENT (12)                   |
| ADR-0019 | USSD First-Class Channel      | HARDWARE (20), ACCESSIBLE (19)                 |

---

## Key Code Locations Summary

| Layer             | Location                              | Principles             |
| ----------------- | ------------------------------------- | ---------------------- |
| **Rust Core**     | `rust/gtcx-crypto/`                   | SECURE, PROOF, PRIVATE |
| **Schemas**       | `03-platform/packages/schemas/`       | SECURE (validation)    |
| **Events**        | `03-platform/packages/events/`        | AUDITABLE, IMMUTABLE   |
| **Sync**          | `03-platform/packages/sync/`          | OFFLINE                |
| **i18n**          | `03-platform/packages/i18n/`          | LOCALIZED              |
| **Accessibility** | `03-platform/packages/accessibility/` | ACCESSIBLE             |
| **Protocols**     | `protocols/*/`                        | PROOF, MODULAR         |
| **Platforms**     | `platforms/*/`                        | SOVEREIGN, SCALABLE    |
| **Infra**         | `04-ship/`                            | DEPLOYABLE, OBSERVABLE |

---

_This index maps every principle to its implementation. Use it for code review, architecture decisions, and onboarding._
