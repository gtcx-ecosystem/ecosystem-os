---

title: 'Reference Vxa Api'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['guides', 'how-to']
review_cycle: 'on-change'

---

# VXA Inspection API Reference

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

> **Note:** API reference — exempt from architectural doc length limit.

> **Version:** v1.0 | **Base URL:** `https://api.complianceos.io/vxa/v1`

## Executive Summary

> **Status:** Current

## Overview

> The VXA Inspection API enables programmatic creation, management, and retrieval of inspection records. Use this API to integrate VXA verification into your existing systems.

### Authentication

All requests require Bearer token authentication:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.complianceos.io/vxa/v1/inspections
```

API keys are available in your [Enterprise Dashboard](https://app.complianceos.io/settings/api).

### Rate Limits

| Plan       | Requests/minute | Requests/day |
| ---------- | :-------------: | :----------: |
| Growth     |       60        |    10,000    |
| Scale      |       300       |    50,000    |
| Enterprise |      1,000      |  Unlimited   |

## Inspections

### Create Inspection

Creates a new inspection record. Returns the inspection ID for tracking.

```
POST /inspections
```

#### Request Body

| Field            | Type     | Required | Description                                    |
| ---------------- | -------- | :------: | ---------------------------------------------- |
| `site_id`        | string   |  [Done]  | Unique identifier for the inspection site      |
| `protocol_id`    | string   |  [Done]  | Inspection protocol to use (e.g., `core12-v1`) |
| `inspector_id`   | string   |  [Done]  | Assigned inspector's user ID                   |
| `scheduled_date` | ISO 8601 |  [Done]  | Scheduled inspection date                      |
| `priority`       | string   |          | `low`, `normal`, `high`, `urgent`              |
| `notes`          | string   |          | Internal notes for inspector                   |
| `metadata`       | object   |          | Custom key-value pairs                         |

#### Example Request

```bash
curl -X POST https://api.complianceos.io/vxa/v1/inspections \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "site_id": "SITE-GH-00123",
    "protocol_id": "core12-v1",
    "inspector_id": "USR-00456",
    "scheduled_date": "2026-02-15T09:00:00Z",
    "priority": "normal",
    "notes": "First verification for this cooperative",
    "metadata": {
      "client_ref": "PO-2026-789",
      "region": "Ashanti"
    }
  }'
```

#### Example Response

```json
{
  "id": "INS-2026-00789",
  "status": "scheduled",
  "site_id": "SITE-GH-00123",
  "protocol_id": "core12-v1",
  "inspector_id": "USR-00456",
  "scheduled_date": "2026-02-15T09:00:00Z",
  "created_at": "2026-01-28T14:30:00Z",
  "updated_at": "2026-01-28T14:30:00Z",
  "links": {
    "self": "/inspections/INS-2026-00789",
    "site": "/sites/SITE-GH-00123",
    "inspector": "/users/USR-00456"
  }
}
```

#### Response Codes

| Code  | Description                          |
| :---: | ------------------------------------ |
| `201` | Inspection created successfully      |
| `400` | Invalid request body                 |
| `401` | Authentication required              |
| `403` | Insufficient permissions             |
| `404` | Site or inspector not found          |
| `422` | Validation error (see response body) |

### Get Inspection

Retrieves details of a specific inspection.

```
GET /inspections/{inspection_id}
```

#### Path Parameters

| Parameter       | Type   | Description                            |
| --------------- | ------ | -------------------------------------- |
| `inspection_id` | string | Inspection ID (e.g., `INS-2026-00789`) |

#### Query Parameters

| Parameter | Type   | Default | Description                                     |
| --------- | ------ | ------- | ----------------------------------------------- |
| `include` | string |         | Comma-separated: `evidence`, `scores`, `report` |

#### Example Request

```bash
curl https://api.complianceos.io/vxa/v1/inspections/INS-2026-00789?include=scores \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response

