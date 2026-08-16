import type { Credit } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Only verified, artist-provided credits (§24) — renders nothing if none exist yet. */
export function CreditsSection({ credits }: { credits: Credit[] }) {
  if (credits.length === 0) return null;

  return (
    <div>
      <SectionHeading title="Selected Work & Credits" as="h2" className="mb-10" />
      <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {credits.map((credit) => (
          <li
            key={`${credit.role}-${credit.name}`}
            className="flex items-baseline justify-between gap-4 border-b border-paper/10 py-3"
          >
            <span className="text-sm text-paper">{credit.name}</span>
            <span className="text-xs uppercase tracking-[0.14em] text-ash">{credit.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
