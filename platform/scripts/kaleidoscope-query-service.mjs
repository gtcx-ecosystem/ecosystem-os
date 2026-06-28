#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ECOSYSTEM_ROOT = resolve(REPO, '..');
const GRAPH_REL = 'audit/evidence/kaleidoscope-graph-snapshot-latest.json';
const OUT_REL = 'audit/evidence/kaleidoscope-query-service-latest.json';
const GRAPH_PATH = join(REPO, GRAPH_REL);
const OUT_PATH = join(REPO, OUT_REL);
const WRITE = process.argv.includes('--write');
const JSON_OUT = process.argv.includes('--json');
const GOLDEN = process.argv.includes('--golden');
const queryArgIndex = process.argv.indexOf('--query');
const SINGLE_QUERY = queryArgIndex >= 0 ? process.argv[queryArgIndex + 1] : null;

const GOLDEN_QUERIES = [
  {
    id: 'repo-readiness',
    query: 'Which repos are ready for graph RAG MCP?',
    expects: ['baseline-os', 'ecosystem-os', 'fabric-os']
  },
  {
    id: 'bridge-mcp-tools',
    query: 'What MCP tools does bridge-os expose?',
    expects: ['bridge-os', 'tool']
  },
  {
    id: 'blockers',
    query: 'Which repos have blockers?',
    expects: ['No repo blockers']
  },
  {
    id: 'terra-rag-evidence',
    query: 'What evidence supports terra-os RAG config?',
    expects: ['terra-os', 'config/baseline/rag.config.json']
  }
];

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function sourceDate(repo, relPath) {
  if (!relPath || relPath.startsWith('derived:') || relPath === '../*/package.json') return null;
  try {
    return statSync(join(ECOSYSTEM_ROOT, repo, relPath)).mtime.toISOString();
  } catch {
    return null;
  }
}

function termsFor(query) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 2 && !['what', 'which', 'does', 'for', 'the', 'are', 'have'].includes(term));
}

function readExcerpt(repo, relPath, terms) {
  const path = join(ECOSYSTEM_ROOT, repo, relPath);
  if (!existsSync(path)) return '';
  let text = '';
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    return '';
  }
  const lines = text.split('\n');
  const index = lines.findIndex((line) => terms.some((term) => line.toLowerCase().includes(term)));
  const start = Math.max(0, index < 0 ? 0 : index - 1);
  return lines.slice(start, start + 3).join(' ').replace(/\s+/g, ' ').trim().slice(0, 260);
}

