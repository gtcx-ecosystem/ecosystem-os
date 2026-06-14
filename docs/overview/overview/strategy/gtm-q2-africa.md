---
title: 'Q2 GTM — Africa / Ghana — gtcx-agile'
status: 'current'
date: '2026-05-24'
owner: 'chief-of-staff'
role: 'chief-of-staff'
tier: 'operating'
tags: ['documentation']
review_cycle: 'annual'
---

# Q2 GTM — Africa / Ghana — gtcx-agile

**Date:** 2026-03-09
**Scope:** ai-1-agile — sprint planning decisions most critical for Q2; what coordination failures could kill the Ghana timeline

---

## What Q2 Means for This Repo

ai-1-agile does not ship product. It ships coordination. Q2 success or failure for this repo is measured by one question: did the 15-repo ecosystem move in a coherent direction that produced the Ghana proof point?

If the Ghana cooperative demo happens — verified metric tons of commodity, DFI financing unlocked, smallholder farmers registered on a platform — ai-1-agile contributed to it by keeping the critical path visible and unblocked. If the demo fails because repos were building the wrong things in the wrong order, that is a coordination failure that belongs here.

---

## The Ghana Proof Point: What It Actually Requires

The Q2 target is verified metric tons of commodity transacted, Ghana-first. Decomposing this into system requirements:

| Step | What Happens                                      | Which Repo                                  | Current Status                                                            |
| ---- | ------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------- |
| 1    | Farmer registers parcel or cooperative membership | ai-6-terra (land) or 7-mobile (field entry) | TerraOS backend: complete. Mobile: no feature impl.                       |
| 2    | Parcel/identity verified against protocol         | 3-protocols (TradePass, GeoTag)             | Protocols: complete. Consumer: 6-platforms (unbuilt).                     |
| 3    | Trade executed through platform                   | 6-platforms (AGX/CRX)                       | Not implemented.                                                          |
| 4    | Trade verification surfaces in product            | ai-3-fiftyfour or compliance-os             | compliance-os: shipping. fifty-four: building against unimplemented APIs. |
| 5    | DFI sees Land Credit Score, approves financing    | ai-6-terra institutional API                | Backend: complete. Not integrated with trade stack.                       |

Steps 3 and 4 are the blocking gap. 6-platforms has not been built. Without it, there is no trade execution layer connecting verified identity and land to a financial transaction.

---

## The Three Sprint Planning Decisions That Determine Q2

### Decision 1: When Does 6-Platforms Build Begin?

This is the most consequential unresolved question in the ecosystem. AGX (trade execution platform) is the minimum viable platform for commodity trade. It requires:

- NestJS + TypeORM scaffold (one sprint)
- TradePass protocol integration (one sprint)
- Basic trade submission and status API (one sprint)

At 2-week sprint cadence: 6 weeks minimum to an AGX MVP that fifty-four can demo against. That puts AGX MVP no earlier than late April 2026 if a sprint starts today. Every week of delay pushes the demo.

**This repo must record this decision as an ADR and put it in the Q2 plan by end of current sprint.**

### Decision 2: Does TerraOS Connect to the GTCX Trade Stack in Q2?

TerraOS (ai-6-terra) is a standalone land economic OS. It has:

- A complete Land Credit Score API (`/api/v2/institutional/credit-score/\{id\}`)
- RSA-4096 signed certificates, Merkle-anchored, offline-capable
- USSD channel implemented (266 lines, real implementation)

The question for Q2: does TerraOS Land Credit Score feed into AGX as a creditworthiness input for DFI financing of commodity trades? Or does TerraOS operate in isolation during Q2 (a parallel Ghana demo, not an integrated one)?

The integrated path is more powerful but requires a defined API contract between TerraOS and AGX. The standalone path is achievable without 6-platforms.

**This decision needs to be made and recorded. It does not have to be made here, but it has to be tracked here.**

### Decision 3: What Is the Minimum Mobile Deliverable for Ghana?

7-mobile has structure and zero feature implementation. A full Expo app is not needed for Q2. What is needed:

