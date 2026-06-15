---
title: 'Phase 1: Foundation'
status: current
date: 2026-05-26
owner: quality-evidence-lead
tier: operating
tags: ['protocol', 'documentation']
review_cycle: on-change
document_type: protocol
---

# Phase 1: Foundation

> **Timeline:** Months 0-6 | **Objective:** Establish partnership and prepare for pilot

---

## Overview

Phase 1 establishes the legal, technical, and organizational foundation for GTCX deployment. By the end of this phase, you will have:

✅ Signed partnership agreement (MoU)
✅ Regulatory framework amendments drafted
✅ Technical infrastructure decisions made
✅ Pilot design completed
✅ Stakeholder alignment achieved

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1 TIMELINE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MONTH    1         2         3         4         5         6   │
│           │         │         │         │         │         │   │
│           ▼         ▼         ▼         ▼         ▼         ▼   │
│        ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐│
│        │Align│   │Infra│   │Legal│   │Pilot│   │Train│   │Ready││
│        └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘│
│                                                                  │
│  KEY MILESTONES:                                                │
│  M1: Task force formed       M4: Pilot sites selected          │
│  M2: Infrastructure decided  M5: Staff training complete        │
│  M3: MoU signed             M6: Pilot launch ready             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1.1 Stakeholder Alignment

### Week 1-4: Form Task Force

**Objective:** Establish cross-functional team with authority to make decisions.

#### Recommended Task Force Composition

| Role                | Department                 | Responsibility                    |
| ------------------- | -------------------------- | --------------------------------- |
| **Chair**           | Permanent Secretary Office | Decision authority, escalation    |
| **Technical Lead**  | IT/Digital                 | Infrastructure, integration       |
| **Legal Lead**      | Legal Affairs              | Regulatory amendments, contracts  |
| **Operations Lead** | Mining Inspectorate        | Field requirements, pilot ops     |
| **Finance Lead**    | Finance/Budget             | Resource allocation, ROI tracking |
| **Communications**  | Public Affairs             | Stakeholder messaging             |

#### First Task Force Meeting Agenda

```
TASK FORCE KICKOFF — SAMPLE AGENDA (2 hours)
───────────────────────────────────────────────────────────────────

1. Welcome & Context (15 min)
   - Minister's mandate and expectations
   - Why now: Market window, DFI interest

2. GTCX Overview (30 min)
   - Technical demonstration
   - Sovereignty guarantees
   - Q&A

3. Implementation Approach (30 min)
   - Four-phase roadmap
   - Phase 1 deliverables
   - Resource requirements

4. Working Group Formation (30 min)
   - Infrastructure working group
   - Legal/regulatory working group
   - Pilot design working group

5. Next Steps & Schedule (15 min)
   - Weekly meeting cadence
   - Reporting structure
   - Immediate actions
```

### Week 2-6: Stakeholder Mapping

**Objective:** Identify all stakeholders, assess positions, plan engagement.

#### Stakeholder Analysis Template

| Stakeholder          | Interest            | Current Position | Target Position | Strategy           |
| -------------------- | ------------------- | :--------------: | :-------------: | ------------------ |
| Ministry of Finance  | Revenue             |     Neutral      |    Champion     | Joint ROI analysis |
| Mining Cooperatives  | Market access       |    Skeptical     |   Supportive    | Pilot benefits     |
| Local Buyers         | Business continuity |    Resistant     |     Neutral     | Gradual transition |
| International Buyers | Compliance          |    Supportive    |    Champion     | Early engagement   |
| Opposition MPs       | Political           |     Unknown      |     Neutral     | Transparency       |

#### Engagement Calendar

| Week | Activity            | Stakeholder          | Format        |
| :--: | ------------------- | -------------------- | ------------- |
|  2   | Initial briefing    | Ministry of Finance  | Meeting       |
|  3   | Consultation        | Mining associations  | Workshop      |
|  4   | Technical session   | Revenue Authority    | Working group |
|  5   | Information session | Customs              | Presentation  |
|  6   | Community meeting   | Pilot region leaders | Town hall     |

