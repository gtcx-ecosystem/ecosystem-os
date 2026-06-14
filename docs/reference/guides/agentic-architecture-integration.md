---

title: 'Agentic Architecture Integration'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['guides', 'how-to']
review_cycle: 'on-change'

---

## Executive Summary

> **Status:** Current

# GTX Markets: Agentic Intelligence Architecture — Integration

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

| Category         | Agent               | Role                                      | Framework  |
| ---------------- | ------------------- | ----------------------------------------- | ---------- |
| **Scout**        | `news-scout`        | Monitor news feeds, flag breaking stories | Agno       |
| **Scout**        | `regulatory-scout`  | Monitor government portals for changes    | Agno       |
| **Scout**        | `market-scout`      | Track price movements, volume anomalies   | Agno       |
| **Analyst**      | `policy-analyst`    | Analyze regulatory implications           | LangGraph  |
| **Analyst**      | `markets-analyst`   | Analyze market movements, price trends    | LangGraph  |
| **Analyst**      | `africa-bureau`     | Regional expertise, context, sources      | LangGraph  |
| **Analyst**      | `data-analyst`      | CTII/CDII calculations, data validation   | PydanticAI |
| **Writer**       | `alert-writer`      | Breaking alerts, urgent notifications     | CrewAI     |
| **Writer**       | `digest-writer`     | Daily/weekly digests, summaries           | CrewAI     |
| **Writer**       | `report-writer`     | Long-form reports, deep dives             | CrewAI     |
| **QA**           | `fact-checker`      | Verify claims, check sources, flag issues | LangGraph  |
| **QA**           | `style-checker`     | Ensure voice consistency, formatting      | PydanticAI |
| **Localization** | `translation-agent` | **Multi-language translation + review**   | LangGraph  |

### Workflow Registry (9 Workflows)

| Workflow            | Trigger          | Agents                                           | Output         | SLA      | Languages     | Channels          |
| ------------------- | ---------------- | ------------------------------------------------ | -------------- | -------- | ------------- | ----------------- |
| `breaking-alert`    | News scout       | scout analyst alert-writer QA                    | Alert          | 15 min   | EN + Tier 1   | All               |
| `regulatory-alert`  | Regulatory scout | scout policy-analyst alert-writer QA             | Alert          | 30 min   | EN + affected | All               |
| `daily-digest`      | 6am UTC          | scouts analysts digest-writer QA                 | Newsletter     | 2 hours  | EN, FR, PT    | Email, WhatsApp   |
| `weekly-regulatory` | Wed 8am          | regulatory-scout policy-analyst digest-writer QA | Brief          | 4 hours  | EN, FR        | Email, PDF        |
| `sector-report`     | 15th monthly     | all scouts all analysts report-writer QA         | Report         | 8 hours  | EN            | Email, PDF, Web   |
| `country-deep-dive` | On-demand        | africa-bureau all analysts report-writer QA      | Report         | 24 hours | EN + local    | Email, PDF        |
| `market-commentary` | Market close     | market-scout markets-analyst alert-writer QA     | Commentary     | 1 hour   | EN            | Email, Telegram   |
| `ctii-update`       | Data refresh     | data-analyst fact-checker                        | Score update   | 4 hours  | N/A           | API               |
| `audio-briefing`    | Daily 7am        | digest-writer TTS engine                         | **Audio file** | 1 hour   | EN, FR, SW    | Podcast, Download |

## Integration Points

### Platform Intelligence Layer

```
TradeDesk Query: "What are current Ghana gold export requirements?"
         │
         ▼
    ┌────────────────────────────────────────────────────────────┐
    │                    QUERY ROUTER                             │
    │                                                             │
    │  1. RAG: Search gtx_regulatory for Ghana gold export       │
    │  2. MCP: gtx-regintel.get_jurisdiction_profile()           │
    │  3. RAG: Search gtx_countries for Ghana context            │
    │  4. MCP: gtx-i18n.translate_content() if non-EN user       │
    │  5. Synthesize response with citations                      │
    │                                                             │
    └────────────────────────────────────────────────────────────┘
         │
         ▼
    Response with:
    - Current requirements (from RegIntel DB)
    - Recent changes (from regulatory corpus)
    - CTII score context (from country profiles)
    - Related coverage links (from archive)
    - Localized if user language ≠ EN
```

### Ralph Distribution (Multi-Channel)

