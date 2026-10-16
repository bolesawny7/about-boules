// Case study content. STUB: the Case study ticket fills every value from its
// approved source. Nothing here may be rendered until it is filled.

export interface Scenario {
  label: string;
  /** Main-context token reduction, in percent. */
  reductionPct: number;
}

export interface CaseStudyBlock {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface CaseStudy {
  title: string;
  summary: string;
  chartCaption: string;
  scenarios: Scenario[];
  blocks: CaseStudyBlock[];
}

export const caseStudy: CaseStudy = {
  title: 'PLACEHOLDER',
  summary: 'PLACEHOLDER',
  chartCaption: 'PLACEHOLDER',
  scenarios: [],
  blocks: [],
};
