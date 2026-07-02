---
title: 'Agentic Architecture Overview'
status: current
date: 2026-05-22
owner: protocol-architect
tier: operating
tags: [['guides', 'how-to']]
review_cycle: on-change
document_type: onboarding
role: protocol-architect
---

# GTX Markets: Agentic Intelligence Architecture — Overview

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

**AI-Native Infrastructure for Commodity Trade Intelligence**

## Executive Summary

> **Status:** Current

## Strategic Overview

> **Note:** This document exceeds the 500-line architectural doc limit. Consider splitting into focused sub-docs in a future cleanup pass.
> GTX Markets is a **media and intelligence platform** covering global commodity trade with focus on African markets. The AI infrastructure powers:

- **7 Platforms**: TradeDesk, TradeBook, Signal, Atlas, Corridor, Frontier, FlowGrid
- **3 Intelligence Products**: CTII, CDII, RegIntel
- **Ralph Publishing System**: Autonomous content production with 13 agents and 9 workflows

## Architecture Principles

| Principle                  | Application                                         |
| -------------------------- | --------------------------------------------------- |
| **Content-First**          | AI optimized for media production, not transactions |
| **Editorial Control**      | Human-in-loop for all published content             |
| **Global South Optimized** | Offline-first, multi-channel, multi-language        |
| **Frontier-First Design**  | Built for hardest environments, works everywhere    |
| **Cost-Aware**             | Budget-capped workflows, token optimization         |

## Global South Design Requirements

> _"Built for the most challenging environments first, GTX Markets creates universal access rather than privileged access."_

### Target Environment Realities

| Constraint       | Reality                            | Design Response                        |
| ---------------- | ---------------------------------- | -------------------------------------- |
| **Connectivity** | 40% feature phones, 2G/3G dominant | USSD, SMS, offline-first               |
| **Bandwidth**    | Expensive, unreliable              | 70-85% compression, <100KB/transaction |
| **Devices**      | $50 smartphones, 1GB RAM           | Lightweight PWA, minimal JS            |
| **Power**        | Intermittent, solar-dependent      | Battery-optimized, offline queuing     |
| **Literacy**     | Variable across regions            | Voice, icons, local languages          |
| **Languages**    | 15+ across target markets          | Multi-language content production      |

### Accessibility Metrics

| Metric         | Target             | Rationale                   |
| -------------- | ------------------ | --------------------------- |
| Minimum device | $50 Android 5.0+   | Entry-level accessibility   |
| Data per alert | <10KB              | Works on limited data plans |
| Offline cache  | 7 days content     | Extended offline reading    |
| Languages      | 6 Tier 1, 5 Tier 2 | Regional coverage           |
| USSD response  | <160 chars         | Feature phone compatibility |
| Audio content  | Available          | Low-literacy accessibility  |

## Connectivity Profiles

GTX Markets adapts content delivery based on 6 connection profiles (from GTCX Protocol ADR-0016):

| Profile     | Characteristics         | Content Delivery Strategy              |
| ----------- | ----------------------- | -------------------------------------- |
| `offline`   | Zero connectivity       | Cached content only, queue alerts      |
| `ussd-only` | Feature phone, 160 char | Headlines + USSD codes for details     |
| `edge`      | 2G/EDGE, <200 Kbps      | Text-only, high compression, no images |
| `degraded`  | 3G intermittent         | Compressed images, essential content   |
| `standard`  | 4G/WiFi                 | Full content, real-time updates        |
| `satellite` | High latency, expensive | Batched delivery, cost warnings        |

### Adaptive Content Delivery

| Content Type        | Offline    | USSD     | Edge        | Degraded   | Standard      |
| ------------------- | ---------- | -------- | ----------- | ---------- | ------------- |
| **Breaking alerts** | Queued     | 160 char | Text only   | Full text  | Rich media    |
| **Digests**         | Cached     | N/A      | Headlines   | Summary    | Full          |
| **Reports**         | Downloaded | N/A      | N/A         | Summary    | Full + charts |
| **Images**          | Skip       | N/A      | Skip        | Thumbnails | Full          |
| **Data tables**     | Cached     | N/A      | Key metrics | Compressed | Interactive   |

## Multi-Language Architecture

### Language Tiers

| Tier       | Languages  | Code | Coverage              |
| ---------- | ---------- | ---- | --------------------- |
| **Tier 1** | English    | EN   | Default, all content  |
| **Tier 1** | French     | FR   | West/Central Africa   |
| **Tier 1** | Portuguese | PT   | Lusophone Africa      |
| **Tier 1** | Arabic     | AR   | North/East Africa     |
| **Tier 1** | Swahili    | SW   | East Africa           |
| **Tier 1** | Hausa      | HA   | Nigeria, Niger, Ghana |
| **Tier 2** | Twi        | TW   | Ghana                 |
| **Tier 2** | Amharic    | AM   | Ethiopia              |
| **Tier 2** | Yoruba     | YO   | Nigeria               |
| **Tier 2** | Zulu       | ZU   | South Africa          |
| **Tier 2** | Afrikaans  | AF   | South Africa          |

