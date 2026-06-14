---
title: 'Ecosystem Integration — gtcx-agile'
status: 'current'
date: '2026-05-24'
owner: 'chief-of-staff'
role: 'chief-of-staff'
tier: 'operating'
tags: ['testing']
review_cycle: 'annual'
---

# Ecosystem Integration — gtcx-agile

**Date:** 2026-03-09
**Scope:** ai-1-agile — cross-repo coordination function, visibility gaps, and critical path

---

## The Coordination Role This Repo Was Built For

ai-1-agile is the source of truth for development priorities across all 15 GTCX repos. Its job is to answer three questions at any given time:

1. What is everyone building, in what order?
2. What does repo A need from repo B before it can proceed?
3. What has slipped, and what does that unblock or block?

Currently, none of those questions have documented answers in this repo.

---

## What Visibility This Repo Has

### Present

- Orientation doc names the 15-repo ecosystem and identifies this repo's coordination role
- SOP hygiene handoff names 9 completed repos and 7 remaining — a partial state-of-the-ecosystem view
- Session records in `_sop/3-agile/2-scrum-board/1-work-sessions/` capture ad-hoc work
- Priority framework (P0–P3) provides a triage vocabulary all repos could adopt

### Absent

- No live view of what any repo is building this sprint
- No record of what any repo shipped last sprint
- No cross-repo dependency table
- No Q2 timeline with dates, phases, or gates
- No single document that answers "what is GTCX building and in what order?"

---

## The Critical Path That Is Currently Unmanaged

The ecosystem has a clear dependency graph. ai-1-agile is the natural home for tracking it. It is not being tracked.

```
2-core (types, crypto primitives)
    └─► 3-protocols (TradePass, GeoTag, VaultMark, GCI, PvP, PANX)
             └─► 6-platforms (AGX, CRX, SGX, Veritas, Pathways)  ← SPEC ONLY
                      └─► ai-3-fiftyfour (13 product surfaces)   ← SHIPPING
                                                                    ← MISMATCH
```

The frontend (ai-3-fiftyfour, 214 commits, 340 TypeScript files) is building 13 product surfaces against API routes that 6-platforms has not implemented. This mismatch is the largest coordination failure in the ecosystem. Nothing in ai-1-agile names it, owns it, or carries a remediation timeline.

### Intelligence Activation Gap

```
5-intelligence (ANISA, Cortex SDK — structure only)
    └─► should feed: ai-3-fiftyfour, compliance-os, ai-6-terra
    └─► currently feeds: nothing
```

The AI-native positioning is a design claim, not a product claim, until intelligence is wired to execution. No plan in this repo tracks when or how that connection gets made.

### Mobile Gap

```
7-mobile (26 commits, structure only)
    └─► blocks: Ghana field testing, USSD/SMS registration for smallholder farmers
```

### Cascading Risk to Q2 Ghana Timeline

The Q2 proof point requires:

1. A farmer registers a parcel (TerraOS or mobile entry point)
2. That parcel is verified against TradePass/GeoTag protocols
3. Verification surfaces in a product (fifty-four or compliance-os)
4. A DFI sees a Land Credit Score and approves financing

Step 2 requires 3-protocols (done). Steps 3–4 require 6-platforms (not built). No coordination document here tracks the gap or its resolution path.

---

## How ai-1-agile Should Coordinate Across Repos

### What It Should Produce Each Sprint Cycle

1. **Ecosystem sprint plan**: which repos are in active sprint, what P0 items each has committed to, what cross-repo handoffs are expected this cycle.

2. **Dependency register**: a live table of "Repo A waiting for Repo B to deliver X by [date]" — updated each sprint.

3. **Slip register**: when a dependency slips, what it cascades into, who is notified.

4. **Q2 milestone tracker**: named milestones with dates, owners, and status (e.g., "6-platforms AGX MVP: 2026-04-30, owner: eng, status: not started").

### What It Currently Produces

Session transcripts. No structured artifacts.

---

## Cross-Repo Coordination Gaps Ranked by Impact

| Gap                                   | Impact   | Consequence if Unaddressed                                           |
| ------------------------------------- | -------- | -------------------------------------------------------------------- |
| No 6-platforms build sprint plan      | Critical | Frontend ships against unimplemented APIs; demo fails                |
| No AI activation plan                 | High     | AI-native claim stays marketing copy through Q2                      |
| No mobile implementation sprint       | High     | No field testing possible; Ghana proof point requires device         |
| No cross-repo dependency map          | High     | Slips are invisible until they cascade                               |
| No Q2 milestone document with dates   | High     | Stakeholder confidence, fundraising, partner commitments             |
| No shared sprint cadence across repos | Medium   | Repos develop independently; handoffs are uncoordinated              |
| Repo SOP hygiene incomplete (self)    | Low      | Agent onboarding degraded; this repo is in its own remediation queue |

---

## What Functioning Integration Would Look Like

If ai-1-agile were operating as its CLAUDE.md intends:

**Ecosystem roadmap** — A document naming the Q2 milestone (Ghana verified metric tons), what each repo contributes, and what the dependency sequence is. Reviewable by any contributor in five minutes.

**Active sprint board** — Updated biweekly. Lists each active repo, its sprint goal, P0 items, and expected cross-repo outputs.

**Dependency register** — A table. Repo A → needs from Repo B → expected by [date] → current status. Any slip visible immediately.

**Velocity tracking** — Commit cadence per repo, sprint completion rate, where velocity has dropped or stalled.

**Decision log** — When prioritization decisions are made ("build AGX before mobile"), recorded as an ADR with rationale. Prevents re-litigating the same decisions.

---

## The Specific Coordination Decisions This Repo Needs to Make and Document

These are not tracked anywhere in the ecosystem today. They belong here:

1. **6-platforms build sequence**: which platform ships first (AGX is likely), on what timeline, and what protocol integrations are required for MVP.

2. **Intelligence activation gate**: at what point does 5-intelligence transition from SDK to running service? What team owns it? What does it unblock?

3. **Mobile start condition**: when does 7-mobile begin feature implementation? What is the minimum viable field tool for Ghana?

4. **TerraOS integration**: does ai-6-terra connect to the GTCX protocol stack in Q2, or does it operate as standalone infrastructure for Ghana?

5. **Frontend–backend contract**: does fifty-four build against a mock API, or does 6-platforms need to ship first? This decision needs to be recorded and acted on.

---

## Summary

ai-1-agile has the structure to coordinate across 15 repos. It does not currently contain the coordination. The templates are empty. The plans have not been written. The repo's most urgent work is not infrastructure hygiene — it is producing the actual Q2 roadmap, the actual sprint plan for the two or three most critical-path repos, and the actual dependency map. That work is more valuable than any amount of template refinement.
