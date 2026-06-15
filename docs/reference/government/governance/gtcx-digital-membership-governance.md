---
title: 'GTCX Digital Membership & Governance Infrastructure'
status: current
date: 2026-05-26
owner: canon-os
tier: operating
tags: ['protocol', 'documentation', 'governance']
review_cycle: on-change
document_type: protocol
---

# GTCX Digital Membership & Governance Infrastructure

## Design Principles

| Principle           | Implementation                                           |
| ------------------- | -------------------------------------------------------- |
| **Mobile-first**    | Everything works on a smartphone                         |
| **Offline-capable** | Core functions work without connectivity                 |
| **Multilingual**    | All AU languages supported                               |
| **Transparent**     | Ownership and decisions visible to all                   |
| **Accessible**      | Works for a cooperative in rural Ghana AND Goldman Sachs |
| **Legal-first**     | Digital layer represents real legal rights               |

---

## Part 1: Member Registry

### Member Classes

| Class          | Who                                | Membership Criteria                     | Typical Member                         |
| -------------- | ---------------------------------- | --------------------------------------- | -------------------------------------- |
| **Producer**   | Those who extract/grow commodities | Verified via TradePass + active on SGX  | Mining cooperative, farmer association |
| **Buyer**      | Those who purchase commodities     | Licensed refiner/trader + active on AGX | Swiss refinery, commodity trader       |
| **Government** | Sovereign regulators               | National ministry or regulatory body    | Ghana Minerals Commission              |
| **Financial**  | Those who finance trade            | Licensed FI + active in trade finance   | AfDB, Standard Bank, Goldman           |

### Member Record

```yaml
member:
  id: 'GTCX-M-2025-00001'

  # Identity (verified via TradePass)
  legal_name: 'Tarkwa Gold Mining Cooperative'
  legal_type: 'cooperative'
  jurisdiction: 'Ghana'
  registration_number: 'GH-COOP-2019-4521'

  # Classification
  class: 'producer'
  subclass: 'artisanal_mining'
  commodities: ['gold', 'silver']

  # Ownership
  units_held: 15000
  units_class: 'producer'
  ownership_percentage: 0.0023% # of total units

  # Governance
  voting_weight: 15000 # may differ from units for some decisions
  delegate: null # can delegate votes to another member
  governance_tier: 'standard' # standard | founding | observer

  # Representatives (for organizations)
  authorized_representatives:
    - name: 'Kwame Asante'
      role: 'Chairman'
      tradepass_id: 'TP-GH-2024-xxxxx'
      can_vote: true
      can_transact: true
    - name: 'Ama Mensah'
      role: 'Secretary'
      tradepass_id: 'TP-GH-2024-xxxxx'
      can_vote: false
      can_transact: true

  # Status
  status: 'active'
  joined_date: '2025-06-15'
  last_activity: '2025-12-28'
  dues_status: 'current'

  # Verification
  kyc_level: 'L3'
  verified_by: 'GTCX-Onboarding'
  verification_date: '2025-06-14'
```

### Member Dashboard

What every member sees when they log in:

