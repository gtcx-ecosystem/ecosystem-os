#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ECOSYSTEM_ROOT = resolve(REPO, '..');
const GRAPH_REL = 'audit/evidence/kaleidoscope-graph-snapshot-latest.json';
const QUERY_REL = 'audit/evidence/kaleidoscope-query-service-latest.json';
const SIGNAL_REL = 'audit/evidence/signal-fleet-latest.json';
const OUT_REL = 'audit/evidence/kaleidoscope-observatory-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/observatory-latest.md';
const OUT = join(REPO, OUT_REL);
const REPORT = join(REPO, REPORT_REL);
const WRITE = process.argv.includes('--write');
const JSON_OUT = process.argv.includes('--json');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function maybeJson(path) {
  if (!existsSync(path)) return null;
  try {
    return readJson(path);
  } catch {
    return null;
  }
}

function sourceDate(repo, relPath) {
  if (!relPath || relPath.startsWith('derived:')) return null;
  try {
    return statSync(join(ECOSYSTEM_ROOT, repo, relPath)).mtime.toISOString();
  } catch {
    return null;
  }
}

function daysOld(date) {
  if (!date) return null;
  return Math.floor((Date.now() - Date.parse(date)) / 86400000);
}

function graphNodes(graph, type, repo) {
  return graph.nodes.filter((node) => node.type === type && (!repo || node.repo === repo));
}

function configStatus(graph, repo, kind) {
  const node = graph.nodes.find((item) => item.id === `config:${repo}:${kind}`);
  return {
    present: Boolean(node?.properties?.present),
    ok: Boolean(node?.properties?.ok),
    source: node?.source ?? null,
    issues: node?.properties?.issues ?? ['missing config node']
  };
}

function evidenceFreshness(graph, repo) {
  const evidenceNodes = graphNodes(graph, 'evidence', repo);
  const dates = evidenceNodes
    .flatMap((node) => node.evidence ?? [])
    .map((path) => sourceDate(repo, path))
    .filter(Boolean)
    .sort();
  const newest = dates[dates.length - 1] ?? null;
  const oldest = dates[0] ?? null;
  const newestAgeDays = daysOld(newest);
  return {
    fresh: newestAgeDays != null && newestAgeDays <= 14,
    oldestSourceDate: oldest,
    newestSourceDate: newest,
    newestAgeDays,
    evidenceCount: evidenceNodes.length
  };
}

function signalByRepo(signal) {
  const map = new Map();
  for (const result of signal?.results ?? []) map.set(result.repo, result);
  return map;
}

function mprForRepo(repo) {
  const local = maybeJson(join(ECOSYSTEM_ROOT, repo, 'audit/evidence/mpr-repo-latest.json'));
  if (local) {
    return {
      composite100: local.composite100 ?? local.fullComposite100 ?? local.foundationComposite100 ?? null,
      source: `${repo}/audit/evidence/mpr-repo-latest.json`,
      evaluatedAt: local.evaluatedAt ?? local.date ?? null
    };
  }
  return {
    composite100: null,
    source: 'missing',
    evaluatedAt: null
  };
}

function blockersFor(graph, repo) {
  return graphNodes(graph, 'blocker', repo).map((node) => ({
    id: node.id,
    label: node.label,
    severity: node.properties?.severity ?? 'unknown'
  }));
}

function movementFor(repoNode, previousByRepo) {
  const currentScore100 = repoNode.properties?.score ?? null;
  const previous = previousByRepo.get(repoNode.repo);
  if (!previous) {
    return {
      available: false,
      currentScore100,
      priorScore100: null,
      delta: null,
      reason: 'No prior Kaleidoscope graph snapshot found in repo evidence.'
    };
  }
  const priorScore100 = previous.properties?.score ?? null;
  return {
    available: typeof currentScore100 === 'number' && typeof priorScore100 === 'number',
    currentScore100,
    priorScore100,
    delta: typeof currentScore100 === 'number' && typeof priorScore100 === 'number' ? currentScore100 - priorScore100 : null,
    reason: 'Compared against prior Kaleidoscope graph snapshot.'
  };
}

function loadPreviousGraph() {
  const candidates = [
    'audit/evidence/kaleidoscope-graph-snapshot-previous.json',
    'audit/archive/kaleidoscope-graph-snapshot-latest.json'
  ];
  for (const rel of candidates) {
    const doc = maybeJson(join(REPO, rel));
    if (doc?.nodes) return doc;
  }
  return null;
}

