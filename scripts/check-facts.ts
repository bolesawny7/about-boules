/// <reference types="node" />
// Facts check: fails if the built HTML shows any number, percentage, URL or
// email that is not in src/content/profile.ts, case-study.ts or build-log.ts.
// Section labels 01–03 are exempt. Run after `npm run build`:
//   npm run check:facts            (checks dist/)
//   npm run check:facts -- <dir>   (checks another build folder)

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse, NodeType, type HTMLElement, type Node } from 'node-html-parser';
import * as profile from '../src/content/profile';
import * as caseStudy from '../src/content/case-study';
import * as buildLog from '../src/content/build-log';

const EXEMPT_NUMBERS = new Set(['01', '02', '03']);

/** Tags whose text is never shown to a visitor. */
const SKIP_TAGS = new Set(['style', 'script', 'noscript', 'template']);
/** Attributes whose text a visitor (or a crawler / screen reader) reads. */
const TEXT_ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'value'];
/** Attributes that point somewhere. */
const URL_ATTRS = ['href', 'src', 'srcset', 'action', 'poster'];
/** <meta> tags whose `content` is not page copy. */
const SKIP_META = new Set(['viewport', 'color-scheme', 'theme-color', 'generator', 'robots']);

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const SCHEME_URL = /\b(?:https?:)?\/\/[^\s<>"'`)\]]+/gi;
const BARE_URL =
  /\b(?:[a-z0-9-]+\.)+(?:com|org|net|io|dev|app|ai|co|me|so|sh|xyz|edu|gov|eg|uk|vercel\.app)\b(?:\/[^\s<>"'`)\]]*)?/gi;
// Digits with optional decimal / thousands groups and a trailing percent.
// Dashes, arrows, slashes and "+" split tokens, so `46–99.8%` gives `46` and
// `99.8%`, `3.6/4.0` gives `3.6` and `4.0`, and `10 → 5 min` gives `10`, `5`.
const NUMBER = /\d+(?:[.,]\d+)*\s?%?/g;

function normalizeUrl(raw: string): string {
  return raw
    .trim()
    .replace(/[.,;:!?]+$/, '')
    .replace(/^mailto:/i, '')
    .replace(/^[a-z]+:\/\//i, '')
    .replace(/^\/\//, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}

interface Tokens {
  urls: string[];
  numbers: string[];
}

/** Pull URLs and emails out first, so their digits are not read as numbers. */
function tokenize(text: string): Tokens {
  const urls: string[] = [];
  let rest = text.normalize('NFKC');
  for (const re of [EMAIL, SCHEME_URL, BARE_URL]) {
    rest = rest.replace(re, (m) => {
      urls.push(normalizeUrl(m));
      return ' ';
    });
  }
  const numbers = (rest.match(NUMBER) ?? []).map((n) => n.replace(/\s/g, ''));
  return { urls, numbers };
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (typeof value === 'number') out.push(String(value));
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out));
}

function allowedTokens(): { urls: Set<string>; numbers: Set<string> } {
  const strings: string[] = [];
  collectStrings([profile, caseStudy, buildLog], strings);
  const urls = new Set<string>();
  const numbers = new Set<string>();
  for (const s of strings) {
    const t = tokenize(s);
    t.urls.forEach((u) => urls.add(u));
    t.numbers.forEach((n) => numbers.add(n));
    // A content `url` field may hold a bare value the regexes miss.
    if (/^[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(s)) urls.add(normalizeUrl(s));
  }
  return { urls, numbers };
}

/** An href/src that stays on this site (anchor or site-relative path). */
function isLocalRef(ref: string): boolean {
  return ref === '' || /^(#|\/(?!\/)|\.\.?\/|\?)/.test(ref) || /^[\w./-]+\.(css|js|png|svg|ico|webp|jpg|avif|txt|xml|json)$/i.test(ref);
}

interface Finding {
  file: string;
  token: string;
  kind: 'number' | 'url';
  where: string;
}

function checkFile(file: string, root: string, allowed: ReturnType<typeof allowedTokens>): Finding[] {
  const html = parse(readFileSync(file, 'utf8'), { comment: false });
  const findings: Finding[] = [];
  const rel = relative(root, file) || file;

  const check = (text: string, where: string) => {
    const t = tokenize(text);
    for (const u of t.urls) {
      if (!allowed.urls.has(u)) findings.push({ file: rel, token: u, kind: 'url', where });
    }
    for (const n of t.numbers) {
      if (!EXEMPT_NUMBERS.has(n) && !allowed.numbers.has(n)) {
        findings.push({ file: rel, token: n, kind: 'number', where });
      }
    }
  };

  const checkRef = (ref: string, where: string) => {
    for (const part of ref.split(',').map((p) => p.trim().split(/\s+/)[0] ?? '')) {
      if (isLocalRef(part)) continue;
      if (/^tel:/i.test(part)) check(part.slice(4), where);
      else if (/^(mailto:|[a-z]+:\/\/|\/\/)/i.test(part)) {
        const u = normalizeUrl(/^mailto:/i.test(part) ? part.replace(/\?.*$/, '') : part);
        if (!allowed.urls.has(u)) findings.push({ file: rel, token: u, kind: 'url', where });
      } else check(part, where);
    }
  };

  const walk = (node: Node) => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      const text = node.text.trim();
      if (text) check(text, `text "${text.slice(0, 80)}"`);
      return;
    }
    if (node.nodeType !== NodeType.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.rawTagName?.toLowerCase() ?? '';
    if (SKIP_TAGS.has(tag)) return;

    for (const a of TEXT_ATTRS) {
      const v = el.getAttribute(a);
      if (v) check(v, `<${tag} ${a}>`);
    }
    for (const a of URL_ATTRS) {
      const v = el.getAttribute(a);
      if (v) checkRef(v, `<${tag} ${a}>`);
    }
    const content = el.getAttribute('content');
    if (content) {
      const name = (el.getAttribute('name') ?? el.getAttribute('property') ?? '').toLowerCase();
      if (tag === 'meta' && (SKIP_META.has(name) || el.hasAttribute('http-equiv') || el.hasAttribute('charset'))) {
        // config, not copy
      } else if (/^(https?:)?\/\//i.test(content.trim()) || isLocalRef(content.trim())) {
        checkRef(content.trim(), `<${tag} content>`);
      } else {
        check(content, `<${tag} ${name || 'content'}>`);
      }
    }
    el.childNodes.forEach(walk);
  };

  walk(html);
  return findings;
}

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => join(e.parentPath, e.name));
}

const root = process.argv[2] ?? 'dist';
let files: string[];
try {
  files = htmlFiles(root);
} catch {
  console.error(`check-facts: no build at ${root}/ — run \`npm run build\` first.`);
  process.exit(2);
}
if (files.length === 0) {
  console.error(`check-facts: no .html files in ${root}/`);
  process.exit(2);
}

const allowed = allowedTokens();
const findings = files.flatMap((f) => checkFile(f, root, allowed));

if (findings.length > 0) {
  console.error(`check-facts: ${findings.length} value(s) not found in src/content/*.ts:\n`);
  for (const f of findings) console.error(`  ${f.file}: ${f.kind} "${f.token}" in ${f.where}`);
  console.error('\nAdd the fact to a content file (verbatim from its source) or remove it from the page.');
  process.exit(1);
}
console.log(`check-facts: ok — ${files.length} file(s), every number and URL traces to src/content/.`);