```
┌─────────────────────────────────────────────────────────────────┐
│  GTCX Member Portal                           [Tarkwa Gold Co-op]│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  YOUR MEMBERSHIP                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Class: Producer (Artisanal Mining)                        │ │
│  │  Units: 15,000                                             │ │
│  │  Ownership: 0.0023%                                        │ │
│  │  Status: Active ✓                                          │ │
│  │  Member since: June 2025                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  VOTE NOW    │  │  OWNERSHIP   │  │  DIVIDENDS   │          │
│  │  2 active    │  │  View full   │  │  Q3 pending  │          │
│  │  proposals   │  │  cap table   │  │  $124.50     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  RECENT ACTIVITY                                                │
│  • Dec 15: Voted YES on Proposal #47 (DRC Expansion)           │
│  • Dec 1: Quarterly dividend received ($98.20)                 │
│  • Nov 20: Earned 500 units (participation reward)             │
│  • Nov 1: Proposal #45 passed (you voted YES)                  │
│                                                                  │
│  UPCOMING                                                        │
│  • Jan 15: Annual Member Meeting (virtual)                     │
│  • Jan 31: Q4 dividend distribution                            │
│  • Feb 1: Board election voting opens                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 2: Ownership Tracking

### Unit Structure

```yaml
unit_structure:
  total_authorized: 100,000,000 # max units that can exist
  total_issued: 45,000,000 # currently issued

  by_class:
    founder:
      authorized: 15,000,000 # 15% cap
      issued: 15,000,000
      holders: 3
      transferable: false # locked for 5 years
      voting_rights: 'economic_only' # no governance votes

    producer:
      authorized: 25,000,000 # 25% target
      issued: 8,500,000
      holders: 127
      transferable: true # within class only
      voting_rights: 'full'

    buyer:
      authorized: 25,000,000
      issued: 9,200,000
      holders: 45
      transferable: true
      voting_rights: 'full'

    government:
      authorized: 20,000,000
      issued: 7,300,000
      holders: 8
      transferable: false # sovereign stakes don't transfer
      voting_rights: 'full'

    financial:
      authorized: 15,000,000
      issued: 5,000,000
      holders: 12
      transferable: true
      voting_rights: 'full'

  reserved:
    participation_rewards: 10,000,000 # issued to active members
    future_members: 15,000,000 # for new member classes
```

### Public Ownership Dashboard

Anyone (member or not) can see:

```
┌─────────────────────────────────────────────────────────────────┐
│  GTCX OWNERSHIP                                    [Public View] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  OWNERSHIP BY CLASS                                              │
│                                                                  │
│  Founder     ████████████████░░░░░░░░░░░░░░░░  15.0%  (locked)  │
│  Producer    █████████░░░░░░░░░░░░░░░░░░░░░░░   8.5%            │
│  Buyer       ██████████░░░░░░░░░░░░░░░░░░░░░░   9.2%            │
│  Government  ███████░░░░░░░░░░░░░░░░░░░░░░░░░   7.3%            │
│  Financial   █████░░░░░░░░░░░░░░░░░░░░░░░░░░░   5.0%            │
│  Reserved    █████████████████████████░░░░░░░  25.0%            │
│  Unissued    ██████████████████████████████░░  30.0%            │
│                                                                  │
│  TOTAL MEMBERS: 195                                              │
│  TOTAL ISSUED UNITS: 45,000,000                                 │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TOP HOLDERS BY CLASS                                            │
│                                                                  │
│  Producer:                                                       │
│  1. Ghana Artisanal Mining Federation     2.1M units  (4.7%)   │
│  2. Rwanda Mining Cooperative Union       1.8M units  (4.0%)   │
│  3. Tarkwa Gold Cooperative                 15K units  (0.03%) │
│  ... 124 more                                                   │
│                                                                  │
│  Buyer:                                                         │
│  1. Metalor Technologies                  3.2M units  (7.1%)   │
│  2. Valcambi SA                           2.8M units  (6.2%)   │
│  3. Emirates Gold                         1.5M units  (3.3%)   │
│  ... 42 more                                                    │
│                                                                  │
│  Government:                                                     │
│  1. Ghana Minerals Commission             2.5M units  (5.6%)   │
│  2. Rwanda Mines Board                    2.0M units  (4.4%)   │
│  3. Kenya Mining Authority                1.2M units  (2.7%)   │
│  ... 5 more                                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Ownership Certificate

Each member can generate a verifiable certificate:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                    GTCX Ltd                                      │
│            Certificate of Membership                             │
│                                                                  │
│  This certifies that                                            │
│                                                                  │
│         TARKWA GOLD MINING COOPERATIVE                          │
│                                                                  │
│  is the registered holder of                                    │
│                                                                  │
│              15,000 PRODUCER CLASS UNITS                        │
│                                                                  │
│  representing 0.0023% ownership of GTCX Ltd                     │
│                                                                  │
│  Certificate ID: GTCX-CERT-2025-04521                           │
│  Issued: December 30, 2025                                      │
│  Valid until: December 30, 2026 (auto-renews)                   │
│                                                                  │
│  ┌──────────────┐                                               │
│  │ [QR CODE]    │  Verify at: verify.gtcx.org/GTCX-CERT-...    │
│  │              │  Or scan QR code                              │
│  └──────────────┘                                               │
│                                                                  │
│  Signed: _____________________                                  │
│          GTCX Registry Officer                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 3: Governance Infrastructure

