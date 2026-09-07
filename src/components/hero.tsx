"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { site, services } from "@/content/site";

/**
 * Hero section — field-dossier aesthetic with corner labels, headline,
 * contact row, and service preview cards. One orchestrated entrance.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Clock state — static placeholder server-side, ticking client-side.
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    // First tick on the next frame (not synchronously within the effect),
    // then once per second after mount.
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  // If reduced motion, render everything immediately (no animation).
  const animate = prefersReducedMotion ? {} : { opacity: 1, y: 0 };
  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 12 };

  return (
    <section className="relative flex min-h-[calc(100vh-var(--nav-height))] flex-col justify-center px-6 pt-16 pb-24">
      {/* Corner labels */}
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ duration: 0.5, delay: 0 }}
        className="absolute top-6 left-6 font-mono text-xs text-ink-faint"
      >
        Field studio — {site.location.city}, {site.location.country}
      </motion.div>

      <motion.div
        initial={initial}
        animate={animate}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-6 right-6 font-mono text-xs text-ink-faint"
      >
        <span suppressHydrationWarning>{time}</span>
      </motion.div>

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col items-start gap-8">
        {/* Headline */}
        <motion.h1
          initial={initial}
          animate={animate}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-6xl"
        >
          {site.tagline}
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-2xl text-lg text-ink-dim"
        >
          {site.subline}
        </motion.p>

        {/* Contact row */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href={`mailto:${site.contact.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
          >
            <Mail className="h-4 w-4" />
            {site.contact.email}
          </Link>
          <Link
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
          >
            <MessageCircle className="h-4 w-4" />
            {site.contact.whatsappDisplay}
          </Link>
        </motion.div>

        {/* Status row */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-2 text-sm text-ink-dim"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          Available for projects
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full bg-signal px-6 py-3 text-sm font-medium text-signal-ink transition-colors hover:bg-signal-dim"
          >
            Start a project
          </Link>
        </motion.div>

        {/* Service preview cards */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <div
              key={service.key}
              className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <h3 className="text-base font-medium text-ink">{service.name}</h3>
              <p className="mt-2 text-sm text-ink-faint">{service.tagline}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
