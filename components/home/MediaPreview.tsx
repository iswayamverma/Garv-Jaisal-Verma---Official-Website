import { mediaKit } from "@/data/media";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function MediaPreview() {
  const photoSlots = Array.from({ length: 3 }, (_, i) => mediaKit.photos[i]);

  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="For Press & Industry"
          title="Media / EPK"
          description="Biography, professional photography, credits and press coverage for bookings, features and collaborations."
          className="mb-12"
        />
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {photoSlots.map((publicId, i) => (
            <MediaSlot
              key={i}
              publicId={publicId}
              alt={`Press photo ${i + 1}`}
              icon="photo"
              label="Press Photo"
              aspect="portrait"
            />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <CtaLink href="/media" variant="primary" showArrow>
            View Media
          </CtaLink>
          <CtaLink
            href={mediaKit.epkUrl}
            variant="secondary"
            disabled={!mediaKit.epkUrl}
            disabledReason="EPK download coming soon"
            external
          >
            Download EPK
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
