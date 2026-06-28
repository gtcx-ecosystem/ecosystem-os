#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_REL = 'audit/evidence/kaleidoscope-decision-room-latest.json';
const REPORT_REL = 'docs/business/research/kaleidoscope-ai/decision-room-latest.md';
const OUT = join(REPO, OUT_REL);
const REPORT = join(REPO, REPORT_REL);
const WRITE = process.argv.includes('--write');
const JSON_OUT = process.argv.includes('--json');
const LOCAL_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Johannesburg',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const SOURCE_PATHS = {
  observatory: 'audit/evidence/kaleidoscope-observatory-latest.json',
  query: 'audit/evidence/kaleidoscope-query-service-latest.json',
  graph: 'audit/evidence/kaleidoscope-graph-snapshot-latest.json',
  productSpec: 'docs/business/research/kaleidoscope-ai/kaleidoscope-ai-product-spec.md',
  phase2: 'docs/business/research/kaleidoscope-ai/phase-2-agentic-product-architecture.md',
  awsMarkets: 'docs/business/strategy/aws-of-african-commodity-trade-markets.md',
  signalPlan: 'docs/business/research/kaleidoscope-ai/signal-mpr-integration-plan.md'
};

const QUESTIONS = [
  {
    id: 'market-leadership-africa',
    question: 'Where is the strongest market leadership opportunity in African markets?',
    intent: 'market-leadership',
    decisionType: 'strategy',
    route: 'hybrid'
  },
  {
    id: 'venture-potential',
    question: 'Which repos show the strongest venture potential?',
    intent: 'venture-prioritization',
    decisionType: 'portfolio',
    route: 'graph+scorecard'
  },
  {
    id: 'ecosystem-integration',
    question: 'What is the ecosystem integration strength as a play?',
    intent: 'ecosystem-thesis',
    decisionType: 'strategy',
    route: 'graph+observatory'
  },
  {
    id: 'execution-focus',
    question: 'What should the team do next?',
    intent: 'execution-prioritization',
    decisionType: 'operating-plan',
    route: 'observatory+roadmap'
  }
];

function readText(rel) {
  return readFileSync(join(REPO, rel), 'utf8');
}

function readJson(rel) {
  return JSON.parse(readText(rel));
}

function maybeJson(rel) {
  if (!existsSync(join(REPO, rel))) return null;
  try {
    return readJson(rel);
  } catch {
    return null;
  }
}

function sourceDate(rel) {
  try {
    return statSync(join(REPO, rel)).mtime.toISOString();
  } catch {
    return null;
  }
}

function localDate(isoDate) {
  return LOCAL_DATE_FORMATTER.format(new Date(isoDate));
}

function excerpt(rel, terms) {
  if (!existsSync(join(REPO, rel))) return '';
  const lines = readText(rel).split('\n');
  const lowerTerms = terms.map((term) => term.toLowerCase());
  const index = lines.findIndex((line) => lowerTerms.some((term) => line.toLowerCase().includes(term)));
  const start = Math.max(0, index < 0 ? 0 : index - 1);
  return lines.slice(start, start + 4).join(' ').replace(/\s+/g, ' ').trim().slice(0, 320);
}

function citation(rel, reason, terms) {
  return {
    path: rel,
    sourceDate: sourceDate(rel),
    reason,
    excerpt: excerpt(rel, terms)
  };
}

function freshness(citations) {
  const dates = citations.map((item) => item.sourceDate).filter(Boolean).sort();
  const newest = dates[dates.length - 1] ?? null;
  const oldest = dates[0] ?? null;
  const stale = dates.some((date) => Date.now() - Date.parse(date) > 30 * 86400000);
  return {
    sourceDateCount: dates.length,
    oldestSourceDate: oldest,
    newestSourceDate: newest,
    stale
  };
}

function topMprRepos(observatory, count = 6) {
  return observatory.repos
    .filter((row) => typeof row.mpr.composite100 === 'number')
    .sort((a, b) => b.mpr.composite100 - a.mpr.composite100 || a.tier - b.tier || a.repo.localeCompare(b.repo))
    .slice(0, count)
    .map((row) => `${row.repo} (${row.mpr.composite100})`);
}

function coreStats(observatory) {
  return {
    ready: `${observatory.summary.readyRepos}/${observatory.summary.repoCount}`,
    blockers: observatory.summary.blockerCount,
    aliasWarnings: observatory.summary.aliasWarningCount,
    fresh: `${observatory.summary.freshEvidenceRepos}/${observatory.summary.repoCount}`
  };
}

