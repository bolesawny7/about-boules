# 0001 — About Me page: stack, structure and sources of truth

- Status: accepted
- Date: 2026-10-16

## Context

Boules A. Marzouk's one-page About Me site is his application for Fredrin's
Forward Deployed Engineer role. It is built by several tickets running in
parallel (Hero + Contact, Shipped, Case study, Built with Fredrin + Meta),
so they must not edit the same files, and the page must never state a fact
that is not on record.

## Decisions

1. **Astro + TypeScript, static output.** One page, no server, no client JS
   by default; `npm run build` emits `dist/`.
2. **Deployed with Vercel** on Boules's personal account through Fredrin's
   Vercel app: a preview per PR, production from `main`.
3. **One file per section.** Each section is its own component in
   `src/components/`; `src/pages/index.astro` only orders them. A ticket edits
   only the files it names.
4. **Facts only from content files.** `src/content/profile.ts` (verbatim from
   the approved profile source), `case-study.ts` and `build-log.ts` are the
   only sources of facts, numbers and URLs. Unknown values are `PLACEHOLDER`.
5. **Approved mockups are the design reference.** `src/styles/tokens.css`
   holds the mockups' colors, type, spacing and radius, with dark mode via
   `prefers-color-scheme`; components use tokens only. System fonts, no
   external assets, page under 150 KB.
6. **Auto-merge is off.** Boules reviews and merges every PR himself.

## Consequences

- Token names (`--bg`, `--text`, `--muted`, `--accent`, `--s1`…`--s9`, …)
  bind every later ticket; renaming one is a cross-ticket change.
- A change to a shared file (`index.astro`, `tokens.css`, a content file)
  belongs to the ticket that owns it, or a new ticket.
