import { mediaKit } from "@/data/media";
import { artist } from "@/data/artist";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

/** Hidden if no video is available yet (§16). */
export function VideoSection() {
  if (!mediaKit.videoUrl) return null;

  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Watch" title="Featured Video" className="mb-12" />
        <VideoSlot
          videoUrl={mediaKit.videoUrl}
          posterPublicId={artist.heroImage}
          title={`${artist.name} — Featured Video`}
        />
      </Container>
    </section>
  );
}
