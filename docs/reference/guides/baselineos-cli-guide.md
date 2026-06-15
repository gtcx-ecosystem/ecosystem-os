---
title: 'BaselineOS CLI Guide'
status: current
date: 2026-05-28
owner: gtcx-docs
tier: operating
tags: [['documentation', 'cli', 'baselineos', 'reference']]
review_cycle: on-change
document_type: onboarding
role: protocol-architect
agent_id: agent://canon-os/2026-05-28/cli-guide
trust_score: 85
autonomy_level: sovereign
---

# BaselineOS CLI Guide

> **How to use the `baseline` command across the GTCX ecosystem.**

---

## What is BaselineOS?

BaselineOS is the AI-native operating system that powers the GTCX ecosystem. It is organized into **7 layers**: Lang, Frame, Studio, Persona, Autonomy, Experience, and Govern.

The `baseline` command is the universal interface to all 7 layers.

---

## The Language

BaselineOS is not a collection of commands — it is a language with grammar:

```
baseline <verb>[:<namespace>[:<subaction>]] [<target>] [<options>]
```

### Examples

```bash
baseline status                                    # Simple verb
baseline vault list                                # Verb + namespace
baseline vault get ANTHROPIC_API_KEY               # Verb + namespace + target
baseline persona:switch developer                  # Verb:namespace + target
baseline govern:hygiene:repo --strict              # Full form with option
baseline studio:produce --template security-audit  # Production workflow
```

---

## Syntax Operators

| Operator | Name          | Meaning                      | Example                           |
| -------- | ------------- | ---------------------------- | --------------------------------- |
| `:`      | **Namespace** | Drill into a layer or system | `frame:context`, `govern:hygiene` |
| `--`     | **Modifier**  | Flag or option               | `--strict`, `--verbose`, `--peek` |
| `!`      | **Force**     | Bypass confirmation          | `baseline delete !`               |
| `?`      | **Query**     | Ask, don't act               | `baseline status?`                |
| `@`      | **Reference** | Point to a resource          | `@production`, `@gtcx-platforms`  |
| `>`      | **Pipe**      | Send output to next command  | `baseline status > report.md`     |

---

## The Seven Layers

| Layer          | One-Liner                                                                      | Key Commands                                                |
| -------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **Lang**       | "Your org's programmatic language for AI interaction."                         | `--status`, `--start`, `--learn`, `--analyze`               |
| **Frame**      | "The loaded organizational reality that actively shapes every AI interaction." | `frame:context`, `frame:scope`, `frame:authority`           |
| **Studio**     | "Where work gets made. Every output is produced by Studio."                    | `studio`, `studio:produce`, `studio:template`               |
| **Persona**    | "Switch personas and the entire OS transforms."                                | `persona`, `persona:switch`, `persona:team`                 |
| **Autonomy**   | "Agents grow from Initialized to Sovereign through demonstrated performance."  | `autonomy`, `autonomy:orchestrate`, `autonomy:metrics`      |
| **Experience** | "The nervous system. Observes, learns, adapts."                                | `experience`, `experience:onboarding`, `experience:support` |
| **Govern**     | "Enable a regime and it reshapes how the entire OS operates."                  | `govern`, `govern:hygiene`, `govern:compliance`             |

---

## Getting Help

```bash
baseline help                    # Show all commands
baseline help <layer>            # Layer-specific help
baseline <command> --help        # Command-specific help
```

Example:

```bash
baseline help studio
## → Shows all Studio commands with descriptions
```

---

## Common Workflows

### Initialize a New Repo

```bash
baseline init --context ./my-repo
baseline doctor
baseline verify --policy docs-standard
```

### Run a Security Audit

```bash
baseline frame:scope security
baseline frame:authority agent:reviewer
baseline govern:hygiene:repo --strict
baseline studio:produce --template security-audit --fidelity review
```

### Multi-Agent Code Review

```bash
baseline autonomy:agent:create --name builder --type agent:builder
baseline autonomy:agent:create --name reviewer --type agent:reviewer
baseline autonomy:orchestrate --workflow code-review --agents builder,reviewer
```

### Cross-Repo Standup

```bash
baseline ecosystem standup
baseline ecosystem velocity
baseline ecosystem graph
```

---

## Vault (Credential Management)

```bash
baseline vault list                    # List all credentials
baseline vault get ANTHROPIC_API_KEY   # Get a credential
baseline vault status                  # Check vault health
```

---

## GTCX Institutional Baseline

```bash
baseline gtcx-baseline --peek          # Preview baseline metadata
baseline gtcx-baseline                 # Full load and validate
```

---

## Documentation

For the complete reference, see the canonical BaselineOS documentation:

| Document       | Location                                |
| -------------- | --------------------------------------- |
| Language Guide | `baseline-os/01-docs/cli/lang-guide.md`    |
| CLI Guide      | `baseline-os/01-docs/cli/cli-guide.md`     |
| Command Index  | `baseline-os/01-docs/cli/command-index.md` |

---

## Related Documents

- [BaselineOS Language Guide](https://github.com/gtcx-ecosystem/baseline-os/blob/main/01-docs/cli/lang-guide.md)
- [BaselineOS CLI Guide](https://github.com/gtcx-ecosystem/baseline-os/blob/main/01-docs/cli/cli-guide.md)
- [BaselineOS Command Index](https://github.com/gtcx-ecosystem/baseline-os/blob/main/01-docs/cli/command-index.md)
