---
title: 'Agentic Sovereign Infrastructure'
status: current
date: 2026-05-22
owner: product-lead
tier: operating
tags: [['product', 'feature']]
review_cycle: monthly
document_type: protocol
role: product-lead
---

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Product Lead

# Agentic Sovereign Infrastructure

## Executive Summary

> **Status:** Current

## The Strategic Case for Self-Hosted

| Dependency Model                   | Risk Profile                     | Cost Structure              | Sovereignty Alignment      |
| ---------------------------------- | -------------------------------- | --------------------------- | -------------------------- |
| Full cloud (OpenAI/Anthropic APIs) | High - API changes, pricing, ToS | Variable, scales with usage | Low - US jurisdiction      |
| Hybrid (cloud + edge)              | Medium - some dependencies       | Optimized for workload type | Medium                     |
| Self-hosted sovereign              | Low - full control               | High upfront, low marginal  | High - jurisdiction choice |

**The GTCX Imperative:** If you're telling African governments "this infrastructure enhances your sovereignty," you need to be able to deploy it on infrastructure they control.

## Architecture: Three-Tier Sovereign Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    TIER 1: EDGE DEVICES                          │
│         (Phones, tablets, field hardware)                        │
│    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│    │ Tiny Models │  │ Local Cache │  │ Offline     │            │
│    │ (< 1B)      │  │ & Sync      │  │ Verification│            │
│    └─────────────┘  └─────────────┘  └─────────────┘            │
├─────────────────────────────────────────────────────────────────┤
│                    TIER 2: NATIONAL NODES                        │
│              (In-country data centers)                           │
│    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│    │ Mid-size    │  │ Compliance  │  │ National    │            │
│    │ Models (7-70B)│ │ Engines     │  │ Data Store  │            │
│    └─────────────┘  └─────────────┘  └─────────────┘            │
├─────────────────────────────────────────────────────────────────┤
│                    TIER 3: PROTOCOL CORE                         │
│           (Swiss/neutral jurisdiction)                           │
│    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│    │ Large Models│  │ Consensus   │  │ Global      │            │
│    │ (70B+)      │  │ Orchestration│ │ Coordination│            │
│    └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## Tier 1: Edge Deployment (Field Operations)

### Hardware Options

**Option A: Hardened Smartphones**

- Samsung Galaxy XCover / CAT phones
- Running on-device models via llama.cpp or MLC-LLM
- Cost: $300-500 per device

**Option B: Dedicated Edge Devices**

- NVIDIA Jetson Orin Nano ($499) - runs 7B models
- Orange Pi 5 with NPU ($150) - runs 3B models
- Raspberry Pi 5 + Hailo-8 ($200) - optimized inference

**Option C: Rugged Tablets with AI Chips**

- Samsung Galaxy Tab Active series
- Apple iPad with M-series (if iOS acceptable)
- Cost: $600-1,000 per device

### Edge Model Strategy

| Task                 | Model Size | Example Models           | Hardware Requirement    |
| -------------------- | ---------- | ------------------------ | ----------------------- |
| Voice transcription  | <1B        | Whisper tiny/base        | Any smartphone          |
| Basic classification | <1B        | DistilBERT, TinyLlama    | Any smartphone          |
| Image verification   | 1-3B       | MobileViT, YOLO          | Mid-range phone         |
| Local reasoning      | 3-7B       | Phi-3, Llama 3.2         | High-end phone / Jetson |
| Complex assistance   | 7-13B      | Mistral 7B, Llama 3.1 8B | Jetson Orin / laptop    |

### Offline-First Architecture

```python
# Conceptual edge agent architecture
class EdgeVerificationAgent:
    def __init__(self):
        self.local_model = load_quantized_model("phi-3-mini-4k-q4")
        self.verification_cache = LocalCache()
        self.sync_queue = OfflineQueue()

    def capture_geotag(self, gps, photo, metadata):
        # All processing happens locally
        location_valid = self.verify_location(gps)
        image_analysis = self.analyze_image(photo)

        # Create cryptographic proof locally
        proof = self.generate_proof(gps, photo, metadata)

        # Queue for sync when connectivity available
        self.sync_queue.add(proof)

        # Immediate feedback to user
        return self.local_model.generate_guidance(proof)
```

## Tier 2: National Node Infrastructure

This is where the sovereignty proposition becomes tangible. Each participating country hosts its own GTCX node.

### Hardware Configuration per National Node

**Minimum Viable Node (5,000 producers):**