function buildRows(graph, signal) {
  const signals = signalByRepo(signal);
  const previous = loadPreviousGraph();
  const previousByRepo = new Map(graphNodes(previous ?? { nodes: [] }, 'repo').map((node) => [node.repo, node]));

  return graphNodes(graph, 'repo')
    .map((repoNode) => {
      const repo = repoNode.repo;
      const signalRow = signals.get(repo);
      const blockers = blockersFor(graph, repo);
      return {
        repo,
        tier: repoNode.properties?.tier ?? 0,
        role: repoNode.properties?.role ?? '',
        readiness: {
          maturity: repoNode.properties?.maturity ?? 'unknown',
          score100: repoNode.properties?.score ?? null,
          targetStatus: repoNode.properties?.targetStatus ?? null
        },
        graphRagMcp: {
          rag: configStatus(graph, repo, 'rag'),
          mcp: configStatus(graph, repo, 'mcp'),
          graph: configStatus(graph, repo, 'graph'),
          eval: configStatus(graph, repo, 'eval')
        },
        blockers: {
          count: blockers.length,
          items: blockers
        },
        signal: {
          level: signalRow?.overallLevel ?? null,
          score100: signalRow?.overallScore100 ?? null,
          signalP: signalRow?.signalP ?? null,
          signalE: signalRow?.signalE ?? null,
          bottlenecks: signalRow?.bottlenecks ?? []
        },
        mpr: mprForRepo(repo),
        evidenceFreshness: evidenceFreshness(graph, repo),
        movement: movementFor(repoNode, previousByRepo)
      };
    })
    .sort((a, b) => a.tier - b.tier || a.repo.localeCompare(b.repo));
}

function aliases(graph) {
  return (graph.aliases ?? []).map((alias) => ({
    ...alias,
    warning: !alias.mapsToRepo
  }));
}

function statusIcon(ok) {
  return ok ? 'ok' : 'warn';
}

function configShort(row) {
  return ['rag', 'mcp', 'graph', 'eval'].map((kind) => `${kind}:${statusIcon(row.graphRagMcp[kind].ok)}`).join(' ');
}

function movementAnswer(rows, graph, query, aliasRows) {
  const movementRows = rows.filter((row) => row.movement.available);
  const ready = rows.filter((row) => row.readiness.maturity === 'ready').length;
  const blockers = rows.reduce((sum, row) => sum + row.blockers.count, 0);
  const querySummary = query?.summary
    ? ` P2.2 query witness passes ${query.summary.passedQueries}/${query.summary.queryCount} golden questions at ${query.summary.averageConfidence} average confidence.`
    : '';
  const movementSentence =
    movementRows.length > 0
      ? `${movementRows.length} repos have prior/current score movement available.`
      : 'Prior/current score movement is not available because no prior Kaleidoscope graph snapshot is present in repo evidence.';
  return `Since the last available Kaleidoscope evidence, the current graph snapshot shows ${ready}/${rows.length} repos ready, ${blockers} blocker nodes, ${graph.summary.aliasCount} symlink aliases, and ${aliasRows.filter((item) => item.warning).length} alias warnings. ${movementSentence}${querySummary}`;
}

