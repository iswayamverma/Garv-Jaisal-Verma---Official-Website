import type { Metadata } from "next";
import { artist } from "@/data/artist";
import { releases } from "@/data/releases";
import { getLatestReleases } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ArtistIdentity } from "@/components/about/ArtistIdentity";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import { AboutBio } from "@/components/about/AboutBio";

export const metadata: Metadata = {
  title: "About",
  description: `About ${artist.name} — ${artist.profession.join(", ")}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const selectedWork = getLatestReleases(releases, 3);

  return (
    <Container className="flex flex-col gap-24 py-32 sm:gap-32">
      <SectionHeading eyebrow="About" title={artist.name} as="h1" />

      <MediaSlot
        publicId="media--media-coverage_rghdl5"
        alt={`${artist.name} portrait`}
        icon="portrait"
        label="Artist Photo"
        aspect="landscape"
      />

      <AboutBio name={artist.name} bio={artist.longBio} />

      <ArtistIdentity />

      {selectedWork.length > 0 ? (
        <div>
          <SectionHeading title="Selected Work" as="h2" className="mb-10" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {selectedWork.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <CtaLink href="/music" showArrow>
          Explore Music
        </CtaLink>
      </div>
    </Container>
  );
}