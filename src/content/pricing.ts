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
