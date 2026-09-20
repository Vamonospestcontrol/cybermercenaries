"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { pricing, RATE_SERVICE_MAP, RATE_TIERS } from "@/content/pricing";
import type { RateRange, RateTierId } from "@/content/pricing";
import {
  type ServiceKey,
  computeEstimate,
  estimateRange,
  formatINR,
  formatRange,
  getRole,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingConfigurator() {
  const prefersReducedMotion = useReducedMotion();
  const [activeService, setActiveService] = useState<ServiceKey>(
    pricing[0].key,
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [scopeId, setScopeId] = useState<string>("");
  const [tier, setTier] = useState<RateTierId>("standard");

  const service = useMemo(
    () => pricing.find((s) => s.key === activeService)!,
    [activeService],
  );

  const estimate = useMemo(
    () => computeEstimate(service, selectedIds),
    [service, selectedIds],
  );

  // Rate-card path — only for services present in RATE_SERVICE_MAP.
  const rateRoleId = RATE_SERVICE_MAP[activeService];
  const rateRole = useMemo(
    () => (rateRoleId ? getRole(rateRoleId) : undefined),
    [rateRoleId],
  );
  const isMapped = !!rateRole && rateRole.rows.length > 0;

  // Falls back to the role's first row (default) when scopeId is empty/stale.
  const activeScopeId = useMemo(() => {
    if (!isMapped) return "";
    const hasScope = rateRole!.rows.some((row) => row.id === scopeId);
    return hasScope ? scopeId : rateRole!.rows[0].id;
  }, [isMapped, rateRole, scopeId]);

  const rateRange = useMemo<RateRange | null>(() => {
    if (!isMapped || !rateRoleId || !activeScopeId) return null;
    return estimateRange({ roleId: rateRoleId, rowId: activeScopeId, tier });
  }, [isMapped, rateRoleId, activeScopeId, tier]);

  // Fold one-time add-ons onto both ends of the rate range — same way the
  // generic path folds them into the base before spreading a range.
  const mappedRange = useMemo<RateRange | null>(() => {
    if (!rateRange) return null;
    const oneTimeAddOns = service.features
      .filter((f) => selectedIds.includes(f.id) && !f.recurring)
      .reduce((sum, f) => sum + f.priceDelta, 0);
    return {
      min: rateRange.min + oneTimeAddOns,
      max: rateRange.max + oneTimeAddOns,
      openEnded: rateRange.openEnded,
    };
  }, [rateRange, service, selectedIds]);

  const useRatePath = isMapped && mappedRange !== null;

  const rangeText =
    isMapped && mappedRange
      ? formatRange(mappedRange)
      : `${formatINR(estimate.rangeLow)} – ${formatINR(estimate.rangeHigh)}`;

  const handleServiceChange = (key: ServiceKey) => {
    setActiveService(key);
    setSelectedIds((prev) => {
      const newService = pricing.find((s) => s.key === key)!;
      const validIds = new Set(newService.features.map((f) => f.id));
      return prev.filter((id) => validIds.has(id));
    });
    setScopeId("");
    setTier("standard");
  };

  const toggleFeature = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const waSummary = useMemo(() => {
    const addOns = selectedIds
      .map((id) => service.features.find((f) => f.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    if (isMapped && mappedRange && rateRole) {
      const scopeLabel =
        rateRole.rows.find((row) => row.id === activeScopeId)?.label ?? "";
      const tierLabel = RATE_TIERS.find((t) => t.id === tier)?.label ?? "";
      return [
        `Hi, I'm interested in ${service.name}.`,
        `Scope: ${scopeLabel}, ${tierLabel} tier.`,
        `Estimated range: ${rangeText}${estimate.recurringTotal > 0 ? ` + ${formatINR(estimate.recurringTotal)}/month` : ""}.`,
        addOns ? `Add-ons: ${addOns}.` : "",
        "I'd like to schedule a scoping call.",
      ]
        .filter(Boolean)
        .join(" ");
    }

    return [
      `Hi, I'm interested in ${service.name}.`,
      `Estimated range: ${rangeText}${estimate.recurringTotal > 0 ? ` + ${formatINR(estimate.recurringTotal)}/month` : ""}.`,
      addOns ? `Add-ons: ${addOns}.` : "",
      "I'd like to schedule a scoping call.",
    ]
      .filter(Boolean)
      .join(" ");
  }, [
    service,
    estimate,
    selectedIds,
    isMapped,
    mappedRange,
    rateRole,
    activeScopeId,
    tier,
    rangeText,
  ]);

  return (
    <div className="space-y-8">
      {/* Service picker */}
      <div className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 sm:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0">
        {pricing.map((s) => (
          <button
            key={s.key}
            onClick={() => handleServiceChange(s.key)}
            className={cn(
              "border px-4 py-2 min-h-[44px] text-sm font-medium transition-colors duration-150 shrink-0 snap-center",
              s.key === activeService
                ? "border-signal bg-signal text-signal-ink"
                : "border-line bg-surface text-ink-dim hover:border-line-strong hover:text-ink",
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Active service card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border border-line bg-surface p-6 sm:space-y-6 flex flex-col sm:block"
        >
          {/* Summary & Base includes */}
          <div className="space-y-6">
            {/* Summary */}
            <p className="text-ink-dim">{service.summary}</p>

            {isMapped && rateRole && (
              <>
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-ink">
                    {rateRole.scaleHeading}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {rateRole.rows.map((row) => {
                      const isActive = row.id === activeScopeId;
                      return (
                        <button
                          key={row.id}
                          type="button"
                          onClick={() => setScopeId(row.id)}
                          aria-pressed={isActive}
                          className={cn(
                            "border px-4 py-2 min-h-[44px] text-sm font-medium transition-colors duration-150",
                            isActive
                              ? "border-signal bg-signal text-signal-ink"
                              : "border-line bg-surface text-ink-dim hover:border-line-strong hover:text-ink",
                          )}
                        >
                          {row.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-ink">
                    Build tier
                  </legend>
                  <div className="space-y-3">
                    {RATE_TIERS.map((t) => {
                      const isActive = t.id === tier;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTier(t.id)}
                          aria-pressed={isActive}
                          className={cn(
                            "w-full border p-4 min-h-[44px] text-left transition-colors duration-150",
                            isActive
                              ? "border-signal bg-signal/10"
                              : "border-line bg-surface-2 hover:border-line-strong",
                          )}
                        >
                          <span className="font-medium text-ink block break-words">
                            {t.label}
                          </span>
                          <p className="mt-1 text-sm text-ink-dim break-words">
                            {t.blurb}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            )}

            {/* Base includes */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-ink">
                Included in base price
              </h3>
              <ul className="space-y-2">
                {service.baseIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-ink-dim"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-signal"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature toggles */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-ink">Add-ons</h3>
              <div className="space-y-3 sm:max-h-none max-h-[calc(100vh-280px)] overflow-y-auto pr-2 sm:pr-0 pb-4 sm:pb-0">
                {service.features.map((feature) => {
                  const isSelected = selectedIds.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={cn(
                        "w-full border p-4 min-h-[44px] text-left transition-colors duration-150",
                        isSelected
                          ? "border-signal bg-signal/10"
                          : "border-line bg-surface-2 hover:border-line-strong",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <span className="font-medium text-ink block break-words">
                            {feature.label}
                          </span>
                          <p className="mt-1 text-sm text-ink-dim break-words">
                            {feature.description}
                          </p>
                          <p className="mt-2 text-sm text-ink-faint break-words">
                            +{formatINR(feature.priceDelta)}
                            {feature.recurring ? "/month" : " one-time"}
                          </p>
                        </div>
                        <motion.div
                          className={cn(
                            "flex size-4 shrink-0 items-center justify-center border transition-colors duration-150 mt-0.5",
                            isSelected
                              ? "border-signal bg-signal"
                              : "border-line-strong",
                          )}
                          animate={
                            isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }
                          }
                          transition={{ duration: 0.2 }}
                        >
                          {isSelected && (
                            <Check className="size-3 text-signal-ink" />
                          )}
                        </motion.div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimate display - sticky bottom on mobile */}
          <div className="border-t border-line pt-6 mt-6 sm:mt-0 sticky bottom-0 sm:static bg-surface/95 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none z-10 -mx-6 sm:mx-0 px-6 sm:px-0">
            <div aria-live="polite">
              <div className="text-lg font-medium text-ink">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rangeText}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 5 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: -5 }
                    }
                    transition={
                      prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
                    }
                    className="inline-block"
                  >
                    {rangeText}
                  </motion.span>
                </AnimatePresence>
              </div>
              {estimate.recurringTotal > 0 && (
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`recurring-${estimate.recurringTotal}`}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 5 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: -5 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.2, delay: 0.1 }
                    }
                    className="mt-1 text-sm text-ink-dim"
                  >
                    + {formatINR(estimate.recurringTotal)}/month
                  </motion.p>
                </AnimatePresence>
              )}
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              Starting estimate — final quote after a short scoping call.
            </p>
          </div>

          {/* CTA — wa.me with prefilled selection summary */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(waSummary)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-150",
              "bg-signal text-signal-ink hover:bg-signal-dim",
            )}
          >
            Get an exact quote
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
