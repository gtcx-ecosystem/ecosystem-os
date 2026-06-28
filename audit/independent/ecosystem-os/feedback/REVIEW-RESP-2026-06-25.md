From: gtcx-ecosystem-audit (Layer 0 Hub / Institutional Readiness)
To: ecosystem-os (owner repo)
Protocol: P99 (Independent / No-Bullshit Audit Response)
Class: R
Priority: P1
Ticket: XR-AUDIT-ecosystem-os-NO-BS-GTM-FULL-2026-06-25
Hub scope only: true
Blocking: true

Story: Review and challenge the latest no-bullshit /gtm + /full audit for ecosystem-os, then return auditable repo feedback
to improve institutional-readiness.

Current state from hub:
- Audit file:
  - /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audits/independent/no-bullshit-gtm-full-audit-2026-06-25.md

1. Repo path reviewed
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os
2. Current readiness score (1-10)
- 6.4
3. Current adoption label (A0/A1/A2/A3/A4)
- A3
4. Agreement with this audit (agree/partial/disagree)
- partial
5. Strongest institutional use case (90-day)
- Establish and harden a fleet publication and GTM operations layer that gives owner repos a repeatable path for buyer-facing onboarding, catalog publishing, and evidence collection.
6. Evidence already present (path list)
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/AGENTS.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/package.json
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audits/independent/no-bullshit-gtm-full-audit-2026-06-25.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audits/independent/README.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audits/independent/feedback/README.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audit/evidence/gtm-readiness-latest.json
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audit/evidence/composite-audit-latest.json
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audit/evidence/master-audit-latest.json
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/fleet-catalog-index.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/onboarding/scope.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/manifest.yaml
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/scope.yaml
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/snapshot.yaml
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/fleet-snapshot.yaml
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/docs/reference/evaluation/multi-pillar-audit.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/docs/reference/gitbook/README.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/fundraising/README.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/fundraising/guides/README.md
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/audit/institutional-readiness-audit-notes-2026-06-25.md
7. Evidence still missing (path list + why)
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/docs/onboarding/README.md (missing root onboarding folder that should be visible in this repo scope)
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/demo-walkthrough.md (or equivalent) to satisfy explicit `demoWalkthrough` readiness gate
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/synthetic-fixtures.md (or equivalent) to satisfy `syntheticFixtures` readiness gate
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/feature-matrix-90.md for `featureMatrix90`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/deploy-witness.md for `deployWitness`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/billing-or-pricing.md for `billingOrPricingDoc`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/onboarding/README.md or equivalent to satisfy `repeatableOnboarding`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/self-serve.md for `selfServeOrNamedCsm`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/sla-defined.md for `slaDefined`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/gtm/api-versioning.md for `apiVersioned`
- /Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/ops/compliance/* references to provide SOC2/DPA/privacy/SSO/audit-log/fedramp/fips/airgap/sbom/cve evidence tied to `sovereignPolicyReferences` and `complianceReferences`
8. Top 3 blockers
- GTM readiness remains 50% (`readinessStatus`) and multiple readiness gates are false, preventing `pilotReady` and keeping GTM stage at S2.
- `pnpm ops:check` fails and evidence logs indicate `ops:check failed` plus `P35 strict`, so operational compliance proof is incomplete for this repo.
- Canonical onboarding and GTM artifact locations promised by repo scope are absent, making institutional onboarding verification non-deterministic.
9. Top 3 next actions and owners
- Owner: ecosystem-os GTM steward — complete GTM evidence artefacts for all currently false readiness gates in `audit/evidence/gtm-readiness-latest.json`, then rerun `pnpm gtm:readiness:check` to show 100% readinessStatus and update evidence.
- Owner: ecosystem-os operations owner (with bridge-os coordination) — fix failures in `pnpm ops:check` and remove `P35 strict` blockers, then persist passing output and gate trace in repo evidence logs.
- Owner: ecosystem-os docs owner — create `/Users/amanianai/Sites/gtcx-ecosystem/ecosystem-os/docs/onboarding/` plus concrete GTM onboarding + demo evidence links, then reference from `ops/gtm/onboarding/scope.md` and `ops/gtm/fleet-catalog-index.md`.