### Decision Types

| Type               | What It Covers                      | Who Votes                               | Threshold | Timeline  |
| ------------------ | ----------------------------------- | --------------------------------------- | --------- | --------- |
| **Operational**    | Fees, services, minor policies      | Board only                              | Majority  | Immediate |
| **Standard**       | New features, partnerships, budgets | All members                             | Majority  | 14 days   |
| **Major**          | New markets, large investments      | All members                             | 60%       | 30 days   |
| **Constitutional** | Governance rules, class changes     | All members + class ratification        | 75%       | 60 days   |
| **Board Election** | Elect board members                 | By class (each class elects their reps) | Plurality | 30 days   |

### Proposal Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   DRAFT     │────▶│   REVIEW    │────▶│   VOTING    │────▶│  EXECUTION  │
│             │     │             │     │             │     │             │
│ Any member  │     │ Board/      │     │ All eligible│     │ Management  │
│ can submit  │     │ Committee   │     │ members     │     │ implements  │
│             │     │ reviews     │     │ vote        │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     │                    │                   │                    │
     │                    │                   │                    │
     ▼                    ▼                   ▼                    ▼
  Minimum             7 days for         14-60 days           Results
  1000 units          feedback,          depending on         published,
  to submit           may return         decision type        execution
                      to draft                                tracked
```

### Proposal Template

```yaml
proposal:
  id: 'GTCX-PROP-2025-047'
  title: 'Expand Operations to Democratic Republic of Congo'
  type: 'major'

  submitted_by:
    member_id: 'GTCX-M-2025-00089'
    member_name: 'Rwanda Mining Cooperative Union'
    units_held: 1,800,000

  summary: |
    Proposal to establish SGX DRC and begin producer enrollment
    in the Katanga copper-cobalt region.

  full_text: |
    [Detailed proposal with background, rationale, implementation
    plan, budget, risks, and timeline...]

  financial_impact:
    investment_required: '$2.4M over 18 months'
    expected_revenue: '$800K/year by Year 3'
    funding_source: 'Operating reserves + new member dues'

  timeline:
    submitted: '2025-12-01'
    review_period: '2025-12-01 to 2025-12-08'
    voting_opens: '2025-12-09'
    voting_closes: '2025-01-08'
    execution_target: '2025-Q2'

  requirements:
    quorum: 25% # of total units
    threshold: 60% # of votes cast
    class_approval: false # doesn't require per-class ratification

  current_status: 'voting'

  votes:
    total_eligible_units: 45,000,000
    units_voted: 18,500,000 # 41% turnout so far
    votes_for: 14,200,000 # 76.8%
    votes_against: 3,800,000 # 20.5%
    abstentions: 500,000 # 2.7%

  discussion:
    comments: 47
    supporters: ['Ghana Mining Fed', 'Metalor', 'IFC']
    concerns_raised: ['Security situation', 'Infrastructure costs']
