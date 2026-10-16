# about-boules

Boules Marzouk's About Me page, built with Fredrin as my application for the
Forward Deployed Engineer role.

## Live site

https://about-boules.vercel.app/

## How it was built

- 7 tickets, 4 of which ran in parallel.
- Each ticket landed as a reviewed PR with CI:
  - [Scaffold Astro site and make the repo agent-ready](https://github.com/bolesawny7/about-boules/pull/1)
  - [Add CI checks, facts check and Vercel deploy](https://github.com/bolesawny7/about-boules/pull/2)
  - [Build Hero and Contact sections](https://github.com/bolesawny7/about-boules/pull/3)
  - [Build the What I've shipped section](https://github.com/bolesawny7/about-boules/pull/5)
  - [Build the context-plugin case study section](https://github.com/bolesawny7/about-boules/pull/6)
  - [Build the Built with Fredrin section and page meta](https://github.com/bolesawny7/about-boules/pull/4)
  - [Polish, QA and fill the build log](https://github.com/bolesawny7/about-boules/pull/7)

Source: `src/content/build-log.ts`.

## Agent-ready setup

- [AGENTS.md](AGENTS.md) rules:
  - One file per section.
  - Facts come only from the content files in `src/content/`.
- Project memory: `.fredrin/memory`.
- CI gates on every pull request:
  - `astro check`
  - HTML validation
  - Link check
  - Lighthouse budgets
  - `check-facts`

## Run locally

1. `npm ci`
2. `npm run dev` (http://localhost:4321)
3. `npm run build`
4. `npm run check`
