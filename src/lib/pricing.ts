/**
 * Pricing engine for the interactive configurator (BLUEPRINT.md Phase 4).
 * Numbers live in src/content/pricing.ts — this file only holds the types
 * and the math, so editing a price never means touching component code.
 */

import { RATE_PREMIUMS, RATE_ROLES } from "@/content/pricing";
import type {
  RatePremium,
  RateRange,
  RateRole,
  RateRoleId,
  RateScaleRow,
  RateTierId,
} from "@/content/pricing";

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

// ---------------------------------------------------------------------------
// 2026 rate card. Types and figures live in src/content/pricing.ts; everything
// below is pure formatting and estimate math, so components never do price
// arithmetic themselves.
// ---------------------------------------------------------------------------

const usdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function formatUSD(amount: number): string {
  return `$${usdFormatter.format(amount)}`;
}

export function formatRange(
  range: RateRange,
  fmt: (amount: number) => string = formatINR,
): string {
  return `${fmt(range.min)} – ${fmt(range.max)}${range.openEnded ? "+" : ""}`;
}

export function applyPremium(
  range: RateRange,
  minPct: number,
  maxPct: number,
): RateRange {
  return {
    ...range,
    min: Math.round((range.min * (100 + minPct)) / 100 / 100) * 100,
    max: Math.round((range.max * (100 + maxPct)) / 100 / 100) * 100,
  };
}

export function getRole(roleId: RateRoleId): RateRole | undefined {
  return RATE_ROLES.find((role) => role.id === roleId);
}

export function getScaleRow(
  roleId: RateRoleId,
  rowId: string,
): RateScaleRow | undefined {
  return getRole(roleId)?.rows.find((row) => row.id === rowId);
}

export function premiumsFor(roleId: RateRoleId): RatePremium[] {
  return RATE_PREMIUMS.filter((premium) =>
    premium.appliesTo.includes(roleId),
  );
}

export interface EstimateInput {
  roleId: RateRoleId;
  rowId: string;
  tier: RateTierId;
  /** Premiums to fold in; ones that don't apply to `roleId` are ignored. */
  premiums?: readonly RatePremium["id"][];
}

export function estimateRange(input: EstimateInput): RateRange | null {
  const row = getScaleRow(input.roleId, input.rowId);
  if (!row) return null;

  const range = row.tiers[input.tier];
  const selectedIds = input.premiums ?? [];

  const applied = premiumsFor(input.roleId).filter((premium) =>
    selectedIds.includes(premium.id),
  );

  if (applied.length === 0) return range;

  const minPct = applied.reduce((sum, premium) => sum + premium.minPct, 0);
  const maxPct = applied.reduce((sum, premium) => sum + premium.maxPct, 0);

  return applyPremium(range, minPct, maxPct);
}
