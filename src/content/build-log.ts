// How this page was built with Fredrin. Ticket titles are the Fredrin ticket
// titles; every other value stays PLACEHOLDER until the Polish and QA ticket
// records the real changes, PR links, CI time and Lighthouse scores.

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
export const siteUrl: string | Placeholder = PLACEHOLDER;

export const buildLog: BuildLog = {
  summary:
    'This page was built as Fredrin tickets: each one its own branch, worktree and pull request.',
  tickets: [
    { title: 'Scaffold Astro site and make the repo agent-ready', changed: PLACEHOLDER, prUrl: PLACEHOLDER },
    { title: 'Add CI checks, facts check and Vercel deploy', changed: PLACEHOLDER, prUrl: PLACEHOLDER },
    { title: 'Build Hero and Contact sections', changed: PLACEHOLDER, prUrl: PLACEHOLDER },
    { title: "Build the What I've shipped section", changed: PLACEHOLDER, prUrl: PLACEHOLDER },
    { title: 'Build the context-plugin case study section', changed: PLACEHOLDER, prUrl: PLACEHOLDER },
    { title: 'Build the Built with Fredrin section and page meta', changed: PLACEHOLDER, prUrl: PLACEHOLDER },
    { title: 'Polish, QA and fill the build log', changed: PLACEHOLDER, prUrl: PLACEHOLDER },
  ],
  parallelCount: 4,
  ciDuration: PLACEHOLDER,
  lighthouse: {
    performance: PLACEHOLDER,
    accessibility: PLACEHOLDER,
    bestPractices: PLACEHOLDER,
    seo: PLACEHOLDER,
  },
};
