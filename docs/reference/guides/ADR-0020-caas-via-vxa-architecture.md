---

title: 'ADR 0020 Caas Via Vxa Architecture'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['guides', 'how-to']
review_cycle: 'on-change'

---

# ADR-0020: CaaS, VIA, and VXA Architecture

**Status:** Accepted  
**Date:** January 21, 2026  
**Authors:** GTCX Architecture Team  
**Reviewers:** [Pending]  
**Related ADRs:** ADR-0016 (Connectivity Profiles), ADR-0017 (Edge Inference)

## Executive Summary

**Date:** January 21, 2026

## 1. Executive Summary

This ADR establishes the architecture for GTCX's compliance infrastructure:

- **CaaS (Compliance-as-a-Service):** Compliance engine providing curriculum, assessment, credentialing, audit, and harmonization
- **VIA (Operations):** Voice-driven compliance operations guidance ("How do I comply?")
- **VXA (Audit):** Voice-driven compliance verification ("Can I prove it?")

### Key Decisions

| Decision                                                | Rationale                        |
| ------------------------------------------------------- | -------------------------------- |
| VIA + VXA consolidated into single `compliance/` module | P6: Compliance is one domain     |
| CaaS logic separated from content (CDN-hosted)          | Scalability, independent updates |
| Voice models downloaded on-demand                       | Storage optimization             |
| Lazy loading at module/component level                  | Performance                      |
| Clean extraction path for future standalone apps        | Future-proofing                  |

**Architecture Rating:** 8/10  
**Confidence Level:** High

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CDN LAYER                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │   CaaS Content   │  │   Voice Models   │  │   App Assets     │     │
│  │  (curricula,     │  │  (STT, TTS,      │  │                  │     │
│  │   assessments)   │  │   intent)        │  │                  │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                      On-Demand Download
                                │
┌─────────────────────────────────────────────────────────────────────────┐
│                           PACKAGE LAYER                                 │
│                                                                         │
│  ┌─────────────────────────┐    ┌─────────────────────────┐           │
│  │    operations/caas      │    │     03-platform/packages/voice      │           │
│  │    @gtcx/ops-caas       │    │     @gtcx/voice         │           │
│  │                         │    │                         │           │
│  │  03-platform/src/ (~50KB logic)     │    │  03-platform/src/ (~30KB logic)     │           │
│  │  ├── core/              │    │  ├── manager/           │           │
│  │  │   ├── curriculum/    │    │  ├── recognition/       │           │
│  │  │   ├── assessment/    │    │  ├── synthesis/         │           │
│  │  │   ├── credentialing/ │    │  └── dialogue/          │           │
│  │  │   ├── audit/         │    │                         │           │
│  │  │   └── harmontic./    │    │                         │           │
│  │  └── gtcx/              │    │                         │           │
│  │      └── integrations   │    │                         │           │
│  └─────────────────────────┘    └─────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                           Lazy Load
                                │
┌─────────────────────────────────────────────────────────────────────────┐
│                           MODULE LAYER                                  │
│                    apps/mobile/gtcx/modules/                            │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │                      compliance/                               │     │
│  │                                                                │     │
│  │   ┌─────────────────┐       ┌─────────────────┐              │     │
│  │   │   operations/   │       │     audit/      │              │     │
│  │   │     (VIA)       │       │     (VXA)       │              │     │
│  │   │                 │       │                 │              │     │
│  │   │ "How do I       │       │ "Can I prove    │              │     │
│  │   │  comply?"       │       │  compliance?"   │              │     │
│  │   │                 │       │                 │              │     │
│  │   │ [Lazy Loaded]   │       │ [Lazy Loaded]   │              │     │
│  │   └─────────────────┘       └─────────────────┘              │     │
│  │                                                                │     │
│  │   ┌─────────────────────────────────────────────────────┐    │     │
│  │   │                    shared/                           │    │     │
│  │   │       Voice infrastructure, CaaS hooks               │    │     │
│  │   └─────────────────────────────────────────────────────┘    │     │
│  └───────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

## 3. Package Specifications

### 3.1 CaaS Package (`operations/caas/`)

