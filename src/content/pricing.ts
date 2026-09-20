import type { ServicePricing } from "@/lib/pricing";

/**
 * PLACEHOLDER NUMBERS. Every price below is a starting draft carried over
 * from the old static tier cards (Starter ₹12k / Growth ₹50k / Enterprise
 * ₹1L+), redistributed per service so the configurator can price by what a
 * client actually asks for instead of a one-size tier. Sanity-check every
 * figure against real project time before this goes live — see
 * BLUEPRINT.md Phase 4.
 *
 * rangeSpread = how far above the computed total the "up to" side of the
 * displayed range sits, because a configurator should never promise one
 * exact number before a scoping call.
 */
export const pricing: ServicePricing[] = [
  {
    key: "web-design",
    name: "Web Design",
    summary: "A site people trust in the first three seconds.",
    basePrice: 8000,
    baseIncludes: [
      "Single-page or brochure site design",
      "Mobile-first, responsive layout",
      "Source files handed off (Figma or equivalent)",
    ],
    rangeSpread: 0.4,
    features: [
      {
        id: "extra-pages",
        label: "Up to 5 pages",
        description: "Instead of a single page — internal linking, consistent nav.",
        priceDelta: 4000,
      },
      {
        id: "design-system",
        label: "Design system handoff",
        description: "Reusable components, tokens and a style guide, not just static screens.",
        priceDelta: 5000,
      },
      {
        id: "copywriting",
        label: "Copywriting included",
        description: "We write the on-page copy instead of you supplying it.",
        priceDelta: 2500,
      },
      {
        id: "illustration",
        label: "Custom illustration / icon set",
        description: "Original icons or illustrations instead of a stock/library set.",
        priceDelta: 3000,
      },
      {
        id: "security-review",
        label: "Security review before launch",
        description: "Pratyay reviews the build for common vulnerabilities before it goes live, with a short written report.",
        priceDelta: 9000,
      },
    ],
  },
  {
    key: "full-stack-dev",
    name: "Full-Stack Web Development",
    summary: "From a working prototype to something you'd trust with real users.",
    basePrice: 15000,
    baseIncludes: [
      "Modern framework build (Next.js or equivalent)",
      "Contact form + basic content management",
      "Deployment to production",
    ],
    rangeSpread: 0.5,
    features: [
      {
        id: "auth",
        label: "User accounts & login",
        description: "Sign-up, sign-in, sessions — email or social login.",
        priceDelta: 8000,
      },
      {
        id: "admin-dashboard",
        label: "Custom admin dashboard",
        description: "An internal screen for managing content or orders without touching code.",
        priceDelta: 12000,
      },
      {
        id: "database-cms",
        label: "Database + CMS integration",
        description: "Structured content that a non-developer can edit.",
        priceDelta: 7000,
      },
      {
        id: "payments",
        label: "Payment integration",
        description: "Razorpay/Stripe checkout wired end to end.",
        priceDelta: 6000,
      },
      {
        id: "realtime",
        label: "Real-time features",
        description: "Live updates, chat, or notifications via websockets.",
        priceDelta: 9000,
      },
      {
        id: "animations",
        label: "Interactive animations",
        description: "Motion-driven UI beyond basic fades — scroll-linked, gesture-based.",
        priceDelta: 4000,
      },
      {
        id: "security-review",
        label: "Security review before launch",
        description: "Pratyay reviews the build for common vulnerabilities before it goes live, with a short written report.",
        priceDelta: 9000,
      },
    ],
  },
  {
    key: "migration-vps",
    name: "Migration, VPS & Server Management",
    summary: "Move it, harden it, or hand it off to us to run.",
    basePrice: 5000,
    baseIncludes: [
      "Single-site migration between hosts",
      "DNS cutover with a zero-downtime plan",
      "Post-migration verification checklist",
    ],
    rangeSpread: 0.35,
    features: [
      {
        id: "vps-hardening",
        label: "VPS setup & hardening",
        description: "Fresh Linux box configured, firewalled and locked down.",
        priceDelta: 4000,
      },
      {
        id: "vpn-setup",
        label: "Personal VPN setup",
        description: "Self-hosted VPN on your own VPS — you pay hosting cost directly, this is setup only.",
        priceDelta: 2500,
      },
      {
        id: "backups",
        label: "Automated backups & recovery plan",
        description: "Scheduled backups with a tested restore procedure.",
        priceDelta: 3000,
      },
      {
        id: "cicd",
        label: "CI/CD pipeline",
        description: "Push-to-deploy instead of manual uploads.",
        priceDelta: 5000,
      },
      {
        id: "monitoring-retainer",
        label: "Ongoing monitoring & management",
        description: "We watch uptime and patch the server monthly.",
        priceDelta: 3000,
        recurring: true,
      },
    ],
  },
  {
    key: "cybersecurity-consultancy",
    name: "Cybersecurity Consultancy",
    summary: "Know where the risk is before it becomes an incident.",
    basePrice: 10000,
    baseIncludes: [
      "Risk assessment for one application or a small environment",
      "Written findings report",
      "Prioritized remediation guidance",
    ],
    rangeSpread: 0.4,
    features: [
      {
        id: "architecture-review",
        label: "Security architecture review",
        description: "Design-level review before or during a build, not just after.",
        priceDelta: 8000,
      },
      {
        id: "compliance",
        label: "Compliance guidance",
        description: "Practical alignment guidance for the frameworks relevant to your business.",
        priceDelta: 6000,
      },
      {
        id: "awareness-session",
        label: "Team security awareness session",
        description: "A working session with your staff on the risks specific to your setup.",
        priceDelta: 4000,
      },
      {
        id: "quarterly-retainer",
        label: "Quarterly review retainer",
        description: "We revisit the assessment every quarter as things change.",
        priceDelta: 5000,
        recurring: true,
      },
    ],
  },
  {
    key: "penetration-testing",
    name: "Penetration Testing & Ethical Hacking",
    summary: "Authorized, scoped attacks — with a report someone can act on.",
    basePrice: 18000,
    baseIncludes: [
      "Black-box test of one web application",
      "Full findings report with severity ratings",
      "One free retest after remediation",
    ],
    rangeSpread: 0.45,
    features: [
      {
        id: "network-pentest",
        label: "Network / infrastructure test",
        description: "Extends scope beyond the application to the hosts and network around it.",
        priceDelta: 12000,
      },
      {
        id: "mobile-pentest",
        label: "Mobile app test",
        description: "Adds an iOS/Android app to the engagement scope.",
        priceDelta: 15000,
      },
      {
        id: "social-engineering",
        label: "Social engineering simulation",
        description: "Authorized phishing or pretexting exercise against your team.",
        priceDelta: 8000,
      },
      {
        id: "second-retest",
        label: "Additional retest",
        description: "A second remediation-verification pass beyond the one included.",
        priceDelta: 3000,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 2026 rate card (source: india_freelance_pricing_2026_final.md, Sept 2026).
// Figures are transcribed exactly — never round, merge or "tidy" them, and
// keep overlaps between tiers as the source has them. Whole rupees / whole
// dollars only; a trailing "+" in the source is `openEnded: true`.
// Formatting and estimate math live in src/lib/pricing.ts, not here.
// ---------------------------------------------------------------------------

export type RateTierId = "entry" | "standard" | "senior";
export type RateRoleId = "designer" | "frontend" | "fullstack";
export type RateLevelId = "junior" | "mid" | "senior";

export interface RateRange {
  min: number;
  max: number;
  /** Source figure ended with "+" — render a "+" after the max. */
  openEnded?: boolean;
}

export interface RateScaleRow {
  id: string;
  label: string;
  /** Source scopes this row as solo-freelancer scope (design + dev by one person). */
  soloScope?: boolean;
  tiers: Record<RateTierId, RateRange>;
}

export interface RateRole {
  id: RateRoleId;
  label: string;
  summary: string;
  scaleHeading: string;
  rows: RateScaleRow[];
}

export interface RateBand {
  level: RateLevelId;
  label: string;
  years: string;
  usdPerHour: RateRange;
  inrPerHour: RateRange;
  inrPerMonth: RateRange;
}

export interface RatePremium {
  id: "security" | "specialist";
  label: string;
  /** Whole-number percentages: the low end applies to min, the high end to max. */
  minPct: number;
  maxPct: number;
  appliesTo: RateRoleId[];
  summary: string;
  includes: string[];
}

export interface RateTier {
  id: RateTierId;
  label: string;
  blurb: string;
}

export const RATE_CARD_UPDATED = "September 2026";

export const RATE_TIERS: RateTier[] = [
  {
    id: "entry",
    label: "Lean",
    blurb:
      "Template-based, limited custom code, minimal revisions. Best for budget MVPs.",
  },
  {
    id: "standard",
    label: "Standard",
    blurb: "Typical mid-level market rates.",
  },
  {
    id: "senior",
    label: "Premium",
    blurb: "Senior specialist market rates.",
  },
];

export const RATE_ROLES: RateRole[] = [
  {
    id: "designer",
    label: "Web Designer",
    summary:
      "Focuses on UI/UX design, wireframes, prototypes, and visual assets using tools like Figma or Adobe XD (No coding).",
    scaleHeading: "Website scale",
    rows: [
      {
        id: "landing",
        label: "Single Landing Page",
        tiers: {
          entry: { min: 1500, max: 4000 },
          standard: { min: 5000, max: 30000 },
          senior: { min: 30000, max: 75000, openEnded: true },
        },
      },
      {
        id: "small-site",
        label: "Small Website (2–5 pages)",
        tiers: {
          entry: { min: 5000, max: 12000 },
          standard: { min: 12000, max: 40000 },
          senior: { min: 40000, max: 65000 },
        },
      },
      {
        id: "standard-site",
        label: "Standard Website (5–10 pages)",
        tiers: {
          entry: { min: 12000, max: 25000 },
          standard: { min: 25000, max: 70000 },
          senior: { min: 70000, max: 150000, openEnded: true },
        },
      },
      {
        id: "large-app",
        label: "Large Web App / SaaS (11–25+ screens)",
        soloScope: true,
        tiers: {
          entry: { min: 30000, max: 60000 },
          standard: { min: 70000, max: 200000, openEnded: true },
          senior: { min: 200000, max: 400000, openEnded: true },
        },
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend Developer",
    summary:
      "Converts design files (Figma) into responsive client-side code using HTML, CSS, JavaScript, React, Next.js, or Vue.",
    scaleHeading: "Website scale",
    rows: [
      {
        id: "landing",
        label: "Single Landing Page",
        tiers: {
          entry: { min: 2500, max: 6000 },
          standard: { min: 6000, max: 45000 },
          senior: { min: 45000, max: 75000, openEnded: true },
        },
      },
      {
        id: "small-site",
        label: "Small Website (2–5 pages)",
        tiers: {
          entry: { min: 6000, max: 10000 },
          standard: { min: 10000, max: 35000 },
          senior: { min: 35000, max: 60000 },
        },
      },
      {
        id: "standard-site",
        label: "Standard Website (5–10 pages)",
        tiers: {
          entry: { min: 10000, max: 18000 },
          standard: { min: 18000, max: 80000 },
          senior: { min: 75000, max: 150000, openEnded: true },
        },
      },
      {
        id: "large-app",
        label: "Large Corporate / App (11–25+ pages)",
        tiers: {
          entry: { min: 20000, max: 40000 },
          standard: { min: 40000, max: 220000, openEnded: true },
          senior: { min: 150000, max: 350000, openEnded: true },
        },
      },
    ],
  },
  {
    id: "fullstack",
    label: "Full-Stack Developer",
    summary:
      "Handles both Frontend UI and Backend logic, including servers, secure databases, APIs, state management, and authentication (MERN, Python, PHP, Django, etc.).",
    scaleHeading: "Project type",
    rows: [
      {
        id: "basic-dynamic",
        label: "Basic Dynamic Site (Blog/CMS, 5–10 pgs)",
        tiers: {
          entry: { min: 18000, max: 30000 },
          standard: { min: 40000, max: 100000 },
          senior: { min: 100000, max: 200000 },
        },
      },
      {
        id: "ecommerce",
        label:
          "E-commerce Store (Custom Shopify/WooCommerce + Payment Gateway Integration)",
        tiers: {
          entry: { min: 30000, max: 50000 },
          standard: { min: 80000, max: 200000 },
          senior: { min: 200000, max: 450000, openEnded: true },
        },
      },
      {
        id: "saas-dashboard",
        label:
          "Custom SaaS App Dashboard (15+ Logic Views, Solo Freelancer Scope)",
        soloScope: true,
        tiers: {
          entry: { min: 60000, max: 110000 },
          standard: { min: 200000, max: 500000, openEnded: true },
          senior: { min: 500000, max: 1000000, openEnded: true },
        },
      },
    ],
  },
];

export const RATE_BANDS: Record<RateRoleId, RateBand[]> = {
  designer: [
    {
      level: "junior",
      label: "Junior",
      years: "0–2 years",
      usdPerHour: { min: 5, max: 18 },
      inrPerHour: { min: 400, max: 1500 },
      inrPerMonth: { min: 15000, max: 50000 },
    },
    {
      level: "mid",
      label: "Mid-level",
      years: "2–5 years",
      usdPerHour: { min: 18, max: 30 },
      inrPerHour: { min: 1500, max: 2500 },
      inrPerMonth: { min: 50000, max: 100000 },
    },
    {
      level: "senior",
      label: "Senior",
      years: "5+ years",
      usdPerHour: { min: 30, max: 55, openEnded: true },
      inrPerHour: { min: 2500, max: 4500, openEnded: true },
      inrPerMonth: { min: 100000, max: 250000, openEnded: true },
    },
  ],
  frontend: [
    {
      level: "junior",
      label: "Junior",
      years: "0–2 years",
      usdPerHour: { min: 6, max: 20 },
      inrPerHour: { min: 500, max: 1700 },
      inrPerMonth: { min: 18000, max: 55000 },
    },
    {
      level: "mid",
      label: "Mid-level",
      years: "2–5 years",
      usdPerHour: { min: 20, max: 35 },
      inrPerHour: { min: 1700, max: 3000 },
      inrPerMonth: { min: 55000, max: 120000 },
    },
    {
      level: "senior",
      label: "Senior",
      years: "5+ years",
      usdPerHour: { min: 35, max: 65, openEnded: true },
      inrPerHour: { min: 3000, max: 5400, openEnded: true },
      inrPerMonth: { min: 120000, max: 270000, openEnded: true },
    },
  ],
  fullstack: [
    {
      level: "junior",
      label: "Junior",
      years: "0–2 years",
      usdPerHour: { min: 8, max: 25 },
      inrPerHour: { min: 650, max: 2100 },
      inrPerMonth: { min: 23000, max: 70000 },
    },
    {
      level: "mid",
      label: "Mid-level",
      years: "2–5 years",
      usdPerHour: { min: 25, max: 45 },
      inrPerHour: { min: 2100, max: 3700 },
      inrPerMonth: { min: 70000, max: 160000 },
    },
    {
      level: "senior",
      label: "Senior",
      years: "5+ years",
      usdPerHour: { min: 45, max: 80, openEnded: true },
      inrPerHour: { min: 3700, max: 6600, openEnded: true },
      inrPerMonth: { min: 160000, max: 400000, openEnded: true },
    },
  ],
};

export const RATE_PREMIUMS: RatePremium[] = [
  // appliesTo scoping is an interpretation of the source (which speaks of
  // "standard full-stack rates"); edit here to change.
  {
    id: "security",
    label: "Security hardening",
    minPct: 20,
    maxPct: 40,
    appliesTo: ["fullstack"],
    summary:
      "For projects that need cybersecurity hardening, encrypted data handling, or compliance-ready architecture.",
    includes: [
      "Security audit & threat modeling integration",
      "Secure authentication (2FA, OAuth, JWT implementations)",
      "Data encryption at rest & in transit (AES-256, TLS 1.3+)",
      "Compliance frameworks (GDPR, ISO 27001, PCI-DSS readiness)",
      "Penetration testing & vulnerability scanning",
      "Secure code review & secure SDLC practices",
    ],
  },
  // Same interpretation note as above. Source: "a further 20–30% above
  // standard rates" — treated as additive to the security premium.
  {
    id: "specialist",
    label: "Specialist technology",
    minPct: 20,
    maxPct: 30,
    appliesTo: ["fullstack"],
    summary: "For specialist stacks that carry an extra premium.",
    includes: ["AI/ML", "Blockchain", "Advanced cloud architecture"],
  },
];

// Public-facing notes. revisions / support / estimateDisclaimer become site
// commitments once rendered — confirm they match how the studio really works.
export const RATE_NOTES = {
  lowestCaveat:
    "Lean pricing relies on templates, limited custom code and minimal revision rounds.",
  soloVsAgency:
    "Priced for a small-team scope. Enterprise-scale builds with dedicated QA, DevOps and long-term support cost significantly more.",
  revisions: "2–3 revision rounds are typical; unlimited revisions are priced separately.",
  support: "30 days of post-launch support is standard.",
  estimateDisclaimer: "Estimate only — the final quote follows a scope discussion.",
};
