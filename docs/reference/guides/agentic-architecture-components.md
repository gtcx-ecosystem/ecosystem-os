---
title: 'Agentic Architecture Components'
status: current
date: 2026-05-22
owner: protocol-architect
tier: operating
tags: [['guides', 'how-to']]
review_cycle: on-change
document_type: onboarding
role: protocol-architect
---

## Executive Summary

> **Status:** Current

# GTX Markets: Agentic Intelligence Architecture — Components

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

┌─────────────────────────────────────────────────────────────────────────────┐
│ GTX MARKETS INTELLIGENCE LAYER │
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ MCP CONNECTORS (Live Data) │ │
│ │ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────┐│ │
│ │ │gtx-sources│ │gtx-regintel│ │gtx-analytics│ │gtx-distrib│ │gtx-i18n││ │
│ │ │News, Gov │ │Regulatory │ │Engagement │ │Multi-chan │ │Transl.││ │
│ │ │Portals │ │Database │ │Metrics │ │Delivery │ │Engine ││ │
│ │ └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────┘│ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ RAG KNOWLEDGE (Editorial Memory) │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │
│ │ │ Regulatory │ │ Country │ │ Editorial │ │ Glossaries │ │ │
│ │ │ Corpus │ │ Profiles │ │ Style Guide │ │ (per lang) │ │ │
│ │ │ (50+ juris) │ │ (54 Africa) │ │ & Voice │ │ Domain terms│ │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │ │
│ │ ┌─────────────┐ ┌─────────────┐ │ │
│ │ │ Landscape │ │ Archive │ │ │
│ │ │ Competitors │ │ All content │ │ │
│ │ │ Market data │ │ (2+ years) │ │ │
│ │ └─────────────┘ └─────────────┘ │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ RALPH ORCHESTRATOR │ │
│ │ │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │
│ │ │ Scout │ │ Analyst │ │ Writer │ │ QA │ │ │
│ │ │ Agents │ │ Agents │ │ Agents │ │ Agents │ │ │
│ │ │ (3) │ │ (4) │ │ (3) │ │ (2) │ │ │
│ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │ │
│ │ │ │
│ │ ┌──────────────────────────────────────────────────────────┐ │ │
│ │ │ translation-agent (LangGraph) — Multi-language output │ │ │
│ │ └──────────────────────────────────────────────────────────┘ │ │
│ │ │ │
│ │ 9 Workflows: │ │
│ │ ├─ breaking-alert ├─ daily-digest ├─ weekly-regulatory│ │
│ │ ├─ regulatory-alert ├─ sector-report ├─ country-deep-dive│ │
│ │ ├─ market-commentary ├─ ctii-update └─ audio-briefing │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────────────┘
│
┌────────────────────────────┼────────────────────────────┐
▼ ▼ ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ PLATFORMS │ │ INTELLIGENCE │ │ DISTRIBUTION │
│ │ │ PRODUCTS │ │ │
│ • TradeDesk │ │ • CTII Scores │ │ • Email │
│ • TradeBook │ │ • CDII Scores │ │ • WhatsApp │
│ • Signal │ │ • RegIntel │ │ • SMS │
│ • Atlas │ │ │ │ • USSD │
│ • Corridor │ │ │ │ • Telegram │
│ • Frontier │ │ │ │ • API/FlowGrid │
│ • PWA (offline) │ │ │ │ • Audio/Podcast │
└─────────────────┘ └─────────────────┘ └─────────────────
`

``````

## Platform Intelligence Requirements

| Platform      | AI Capability                                | Primary Use Case                               |
| ------------- | -------------------------------------------- | ---------------------------------------------- |
| **TradeDesk** | Personalized alerts, compliance queries      | "Alert me when Ghana changes export rules"     |
| **TradeBook** | Entity verification, due diligence summaries | "Summarize this refinery's compliance history" |
| **Signal**    | Breaking news detection, alert routing       | Real-time regulatory change detection          |
| **Atlas**     | Report generation, research synthesis        | Automated sector reports and deep dives        |
| **Corridor**  | Route optimization, flow analysis            | Trade corridor risk assessment                 |
| **Frontier**  | Contributor coordination, field dispatch     | Process field contributor submissions          |
| **FlowGrid**  | Data pipeline orchestration                  | Automated data ingestion and transformation    |

## Intelligence Product AI Requirements

| Product      | AI Capability                           | Automation Level                           |
| ------------ | --------------------------------------- | ------------------------------------------ |
| **CTII**     | Score calculation, trend analysis       | 80% automated (human review on outliers)   |
| **CDII**     | Government site monitoring, scoring     | 90% automated (weekly spot checks)         |
| **RegIntel** | Regulatory monitoring, alert generation | 70% automated (editorial review on alerts) |

## MCP Server Ecosystem

### 5 Custom GTX Markets MCP Servers

| MCP Server         | Function                       | Global South Feature           |
| ------------------ | ------------------------------ | ------------------------------ |
| `gtx-sources`      | News, gov portals, market data | Gov portal caching for offline |
| `gtx-regintel`     | Regulatory database            | Offline-syncable snapshots     |
| `gtx-analytics`    | Engagement metrics             | Low-bandwidth tracking         |
| `gtx-distribution` | Multi-channel delivery         | **USSD, SMS, WhatsApp**        |
| `gtx-i18n`         | Translation engine             | **6+ language support**        |

### MCP Server Specifications

```yaml
# gtx-sources.yaml
name: gtx-sources
version: 1.0.0
description: News, government portals, and market data ingestion

