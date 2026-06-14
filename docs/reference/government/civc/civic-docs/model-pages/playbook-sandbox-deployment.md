---

title: "Playbook Section: Sandbox Deployment"
status: "current"
date: "2026-05-26"

---

# Playbook Section: Sandbox Deployment

> **Regulator Playbook** | Phase 2: Secure Sandbox Setup

---

## Overview

This section guides technical teams through deploying a secure sandbox environment for validating GTCX infrastructure before field pilot. The sandbox runs in an isolated environment with synthetic data, enabling regulators to test workflows, train staff, and validate policy rules without production risk.

**Duration:** 4 weeks
**Team Required:** IT Lead, Security Officer, 2-3 Technical Staff
**Prerequisites:** Completed Phase 1 (Discovery & Alignment)

---

## Objectives

By the end of this phase, you will have:

- [ ] Sovereign Compliance Hub deployed in staging environment
- [ ] Synthetic dataset loaded representing realistic scenarios
- [ ] Core workflows validated by regulator stakeholders
- [ ] Staff trained on basic system operation
- [ ] Security assessment completed and documented

---

## Week 1: Infrastructure Setup

### Day 1-2: Environment Provisioning

**Task:** Provision isolated infrastructure for sandbox deployment

**Option A: Government Cloud**

```bash
# Requirements
- Isolated VPC (no public internet egress)
- 4 vCPU, 16GB RAM, 100GB SSD (minimum)
- PostgreSQL 15+ compatible database
- Redis 7+ for caching
- SSL certificates for internal domains
```

**Option B: On-Premise**

```bash
# Requirements
- Dedicated server or VM cluster
- Same compute requirements as above
- Network isolation from production systems
- Local DNS for internal service discovery
```

> ⚙️ **Technical Note:** Both options maintain data sovereignty. Choose based on existing infrastructure and security policies.

### Day 3-4: Core Services Deployment

**Task:** Deploy GTCX core services using provided containers

```bash
# 1. Pull deployment bundle
wget https://deploy.gtcx.org/sandbox/v1.2.0/bundle.tar.gz

# 2. Verify checksum
sha256sum -c bundle.tar.gz.sha256

# 3. Extract and configure
tar -xzf bundle.tar.gz
cd gtcx-sandbox
cp .env.example .env

# 4. Edit configuration
nano .env
# Set: DATABASE_URL, REDIS_URL, JWT_SECRET, ADMIN_EMAIL
```

**Service Stack:**
| Service | Port | Purpose |
|---------|:----:|---------|
| API Gateway | 8080 | External API access |
| Rules Engine | 8081 | Policy evaluation |
| Audit Service | 8082 | Tamper-evident logging |
| Admin Dashboard | 8443 | Web interface |

### Day 5: Connectivity Validation

**Task:** Verify all services communicate correctly

```bash
# Run health checks
./03-platform/scripts/health-check.sh

# Expected output:
# ✓ Database connection: OK
# ✓ Redis connection: OK
# ✓ API Gateway: OK
# ✓ Rules Engine: OK
# ✓ Audit Service: OK
# ✓ Admin Dashboard: OK
```

**Troubleshooting:**
| Issue | Likely Cause | Resolution |
|-------|--------------|------------|
| Database timeout | Firewall rules | Open port 5432 in VPC |
| Redis connection refused | Service not started | `systemctl start redis` |
| SSL certificate error | Cert not trusted | Add CA to trust store |

---

## Week 2: Data and Configuration

### Day 6-7: Synthetic Data Loading

**Task:** Load realistic test data representing your commodity sector

**Data Categories:**

```
┌─────────────────────────────────────────────────────────────────┐
│                     SYNTHETIC DATA STRUCTURE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  OPERATORS (200 records)                                        │
│  ─────────────────────                                           │
│  • 150 artisanal miners (various compliance levels)             │
│  • 30 licensed traders                                          │
│  • 15 registered refiners                                       │
│  • 5 export houses                                              │
│                                                                  │
│  SITES (100 records)                                            │
│  ────────────────────                                            │
│  • GPS coordinates (anonymized real locations)                  │
│  • License status (active, expired, pending)                    │
│  • Production capacity estimates                                │
│                                                                  │
│  TRANSACTIONS (1,000 records)                                   │
│  ───────────────────────────                                     │
│  • Production events                                            │
│  • Custody transfers                                            │
│  • Export declarations                                          │
│                                                                  │
│  COMPLIANCE SCORES (200 records)                                │
│  ──────────────────────────────                                  │
│  • Full range: 20-95 (various compliance levels)                │
│  • Domain breakdowns (environmental, labor, etc.)               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Loading Command:**

```bash
# Load synthetic dataset
./03-platform/scripts/load-synthetic-data.sh --dataset=gold-asm-v1

