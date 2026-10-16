// Source of truth for every fact on the page. Copied verbatim from the
// approved profile-source.md — never reword, round or add to these strings.

export interface Link {
  /** Exactly as written in the source; add the scheme when rendering. */
  url: string;
  note?: string;
}

/**
 * A bullet with a number label. `text` stays verbatim from the source; the
 * page shows `label` beside `short`, which drops the number so it is never
 * said twice.
 */
export interface LabeledBullet {
  text: string;
  label: string;
  short: string;
}

export type Bullet = string | LabeledBullet;

export interface Role {
  company: string;
  title: string;
  dates: string;
  location: string;
  bullets: Bullet[];
  /** Phrases shown in bold wherever they appear in this role's bullets. */
  emphasis?: string[];
}

export interface Project {
  name: string;
  note: string;
  description: string;
  label?: string;
  short?: string;
  emphasis?: string[];
  /** Boules's own part, in his words. */
  myPart?: string;
}

/** The three headline results, worded as in the approved mockup. */
export interface Highlight {
  stat: string;
  what: string;
  where: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  gpa: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  links: Link[];
  highlights: Highlight[];
  experience: Role[];
  projects: Project[];
  education: Education;
}

export const profile: Profile = {
  name: 'Boules A. Marzouk',
  headline:
    'Software engineer building tooling for AI coding agents and the platform 30+ engineering teams ship on.',
  location: 'Cairo, Egypt (GMT+2), open to remote, works as a contractor',
  email: 'polesawny5@gmail.com',
  links: [
    { url: 'github.com/bolesawny7' },
    { url: 'linkedin.com/in/boules-marzouk' },
    { url: 'bolesawny7.github.io/boules', note: 'old portfolio, link only' },
  ],
  highlights: [
    {
      stat: '46–99.8%',
      what: 'fewer main-context tokens across benchmarked tasks',
      where: 'Procore · Claude Code + Cursor plugin',
    },
    {
      stat: '10 → 5 min',
      what: 'CI time with a shared, cached builder',
      where: 'Procore · developer platform',
    },
    {
      stat: '80%',
      what: 'less execution time on a critical backend API',
      where: 'Siemens',
    },
  ],
  experience: [
    {
      company: 'Procore',
      title: 'Software Engineer',
      dates: 'Feb 2026–present',
      location: 'remote',
      bullets: [
        'Built a cross-platform Node.js plugin for Claude Code and Cursor that cut main-context tokens 46–99.8% across five benchmark scenarios (median 95.7%) with no loss in answer quality.',
        'Designed a tiered delegation system routing bulk code analysis and boilerplate to lower-cost LLM subagents, keeping source code within approved boundaries',
        {
          text: 'Fail-open pre-read hooks, CodeQL fixes (TOCTOU races, shell injection), 66 automated tests',
          label: '66 tests',
          short:
            'Fail-open pre-read hooks and CodeQL fixes (TOCTOU races, shell injection), covered by automated tests.',
        },
        {
          text: 'Builds and operates Go and Ruby on Rails services on the internal developer platform (50+ integrated systems, 30+ teams)',
          label: '50+ systems',
          short:
            'Builds and operates Go and Ruby on Rails services on the internal developer platform; 30+ teams ship on it.',
        },
        "Halved a service's CI time (10 to 5 min) with a shared, cached builder; redesigned CI alerting to page only on blocking failures; global CI/CD on-call",
      ],
      emphasis: [
        'cross-platform Node.js plugin for Claude Code and Cursor',
        'tiered delegation system',
        'Fail-open pre-read hooks',
        'Builds and operates Go and Ruby on Rails services',
        "Halved a service's CI time (10 to 5 min)",
      ],
    },
    {
      company: 'Siemens Digital Industries Software',
      title: 'Software Engineer',
      dates: 'Feb 2025–Dec 2025',
      location: 'Cairo (hybrid)',
      bullets: [
        "Cut a critical backend API's execution time by 80%",
        {
          text: 'Helped design gRPC contracts connecting 10+ internal services',
          label: '10+ services',
          short: 'Helped design the gRPC contracts connecting these internal services.',
        },
        {
          text: 'Built a debugging tool still used by 40+ engineers (~30% faster issue resolution)',
          label: '40+ engineers',
          short: 'Built a debugging tool these engineers still use (~30% faster issue resolution).',
        },
      ],
      emphasis: [
        "Cut a critical backend API's execution time by 80%",
        'Helped design the gRPC contracts',
        'Built a debugging tool',
      ],
    },
  ],
  projects: [
    {
      name: 'AI-Assisted Agentic Testing System',
      note: 'Siemens-sponsored',
      description:
        'VS Code extension; LangGraph orchestrator routes to four agents; MCP tools and safe TypeScript AST edits; validated in sandboxed Playwright + Jest; React case study reached 100% line coverage with no manual edits',
      label: '100% coverage',
      short:
        'VS Code extension; LangGraph orchestrator routes to four agents; MCP tools and safe TypeScript AST edits; validated in sandboxed Playwright + Jest. React case study reached full line coverage with no manual edits.',
      emphasis: ['VS Code extension'],
      myPart: 'PLACEHOLDER',
    },
    {
      name: 'OS Memory Manager',
      note: 'C',
      description:
        'malloc, kernel-level allocation, shared memory, fault handlers, scheduler with semaphores and locks',
    },
  ],
  education: {
    degree: 'B.Sc. Computer Science',
    school: 'Ain Shams University',
    year: '2026',
    gpa: 'GPA 3.6/4.0',
  },
};
