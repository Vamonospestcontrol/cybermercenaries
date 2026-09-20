/**
 * Pricing engine for the interactive configurator (BLUEPRINT.md Phase 4).
 * Numbers live in src/content/pricing.ts — this file only holds the types
 * and the math, so editing a price never means touching component code.
 */

export type ServiceKey =
  | "web-design"
  | "full-stack-dev"
  | "migration-vps"
  | "cybersecurity-consultancy"
  | "penetration-testing";

export interface FeatureOption {
  id: string;
  label: string;
  /** One line shown under the toggle explaining what it covers. */
  description: string;
  /** Flat amount (INR) added to the running total when this is selected. */
  priceDelta: number;
  /** Selected by default when a service is first chosen. */
  defaultOn?: boolean;
  /** True for ongoing costs (retainers, monitoring) vs one-time project cost. */
  recurring?: boolean;
}

export interface ServicePricing {
  key: ServiceKey;
  name: string;
  /** Shown as the configurator's intro line for this service. */
  summary: string;
  /** Starting price with zero add-ons selected. */
  basePrice: number;
  /** What the base price already includes, shown as a short checklist. */
  baseIncludes: string[];
  /** Toggleable add-ons specific to this service. */
  features: FeatureOption[];
  /**
   * How wide the displayed "starting range" is above the computed total,
   * e.g. 0.3 shows [total, total * 1.3]. This exists so the tool never
   * promises a single exact number before a real scoping call — quote
   * the range, not the point estimate.
   */
  rangeSpread: number;
}

export interface PriceEstimate {
  /** One-time project cost, base + selected one-time add-ons. */
  total: number;
  rangeLow: number;
  rangeHigh: number;
  /** Selected add-ons flagged `recurring`, summed separately (e.g. /month). */
  recurringTotal: number;
}

export function computeEstimate(
  service: ServicePricing,
  selectedFeatureIds: readonly string[],
): PriceEstimate {
  const selected = service.features.filter((f) =>
    selectedFeatureIds.includes(f.id),
  );

  const oneTimeAddOns = selected
    .filter((f) => !f.recurring)
    .reduce((sum, f) => sum + f.priceDelta, 0);

  const recurringTotal = selected
    .filter((f) => f.recurring)
    .reduce((sum, f) => sum + f.priceDelta, 0);

  const total = service.basePrice + oneTimeAddOns;

  return {
    total,
    rangeLow: total,
    rangeHigh: Math.round(total * (1 + service.rangeSpread)),
    recurringTotal,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
