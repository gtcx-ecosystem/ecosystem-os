---
title: 'Getting Started Ai Agents'
status: current
date: 2026-05-22
owner: protocol-architect
tier: operating
tags: [['onboarding']]
review_cycle: monthly
document_type: protocol
role: protocol-architect
---

# Getting Started for AI Agents & AI Collaborators

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

**Welcome to the GTCX Protocol Ecosystem - AI-Optimized Onboarding**

## Executive Summary

This guide provides AI agents and collaborators with the foundational knowledge required to navigate and contribute to the GTCX ecosystem. It covers the polyrepo structure, dependency hierarchy, key data sources, and interaction patterns — all optimized for machine consumption.

## Purpose of This Guide

This guide is specifically designed for **AI agents, AI collaborators, and AI-powered systems** to quickly understand, navigate, and contribute to the GTCX ecosystem. It provides structured information optimized for AI consumption and processing.

## Ecosystem Architecture Overview

### Core Structure

The ecosystem is organized as independent repositories (polyrepo) under a single parent directory:

```
/Users/amanianai/Sites/gtcx-ecosystem/
├── gtcx-core/              # Shared foundation: crypto primitives, types, schemas, domain models
├── gtcx-protocols/          # Verification protocols: TradePass, GeoTag, GCI, VaultMark, PvP, PANX
├── gtcx-platforms/          # Trading platforms: CRX, SGX, AGX
├── gtcx-intelligence/       # AI/ML systems: ANISA, CORTEX, PANX Oracle
├── gtcx-agentic/            # Agent provisioning, orchestration, knowledge bases
├── gtcx-app/                # Mobile and web applications (offline-first)
├── gtcx-design/             # UI components, design tokens, i18n, accessibility
├── compliance-os/           # ComplianceOS monorepo (Core12, CaaS, web)
├── sensei-ai/               # Sensei AI product and docs (GitBook source)
├── gtcx-hardware/           # TapKit NFC hardware integration
├── gtcx-infrastructure/     # DevOps, IaC, CI/CD, security tooling
└── canon-os/               # Centralized documentation and specifications
```

### Dependency Hierarchy

```
Layer 0 (Foundation):  gtcx-core, gtcx-infrastructure
Layer 1 (Protocols):   gtcx-protocols (depends on gtcx-core)
Layer 2 (Intelligence): gtcx-intelligence (depends on gtcx-core, gtcx-protocols)
Layer 2 (Operations):  gtcx-app, gtcx-platforms, gtcx-agentic
                        (depend on gtcx-core, gtcx-protocols, and selectively on others)
Cross-cutting:         gtcx-design, compliance-os, sensei-ai, gtcx-hardware, gtcx-docs
```

### Key Data Sources for AI

- **`canon-os/01-docs/specs/`** - Technical specifications
- **`canon-os/01-docs/`** - Business and technical documentation
- **Each repo's `01-docs/architecture/`** - Per-repo architecture overviews

## Quick Start for AI Agents

### 1. Environment Understanding

```bash
# Root directory containing all repos

cd /Users/amanianai/Sites/gtcx-ecosystem/

# Navigate to a specific repo
cd gtcx-core/         # or gtcx-protocols/, gtcx-agentic/, etc.

# Build and test any repo
pnpm install
pnpm build
pnpm test
pnpm lint
```

### 2. Key Information Sources Per Repo

- **`README.md`** - Repo overview, quick navigation, directory structure, dependencies, principles
- **`01-docs/architecture/\<repo\>-architecture-overview.md`** - Architecture and integration patterns
- **`package.json` / `pnpm-workspace.yaml`** - Workspace configuration and scripts
- **`agile-pm/`** - Sprint planning, user stories, and project management (where present)

### 3. AI-Optimized Navigation

```bash
# From the ecosystem root, search across all repos
grep -rl "protocol" gtcx-*/01-docs/ --include="*.md"     # Find protocol-related docs
grep -rl "security" gtcx-*/01-docs/ --include="*.md"     # Find security-related docs
grep -rl "compliance" gtcx-*/01-docs/ --include="*.md"   # Find compliance docs

# List all architecture overviews
ls gtcx-*/01-docs/architecture/*-architecture-overview.md
```

## AI Agent Capabilities & Responsibilities

### Content Analysis & Generation

- **Documentation Review**: Analyze existing docs for completeness and accuracy
- **Content Generation**: Create missing documentation based on specifications
- **Cross-Reference Validation**: Ensure consistency across ecosystem files
- **Technical Writing**: Generate technical specifications and guides

### Code Analysis & Development

- **Package.json Review**: Identify dependency conflicts and version mismatches
- **Security Analysis**: Review and fix security vulnerabilities
- **Code Quality**: Ensure consistent coding standards across repos
- **Integration Testing**: Validate cross-repo integrations

### Strategic Planning & Roadmapping

- **Timeline Analysis**: Review and update project timelines
- **Resource Planning**: Identify resource requirements and constraints
- **Risk Assessment**: Identify and mitigate project risks
- **Stakeholder Communication**: Generate progress reports and updates

## AI Agent Workflow

### Phase 1: Ecosystem Analysis

1. **Scan Current State**: Analyze all ecosystem components
2. **Identify Gaps**: Find missing documentation, code, or configurations
3. **Prioritize Tasks**: Rank tasks by importance and impact
4. **Create Action Plan**: Develop structured work plan

### Phase 2: Content Development

1. **Research Context**: Leverage specs, docs, and research materials
2. **Generate Content**: Create missing documentation and code
3. **Validate Consistency**: Ensure cross-references and naming conventions
4. **Quality Review**: Self-review generated content