| Component          | Specification              | Cost         |
| ------------------ | -------------------------- | ------------ |
| Compute Server     | 2x NVIDIA L40S (48GB each) | $25,000      |
| CPU Server         | AMD EPYC 9454 (48 cores)   | $15,000      |
| Storage            | 50TB NVMe array            | $10,000      |
| Networking         | 10GbE + redundancy         | $5,000       |
| UPS + Cooling      | Enterprise grade           | $10,000      |
| **Total Hardware** |                            | **~$65,000** |

**Production Node (50,000 producers):**

| Component          | Specification         | Cost          |
| ------------------ | --------------------- | ------------- |
| GPU Cluster        | 8x NVIDIA H100 (80GB) | $280,000      |
| CPU Servers        | 4x AMD EPYC nodes     | $60,000       |
| Storage            | 200TB NVMe + archive  | $40,000       |
| Networking         | 100GbE fabric         | $20,000       |
| Infrastructure     | Rack, power, cooling  | $30,000       |
| **Total Hardware** |                       | **~$430,000** |

### Model Deployment Strategy

**Self-Hosted Open Models (No API Dependencies):**

| Use Case               | Model             | Parameters | VRAM Required    |
| ---------------------- | ----------------- | ---------- | ---------------- |
| General reasoning      | Llama 3.1 70B     | 70B        | 40GB (quantized) |
| Code/structured output | DeepSeek Coder V2 | 236B MoE   | 80GB             |
| Multilingual           | Qwen2.5 72B       | 72B        | 45GB             |
| Vision/document        | LLaVA-NeXT 72B    | 72B        | 50GB             |
| Embeddings             | BGE-M3            | 568M       | 2GB              |
| Reranking              | BGE-Reranker      | 560M       | 2GB              |

**Inference Stack:**

- **vLLM** or **TensorRT-LLM** for high-throughput inference
- **Triton Inference Server** for model orchestration
- **Ray** for distributed agent coordination

### National Node Software Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 NATIONAL NODE: GHANA                     │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐    │
│  │           AGENT ORCHESTRATION LAYER              │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐  │    │
│  │  │ VIA     │ │ GCI     │ │ Vault   │ │ PvP   │  │    │
│  │  │ Agents  │ │ Agents  │ │ Agents  │ │ Agents│  │    │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └───┬───┘  │    │
│  └───────┼──────────┼──────────┼────────────┼──────┘    │
│          │          │          │            │           │
│  ┌───────┴──────────┴──────────┴────────────┴──────┐    │
│  │              MODEL SERVING LAYER                 │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │    │
│  │  │ Llama 70B│ │ Qwen 72B │ │ Vision Models    │ │    │
│  │  │ (General)│ │ (Multi-  │ │ (Document/Image) │ │    │
│  │  │          │ │ lingual) │ │                  │ │    │
│  │  └──────────┘ └──────────┘ └──────────────────┘ │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │              DATA SOVEREIGNTY LAYER               │    │
│  │  • All producer data stays in-country            │    │
│  │  • Cryptographic proofs shared externally        │    │
│  │  • Government audit access built-in              │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Tier 3: Protocol Core (Neutral Jurisdiction)

### Location Options

| Jurisdiction | Advantages                          | Considerations   |
| ------------ | ----------------------------------- | ---------------- |
| Switzerland  | Neutrality, privacy laws, stability | Cost, complexity |
| Iceland      | Green energy, data protection       | Distance         |
| Singapore    | Tech hub, connectivity              | Asia focus       |
| Portugal     | EU access, cost-effective           | Your presence    |

### Core Infrastructure

**Protocol Coordination Node:**

| Component   | Specification           | Purpose                         |
| ----------- | ----------------------- | ------------------------------- |
| GPU Cluster | 16x H100                | Large model inference, training |
| CPU Cluster | 8x high-core nodes      | Agent orchestration             |
| Storage     | 500TB+                  | Global verification archive     |
| Network     | Multi-region redundancy | 99.99% uptime                   |

**Estimated Cost:** $800K-1.2M hardware + $150K/year operations

### What Runs at Protocol Core

1. **PANX Oracle Consensus** - Multi-agent truth discovery
2. **Cross-Border Settlement Coordination** - AGX marketplace
3. **Model Fine-Tuning Pipeline** - Continuous improvement
4. **Global Agent Registry** - Identity and capability verification
5. **Governance Execution** - DAO-like decision implementation

## The Software Stack

### Agent Framework Options

| Framework                | Strengths                         | Considerations           |
| ------------------------ | --------------------------------- | ------------------------ |
| **LangGraph**            | Production-ready, stateful agents | Anthropic/OpenAI focused |
| **AutoGen**              | Multi-agent orchestration         | Microsoft ecosystem      |
| **CrewAI**               | Role-based agents                 | Simpler use cases        |
| **Custom (recommended)** | Full control, sovereignty         | Development investment   |

