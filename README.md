# Ecosystem OS

**Fleet documentation home** for the GTCX ecosystem — GitBook libraries, GTM, onboarding, architecture narratives, legal packs, and publish registry.

| Layer | Repo | Role |
| ----- | ---- | ---- |
| **Law & protocols** | [`canon-os`](../canon-os/) | Constitution, P1–P39, audit framework (read-only upstream) |
| **Fleet docs (this repo)** | `ecosystem-os` | Operator-facing docs, GitBook source, GTM catalog, onboarding |
| **Program office** | [`bridge-os`](../bridge-os/) | Layout P35, fleet gates, ZenHub |
| **Trade core** | [`gtcx-os`](../gtcx-os/) | Product slices author under `docs/gitbook/` per slice |

## Start here

| Audience | Path |
| -------- | ---- |
| **New operator / agent** | [`docs/gitbook/ecosystem/README.md`](docs/gitbook/ecosystem/README.md) |
| **Vision & mission** | [`docs/overview/README.md`](docs/overview/README.md) |
| **Onboarding** | [`docs/onboarding/README.md`](docs/onboarding/README.md) |
| **GTM catalog** | [`ops/gtm/fleet-catalog-index.md`](ops/gtm/fleet-catalog-index.md) |
| **Fundraising** | [`fundraising/README.md`](fundraising/README.md) |
| **Venture OS** | [`../venture/`](../venture/) — peer spine member |
| **Publish register** | [`pm/publish-register.json`](pm/publish-register.json) |
| **Coverage matrix** | [`docs/reference/documentation-fleet-coverage-matrix.md`](docs/reference/documentation-fleet-coverage-matrix.md) |

## Layout (P35 v5)

Unnumbered root hubs only — no `01-docs/`, `02-ops/`, etc.

```
docs/gitbook/     GitBook source (ecosystem + getting-started + api)
docs/overview/    Vision, mission, stakeholder entry
docs/onboarding/  Contributor and agent onboarding
docs/architecture/ Fleet architecture index
docs/reference/   GitBook mirrors, fleet matrices
docs/governance/  Pointers to canon-os (normative law stays there)
fundraising/      Capital strategy, investor decks, grants, sponsorship
# venture lives at platforms/venture (peer member) — not under this tree
ops/gtm/          Go-to-market scope and inbound tickets
ops/legal/        Legal review workflows
pm/               Publish register
```

## Related

- Migration from canon-os fleet doc paths: [`docs/strategy/ecosystem-os-placement.md`](docs/strategy/ecosystem-os-placement.md)
- bridge-os issue [#28](https://github.com/gtcx-ecosystem/bridge-os/issues/28) — P35 publish topology reconciliation