---

## 1.2 Infrastructure Setup

### Week 3-8: Deployment Decision

**Objective:** Determine hosting model and technical requirements.

#### Deployment Options

| Option              | Description                     | Best For                | Considerations        |
| ------------------- | ------------------------------- | ----------------------- | --------------------- |
| **On-Premise**      | Your data center                | Maximum control         | Requires IT capacity  |
| **Sovereign Cloud** | National cloud provider         | Balance of control/ease | Verify data residency |
| **Hybrid**          | Core on-premise, services cloud | Flexibility             | More complex          |
| **GTCX Hosted**     | We host, you control            | Fast deployment         | Data leaves country   |

#### Decision Framework

```
INFRASTRUCTURE DECISION TREE
───────────────────────────────────────────────────────────────────

Do you have existing data center capacity?
├── YES ──▶ Do you have DevOps/Kubernetes expertise?
│           ├── YES ──▶ ON-PREMISE recommended
│           └── NO ───▶ HYBRID recommended (on-prem data, cloud compute)
│
└── NO ───▶ Does your country have sovereign cloud options?
            ├── YES ──▶ SOVEREIGN CLOUD recommended
            └── NO ───▶ Consider HYBRID with regional cloud
                        (data in-country, compute in-region)
```

#### Technical Requirements Checklist

**Minimum Infrastructure:**

- [ ] 4 vCPU, 16GB RAM server (primary)
- [ ] 2 vCPU, 8GB RAM server (backup)
- [ ] 500GB SSD storage
- [ ] 99.5% uptime connectivity
- [ ] TLS certificates
- [ ] Backup storage (off-site)

**For Pilot (5-20 sites):**

- [ ] 20-50 mobile devices (Android)
- [ ] Cellular data plans
- [ ] Training venue with projector
- [ ] Test environment setup

### Week 6-10: Integration Assessment

**Objective:** Map existing systems and plan integration points.

#### System Inventory Template

| System          | Owner             | Data Exchanged        | API Available |   Priority    |
| --------------- | ----------------- | --------------------- | :-----------: | :-----------: |
| Mining Registry | Ministry IT       | Licenses, permits     |      ❌       |     High      |
| Revenue System  | Revenue Authority | Tax records           |      ✅       |     High      |
| Customs         | Customs IT        | Export declarations   |      ✅       |    Medium     |
| GIS/Cadastre    | Lands Commission  | Boundaries            |      ❌       |    Medium     |
| National ID     | Civil Registry    | Identity verification |      ✅       | Low (Phase 2) |

#### Integration Complexity Assessment

| Integration     | Complexity | Approach                 | Timeline  |
| --------------- | :--------: | ------------------------ | --------- |
| Mining Registry |    High    | CSV export → API later   | Phase 1-2 |
| Revenue System  |   Medium   | API integration          | Phase 2   |
| Customs         |   Medium   | Webhook notifications    | Phase 2   |
| GIS             |    Low     | One-time boundary import | Phase 1   |

---

## 1.3 Legal & Regulatory

### Week 4-12: Regulatory Framework

**Objective:** Ensure legal basis for digital verification recognition.

#### Regulatory Gap Analysis

| Requirement                     | Current Provision   | Gap         | Amendment Needed            |
| ------------------------------- | ------------------- | ----------- | --------------------------- |
| Digital certificate recognition | None                | Yes         | Minerals Act amendment      |
| Electronic signatures           | E-Transactions Act  | Partial     | Regulation clarification    |
| Data protection                 | Data Protection Act | Adequate    | None                        |
| Tax automation                  | Tax Code            | None        | Revenue Authority directive |
| Export documentation            | Export Regs         | Paper-based | Ministerial order           |

#### Amendment Drafting Checklist