```
operations/caas/
├── 03-platform/src/
│   ├── core/                      # Generic compliance engine
│   │   ├── curriculum/
│   │   │   ├── engine.ts          # Curriculum delivery logic
│   │   │   ├── pathway.ts         # Learning path management
│   │   │   ├── content-loader.ts  # CDN content fetching
│   │   │   └── types.ts
│   │   ├── assessment/
│   │   │   ├── engine.ts          # Assessment orchestration
│   │   │   ├── knowledge.ts       # Quiz-based evaluation
│   │   │   ├── practical.ts       # Field-based evaluation
│   │   │   ├── scoring.ts
│   │   │   └── types.ts
│   │   ├── credentialing/
│   │   │   ├── issuance.ts
│   │   │   ├── verification.ts
│   │   │   ├── renewal.ts
│   │   │   └── types.ts
│   │   ├── audit/
│   │   │   ├── engine.ts
│   │   │   ├── checklist.ts
│   │   │   ├── evidence.ts
│   │   │   ├── findings.ts
│   │   │   └── types.ts
│   │   └── harmonization/
│   │       ├── mapping.ts
│   │       ├── equivalency.ts
│   │       └── types.ts
│   │
│   ├── gtcx/                      # GTCX-specific extensions
│   │   ├── gci-integration.ts
│   │   ├── pathways-triggers.ts
│   │   └── jurisdiction-configs/
│   │
│   └── index.ts
│
├── content/                       # Manifests (point to CDN)
│   ├── curricula/manifest.json
│   ├── assessments/manifest.json
│   └── checklists/manifest.json
│
└── package.json
```

**Content Delivery Pattern:**

- Logic package stays tiny (~50KB)
- Content lives on CDN (`cdn.gtcx.trade/caas/`)
- Manifests define available content
- On-demand download with local cache
- Selective prefetch for offline

### 3.2 Voice Package (`03-platform/packages/voice/`)

```
03-platform/packages/voice/
├── 03-platform/src/
│   ├── manager/                   # Model management
│   │   ├── download.ts            # On-demand download
│   │   ├── storage.ts             # Local model storage
│   │   ├── registry.ts            # Available models
│   │   └── lifecycle.ts           # Load/unload
│   │
│   ├── recognition/               # Speech-to-text
│   │   ├── engine.ts              # Unified interface
│   │   ├── online.ts              # Cloud STT
│   │   ├── offline.ts             # Edge STT (Whisper)
│   │   └── types.ts
│   │
│   ├── synthesis/                 # Text-to-speech
│   │   ├── engine.ts
│   │   ├── online.ts              # Cloud TTS
│   │   ├── offline.ts             # Edge TTS (Piper)
│   │   └── types.ts
│   │
│   ├── dialogue/                  # Conversation
│   │   ├── state.ts               # State machine
│   │   ├── context.ts
│   │   ├── intents.ts
│   │   └── slots.ts
│   │
│   └── index.ts
│
└── package.json
```

**Model Management:**

- Models on CDN (`cdn.gtcx.trade/voice/`)
- Download on first use per language
- ~75MB STT + ~50MB TTS per language
- Cloud fallback when offline models unavailable
- Storage management (auto-cleanup unused)

## 4. Module Specification

### 4.1 Compliance Module Structure

```
apps/mobile/gtcx/modules/compliance/
├── operations/                    # VIA flows
│   ├── screens/
│   │   ├── DashboardScreen.tsx
│   │   ├── TrainingScreen.tsx
│   │   ├── LessonScreen.tsx
│   │   ├── AssessmentScreen.tsx
│   │   └── ProgressScreen.tsx
│   ├── voice-flows/
│   │   ├── training-flow.ts
│   │   ├── guidance-flow.ts
│   │   └── question-flow.ts
│   └── index.ts
│
├── audit/                         # VXA flows
│   ├── screens/
│   │   ├── AuditDashboardScreen.tsx
│   │   ├── SelfAuditScreen.tsx
│   │   ├── ChecklistScreen.tsx
│   │   ├── EvidenceCaptureScreen.tsx
│   │   └── ReportScreen.tsx
│   ├── voice-flows/
│   │   ├── readiness-flow.ts
│   │   ├── checklist-flow.ts
│   │   └── evidence-flow.ts
│   └── index.ts
│
├── shared/
│   ├── hooks/
│   │   ├── useCaaS.ts
│   │   ├── useVoice.ts
│   │   └── useCompliance.ts
│   ├── components/
│   │   ├── VoiceButton.tsx
│   │   ├── VoiceInput.tsx
│   │   ├── ConversationView.tsx
│   │   └── ProgressTracker.tsx
│   ├── voice-flows/
│   │   └── common/
│   │       ├── greeting.ts
│   │       └── help.ts
│   └── index.ts
│
├── navigation/
│   └── ComplianceNavigator.tsx
│
└── index.ts                       # Public API + lazy exports
```

