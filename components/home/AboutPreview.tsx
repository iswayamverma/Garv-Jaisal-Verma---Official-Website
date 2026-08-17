import { artist } from "@/data/artist";
import { isPlaceholder } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { Container } from "@/components/ui/Container";

export function AboutPreview() {
  const bioReady = !isPlaceholder(artist.shortBio);

  return (
    <section className="bg-charcoal py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          {/* Portrait, framed with an offset ember rule behind it — the
              section's one signature move, echoing a studio print mount.
              This inner wrapper is sized to the image ONLY, so the offset
              border can't stretch down into the caption below it. */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full border border-ember-deep/60"
            />
            <div className="relative">
              <MediaSlot
                publicId={artist.profileImages?.[0]}
                alt={`${artist.name} portrait`}
                icon="portrait"
                label="Artist Portrait"
                aspect="portrait"
              />
            </div>
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ash">
            {artist.name} — Mumbai Studio
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-ember" aria-hidden />
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-ember">About</p>
          </div>

          {bioReady ? (
            <p className="text-balance font-display text-3xl font-medium leading-[1.15] text-paper sm:text-4xl lg:text-[2.75rem]">
              {artist.shortBio}
            </p>
          ) : (
            <p className="max-w-prose text-pretty text-lg italic leading-relaxed text-ash">
              A full biography for {artist.name} is coming soon.
            </p>
          )}

          <div className="pt-2">
            <CtaLink href="/about" variant="primary" showArrow>
              Read More
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}