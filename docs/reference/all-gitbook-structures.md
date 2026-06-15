---
title: 'GTCX GitBook Structures — Complete Reference'
status: current
date: 2026-05-27
owner: gtcx-docs
tier: operating
tags: [['documentation', 'reference']]
review_cycle: on-change
document_type: protocol
role: protocol-architect
agent_id: agent://canon-os/2026-05-27/session-backfill
trust_score: 60
autonomy_level: permissioned
---

# GTCX GitBook Structures — Complete Reference

## Status

Legacy reference. This file captures historical GitBook structures and may not match the current clean‑state docs.

## Purpose

Preserve legacy navigation structures for archival comparison during migration.

## 1. PROTOCOL (Public) GitBook

**URL:** gtcx-ecosystem.gitbook.io/gtcx-open-source

### Top-Level Tabs

- Overview
- Protocols
- Platforms
- Technical Spec
- Research
- Developers
- About

### Full Structure

```
## Overview

* Welcome to GTCX
* The Problem
  * $400B Trapped Value
  * Why Existing Solutions Fail
  * The Verification Gap
* The Solution
  * Proof-Based Market Access
  * From Permission to Proof
  * Three-Tier Architecture
* Ubuntu Economics
  * Philosophy
  * How It Works
  * Network Effects
* GTCX 101
  * Core Concepts
  * Key Terminology
  * How to Navigate
* Quick Start
  * For Developers
  * For Governments
  * For Partners
  * For AI Agents

## Protocols

* Overview
  * The Six Core Protocols
  * How Protocols Work Together
  * Protocol vs Platform vs Application
* TradePass™ — Identity
  * Specification
  * Identity Core
  * Credential Issuance
  * Authentication
  * Operator Taxonomy
* GeoTag™ — Provenance
  * Specification
  * Capture Methods
  * Tamper Detection
* GCI™ — Compliance
  * Specification
  * Scoring Methodology
  * 12 Control Domains
  * Continuous Improvement
* VaultMark™ — Custody
  * Specification
  * Chain of Custody
  * Tamper-Evident Sealing
* PvP — Settlement
  * Specification
  * Payment-vs-Physical
  * Escrow Mechanisms
* PANX Oracle™ — Consensus
  * Specification
  * Multi-Source Price Feeds
  * Dispute Resolution

## Platforms

* Overview
  * Three-Tier Architecture
  * Revenue Model
* Exchange Layer
  * SGX — Sovereign Gold Exchange
    * Government Integration
    * Regulatory Workflows
    * API Reference
  * AGX — Artisanal Gold Exchange
    * Producer Onboarding
    * Settlement Flows
    * Mobile Integration
  * CRX — Commodity Reference Exchange
    * Price Discovery
    * Cross-Border Trading
    * Compliance Gateway
  * Pathways — ASM Financing
    * Financing Models
    * Risk Assessment
    * Disbursement & Repayment
* Operations Layer
  * Veritas — Verification Services
  * CaaS — Compliance-as-a-Service
  * Field Operations
    * TapKit — Hardware
    * TradeCV — Documentation
    * VaultKit — Custody
    * WorkProof — Verification
* Integration Patterns
  * Government Systems
  * Banking & Mobile Money
  * Logistics Partners
  * ERP Integration

## Technical Spec

* Overview
  * About This Specification
  * Table of Contents
  * How to Read This Document
  * Version History
* §1 Introduction and Scope
  * 1.1 Purpose
  * 1.2 Scope
  * 1.3 Definitions
  * 1.4 Why Cryptographic Infrastructure
* §2 System Architecture
  * 2.1 Design Principles
  * 2.2 Three-Tier Model
  * 2.3 Component Interactions
  * 2.4 Deployment Topology
* §3 TradePass™ Identity
  * 3.1 Identity Model
  * 3.2 Credential Lifecycle
  * 3.3 Authentication
  * 3.4 Authorization
* §4 GCI™ Compliance
  * 4.1 Scoring Framework
  * 4.2 Control Domains
  * 4.3 Evidence Collection
  * 4.4 Score Computation
* §5 GeoTag™ & VaultMark™
  * 5.1 Location Verification
  * 5.2 Custody Tracking
  * 5.3 Tamper Detection
  * 5.4 Chain of Custody
* §6 PvP Settlement
  * 6.1 Settlement Model
  * 6.2 Escrow Mechanism
  * 6.3 Dispute Resolution
  * 6.4 Multi-Currency Support
* §7 Data Models and Schemas
  * 7.1 Core Entities
  * 7.2 Event Schemas
  * 7.3 Credential Formats
  * 7.4 Message Formats
* §8 Security and Privacy
  * 8.1 Threat Model
  * 8.2 Cryptographic Primitives
  * 8.3 Key Management
  * 8.4 Privacy Controls
* §9 Network Protocols
  * 9.1 Communication Model
  * 9.2 Sync Protocols
  * 9.3 Consensus Mechanism
  * 9.4 PANX Oracle
* §10 Governance and Upgrades
  * 10.1 Governance Model
  * 10.2 Protocol Evolution
  * 10.3 Backward Compatibility
  * 10.4 Fork Policy
* §11 Implementation Guidelines
  * 11.1 Reference Implementation
  * 11.2 Language Bindings
  * 11.3 Performance Requirements
  * 11.4 Deployment Checklist
* §12 Testing and Validation
  * 12.1 Test Categories
  * 12.2 Compliance Testing
  * 12.3 Interoperability Testing
  * 12.4 Certification
* §13 Compliance Mappings
  * 13.1 OECD Due Diligence
  * 13.2 LBMA Responsible Gold
  * 13.3 IFC Performance Standards
  * 13.4 Regional Frameworks
* §14 Appendices
  * A: Glossary
  * B: Cryptographic Details
  * C: Wire Formats
  * D: Test Vectors
* Addenda
  * Addendum A-D: Architectural Extensions
  * Addendum E: AI-Native Framework
* Changelog

## Research

* Overview
  * Research Foundation
  * Academic Partnerships
  * Publication Pipeline
* Academic Papers
  * Ubuntu Economics
    * Abstract
    * Mathematical Framework
    * Cooperative Verification Model
    * Incentive Structures
    * Empirical Validation
  * Open Source Architecture
    * Distributed Commodity Verification
    * Consensus Mechanisms
    * Performance Analysis
    * Scalability Model
  * Cryptographic vs Blockchain
    * Why Not Blockchain
    * Government Adoption Barriers
    * Technical Comparison
    * Regulatory Implications
  * AI-Native Compliance
    * VIA™/VXA™ Framework
    * Agent Architecture
    * Training Methodology
    * Human-AI Collaboration
* Legitimacy Paper Series
  * LP1: The Legitimacy Gap
  * LP2: Proof-Based Markets
  * LP3: Sovereign Infrastructure
  * LP4: Economic Dignity
  * LP5: Beyond Gold
* Case Studies
  * West Africa Gold Template
  * East Africa Minerals Template
  * Latin America Mining Template
  * Agricultural Commodities Template
* Technical White Papers
  * Unbreakable Proof of Origin
  * Security-as-Strategy
  * Offline-First Architecture
  * Hardware Security Model
  * Multi-Jurisdictional Compliance
* Architectural Principles
  * Economic Dignity Architecture
  * Infrastructure of Trust
  * Cryptographic Infrastructure Design
* Market Analysis
  * Global ASM Market
  * Verification Services Market
  * Trade Finance Opportunity
  * Regional Market Breakdowns

## Developers

* Getting Started
  * Quick Start
  * Development Environment
  * For Human Developers
  * For AI Agents
  * Hello World Example
* 30 Engineering Principles
  * Why Principles Matter
  * 🔐 Trust (P1-P5)
    * P1: PROOF
    * P2: PRIVATE
    * P3: AUDITABLE
    * P4: IMMUTABLE
    * P5: TRANSPARENT
  * 🏛️ Sovereignty (P6-P10)
    * P6: SOVEREIGN
    * P7: OPEN
    * P8: FEDERATED
    * P9: GOVERNED
    * P10: COMPLIANT
  * ⚙️ Architecture (P11-P15)
    * P11: SECURE
    * P12: RESILIENT
    * P13: MODULAR
    * P14: DEPLOYABLE
    * P15: OBSERVABLE
  * 🌍 Frontier (P16-P20)
    * P16: UBUNTU
    * P17: OFFLINE
    * P18: LOCALIZED
    * P19: ACCESSIBLE
    * P20: HARDWARE
  * 🔄 Scale (P21-P25)
    * P21: UNIVERSAL
    * P22: PORTABLE
    * P23: INTEROPERABLE
    * P24: SCALABLE
    * P25: EXTENSIBLE
  * 🧭 Craft (P26-P30)
    * P26: RESEARCHED
    * P27: DOCUMENTED
    * P28: ADAPTIVE
    * P29: TESTED
    * P30: INTENTIONAL
* API Reference
  * OpenAPI Specification
  * Authentication
  * TradePass API
  * GeoTag API
  * GCI API
  * VaultMark API
  * PvP API
  * PANX Oracle API
  * Webhooks & Events
  * Error Codes
* SDKs & Libraries
  * TypeScript SDK
  * Python SDK
  * Go SDK
  * Rust Crates
  * Mobile SDK
* Cryptographic Reference
  * Test Vectors
  * Signature Schemes
  * Key Management
  * Spec-to-Code Map
  * Cryptographic Primitives
* Data Schemas
  * Core Data Models
  * Event Schemas
  * Credential Formats
  * Message Formats
  * JSON Schema Definitions
* Code Standards
  * Implementation Patterns
  * Red Flags (Anti-Patterns)
  * Code Review Checklist
  * Testing Requirements
* Contributing
  * How to Contribute
  * Development Workflow
  * Pull Request Process
  * Code of Conduct

## About

* Mission & Vision
  * Why GTCX Exists
  * Ubuntu Economics Philosophy
  * 2035 Strategic Outlook
  * The Team
* Legal
  * License
  * Trademarks
  * Patents
  * Security Policy
* Governance
  * Protocol Council
  * Technical Steering Committee
  * Community Participation
  * Decision-Making Process
* Contact
  * General Inquiries
  * Government Partnerships
  * Enterprise Licensing
  * Security Vulnerabilities
  * Media Inquiries
* Changelog
```