### Translation Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TRANSLATION PIPELINE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  English Content                                                             │
│       │                                                                      │
│       ▼                                                                      │
│  ┌──────────────────┐                                                       │
│  │ translation-agent│  LangGraph (human-in-loop for Tier 1)                 │
│  │                  │                                                       │
│  │ • Claude/GPT-4   │                                                       │
│  │ • Domain glossary│                                                       │
│  │ • Style guide    │                                                       │
│  └────────┬─────────┘                                                       │
│           │                                                                  │
│     ┌─────┴─────┬─────────┬─────────┬─────────┐                             │
│     ▼           ▼         ▼         ▼         ▼                             │
│  ┌─────┐    ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐                          │
│  │ FR  │    │ PT  │   │ AR  │   │ SW  │   │ HA  │                          │
│  └──┬──┘    └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘                          │
│     │          │         │         │         │                              │
│     ▼          ▼         ▼         ▼         ▼                              │
│  Regional Reviewer (human approval for Tier 1 languages)                    │
│     │                                                                        │
│     ▼                                                                        │
│  Multi-language publication                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Multi-Channel Distribution

### Channel Matrix

| Channel           | Audience               | Content Type                  | Connectivity Req  |
| ----------------- | ---------------------- | ----------------------------- | ----------------- |
| **Web/PWA**       | Premium subscribers    | Full content, offline-capable | Standard/Degraded |
| **Email**         | All subscribers        | Digests, alerts, reports      | Any (async)       |
| **WhatsApp**      | High-engagement users  | Breaking alerts, summaries    | Edge+             |
| **SMS**           | Low-connectivity users | Critical alerts (160 char)    | Any               |
| **USSD**          | Feature phone users    | Interactive menus             | USSD-only         |
| **Telegram**      | Tech-savvy users       | Alerts, community             | Edge+             |
| **API/FlowGrid**  | Enterprise customers   | Full data feeds               | Standard          |
| **Audio/Podcast** | Low-literacy users     | Daily briefings               | Offline download  |

### USSD Service Codes

```
*GTX*1#     → Today's Headlines (3 stories)
*GTX*2#     → Gold Price (LBMA, local)
*GTX*3#     → Regulatory Alerts (by country)
*GTX*4#     → Subscribe/Manage
*GTX*5#     → Help
*GTX*0#     → Language Selection
```

### USSD Response Format (160 char max)

```
## Headlines Response (158 chars)

1.Ghana export rules change-Feb1
2.Gold hits $2100
3.DRC suspends 12 mines
Reply 1-3 for details or *GTX*1*[num]#
`
`
```

## Price Response (142 chars)

GOLD 27Jan
LBMA: $2,089/oz (+0.3%)
GHS: 524,200/oz
NGN: 3.2M/oz
ZAR: 38,900/oz
Updated: 14:30 UTC

```

## Offline-First Architecture

```

┌─────────────────────────────────────────────────────────────────────────────┐
│ GTX MARKETS OFFLINE ARCHITECTURE │
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ CLOUD (Always-On) EDGE (Offline-Capable) │
│ ───────────────── ────────────────────── │
│ │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Qdrant Cloud │ ───sync───────▶ │ SQLite/Chroma │ │
│ │ (Full corpus) │ │ (Critical docs) │ │
│ └──────────────────┘ └──────────────────┘ │
│ │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Ralph Agents │ ───publish────▶ │ PWA Cache │ │
│ │ (Production) │ │ (7 days content)│ │
│ └──────────────────┘ └──────────────────┘ │
│ │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ RegIntel DB │ ───snapshot───▶ │ Local RegIntel │ │
│ │ (Live) │ │ (Weekly sync) │ │
│ └──────────────────┘ └──────────────────┘ │
│ │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Audio Content │ ───download───▶ │ Offline Audio │ │
│ │ (Daily briefs) │ │ (3 days) │ │
│ └──────────────────┘ └──────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────────────┘

```

### Offline Content Strategy

| Content Type         | Sync Frequency      | Storage       | Offline Duration |
| -------------------- | ------------------- | ------------- | ---------------- |
| Breaking alerts      | Push when connected | PWA cache     | 7 days           |
| Daily digests        | Daily               | PWA cache     | 7 days           |
| Country profiles     | Weekly              | SQLite        | 30 days          |
| Regulatory snapshots | Weekly              | SQLite        | 30 days          |
| CTII/CDII scores     | Monthly             | SQLite        | 60 days          |
| Audio briefings      | Daily download      | Local storage | 3 days           |
| Full reports         | On-demand           | Local storage | Until deleted    |

## Negative Scope

This document does **not** cover:

- **MCP server specifications and RAG knowledge domains** (vector store schemas, API tool definitions, embedding strategies): See [Agentic Architecture Components](agentic-architecture-components.md)
- **Agent integration points and implementation roadmap** (Ralph orchestrator workflows, framework selection, cost estimates): See [Agentic Architecture Integration](agentic-architecture-integration.md)
- **Troubleshooting or operational runbooks** (debugging agent failures, performance tuning, incident response): See [Agent Troubleshooting](agent-troubleshooting.md)

---

## Related Documents

- [Agentic Architecture Components](agentic-architecture-components.md) — System architecture, MCP servers, and RAG knowledge domains
- [Agentic Architecture Integration](agentic-architecture-integration.md) — Ralph agents, integration points, and implementation roadmap
```