function markdownReport(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI observatory latest',
    'status: generated',
    `date: ${witness.generatedAt.slice(0, 10)}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'observatory', 'graph', 'rag', 'mcp']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI observatory latest',
    '',
    '> Generated by `pnpm kaleidoscope:observatory:write`.',
    '',
    '## Summary',
    '',
    `- Repos ready: ${witness.summary.readyRepos}/${witness.summary.repoCount}`,
    `- Blocker nodes: ${witness.summary.blockerCount}`,
    `- Alias warnings: ${witness.summary.aliasWarningCount}`,
    `- Fresh evidence repos: ${witness.summary.freshEvidenceRepos}/${witness.summary.repoCount}`,
    `- Movement available: ${witness.summary.movementAvailable}`,
    '',
    '## What changed since the last audit?',
    '',
    witness.answers.whatChangedSinceLastAudit,
    '',
    '## Repo Readiness',
    '',
    '| Repo | Tier | Ready | Graph/RAG/MCP | Blockers | SIGNAL | MPR | Freshness | Movement |',
    '| --- | ---: | --- | --- | ---: | --- | ---: | --- | --- |'
  ];

  for (const row of witness.repos) {
    lines.push(
      `| ${row.repo} | ${row.tier} | ${row.readiness.maturity} ${row.readiness.score100}/100 | ${configShort(row)} | ${row.blockers.count} | ${row.signal.level ?? 'n/a'} ${row.signal.score100 ?? 'n/a'} | ${row.mpr.composite100 ?? 'n/a'} | ${row.evidenceFreshness.fresh ? 'fresh' : 'stale/unknown'} | ${row.movement.available ? row.movement.delta : 'n/a'} |`
    );
  }

  if (witness.aliases.length > 0) {
    lines.push('', '## Symlink Aliases', '', '| Alias | Target | Maps to repo | Warning |', '| --- | --- | --- | --- |');
    for (const alias of witness.aliases) {
      lines.push(`| ${alias.path} | ${alias.target} | ${alias.mapsToRepo ?? 'n/a'} | ${alias.warning ? 'yes' : 'no'} |`);
    }
  }

  lines.push('');
  return `${lines.join('\n')}\n`;
}

function buildWitness() {
  const graph = maybeJson(join(REPO, GRAPH_REL));
  const query = maybeJson(join(REPO, QUERY_REL));
  const signal = maybeJson(join(REPO, SIGNAL_REL));
  const issues = [];
  if (!graph) issues.push(`missing graph snapshot: ${GRAPH_REL}`);
  if (!query) issues.push(`missing query witness: ${QUERY_REL}`);
  if (!signal) issues.push(`missing signal witness: ${SIGNAL_REL}`);
  if (!graph) {
    return {
      schema: 'gtcx://ecosystem-os/kaleidoscope-ai/observatory/v1',
      generatedAt: new Date().toISOString(),
      repo: 'ecosystem-os',
      phase: 'phase-2-observatory-mvp',
      ok: false,
      summary: {
        repoCount: 0,
        readyRepos: 0,
        blockerCount: 0,
        aliasWarningCount: 0,
        freshEvidenceRepos: 0,
        movementAvailable: false
      },
      repos: [],
      aliases: [],
      answers: { whatChangedSinceLastAudit: 'Graph snapshot missing; Observatory cannot answer yet.' },
      issues
    };
  }

  const rows = buildRows(graph, signal);
  const aliasRows = aliases(graph);
  const blockerCount = rows.reduce((sum, row) => sum + row.blockers.count, 0);
  const summary = {
    repoCount: rows.length,
    readyRepos: rows.filter((row) => row.readiness.maturity === 'ready').length,
    blockerCount,
    aliasWarningCount: aliasRows.filter((alias) => alias.warning).length,
    freshEvidenceRepos: rows.filter((row) => row.evidenceFreshness.fresh).length,
    movementAvailable: rows.some((row) => row.movement.available)
  };

  if (!graph.ok) issues.push('graph snapshot is not ok');
  if (query && !query.ok) issues.push('query witness is not ok');
  for (const row of rows) {
    if (row.readiness.maturity !== 'ready') issues.push(`${row.repo}: readiness is ${row.readiness.maturity}`);
    if (row.blockers.count > 0) issues.push(`${row.repo}: ${row.blockers.count} blocker(s)`);
  }

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/observatory/v1',
    generatedAt: new Date().toISOString(),
    repo: 'ecosystem-os',
    phase: 'phase-2-observatory-mvp',
    ok: issues.length === 0,
    sources: {
      graphSnapshot: GRAPH_REL,
      queryWitness: QUERY_REL,
      signalFleet: SIGNAL_REL,
      mprRepo: '../*/audit/evidence/mpr-repo-latest.json'
    },
    contracts: {
      observatory: 'pm/spec/kaleidoscope-ai/observatory.schema.json',
      graphSnapshot: 'pm/spec/kaleidoscope-ai/graph-snapshot.schema.json',
      queryService: 'pm/spec/kaleidoscope-ai/query-service.schema.json'
    },
    summary,
    repos: rows,
    aliases: aliasRows,
    answers: {
      whatChangedSinceLastAudit: movementAnswer(rows, graph, query, aliasRows)
    },
    issues
  };
}

function main() {
  const witness = buildWitness();
  if (WRITE) {
    mkdirSync(dirname(OUT), { recursive: true });
    mkdirSync(dirname(REPORT), { recursive: true });
    writeFileSync(OUT, `${JSON.stringify(witness, null, 2)}\n`);
    writeFileSync(REPORT, markdownReport(witness));
  }

  if (JSON_OUT) {
    console.log(JSON.stringify(witness, null, 2));
  } else {
    console.log('\n=== kaleidoscope:observatory:check ===\n');
    console.log(`repos: ${witness.summary.repoCount}`);
    console.log(`ready: ${witness.summary.readyRepos}`);
    console.log(`blockers: ${witness.summary.blockerCount}`);
    console.log(`alias-warnings: ${witness.summary.aliasWarningCount}`);
    console.log(`fresh-evidence: ${witness.summary.freshEvidenceRepos}`);
    console.log(`movement-available: ${witness.summary.movementAvailable}`);
    console.log(`ok: ${witness.ok}`);
    if (WRITE) {
      console.log(`witness: ${relative(REPO, OUT)}`);
      console.log(`report: ${relative(REPO, REPORT)}`);
    }
    for (const issue of witness.issues) console.log(`issue: ${issue}`);
  }

  process.exit(witness.ok ? 0 : 1);
}

main();