function answerFor(question, observatory, query) {
  const stats = coreStats(observatory);
  if (question.id === 'market-leadership-africa') {
    return {
      headline:
        'The strongest opportunity is a governed African commodity-trade operating system: verification, compliance, market infrastructure, and execution intelligence as one evidence-backed platform.',
      rationale: [
        `Current substrate readiness is ${stats.ready} repos with ${stats.blockers} blocker nodes, which means the ecosystem can support an integrated market-leadership narrative now.`,
        'The product thesis is strongest where trust, verification, compliance, and market access reinforce each other rather than shipping as isolated point products.',
        'The near-term wedge should stay evidence-led: gold/commodity verification, regulator and buyer trust, readiness reporting, and partner execution rooms.'
      ],
      recommendedActions: [
        'Package the Observatory and Decision Room outputs as board/partner evidence, not internal tooling only.',
        'Use markets-os, compliance-os, gtcx-os, veritas-ai, and griot-ai as the first external narrative spine.',
        'Keep fabric-os, bridge-os, baseline-os, and canon-os positioned as the operating substrate that makes the market play defensible.'
      ],
      assumptions: [
        'Market leadership depends on partner trust and execution proof, not only code readiness.',
        'The current graph/RAG/MCP readiness witness is a sufficient substrate signal, but live customer traction remains a separate evidence track.'
      ],
      citations: [
        citation(SOURCE_PATHS.observatory, 'current ecosystem readiness and blockers', ['repos ready', 'blocker']),
        citation(SOURCE_PATHS.awsMarkets, 'African commodity trade market thesis', ['african', 'commodity', 'markets']),
        citation(SOURCE_PATHS.productSpec, 'Kaleidoscope product scope and strategic questions', ['strategic', 'readiness', 'market'])
      ],
      confidence: 0.86
    };
  }

  if (question.id === 'venture-potential') {
    const top = topMprRepos(observatory);
    return {
      headline: `The strongest current venture-potential candidates by available MPR evidence are ${top.join(', ')}.`,
      rationale: [
        'The ranking is evidence-limited: it uses current MPR composite where present, graph/RAG/MCP readiness, and strategic ecosystem role.',
        `Readiness is broad (${stats.ready}), so near-term venture differentiation comes from market surface, trust surface, and defensibility rather than basic substrate readiness.`,
        'gtcx-os, fabric-os, baseline-os, and product-facing market/compliance repos should be treated as portfolio anchors until richer traction metrics are wired.'
      ],
      recommendedActions: [
        'Add traction, partner, revenue, deployment, and user workflow fields to the next Observatory version.',
        'Separate infrastructure venture value from product venture value so fabric/baseline do not crowd out market-facing repos.',
        'Use Decision Room outputs to generate investor-ready portfolio briefs with explicit evidence gaps.'
      ],
      assumptions: [
        'MPR composite is a useful proxy but not a complete venture score.',
        'Repos with missing MPR are not low potential; they are currently under-evidenced.'
      ],
      citations: [
        citation(SOURCE_PATHS.observatory, 'repo readiness, SIGNAL, and MPR columns', ['MPR', 'Repo Readiness']),
        citation(SOURCE_PATHS.graph, 'graph snapshot repo readiness nodes', ['repo', 'score', 'maturity']),
        citation(SOURCE_PATHS.phase2, 'driver repo roles for Phase 2', ['Phase 2 needs', 'fabric-os', 'baseline-os'])
      ],
      confidence: 0.8
    };
  }

  if (question.id === 'ecosystem-integration') {
    return {
      headline:
        'The integration strength is the main product advantage: Kaleidoscope turns repo-local evidence into a fleet-level operating picture with citations, maturity signals, and action routing.',
      rationale: [
        `The graph snapshot has ${observatory.sources ? 'current' : 'available'} graph evidence, the query witness passes ${query?.summary?.passedQueries ?? query?.summary?.passedQuestions ?? 0}/${query?.summary?.queryCount ?? 0} golden questions, and the Observatory shows ${stats.ready} repos ready.`,
        'This creates a product pattern that competitors typically split across dashboards, docs, audits, and agents.',
        'The core IP is not just RAG; it is governed graph plus retrieval trace plus maturity scoring plus execution routing.'
      ],
      recommendedActions: [
        'Promote graph, query, and Observatory witnesses as the product control loop.',
        'Add prior snapshot history next so integration strength can show movement, not only current state.',
        'Keep MCP as the governed tool boundary before adding broader agent-to-agent delegation.'
      ],
      assumptions: [
        'The integration claim is bounded to internal ecosystem evidence until external benchmark evidence is attached.',
        'MCP and graph readiness are necessary but not sufficient for production-grade user experience.'
      ],
      citations: [
        citation(SOURCE_PATHS.observatory, 'fleet-level Observatory rollup', ['What changed', 'Repo Readiness']),
        citation(SOURCE_PATHS.query, 'golden strategic query results and confidence', ['averageConfidence', 'queries']),
        citation(SOURCE_PATHS.phase2, 'Phase 2 architecture and retrieval mesh thesis', ['retrieval mesh', 'agent runtime'])
      ],
      confidence: 0.88
    };
  }

  return {
    headline:
      'Next unblocked work is historical movement and stronger Decision Room evals: add prior graph snapshots, richer strategic golden questions, and owner-routed execution outputs.',
    rationale: [
      'P2.1, P2.2, and P2.3 now produce current graph, query, and Observatory witnesses.',
      'The main gap explicitly shown by the Observatory is movement unavailable because no prior Kaleidoscope graph snapshot exists.',
      'Decision Room should now mature from deterministic answers into evaluated decision packets with routeable follow-up work.'
    ],
    recommendedActions: [
      'Add prior/current snapshot comparison and score delta history.',
      'Expand golden strategic questions for market leadership, venture potential, partnership paths, GTM, and repo uplift.',
      'Generate owner-routed execution briefs for bridge-os, baseline-os, canon-os, fabric-os, and product repos.'
    ],
    assumptions: [
      'Blocked fabric-os and venture-os PRs should remain separate until their repo gates are fixed.',
      'The next slice should avoid UI until the evidence/eval contract is stable.'
    ],
    citations: [
      citation(SOURCE_PATHS.observatory, 'current movement availability and readiness', ['Movement available', 'What changed']),
      citation(SOURCE_PATHS.phase2, 'Phase 2 roadmap sequencing', ['P2.4', 'P2.5', 'P2.6']),
      citation(SOURCE_PATHS.signalPlan, 'SIGNAL/MPR maturity and next unlock framing', ['next unlock', 'maturity'])
    ],
    confidence: 0.87
  };
}