```json
{
  "id": "INS-2026-00789",
  "status": "completed",
  "site_id": "SITE-GH-00123",
  "protocol_id": "core12-v1",
  "inspector_id": "USR-00456",
  "scheduled_date": "2026-02-15T09:00:00Z",
  "started_at": "2026-02-15T09:15:00Z",
  "completed_at": "2026-02-15T11:45:00Z",
  "duration_minutes": 150,
  "scores": {
    "overall": 78,
    "level": "standard",
    "domains": {
      "D01": { "score": 85, "status": "pass" },
      "D02": { "score": 72, "status": "pass" },
      "D03": { "score": 80, "status": "pass" },
      "D04": { "score": 88, "status": "pass" },
      "D05": { "score": 65, "status": "pass" },
      "D06": { "score": 75, "status": "pass" },
      "D07": { "score": 82, "status": "pass" },
      "D08": { "score": 70, "status": "pass" },
      "D09": { "score": 78, "status": "pass" },
      "D10": { "score": 68, "status": "pass" },
      "D11": { "score": 85, "status": "pass" },
      "D12": { "score": 72, "status": "pass" }
    }
  },
  "evidence_count": 47,
  "findings_count": 12,
  "created_at": "2026-01-28T14:30:00Z",
  "updated_at": "2026-02-15T12:00:00Z"
}
```

### List Inspections

Returns a paginated list of inspections matching the filter criteria.

```
GET /inspections
```

#### Query Parameters

| Parameter      | Type     | Default           | Description                                                            |
| -------------- | -------- | ----------------- | ---------------------------------------------------------------------- |
| `status`       | string   |                   | Filter by status: `scheduled`, `in_progress`, `completed`, `cancelled` |
| `site_id`      | string   |                   | Filter by site                                                         |
| `inspector_id` | string   |                   | Filter by inspector                                                    |
| `protocol_id`  | string   |                   | Filter by protocol                                                     |
| `from_date`    | ISO 8601 |                   | Scheduled date range start                                             |
| `to_date`      | ISO 8601 |                   | Scheduled date range end                                               |
| `page`         | integer  | 1                 | Page number                                                            |
| `per_page`     | integer  | 25                | Results per page (max 100)                                             |
| `sort`         | string   | `-scheduled_date` | Sort field (prefix `-` for descending)                                 |

#### Example Request

```bash
curl "https://api.complianceos.io/vxa/v1/inspections?status=completed&from_date=2026-01-01&per_page=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response

```json
{
  "data": [
    {
      "id": "INS-2026-00789",
      "status": "completed",
      "site_id": "SITE-GH-00123",
      "scheduled_date": "2026-02-15T09:00:00Z",
      "overall_score": 78
    },
    {
      "id": "INS-2026-00788",
      "status": "completed",
      "site_id": "SITE-GH-00124",
      "scheduled_date": "2026-02-14T09:00:00Z",
      "overall_score": 82
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_pages": 5,
    "total_count": 47
  }
}
```

### Update Inspection

Updates an existing inspection. Only certain fields can be modified based on status.

```
PATCH /inspections/{inspection_id}
```

#### Modifiable Fields by Status

| Field            | `scheduled` | `in_progress` | `completed` |
| ---------------- | :---------: | :-----------: | :---------: |
| `scheduled_date` |   [Done]    |   [Missing]   |  [Missing]  |
| `inspector_id`   |   [Done]    |   [Missing]   |  [Missing]  |
| `priority`       |   [Done]    |    [Done]     |  [Missing]  |
| `notes`          |   [Done]    |    [Done]     |   [Done]    |
| `metadata`       |   [Done]    |    [Done]     |   [Done]    |
| `status`         |   [Done]    |    [Done]     |  [Missing]  |

#### Example Request

```bash
curl -X PATCH https://api.complianceos.io/vxa/v1/inspections/INS-2026-00789 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "scheduled_date": "2026-02-20T09:00:00Z",
    "notes": "Rescheduled per client request"
  }'
