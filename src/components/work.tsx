import { work } from "@/content/site";
import { cn } from "@/lib/utils";

export function Work() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {work.map((project) => (
        <article
          key={project.slug}
          className={cn(
            "flex flex-col border border-line bg-surface overflow-hidden",
            "transition-colors duration-200 hover:border-line-strong"
          )}
        >
          {/* Image placeholder — no screenshots exist yet */}
          <div className="aspect-video w-full bg-surface-2" />

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-medium text-ink">{project.title}</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-0.5 text-xs text-ink-dim"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
              {project.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