### 4.2 Lazy Loading

```typescript
// apps/mobile/gtcx/modules/compliance/index.ts

import { lazy, Suspense } from 'react';

const Operations = lazy(() => import('./operations'));
const Audit = lazy(() => import('./audit'));

export const complianceRoutes = {
  path: 'compliance',
  children: [
    { path: 'operations', lazy: () => import('./operations/screens/DashboardScreen') },
    { path: 'operations/training/:id', lazy: () => import('./operations/screens/TrainingScreen') },
    { path: 'audit', lazy: () => import('./audit/screens/AuditDashboardScreen') },
    { path: 'audit/checklist/:id', lazy: () => import('./audit/screens/ChecklistScreen') },
  ],
};

// Preload based on user role
export function preloadComplianceModules(role: Role): void {
  if (role === 'inspector') import('./audit');
  else import('./operations');
}
```

## 5. Performance Specifications

### 5.1 Targets

| Metric                            | Target |
| --------------------------------- | ------ |
| App bundle (excl. content/models) | <50MB  |
| Initial app load                  | <3s    |
| Module lazy load                  | <1s    |
| Voice recognition (online)        | <500ms |
| Voice recognition (offline)       | <2s    |
| TTS synthesis                     | <300ms |
| Offline startup                   | <2s    |
| Memory (voice active)             | <200MB |

### 5.2 Bundle Budget

| Component             | Budget    |
| --------------------- | --------- |
| Core app shell        | 15MB      |
| Compliance module     | 5MB       |
| CaaS package (logic)  | 50KB      |
| Voice package (logic) | 30KB      |
| Dependencies          | 30MB      |
| **Total**             | **<50MB** |

### 5.3 Download Sizes (On-Demand)

| Asset                    | Size    |
| ------------------------ | ------- |
| STT model (per language) | 75MB    |
| TTS model (per language) | 50MB    |
| Intent model             | 20MB    |
| Curriculum (per course)  | 10-50MB |

## 6. Implementation Plan

| Phase | Scope                                   | Duration |
| ----- | --------------------------------------- | -------- |
| **1** | CaaS engine (add audit, content-loader) | 1 week   |
| **2** | Voice package (manager, engines)        | 1 week   |
| **3** | Compliance module scaffold              | 2 days   |
| **4** | Operations (VIA) screens + voice flows  | 2 weeks  |
| **5** | Audit (VXA) screens + voice flows       | 2 weeks  |
| **6** | AI agents integration                   | 1 week   |

**Total: 7 weeks**

### Milestones

| Milestone          | Date      | Deliverable    |
| ------------------ | --------- | -------------- |
| M1: CaaS Ready     | Week 1    | Expanded CaaS  |
| M2: Voice Ready    | Week 2    | Voice package  |
| M3: Operations MVP | Week 4    | VIA with voice |
| M4: Audit MVP      | Week 6    | VXA with voice |
| **Mining Indaba**  | **Feb 9** | Demo-ready     |

## 7. Risks and Mitigations

| Risk                              | Mitigation                                 |
| --------------------------------- | ------------------------------------------ |
| Voice accuracy varies by dialect  | Fine-tune on regional data; cloud fallback |
| Content localization delays       | Prioritize Ghana languages; AI translation |
| Storage limits on low-end devices | Smart cache eviction; min spec             |
| Latency on 2G                     | Offline-first; async upload                |

## Negative Scope

This document does **not** cover:

- **CaaS content and curriculum design** (lesson authoring, assessment creation, learning paths): See the companion CaaS specification documents when available
- **VIA/VXA API security details** (endpoints, authentication, evidence encryption): See [VIA/VXA — API & Security](via-vxa-api-security.md)
- **Implementation operations and go-to-market** (deployment pathways, economic model, success metrics): See [Deployment + Agentic AI](deployment-+-agentic-ai.md)

## 8. Related Documents

- ADR-0020-caas-specification.md (document not yet available) — Full CaaS types and interfaces
- ADR-0020-voice-specification.md (document not yet available) — Full voice package specification
- ADR-0020-module-specification.md (document not yet available) — Full module implementation details

_Mining Indaba: February 9-12, 2026 — 19 days remaining_
