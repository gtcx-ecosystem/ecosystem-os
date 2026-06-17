---
title: 'Fundraising Engine Data Model'
status: current
date: 2026-06-16
owner: ecosystem-os
document_type: data-model
tier: strategic
tags: ['fundraising', 'data-model', 'crm', 'sources']
review_cycle: monthly
---

# Fundraising Engine Data Model

## Entity Ownership

| Entity | Source Of Truth V1 | Source Of Truth V2 |
| ------ | ----------------- | ----------------- |
| Source | `fundraising/sources/*.json` | Fundraising app DB |
| Organization | Watchlist JSON + ClickUp | Fundraising app DB |
| Signal | n8n/ClickUp comment | Fundraising app DB |
| Opportunity | ClickUp | Fundraising app DB + ClickUp sync |
| Contact | ClickUp/Gmail | Fundraising app DB |
| Event | Source DB/ClickUp | Fundraising app DB |
| Collateral asset | Drive/repo/ClickUp | Drive + app index |
| Approval | ClickUp comment | App audit log + ClickUp |
| Financial scenario | Financials docs/sheets | App/model workspace |

## Core Entities

### Source

Fields:

- `id`
- `name`
- `url`
- `source_type`
- `listener_type`
- `cadence`
- `priority`
- `regions`
- `funding_types`
- `themes`
- `capture_fields`
- `last_checked_at`
- `last_signal_at`
- `quality_score`

### Organization

Fields:

- `id`
- `name`
- `url`
- `organization_type`
- `countries`
- `regions`
- `themes`
- `relationship_owner`
- `warm_intro_path`
- `priority`
- `notes`

Organization types:

- Investor.
- DFI/MDB.
- Bank.
- Government/ministry/regulator.
- Trade body.
- Commodity buyer/refiner/trader/vault.
- Accelerator/program.
- Foundation/challenge.
- Event.
- Producer network.
- Technology resource.

### Signal

Fields:

- `id`
- `source_id`
- `source_url`
- `title`
- `excerpt`
- `detected_at`
- `organization_id`
- `deadline`
- `listener_type`
- `raw_reference`
- `status`

Signal statuses:

- New.
- Deduped.
- Converted to opportunity.
- Parked.
- Rejected.

### Opportunity

Fields align with `fundraising/schema/lead.schema.json`, plus:

- `opportunity_class`
- `strategic_value`
- `proof_needed`
- `collateral_needed`
- `approval_state`
- `clickup_task_id`
- `drive_folder_url`

### Collateral Asset

Fields:

- `id`
- `asset_type`
- `title`
- `audience`
- `opportunity_id`
- `product_match`
- `version`
- `status`
- `drive_url`
- `source_doc_url`
- `claims_review_status`
- `finance_review_status`
- `approved_by`

Asset statuses:

- Requested.
- Drafting.
- Review.
- Approved.
- Sent.
- Archived.

### Approval

Fields:

- `id`
- `opportunity_id`
- `requested_action`
- `artifact_url`
- `requested_by_agent`
- `approved_by`
- `approved_at`
- `decision`
- `risk_notes`