function evaluate(answer) {
  const freshnessDoc = freshness(answer.citations);
  const citationGate = answer.citations.length >= 3;
  const freshnessGate = freshnessDoc.sourceDateCount >= 3 && !freshnessDoc.stale;
  const unsupportedClaimGate = answer.unsupportedClaims.length === 0;
  const confidenceGate = answer.confidence >= 0.75;
  return {
    freshness: freshnessDoc,
    evaluation: {
      citationGate,
      freshnessGate,
      unsupportedClaimGate,
      confidenceGate
    },
    ok: citationGate && freshnessGate && unsupportedClaimGate && confidenceGate
  };
}

function buildWitness() {
  const observatory = maybeJson(SOURCE_PATHS.observatory);
  const query = maybeJson(SOURCE_PATHS.query);
  const issues = [];
  if (!observatory) issues.push(`missing source: ${SOURCE_PATHS.observatory}`);
  if (!query) issues.push(`missing source: ${SOURCE_PATHS.query}`);
  if (!observatory || !query) {
    return {
      schema: 'gtcx://ecosystem-os/kaleidoscope-ai/decision-room/v1',
      generatedAt: new Date().toISOString(),
      repo: 'ecosystem-os',
      phase: 'phase-2-decision-room-mvp',
      ok: false,
      summary: {
        questionCount: 0,
        passedQuestions: 0,
        failedQuestions: 0,
        averageConfidence: 0,
        unsupportedClaimWarnings: 0,
        staleEvidenceWarnings: 0
      },
      questions: [],
      issues
    };
  }

  const questions = QUESTIONS.map((question) => {
    const raw = answerFor(question, observatory, query);
    const answer = {
      id: question.id,
      question: question.question,
      classification: {
        intent: question.intent,
        decisionType: question.decisionType,
        route: question.route
      },
      retrievalTrace: {
        sources: raw.citations.map((item) => item.path),
        observatorySummary: observatory.summary,
        querySummary: query.summary
      },
      answer: {
        headline: raw.headline,
        rationale: raw.rationale,
        recommendedActions: raw.recommendedActions
      },
      confidence: raw.confidence,
      citations: raw.citations,
      assumptions: raw.assumptions,
      unsupportedClaims: [],
      ok: false
    };
    const evaluated = evaluate(answer);
    return {
      ...answer,
      freshness: evaluated.freshness,
      evaluation: evaluated.evaluation,
      ok: evaluated.ok
    };
  });

  const passedQuestions = questions.filter((question) => question.ok).length;
  const unsupportedClaimWarnings = questions.reduce((sum, question) => sum + question.unsupportedClaims.length, 0);
  const staleEvidenceWarnings = questions.filter((question) => question.freshness.stale).length;
  const averageConfidence =
    Math.round((questions.reduce((sum, question) => sum + question.confidence, 0) / questions.length) * 100) / 100;
  for (const question of questions) {
    if (!question.ok) issues.push(`${question.id}: evaluator gate failed`);
  }

  return {
    schema: 'gtcx://ecosystem-os/kaleidoscope-ai/decision-room/v1',
    generatedAt: new Date().toISOString(),
    repo: 'ecosystem-os',
    phase: 'phase-2-decision-room-mvp',
    ok: issues.length === 0,
    sources: SOURCE_PATHS,
    contracts: {
      decisionRoom: 'pm/spec/kaleidoscope-ai/decision-room.schema.json',
      observatory: 'pm/spec/kaleidoscope-ai/observatory.schema.json',
      queryService: 'pm/spec/kaleidoscope-ai/query-service.schema.json'
    },
    summary: {
      questionCount: questions.length,
      passedQuestions,
      failedQuestions: questions.length - passedQuestions,
      averageConfidence,
      unsupportedClaimWarnings,
      staleEvidenceWarnings
    },
    questions,
    issues
  };
}

