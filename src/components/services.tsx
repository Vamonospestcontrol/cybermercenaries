import type { LucideIcon } from "lucide-react";
import { PenTool, Code2, ServerCog, ShieldCheck, Bug } from "lucide-react";
import { services } from "@/content/site";
import type { ServiceKey } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const icons: Record<ServiceKey, LucideIcon> = {
  "web-design": PenTool,
  "full-stack-dev": Code2,
  "migration-vps": ServerCog,
  "cybersecurity-consultancy": ShieldCheck,
  "penetration-testing": Bug,
};

export function Services() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = icons[service.key];
        return (
          <div
            key={service.key}
            className={cn(
              "border border-line bg-surface p-6 transition-colors duration-200",
              "hover:border-line-strong"
            )}
          >
            <Icon className="mb-4 size-8 text-signal" aria-hidden="true" />
            <h3 className="mb-1 text-lg font-medium text-ink">
              {service.name}
            </h3>
            <p className="text-sm leading-relaxed text-ink-dim">
              {service.tagline}
            </p>
          </div>
        );
      })}
    </div>
  );
}