## 2. COMPLIANCEOS GitBook

**URL:** gtcx-ecosystem.gitbook.io/complianceos

### Top-Level Tabs

- Overview
- Core12
- OCP _(should be peer to Core12, not nested)_
- AI Agents
- Platform
- Enterprise
- Pricing

### Full Structure

```
## Overview

* Welcome
* What is ComplianceOS?
* The Problem
  * Compliance is Broken
  * The Burden of Proof
  * Exclusion by Complexity
* The Solution
  * Compliance-as-a-Service
  * Progressive Verification
  * AI-Powered Support
* Key Benefits
  * For Producers
  * For Buyers
  * For Auditors
  * For Governments
* Getting Started
  * For Organizations
  * For Governments
  * For Auditors
  * The Inclusion Pathway
* Quick Links

## Core12

* Overview
  * What is Core12?
  * Why 12 Domains?
  * Scoring Methodology
  * Progressive Compliance Model
* The 12 Control Domains
  * Domain 1: Legal & Regulatory Compliance
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 2: Governance & Transparency
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 3: Environmental Management
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 4: Health & Safety
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 5: Labor Rights & Community Impact
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 6: Supply Chain Integrity
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 7: Financial Transparency & Anti-Corruption
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 8: Data Protection & Privacy
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 9: Product Quality & Safety
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 10: Waste & Emissions Management
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 11: Water & Resource Management
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
  * Domain 12: Biodiversity & Land Use
    * Requirements
    * Evidence Standards
    * Scoring Criteria
    * Improvement Guidance
* Standard Mappings
  * OECD Due Diligence Guidance
  * IFC Performance Standards
  * LBMA Responsible Gold Guidance
  * ISO 14001 (Environmental)
  * ISO 45001 (Health & Safety)
  * SA8000 (Social Accountability)
  * Custom Framework Mapping

## OCP (Open Compliance Protocols)

* Overview
  * What is OCP?
  * OCP vs Core12
* Protocol Library
* Contributing New Protocols
* Governance

## AI Agents

* Overview
  * AI-Native Compliance
  * Human-AI Collaboration
  * Agent Architecture
* VIA™ — Virtual Instructor Agent
  * Overview
    * What is VIA?
    * How VIA Works
    * Key Capabilities
  * Learning Paths
    * Compliance Fundamentals
    * Domain-Specific Training
    * Certification Preparation
    * Continuous Learning
  * Language Support
    * Supported Languages
    * Localization Approach
    * Adding New Languages
  * Offline Capabilities
    * Offline Mode
    * Content Caching
    * Progress Sync
  * Integration Guide
    * API Integration
    * Embedding VIA
    * Custom Training Modules
* VXA™ — Virtual Inspection Agent
  * Overview
    * What is VXA?
    * How VXA Works
    * Key Capabilities
  * Inspection Workflows
    * Self-Assessment
    * Guided Inspection
    * Remote Verification
    * On-Site Support
  * Evidence Collection
    * Photo/Video Capture
    * Document Upload
    * Geolocation Verification
    * Digital Signatures
  * Offline Capabilities
    * Offline Inspections
    * Evidence Queuing
    * Sync & Conflict Resolution
  * Integration Guide
    * API Integration
    * Embedding VXA
    * Custom Inspection Protocols
* ANISA — Cultural Intelligence
  * Overview
  * Language & Context
  * Cultural Adaptation
  * Regional Customization
* Developer Resources
  * Agent SDK
  * Training Custom Agents
  * Evaluation Framework
  * Best Practices

## Platform

* Overview
  * Platform Architecture
  * User Roles
  * Feature Overview
* GCI™ — Global Compliance Index
  * Overview
    * What is GCI?
    * Score Interpretation
    * Score Components
  * Scoring Methodology
    * Domain Weights
    * Evidence Quality
    * Temporal Factors
    * Algorithmic Transparency
  * Verification Process
    * Self-Assessment
    * AI Verification
    * Human Review
    * Audit Support
  * Appeals Process
    * Dispute Types
    * Evidence Submission
    * Resolution Timeline
* Dashboards
  * Producer Dashboard
    * Compliance Score
    * Improvement Tasks
    * Training Progress
    * Market Access
  * Buyer Dashboard
    * Supplier Overview
    * Risk Assessment
    * Due Diligence Reports
    * Procurement Integration
  * Auditor Dashboard
    * Verification Queue
    * Evidence Review
    * Reporting Tools
    * Audit Management
  * Government Dashboard
    * Jurisdiction Overview
    * Compliance Distribution
    * Revenue Tracking
    * Policy Analytics
* Mobile Apps
  * Producer App
  * Inspector App
  * Offline Capabilities
* Integrations
  * ERP Systems
  * Supply Chain Platforms
  * Audit Management Tools
  * Government Systems

## Enterprise

* Overview
  * Enterprise Capabilities
  * Deployment Options
  * Support Tiers
* API Reference
  * Authentication
    * API Keys
    * OAuth 2.0
    * JWT Tokens
  * Core APIs
    * Identity API
    * Compliance API
    * Evidence API
    * Verification API
  * Agent APIs
    * VIA API
    * VXA API
  * Admin APIs
    * User Management
    * Configuration
    * Reporting
* Webhooks
  * Event Types
  * Payload Formats
  * Retry Policy
  * Security
* SSO Configuration
  * SAML 2.0
  * OIDC
  * Azure AD
  * Okta
  * Custom IdP
* Deployment Options
  * SaaS (Multi-Tenant)
    * Features
    * Data Residency
    * SLAs
  * Dedicated Cloud
    * Features
    * Infrastructure
    * Management
  * On-Premise
    * Requirements
    * Installation
    * Maintenance
* Reporting
  * Standard Reports
  * Custom Reports
  * Data Export
  * BI Integration
* Compliance & Security
  * SOC 2 Type II
  * ISO 27001
  * GDPR
  * Data Processing Agreement

## Pricing

* Overview
  * Pricing Philosophy
  * How Pricing Works
* Pricing Tiers
  * Individual / Micro-Producer
    * Features
    * Limits
    * Pricing
    * Get Started
  * Cooperative / SME
    * Features
    * Limits
    * Pricing
    * Get Started
  * Government / NGO
    * Features
    * Special Terms
    * Pricing Model
    * Contact Us
  * Enterprise
    * Features
    * Custom Deployment
    * Volume Pricing
    * Contact Sales
* Feature Comparison
* FAQ
  * Billing Questions
  * Plan Changes
  * Cancellation
  * Custom Needs
* Contact Sales
  * Enterprise Inquiries
  * Government Partnerships
  * Volume Licensing
```