```

### Voting Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  PROPOSAL #47: Expand to DRC                         [Vote Now] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Status: VOTING OPEN                                            │
│  Closes: January 8, 2025 (9 days remaining)                    │
│                                                                  │
│  Type: Major Decision (requires 60% approval)                   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SUMMARY                                                         │
│  Establish SGX DRC and begin producer enrollment in Katanga    │
│  copper-cobalt region. Investment: $2.4M over 18 months.       │
│                                                                  │
│  [Read Full Proposal]  [View Discussion (47 comments)]         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CURRENT RESULTS                                                 │
│                                                                  │
│  For      ████████████████████████████████░░░░░░  76.8%        │
│  Against  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  20.5%        │
│  Abstain  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   2.7%        │
│                                                                  │
│  Turnout: 41% (need 25% quorum) ✓                              │
│  Threshold: 60% (currently at 76.8%) ✓                         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  YOUR VOTE                                                       │
│                                                                  │
│  You have 15,000 units eligible to vote.                       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │   [  FOR  ]      [ AGAINST ]      [ ABSTAIN ]           │   │
│  │                                                          │   │
│  │   Optional: Explain your vote                           │   │
│  │   ┌──────────────────────────────────────────────────┐  │   │
│  │   │                                                   │  │   │
│  │   │                                                   │  │   │
│  │   └──────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │                              [ SUBMIT VOTE ]            │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ⚠️  Your vote is final and cannot be changed                   │
│  🔒 Your vote is recorded but kept confidential until close    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Board Elections

```yaml
election:
  id: 'GTCX-ELEC-2026-001'
  type: 'board_election'
  title: '2026 Board of Directors Election'

  timeline:
    nominations_open: '2026-01-15'
    nominations_close: '2026-02-15'
    campaign_period: '2026-02-16 to 2026-03-15'
    voting_opens: '2026-03-16'
    voting_closes: '2026-04-15'
    results_announced: '2026-04-16'
    term_begins: '2026-05-01'

  seats:
    producer_class:
      seats_available: 2
      term_length: '3 years'
      candidates:
        - name: 'Kwame Asante'
          organization: 'Ghana Artisanal Mining Federation'
          statement: '...'
          endorsements: [...]
        - name: 'Jean-Baptiste Muhire'
          organization: 'Rwanda Mining Cooperative Union'
          statement: '...'
          endorsements: [...]
        - name: 'Amina Diallo'
          organization: 'Mali Gold Producers Association'
          statement: '...'
          endorsements: [...]
      voters: 'producer class members only'
      method: 'ranked choice'

    buyer_class:
      seats_available: 2
      candidates: [...]
      voters: 'buyer class members only'

    government_class:
      seats_available: 2
      candidates: [...]
      voters: 'government class members only'

    financial_class:
      seats_available: 2
      candidates: [...]
      voters: 'financial class members only'

    independent:
      seats_available: 1
      candidates: [...]
      voters: 'all members'

    founder_observer:
      seats_available: 1
      appointed_by: 'founder class'
      voting_rights: 'observer only'
```

---

## Part 4: Economic Rights

### Dividend Distribution

```yaml
distribution:
  id: 'GTCX-DIV-2025-Q4'
  period: 'Q4 2025'

  financials:
    revenue: '$4,200,000'
    operating_costs: '$2,800,000'
    surplus: '$1,400,000'

    allocation:
      reserve_fund: '$280,000' # 20% to reserves
      distributable: '$1,120,000' # 80% to members

  distribution_method: 'pro_rata' # proportional to units held
  per_unit_amount: '$0.0249' # $1,120,000 / 45,000,000 units

  by_member_sample:
    - member: 'Tarkwa Gold Cooperative'
      units: 15,000
      amount: '$373.50'
      payment_method: 'mobile_money'

    - member: 'Metalor Technologies'
      units: 3,200,000
      amount: '$79,680.00'
      payment_method: 'bank_transfer'

    - member: 'Ghana Minerals Commission'
      units: 2,500,000
      amount: '$62,250.00'
      payment_method: 'government_treasury'

  timeline:
    declared: '2026-01-15'
    record_date: '2026-01-20'
    payment_date: '2026-01-31'

  payment_options:
    - mobile_money # MTN, Airtel, etc.
    - bank_transfer
    - reinvest # convert to additional units
    - hold_in_account # keep in GTCX member account
```

### Member Account

Each member has an internal account:

```
┌─────────────────────────────────────────────────────────────────┐
│  MEMBER ACCOUNT                        [Tarkwa Gold Cooperative] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BALANCE                                                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Cash Balance:            $524.70                          │ │
│  │  Pending Dividends:       $373.50 (Jan 31 payment)         │ │
│  │  Units Held:              15,000                           │ │
│  │  Units Pending:           500 (participation reward)       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ACTIONS                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Withdraw    │  │  Reinvest    │  │  Transfer    │          │
│  │  to Mobile   │  │  Dividends   │  │  Units       │          │
│  │  Money       │  │  → Units     │  │  (in-class)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  TRANSACTION HISTORY                                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Jan 15   Dividend (Q4 2025)              + $373.50       │ │
│  │  Dec 20   Participation reward            + 500 units     │ │
│  │  Oct 15   Dividend (Q3 2025)              + $312.00       │ │
│  │  Oct 16   Withdrawn to MTN Mobile Money   - $312.00       │ │
│  │  Sep 01   Membership dues paid            - $100.00       │ │
│  │  ...                                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 5: Participation Rewards

