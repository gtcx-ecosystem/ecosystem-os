---
title: 'Fundraising Operating Foundation Readiness'
status: current
date: 2026-06-19
owner: ecosystem-os
document_type: readiness-witness
tier: tactical
tags: ['fundraising', 'clickup', 'gmail', 'drive', 'readiness']
review_cycle: weekly
pmInitiative: INIT-ECOSYSTEM-VENTURE
pmStory: ECO-VEN-FR-001
---

# Fundraising Operating Foundation Readiness

This witness defines the repo-owned completion boundary for
`ECO-VEN-FR-001`. `ecosystem-os` owns the operating contract, templates,
authority gates, and required runtime variables. Live ClickUp, Gmail, Calendar,
and Drive IDs are private runtime configuration and must not be committed.

## Readiness Scope

| Foundation task | Repo-owned evidence | Runtime activation evidence |
| --------------- | ------------------- | --------------------------- |
| Confirm `hello@gtcx.trade` alias map | [`../workflows/agent-email-operations.md`](../workflows/agent-email-operations.md) and [`../workflows/google-workspace-clickup-integration.md`](../workflows/google-workspace-clickup-integration.md) define mailbox labels, routing, and approval gates | Private Google Workspace alias and filter configuration |
| Create fundraising Drive folder structure | [`../workflows/google-workspace-clickup-integration.md`](../workflows/google-workspace-clickup-integration.md) defines folder naming and folder-link field usage | Private Drive folder IDs and permissions |
| Create ClickUp Space/List | [`../workflows/clickup-setup-contract.md`](../workflows/clickup-setup-contract.md) defines Space, folders, master list, statuses, fields, form, and views | Private ClickUp workspace, Space, list, and custom-field IDs |
| Configure statuses and custom fields | [`../workflows/clickup-setup-contract.md`](../workflows/clickup-setup-contract.md) defines required statuses and fields | ClickUp fields created and IDs copied to private runtime config |
| Load task templates | [`../team/clickup-task-templates.md`](../team/clickup-task-templates.md) defines opportunity, outreach, collateral, application, finance, meeting prep, and daily brief templates | Templates loaded into ClickUp or mirrored as reusable task descriptions |
| Publish authority matrix in ClickUp | [`../team/authority-matrix.md`](../team/authority-matrix.md) defines agent permissions, human approvals, escalation triggers, and approval record format | Authority matrix linked in ClickUp Space/List description or pinned doc |

## Private Runtime Variables

The following values are required to activate the operating foundation. Store
them in private n8n, local secret, or workspace configuration only.

| Variable | Required by | Purpose |
| -------- | ----------- | ------- |
| `GTCX_FUNDRAISING_MAILBOX` | Gmail workflows | Role mailbox, expected value `hello@gtcx.trade` or approved alias |
| `GTCX_FUNDRAISING_GMAIL_LABEL_INBOUND` | Gmail workflows | Inbound routing label |
| `GTCX_FUNDRAISING_GMAIL_LABEL_GRANTS` | Gmail workflows | Grants routing label |
| `GTCX_FUNDRAISING_GMAIL_LABEL_INVESTORS` | Gmail workflows | Investor routing label |
| `GTCX_FUNDRAISING_GMAIL_LABEL_PARTNERS` | Gmail workflows | Partner routing label |
| `GTCX_FUNDRAISING_GMAIL_LABEL_PILOTS` | Gmail workflows | Pilot routing label |
| `GTCX_FUNDRAISING_CALENDAR_ID` | Calendar workflows | Shared fundraising calendar |
| `GTCX_FUNDRAISING_DRIVE_ROOT_ID` | Drive workflows | Root fundraising folder |
| `CLICKUP_TEAM_ID` | ClickUp workflows | Workspace ID |
| `CLICKUP_SPACE_ID` | ClickUp workflows | `GTCX Fundraising Engine` Space |
| `CLICKUP_LIST_ID_FUNDRAISING_OPPORTUNITIES` | ClickUp workflows | Master opportunities list |
| `CLICKUP_FIELD_CHANNEL` | ClickUp workflows | Channel field UUID |
| `CLICKUP_FIELD_FUNDING_TYPE` | ClickUp workflows | Funding Type field UUID |
| `CLICKUP_FIELD_PRODUCT_MATCH` | ClickUp workflows | Product Match field UUID |
| `CLICKUP_FIELD_FIT_SCORE` | ClickUp workflows | Fit Score field UUID |
| `CLICKUP_FIELD_SOURCE_URL` | ClickUp workflows | Source URL field UUID |
| `CLICKUP_FIELD_GMAIL_THREAD_ID` | ClickUp workflows | Gmail Thread ID field UUID |
| `CLICKUP_FIELD_CALENDAR_EVENT_ID` | ClickUp workflows | Calendar Event ID field UUID |
| `CLICKUP_FIELD_DRIVE_FOLDER_URL` | ClickUp workflows | Drive Folder URL field UUID |

## Activation Checklist

1. Create or confirm the fundraising mailbox alias and labels.
2. Create the shared fundraising calendar.
3. Create the fundraising Drive root and template folder structure.
4. Create the ClickUp Space `GTCX Fundraising Engine`.
5. Create the master list `Fundraising Opportunities`.
6. Configure statuses, custom fields, form, and views from the ClickUp contract.
7. Load or pin ClickUp task templates.
8. Pin or link the authority matrix in ClickUp.
9. Record all runtime IDs in private configuration.
10. Run a smoke test: Gmail or manual lead capture creates a ClickUp `Inbox`
    opportunity with source URL, channel, funding type, product match, fit
    score, next action, and owner fields available.

## Completion Boundary

`ecosystem-os` can complete the repo-owned readiness contract when the linked
docs and witness resolve. The story remains operationally incomplete until live
private IDs are configured and a smoke test has been recorded outside the repo.

