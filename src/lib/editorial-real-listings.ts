/**
 * Approved editorial listings showcased when live Supabase data is absent.
 * Excludes domains the client chose not to feature publicly (e.g. adult content sites).
 */

export type EditorialListing = {
  initials: string;
  name: string;
  category: string;
  /** Used for grouping on /apps */
  directoryGroup: "Legal & calculators" | "Education & assessment";
  description: string;
  quote: string;
  featuredSummary: string;
  audience: string;
  whyListed: string;
  badgeMeaning: string;
  website: string;
  logoSrc: string;
  screenshotSrc: string;
  /** Public profile preview target */
  profileHref: string;
  /** Short desk note shown on cards */
  reviewDeskNote: string;
  checkedFor: string[];
  complianceNote: string;
};

export const editorialListings: EditorialListing[] = [
  {
    initials: "DU",
    name: "Divorce Calculator UK",
    category: "Calculator",
    directoryGroup: "Legal & calculators",
    description:
      "Free divorce financial settlement calculator for England and Wales: model matrimonial finances under general principles—property and mortgage buyouts, pensions, debts, scenarios and sustainability scoring—with optional paid full analysis.",
    quote:
      "The product stakes are clear upfront: modelling only, explicit “not legal advice,” and emphasis that financial data stays in-browser. That combination helps early visitors understand suitability before they invest serious time.",
    featuredSummary:
      "A focused financial-modelling calculator for England and Wales divorce scenarios, with unusually visible scope, privacy and disclaimer language.",
    audience:
      "Separating couples and advisers preparing for matrimonial finance conversations.",
    whyListed:
      "It makes a sensitive, regulated topic easier to explore while keeping non-advice boundaries visible.",
    badgeMeaning:
      "The badge documents listing review of the public website, claims, scope language and review profile.",
    website: "https://divorcecalculatoruk.co.uk",
    logoSrc: "/editorial-assets/divorce-calculator-uk-logo.png",
    screenshotSrc: "/editorial-assets/divorce-calculator-uk-screenshot.png",
    profileHref: "/example-review",
    reviewDeskNote:
      "Transparent scope and disclaimers, plus privacy-forward processing claims, stood out immediately on review.",
    checkedFor: [
      "Audience and geography (England and Wales)",
      "Non-advice disclaimers vs implied outcomes",
      "Core calculator coverage explained plainly",
      "Upgrade path clarity",
    ],
    complianceNote:
      "Review describes listing suitability only. It is not legal, financial or tax advice and does not predict court outcomes.",
  },
  {
    initials: "BP",
    name: "Bucks 11 Plus Tests",
    category: "Education",
    directoryGroup: "Education & assessment",
    description:
      "Diagnostics, GL-style practice and mock tests built specifically for Buckinghamshire’s 11+—including readiness checks, paced practice across four domains and a structured path toward the qualifying score framing parents already expect.",
    quote:
      "The positioning is unmistakably local: Bucks grammar context, pacing that mirrors timed papers, and clear language that readiness indicators are practice-based—not guarantees. That specificity reads as purposeful, not repurposed boilerplate.",
    featuredSummary:
      "A Buckinghamshire-specific 11+ practice and readiness platform with local grammar-school context and cautious score language.",
    audience:
      "Parents preparing children for Buckinghamshire 11+ practice and mock-test workflows.",
    whyListed:
      "The local focus, privacy framing and unofficial-score caveats make the offer easier for parents to assess.",
    badgeMeaning:
      "The badge documents review of public positioning, readiness-score framing and directory suitability.",
    website: "https://bucks11plustest.co.uk",
    logoSrc: "/editorial-assets/bucks-11-plus-tests-logo.jpg",
    screenshotSrc: "/editorial-assets/bucks-11-plus-tests-screenshot.png",
    profileHref: "/apps#listing-bucks-11-plus",
    reviewDeskNote:
      "Regional focus and cautious language around unofficial scores versus official tests felt editorially credible.",
    checkedFor: [
      "Audience fit (parents preparing for Bucks 11+)",
      "Clarity on what readiness scores measure",
      "Privacy expectations for learner data",
      "Product scope vs generic question banks",
    ],
    complianceNote:
      "Readiness indicators are contextualised as practice benchmarks. We do not verify exam outcomes.",
  },
  {
    initials: "TH",
    name: "11Plus Test Hub",
    category: "Education",
    directoryGroup: "Education & assessment",
    description:
      "National 11+ preparation system spanning GL, CEM, CSSE and ISEB-style routes—diagnostics, adaptive practice, mocks, drills and optional guided planning with parent-facing analytics.",
    quote:
      "Breadth reads intentional: multiple exam-route language, granular skill breakdown messaging, and a parent dashboard story that suggests ongoing visibility—not one-off gimmicks.",
    featuredSummary:
      "A national 11+ preparation platform covering multiple exam routes, diagnostics, practice and parent analytics.",
    audience:
      "Parents looking for structured 11+ diagnostics and preparation across several exam routes.",
    whyListed:
      "The breadth is explained through routes, skill breakdowns and parent visibility rather than generic question-bank claims.",
    badgeMeaning:
      "The badge documents review of public messaging, exam-route claims and practice-score boundaries.",
    website: "https://11plustesthub.co.uk",
    logoSrc: "/editorial-assets/11plus-test-hub-logo.png",
    screenshotSrc: "/editorial-assets/11plus-test-hub-screenshot.jpg",
    profileHref: "/apps#listing-11plus-test-hub",
    reviewDeskNote:
      "Broad route coverage paired with repeatable diagnostic framing makes the offer easy to summarise in a verified profile.",
    checkedFor: [
      "Route differentiation (GL, CEM, etc.) communicated clearly",
      "Non-official-score disclosures where shown",
      "Product depth beyond marketing headlines",
      "Family data handling statements",
    ],
    complianceNote:
      "Practice readiness language should stay distinct from guarantees of grammar school admission.",
  },
  {
    initials: "EC",
    name: "EHCP Clarity",
    category: "SEND Support",
    directoryGroup: "Education & assessment",
    description:
      "Guided EHCP application, appeal and annual-review pack builder for UK parents navigating SEND processes, with route-specific structures, Local Authority reason matching, evidence mapping and parent-confirmed PDF export.",
    quote:
      "The strongest part of the product is its operational framing: route-specific EHCP pack structures, editable parent-confirmed wording and repeated reminders that legal references are for context, not legal advice.",
    featuredSummary:
      "A SEND preparation tool for parents building structured EHCP application, appeal and review packs, with guided routes and Local Authority response-pattern matching.",
    audience:
      "UK parents preparing EHCP applications, appeals, annual reviews or provision complaints.",
    whyListed:
      "It turns a difficult administrative process into a structured preparation workflow while keeping parent review and non-advice boundaries visible.",
    badgeMeaning:
      "The badge documents review of public positioning, SEND-support scope, legal-reference framing and directory suitability.",
    website: "https://ehcpclarity.co.uk",
    logoSrc: "/editorial-assets/ehcp-clarity-logo.png",
    screenshotSrc: "/editorial-assets/ehcp-clarity-screenshot.png",
    profileHref: "/apps#listing-ehcp-clarity",
    reviewDeskNote:
      "Route-specific structures, parent confirmation before export and clear preparation-support language stood out during review.",
    checkedFor: [
      "Preparation support vs legal advice boundaries",
      "EHCP route coverage explained clearly",
      "Parent review and edit controls before export",
      "Pricing and export path clarity",
    ],
    complianceNote:
      "Review describes listing suitability only. EHCP Clarity is preparation support, not legal advice, tribunal representation or a guarantee of EHCP outcomes.",
  },
];