- [ ] Legal counsel assigned
- [ ] Comparative analysis (Ghana, Rwanda examples)
- [ ] Draft amendment language
- [ ] Ministry legal review
- [ ] Attorney General consultation
- [ ] Cabinet submission (if required)
- [ ] Parliamentary process (if required)
- [ ] Ministerial order authority (for faster items)

### Week 8-12: Partnership Agreement

**Objective:** Formalize relationship through MoU or contract.

#### MoU Key Terms Checklist

| Term                   | Description                       | Status |
| ---------------------- | --------------------------------- | :----: |
| **Scope**              | Services, countries, commodities  |   ☐    |
| **Duration**           | Initial term, renewal options     |   ☐    |
| **Data Sovereignty**   | Residency, ownership, exit rights |   ☐    |
| **Revenue Sharing**    | Fee structure, government share   |   ☐    |
| **IP Rights**          | Open source, customizations       |   ☐    |
| **Confidentiality**    | Information handling              |   ☐    |
| **Dispute Resolution** | Jurisdiction, arbitration         |   ☐    |
| **Termination**        | Notice period, data export        |   ☐    |

#### Sample Revenue Sharing Structure

```
ILLUSTRATIVE REVENUE MODEL
───────────────────────────────────────────────────────────────────

Transaction Fee: $10 per verified export

Distribution:
├── Government (Ministry)    70%    $7.00
├── GTCX Operations         20%    $2.00
└── Technology Fund         10%    $1.00

At 10,000 transactions/year:
├── Government revenue:     $70,000
├── GTCX sustainable ops:   $20,000
└── Future development:     $10,000
```

---

## 1.4 Pilot Design

### Week 8-16: Site Selection

**Objective:** Identify optimal pilot locations and participants.

#### Site Selection Criteria

| Criterion                  | Weight | Scoring (1-5)               |
| -------------------------- | :----: | --------------------------- |
| Cooperative willingness    |  25%   | 5 = Eager, 1 = Resistant    |
| Mobile network coverage    |  20%   | 5 = 4G, 3 = 3G, 1 = None    |
| Proximity to market        |  15%   | 5 = <50km, 1 = >200km       |
| Existing Ministry presence |  15%   | 5 = Office nearby, 1 = None |
| Buyer interest             |  15%   | 5 = Committed, 1 = None     |
| Political support          |  10%   | 5 = Strong, 1 = Opposition  |

#### Recommended Pilot Configuration

| Element            | Minimum  | Recommended |  Stretch  |
| ------------------ | :------: | :---------: | :-------: |
| Sites              |    5     |    10-15    |    20     |
| Producers          |    50    |   200-500   |   1,000   |
| Inspectors         |    2     |     5-8     |    15     |
| Transactions/month |    20    |   100-200   |    500    |
| Duration           | 3 months |  6 months   | 12 months |

### Week 12-20: Success Metrics Definition

**Objective:** Establish measurable KPIs for pilot evaluation.

#### Pilot Success Metrics

| Category         | Metric                     | Target | Measurement                   |
| ---------------- | -------------------------- | :----: | ----------------------------- |
| **Adoption**     | Producer registration rate |  80%   | TradePass accounts / eligible |
| **Usage**        | VXA inspections completed  |  90%   | Inspections / scheduled       |
| **Quality**      | Evidence acceptance rate   |  85%   | Accepted / submitted          |
| **Revenue**      | Transaction fee collection |  95%   | Collected / due               |
| **Satisfaction** | Producer NPS               |  +30   | Survey                        |
| **Technical**    | System uptime              |  99%   | Monitoring                    |

#### Data Collection Plan

| Data Point    | Source              | Frequency | Responsible    |
| ------------- | ------------------- | --------- | -------------- |
| Registrations | TradePass system    | Daily     | Technical team |
| Inspections   | VXA system          | Daily     | Technical team |
| Revenue       | Finance records     | Weekly    | Finance lead   |
| Feedback      | Surveys, interviews | Monthly   | Ops lead       |
| Issues        | Support tickets     | Real-time | Technical team |

---

## 1.5 Capacity Building

