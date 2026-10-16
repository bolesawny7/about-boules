# about-boules

Boules A. Marzouk's one-page About Me site, built with Fredrin as his
application for the Forward Deployed Engineer role.

## Live site

https://about-boules.vercel.app

## How it was built

Every figure below comes from [`src/content/build-log.ts`](src/content/build-log.ts),
the same file the page's "Built with Fredrin" section reads.

- **8 tickets**, each its own branch, worktree and pull request.
- **4 tickets ran in parallel.**
- **CI on main:** 1 min 10 s.
- **Lighthouse:** Performance 100, Accessibility 100, Best practices 100, SEO 100.

| Ticket | Pull request |
|---|---|
| Scaffold Astro site and make the repo agent-ready | [#1](https://github.com/bolesawny7/about-boules/pull/1) |
| Add CI checks, facts check and Vercel deploy | [#2](https://github.com/bolesawny7/about-boules/pull/2) |
| Build Hero and Contact sections | [#3](https://github.com/bolesawny7/about-boules/pull/3) |
| Build the What I've shipped section | [#5](https://github.com/bolesawny7/about-boules/pull/5) |
| Build the context-plugin case study section | [#6](https://github.com/bolesawny7/about-boules/pull/6) |
| Build the Built with Fredrin section and page meta | [#4](https://github.com/bolesawny7/about-boules/pull/4) |
| Polish, QA and fill the build log | [#7](https://github.com/bolesawny7/about-boules/pull/7) |
| Fix copy consistency across Shipped, profile, and Contact; rewrite README | [#10](https://github.com/bolesawny7/about-boules/pull/10) |

### CI gates

Every pull request and every push to `main` runs
[`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. Type-check (`astro check`)
2. Build
3. Page size: `dist/index.html` under 150 KB
4. HTML validation (`html-validate`)
5. Link check (`lychee`)
6. Facts check (`check-facts`)
7. Lighthouse CI budgets

## Agent-ready setup

- [`AGENTS.md`](AGENTS.md): the rules every agent follows. One component per
  section, facts only from `src/content/`, styles only from design tokens,
  no external requests, and `PLACEHOLDER` for any value not yet known.
- [`.fredrin/memory`](.fredrin/memory): project memory, including the
  decision record for the stack, structure and sources of truth.
- [`check-facts`](scripts/check-facts.ts): fails the build if the page shows
  any number, percentage, URL or email that is not in a content file.

## Run locally

```sh
npm ci            # install exact dependencies
npm run dev       # dev server at http://localhost:4321
npm run build     # static build into dist/
npm run check     # type-check
npm run check:facts  # facts check against dist/ (run after build)
npm run preview   # serve the built dist/
```
