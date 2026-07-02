---
title: 'Agentic Geotag Verification And Agents Layers 1 2'
status: 'current'
date: '2026-05-22'
owner: 'product-lead'
role: 'product-lead'
tier: operating
tags: ['product', 'feature']
review_cycle: 'monthly'
---

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Product Lead

# Agentic GeoTag Verification and Agents Layers 1-2

## Executive Summary

> **Status:** Current

## Part 2: GeoTag — Autonomous Verification Network

### Core Concept

GeoTag becomes a multi-layered verification system where AI agents at different levels work together to establish truth about physical events (location, activity, quantity, quality).

### Verification Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 GEOTAG VERIFICATION LAYERS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LAYER 1: DEVICE CAPTURE                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  📱 Phone sensors → 📍 GPS + 📸 Camera + ⏰ Clock        │    │
│  │  🤖 Local AI validates consistency before capture        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  LAYER 2: EDGE VERIFICATION                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  👁️ Vision model analyzes photo content                  │    │
│  │  🧮 Consistency checks (GPS vs photo metadata)           │    │
│  │  ✍️ Cryptographic proof generated locally                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  LAYER 3: CROSS-REFERENCE (when connected)                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🛰️ Satellite imagery comparison                         │    │
│  │  👥 Peer verification (nearby producers)                 │    │
│  │  📊 Pattern analysis (historical consistency)            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  LAYER 4: NATIONAL NODE VALIDATION                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🏛️ Regulatory boundary check                            │    │
│  │  📋 License/permit validation                            │    │
│  │  🔐 Final proof anchoring + government audit log         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Model

```typescript
// GeoTag Capture
interface GeoTagCapture {
  // Unique identification
  id: string; // UUID
  tradePassId: string; // Link to producer

  // Temporal
  captureTimestamp: timestamp; // Device clock
  ntpOffset?: number; // Offset from network time if available

  // Spatial
  location: {
    latitude: number;
    longitude: number;
    altitude?: number;
    accuracy: number; // GPS accuracy in meters
    source: 'gps' | 'network' | 'fused';
    satellites?: number; // Number of GPS satellites
    hdop?: number; // Horizontal dilution of precision
  };

  // Visual evidence
  photos: {
    primary: PhotoCapture;
    supporting?: PhotoCapture[];
  };

  // Activity context
  activity: {
    type: ActivityType; // 'extraction' | 'processing' | 'transport' | 'storage'
    subtype?: string;
    quantity?: QuantityEstimate;
    notes?: string;
  };

  // Device attestation
  deviceAttestation: {
    deviceId: string;
    deviceFingerprint: string;
    sensorIntegrity: SensorIntegrityReport;
    appVersion: string;
    osVersion: string;
  };

  // Verification state
  verification: {
    localScore: number; // 0-100 confidence from edge
    crossReferenceScore?: number; // After Layer 3
    finalScore?: number; // After Layer 4
    flags: VerificationFlag[];
    humanReviewRequired: boolean;
  };

  // Cryptographic proof
  proof: {
    contentHash: string; // SHA-256 of all content
    signature: string; // Signed by device key
    witnessSignatures?: string[]; // If peer-witnessed
    anchorTimestamp?: timestamp; // When anchored to national node
    anchorProof?: string; // Merkle proof to anchor
  };
}

// Photo capture with embedded verification
interface PhotoCapture {
  imageHash: string; // Perceptual hash for similarity
  contentHash: string; // Cryptographic hash of bytes
  encryptedImage: EncryptedBlob; // Encrypted for privacy
  metadata: {
    resolution: [number, number];
    format: string;
    exifHash: string;
    captureConditions: {
      lighting: 'day' | 'night' | 'indoor';
      weather?: string;
    };
  };
  aiAnalysis: {
    sceneClassification: string[];
    objectsDetected: DetectedObject[];
    textExtracted?: string;
    qualityScore: number;
    manipulationScore: number; // Likelihood of tampering
  };
}
```

### Verification Agents

#### Layer 1: Capture Validation Agent (On-Device)