### Week 16-24: Staff Training

**Objective:** Prepare ministry staff and field inspectors.

#### Training Program Overview

| Module                  | Duration | Audience         | Delivery           |
| ----------------------- | :------: | ---------------- | ------------------ |
| Executive Overview      | 2 hours  | Leadership       | In-person          |
| System Administration   |  2 days  | IT staff         | In-person          |
| Inspector Certification |  5 days  | Field inspectors | In-person + field  |
| Data Analysis           |  1 day   | Analysts         | Online + in-person |
| Train-the-Trainer       |  3 days  | Training leads   | In-person          |

#### Inspector Certification Curriculum

```
INSPECTOR CERTIFICATION — 5-DAY PROGRAM
───────────────────────────────────────────────────────────────────

DAY 1: GTCX Fundamentals
├── System overview and sovereignty model
├── TradePass identity verification
├── GCI scoring methodology
└── Hands-on: Mobile app orientation

DAY 2: Evidence Collection
├── Documentation requirements
├── Photo/video capture standards
├── GPS and timestamp verification
└── Hands-on: Practice inspections

DAY 3: VXA Deep Dive
├── Inspection workflow
├── Offline mode operations
├── Sync and upload procedures
└── Hands-on: Full mock inspection

DAY 4: Field Practice
├── Real site visits
├── Supervised inspections
├── Feedback and coaching
└── Troubleshooting common issues

DAY 5: Certification & Launch Prep
├── Written assessment (70% pass)
├── Practical assessment (observed inspection)
├── Certification issuance
└── Pilot launch briefing
```

---

## Phase 1 Checklist

### Governance & Alignment

- [ ] Task force formed with decision authority
- [ ] Weekly meeting cadence established
- [ ] Stakeholder map completed
- [ ] Key stakeholder briefings delivered
- [ ] Ministry leadership approval obtained

### Technical Readiness

- [ ] Deployment model selected
- [ ] Infrastructure provisioned
- [ ] Test environment operational
- [ ] Integration assessment completed
- [ ] Security review passed

### Legal & Regulatory

- [ ] Regulatory gap analysis completed
- [ ] Amendment drafts prepared
- [ ] MoU negotiated and signed
- [ ] Data protection compliance confirmed
- [ ] Revenue sharing agreed

### Pilot Preparation

- [ ] Pilot sites selected
- [ ] Cooperatives engaged and consenting
- [ ] Success metrics defined
- [ ] Data collection plan approved
- [ ] Baseline data captured

### Capacity Building

- [ ] Training program designed
- [ ] Trainers certified
- [ ] Inspectors certified
- [ ] Equipment distributed
- [ ] Support procedures established

---

## Phase 1 → Phase 2 Gate

**Proceed to Phase 2 when:**

| Criterion      | Requirement                    | Status |
| -------------- | ------------------------------ | :----: |
| Partnership    | MoU signed                     |   ☐    |
| Infrastructure | Test environment operational   |   ☐    |
| Regulatory     | Legal basis confirmed          |   ☐    |
| Pilot          | Sites selected and consenting  |   ☐    |
| Capacity       | Minimum 2 inspectors certified |   ☐    |
| Budget         | Phase 2 resources allocated    |   ☐    |

**Gate Review Meeting:** Schedule with task force at Month 6 to formally approve pilot launch.

---

## Resources

### Templates (Available in Appendices)

- [x] Task Force Terms of Reference
- [x] Stakeholder Analysis Template
- [x] Infrastructure Requirements Checklist
- [x] MoU Template
- [x] Pilot Site Assessment Form
- [x] Inspector Certification Checklist

### Support Contacts

- **Implementation Lead:** implementation@gtcx.africa
- **Technical Support:** support@gtcx.africa
- **Government Relations:** gov@gtcx.africa

---

> ⏭️ **Next:** [Phase 2: Pilot](./README.md) — Limited deployment and iteration

---

_Regulator Playbook: Phase 1 Foundation v1.0 — January 2026_
