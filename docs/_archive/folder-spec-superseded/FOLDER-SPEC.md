---
title: 'Docs root — folder provisioning spec'
status: current
date: 2026-06-19
owner: ecosystem-os
document_type: folder-spec
tier: critical
tags: ['documentation', 'provisioning']
review_cycle: on-change
goals: 'Agents provision docs/ without random folders — product profile'
---

# `docs/` — root provisioning (ecosystem-os)

> **Profile:** `product` · **Registry:** `canon-os/pm/spec/docs-folder-provisioning.json`

## Purpose

Fleet operator documentation for **Ecosystem OS** — product, business, architecture, GitBook source.

## Required root files

`README.md` · `INDEX.md` · `sor.json` · `conventions.md` · `CHANGELOG.md` · `FOLDER-SPEC.md`

## Agent rules

1. Read `docs/INDEX.md` and this file first
2. Set `document_type` in frontmatter per `canon-os/pm/spec/docs-document-types.json`
3. Add `README.md` with every new directory
4. Log structural changes in `CHANGELOG.md`
