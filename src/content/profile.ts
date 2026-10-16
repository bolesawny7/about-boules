// Source of truth for every fact on the page. Copied verbatim from the
// approved profile-source.md — never reword, round or add to these strings.

export interface Link {
  /** Exactly as written in the source; add the scheme when rendering. */
  url: string;
  note?: string;
}

export interface Role {
  company: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
}

export interface Project {
  name: string;
  note: string;
  description: string;
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
  experience: [
    {
      company: 'Procore',
      title: 'Software Engineer',
      dates: 'Feb 2026–present',
      location: 'remote',
      bullets: [
        // The Case study ticket replaces this first bullet with its benchmarked wording.
        'Built a cross-platform Node.js plugin for Claude Code and Cursor that intercepts large whole-file reads, cutting main-context tokens 46–99.8% across benchmarked tasks',
        'Designed a tiered delegation system routing bulk code analysis and boilerplate to lower-cost LLM subagents, keeping source code within approved boundaries',
        'Fail-open pre-read hooks, CodeQL fixes (TOCTOU races, shell injection), 66 automated tests',
        'Builds and operates Go and Ruby on Rails services on the internal developer platform (50+ integrated systems, 30+ teams)',
        "Halved a service's CI time (10 to 5 min) with a shared, cached builder; redesigned CI alerting to page only on blocking failures; global CI/CD on-call",
      ],
    },
    {
      company: 'Siemens Digital Industries Software',
      title: 'Software Engineer',
      dates: 'Feb 2025–Dec 2025',
      location: 'Cairo (hybrid)',
      bullets: [
        "Cut a critical backend API's execution time by 80%",
        'Helped design gRPC contracts connecting 10+ internal services',
        'Built a debugging tool still used by 40+ engineers (~30% faster issue resolution)',
      ],
    },
  ],
  projects: [
    {
      name: 'AI-Assisted Agentic Testing System',
      note: 'Siemens-sponsored',
      description:
        'VS Code extension; LangGraph orchestrator routes to four agents; MCP tools and safe TypeScript AST edits; validated in sandboxed Playwright + Jest; React case study reached 100% line coverage with no manual edits',
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