tools:
  - name: fetch_news_feed
    description: Fetch articles from configured news sources
    parameters:
      source_id: string # reuters, bloomberg, mining-weekly
      since: datetime
      keywords: string[]

  - name: scrape_gov_portal
    description: Scrape government ministry/regulatory body website
    parameters:
      portal_id: string # ghana-minerals-commission, sa-dmr
      page_type: enum[gazette, announcements, regulations]
      cache_offline: boolean # Store for offline sync

  - name: get_market_data
    description: Fetch commodity price and volume data
    parameters:
      commodity: string # gold, copper, cobalt
      exchange: string # lbma, comex, shanghai
      period: string # 1d, 1w, 1m

  - name: search_archives
    description: Search GTX Markets content archive
    parameters:
      query: string
      content_type: enum[article, alert, report]
      date_range: object
      language: string # Filter by language
`
`
`````yaml
# gtx-regintel.yaml
name: gtx-regintel
version: 1.0.0
description: Regulatory intelligence database access

tools:
  - name: get_regulation
    description: Retrieve specific regulation details
    parameters:
      jurisdiction: string # ISO country code
      regulation_id: string
      language: string # Return in specified language

  - name: search_regulatory_changes
    description: Search for regulatory changes by criteria
    parameters:
      jurisdictions: string[]
      commodity: string
      change_type: enum[new, amended, repealed]
      since: datetime

  - name: get_jurisdiction_profile
    description: Get complete regulatory profile for a jurisdiction
    parameters:
      jurisdiction: string
      commodity: string
      include_ctii: boolean # Include CTII score

  - name: compare_jurisdictions
    description: Compare regulatory frameworks across jurisdictions
    parameters:
      jurisdictions: string[]
      aspect: enum[licensing, export, taxation, compliance]

  - name: export_offline_snapshot
    description: Generate offline-syncable regulatory snapshot
    parameters:
      jurisdictions: string[]
      format: enum[sqlite, json]
      max_size_kb: number # Limit for low-bandwidth sync
`
`
````yaml
# gtx-analytics.yaml
name: gtx-analytics
version: 1.0.0
description: Engagement metrics and content performance

tools:
  - name: get_content_performance
    description: Get performance metrics for published content
    parameters:
      content_id: string
      metrics: enum[views, shares, clicks, time_on_page]
      period: string

  - name: get_subscriber_engagement
    description: Get subscriber engagement metrics
    parameters:
      segment: enum[premium, standard, trial]
      channel: enum[email, whatsapp, sms, ussd, web]
      period: string

  - name: get_alert_effectiveness
    description: Measure alert open rates and actions
    parameters:
      alert_type: enum[breaking, regulatory, market]
      channel: string
      period: string

  - name: track_event_lightweight
    description: Low-bandwidth event tracking for Global South
    parameters:
      event_type: string
      content_id: string
      channel: string
      payload_bytes: number # Must be <1KB
`
`
````yaml
# gtx-distribution.yaml
name: gtx-distribution
version: 2.0.0
description: Multi-channel content distribution for Global South

tools:
  - name: send_alert
    description: Send alert across multiple channels
    parameters:
      channels: enum[email, whatsapp, sms, ussd, telegram, push][]
      priority: enum[all, premium, critical-only]
      content:
        full: string # For email/web (unlimited)
        summary: string # For WhatsApp/Telegram (500 char)
        headline: string # For SMS/USSD (160 char)
        audio_url: string # For podcast/audio channels
      languages: string[] # Auto-translate before send
      jurisdictions: string[]

  - name: send_ussd_menu
    description: Send USSD interactive menu
    parameters:
      service_code: string # *GTX*X#
      menu_items: array
      session_id: string
      language: string

  - name: send_sms
    description: Send SMS with 160 char limit
    parameters:
      recipients: string[] # Phone numbers
      message: string # Max 160 chars
      language: string

  - name: send_whatsapp
    description: Send WhatsApp message via Business API
    parameters:
      recipients: string[]
      template: string # Pre-approved template
      variables: object
      language: string

  - name: queue_audio
    description: Queue content for audio briefing
    parameters:
      content_id: string
      voice: enum[en-male, en-female, fr-male, fr-female, sw-female]
      priority: enum[lead, feature, brief]

  - name: publish_to_api
    description: Publish content to FlowGrid API
    parameters:
      content_id: string
      endpoint: string

  - name: post_social
    description: Post to social media channels
    parameters:
      platform: enum[linkedin, twitter, threads]
      content: string
      link: string
      language: string

  - name: send_newsletter
    description: Queue content for newsletter inclusion
    parameters:
      newsletter: enum[daily-digest, weekly-regulatory, monthly-report]
      content_id: string
      position: enum[lead, feature, brief]
      languages: string[]
`
`
````yaml
# gtx-i18n.yaml
name: gtx-i18n
version: 1.0.0
description: Translation and localization engine

tools:
  - name: translate_content
    description: Translate content to target languages
    parameters:
      content: string
      source_lang: string # en
      target_langs: string[] # [fr, pt, ar, sw, ha]
      content_type: enum[alert, digest, report, ussd]
      preserve_formatting: boolean

  - name: get_glossary
    description: Domain-specific terminology by language
    parameters:
      domain: enum[regulatory, mining, trade, finance]
      language: string

  - name: validate_translation
    description: Check translation quality score
    parameters:
      original: string
      translated: string
      language: string

  - name: localize_numbers
    description: Format numbers for locale
    parameters:
      value: number
      type: enum[currency, weight, percentage]
      locale: string
      currency: string # GHS, NGN, ZAR, USD

  - name: get_supported_languages
    description: List supported languages and tiers
    parameters:
      content_type: enum[alert, digest, report, audio]
``````

## RAG Knowledge Architecture

### Knowledge Domains

| Domain                   | Sources                                                      | Size           | Update Frequency |
| ------------------------ | ------------------------------------------------------------ | -------------- | ---------------- |
| **Regulatory Corpus**    | Government gazettes, ministry announcements, LBMA/OECD rules | ~50K documents | Daily            |
| **Country Profiles**     | 54 African nations + key trade partners                      | ~200 profiles  | Weekly           |
| **CTII Methodology**     | Scoring frameworks, indicator definitions, data sources      | ~50 documents  | Quarterly        |
| **CDII Methodology**     | Assessment criteria, URL inventories, scoring rubrics        | ~100 documents | Monthly          |
| **Editorial Guidelines** | Voice guide, style manual, topic taxonomies                  | ~30 documents  | As needed        |
| **Historical Coverage**  | Past articles, reports, alerts (2+ years)                    | ~10K articles  | Continuous       |
| **Industry Landscape**   | Competitor profiles, market structure, key players           | ~100 documents | Monthly          |
| **Domain Glossaries**    | Terminology per language (6 Tier 1 + 5 Tier 2)               | ~11 glossaries | As needed        |

### Vector Store Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           QDRANT COLLECTIONS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │  gtx_regulatory  │  │  gtx_countries   │  │  gtx_editorial   │          │
│  │                  │  │                  │  │                  │          │
│  │  • Regulations   │  │  • Country data  │  │  • Style guides  │          │
│  │  • Gazettes      │  │  • CTII scores   │  │  • Voice docs    │          │
│  │  • Compliance    │  │  • CDII scores   │  │  • Topic guides  │          │
│  │    requirements  │  │  • Risk profiles │  │  • Past articles │          │
│  │                  │  │                  │  │                  │          │
│  │  Chunk: 512 tok  │  │  Chunk: 1024 tok │  │  Chunk: 256 tok  │          │
│  │  Overlap: 50     │  │  Overlap: 100    │  │  Overlap: 25     │          │
│  │  Embed: multi-   │  │  Embed: multi-   │  │  Embed: multi-   │          │
│  │  lingual         │  │  lingual         │  │  lingual         │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │  gtx_landscape   │  │  gtx_archive     │  │  gtx_glossaries  │          │
│  │                  │  │                  │  │                  │          │
│  │  • Competitors   │  │  • All published │  │  • EN terms      │          │
│  │  • Market data   │  │    content       │  │  • FR terms      │          │
│  │  • Industry      │  │  • Searchable    │  │  • PT/AR/SW/HA   │          │
│  │    structure     │  │    history       │  │  • Domain-spec   │          │
│  │                  │  │                  │  │                  │          │
│  │  Chunk: 512 tok  │  │  Chunk: 768 tok  │  │  Chunk: 128 tok  │          │
│  │  Overlap: 50     │  │  Overlap: 75     │  │  Overlap: 0      │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                              │
│  EDGE SYNC (Chroma/SQLite):                                                 │
│  ├─ gtx_countries (critical subset) ──────────────────── Weekly sync       │
│  ├─ gtx_regulatory (jurisdiction subset) ─────────────── Weekly sync       │
│  └─ gtx_glossaries (all) ─────────────────────────────── Monthly sync      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Negative Scope

This document does **not** cover:

- **Strategic architecture principles and Global South design requirements** (connectivity profiles, multi-language tiers, offline-first strategy): See [Agentic Architecture Overview](agentic-architecture-overview.md)
- **Agent integration points and implementation roadmap** (Ralph orchestrator, framework selection, cost estimates, phased rollout): See [Agentic Architecture Integration](agentic-architecture-integration.md)
- **Troubleshooting or operational runbooks** (debugging agent failures, performance tuning, incident response): See [Agent Troubleshooting](agent-troubleshooting.md)

---

## Related Documents

- [Agentic Architecture Overview](agentic-architecture-overview.md) — Strategic principles, Global South design, and offline-first architecture
- [Agentic Architecture Integration](agentic-architecture-integration.md) — Ralph agents, integration points, and implementation roadmap