### Recommended Custom Stack

```
┌─────────────────────────────────────────────────────────┐
│                    GTCX AGENT RUNTIME                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ORCHESTRATION:     Temporal.io (workflow engine)        │
│  MESSAGE BUS:       NATS JetStream (edge-friendly)       │
│  MODEL SERVING:     vLLM + Triton                        │
│  VECTOR STORE:      Qdrant (self-hosted)                 │
│  DATABASE:          PostgreSQL + pgvector                │
│  CACHE:             Redis Cluster                        │
│  OBSERVABILITY:     Prometheus + Grafana + Jaeger        │
│  SECRETS:           HashiCorp Vault                      │
│                                                          │
│  CUSTOM LAYERS:                                          │
│  ├── Agent Definition Language (ADL)                     │
│  ├── Proof Generation Engine                             │
│  ├── Sovereign Data Boundary Enforcement                 │
│  └── Multi-Jurisdiction Compliance Router                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Key Open Source Components

```yaml
# Core Infrastructure
inference:
  - vllm: High-throughput LLM serving
  - triton: Multi-model orchestration
  - llama.cpp: Edge deployment

models:
  - llama-3.1-70b: General reasoning
  - qwen2.5-72b: Multilingual support
  - mistral-7b: Efficient mid-tier
  - phi-3: Edge deployment
  - whisper: Voice transcription
  - llava: Vision understanding

data:
  - postgresql: Primary database
  - qdrant: Vector search
  - minio: Object storage (S3-compatible)

orchestration:
  - temporal: Workflow engine
  - nats: Messaging
  - ray: Distributed compute

security:
  - vault: Secrets management
  - keycloak: Identity
  - open-policy-agent: Authorization
```

## Deployment Roadmap

### Phase 1: Proof of Concept (3 months, ~$50K)

**Objective:** Validate agentic architecture with minimal investment

**Infrastructure:**

- 2x NVIDIA RTX 4090 workstations ($5K each)
- Cloud backup for burst capacity ($2K/month)
- Development environment

**Deliverables:**

- Working VIA agent prototype
- Edge deployment on 10 test devices
- Basic GCI scoring agent
- Integration with existing GTCX backend

### Phase 2: Ghana Pilot Infrastructure (6 months, ~$150K)

**Objective:** Production-ready national node for March 2026 pilot

**Infrastructure:**

- Minimum Viable Node in Accra ($65K hardware)
- Colocation + connectivity ($2K/month)
- 100 edge devices for field teams ($40K)
- Redundancy + monitoring

**Deliverables:**

- Full VIA/GCI/GeoTag agent stack
- Offline-capable edge deployment
- Government audit dashboard
- 5,000 producer onboarding capacity

### Phase 3: Multi-Country Expansion (12 months, ~$500K)

**Objective:** Sovereign nodes in 3-5 countries

**Infrastructure:**

- Production nodes in Ghana, Kenya, Rwanda ($150K each)
- Protocol core in Switzerland ($200K)
- Edge device scaling (1,000+ devices)

**Deliverables:**

- Cross-border agent coordination
- PANX Oracle live
- AGX marketplace agents
- 50,000 producer capacity

### Phase 4: Scale Infrastructure (24 months, ~$2M)

**Objective:** Continental-scale sovereign AI network

**Infrastructure:**

- 10+ national nodes
- Redundant protocol cores
- Edge deployment at scale

**Deliverables:**

- 500,000+ producer capacity
- Full agentic protocol stack
- Self-sustaining economics

## Cost Comparison: Build vs. API

### 5,000 Producers (Year 1)

| Approach                    | Infrastructure | API/Compute | Operations | Total |
| --------------------------- | -------------- | ----------- | ---------- | ----- |
| Pure API (OpenAI/Anthropic) | $10K           | $180K       | $50K       | $240K |
| Hybrid (API + Edge)         | $50K           | $80K        | $60K       | $190K |
| Self-Hosted                 | $150K          | $0          | $80K       | $230K |

### 50,000 Producers (Year 2)

| Approach    | Infrastructure | API/Compute | Operations | Total  |
| ----------- | -------------- | ----------- | ---------- | ------ |
| Pure API    | $20K           | $1.8M       | $100K      | $1.92M |
| Hybrid      | $200K          | $400K       | $150K      | $750K  |
| Self-Hosted | $500K          | $0          | $200K      | $700K  |

### 500,000 Producers (Year 3)

| Approach    | Infrastructure | API/Compute | Operations | Total   |
| ----------- | -------------- | ----------- | ---------- | ------- |
| Pure API    | $50K           | $18M        | $300K      | $18.35M |
| Hybrid      | $1M            | $2M         | $500K      | $3.5M   |
| Self-Hosted | $2M            | $0          | $800K      | $2.8M   |

**Crossover Point:** Self-hosted becomes cost-effective at ~20,000 producers, and dramatically advantageous at scale.

## Technical Considerations

### Model Selection Criteria

1. **License:** Must allow commercial use (Apache 2.0, Llama license)
2. **Multilingual:** Strong performance in African languages
3. **Efficiency:** Reasonable hardware requirements
4. **Fine-tuning:** Ability to specialize for GTCX domain
5. **Alignment:** Safety properties suitable for economic infrastructure

### Current Best Options

| Tier   | Model         | License      | Notes                    |
| ------ | ------------- | ------------ | ------------------------ |
| Large  | Llama 3.1 70B | Meta License | Best general performance |
| Large  | Qwen2.5 72B   | Apache 2.0   | Excellent multilingual   |
| Medium | Mistral 7B    | Apache 2.0   | Great efficiency         |
| Medium | DeepSeek V2.5 | MIT          | Strong reasoning         |
| Small  | Phi-3 Mini    | MIT          | Edge deployment          |
| Small  | Llama 3.2 3B  | Meta License | Mobile-ready             |

### Fine-Tuning Strategy

**Domain Adaptation:**

- Compliance reasoning (OECD, LBMA, national regulations)
- Commodity verification logic
- Multi-party negotiation patterns
- African language enhancement

**Method:**

- LoRA/QLoRA for efficient fine-tuning
- Synthetic data generation for edge cases
- Continuous learning from production data (with privacy preservation)

## Sovereignty Enforcement Architecture

```
┌─────────────────────────────────────────────────────────┐
│              DATA SOVEREIGNTY BOUNDARIES                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  NATIONAL BOUNDARY (e.g., Ghana)                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │  • All PII stays within boundary                   │ │
│  │  • Raw verification data stays within boundary     │ │
│  │  • Model inference happens within boundary         │ │
│  │  • Government has full audit access                │ │
│  └────────────────────────────────────────────────────┘ │
│                         │                                │
│                         ▼                                │
│  WHAT CROSSES BOUNDARIES (cryptographic proofs only):    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  • Hash of verification data                       │ │
│  │  • Compliance scores (not underlying data)         │ │
│  │  • Settlement confirmations                        │ │
│  │  • Aggregated (anonymized) statistics              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Immediate Next Steps

