// How this page was built with Fredrin. STUB: every value is a PLACEHOLDER
// until the Polish and QA ticket records the real tickets, CI time and scores.

export const PLACEHOLDER = 'PLACEHOLDER' as const;

export interface BuildTicket {
  title: string;
  changed: string;
  prUrl: string;
}

export interface LighthouseScores {
  performance: number | typeof PLACEHOLDER;
  accessibility: number | typeof PLACEHOLDER;
  bestPractices: number | typeof PLACEHOLDER;
  seo: number | typeof PLACEHOLDER;
}

export interface BuildLog {
  tickets: BuildTicket[];
  parallelCount: number | typeof PLACEHOLDER;
  ciDuration: string;
  lighthouse: LighthouseScores;
}

export const buildLog: BuildLog = {
  tickets: [{ title: PLACEHOLDER, changed: PLACEHOLDER, prUrl: PLACEHOLDER }],
  parallelCount: PLACEHOLDER,
  ciDuration: PLACEHOLDER,
  lighthouse: {
    performance: PLACEHOLDER,
    accessibility: PLACEHOLDER,
    bestPractices: PLACEHOLDER,
    seo: PLACEHOLDER,
  },
};
