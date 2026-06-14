---
title: 'System Status'
status: 'current'
date: '2026-05-27'
owner: 'gtcx-docs'
role: 'protocol-architect'
agent_id: 'agent://canon-os/2026-05-27/session-backfill'
trust_score: 60
autonomy_level: 'permissioned'
tier: operating
tags: ['documentation', 'gitbook']
review_cycle: 'on-change'
---

---

title: "System Status"
status: "current"
date: "2026-05-24"
owner: "quality-evidence-lead"
role: "quality-evidence-lead"
tier: "operating"
tags: ["documentation"]
review_cycle: "annual"

---

# System Status

Monitor [Organization Name] service availability.

---

## Status Page

**Live status**: [status.[organization-url]](https://status.[organization-url])

Subscribe to status updates via email or RSS.

---

## Service Level Targets

| Service              | Target Uptime | Target Latency    |
| -------------------- | ------------- | ----------------- |
| **Web Dashboard**    | 99.9%         | <2s page load     |
| **[Platform B] API** | 99.9%         | <100ms (p50)      |
| **Alert Delivery**   | 99.9%         | <5 min (breaking) |
| **Webhooks**         | 99.9%         | <5s delivery      |

---

## Current Status

Check [status.[organization-url]](https://status.[organization-url]) for real-time status of:

- Web application
- API endpoints
- Alert delivery (email, SMS, WhatsApp)
- Webhook delivery
- Data pipelines

---

## Incident Communication

During incidents:

1. Status page updated within 5 minutes
2. Email notification to affected users
3. Regular updates until resolution
4. Post-incident report within 48 hours

---

## Scheduled Maintenance

Maintenance windows:

- **Preferred**: Sundays 02:00-06:00 UTC
- **Notice**: 72 hours advance notification
- **Duration**: Typically <1 hour

Subscribe to maintenance notices on the status page.

---

## Report an Issue

If you're experiencing problems not reflected on the status page:

1. Check [status.[organization-url]](https://status.[organization-url]) first
2. Contact support@[organization-url]
3. Include: What you were doing, error messages, screenshots