## Negative Scope

This document does **not** cover:

- **Protocol conceptual design or agent architectures:** The agentic reimagining of TradePass, GeoTag, GCI, and other protocols is documented in [Agentic Stack Conceptual Overview](agentic-stack-conceptual-overview.md) and [Agentic Verification Thesis](agentic-verification-thesis.md).
- **Gold procurement or family office business model:** Brokerage strategy, deal structuring, and buyer acquisition are detailed in [Agentic Gold Procurement Platform](agentic-gold-procurement-platform.md) and [Agentic Gold Procurement Strategy](agentic-gold-procurement-strategy.md).
- **MTN partnership or mobile services integration:** Super-app service stack, MoMo integration, and device customization are covered in [Agentic MTN Partnership and Services](agentic-mtn-partnership-and-services.md) and [Agentic Mobile Money and Pilots](agentic-mobile-money-and-pilots.md).

---

## Related Documents

- [Agentic Verification Thesis](agentic-verification-thesis.md)
- [Agentic TradePass Personal Economic Agent](agentic-tradepass-pea.md)
- [Agentic GeoTag Verification and Agents Layers 1-2](agentic-geotag-verification-and-agents-layers-1-2.md)
- [Agentic GeoTag Agents Layers 3-4, Anti-Fraud, and Integration](agentic-geotag-agents-layers-3-4-anti-fraud-and-integration.md)
- [Agentic Device Economy](agentic-device-economy.md)
- [Agentic Mobile Money and Pilots](agentic-mobile-money-and-pilots.md)
- [Agentic MTN Partnership and Services](agentic-mtn-partnership-and-services.md)
- [Agentic MTN Operations and Revenue](agentic-mtn-operations-and-revenue.md)
- [Agentic AI Protocol and Operations](agentic-ai-protocol-and-operations.md)
- [Agentic AI Exchange, Implementation, and SGX](agentic-ai-exchange-implementation-and-sgx.md)
- [Agentic SGX Governance and Deck Creation](agentic-sgx-governance-and-deck-creation.md)
- [Agentic Deck Refinement and Protocol Explanations](agentic-deck-refinement-and-protocol-explanations.md)
- [Agentic Protocol Insights](agentic-protocol-insights.md)
