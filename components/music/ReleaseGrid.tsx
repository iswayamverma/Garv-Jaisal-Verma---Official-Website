import type { Release } from "@/types";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Renders nothing when empty — §21: "Do not create empty categories." */
export function ReleaseGrid({ title, releases }: { title: string; releases: Release[] }) {
  if (releases.length === 0) return null;

  return (
    <div>
      <SectionHeading title={title} as="h2" className="mb-10" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {releases.map((release) => (
          <div id={release.slug} key={release.id} className="scroll-mt-24">
            <ReleaseCard release={release} />
          </div>
        ))}
      </div>
    </div>
  );
}
