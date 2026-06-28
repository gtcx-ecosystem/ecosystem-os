---
title: movement history baseline
status: draft
date: 2026-06-29
owner: ecosystem-os
document_type: implementation-note
tier: operational
tags: ['kaleidoscope-ai', 'observatory', 'movement', 'graph']
review_cycle: weekly
---

# movement history baseline

## Purpose

Kaleidoscope needs prior/current movement to answer questions such as "which repos improved the most since the last audit?" without relying on memory or hand-written rankings.

The first machine-readable movement baseline is `audit/evidence/kaleidoscope-graph-snapshot-previous.json`. It was created from the then-current graph snapshot so the Observatory can compare a stable prior snapshot to the latest generated graph snapshot on future runs.

## Interpretation

This baseline enables movement tracking. It does not claim historical improvement.

Because the first prior snapshot is a copy of the current graph state, the first generated movement deltas are expected to be `0` for every repo. Future graph snapshot writes can compare the new current state against this baseline and surface actual readiness, blocker, SIGNAL, MPR, graph, RAG, MCP, and freshness movement.

## Evidence flow

1. `pnpm kaleidoscope:graph-snapshot:write` produces the latest current graph snapshot.
2. `audit/evidence/kaleidoscope-graph-snapshot-previous.json` anchors the previous snapshot for comparison.
3. `pnpm kaleidoscope:observatory:write` reads both snapshots and emits movement fields into `audit/evidence/kaleidoscope-observatory-latest.json`.
4. `docs/business/research/kaleidoscope-ai/observatory-latest.md` summarizes movement availability for operators.

## Governance

- Treat zero deltas in the first run as baseline initialization, not performance evidence.
- Do not use the baseline file as a substitute for older independent audits.
- Continue citing repo-local audits, MPR evidence, SIGNAL evidence, and generated witnesses for any claim about actual historical improvement.
- When a newer graph snapshot becomes the accepted comparison point, update the previous snapshot through an explicit reviewed change.