# Verify record counts
./03-platform/scripts/verify-data.sh
```

### Day 8-9: Policy Rules Configuration

**Task:** Configure compliance rules matching your regulatory framework

**Example Rule: License Validity Check**

```json
{
  "rule_id": "LICENSE-001",
  "name": "Valid Operating License Required",
  "description": "All operators must have valid, non-expired license",
  "logic": {
    "and": [
      { "!=": [{ "var": "operator.license_number" }, null] },
      { ">": [{ "var": "operator.license_expiry" }, { "now": [] }] }
    ]
  },
  "severity": "critical",
  "action": "block_transaction",
  "message": "Transaction blocked: Invalid or expired license"
}
```

**Example Rule: Environmental Compliance Threshold**

```json
{
  "rule_id": "ENV-001",
  "name": "Minimum Environmental Score",
  "description": "Export requires minimum environmental compliance",
  "logic": {
    ">=": [{ "var": "operator.gci_scores.environmental" }, 65]
  },
  "severity": "warning",
  "action": "flag_for_review",
  "message": "Environmental compliance below export threshold"
}
```

> 📋 **Policy Recommendation:** Start with 5-10 critical rules. Add complexity after validating core workflows.

### Day 10: Integration Points Setup

**Task:** Configure connections to test versions of existing systems

| System           | Integration Type    | Sandbox Approach              |
| ---------------- | ------------------- | ----------------------------- |
| License Registry | API (read)          | Mock API with synthetic data  |
| Tax Authority    | Webhook (push)      | Log-only endpoint             |
| Export System    | API (bidirectional) | Sandbox instance if available |

```bash
# Configure mock integrations
./03-platform/scripts/setup-mocks.sh

# Test integration endpoints
./03-platform/scripts/test-integrations.sh
```

---

## Week 3: Workflow Validation

### Day 11-12: Core Workflow Testing

**Task:** Execute end-to-end workflows with regulator stakeholders

**Workflow 1: New Operator Registration**

```
┌──────────────────────────────────────────────────────────────────┐
│  WORKFLOW: OPERATOR REGISTRATION                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Step 1: Operator submits registration via mobile app            │
│          ↓                                                        │
│  Step 2: System validates against license registry               │
│          ↓                                                        │
│  Step 3: If valid → Create digital identity (TradePass)          │
│          If invalid → Return error with guidance                 │
│          ↓                                                        │
│  Step 4: Operator appears in admin dashboard                     │
│          ↓                                                        │
│  Step 5: Regulator can view, approve, or flag                    │
│                                                                   │
│  ✓ VALIDATION CRITERIA:                                          │
│    • Registration completes in <30 seconds                       │
│    • Invalid licenses rejected with clear message                │
│    • Dashboard shows new operator within 5 seconds               │
│    • Audit trail captures all steps                              │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Workflow 2: Transaction Compliance Check**