## 3. CIVIC (Government) GitBook

**URL:** civic.gtcx.africa

### Top-Level Tabs

- Overview
- Policy Papers
- Regulator Playbook
- Sovereignty Framework
- Partners
- Support

### Full Structure

```
## Overview

* Welcome
* GTCX for Government
* The Opportunity
  * Revenue Enhancement
  * Formalization Without Enforcement
  * Sovereignty-First Technology
* Why GTCX
  * You Own The Infrastructure
  * Mathematical Proof Replaces Paperwork
  * Built With Governments, Not Around Them
* Key Outcomes
  * Increased Tax Revenue
  * Export Compliance
  * Supply Chain Visibility
  * International Market Access
* Getting Started
  * For Ministry of Mines
  * For Ministry of Finance
  * For Central Banks
  * For Environmental Agencies

## Policy Papers

* Overview
* Flagship Papers
  * PP-1: The Fallacy of Formal ESG
    * Executive Summary
    * The Compliance Paradox
    * Evidence from ASM Sector
    * Alternative Frameworks
  * PP-2: Open Source, Open Opportunity
    * Executive Summary
    * Why Governments Should Own Infrastructure
    * The Lock-In Problem
    * Sovereignty Through Open Source
  * PP-3: Training as Trade Infrastructure
    * Executive Summary
    * Capacity Building Framework
    * VIA™ Training Agent
    * Implementation Model
  * PP-4: From Suspicion to Skill
    * Executive Summary
    * Changing the Narrative
    * Progressive Formalization
    * Success Stories
* Policy Briefs
  * PB-1: Ministry of Mines Brief
  * PB-2: Ministry of Finance Brief
  * PB-3: Central Bank Brief
  * PB-4: Environmental Agency Brief
  * PB-5: Trade Ministry Brief
* Research Notes
  * Market Sizing Methodology
  * Regulatory Landscape Analysis
  * Comparative Framework Review

## Regulator Playbook

* Overview
  * What is the Regulator Playbook?
  * How to Use This Guide
  * Success Metrics Framework
* Overview Deck
  * Executive Summary
  * Problem Definition
  * Solution Architecture
  * Implementation Timeline
  * ROI Projections
* Technical White Paper
  * System Architecture
  * Integration Requirements
  * Security Model
  * Data Sovereignty Guarantees
* Implementation Timeline
  * Phase 1: Foundation (0-6 months)
    * Stakeholder Alignment
    * Infrastructure Setup
    * Pilot Design
  * Phase 2: Pilot (6-12 months)
    * Limited Deployment
    * Feedback Collection
    * Iteration
  * Phase 3: Scale (12-24 months)
    * Full Rollout
    * Integration Deepening
    * Regional Expansion
  * Phase 4: Optimization (24+ months)
    * Advanced Features
    * Cross-Border Integration
    * Continuous Improvement
* Success Metrics
  * Revenue Metrics
    * Tax Collection Rate
    * Export Value Capture
    * Royalty Compliance
  * Operational Metrics
    * Registration Rate
    * Compliance Score Distribution
    * Processing Time Reduction
  * Impact Metrics
    * Formalization Rate
    * Producer Income Change
    * Environmental Compliance
* Appendices
  * API Integration Guidelines
  * Data Sovereignty Requirements
  * Audit Templates
  * Training Materials

## Sovereignty Framework

* Overview
* Data Ownership
  * Your Data, Your Servers
  * No External Dependencies
  * Data Residency Guarantees
  * Encryption & Access Control
* Government Instances
  * Dedicated Infrastructure
  * Deployment Options
    * On-Premise
    * Sovereign Cloud
    * Hybrid
  * Administration & Control
  * Upgrade & Maintenance
* Regulatory Integration
  * Existing System Integration
  * Ministry Workflows
  * Inter-Agency Data Sharing
  * International Reporting
* Revenue Enhancement
  * Direct Revenue Capture
  * Tax Base Expansion
  * Export Value Recovery
  * Fee Structure Options
* Risk Mitigation
  * Technology Risk
  * Operational Risk
  * Political Risk
  * Continuity Planning

## Partners

* Overview
* Partnership Types
  * Government Partnership
    * Sovereign Implementation
    * Revenue Sharing Model
  * Development Partner
    * Technical Assistance
    * Capacity Building
  * Implementation Partner
    * Deployment Services
    * Training Delivery
* MOU Templates
  * Government MOU Template
  * Pilot Agreement Template
  * Data Processing Agreement
  * Technical Services Agreement
* Pilot Program Design
  * Scoping Framework
  * Stakeholder Mapping
  * Resource Requirements
  * Timeline Planning
  * Success Criteria
* Stakeholder Engagement
  * Ministry Engagement
  * Producer Associations
  * Buyer Networks
  * Civil Society
  * International Organizations
* Training & Capacity
  * Government Staff Training
  * Field Operator Certification
  * Train-the-Trainer Program
  * Ongoing Support Model

## Support

* FAQ
  * General Questions
  * Technical Questions
  * Implementation Questions
  * Cost & Licensing Questions
* Resources
  * Presentation Templates
  * Briefing Documents
  * Case Study Templates
  * Proposal Templates
* Contact
  * Government Relations
  * Technical Support
  * Partnership Inquiries
  * Regional Offices
* Links
  * → GTCX Protocol Documentation
  * → ComplianceOS Platform
  * → Technical Specifications
```

