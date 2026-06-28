---
title: 8.5 uplift action
status: current
date: 2026-06-29
owner: ecosystem-os
document_type: specification
tier: operational
tags: ['kaleidoscope-ai', '8-5-uplift', 'execution-studio', 'agile-os']
review_cycle: on-change
---

# 8.5 uplift action

## Purpose

This format converts Kaleidoscope insights into evidence-backed work that can be routed through `agile-os` without losing audit trace, validation gates, approval state, or release criteria.

Machine schema:

- `pm/spec/kaleidoscope-ai/85-uplift-action.schema.json`

## Required fields

| Field | Requirement |
| --- | --- |
| `ownerRepo` | Repo accountable for the work item. |
| `targetRepos` | One or more repos affected by the work. |
| `currentReadinessScore100` | Current score when available, otherwise `null` with evidence explaining the gap. |
| `targetReadinessScore100` | Must be `85`. |
| `gapCategory` | One of the approved readiness categories in the schema. |
| `evidence` | Source witnesses, docs, or reports that justify the work. |
| `workPlan` | Concrete steps with expected artifacts and optional validation commands. |
| `validationGate` | Command and success criteria required before the action can be marked done. |
| `approvalRequest` | Approval state and boundary, especially for cross-repo, write, external, or deployment work. |
| `releaseGate` | Criteria that must pass before the uplift is counted toward release posture. |

## Status model

| Status | Meaning |
| --- | --- |
| `draft` | Proposed by Kaleidoscope; not approved for execution. |
| `approved` | Human-approved for execution. |
| `in-progress` | Work has started. |
| `blocked` | Cannot proceed without evidence, owner input, or external state change. |
| `done` | Validation gate and release gate passed. |

## Operating rule

An 8.5 uplift action is not valid if it lacks evidence, an owner repo, a validation command, approval state, or release criteria.

Kaleidoscope may draft actions. It must not create tickets, edit target repos, contact partners, or deploy systems from an uplift action unless the approval request is approved.

## Example

```json
{
  "schema": "gtcx://ecosystem-os/kaleidoscope-ai/85-uplift-action/v1",
  "id": "uplift-signal-l3-evidence-pack",
  "title": "Add SIGNAL L3 evidence pack",
  "status": "draft",
  "ownerRepo": "baseline-os",
  "targetRepos": ["baseline-os", "fabric-os", "bridge-os", "ecosystem-os"],
  "priority": "P0",
  "currentReadinessScore100": 45,
  "targetReadinessScore100": 85,
  "gapCategory": "agentic-maturity",
  "outcome": "Repos can prove SIGNAL L3 only when trace, policy, approval, eval, rollback, and learning-loop evidence exists.",
  "evidence": [
    {
      "path": "audit/evidence/signal-fleet-latest.json",
      "reason": "Current SIGNAL-E L3 blocker evidence"
    }
  ],
  "workPlan": [
    {
      "step": "Publish SIGNAL L3 evidence schema",
      "ownerRepo": "baseline-os",
      "expectedArtifact": "pm/spec/kaleidoscope-ai/signal-l3-evidence-pack.schema.json",
      "validationCommand": "pnpm kaleidoscope:signal:check"
    }
  ],
  "validationGate": {
    "command": "pnpm kaleidoscope:operate:check",
    "successCriteria": "Operating loop passes and release gate remains explicit."
  },
  "approvalRequest": {
    "status": "draft_pending_approval",
    "required": true,
    "boundary": "cross-repo-evidence",
    "reason": "The action changes cross-repo evidence standards."
  },
  "releaseGate": {
    "status": "blocked",
    "criteria": ["schema exists", "validation command passes", "approval recorded"]
  },
  "acceptanceCriteria": ["Every output remains evidence-linked."]
}
```