function selectRoute(query) {
  const q = query.toLowerCase();
  if (/\b(mcp|tool|tools|repo|repos|ready|readiness|blocker|blockers|score|maturity|graph)\b/.test(q)) {
    return { route: 'graph', reason: 'graph terms detected: repos, readiness, blockers, tools, or graph state' };
  }
  if (/\b(rag|evidence|source|citation|config|supports)\b/.test(q)) {
    return { route: 'rag', reason: 'source expansion terms detected: evidence, RAG, citation, or config' };
  }
  if (/["'`]/.test(query)) return { route: 'lexical', reason: 'quoted or exact-match query detected' };
  return { route: 'hybrid', reason: 'default hybrid route: graph narrowing followed by source expansion' };
}

function nodeText(node) {
  return [node.id, node.type, node.label, node.repo, node.source, JSON.stringify(node.properties ?? {})]
    .join(' ')
    .toLowerCase();
}

function scoreNode(node, terms) {
  const text = nodeText(node);
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
}

function citationsFor(nodes, terms, limit = 8) {
  const seen = new Set();
  const citations = [];
  for (const node of nodes) {
    for (const path of node.evidence ?? []) {
      const key = `${node.repo}:${path}`;
      if (seen.has(key)) continue;
      seen.add(key);
      citations.push({
        repo: node.repo,
        path,
        nodeId: node.id,
        sourceDate: sourceDate(node.repo, path),
        reason: `${node.type} evidence for ${node.label}`,
        excerpt: readExcerpt(node.repo, path, terms)
      });
      if (citations.length >= limit) return citations;
    }
  }
  return citations;
}

function freshness(citations) {
  const dates = citations.map((citation) => citation.sourceDate).filter(Boolean).sort();
  return {
    sourceDateCount: dates.length,
    oldestSourceDate: dates[0] ?? null,
    newestSourceDate: dates[dates.length - 1] ?? null
  };
}

function repoNodes(graph) {
  return graph.nodes.filter((node) => node.type === 'repo');
}

function answerReadyRepos(graph) {
  const ready = repoNodes(graph).filter((node) => node.properties?.maturity === 'ready');
  const names = ready.map((node) => `${node.repo} (${node.properties.score}/100)`).sort();
  return {
    answer: `${ready.length}/${repoNodes(graph).length} repos are ready for graph/RAG/MCP: ${names.join(', ')}.`,
    nodes: ready,
    confidence: ready.length === repoNodes(graph).length ? 0.95 : 0.82
  };
}

function answerBlockers(graph) {
  const blockers = graph.nodes.filter((node) => node.type === 'blocker');
  if (blockers.length === 0) {
    return {
      answer: 'No repo blockers are present in the latest graph snapshot.',
      nodes: repoNodes(graph).slice(0, 8),
      confidence: 0.94
    };
  }
  return {
    answer: `${blockers.length} blocker nodes are present: ${blockers.map((node) => `${node.repo}: ${node.label}`).join('; ')}.`,
    nodes: blockers,
    confidence: 0.88
  };
}

function answerTools(graph, terms) {
  const repo = terms.find((term) => term.endsWith('-os') || term.endsWith('-ai') || term.endsWith('-ui'));
  const tools = graph.nodes.filter((node) => node.type === 'tool' && (!repo || node.repo === repo));
  return {
    answer:
      tools.length > 0
        ? `${repo ?? 'Fleet'} exposes ${tools.length} MCP tool nodes: ${tools.map((node) => `${node.repo}:${node.label}`).join(', ')}.`
        : `${repo ?? 'Requested scope'} has no MCP tool nodes in the latest graph snapshot.`,
    nodes: tools,
    confidence: tools.length > 0 ? 0.9 : 0.72
  };
}

function answerEvidence(graph, terms) {
  const repo = terms.find((term) => term.endsWith('-os') || term.endsWith('-ai') || term.endsWith('-ui'));
  const kind = ['rag', 'mcp', 'graph', 'eval'].find((item) => terms.includes(item));
  const nodes = graph.nodes.filter((node) => {
    if (repo && node.repo !== repo) return false;
    if (kind && !node.id.includes(`:${kind}`) && node.properties?.kind !== kind) return false;
    return node.type === 'config' || node.type === 'evidence';
  });
  return {
    answer:
      nodes.length > 0
        ? `${repo ?? 'Fleet'} ${kind ?? 'requested'} evidence is represented by ${nodes.length} graph nodes with cited source files.`
        : `No matching evidence nodes found for ${repo ?? 'fleet'} ${kind ?? 'query'}.`,
    nodes,
    confidence: nodes.length > 0 ? 0.88 : 0.55
  };
}

function answerLexical(graph, terms) {
  const matches = graph.nodes
    .map((node) => ({ node, score: scoreNode(node, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.node.id.localeCompare(b.node.id))
    .slice(0, 12)
    .map((item) => item.node);
  return {
    answer:
      matches.length > 0
        ? `Lexical retrieval found ${matches.length} matching graph nodes: ${matches.map((node) => node.id).join(', ')}.`
        : 'Lexical retrieval found no matching graph nodes.',
    nodes: matches,
    confidence: matches.length > 0 ? 0.78 : 0.4
  };
}

function answerQuery(graph, item) {
  const terms = termsFor(item.query);
  const selected = selectRoute(item.query);
  const q = item.query.toLowerCase();
  let result;
  if (/\bready|readiness\b/.test(q)) result = answerReadyRepos(graph);
  else if (/\bblocker|blockers|blocked\b/.test(q)) result = answerBlockers(graph);
  else if (/\bmcp|tool|tools\b/.test(q)) result = answerTools(graph, terms);
  else if (/\brag|evidence|source|citation|config|supports\b/.test(q)) result = answerEvidence(graph, terms);
  else result = answerLexical(graph, terms);

  const citations = citationsFor(result.nodes, terms);
  const issues = [];
  if (citations.length === 0) issues.push('no citations returned');
  if (result.confidence < 0.7) issues.push('confidence below 0.70');

  const answer = {
    id: item.id,
    query: item.query,
    route: selected.route,
    routeReason: selected.reason,
    answer: result.answer,
    confidence: result.confidence,
    citations,
    freshness: freshness(citations),
    retrieval: {
      graphNodeIds: result.nodes.map((node) => node.id),
      evidencePaths: citations.map((citation) => `${citation.repo}/${citation.path}`)
    },
    ok: issues.length === 0,
    issues
  };

  if (item.expects) {
    const haystack = JSON.stringify(answer).toLowerCase();
    const missing = item.expects.filter((term) => !haystack.includes(term.toLowerCase()));
    if (missing.length > 0) {
      answer.ok = false;
      answer.issues.push(`golden expectation missing: ${missing.join(', ')}`);
    }
  }

  return answer;
}

function buildWitness() {
  if (!existsSync(GRAPH_PATH)) {
    return {
      schema: 'gtcx://ecosystem-os/kaleidoscope-ai/query-service/v1',
      generatedAt: new Date().toISOString(),
      repo: 'ecosystem-os',
      phase: 'phase-2-unified-query-service',
      ok: false,
      summary: { queryCount: 0, passedQueries: 0, failedQueries: 0, averageConfidence: 0 },
      queries: [],
      issues: [`missing graph snapshot: ${GRAPH_REL}`]
    };
  }

  const graph = readJson(GRAPH_PATH);
  const queryItems = SINGLE_QUERY ? [{ id: 'ad-hoc', query: SINGLE_QUERY }] : GOLDEN ? GOLDEN_QUERIES : [GOLDEN_QUERIES[0]];
  const queries = queryItems.map((item) => answerQuery(graph, item));
  const passedQueries = queries.filter((query) => query.ok).length;
  const averageConfidence =
    queries.length === 0
      ? 0
      : Math.round((queries.reduce((total, query) => total + query.confidence, 0) / queries.length) * 100) / 100;
  const issues = [];
  if (!graph.ok) issues.push('graph snapshot is not ok');
  for (const query of queries) {
    for (const issue of query.issues) issues.push(`${query.id}: ${issue}`);
  }

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/query-service/v1',
    generatedAt: new Date().toISOString(),
    repo: 'ecosystem-os',
    phase: 'phase-2-unified-query-service',
    ok: graph.ok && passedQueries === queries.length,
    graphSnapshot: {
      path: GRAPH_REL,
      generatedAt: graph.generatedAt,
      nodeCount: graph.summary?.nodeCount ?? graph.nodes?.length ?? 0,
      edgeCount: graph.summary?.edgeCount ?? graph.edges?.length ?? 0
    },
    contracts: {
      queryService: 'pm/spec/kaleidoscope-ai/query-service.schema.json',
      graphSnapshot: 'pm/spec/kaleidoscope-ai/graph-snapshot.schema.json'
    },
    summary: {
      queryCount: queries.length,
      passedQueries,
      failedQueries: queries.length - passedQueries,
      averageConfidence
    },
    queries,
    issues
  };
}

function main() {
  const witness = buildWitness();
  if (WRITE) {
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, `${JSON.stringify(witness, null, 2)}\n`);
  }

  if (JSON_OUT) {
    console.log(JSON.stringify(witness, null, 2));
  } else {
    console.log('\n=== kaleidoscope:query:check ===\n');
    console.log(`queries: ${witness.summary.queryCount}`);
    console.log(`passed: ${witness.summary.passedQueries}`);
    console.log(`failed: ${witness.summary.failedQueries}`);
    console.log(`average-confidence: ${witness.summary.averageConfidence}`);
    console.log(`ok: ${witness.ok}`);
    if (WRITE) console.log(`witness: ${relative(REPO, OUT_PATH)}`);
    for (const issue of witness.issues) console.log(`issue: ${issue}`);
  }

  process.exit(witness.ok ? 0 : 1);
}

main();