```

## Evidence

### Upload Evidence

Uploads evidence file and associates it with an inspection and control.

```
POST /inspections/{inspection_id}/evidence
```

#### Request (Multipart Form)

| Field           | Type     | Required | Description                                                     |
| --------------- | -------- | :------: | --------------------------------------------------------------- |
| `file`          | binary   |  [Done]  | Evidence file (max 50MB)                                        |
| `control_id`    | string   |  [Done]  | Core12 control ID (e.g., `D01-C01`)                             |
| `evidence_type` | string   |  [Done]  | `documentary`, `visual`, `declarative`, `testimonial`, `sensor` |
| `description`   | string   |          | Description of the evidence                                     |
| `captured_at`   | ISO 8601 |          | When evidence was captured (defaults to upload time)            |
| `location`      | object   |          | `{ "lat": 5.6037, "lng": -0.1870 }`                             |

#### Example Request

```bash
curl -X POST https://api.complianceos.io/vxa/v1/inspections/INS-2026-00789/evidence \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@mining_license.pdf" \
  -F "control_id=D01-C01" \
  -F "evidence_type=documentary" \
  -F "description=Ghana EPA Environmental Permit"
```

#### Example Response

```json
{
  "id": "EV-2026-00123456",
  "inspection_id": "INS-2026-00789",
  "control_id": "D01-C01",
  "evidence_type": "documentary",
  "file": {
    "name": "mining_license.pdf",
    "size_bytes": 245678,
    "mime_type": "application/pdf",
    "hash": "sha256:abc123def456..."
  },
  "analysis": {
    "status": "pending",
    "quality_score": null,
    "tamper_check": null
  },
  "created_at": "2026-02-15T10:30:00Z"
}
```

### Get Evidence

Retrieves evidence details and analysis results.

```
GET /evidence/{evidence_id}
```

#### Example Response

```json
{
  "id": "EV-2026-00123456",
  "inspection_id": "INS-2026-00789",
  "control_id": "D01-C01",
  "evidence_type": "documentary",
  "file": {
    "name": "mining_license.pdf",
    "size_bytes": 245678,
    "mime_type": "application/pdf",
    "hash": "sha256:abc123def456...",
    "download_url": "https://storage.complianceos.io/evidence/EV-2026-00123456?token=xyz"
  },
  "analysis": {
    "status": "completed",
    "quality_score": 0.92,
    "tamper_check": "passed",
    "ocr_extracted": {
      "document_type": "Environmental Permit",
      "issuing_authority": "Ghana Environmental Protection Agency",
      "issue_date": "2025-06-15",
      "expiry_date": "2028-06-14",
      "permit_number": "EPA/MIN/2025/00456"
    },
    "flags": []
  },
  "metadata": {
    "captured_at": "2026-02-15T10:25:00Z",
    "location": {
      "lat": 5.6037,
      "lng": -0.187,
      "accuracy_meters": 5
    }
  },
  "created_at": "2026-02-15T10:30:00Z"
}
```

## Reports

### Generate Report

Generates an inspection report in the specified format.

```
POST /inspections/{inspection_id}/reports
```

#### Request Body

| Field              | Type    | Required | Description                               |
| ------------------ | ------- | :------: | ----------------------------------------- |
| `format`           | string  |  [Done]  | `pdf`, `xlsx`, `json`                     |
| `template`         | string  |          | Report template ID (defaults to standard) |
| `include_evidence` | boolean |          | Include evidence attachments (PDF only)   |
| `language`         | string  |          | Report language (ISO 639-1)               |

#### Example Request

```bash
curl -X POST https://api.complianceos.io/vxa/v1/inspections/INS-2026-00789/reports \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "format": "pdf",
    "include_evidence": true,
    "language": "en"
  }'
