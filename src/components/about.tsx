import { founders } from "@/content/site";

/**
 * About section — studio-positioning copy plus the two founders.
 * Copy here is about the studio itself (not a client claim).
 */
export function About() {
  return (
    <div>
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-ink-dim sm:text-lg">
        <p>
          CyberMercenaries is a two-person studio that pairs design with the
          mindset of someone who breaks systems for a living. We build web
          products the way an operator would — with clean architecture, honest
          scoping, and a bias toward shipping what actually holds up under
          load, not just what looks good in a preview.
        </p>
        <p>
          That split — one of us designing the experience, the other building
          and then attacking the infrastructure underneath — means nothing
          leaves the studio without being tested twice. If we wouldn&apos;t run
          it in production for our own work, we won&apos;t hand it to you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className="border border-line bg-surface p-6"
          >
            <h3 className="text-lg font-medium text-ink">{founder.name}</h3>
            <p className="mt-1 text-sm text-signal">{founder.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">
              {founder.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