- A field agent can photograph a parcel boundary (GPS walk already scaffolded in web: `gps-boundary-walk.tsx`)
- That photo and boundary data submits to TerraOS
- Field agent receives a confirmation with a QR-coded certificate

TerraOS already has the backend for all of this. The missing piece is a minimal mobile form that calls TerraOS `/api/v2/parcels` POST. This is a 2-sprint mobile deliverable, not a full app build.

**If 7-mobile is not prioritized now, the only Ghana registration path is web or USSD — which changes the demo narrative.**

---

## Coordination Failures That Could Kill the Ghana Timeline

### Failure Mode 1: 6-Platforms Build Never Gets Scheduled

The most likely failure. No one owns the 6-platforms build in a documented sprint plan. It is in the backlog in the sense that it is known to need doing. But "known to need doing" is not a sprint commitment. If Q2 ends with 6-platforms still unstarted, fifty-four has no backend, no demo is possible, and the frontend investment (340 TypeScript files) has produced zero shippable product.

**Mitigation:** A sprint plan for 6-platforms AGX must be written and committed to this repo by the end of the current sprint. Owner named. Timeline dated.

### Failure Mode 2: TerraOS Integration Decision Delayed Until Too Late

TerraOS has a complete backend. If no one decides whether it connects to the trade stack until May, the window for building the integration before the Ghana demo closes. The integration itself is not complex — it is an API contract between two services. But it requires a decision to exist before implementation can start.

**Mitigation:** A TerraOS integration decision (ADR) committed to this repo within 2 weeks. Even "TerraOS standalone for Q2" is a valid decision. What is not valid is no decision.

### Failure Mode 3: Frontend and Backend Never Sync on API Contracts

ai-3-fiftyfour is building surfaces against API routes that do not have implementations or typed contracts. If the frontend builds TradeDesk54 against an assumed `/api/trade/submit` route and the backend (when built) names it differently, there is a rework sprint in Q2 that was entirely avoidable.

**Mitigation:** Before a single NestJS route is written in 6-platforms, it goes through a review against what fifty-four currently calls. This costs one day. Skipping it costs a sprint.

### Failure Mode 4: Mobile Sits Unstarted Through Q2

The Ghana proof point has more credibility if a farmer registers a parcel from a mobile device, not from a laptop. If 7-mobile has no feature implementation by Q2 demo time, the demo runs on a web browser — which is a valid demo but a weaker story for DFI and cooperative partners who work with rural farmers.

**Mitigation:** Assign one sprint to 7-mobile for the minimal field registration flow (TerraOS parcel POST from mobile form). This is separable from the full app build.

---

## What This Repo Must Produce for Q2

Ranked by impact:

1. **GTCX Q2 Ecosystem Roadmap** — A single document naming the Ghana milestone, each repo's contribution, and the dependency sequence. Dates attached. Does not exist today. This is the most urgent missing artifact.

2. **6-Platforms Build Sprint Plan** — A sprint plan for AGX MVP, committed to `_sop/3-agile/2-scrum-board/5-sprints/`. Owner named. Start date. P0 deliverables.

3. **TerraOS Integration ADR** — Decides whether TerraOS connects to AGX in Q2. Records the decision with rationale.

4. **Dependency Register (Q2)** — A table tracking all cross-repo dependencies needed for the Ghana demo, with dates and owners.

5. **Sprint Cadence Alignment** — A decision on whether all active repos align to a shared 2-week sprint cycle or continue independently.

---

## The ONE Thing This Repo Must Do for Q2

Write the GTCX Q2 Ecosystem Roadmap.

Not a template. The actual roadmap. Named repos, named deliverables, named dates, named owners. The dependency sequence that ends in the Ghana proof point. The phase gates that tell the team when each repo is done with Q2.

Everything else this repo could do is secondary. If that document exists and is maintained, the ecosystem will move coherently. If it doesn't exist, all 14 other repos continue developing in isolation and Q2 ends with impressive commit counts but no demo that a DFI partner can act on.

One document. This sprint. That is the Q2 job of ai-1-agile.
