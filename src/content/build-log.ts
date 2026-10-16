// How this page was built with Fredrin. Ticket titles are the Fredrin ticket
// titles; changes, PR links, CI time and Lighthouse scores come from the
// repo's merged pull requests and its CI runs on main.

export const PLACEHOLDER = 'PLACEHOLDER' as const;
export type Placeholder = typeof PLACEHOLDER;

export function isPlaceholder(value: unknown): value is Placeholder {
  return value === PLACEHOLDER;
}

export interface BuildTicket {
  title: string;
  /** One line on what the ticket changed. */
  changed: string | Placeholder;
  /** Full https URL of the ticket's pull request. */
  prUrl: string | Placeholder;
}

export interface LighthouseScores {
  performance: number | Placeholder;
  accessibility: number | Placeholder;
  bestPractices: number | Placeholder;
  seo: number | Placeholder;
}

export interface BuildLog {
  /** Intro line under the section heading. */
  summary: string;
  tickets: BuildTicket[];
  /** How many tickets ran at the same time. */
  parallelCount: number | Placeholder;
  /** Duration of the final CI run on main, e.g. "2 min 10 s". */
  ciDuration: string | Placeholder;
  lighthouse: LighthouseScores;
}

/** Vercel production URL (full https URL), used for canonical and og:url. */
export const siteUrl: string | Placeholder = 'https://about-boules.vercel.app/';

export const buildLog: BuildLog = {
  summary:
    'This page was built as Fredrin tickets: each one its own branch, worktree and pull request.',
  tickets: [
    {
      title: 'Scaffold Astro site and make the repo agent-ready',
      changed: 'Astro + TypeScript static site, design tokens, content files and one component per section.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/1',
    },
    {
      title: 'Add CI checks, facts check and Vercel deploy',
      changed: 'CI on every pull request: type-check, build, page-size limit, HTML and link checks, facts check and Lighthouse budgets.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/2',
    },
    {
      title: 'Build Hero and Contact sections',
      changed: 'Hero with name, headline and Email and GitHub buttons; Contact list with email, GitHub, LinkedIn and the old portfolio.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/3',
    },
    {
      title: "Build the What I've shipped section",
      changed: 'Three highlight cards, then Experience and Projects cards.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/5',
    },
    {
      title: 'Build the context-plugin case study section',
      changed: 'Case study copy, an inline SVG bar chart of the benchmark scenarios, and the Problem to Limits blocks.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/6',
    },
    {
      title: 'Build the Built with Fredrin section and page meta',
      changed: 'This build-log table and stats, plus Open Graph and Twitter meta tags.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/4',
    },
    {
      title: 'Polish, QA and fill the build log',
      changed: 'Filled this build log, showed the Shipped bullets verbatim, aligned section headers and fixed the Lighthouse report upload.',
      prUrl: 'https://github.com/bolesawny7/about-boules/pull/7',
    },
    {
      title: 'Fix copy consistency across Shipped, profile, and Contact; rewrite README',
      changed: 'Dropped the Shipped number labels, reworded the first highlight card, ended every bullet with a period, added no visa needed to the availability line and rewrote the README.',
      prUrl: PLACEHOLDER,
    },
  ],
  parallelCount: 4,
  ciDuration: '1 min 10 s',
  lighthouse: {
    performance: 100,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  },
};

/** How many tickets built the page; derived so it never drifts from the list. */
export const ticketCount: number = buildLog.tickets.length;