```
Breaking Alert Detected
         │
         ▼
    ┌────────────────────────────────────────────────────────────┐
    │                 RALPH ORCHESTRATOR                          │
    │                                                             │
    │  1. news-scout detects story                               │
    │  2. policy-analyst assesses significance                   │
    │  3. alert-writer drafts alert (3 versions):                │
    │     • full (email/web)                                     │
    │     • summary (WhatsApp/Telegram, 500 char)                │
    │     • headline (SMS/USSD, 160 char)                        │
    │  4. translation-agent translates to Tier 1 languages       │
    │  5. fact-checker verifies claims                           │
    │  6. style-checker ensures voice                            │
    │  7. HUMAN APPROVAL (editorial review)                      │
    │  8. gtx-distribution.send_alert() — all channels           │
    │                                                             │
    └────────────────────────────────────────────────────────────┘
         │
         ▼
    Distributed to:
    - Email alerts (priority subscribers) — EN, FR, PT, AR, SW, HA
    - WhatsApp (high-engagement) — summary version
    - SMS (low-connectivity) — 160 char headline
    - USSD (feature phones) — headline + detail code
    - Telegram (tech-savvy) — summary version
    - Signal platform (real-time feed)
    - FlowGrid API (data customers)
```

## Voice/Audio Support

### Audio Content Strategy

| Content Type              | Duration  | Languages  | Update Frequency |
| ------------------------- | --------- | ---------- | ---------------- |
| Daily briefing            | 5-7 min   | EN, FR, SW | Daily 7am UTC    |
| Breaking alert audio      | 30-60 sec | EN         | As needed        |
| Weekly regulatory summary | 10-15 min | EN, FR     | Weekly           |
| Monthly sector review     | 20-30 min | EN         | Monthly          |

### Text-to-Speech Configuration

```yaml
# Voice models (from GTCX Protocol ADR-0020)
voices:
  en-male:
    model: piper/en-us-lessac-medium
    rate: 1.0
    style: professional
  en-female:
    model: piper/en-us-amy-medium
    rate: 1.0
    style: professional
  fr-male:
    model: piper/fr-fr-upmc-medium
    rate: 0.95
    style: professional
  fr-female:
    model: piper/fr-fr-siwis-medium
    rate: 0.95
    style: professional
  sw-female:
    model: coqui/sw-ke-female
    rate: 0.9
    style: conversational
```

## Framework Selection

### Primary Stack

| Framework           | GTX Markets Role                  | Global South Value             |
| ------------------- | --------------------------------- | ------------------------------ |
| **LangGraph**       | Analyst + QA + Translation agents | Human-in-loop for translations |
| **Agno**            | Scout agents                      | SQLite offline persistence     |
| **CrewAI**          | Writer agents                     | Multi-language editorial crews |
| **PydanticAI**      | Data validation, style checking   | Language-aware schemas         |
| **LlamaIndex**      | RAG ingestion                     | Multi-language embeddings      |
| **Qdrant + Chroma** | Vector storage                    | Cloud + mobile-embedded        |
| **Piper/Coqui**     | TTS                               | Offline voice synthesis        |

### Cost Estimate

| Component              | Solution                 | Annual Cost    |
| ---------------------- | ------------------------ | -------------- |
| LLM API (Claude/GPT-4) | ~$25/day (+ translation) | ~$9K           |
| LangSmith              | Observability            | ~$2K           |
| Qdrant Cloud           | Primary vectors          | ~$1.5K         |
| Chroma/SQLite          | Edge sync                | ~$500 (infra)  |
| Translation validation | Backup/quality           | ~$1K           |
| SMS/WhatsApp           | Twilio/Africa's Talking  | ~$3K           |
| USSD Gateway           | Africa's Talking/Hubtel  | ~$2K           |
| TTS/Audio hosting      | Piper + S3               | ~$1K           |
| **TOTAL**              |                          | **~$20K/year** |

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)

| Week | Deliverable             | Global South Feature                           |
| ---- | ----------------------- | ---------------------------------------------- |
| 1    | RAG infrastructure      | Multi-language embeddings, 6 collections       |
| 2    | Core MCP servers        | gtx-sources, gtx-regintel with offline caching |
| 3    | Scout agents            | Low-bandwidth gov portal scraping              |
| 4    | Breaking alert workflow | **SMS + USSD delivery**                        |

### Phase 2: Multi-Language (Weeks 5-8)

