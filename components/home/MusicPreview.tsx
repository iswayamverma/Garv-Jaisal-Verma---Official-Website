import { releases } from "@/data/releases";
import { getLatestReleases } from "@/lib/utils";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import { Container } from "@/components/ui/Container";

/** Hidden when there's no music yet — /music carries the "coming soon" empty state (§41a). */
export function MusicPreview() {
  const latest = getLatestReleases(releases, 3);
  if (latest.length === 0) return null;

  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Discography"
          title="Music"
          action={
            <CtaLink href="/music" variant="tertiary" showArrow>
              View All Music
            </CtaLink>
          }
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </Container>
    </section>
  );
}
