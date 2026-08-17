import { artist } from "@/data/artist";
import { releases } from "@/data/releases";
import { getCurrentRelease, primaryStreamingUrl } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { Waveform } from "@/components/ui/Waveform";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const currentRelease = getCurrentRelease(releases);
  const isUpcoming = currentRelease?.status === "upcoming";
  const ctaLabel = !currentRelease ? "View Music" : isUpcoming ? "Pre-Save" : "Listen Now";
  const ctaHref = !currentRelease ? "/music" : (primaryStreamingUrl(currentRelease) ?? "/music");

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <MediaSlot
          publicId={artist.heroImageMobile ?? artist.heroImage}
          alt={`${artist.name} portrait`}
          icon="portrait"
          label="Artist Photo"
          priority
          className="size-full sm:hidden"
        />
        <MediaSlot
          publicId={artist.heroImage}
          alt={`${artist.name} portrait`}
          icon="portrait"
          label="Artist Photo"
          priority
          className="hidden size-full sm:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      </div>

      <Waveform
        bars={90}
        className="absolute inset-x-0 bottom-0 h-28 w-full text-ember/[0.14]"
      />

      <Container className="relative flex flex-col gap-8 pb-24 pt-40">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-ember">
          {artist.profession.join(" · ")}
        </p>

        <h1 className="max-w-4xl text-balance font-display text-6xl leading-[0.98] text-paper sm:text-7xl lg:text-8xl">
          {artist.name}
        </h1>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          {currentRelease ? (
            <div className="flex items-center gap-3 text-sm text-paper/80">
              <span className="font-medium uppercase tracking-[0.14em] text-ember">
                {isUpcoming ? "Coming Soon" : "Out Now"}
              </span>
              <span aria-hidden="true" className="text-ash">
                ·
              </span>
              <span>{currentRelease.title}</span>
            </div>
          ) : (
            <p className="max-w-sm text-sm text-paper/80">
              New music is on the way — check back soon.
            </p>
          )}
          <CtaLink href={ctaHref} showArrow>
            {ctaLabel}
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