| Week | Deliverable                | Global South Feature                      |
| ---- | -------------------------- | ----------------------------------------- |
| 5    | Translation agent          | EN FR, PT, AR, SW, HA                     |
| 6    | gtx-i18n MCP server        | Glossaries, validation                    |
| 7    | Multi-channel distribution | WhatsApp, Telegram, full gtx-distribution |
| 8    | Daily digest (multi-lang)  | 3 languages, email + WhatsApp             |

### Phase 3: Offline + Audio (Weeks 9-12)

| Week | Deliverable               | Global South Feature                      |
| ---- | ------------------------- | ----------------------------------------- |
| 9    | PWA offline cache         | 7-day content sync, Chroma edge           |
| 10   | Audio briefing workflow   | TTS in EN, FR, SW                         |
| 11   | USSD gateway integration  | Feature phone access via Africa's Talking |
| 12   | Full multi-channel launch | All 8 channels live, all 9 workflows      |

## Quality & Safety Controls

### Editorial Safeguards

| Control                | Implementation                                    |
| ---------------------- | ------------------------------------------------- |
| **Human-in-Loop**      | All published content requires editorial approval |
| **Translation Review** | Tier 1 languages require regional reviewer        |
| **Fact-Check Gate**    | fact-checker agent must pass before publication   |
| **Source Attribution** | All claims must link to verifiable sources        |
| **Cost Caps**          | Per-workflow budget limits ($25/day max)          |

### Content Quality Metrics

| Metric                 | Target    | Measurement              |
| ---------------------- | --------- | ------------------------ |
| Factual accuracy       | >99%      | Post-publication audit   |
| Translation quality    | >95% BLEU | Automated + human review |
| Timeliness (breaking)  | <15 min   | Detection to publication |
| USSD response accuracy | >99%      | User feedback            |
| Audio clarity          | >4.5/5    | Listener ratings         |

## The GTX Markets Intelligence Stack

| #   | Choice              | Role                       | Global South Value        |
| --- | ------------------- | -------------------------- | ------------------------- |
| 1   | **LangGraph**       | Analyst + QA + Translation | Human-in-loop for quality |
| 2   | **Agno**            | Scout agents               | SQLite offline, fast      |
| 3   | **CrewAI**          | Writer crews               | Multi-language output     |
| 4   | **PydanticAI**      | Validation                 | Language-aware schemas    |
| 5   | **LlamaIndex**      | RAG ingestion              | Multi-language embeddings |
| 6   | **Qdrant + Chroma** | Vectors                    | Cloud + edge sync         |
| 7   | **Piper/Coqui**     | TTS                        | Offline voice synthesis   |
| 8   | **MCP (5 servers)** | Tool access                | USSD, SMS, WhatsApp       |

**This architecture provides:**

- [Done] Autonomous content production with human oversight
- [Done] **6 Tier 1 + 5 Tier 2 language support** (EN, FR, PT, AR, SW, HA + regional)
- [Done] **8 distribution channels** (Email, WhatsApp, SMS, USSD, Telegram, Web, API, Audio)
- [Done] **Offline-first** with 7-day PWA cache + SQLite/Chroma edge sync
- [Done] **Feature phone access** via USSD (*GTX*1# etc.)
- [Done] **Audio content** for low-literacy users (Piper/Coqui TTS)
- [Done] **Connectivity-aware** delivery (6 profiles from offline to satellite)
- [Done] **$50 device target** compatibility (<10KB alerts, <100KB transactions)
- [Done] Cost-controlled operations (~$20K/year)
- [Done] Full audit trails for compliance

_Architecture defined: January 2026_
_Updated: January 2026 — Global South requirements integrated, audit fixes applied_
_Scope: GTX Markets media/intelligence platform_

## Negative Scope

This document does **not** cover:

- **Strategic architecture principles and Global South design requirements** (connectivity profiles, offline-first strategy, accessibility metrics): See [Agentic Architecture Overview](agentic-architecture-overview.md)
- **MCP server specifications and RAG vector store design** (collection schemas, chunking strategies, edge sync): See [Agentic Architecture Components](agentic-architecture-components.md)
- **Troubleshooting or operational runbooks** (debugging agent failures, performance tuning, incident response): See [Agent Troubleshooting](agent-troubleshooting.md)

---

## Related Documents

- [Agentic Architecture Overview](agentic-architecture-overview.md) — Strategic principles, Global South design, and offline-first architecture
- [Agentic Architecture Components](agentic-architecture-components.md) — System architecture, MCP servers, and RAG knowledge domains
