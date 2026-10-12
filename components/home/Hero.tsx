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
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <div className="hero-glow absolute inset-0 opacity-90" aria-hidden="true" />
        <MediaSlot
          publicId={artist.heroImageMobile ?? artist.heroImage}
          alt={`${artist.name} portrait`}
          icon="portrait"
          label="Artist Photo"
          priority
          sizes="100vw"
          className="size-full sm:hidden"
        />
        <MediaSlot
          publicId={artist.heroImage}
          alt={`${artist.name} portrait`}
          icon="portrait"
          label="Artist Photo"
          priority
          sizes="100vw"
          className="hidden size-full sm:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,7,0.3),rgba(9,8,7,0.76)_36%,rgba(9,8,7,0.94))]" />
      </div>

      <Waveform
        bars={90}
        className="absolute inset-x-0 bottom-0 h-28 w-full text-ember/[0.14]"
      />

      <Container className="relative z-10 flex flex-col gap-8 pb-24 pt-28 sm:pt-36">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-ember">
          {artist.profession.join(" · ")}
        </p>

        <h1 className="max-w-4xl text-balance text-6xl leading-[0.94] text-paper drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl">
          {artist.name}
        </h1>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          {currentRelease ? (
            <div className="flex items-center gap-3 text-sm text-paper/80">
              <span className="rounded-full border border-ember/40 bg-ember-soft px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ember">
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
