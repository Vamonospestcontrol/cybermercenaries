import Link from "next/link";

import { site } from "@/content/site";

/**
 * Footer — site name, contact links (email + WhatsApp), and a geo line built
 * from site.location. One row on desktop, stacked on mobile.
 */
export function Footer() {
  const { city, state, lat, lng } = site.location;

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <span className="font-mono text-sm font-medium text-ink">
            {site.name}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href={`mailto:${site.contact.email}`}
              className="text-ink-dim transition-colors hover:text-ink"
            >
              {site.contact.email}
            </Link>
            <Link
              href={`https://wa.me/${site.contact.whatsapp}`}
              className="text-ink-dim transition-colors hover:text-ink"
            >
              WhatsApp
            </Link>
          </div>
        </div>

        <p className="text-sm text-ink-faint">
          {city}, {state} · {lat}, {lng}
        </p>
      </div>
    </footer>
  );
}