Members earn units through active participation, not just purchase.

### Earning Activities

| Activity                     | Units Earned                       | Frequency     |
| ---------------------------- | ---------------------------------- | ------------- |
| **Producer verifications**   | 1 unit per 100 verifications       | Monthly       |
| **Trading volume**           | 1 unit per $10,000 traded          | Monthly       |
| **Governance participation** | 100 units per vote cast            | Per proposal  |
| **Referral**                 | 500 units per new member onboarded | One-time      |
| **Committee service**        | 1,000 units per quarter            | Quarterly     |
| **Feedback/improvement**     | 50-500 units                       | As recognized |

### Participation Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  PARTICIPATION REWARDS                   [Tarkwa Gold Cooperative]│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  THIS QUARTER                                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  Verifications (2,847)          284 units                  │ │
│  │  Trading ($142,000)             14 units                   │ │
│  │  Votes cast (3)                 300 units                  │ │
│  │  Committee service              1,000 units                │ │
│  │  ─────────────────────────────────────────                 │ │
│  │  TOTAL EARNED THIS QUARTER      1,598 units                │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  LIFETIME                                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Units purchased:             10,000                       │ │
│  │  Units earned:                 5,000                       │ │
│  │  Total units:                 15,000                       │ │
│  │                                                             │ │
│  │  33% of your ownership was EARNED through participation    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  LEADERBOARD (Producer Class)                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  1. Ghana Artisanal Mining Fed        12,400 units/quarter│ │
│  │  2. Rwanda Mining Cooperative          8,200 units/quarter│ │
│  │  3. Kenya Small-Scale Miners           5,100 units/quarter│ │
│  │  ...                                                       │ │
│  │  14. Tarkwa Gold Cooperative           1,598 units/quarter│ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 6: Member Onboarding

### Joining Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        JOIN GTCX                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1 of 5: SELECT YOUR CLASS                                 │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ○ PRODUCER                                              │   │
│  │    Mining cooperatives, farmer associations,             │   │
│  │    artisanal producers                                   │   │
│  │    Minimum: 1,000 units ($1,000)                        │   │
│  │                                                          │   │
│  │  ○ BUYER                                                 │   │
│  │    Refineries, traders, manufacturers,                   │   │
│  │    institutional investors                               │   │
│  │    Minimum: 50,000 units ($50,000)                      │   │
│  │                                                          │   │
│  │  ○ GOVERNMENT                                            │   │
│  │    National regulators, ministries,                      │   │
│  │    sovereign institutions                                │   │
│  │    By invitation / application                          │   │
│  │                                                          │   │
│  │  ○ FINANCIAL                                             │   │
│  │    Banks, DFIs, trade finance institutions              │   │
│  │    Minimum: 100,000 units ($100,000)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                                        [ CONTINUE → ]           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

     │
     ▼

┌─────────────────────────────────────────────────────────────────┐
│  Step 2 of 5: VERIFY YOUR ORGANIZATION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Organization Name                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Tarkwa Gold Mining Cooperative                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Registration Number                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ GH-COOP-2019-4521                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Country                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Ghana                                              [▼]   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Upload Registration Document                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [📄 cooperative_registration.pdf]         [Upload]      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                                        [ CONTINUE → ]           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

     │
     ▼

┌─────────────────────────────────────────────────────────────────┐
│  Step 3 of 5: ADD AUTHORIZED REPRESENTATIVES                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Primary Representative                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Name: Kwame Asante                                      │   │
│  │  Role: Chairman                                          │   │
│  │  TradePass ID: [Connect TradePass]                      │   │
│  │  Permissions: ☑ Can vote  ☑ Can transact               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [+ Add Another Representative]                                 │
│                                                                  │
│                                        [ CONTINUE → ]           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

     │
     ▼