```

#### Example Response

```json
{
  "id": "RPT-2026-00456",
  "inspection_id": "INS-2026-00789",
  "format": "pdf",
  "status": "generating",
  "estimated_completion": "2026-02-15T12:05:00Z",
  "links": {
    "status": "/reports/RPT-2026-00456",
    "download": null
  }
}
```

### Get Report

Retrieves report status and download link.

```
GET /reports/{report_id}
```

#### Example Response (Completed)

```json
{
  "id": "RPT-2026-00456",
  "inspection_id": "INS-2026-00789",
  "format": "pdf",
  "status": "completed",
  "file": {
    "name": "INS-2026-00789_Report.pdf",
    "size_bytes": 1245678,
    "download_url": "https://storage.complianceos.io/reports/RPT-2026-00456?token=xyz",
    "expires_at": "2026-02-22T12:00:00Z"
  },
  "created_at": "2026-02-15T12:00:00Z",
  "completed_at": "2026-02-15T12:03:00Z"
}
```

## Webhooks

Subscribe to real-time events for inspection lifecycle updates.

### Event Types

| Event                  | Description                |
| ---------------------- | -------------------------- |
| `inspection.created`   | New inspection scheduled   |
| `inspection.started`   | Inspector began inspection |
| `inspection.completed` | Inspection finished        |
| `inspection.cancelled` | Inspection cancelled       |
| `evidence.uploaded`    | New evidence added         |
| `evidence.analyzed`    | AI analysis completed      |
| `report.generated`     | Report ready for download  |
| `score.updated`        | GCI score changed          |

### Webhook Payload

```json
{
  "id": "evt_abc123",
  "type": "inspection.completed",
  "created_at": "2026-02-15T11:45:00Z",
  "data": {
    "inspection_id": "INS-2026-00789",
    "site_id": "SITE-GH-00123",
    "overall_score": 78,
    "level": "standard"
  }
}
```

### Verifying Webhooks

All webhooks include a signature header for verification:

```
X-ComplianceOS-Signature: sha256=abc123...
```

Verify using your webhook secret:

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "validation_error",
    "message": "The request body contains invalid data",
    "details": [
      {
        "field": "scheduled_date",
        "message": "Must be a future date"
      }
    ]
  }
}
```

### Error Codes

| Code                      | HTTP Status | Description                    |
| ------------------------- | :---------: | ------------------------------ |
| `authentication_required` |     401     | Missing or invalid API key     |
| `permission_denied`       |     403     | API key lacks required scope   |
| `not_found`               |     404     | Resource does not exist        |
| `validation_error`        |     422     | Request body validation failed |
| `rate_limited`            |     429     | Too many requests              |
| `server_error`            |     500     | Internal server error          |

## SDKs

Official SDKs available:

| Language   | Package                         | Documentation                                |
| ---------- | ------------------------------- | -------------------------------------------- |
| Python     | `pip install complianceos`      | Python SDK Docs (document not yet available) |
| JavaScript | `npm install @complianceos/sdk` | JS SDK Docs (document not yet available)     |
| Ruby       | `gem install complianceos`      | Ruby SDK Docs (document not yet available)   |

## Support

- **API Status:** [status.complianceos.io](https://status.complianceos.io)
- **Developer Forum:** [community.complianceos.io](https://community.complianceos.io)
- **Email:** api-support@complianceos.io

_Last updated: January 2026_

## Negative Scope

This document does **not** cover:

- **VIA/VXA mobile application architecture**: Conceptual framework, system components, and integration with GTCX infrastructure are detailed in [VIA/VXA Overview](via-vxa-overview.md)
- **VIA education platform and curriculum**: Adaptive learning, multilingual instruction, and compliance training workflows are covered in [VIA (Virtual Instructor Agent)](via-virtual-instructor-agent.md)
- **Implementation and deployment guides**: Deployment timelines, stakeholder-specific rollout, and offline capability configuration are described in [VIA/VXA Implementation](via-vxa-implementation.md)