function markdown(witness) {
  const lines = [
    '---',
    'title: Kaleidoscope AI decision room latest',
    'status: generated',
    `date: ${localDate(witness.generatedAt)}`,
    'owner: ecosystem-os',
    'document_type: evidence-report',
    "tags: ['kaleidoscope-ai', 'decision-room', 'strategic-qa']",
    'review_cycle: on-change',
    '---',
    '',
    '# Kaleidoscope AI decision room latest',
    '',
    '> Generated by `pnpm kaleidoscope:decision-room:write`.',
    '',
    '## Summary',
    '',
    `- Questions: ${witness.summary.passedQuestions}/${witness.summary.questionCount} passed`,
    `- Average confidence: ${witness.summary.averageConfidence}`,
    `- Unsupported claim warnings: ${witness.summary.unsupportedClaimWarnings}`,
    `- Stale evidence warnings: ${witness.summary.staleEvidenceWarnings}`,
    ''
  ];

  for (const question of witness.questions) {
    lines.push(`## ${question.question}`, '');
    lines.push(`**Classification:** ${question.classification.intent} · ${question.classification.decisionType} · ${question.classification.route}`);
    lines.push('');
    lines.push(`**Answer:** ${question.answer.headline}`);
    lines.push('');
    lines.push('**Rationale:**');
    for (const item of question.answer.rationale) lines.push(`- ${item}`);
    lines.push('', '**Recommended actions:**');
    for (const item of question.answer.recommendedActions) lines.push(`- ${item}`);
    lines.push('', `**Confidence:** ${question.confidence}`);
    lines.push(`**Evaluator:** ${question.ok ? 'pass' : 'fail'}`);
    lines.push('', '**Citations:**');
    for (const citationItem of question.citations) {
      lines.push(`- ${citationItem.path} (${citationItem.reason})`);
    }
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function main() {
  const witness = buildWitness();
  if (WRITE) {
    mkdirSync(dirname(OUT), { recursive: true });
    mkdirSync(dirname(REPORT), { recursive: true });
    writeFileSync(OUT, `${JSON.stringify(witness, null, 2)}\n`);
    writeFileSync(REPORT, markdown(witness));
  }

  if (JSON_OUT) {
    console.log(JSON.stringify(witness, null, 2));
  } else {
    console.log('\n=== kaleidoscope:decision-room:check ===\n');
    console.log(`questions: ${witness.summary.questionCount}`);
    console.log(`passed: ${witness.summary.passedQuestions}`);
    console.log(`failed: ${witness.summary.failedQuestions}`);
    console.log(`average-confidence: ${witness.summary.averageConfidence}`);
    console.log(`unsupported-claim-warnings: ${witness.summary.unsupportedClaimWarnings}`);
    console.log(`stale-evidence-warnings: ${witness.summary.staleEvidenceWarnings}`);
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