```
┌──────────────────────────────────────────────────────────────────┐
│  WORKFLOW: TRANSACTION COMPLIANCE                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Step 1: Field operator records transaction (sale/transfer)      │
│          ↓                                                        │
│  Step 2: Rules engine evaluates all applicable policies          │
│          ↓                                                        │
│  Step 3: If compliant → Transaction approved, recorded           │
│          If violation → Transaction flagged/blocked              │
│          ↓                                                        │
│  Step 4: Alert generated for flagged transactions                │
│          ↓                                                        │
│  Step 5: Regulator reviews in dashboard, takes action            │
│                                                                   │
│  ✓ VALIDATION CRITERIA:                                          │
│    • Rules evaluate in <200ms                                    │
│    • Correct rules fire for test scenarios                       │
│    • Alerts appear in dashboard immediately                      │
│    • Block actions prevent transaction completion                │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Day 13-14: Edge Case Testing

**Task:** Test system behavior under unusual conditions

| Scenario            | Expected Behavior                       | Test Method                                       |
| ------------------- | --------------------------------------- | ------------------------------------------------- |
| Offline device sync | Queue transactions, sync when connected | Disable network, queue 10 transactions, reconnect |
| Conflicting rules   | Apply strictest rule                    | Create rules with contradictory outcomes          |
| High volume         | Maintain <500ms response                | Load test with 100 concurrent requests            |
| Invalid data        | Reject with clear error                 | Submit malformed requests                         |
| Unauthorized access | Block and log attempt                   | Attempt API call with invalid token               |

### Day 15: Stakeholder Sign-off

**Task:** Obtain formal acceptance from regulator stakeholders

**Validation Checklist:**

- [ ] All core workflows execute correctly
- [ ] Policy rules reflect regulatory intent
- [ ] Dashboard provides required visibility
- [ ] Alert system functions as expected
- [ ] Performance meets requirements
- [ ] Security assessment completed

**Sign-off Document:**

```
SANDBOX VALIDATION ACCEPTANCE
────────────────────────────────────────────────────
Date: _______________
Organization: _______________

We confirm that the GTCX sandbox environment has been
validated and meets the requirements for proceeding
to field pilot.

☐ Core workflows validated
☐ Policy rules approved
☐ Staff training completed
☐ Security assessment passed

Authorized Signatory: _______________
Title: _______________
```

---

## Week 4: Training and Documentation

### Day 16-17: Staff Training

**Task:** Train key personnel on system operation

**Training Program:**
| Module | Duration | Audience | Content |
|--------|:--------:|----------|---------|
| System Overview | 2 hours | All staff | Architecture, concepts |
| Dashboard Operations | 4 hours | Operators | Daily tasks, reports |
| Alert Response | 2 hours | Supervisors | Escalation, investigation |
| Policy Management | 4 hours | IT staff | Rule configuration |
| Security Protocols | 2 hours | All staff | Access, incident response |

### Day 18-19: Documentation Handover

**Task:** Ensure all operational documentation is complete

**Required Documents:**

- [ ] System architecture diagram
- [ ] API endpoint catalog
- [ ] Policy rules reference
- [ ] Troubleshooting guide
- [ ] Escalation procedures
- [ ] Backup and recovery procedures

### Day 20: Pilot Readiness Assessment

**Task:** Confirm readiness to proceed to field pilot

**Readiness Checklist:**

```
PILOT READINESS ASSESSMENT
────────────────────────────────────────────────────
☐ Infrastructure stable for 7+ days
☐ All critical bugs resolved
☐ Staff trained and certified
☐ Documentation complete
☐ Security assessment passed
☐ Stakeholder sign-off obtained
☐ Pilot sites identified
☐ Field devices procured
☐ Support procedures established
☐ Rollback plan documented

RECOMMENDATION: ☐ Proceed to Pilot  ☐ Extend Sandbox
```

---

## Deliverables Checklist

| Deliverable                  | Owner            | Due    | Status |
| ---------------------------- | ---------------- | ------ | :----: |
| Deployed sandbox environment | IT Lead          | Week 1 |   ☐    |
| Synthetic data loaded        | Data Team        | Week 2 |   ☐    |
| Policy rules configured      | Policy Lead      | Week 2 |   ☐    |
| Workflow validation report   | QA Lead          | Week 3 |   ☐    |
| Stakeholder sign-off         | Project Manager  | Week 3 |   ☐    |
| Staff training completion    | Training Lead    | Week 4 |   ☐    |
| Operational documentation    | Technical Writer | Week 4 |   ☐    |
| Pilot readiness assessment   | Project Manager  | Week 4 |   ☐    |

---

## Support Resources

### Technical Support

- 📧 sandbox-support@gtcx.org
- 💬 Slack: #gtcx-sandbox-support
- 📞 Emergency: +1 (305) 555-0199

### Documentation

- [API Reference](./README.md)
- [Security Framework](./README.md)
- [Troubleshooting Guide](./README.md)

---

## Next Phase

Upon successful completion of sandbox validation, proceed to:

**📘 [Phase 3: Field Pilot](./README.md)**

---

_Regulator Playbook | Phase 2: Sandbox Deployment | Version 1.0 | January 2026_
