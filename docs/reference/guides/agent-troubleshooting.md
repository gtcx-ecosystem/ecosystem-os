---

title: 'Agent Troubleshooting'
status: 'current'
date: '2026-05-22'
owner: 'protocol-architect'
role: 'protocol-architect'
tier: operating
tags: ['guides', 'how-to']
review_cycle: 'on-change'

---

# Agent Troubleshooting Guide

> **Status:** Current
> **Date:** 2026-05-22
> **Owner:** Protocol Architect

> **Migration note (January 2026):** This guide was written for the original monorepo structure (`gtcx-ecosystem-ecosystem/gtcx-ecosystem-*`). The ecosystem has since been reorganized into 12 independent repositories at `/Users/amanianai/Sites/gtcx-ecosystem/gtcx-*/`. Code blocks below are preserved as historical context; adapt paths to the current repo you are working in.

## Executive Summary

> **Status:** Current

## Quick Diagnosis Checklist

If an agent is struggling or stuck, work through these steps systematically:

### 1. Environment Check

```bash
# Check current directory

pwd

# Check git status
git status

# Check for uncommitted changes
git diff

# Check current branch
git branch --show-current

# Check if files exist
ls -la
```

### 2. Common Issues & Fixes

#### Issue: "File not found" errors

```bash
# Verify you're in the right directory
cd /Users/amanianai/Sites/gtcx-ecosystem-ecosystem

# Check if it's a nested repo issue
ls -la gtcx-ecosystem-cognitive/
ls -la gtcx-ecosystem-platforms/
ls -la gtcx-ecosystem-protocols/
```

#### Issue: Git conflicts or push failures

```bash
# Safe reset approach
git stash -u                    # Save all changes
git fetch origin
git reset --hard origin/main    # Reset to remote
git stash pop                    # Restore changes (optional)
```

#### Issue: Docker/container problems

```bash
# Check Docker status
docker ps -a
docker compose ps

# Clean restart
docker compose down -v           # Remove everything
docker compose up -d --build     # Fresh start

# Check logs
docker compose logs --tail=50
```

#### Issue: Permission denied

```bash
# Check file permissions
ls -la

# Fix script permissions
chmod +x 03-platform/scripts/*.sh

# Fix directory ownership
sudo chown -R $USER:$USER .
```

### 3. State Recovery

If the agent seems confused about state:

```bash
# Show them the current context
echo "=== Current State ==="
echo "Directory: $(pwd)"
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --oneline)"
echo "Modified files: $(git status --short)"
echo "Running containers: $(docker ps --format 'table {{.Names}}\t{{.Status}}')"
```

### 4. Clear Instructions for the Agent

Share this with the struggling agent:

## Agent Reset Protocol

If you're stuck, follow these steps:

### Step 1: Establish Clean State

```bash
# Go to the monorepo root
cd /Users/amanianai/Sites/gtcx-ecosystem-ecosystem

# Check where you are
pwd
ls -la
```

### Step 2: Understand the Repository Structure

```
gtcx-ecosystem-ecosystem/           # Monorepo root
├── gtcx-ecosystem-cognitive/      # PANX & Cortex services (main work area)
│   ├── panx/                      # PANX verification service
│   ├── cortex/                    # Cortex analytics service
│   ├── 03-platform/scripts/                   # Deployment & utility scripts
│   └── 04-ship/                     # Infrastructure configs
├── gtcx-ecosystem-platforms/      # CRX, SGX, AGX platforms
├── gtcx-ecosystem-protocols/      # Core protocols
└── gtcx-ecosystem-docs/          # Documentation
```

### Step 3: Common Tasks

**To make code changes:**

```bash
cd gtcx-ecosystem-cognitive
git checkout main
git pull origin main
# Make your changes
git add -A
git commit -m "feat: your change description"
git push origin main
```

**To run services locally:**

```bash
cd gtcx-ecosystem-cognitive/04-ship/compose-prod
cp ENV.example .env
docker compose up -d --build
docker compose logs -f
```

**To run tests:**

```bash
cd gtcx-ecosystem-cognitive
./03-platform/scripts/e2e_load.sh
./03-platform/scripts/perf_gate.sh
```

### Step 4: If Still Stuck

1. **Start fresh:**

```bash
cd /Users/amanianai/Sites/gtcx-ecosystem-ecosystem
git status  # See what's modified
git stash -u  # Save everything
git checkout main
git pull origin main
```

2. **Focus on one task:**

- Don't try to do multiple things at once
- Complete one file edit before moving to the next
- Commit frequently

3. **Use explicit paths:**

```bash
# Instead of relative paths
cd ../../somewhere

# Use absolute paths
cd /Users/amanianai/Sites/gtcx-ecosystem-ecosystem/gtcx-ecosystem-cognitive
```

### Step 5: Specific Recovery Scenarios

**If you can't push to git:**

```bash
# You might be on a detached HEAD
git checkout main
git pull origin main
git push origin main
```

**If Docker won't start:**

```bash
# Check if Docker Desktop is running
docker version

# If not, tell the user:
echo "Please start Docker Desktop"
```

**If you see merge conflicts:**

```bash
# Don't try to resolve manually
git reset --hard origin/main
# Then redo your changes
```

## Key Principles for Success

1. **Always know where you are:**
   - Run `pwd` frequently
   - Check `git status` before commits
   - Verify with `ls -la`

2. **Work in the right repository:**
   - Most work is in `gtcx-ecosystem-cognitive/`
   - Don't modify the monorepo root unless necessary
   - Each sub-repo has its own git history

3. **Use the provided scripts:**
   - `./03-platform/scripts/deploy_production.sh` - For deployment
   - `./03-platform/scripts/e2e_load.sh` - For testing
   - Don't recreate what already exists

4. **Keep changes focused:**
   - One PR/commit per feature
   - Don't mix unrelated changes
   - Test before pushing

5. **When in doubt:**
   - Show the current state
   - Ask for clarification
   - Take smaller steps

## Emergency Commands

If everything is broken:

```bash
# Nuclear option - start completely fresh
cd /Users/amanianai/Sites
mv gtcx-ecosystem-ecosystem gtcx-ecosystem-ecosystem.backup
git clone https://github.com/gtcx-ecosystem/gtcx-ecosystem-cognitive.git
cd gtcx-ecosystem-cognitive

# Or just reset the cognitive repo
cd /Users/amanianai/Sites/gtcx-ecosystem-ecosystem/gtcx-ecosystem-cognitive
git fetch origin
git reset --hard origin/main
git clean -fd
```

## Contact for Help

If the agent is still stuck after trying these steps:

1. Have them share the output of the state recovery commands
2. Have them describe what they were trying to accomplish
3. Check if there are any error messages in their terminal

## Negative Scope

This document does **not** cover:

- **Consolidated monorepo troubleshooting** (pnpm workspace issues, package-level debugging): See [Agent Troubleshooting — Authoritative](agent-troubleshooting-authoritative.md)
- **Architecture decisions and ADRs** (module boundaries, compliance module design): See [ADR-0020: CaaS, VIA, and VXA Architecture](ADR-0020-caas-via-vxa-architecture.md)
- **Agentic AI architecture or framework issues** (LangGraph, LangChain, ChromaDB errors): See [Agentic AI Architecture](agentic-ai-architecture.md)

Remember: It's okay to start over. Sometimes a clean slate is the fastest path forward.
