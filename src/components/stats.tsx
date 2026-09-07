"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { stats } from "@/content/site";

function useCountUp(end: number, duration: number, animate: boolean) {
  const [value, setValue] = useState(animate ? 0 : end);

  useEffect(() => {
    if (!animate) return;

    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic for a snappy deceleration
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * end));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, animate]);

  return value;
}

function parseStat(value: string): { isNumeric: boolean; numeric: number; prefix: string; suffix: string } {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { isNumeric: false, numeric: 0, prefix: value, suffix: "" };
  return {
    isNumeric: match[2].length > 0,
    numeric: parseInt(match[2], 10),
    prefix: match[1],
    suffix: match[3],
  };
}

function StatItem({
  value,
  label,
  animate,
}: {
  value: string;
  label: string;
  animate: boolean;
}) {
  const { isNumeric, numeric, prefix, suffix } = parseStat(value);
  const count = useCountUp(numeric, 1400, animate && isNumeric);

  return (
    <div className="text-center">
      <div className="font-mono text-4xl font-semibold text-ink sm:text-5xl">
        {isNumeric ? `${prefix}${count}${suffix}` : value}
      </div>
      <div className="mt-2 text-sm text-ink-dim">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={inView || prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-10 sm:grid-cols-3"
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          animate={inView && !prefersReducedMotion}
        />
      ))}
    </motion.div>
  );
}
