import { testimonials } from "@/content/site";

/**
 * Testimonials — card list rendered when entries exist.
 * The empty-array guard (skip the whole section) lives in page.tsx, so
 * this component only mounts once there is real content to show.
 */
export function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {testimonials.map((testimonial, i) => (
        <figure
          key={i}
          className="flex flex-col border border-line bg-surface p-6"
        >
          <blockquote className="flex-1 border-l-2 border-signal pl-4">
            <p className="text-sm leading-relaxed text-ink">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-4 pl-4">
            <div className="text-sm font-medium text-ink">
              {testimonial.name}
            </div>
            <div className="text-sm text-ink-faint">{testimonial.role}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
