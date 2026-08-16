import type { Metadata } from "next";
import { Disc3 } from "lucide-react";
import { releases } from "@/data/releases";
import { getCurrentRelease, getReleasesByType, getAllCredits, getAllTracks } from "@/lib/utils";
import { FeaturedRelease } from "@/components/music/FeaturedRelease";
import { MusicTabs } from "@/components/music/MusicTabs";
import { CreditsSection } from "@/components/music/CreditsSection";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Music",
  description: "Albums, singles and collaborations from Garv Jaisal Verma — Singer, Composer, Producer.",
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  const featured = getCurrentRelease(releases);
  const albums = getReleasesByType(releases, "album");
  const singles = getReleasesByType(releases, "single");
  const songs = getAllTracks(releases);
  const credits = getAllCredits(releases);

  return (
    <Container className="flex flex-col gap-24 py-32 sm:gap-32">
      <SectionHeading eyebrow="Discography" title="Music" as="h1" />

      {releases.length === 0 ? (
        <EmptyState
          icon={Disc3}
          title="New Music Is On The Way"
          description="Garv's discography will appear here as releases are announced. Check back soon."
        />
      ) : (
        <>
          {featured ? <FeaturedRelease release={featured} /> : null}
          <MusicTabs albums={albums} singles={singles} songs={songs} />
          <CreditsSection credits={credits} />
        </>
      )}
    </Container>
  );
}