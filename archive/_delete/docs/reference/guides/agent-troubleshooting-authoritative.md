---
title: 'Agent Troubleshooting Authoritative'
status: current
date: 2026-05-22
owner: protocol-architect
tier: operating
tags: [['guides', 'how-to']]
review_cycle: on-change
document_type: onboarding
role: protocol-architect
---

# agent troubleshooting guide

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

> **Migration note (January 2026):** This guide references two historical structures: the original multi-repo (`gtcx-ecosystem-ecosystem/gtcx-ecosystem-*`) and the consolidated monorepo (`/Users/amanianai/Sites/gtcx/`). The ecosystem has since been split into 12 independent repositories at `/Users/amanianai/Sites/gtcx-ecosystem/gtcx-*/`. Code blocks below are preserved as historical context; adapt paths to the current repo you are working in.

## Executive Summary

> **Status:** Current

## quick diagnosis checklist

If an agent is struggling or stuck, work through these steps systematically:

### 1. environment check

```bash
## check current directory

pwd

## check git status
git status

## check for uncommitted changes
git diff

## check current branch
git branch --show-current

## check if files exist
ls -la
```

### 2. common issues & fixes

#### issue: "file not found" errors

```bash
## verify you're in the right directory
cd /Users/amanianai/Sites/gtcx

## check the structure
ls -la 03-platform/packages/
ls -la protocols/
ls -la platforms/
```

#### issue: git conflicts or push failures

```bash
## safe reset approach
git stash -u                    # save all changes
git fetch origin
git reset --hard origin/main    # reset to remote
git stash pop                   # restore changes (optional)
```

#### issue: pnpm/node problems

```bash
## clear pnpm cache
pnpm store prune

## remove node_modules and reinstall
rm -rf node_modules
pnpm install

## check node version (requires 18+)
node --version
```

#### issue: permission denied

```bash
## check file permissions
ls -la

## fix script permissions
chmod +x 03-platform/scripts/*.sh

## fix directory ownership
sudo chown -R $USER:$USER .
```

### 3. state recovery

If the agent seems confused about state:

```bash
## show the current context
echo "=== current state ==="
echo "directory: $(pwd)"
echo "branch: $(git branch --show-current)"
echo "last commit: $(git log -1 --oneline)"
echo "modified files: $(git status --short)"
```

### 4. clear instructions for the agent

Share this with the struggling agent:

## agent reset protocol

If you're stuck, follow these steps:

### step 1: establish clean state

```bash
## go to the monorepo root
cd /Users/amanianai/Sites/gtcx

## check where you are
pwd
ls -la
```

### step 2: understand the repository structure

```
gtcx/                            # monorepo root
├── apps/                        # applications
│   ├── mobile/                  # mobile apps (via, vxa)
│   └── web/                     # web platforms
├── 03-platform/packages/                    # shared packages
│   ├── api-client/              # api client
│   ├── crypto/                  # cryptographic primitives
│   ├── schemas/                 # json schemas
│   ├── types/                   # typescript definitions
│   └── ui/                      # design system
├── protocols/                   # core protocols
│   ├── tradepass/               # digital identity
│   ├── geotag/                  # location verification
│   ├── gci/                     # compliance intelligence
│   ├── vaultmark/               # custody verification
│   ├── pvp/                     # payment vs physical
│   └── panx/                    # consensus oracle
├── platforms/                   # exchange platforms
├── intelligence/                # ai systems
├── infrastructure/              # infrastructure
├── agentic/                     # ai agent systems
├── 01-docs/                        # documentation
└── operations/                  # operational tools
```

### step 3: common tasks

**to make code changes:**

```bash
git checkout main
git pull origin main
## make your changes
git add -A
git commit -m "feat: your change description"
git push origin main
```

**to install dependencies:**

```bash
pnpm install
```

**to run tests:**

```bash
pnpm test
```

**to build:**

```bash
pnpm build
```

### step 4: if still stuck

1. **start fresh:**

```bash
cd /Users/amanianai/Sites/gtcx
git status  # see what's modified
git stash -u  # save everything
git checkout main
git pull origin main
```

2. **focus on one task:**

- don't try to do multiple things at once
- complete one file edit before moving to the next
- commit frequently

3. **use explicit paths:**

```bash
## instead of relative paths
cd ../../somewhere

## use absolute paths
cd /Users/amanianai/Sites/gtcx/03-platform/packages/types
```

### step 5: specific recovery scenarios

**if you can't push to git:**

```bash
## you might be on a detached head
git checkout main
git pull origin main
git push origin main
```

**if pnpm won't install:**

```bash
## clear and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**if you see merge conflicts:**

```bash
## don't try to resolve manually
git reset --hard origin/main
## then redo your changes
```

## key principles for success

1. **always know where you are:**
   - run `pwd` frequently
   - check `git status` before commits
   - verify with `ls -la`

2. **work in the right directory:**
   - protocols in `protocols/`
   - packages in `03-platform/packages/`
   - documentation in `01-docs/`

3. **use pnpm workspace commands:**
   - `pnpm --filter @gtcx/types add lodash` - add to specific package
   - `pnpm build` - build all packages
   - `pnpm test` - run all tests

4. **keep changes focused:**
   - one pr/commit per feature
   - don't mix unrelated changes
   - test before pushing

5. **when in doubt:**
   - show the current state
   - ask for clarification
   - take smaller steps

## emergency commands

If everything is broken:

```bash
## nuclear option - start completely fresh
cd /Users/amanianai/Sites
mv gtcx gtcx.backup
git clone https://github.com/gtcx-ecosystem/gtcx.git
cd gtcx
pnpm install

## or just reset
cd /Users/amanianai/Sites/gtcx
git fetch origin
git reset --hard origin/main
git clean -fd
pnpm install
```

## contact for help

If the agent is still stuck after trying these steps:

1. have them share the output of the state recovery commands
2. have them describe what they were trying to accomplish
3. check if there are any error messages in their terminal

## Negative Scope

This document does **not** cover:

- **Original monorepo troubleshooting** (legacy multi-repo structure, Docker compose issues): See [Agent Troubleshooting](agent-troubleshooting.md)
- **Architecture decisions and module boundaries** (CaaS, VIA, VXA package design): See [ADR-0020: CaaS, VIA, and VXA Architecture](ADR-0020-caas-via-vxa-architecture.md)
- **Agentic AI framework debugging** (LangGraph, LangChain, ChromaDB errors): See [Agentic AI Architecture](agentic-ai-architecture.md)

remember: it's okay to start over. sometimes a clean slate is the fastest path forward.
