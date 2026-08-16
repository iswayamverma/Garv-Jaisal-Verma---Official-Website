import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { mediaKit } from "@/data/media";
import { artist } from "@/data/artist";
import { isPlaceholder } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { VideoSlot } from "@/components/ui/VideoSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CreditsSection } from "@/components/music/CreditsSection";
import { PressCoverage } from "@/components/media/PressCoverage";

export const metadata: Metadata = {
  title: "Media",
  description: `Media kit and EPK for ${artist.name} — biography, photos, credits and press coverage.`,
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  const bioReady = !isPlaceholder(mediaKit.fullBio);
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

      <div className="max-w-[65ch]">
        {bioReady ? (
          <p className="text-pretty text-lg leading-relaxed text-paper/85">{mediaKit.fullBio}</p>
        ) : (
          <p className="text-pretty text-lg italic leading-relaxed text-ash">
            A full press biography for {artist.name} is coming soon.
          </p>
        )}
      </div>

      <div>
        <SectionHeading title="Photos" as="h2" className="mb-10" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {photoSlots.map((publicId, i) => (
            <MediaSlot
              key={i}
              publicId={publicId}
              alt={`${artist.name} press photo ${i + 1}`}
              icon="photo"
              label="Press Photo"
              aspect="portrait"
            />
          ))}
        </div>
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
          <span className="text-sm">{contactEmail}</span>
        </div>
        <CtaLink href="/contact" variant="secondary" showArrow>
          Contact for Bookings
        </CtaLink>
      </div>
    </Container>
  );
}
