import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  children?: ReactNode;
};

/**
 * Reusable section wrapper — the consistent container + padding + optional
 * heading so later sections don't repeat this markup.
 */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-[var(--nav-height)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-24">
        {title ? (
          <h2 className="mb-12 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