/**
 * Canonical example profile aligned with Divorce Calculator UK.
 * Stable review metadata for demonstration; dates are labelled without implying a statutory certification.
 */
export const exampleDivorceCalculatorProfile = {
  name: "Divorce Calculator UK",
  slugLabel: "divorce-calculator-uk",
  category: "Calculator",
  shortDescription:
    "A settlement modelling tool that helps separating couples in England and Wales understand how matrimonial finances could be analysed before speaking to solicitors—covering housing, pensions, debts, incomes and comparative scenarios—with paid options for fuller reporting.",
  website: "https://divorcecalculatoruk.co.uk",
  logoSrc: "/editorial-assets/divorce-calculator-uk-logo.png",
  screenshotSrc: "/editorial-assets/divorce-calculator-uk-screenshot.png",
  reviewId: "TFC-DCU-LISTING",
  reviewedDateLabel: "Published with this verification profile",
  founderName: "Operator listing",
  quote:
    "Scope, limitations and geography are surfaced early: suitability for England & Wales modelling, explicitly not legal advice, and framing that informs conversations rather than replacing professionals.",
  about:
    "Divorce Calculator UK focuses on matrimonial finances for England & Wales—including property splits and mortgage modelling, pensions, savings, debts and income-derived maintenance thinking—paired with structured settlement scenarios users can contrast before deeper legal spend.",
  founderNote:
    "The founders orient the funnel around preparedness: free baseline modelling first, clearer paid depth when households need fuller scenario grids and briefing documents—not an anonymous lead form pretending to replace counsel.",
  reviewSummary:
    "We verified the proposition as a disciplined calculator with transparent constraints: general law principles simplified for exploration, disclaimers reinforcing that courts and facts vary, and explicit boundaries that it cannot predict rulings.",
  helpsWithBullets: [
    "High-level matrimonial finance exploration pre-solicitor",
    "Scenario contrasts (sell and split vs retention paths, etc.)",
    "Thinking through sustainability of proposed settlements conceptually",
  ],
  checkedItems: [
    "Scope statement vs implied outcomes",
    "Legal disclaimer clarity (not personalised advice)",
    "Geographic applicability (England & Wales framing)",
    "Upgrade path communicates deliverables plainly",
    "Privacy-sensitive processing claims presented clearly",
  ],
  trustSignals: [
    "Manual listing review completed",
    "Public profile anchor for badge verification",
    "Website reviewed at publication time",
  ],
  complianceNote:
    "Review describes listing suitability only. It is not legal, financial or tax advice and does not predict court outcomes.",
};
