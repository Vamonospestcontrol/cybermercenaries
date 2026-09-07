import { site } from "@/content/site";

/**
 * PLACEHOLDER HOMEPAGE — this is the Phase 0 skeleton.
 * Each build phase in BLUEPRINT.md replaces one section of this file with a
 * real component from src/components/. Do not delete this file's structure
 * wholesale in a single phase — build it up section by section so every
 * commit stays deployable.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
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
  );
}
