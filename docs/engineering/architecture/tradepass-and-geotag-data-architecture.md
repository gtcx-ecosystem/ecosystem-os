---
title: 'TradePass and GeoTag Data Architecture'
status: 'current'
date: '2026-05-26'
---

# TradePass and GeoTag Data Architecture

## Purpose

Define the core data model for identity (TradePass) and location verification (GeoTag).

## Core Entities

- **Person**: identity subject (producer, agent, regulator)
- **Credential**: signed identity or role claim
- **Device**: registered capture device
- **GeoEvent**: signed location event with timestamp
- **Proof**: hash‑chained evidence output

## Key Relationships

- Person → Credential (1:N)
- Device → GeoEvent (1:N)
- GeoEvent → Proof (1:1)
- Credential ↔ Proof (N:N via attestations)

## Data Flow

1. Device captures a GeoEvent
2. Event is signed and validated
3. Proof is appended to the audit chain
4. Credentials are linked to proofs for verification

## Design Goals

- Tamper‑evident events
- Privacy‑preserving identity linkage
- Offline‑first capture with eventual sync
