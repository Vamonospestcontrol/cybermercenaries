import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section } from "@/components/section";

/**
 * PLACEHOLDER HOMEPAGE — this is the Phase 0 skeleton.
 * Each build phase in BLUEPRINT.md replaces one section of this file with a
 * real component from src/components/. Do not delete this file's structure
 * wholesale in a single phase — build it up section by section so every
 * commit stays deployable.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <p className="font-mono text-sm text-ink-dim">
          {site.name} — build in progress
        </p>
        <h1 className="max-w-2xl text-3xl font-medium text-ink sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="text-ink-faint">
          Scaffold is live. Sections land phase by phase.
        </p>
      </main>
      <Section id="services" title="Services" />
      <Section id="pricing" title="Pricing" />
      <Section id="work" title="Work" />
      <Section id="about" title="About" />
      <Section id="contact" title="Contact" />
      <Footer />
    </>
  );
}
