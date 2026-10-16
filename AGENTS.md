# AGENTS.md

Boules A. Marzouk's one-page About Me site — his application for Fredrin's
Forward Deployed Engineer role. Astro + TypeScript, static output, deployed
with Vercel. Page order: Hero → 01 What I've shipped → 02 Case study →
03 Built with Fredrin → Contact.

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install exact dependencies from `package-lock.json` (public npm via `.npmrc`) |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run check` | Type-check `.astro` and `.ts` files (`astro check`) |
| `npm run preview` | Serve the built `dist/` |

## Layout

```
src/
  pages/index.astro         page shell: imports tokens.css, renders sections in order
  components/
    Meta.astro              <head> tags: title, description
    Hero.astro              name, headline, location, primary links
    Shipped.astro           #shipped            — 01 What I've shipped
    CaseStudy.astro         #case-study         — 02 Case study
    BuiltWithFredrin.astro  #built-with-fredrin — 03 Built with Fredrin
    Contact.astro           #contact
  content/
    profile.ts              every personal fact (verbatim from the approved source)
    case-study.ts           case-study facts and benchmark numbers
    build-log.ts            how this page was built (tickets, CI time, Lighthouse)
  styles/tokens.css         the only source of colors, type, spacing, radius
```

## Rules

1. **Facts only from content files.** Every fact, number, name, date and URL
   on the page is read from `src/content/profile.ts`, `case-study.ts` or
   `build-log.ts`. Never invent or reword metrics, employers, dates or quotes;
   never hard-code them in a component. UI labels (headings, button text,
   section numbers 01–03) are fine.
2. **Edit only your ticket's files.** One component per section, so section
   tickets run in parallel without conflicts. Need a change in a file you do
   not own (another section, `index.astro`, `tokens.css`, a content file)?
   Note it on your ticket instead of editing it.
3. **Styles only from tokens.** Colors, fonts, font sizes, spacing and radius
   come from `var(--…)` in `src/styles/tokens.css` — no raw hex values, px
   spacing or new font stacks in components. Use component-scoped `<style>`.
   Breakpoint: `@media (max-width: 640px)`.
4. **No external requests.** No trackers, analytics, web fonts, CDNs or
   remote images. Built `dist/index.html` stays under 150 KB.
5. **Placeholders stay marked.** A value not yet known is the string
   `PLACEHOLDER`; never replace one with a guess.
6. **Git identity.** Commit as `Boules Marzouk <polesawny5@gmail.com>`; if
   `git config user.email` differs, use
   `git -c user.name="Boules Marzouk" -c user.email=polesawny5@gmail.com commit`.
   No work email anywhere in the repo.
7. **Never merge.** Boules reviews and merges every PR. Ask before force push,
   `reset --hard` or deleting a branch. Never touch the old portfolio repo
   (`bolesawny7.github.io/boules`) — link to it only.
8. `.claude/settings.local.json` is personal and git-ignored; never commit it.

## Definition of done

- `npm run build && npm run check` exit 0, and CI is green.
- Works at 360px wide with no horizontal scroll, and in light and dark mode.
- Keyboard-navigable: every link and button reachable with Tab, with a
  visible focus ring; one `<h1>` on the page, headings in order.
- Matches the approved mockups for its section.
- Every fact traces to a content file; no wording changes to sourced text.
- `dist/index.html` under 150 KB, with no external font or image URLs.
