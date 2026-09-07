/**
 * Single source of truth for site copy and structured content.
 * Components read from here. Keep prose changes in this file, not in JSX.
 *
 * Anything marked PLACEHOLDER is invented scaffolding and must be replaced
 * with real, verifiable content before launch — see BLUEPRINT.md, Phase 6
 * (content & launch audit). Do not publish fabricated stats or testimonials.
 */

export const site = {
  name: "CyberMercenaries",
  tagline: "We build the infrastructure attackers hope you never test.",
  subline:
    "Web design, full-stack development and offensive security — from two people who read systems for a living.",
  location: {
    city: "Agartala",
    state: "Tripura",
    country: "India",
    // Agartala coordinates — used for the footer geo-tag, not a generic label.
    lat: "23.8315° N",
    lng: "91.2868° E",
  },
  contact: {
    email: "cybermercenaries200@gmail.com",
    whatsapp: "919084472401", // EDIT ME: confirm country code before publishing
    whatsappDisplay: "+91 90844 72401",
  },
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const founders = [
  {
    name: "Mohit Kumar Yadav",
    role: "Web Design & Brand Identity",
    // PLACEHOLDER bio — replace with Mohit's own words.
    bio: "Designs the interfaces and identities clients actually remember, then hands off assets that don't fall apart in development.",
  },
  {
    name: "Pratyay Mukherjee",
    role: "Full-Stack Development, Cybersecurity & Penetration Testing",
    // PLACEHOLDER bio — replace with real wording before launch.
    bio: "Builds the application and the infrastructure under it, then attacks both before a stranger gets the chance to.",
  },
] as const;

export const services = [
  {
    key: "web-design",
    name: "Web Design",
    tagline: "Interfaces people trust on sight, built on a system that scales past page one.",
  },
  {
    key: "full-stack-dev",
    name: "Full-Stack Web Development",
    tagline: "Modern stacks, clean architecture, deploy-ready — not just demo-ready.",
  },
  {
    key: "migration-vps",
    name: "Migration, VPS & Server Management",
    tagline: "Zero-downtime moves, hardened Linux boxes, and someone who answers at 2am.",
  },
  {
    key: "cybersecurity-consultancy",
    name: "Cybersecurity Consultancy",
    tagline: "Risk assessment and architecture review before an incident forces the conversation.",
  },
  {
    key: "penetration-testing",
    name: "Penetration Testing & Ethical Hacking",
    tagline: "Authorized attacks that find what a scanner won't, with a report someone can act on.",
  },
] as const;

/**
 * PLACEHOLDER — leave empty until real client testimonials exist in the
 * client's own words. Do not invent quotes and attribute them to WhyCrime
 * or Forensic Fusion (or anyone else) without their sign-off; the current
 * index.html has two fabricated-looking quotes that need a real source or
 * removal before this goes live.
 */
export const testimonials: { quote: string; name: string; role: string }[] = [];

/**
 * Only claims that are true today. Do not backfill numbers to make the
 * studio look more established than it is — two real, well-documented
 * projects reads as more credible than an inflated stat block.
 */
export const stats = [
  { value: "2", label: "Full-stack projects shipped" },
  { value: "2026", label: "Studio est." },
  { value: "24/7", label: "Server & incident response" },
] as const;

export const work = [
  {
    slug: "whycrime",
    title: "WhyCrime",
    tags: ["Full-stack build", "Penetration testing"],
    description: "Crime-news and forensic-academy platform, built from scratch to deployment and later security-reviewed.",
  },
  {
    slug: "forensic-fusion",
    title: "Forensic Fusion",
    tags: ["Full-stack build", "Cybersecurity consultancy"],
    description: "Marketing site and e-learning platform for a forensic science training company, with certificate verification.",
  },
] as const;
