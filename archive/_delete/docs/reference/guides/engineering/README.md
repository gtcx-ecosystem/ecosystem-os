---
title: 'GTCX Guides'
status: 'current'
date: '2026-05-24'
owner: 'engineering-lead'
role: 'engineering-lead'
tier: 'operating'
tags: ['documentation']
review_cycle: 'annual'
---

# GTCX Guides

Step-by-step guides for common workflows in the GTCX ecosystem. Guides explain **how** to do things. For the rules themselves, see [Protocols](../../../governance/protocols/). For fill-in-the-blank documents, use the templates under each domain folder (e.g., `/audits/templates/`).

## Guides

| Guide                                                     | Description                                       |
| --------------------------------------------------------- | ------------------------------------------------- |
| [AI-Assisted Development](ai-assisted-development.md)     | How to use AI for code generation                 |
| [New Repo Checklist](new-repo-checklist.md)               | Setting up a new repository                       |
| [New Service Checklist](new-service-checklist.md)         | Adding a service to a monorepo                    |
| [Docs Writing Guide](docs-writing-guide.md)               | Writing documentation                             |
| [Code Review](code-review-guide.md)                       | Reviewing code (including AI-generated)           |
| [Incident Response](incident-response-guide.md)           | Responding to production incidents                |
| [Releasing](release-guide.md)                             | Cutting a release                                 |
| [Agent Context Recovery](agent-context-recovery.md)       | Re-establishing AI agent context between sessions |
| [Autonomous Agent Workflow](autonomous-agent-workflow.md) | Structuring large autonomous agent tasks          |

## Three Layers

GTCX documentation is organized into three layers, each serving a distinct purpose:

- **Protocols** (`/protocols/`) — The rules. "You MUST do this." Protocols define the standards and constraints that all GTCX code and processes must follow. They are non-negotiable.

- **Templates** (domain folders) — The forms. "Use this format." Templates live under each domain folder (e.g., `/incidents/templates/`, `/reports/templates/`) and provide fill-in-the-blank documents for recurring deliverables.

- **Guides** (`/guides/`) — The tutorials. "Here's how, step by step." Guides walk you through common workflows from start to finish. They reference protocols for the rules and templates for the formats.
