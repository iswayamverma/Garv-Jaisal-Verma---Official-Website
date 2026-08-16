import { artist } from "@/data/artist";
import { isPlaceholder } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { Container } from "@/components/ui/Container";

export function AboutPreview() {
  const bioReady = !isPlaceholder(artist.shortBio);

  return (
    <section className="bg-charcoal py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <MediaSlot
          publicId={artist.profileImages?.[0]}
          alt={`${artist.name} portrait`}
          icon="portrait"
          label="Artist Portrait"
          aspect="portrait"
        />
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-ember">About</p>
          {bioReady ? (
            <p className="text-balance font-display text-3xl leading-snug text-paper sm:text-4xl">
              {artist.shortBio}
            </p>
          ) : (
            <p className="max-w-prose text-pretty text-lg italic leading-relaxed text-ash">
              A full biography for {artist.name} is coming soon.
            </p>
          )}
          <div>
            <CtaLink href="/about" variant="secondary" showArrow>
              Read More
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
