// Case study content, verbatim from the approved case-study-copy.md — never
// reword, round or add to these strings.

export interface Scenario {
  label: string;
  /** Main-context token reduction, verbatim (e.g. '95.8%'); also the bar width. */
  value: string;
}

export interface Bullet {
  /** Bold lead-in, as in the approved mockup. */
  lead: string;
  /** The rest of the sentence, after a single space. */
  text: string;
}

export interface CaseStudyBlock {
  heading: string;
  body: string;
  bullets?: Bullet[];
}

export interface CaseStudy {
  title: string;
  summary: string;
  chartCaption: string;
  scenarios: Scenario[];
  blocks: CaseStudyBlock[];
}

export const caseStudy: CaseStudy = {
  title: 'Case study: making coding agents cheaper to run',
  summary: 'Median 95.7% fewer main-context tokens, with every graded fact still correct.',
  chartCaption: 'Main-context token reduction per scenario',
  scenarios: [
    { label: 'Single large file question', value: '95.8%' },
    { label: 'Source and test comparison', value: '75.8%' },
    { label: 'Cross-service trace', value: '95.7%' },
    { label: 'Lookup in a very large schema file', value: '46.2%' },
    { label: 'Boilerplate generation', value: '99.8%' },
  ],
  blocks: [
    {
      heading: 'Problem',
      body: 'Coding agents like Claude Code and Cursor often read entire files into their main context when they need only a few lines. On a large monorepo that burns tokens and crowds out the instructions that matter.',
    },
    {
      heading: 'Approach',
      body: 'A cross-platform Node.js plugin that changes how agents read code. Files over a size threshold are never read whole: the agent searches first, then reads only the windows it needs. Bulk work like boilerplate goes to a cheaper model, and answers stay compact.',
    },
    {
      heading: 'Safety',
      body: 'The hooks fail open. If anything goes wrong, the agent reads the file normally, so the plugin never blocks a developer. I fixed the CodeQL findings it raised, including TOCTOU file-system races and shell injection, and covered behavior across environments with 66 automated tests.',
    },
    {
      heading: 'Evidence',
      body: "I ran a paired benchmark: five fixed prompts on a large production monorepo, each answered by a fresh agent with and without the plugin's read discipline, with every answer graded against a fact checklist.",
      bullets: [
        { lead: 'Main-context tokens fell 46–99.8%', text: 'across the five scenarios (median 95.7%).' },
        { lead: 'Every graded fact passed in both runs,', text: 'so quality held.' },
        {
          lead: 'Estimated cost fell in three of five scenarios',
          text: '(median 64%). On the two smallest tasks, delegation overhead made them slightly more expensive.',
        },
      ],
    },
    {
      heading: 'Limits and next',
      body: 'Five scenarios is a small sample. The confidence interval for the average saving still includes zero, and costs are estimates from list prices. Next is a larger, more varied task set to tighten that interval.',
    },
  ],
};