┌─────────────────────────────────────────────────────────────────┐
│  Step 4 of 5: SELECT YOUR MEMBERSHIP                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Units to Purchase                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │   Minimum: 1,000 units ($1,000)                         │   │
│  │                                                          │   │
│  │   ┌────────────────────────────────────────────────┐    │   │
│  │   │  15,000 units                                   │    │   │
│  │   └────────────────────────────────────────────────┘    │   │
│  │                                                          │   │
│  │   = $15,000 one-time membership purchase                │   │
│  │   + $100/year membership dues                           │   │
│  │                                                          │   │
│  │   This will give you:                                   │   │
│  │   • 0.033% initial ownership (grows with participation) │   │
│  │   • Full voting rights in producer class                │   │
│  │   • Quarterly dividend eligibility                      │   │
│  │   • Access to SGX Ghana, AGX                           │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Payment Method                                                 │
│  ○ Bank Transfer  ○ Mobile Money  ○ USSD                       │
│                                                                  │
│                                        [ CONTINUE → ]           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

     │
     ▼

┌─────────────────────────────────────────────────────────────────┐
│  Step 5 of 5: REVIEW & CONFIRM                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MEMBERSHIP SUMMARY                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  Organization: Tarkwa Gold Mining Cooperative           │   │
│  │  Class: Producer                                        │   │
│  │  Units: 15,000                                          │   │
│  │  Initial Ownership: 0.033%                              │   │
│  │                                                          │   │
│  │  One-time payment: $15,000                              │   │
│  │  Annual dues: $100/year                                 │   │
│  │                                                          │   │
│  │  Representative: Kwame Asante (Chairman)                │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ☑ I have read and agree to the GTCX Membership Agreement      │
│  ☑ I confirm I am authorized to bind this organization         │
│  ☑ I understand membership units are non-refundable            │
│                                                                  │
│                              [ COMPLETE MEMBERSHIP ]            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 7: Technical Architecture

### Systems Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      GTCX MEMBER PLATFORM                                    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        MEMBER INTERFACES                             │   │
│  │                                                                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │  Web     │  │  Mobile  │  │  USSD    │  │  API     │            │   │
│  │  │  Portal  │  │  App     │  │  (SMS)   │  │  Access  │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │   │
│  │                                                                      │   │
│  │  Full-featured   iOS/Android   Feature      Enterprise              │   │
│  │  dashboard       native app    phones       integrations            │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        CORE SERVICES                                 │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │ Member Registry │  │   Governance    │  │   Payments      │     │   │
│  │  │                 │  │                 │  │                 │     │   │
│  │  │ • Onboarding    │  │ • Proposals     │  │ • Dues          │     │   │
│  │  │ • KYC/KYB       │  │ • Voting        │  │ • Dividends     │     │   │
│  │  │ • Units ledger  │  │ • Elections     │  │ • Withdrawals   │     │   │
│  │  │ • Certificates  │  │ • Results       │  │ • Mobile money  │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │  Participation  │  │ Communications  │  │   Reporting     │     │   │
│  │  │                 │  │                 │  │                 │     │   │
│  │  │ • Activity      │  │ • Notifications │  │ • Dashboards    │     │   │
│  │  │   tracking      │  │ • Announcements │  │ • Public stats  │     │   │
│  │  │ • Rewards calc  │  │ • Discussion    │  │ • Audit logs    │     │   │
│  │  │ • Leaderboards  │  │ • Translation   │  │ • Compliance    │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        DATA LAYER                                    │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │ Member Database │  │  Units Ledger   │  │  Audit Trail    │     │   │
│  │  │  (PostgreSQL)   │  │  (Immutable)    │  │  (Append-only)  │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     INTEGRATIONS                                     │   │
│  │                                                                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │TradePass │  │   SGX    │  │  Mobile  │  │  Banking │            │   │
│  │  │   KYC    │  │   AGX    │  │  Money   │  │   APIs   │            │   │
│  │  │          │  │   CRX    │  │  (MTN,   │  │          │            │   │
│  │  │          │  │          │  │  Airtel) │  │          │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Units Ledger (The "Not-Blockchain")

