---
title: 'Guide: Repo SOP Onboarding Process'
status: current
date: 2026-05-24
owner: engineering-lead
tier: operating
tags: [['testing']]
review_cycle: annual
document_type: onboarding
role: engineering-lead
---

# Guide: Repo SOP Onboarding Process

## Purpose

This guide defines the exact, sequential process for onboarding any repo into the SOP standard. It exists because agents consistently drift — renaming legacy folders, migrating files instead of drafting, or skipping steps. Follow every phase in order. Do not improvise.

---

## The Seven Phases

---

### Phase 1 — Repo Hygiene

**What it is:** A structural cleanup of the entire repo before any content work begins. This ensures the audit in Phase 3 is done on a clean foundation.

**What to do:**

- Verify all folder names are lowercase kebab-case (`my-folder`, not `MyFolder` or `my_folder`)
- Verify numbered folders use the `#-name` format (`1-architecture`, not `01_architecture`)
- Ensure every folder has a `README.md` that describes its purpose and lists its contents
- Ensure every empty folder has a `.gitkeep` so it is tracked in git
- Check for broken internal links — any link pointing to a moved, renamed, or deleted file
- Check for inconsistent file naming (no camelCase or PascalCase in filenames)
- Do not create new content — only fix structure

**What NOT to do:**

- Do not rename or restructure content folders to reorganize the information architecture
- Do not add, remove, or edit documentation content during this phase
- Do not move files between folders during this phase

**Output:** A clean repo structure ready for audit.

---

### Phase 2 — Archive Legacy

**What it is:** Before any audit or content work, ALL existing documentation is moved into an archive folder. This gives us a clean slate and ensures the audit is systematic.

**What to do:**