## 4. INTERNAL GitBook

**URL:** internal.gtcx.africa

### Top-Level Tabs

- Home
- PRDs
- Architecture
- Field Ops
- Runbooks
- Team

### Full Structure

```
## Home

* Welcome
* Quick Links
  * Current Sprint
  * Active PRDs
  * Deployment Status
  * On-Call Schedule
* Announcements
  * Recent Updates
  * Policy Changes
  * Team News
* Navigation Guide
  * For Engineers
  * For Field Operators
  * For Product Managers
  * For New Team Members
* External Links
  * → Public Documentation
  * → ComplianceOS Docs
  * → Civic Docs
  * → Code Repository

## PRDs

* Overview
  * PRD Template
  * PRD Process
  * Active PRDs Index
* Web Platforms
  * PRD: SGX Admin Console
    * Overview
    * User Stories
    * Functional Requirements
    * Technical Requirements
    * Success Metrics
  * PRD: CRX Dashboard
    * Overview
    * User Stories
    * Functional Requirements
    * Technical Requirements
    * Success Metrics
  * PRD: AGX Producer Portal
    * Overview
    * User Stories
    * Functional Requirements
    * Technical Requirements
    * Success Metrics
  * PRD: Compliance Portal
  * PRD: Pathways Admin
* Mobile Applications
  * PRD: GTCX Producer App
    * Overview
    * User Flows
    * Offline Requirements
    * Hardware Integration
    * Accessibility
  * PRD: TradePass Wallet
    * Overview
    * User Flows
    * Credential Management
    * Security Model
  * PRD: Inspector App
    * Overview
    * Inspection Workflows
    * Evidence Collection
    * Offline Sync
  * PRD: Vault Manager App
* AI Agents
  * PRD: VIA™ (Virtual Instructor Agent)
    * Overview
    * Training Modules
    * Language Support
    * Offline Capabilities
    * Success Metrics
  * PRD: VXA™ (Virtual Inspection Agent)
    * Overview
    * Inspection Workflows
    * Evidence Collection
    * Integration Points
* Infrastructure
  * PRD: Edge Compute Platform
  * PRD: Sync Infrastructure
  * PRD: Observability Stack

## Architecture

* Overview
  * Architecture Principles
  * System Overview
  * Technology Stack
* Spec Library
  * Data & Identity Core
    * Identity Architecture
    * Credential Store
    * Key Management
    * Sync Protocol
  * Middleware / Services
    * API Gateway
    * Event Bus
    * Job Queue
    * Cache Layer
  * Applications & UI
    * Web Application Architecture
    * Mobile Application Architecture
    * Design System
    * State Management
  * Developer Tooling
    * CLI Tools
    * Testing Framework
    * CI/CD Pipeline
    * Local Development
* ADRs
  * ADR-001: Monorepo Structure
  * ADR-002: Commodity-Agnostic Design
  * ADR-003: TypeScript Packages
  * ADR-004: Offline-First Mobile
  * ADR-005: Event Sourcing
  * ADR-006: Multi-Tenancy
  * ADR-007: Rust Foundational Layer
  * ADR Index
* Security Architecture
  * Threat Model
  * Security Controls
  * Cryptographic Architecture
  * Audit Trail Design
* Diagrams
  * System Context
  * Container Diagram
  * Component Diagrams
  * Sequence Diagrams

## Field Ops

* Overview
  * Field Operations Framework
  * Roles & Responsibilities
  * Safety Protocols
* Field Guides
  * AGX Field Deployment Guide
    * Pre-Deployment Checklist
    * Site Assessment
    * Equipment Setup
    * Producer Onboarding
    * Troubleshooting
  * GeoTag™ Capture Guide
    * Device Setup
    * Capture Procedures
    * Quality Standards
    * Error Handling
  * TradePass™ Onboarding Guide
    * Identity Verification
    * Biometric Enrollment
    * Credential Issuance
    * Training Completion
  * Vault Intake Process Manual
    * Receiving Procedures
    * Weighing & Assay
    * VaultMark Application
    * Documentation
  * SGX Inspector Playbook
    * Inspection Protocol
    * Evidence Standards
    * Reporting Requirements
    * Escalation Procedures
  * Offline Operations Handbook
    * Sync Management
    * Conflict Resolution
    * Data Integrity
    * Recovery Procedures
  * Kit Reset & Reassignment Manual
    * Device Wipe Procedures
    * Credential Revocation
    * Re-provisioning
    * Audit Trail
* Hardware
  * TapKit Reference
    * Supported Devices
    * Configuration
    * Maintenance
    * Troubleshooting
  * Scanner Integration
  * Scale Integration
  * Biometric Devices
* Operations Metrics
  * Daily Reporting
  * Weekly Reviews
  * Incident Reporting
  * Performance Tracking

## Runbooks

* Overview
  * Runbook Standards
  * On-Call Responsibilities
  * Escalation Matrix
* Incident Response
  * IR-001: Service Outage
  * IR-002: Security Incident
  * IR-003: Data Integrity Issue
  * IR-004: Performance Degradation
  * IR-005: Third-Party Failure
* Deployment
  * DP-001: Production Deployment
  * DP-002: Rollback Procedures
  * DP-003: Database Migrations
  * DP-004: Feature Flags
  * DP-005: Emergency Hotfix
* Database
  * DB-001: Backup & Recovery
  * DB-002: Schema Changes
  * DB-003: Performance Tuning
  * DB-004: Data Archival
* Security
  * SC-001: Key Rotation
  * SC-002: Certificate Renewal
  * SC-003: Access Review
  * SC-004: Vulnerability Response
* Maintenance
  * MT-001: Scheduled Maintenance
  * MT-002: Infrastructure Updates
  * MT-003: Dependency Updates
  * MT-004: Monitoring Review
* Observability
  * OB-001: Alert Triage
  * OB-002: Log Analysis
  * OB-003: Metrics Review
  * OB-004: Tracing Investigation

## Team

* Onboarding
  * First Day Checklist
  * First Week Guide
  * First Month Goals
  * Tool Setup
* Processes
  * Sprint Process
  * Code Review Guidelines
  * Release Process
  * Communication Norms
* Learning
  * Technical Resources
  * Domain Knowledge
  * Training Programs
  * Certifications
* Tools
  * Development Environment
  * Communication Tools
  * Project Management
  * Access Requests
* Directory
  * Team Structure
  * Roles & Responsibilities
  * Contact Information
  * Org Chart
```

## Summary Table

| GitBook          | URL                                        | Top-Level Tabs                                                                        | Est. Pages |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- | ---------- |
| **Protocol**     | gtcx-ecosystem.gitbook.io/gtcx-open-source | Overview, Protocols, Platforms, Technical Spec, Research, Developers, About           | ~200       |
| **ComplianceOS** | gtcx-ecosystem.gitbook.io/complianceos     | Overview, Core12, OCP, AI Agents, Platform, Enterprise, Pricing                       | ~180       |
| **Civic**        | civic.gtcx.africa                          | Overview, Policy Papers, Regulator Playbook, Sovereignty Framework, Partners, Support | ~120       |
| **Internal**     | internal.gtcx.africa                       | Home, PRDs, Architecture, Field Ops, Runbooks, Team                                   | ~150       |

## Key Correction Needed

**ComplianceOS:** OCP (Open Compliance Protocols) should be a **peer section** to Core12, not nested under it.

- **Core12** = WHAT must be verified (12 domains, 67 controls)
- **OCP** = HOW verification happens (protocols, interoperability)

They work together but are architecturally distinct.
