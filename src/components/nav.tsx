"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { site, nav } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header — wordmark linking home, desktop links, and a mobile
 * full-screen overlay. Gains a hairline border + backdrop once scrolled.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--nav-height)] transition-colors duration-300",
        scrolled ? "border-b border-line bg-void/80 backdrop-blur" : "bg-void",
      )}
    >
      <div className="mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-base font-medium tracking-tight text-ink"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink-dim transition-colors hover:text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 top-[var(--nav-height)] z-40 bg-void md:hidden">
          <nav
            className="flex flex-col gap-2 px-6 py-8"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg text-ink-dim transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