### Phase 3: Integration & Testing

1. **Update Dependencies**: Fix package.json conflicts
2. **Security Review**: Address vulnerabilities and security issues
3. **Integration Testing**: Validate cross-repo functionality
4. **Documentation Update**: Update all related documentation

### Phase 4: Deployment & Monitoring

1. **Commit Changes**: Stage and commit all changes
2. **Push to GitHub**: Deploy changes to remote repository
3. **Monitor Status**: Check for any deployment issues
4. **Update Roadmap**: Reflect completed work in roadmap

## AI Agent Tools & Commands

### File Operations

```bash
# Read file contents
read_file target_file path start_line end_line

# Search for content
grep_search query pattern

# List directory contents
list_dir relative_workspace_path

# Search for files
file_search query
```

### Code Operations

```bash
# Edit files
edit_file target_file instructions code_edit

# Search and replace
search_replace file_path old_string new_string

# Run terminal commands
run_terminal_cmd command is_background
```

### Build Operations (all repos use pnpm)

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

### Git Operations

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "message"

# Push to GitHub
git push origin main
```

## [Planned] AI Agent Task Templates

### Documentation Review Task

```
TASK: Review [COMPONENT] documentation
OBJECTIVE: Ensure completeness and accuracy
SCOPE: [SPECIFIC AREAS TO REVIEW]
DELIVERABLES: [WHAT TO PRODUCE]
TIMELINE: [ESTIMATED TIME]
```

### Content Generation Task

```
TASK: Generate [CONTENT TYPE] for [COMPONENT]
OBJECTIVE: Create missing content based on specifications
SOURCE MATERIALS: [REFERENCE DOCUMENTS]
OUTPUT FORMAT: [DESIRED FORMAT]
QUALITY STANDARDS: [QUALITY REQUIREMENTS]
```

### Integration Task

```
TASK: Integrate [COMPONENT A] with [COMPONENT B]
OBJECTIVE: Establish cross-component functionality
INTEGRATION POINTS: [SPECIFIC INTEGRATION AREAS]
TESTING REQUIREMENTS: [VALIDATION CRITERIA]
ROLLBACK PLAN: [CONTINGENCY PLANS]
```

## AI Agent Success Metrics

### Efficiency Metrics

- **Task Completion Rate**: % of assigned tasks completed successfully
- **Time to Completion**: Average time to complete similar tasks
- **Error Rate**: % of tasks requiring rework or correction
- **Content Quality Score**: Measured against quality standards

### Impact Metrics

- **Documentation Coverage**: % of ecosystem components with complete docs
- **Security Improvement**: Reduction in vulnerability count
- **Integration Success**: % of cross-component integrations working
- **User Satisfaction**: Feedback from human collaborators

### Learning Metrics

- **Knowledge Retention**: Ability to apply learned patterns
- **Adaptation Speed**: Time to adapt to new requirements
- **Innovation Rate**: New approaches or solutions developed
- **Collaboration Effectiveness**: Quality of human-AI collaboration

## AI Agent Safety & Compliance

### Content Guidelines

- **Accuracy**: Ensure all generated content is factually correct
- **Consistency**: Maintain naming conventions and patterns
- **Completeness**: Provide comprehensive coverage of topics
- **Accessibility**: Make content accessible to target audiences

### Security Guidelines

- **No Sensitive Data**: Never include API keys, passwords, or secrets
- **Vulnerability Reporting**: Report security issues immediately
- **Access Control**: Respect file permissions and access restrictions
- **Audit Trail**: Maintain clear record of all changes made

### Quality Guidelines

- **Self-Review**: Review all generated content before submission
- **Validation**: Verify technical accuracy and completeness
- **Testing**: Test all code and configurations before deployment
- **Documentation**: Document all changes and decisions made

## [In Progress] Continuous Improvement

### Feedback Loop

1. **Collect Feedback**: Gather input from human collaborators
2. **Analyze Performance**: Review success metrics and areas for improvement
3. **Update Processes**: Refine workflows and procedures
4. **Implement Changes**: Apply improvements to future tasks

### Knowledge Management

- **Pattern Recognition**: Identify successful approaches and patterns
- **Best Practices**: Document and share best practices
- **Lessons Learned**: Record and learn from mistakes
- **Knowledge Sharing**: Share insights with other AI agents

## AI Agent Support & Resources

### Immediate Help

- **Each repo's `README.md`** - Quick navigation and architecture links
- **`gtcx-agentic/agentic/directives/`** - Prime directive, safety rules, conventions

### Documentation Resources

- **`canon-os/01-docs/`** - Business and technical documentation
- **`canon-os/01-docs/specs/`** - Technical specifications and standards
- **Each repo's `01-docs/architecture/`** - Per-repo architecture overviews

### Human Collaboration

- **Primary Contact**: User (amanianai)
- **Communication Channel**: Direct conversation
- **Escalation Path**: Immediate escalation for critical issues
- **Feedback Loop**: Regular feedback and guidance

## Welcome to the GTCX Ecosystem

As an AI agent, you are part of building the world's most advanced global trade infrastructure. Your capabilities in analysis, content generation, and integration are essential to the project's success.

**AI Agent Getting Started Guide** - Version 2.0

## Negative Scope

This guide does **not** cover:

- Deep architectural decisions (see `01-docs/architecture/` and `01-docs/adr/`)
- Operational runbooks (see `01-docs/04-ops/`)
- Security procedures (see `01-docs/09-security/`)
- Compliance requirements (see `01-docs/10-compliance/`)
- Cross-repo implementation details (see individual repo READMEs)