- Create `01-docs/archived/` (or the repo's equivalent archive location) if it does not exist
- Move the entire contents of `01-docs/` (or whatever the current documentation folder is) into `01-docs/archived/`
- Do not delete anything — this is a backup, not a deletion
- Do not reorganize content inside the archive — move it as-is
- Record what was moved (a simple list in a `01-docs/archived/README.md` is sufficient)

**What NOT to do:**

- Do not cherry-pick — move everything, not just the files you think are relevant
- Do not rename files or folders when moving them into the archive
- Do not begin reading or evaluating content at this stage — that is Phase 3

**Output:** All legacy docs are in `01-docs/archived/`. The active `01-docs/` folder is empty or contains only structure files.

---

### Phase 3 — Audit

**What it is:** A thorough, systematic read of everything in the archive. The goal is to understand what exists and flag issues — not to fix anything yet.

**What to check for:**

- **Wrong-repo content** — docs that belong to a different product or repo entirely. Common examples from the GTCX ecosystem: FIFTY-FOUR product content (Signal54, TradeDesk54, Atlas54, Corridor54, Ralph, Amp, RegIntel), Baseline product content, CTII/CDII/RCII index content, newsroom/editorial content. These have zero value in a protocol repo.
- **Version conflicts** — docs written for v1 or v2 that conflict with v3 specs. Example: a PANX spec calling it "Pan-African Notarization eXchange" when v3 defines it as "Price & Network eXchange."
- **Internal conflicts** — two docs in the same repo that contradict each other
- **Stale content** — implementation status tables showing "Not started" for components that are actually implemented; outdated performance targets; superseded architectural decisions
- **Quality issues** — template-token content that was never filled, broken diagrams, incomplete sections, docs that are too thin to be useful
- **Duplicate content** — the same information in multiple places with no clear canonical source

**How to do it:**

- Read every file in the archive, even files that look unimportant
- Take notes on each file: what it is, what version it covers, what issues it has
- Do not fix anything during this phase — only document findings

**Output:** A complete audit report with every file assessed and issues flagged.

---

### Phase 4 — Triage

**What it is:** A decision pass over the audit findings. Every piece of content gets a clear disposition before any content work begins.

**Disposition options:**

| Decision             | Meaning                                                                                                                                               | Action in Phase 6                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Use as source**    | Content is v3-correct, high quality, relevant to this repo — use it as the primary source when drafting SOP content                                   | Draft from it                        |
| **Use with updates** | Content is mostly correct but has specific issues (stale status, minor conflicts, outdated references) — use as source but note what needs correcting | Draft from it, correcting the issues |
| **Reference only**   | Content has useful background or context but is not authoritative — useful for understanding, not for direct sourcing                                 | Draw on for context only             |
| **Wrong-repo**       | Content belongs to a different product or repo — no value here                                                                                        | Flag for permanent deletion          |
| **Delete**           | Content is fully superseded, duplicate, or has no value even as a reference                                                                           | Flag for permanent deletion          |

**How to do it:**

- Go through the audit report from Phase 3
- Assign a disposition to every file
- Group files by which SOP section they are most relevant to (e.g., "this file → SOP/2-docs/1-architecture/")
- Produce a triage map: SOP section → list of source files with dispositions

**Output:** A triage map that is the direct input for Phase 5 and 6.

---

### Phase 5 — SOP Setup and Planning

**What it is:** Move the SOP folder structure into the repo and create a content plan for each section before writing a single word.

**What to do:**

**Step 1 — Move SOP structure in:**

- Ensure the SOP folder is present in the repo with the full standard structure:

```
SOP/
  1-agents/
  2-docs/
    1-architecture/
    2-specs/
    3-engineering/
    4-operations/
    5-reference/
    6-gitbook/
  3-agile/
  4-sessions/
  5-release/
  6-metrics/
  7-03-platform/examples/
  8-03-platform/scripts/
  README.md
```

- All subfolders in `SOP/2-docs/` must be numbered
- Every folder must have a `README.md` or `.gitkeep`
- Do not modify the SOP template structure — it is the standard

**Step 2 — Plan content for each section:**

For each folder in `SOP/2-docs/`, document:

- What the section should contain for this specific repo
- Which triaged source files feed into it
- What gaps exist (no legacy source available)
- Whether gaps need drafting from scratch or can wait

**What NOT to do:**

- Do not start writing content in this phase — planning only
- Do not copy files from the archive into SOP folders
- Do not modify any SOP standard template files (agent role templates, README templates, etc.)

**Output:** SOP folder present in repo. Content plan per section with source mappings and gap list.

---

### Phase 6 — SOP Content Generation

**What it is:** Draft new, high-quality content into each SOP section using the triage map and content plan from Phases 4 and 5.

**Rules — read carefully:**

- **Draft, do not migrate.** Never copy a file from the archive into an SOP folder. Always write new content.
- **Improve, do not transcribe.** If legacy content is good, use it as a source — but rewrite it at higher quality, resolve any conflicts, and update any stale information.
- **Fill every gap.** If no legacy source exists for a section, draft the content from first principles using your knowledge of the repo, its codebase, and the GTCX ecosystem. An empty section is not acceptable.
- **One canonical source.** If multiple legacy files cover the same topic, consolidate into one high-quality SOP document. Do not produce duplicates.
- **Respect the section purpose.** Place content in the correct SOP folder. Do not put architecture decisions in `3-engineering/` or runbooks in `1-architecture/`.

**Section purposes:**

| SOP Section       | What belongs here                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `1-architecture/` | System design, component diagrams, ADRs, data flows, trust model, offline architecture   |
| `2-specs/`        | Technical specifications, protocol specs, data models, API contracts, schema definitions |
| `3-engineering/`  | Build guides, dev setup, testing standards, security practices, DevOps, CI/CD            |
| `4-operations/`   | Runbooks, compliance controls, release process, monitoring, disaster recovery            |
| `5-reference/`    | Glossary, quick-reference indexes, changelogs, legacy source attribution                 |
| `6-gitbook/`      | External-facing published documentation — what customers and integrators see             |

**Output:** Every `SOP/2-docs/` section has substantive, high-quality drafted content or a documented reason why it is deferred.

---

### Phase 7 — Delete

**What it is:** Permanently remove content from the archive that was flagged for deletion in Phase 4.

**What to do:**

- Delete all files marked "Wrong-repo" or "Delete" in the triage map
- Do not delete files marked "Use as source", "Use with updates", or "Reference only" — these remain in the archive as historical record
- After deletion, confirm the archive contains only files with archival value

**What NOT to do:**

- Do not delete the archive folder itself — it remains as a historical backup
- Do not delete files you are uncertain about — when in doubt, leave in archive
- Do not rush this phase — only delete what was explicitly triaged for deletion

**Output:** Archive contains only content with historical or reference value. All wrong-repo and superseded content is gone.

---

## Critical Rules (Summary)

These are the rules that get violated most often:

1. **Never update legacy folders.** `01-docs/` is legacy. The only operation on legacy folders is moving content to the archive.
2. **Never migrate files into SOP.** Draft new content. Files do not move from archive to SOP — ideas do.
3. **Never skip the plan.** Phase 5 must produce a content plan before Phase 6 begins. Do not start writing without knowing what every section needs.
4. **Never copy-paste.** Even if legacy content is excellent, rewrite it. Copying produces stale formatting, broken links, and unresolved conflicts.
5. **Never improvise the structure.** The SOP folder structure is the standard. Do not add, remove, or rename SOP folders.

---

## Common Drift Patterns to Avoid

These are mistakes that have happened in practice:

| Drift Pattern                              | Why It Happens                                   | Correct Action                                                                            |
| ------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Renaming `01-docs/` subfolders             | Agent thinks numbering legacy folders is hygiene | Legacy folders are never renamed — hygiene only applies to structure, not content folders |
| Copying gitbook content into `01-docs/`    | Agent treats `01-docs/` as the destination       | `01-docs/` is legacy. New content goes to `SOP/2-docs/` only                              |
| Expanding stub files in `01-docs/gitbook/` | Agent thinks stubs need filling                  | Stubs in legacy folders are not touched. SOP content goes into `SOP/2-docs/6-gitbook/`    |
| Archiving files one at a time during audit | Agent mixes audit and archive phases             | Archive everything first (Phase 2), then audit the archive (Phase 3)                      |
| Starting content before planning           | Agent writes SOP content without a section map   | Always complete Phase 5 planning before Phase 6 writing                                   |

---

## Checklist Per Repo

- [ ] Phase 1: Repo structure is clean — naming, READMEs, .gitkeep, no broken links
- [ ] Phase 2: All legacy docs moved to archive — nothing deleted, nothing missed
- [ ] Phase 3: Every archived file has been read and assessed
- [ ] Phase 4: Every file has a triage disposition; triage map produced
- [ ] Phase 5: SOP folder present with full numbered structure; content plan complete
- [ ] Phase 6: Every SOP/2-docs section has drafted content or documented deferral
- [ ] Phase 7: All wrong-repo and superseded content deleted from archive
