#!/usr/bin/env node
/** @file agency:export — branded HTML export from Agency deliverables */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const write = process.argv.includes('--write');

function nowIso() {
  return new Date().toISOString();
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function stripFrontmatter(md) {
  if (!md.startsWith('---')) return { body: md, meta: {} };
  const end = md.indexOf('---', 3);
  if (end === -1) return { body: md, meta: {} };
  const fm = md.slice(3, end).trim();
  const meta = {};
  for (const line of fm.split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return { body: md.slice(end + 3).trim(), meta };
}

function mdToHtml(body) {
  const lines = body.split('\n');
  const out = [];
  let inTable = false;

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (inTable) {
        out.push('</tbody></table>');
        inTable = false;
      }
      continue;
    }
    if (t.startsWith('# ')) {
      out.push(`<h1>${inline(t.slice(2))}</h1>`);
    } else if (t.startsWith('## ')) {
      out.push(`<h2>${inline(t.slice(3))}</h2>`);
    } else if (t.startsWith('### ')) {
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
    } else if (t.startsWith('|') && t.endsWith('|')) {
      const cells = t.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c.replace(/:/g, '')))) continue;
      if (!inTable) {
        out.push('<table><thead><tr>' + cells.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>');
        inTable = true;
      } else {
        out.push('<tr>' + cells.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>');
      }
    } else if (t.startsWith('> ')) {
      out.push(`<blockquote>${inline(t.slice(2))}</blockquote>`);
    } else if (t.startsWith('- ')) {
      out.push(`<li>${inline(t.slice(2))}</li>`);
    } else if (t.startsWith('_') && t.endsWith('_')) {
      out.push(`<p class="footer">${inline(t.slice(1, -1))}</p>`);
    } else {
      if (inTable) {
        out.push('</tbody></table>');
        inTable = false;
      }
      out.push(`<p>${inline(t)}</p>`);
    }
  }
  if (inTable) out.push('</tbody></table>');
  return out.join('\n');
}

function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function buildHtml({ title, bodyHtml, tokens }) {
  const c = tokens.colors;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    :root {
      --primary-900: ${c.primary['900']};
      --accent-gold: ${c.accent.gold};
      --neutral-0: ${c.neutral['0']};
      --neutral-50: ${c.neutral['50']};
      --neutral-700: ${c.neutral['700']};
      --font-display: ${tokens.typography.fontFamilies.display};
      --font-body: ${tokens.typography.fontFamilies.body};
    }
    body {
      font-family: var(--font-body);
      color: var(--neutral-700);
      background: var(--neutral-50);
      margin: 0;
      padding: 2rem;
      line-height: 1.5;
    }
    .sheet {
      max-width: 800px;
      margin: 0 auto;
      background: var(--neutral-0);
      padding: 3rem;
      border-top: 4px solid var(--accent-gold);
      box-shadow: 0 4px 24px rgba(11, 26, 43, 0.08);
    }
    h1 { font-family: var(--font-display); color: var(--primary-900); font-size: 2rem; margin-top: 0; }
    h2 { color: var(--primary-900); font-size: 1.25rem; border-bottom: 1px solid var(--neutral-50); padding-bottom: 0.25rem; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem; }
    th, td { border: 1px solid var(--neutral-50); padding: 0.5rem 0.75rem; text-align: left; }
    th { background: var(--primary-900); color: var(--neutral-0); }
    blockquote { border-left: 3px solid var(--accent-gold); margin: 1rem 0; padding-left: 1rem; color: var(--primary-900); }
    .footer { font-size: 0.8rem; color: #6B7A8C; margin-top: 2rem; }
    a { color: var(--primary-900); }
  </style>
</head>
<body>
  <article class="sheet">
${bodyHtml}
  </article>
</body>
</html>
`;
}

function exportOnePager(root) {
  const tokens = readJson(join(root, 'pm/agency/brand/tokens.json'));
  const src = join(root, 'pm/agency/packs/gr-t2/deliverables/grt2-one-pager.md');
  const dest = join(root, 'pm/agency/packs/gr-t2/exports/grt2-one-pager.html');
  const md = readFileSync(src, 'utf8');
  const { body, meta } = stripFrontmatter(md);
  const html = buildHtml({
    title: meta.title || 'GR-T2 one-pager',
    bodyHtml: mdToHtml(body),
    tokens,
  });
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  return { id: 'grt2-sovereign-one-pager', src, dest, bytes: Buffer.byteLength(html) };
}

const results = [];
const errors = [];

try {
  results.push(exportOnePager(root));
} catch (e) {
  errors.push(String(e.message || e));
}

const witness = {
  schema: 'gtcx://ecosystem-os/agency-export/v1',
  updated: nowIso(),
  ok: errors.length === 0,
  exports: results,
  errors,
};

if (write) {
  mkdirSync(join(root, 'audit/evidence'), { recursive: true });
  writeFileSync(join(root, 'audit/evidence/agency-export-latest.json'), JSON.stringify(witness, null, 2) + '\n');
}

if (!witness.ok) {
  console.error(JSON.stringify(witness, null, 2));
  process.exit(1);
}
process.stdout.write(JSON.stringify(witness, null, 2) + '\n');
