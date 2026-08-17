import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { mediaKit } from "@/data/media";
import { artist } from "@/data/artist";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CreditsSection } from "@/components/music/CreditsSection";
import { PressCoverage } from "@/components/media/PressCoverage";
import { PhotoLightbox } from "@/components/media/PhotoLightbox";
import { BioSection } from "@/components/media/BioSection";

export const metadata: Metadata = {
  title: "Media",
  description: `Media kit and EPK for ${artist.name} — biography, photos, credits and press coverage.`,
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  const photoSlots = Array.from({ length: 6 }, (_, i) => mediaKit.photos[i]);
  const contactEmail = mediaKit.contactEmail || "[BOOKING_EMAIL]";

  return (
    <Container className="flex flex-col gap-24 py-32 sm:gap-32">
      <SectionHeading
        eyebrow="Press & Industry"
        title="Media / EPK"
        as="h1"
        action={
          <CtaLink
            href={mediaKit.epkUrl}
            disabled={!mediaKit.epkUrl}
            disabledReason="EPK download coming soon"
            external
            showArrow
          >
            Download EPK
          </CtaLink>
        }
      />

      <BioSection name={artist.name} bio={mediaKit.fullBio} />

      <div>
        <SectionHeading title="Photos" as="h2" className="mb-10" />
        <PhotoLightbox photos={photoSlots} altPrefix={artist.name} />
      </div>

      {mediaKit.videoUrl ? (
        <div>
          <SectionHeading title="Video" as="h2" className="mb-10" />
          <VideoSlot videoUrl={mediaKit.videoUrl} title={`${artist.name} — Video`} />
        </div>
      ) : null}

      <CreditsSection credits={mediaKit.credits} />

      <PressCoverage press={mediaKit.press} />

      <div className="flex flex-col gap-4 border-t border-paper/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-paper/85">
          <Mail className="size-5 text-ember" aria-hidden="true" />
          <a
            href={`mailto:${contactEmail}`}
            className="text-sm underline decoration-ash/40 underline-offset-4 hover:text-ember hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
          >
            {contactEmail}
          </a>
        </div>
        <CtaLink href="/contact" variant="secondary" showArrow>
          Contact for Bookings
        </CtaLink>
      </div>
    </Container>
  );
}
