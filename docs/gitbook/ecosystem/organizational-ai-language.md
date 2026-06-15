---
title: 'Organizational AI language (Lang)'
status: current
date: 2026-06-12
owner: canon-os
tier: operating
tags: ['gitbook-chapter', 'documentation']
review_cycle: quarterly
document_type: gitbook-chapter
gitbook_space: gtcx-ecosystem
sourceOfRecord: baseline-os
---

# Organizational AI language

**Headline:** *Your organization already has a language. BaselineOS makes it executable.*

Lang is BaselineOS Layer 1 — a **living programmatic org language**, not a prompt library or fleet colon-command harness. Operators express work with shorthand (`--`, `@`, `:`, `>`, `?`) that the OS understands, learns from, and institutionalizes into repeatable deliverable contracts. When an operator uses an unknown flag, Lang registers intent and suggests the right family (for example `--report`, `--violation`, `--audit`) rather than failing silently.

**Example production line:**

```text
--report report:weekly @report:generate:new
```

## What belongs in canon-os vs baseline-os

| Concern | Owner |
| ------- | ----- |
| Ecosystem summary (this page) | canon-os |
| GTCX institutional lexicon | canon-os `docs/governance/institutional/lexicon/` |
| Business case, onboarding, developer adoption | **baseline-os** (product SoR) |
| Layer spec, engineering pack, runtime | **baseline-os** |

## Authoritative documentation (baseline-os)

| Doc | Audience |
| --- | -------- |
| [GTM Lang pack](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/lang/README.md) | All — index |
| [Business case](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/lang/00-business-case.md) | Executive / buyer |
| [Customer onboarding narrative](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/lang/01-customer-onboarding-narrative.md) | Solution engineer |
| [Developer docs narrative](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/_project/go-to-market/lang/02-developer-docs-narrative.md) | Developer / evaluator |
| [Layer spec](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/layers/lang.md) | Engineering |
| [LANG-PACK-001 documentation story](https://github.com/gtcx-ecosystem/baseline-os/blob/main/docs/specs/layers/packs/LANG-PACK-001-documentation-story.md) | Internal PM |

## Institutional lexicon

GTCX terms merge with the BaselineOS built-in lexicon. See [GTCX Lexicon Registry](../../governance/institutional/lexicon/README.md).

## Related

- [Agent init canon](../../agents/provisioning/AGENT-INIT-CANON.md) — layer stack ownership
- [GTCX Ecosystem GitBook](README.md) — fleet entry
- [Govern — ActiveRecord (SIS / DFI)](govern-active-record-sis-dfi.md) — regime inference · GRP cascade