```typescript
class CaptureValidationAgent {
  private sensorMonitor: SensorIntegrityMonitor;
  private gpsValidator: GPSValidator;
  private photoValidator: PhotoValidator;

  async validateBeforeCapture(): Promise\<CaptureReadiness\> {
    const checks = await Promise.all([
      this.checkSensorIntegrity(),
      this.checkGPSQuality(),
      this.checkCameraReady(),
      this.checkStorageAvailable(),
      this.checkBatteryLevel(),
    ]);

    return {
      ready: checks.every((c) => c.passed),
      issues: checks.filter((c) => !c.passed),
      recommendations: this.generateRecommendations(checks),
    };
  }

  async validateDuringCapture(stream: CaptureStream): Promise\<RealTimeFeedback\> {
    // Real-time guidance during photo capture
    return {
      framing: await this.assessFraming(stream.currentFrame),
      lighting: await this.assessLighting(stream.currentFrame),
      stability: await this.assessStability(stream.motionData),
      gpsLock: await this.assessGPSQuality(stream.location),
      suggestions: await this.generateSuggestions(stream),
    };
  }

  async validateAfterCapture(capture: RawCapture): Promise\<CaptureValidation\> {
    const photoAnalysis = await this.analyzePhoto(capture.photo);
    const locationAnalysis = await this.analyzeLocation(capture.location);
    const consistencyCheck = await this.checkConsistency(photoAnalysis, locationAnalysis);

    return {
      valid: consistencyCheck.score > 0.7,
      score: consistencyCheck.score,
      issues: consistencyCheck.issues,
      canProceed: consistencyCheck.score > 0.5,
      recommendations: consistencyCheck.recommendations,
    };
  }

  private async checkConsistency(
    photo: PhotoAnalysis,
    location: LocationAnalysis
  ): Promise\<ConsistencyResult\> {
    // Check if photo content matches claimed location
    const checks = [
      this.checkLightingVsTime(photo.lighting, location.localTime),
      this.checkTerrainVsExpected(photo.terrain, location.expectedTerrain),
      this.checkWeatherVsCurrent(photo.weather, location.weatherData),
      this.checkScaleVsAltitude(photo.scale, location.altitude),
    ];

    return this.aggregateChecks(checks);
  }
}
```

**User Experience During Capture:**

```
┌─────────────────────────────────────────────────────────────┐
│                    GEOTAG CAPTURE MODE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │              [CAMERA VIEWFINDER]                        │ │
│  │                                                         │ │
│  │    ┌─────────────────────────────────┐                 │ │
│  │    │  ✓ GPS: Locked (3m accuracy)    │                 │ │
│  │    │  ✓ Lighting: Good               │                 │ │
│  │    │  ⚠ Framing: Move back slightly  │                 │ │
│  │    └─────────────────────────────────┘                 │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Agent (voice): "Good GPS signal. Step back two meters      │
│                  to capture more of the work area."         │
│                                                              │
│  [User adjusts position]                                     │
│                                                              │
│  Agent: "Perfect. Hold steady... Captured! I can see        │
│          the mining activity clearly. Adding this to        │
│          your verification history."                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Layer 2: Edge Analysis Agent (On-Device)

```typescript
class EdgeAnalysisAgent {
  private visionModel: LocalVisionModel;
  private consistencyEngine: ConsistencyEngine;

  async analyzeCapture(capture: GeoTagCapture): Promise\<EdgeAnalysis\> {
    // Run vision model on photo
    const visionResults = await this.visionModel.analyze(capture.photos.primary);

    return {
      sceneUnderstanding: {
        primaryActivity: visionResults.activityClassification,
        confidence: visionResults.confidence,
        objects: visionResults.detectedObjects,
        people: visionResults.peopleCount,
        equipment: visionResults.equipmentDetected,
      },

      qualityAssessment: {
        imageQuality: visionResults.qualityScore,
        informationDensity: visionResults.informationScore,
        verifiability: visionResults.verifiabilityScore,
      },

      anomalyDetection: {
        manipulationIndicators: await this.detectManipulation(capture),
        inconsistencies: await this.findInconsistencies(capture, visionResults),
        flags: await this.generateFlags(capture, visionResults),
      },

      extractedData: {
        text: visionResults.extractedText,
        quantities: await this.estimateQuantities(visionResults),
        timestamps: await this.extractTimestamps(visionResults),
      },
    };
  }

  private async detectManipulation(capture: GeoTagCapture): Promise\<ManipulationCheck\> {
    // Check for signs of photo manipulation
    const checks = [
      this.checkExifConsistency(capture.photos.primary),
      this.checkCompressionArtifacts(capture.photos.primary),
      this.checkLightingConsistency(capture.photos.primary),
      this.checkPerspectiveConsistency(capture.photos.primary),
      this.checkMetadataTimeline(capture),
    ];

    return {
      score: this.aggregateManipulationScore(checks),
      indicators: checks.filter((c) => c.suspicious),
      confidence: this.calculateConfidence(checks),
    };
  }
}
```

## Negative Scope

This document does **not** cover:

- **Cross-reference or national node validation (Layers 3-4):** Satellite imagery verification, peer corroboration, regulatory boundary checks, and audit log anchoring are documented in [Agentic GeoTag Agents Layers 3-4, Anti-Fraud, and Integration](agentic-geotag-agents-layers-3-4-anti-fraud-and-integration.md).
- **TradePass identity architecture or Personal Economic Agent design:** Identity building, compliance navigation, and market advocacy agents are covered in [Agentic TradePass Personal Economic Agent](agentic-tradepass-pea.md).
- **Sovereign infrastructure or hardware deployment:** National node specs, edge compute, and self-hosted model serving are detailed in [Agentic Sovereign Infrastructure](agentic-sovereign-infrastructure.md) and [Agentic Device Economy](agentic-device-economy.md).

---

## Related Documents

- [Agentic Verification Thesis](agentic-verification-thesis.md)
- [Agentic Sovereign Infrastructure](agentic-sovereign-infrastructure.md)
- [Agentic TradePass Personal Economic Agent](agentic-tradepass-pea.md)
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
