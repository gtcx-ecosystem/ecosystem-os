---
title: 'API Endpoints'
status: current
date: 2026-05-27
owner: gtcx-docs
tier: operating
tags: [['documentation', 'gitbook']]
review_cycle: on-change
document_type: gitbook-chapter
role: engineering-agent
agent_id: agent://canon-os/2026-05-27/session-backfill
trust_score: 60
autonomy_level: permissioned
---

---

title: "API Endpoints"
status: "current"
date: "2026-05-24"
owner: "quality-evidence-lead"
role: "quality-evidence-lead"
tier: "operating"
tags: ["api"]
review_cycle: "annual"

---

# API Endpoints

Complete reference for all [Organization Name] API endpoints.

---

## [Index A] Endpoints

### List Countrie

```
GET /v1/[index-a]/countries
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `grade` | string | Filter by grade (A, B+, B-, C+, C, D) |
| `region` | string | Filter by region |

\*_Response:_

```json
{
  "data": [
    {
      "code": "RW",
      "name": "Rwanda",
      "score": 60,
      "grade": "C+",
      "trend": "up"
    }
  ]
}
```

### Get Countr

```
GET /v1/[index-a]/countries/{code}
```

\*_Response:_

```json
{
  "data": {
    "code": "[COUNTRY_CODE]",
    "name": "[Country Name]",
    "score": 62,
    "grade": "B-",
    "dimensions": {
      "physical": 60,
      "digital": 66,
      "regulatory": 58
    },
    "updated_at": "2025-01-15T00:00:00Z"
  }
}
```

---

## [Index C] Endpoints

### List Countrie

```
GET /v1/[index-c]/countries
```

### Get Countr

```
GET /v1/[index-c]/countries/{code}
```

---

## Alerts Endpoints

### List Alert

```
GET /v1/alerts
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `jurisdiction` | string | Filter by country/market code |
| `[domain_filter]` | string | Filter by [domain dimension — e.g., category, type, sector] |
| `since` | datetime | Alerts after this time |
| `limit` | integer | Max results (default 20) |

### Get Aler

```
GET /v1/alerts/{id}
```

---

## [Intelligence Product] Endpoints

### List Regulation

```
GET /v1/[intelligence-product]/regulations
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `jurisdiction` | string | Filter by country |
| `topic` | string | Filter by topic |
| `effective_after` | date | Effective date filter |

### Get Regulatio

```
GET /v1/[intelligence-product]/regulations/{id}
```

### List Change

```
GET /v1/[intelligence-product]/changes
```

---

## Entities Endpoints

### Search Entitie

```
GET /v1/entities
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Search query |
| `type` | string | Entity type |
| `jurisdiction` | string | Country filter |

### Get Entit

```
GET /v1/entities/{id}
```

---

## Pagination

All list endpoints support pagination:

```
GET /v1/[index-a]/countries?page=2&per_page=20
```

Response includes pagination metadata

```json
{
  "data": [...],
  "meta": {
    "page": 2,
    "per_page": 20,
    "total": 54,
    "total_pages": 3
  }
}
```