An immutable, auditable record of all unit transactions:

```yaml
ledger_entry:
  id: 'GTCX-LED-2025-0000001'
  timestamp: '2025-12-30T14:23:45Z'

  type: 'issuance' # issuance | transfer | reward | redemption

  from: 'GTCX-TREASURY' # or member_id
  to: 'GTCX-M-2025-00001' # member_id

  units: 15000
  class: 'producer'

  reason: 'initial_membership_purchase'
  reference: 'GTCX-PAY-2025-00234' # payment reference

  balances_after:
    treasury: 39,500,000
    member: 15,000

  hash: 'sha256:a3f2c...' # hash of this entry
  previous_hash: 'sha256:b4e1d...' # hash of previous entry

  # Signed by authorized systems
  signatures:
    - signer: 'registry_service'
      signature: '...'
    - signer: 'treasury_service'
      signature: '...'
```

**This gives you blockchain properties (immutability, auditability, cryptographic verification) without blockchain.**

---

## Part 8: Governance Calendar

### Annual Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    GTCX GOVERNANCE CALENDAR                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Q1 (JAN-MAR)                                                   │
│  ├── Jan 15: Q4 dividend declared                               │
│  ├── Jan 31: Q4 dividend paid                                   │
│  ├── Feb 1-28: Board nominations open                          │
│  ├── Mar 1-31: Annual budget proposal voting                   │
│  └── Mar 31: Fiscal year end                                   │
│                                                                  │
│  Q2 (APR-JUN)                                                   │
│  ├── Apr 1-30: Board elections                                 │
│  ├── Apr 15: Q1 dividend declared                               │
│  ├── Apr 30: Q1 dividend paid                                   │
│  ├── May 1: New board term begins                              │
│  ├── May 15: Annual Report published                           │
│  └── Jun 15: Annual Member Meeting (virtual)                   │
│                                                                  │
│  Q3 (JUL-SEP)                                                   │
│  ├── Jul 15: Q2 dividend declared                               │
│  ├── Jul 31: Q2 dividend paid                                   │
│  ├── Aug: Strategy proposals window                            │
│  └── Sep: Mid-year review published                            │
│                                                                  │
│  Q4 (OCT-DEC)                                                   │
│  ├── Oct 15: Q3 dividend declared                               │
│  ├── Oct 31: Q3 dividend paid                                   │
│  ├── Nov: Budget planning begins                               │
│  └── Dec: Next year proposals submitted                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Summary: What We're Building

| Component                 | What It Is                                                           |
| ------------------------- | -------------------------------------------------------------------- |
| **Member Registry**       | Digital record of all members, classes, representatives              |
| **Units Ledger**          | Immutable record of ownership (blockchain properties, no blockchain) |
| **Governance Platform**   | Proposals, voting, elections — all digital                           |
| **Member Accounts**       | Cash balances, dividends, payments                                   |
| **Participation Rewards** | Earn ownership through activity                                      |
| **Public Dashboard**      | Transparent ownership and governance for anyone to see               |
| **Multi-channel Access**  | Web, mobile, USSD, API                                               |

**This is modern, digital, transparent governance — without tokens, without blockchain, without regulatory complexity.**

---

## Development Priority

| Phase | Components                         | Timeline    |
| ----- | ---------------------------------- | ----------- |
| **1** | Member Registry + Onboarding       | Months 1-3  |
| **2** | Units Ledger + Ownership Dashboard | Months 2-4  |
| **3** | Basic Governance (voting)          | Months 4-6  |
| **4** | Payments (dues, dividends)         | Months 5-7  |
| **5** | Participation Rewards              | Months 6-8  |
| **6** | Elections + Advanced Governance    | Months 7-9  |
| **7** | Public Transparency Dashboard      | Months 8-10 |

---

Does this capture what you're looking for? This is real infrastructure for real governance — not a token, not a gimmick, just well-designed systems that make user ownership work.
