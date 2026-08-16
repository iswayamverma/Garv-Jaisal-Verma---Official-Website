import { Newspaper } from "lucide-react";
import type { PressItem } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

/**
 * §41a calls this out specifically: "/media with no press coverage yet ...
 * must render a minimal, intentional 'coming soon' style empty state" —
 * distinct from the rest of the Media page, which still renders normally
 * (bio, photos, credits) even before any coverage exists.
 */
export function PressCoverage({ press }: { press: PressItem[] }) {
  return (
    <div>
      <SectionHeading title="Media Coverage" as="h2" className="mb-10" />
      {press.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="Coverage Coming Soon"
          description="Press and media coverage will be listed here as it's published."
        />
      ) : (
        <ul className="flex flex-col divide-y divide-paper/10 border-y border-paper/10">
          {press.map((item) => (
            <li key={item.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">
                  {item.outlet}
                </span>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-sm text-paper underline decoration-ash/40 underline-offset-4 hover:text-ember hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="ml-3 text-sm text-paper">{item.title}</span>
                )}
              </div>
              {item.date ? (
                <span className="font-mono text-xs text-ash">{formatDate(item.date)}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
