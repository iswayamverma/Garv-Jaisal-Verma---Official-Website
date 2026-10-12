import { releases } from "@/data/releases";
import { getCurrentRelease, primaryStreamingUrl, formatDate } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

/**
 * Hidden entirely when there's no release yet (§40's default: hide empty
 * sections rather than show a redundant "nothing here" message — Hero
 * already covers that case with its own generic copy).
 */
export function CurrentRelease() {
  const release = getCurrentRelease(releases);
  if (!release) return null;

  const isUpcoming = release.status === "upcoming";
  const ctaLabel = isUpcoming ? "Pre-Save" : "Listen Now";
  const ctaHref = primaryStreamingUrl(release);

  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Current Release" title={release.title} className="mb-12" />
        <div className="soft-panel grid grid-cols-1 gap-8 overflow-hidden rounded-[1.6rem] p-5 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:p-10">
          <div className="overflow-hidden rounded-[1.1rem] border border-paper/10 bg-black/10">
            <MediaSlot
              publicId={release.artwork}
              alt={`${release.title} artwork`}
              icon="artwork"
              label="Album Artwork"
              aspect="square"
              className="h-full"
            />
          </div>
          <div className="flex flex-col justify-center gap-5">
            <span className="inline-flex w-fit items-center rounded-full border border-ember/35 bg-ember-soft px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ember">
              {isUpcoming ? "Coming Soon" : "Out Now"} · {formatDate(release.releaseDate)}
            </span>
            {release.shortDescription ? (
              <p className="text-pretty text-lg leading-relaxed text-paper/85 sm:text-xl">
                {release.shortDescription}
              </p>
            ) : null}
            <div>
              {ctaHref ? (
                <CtaLink href={ctaHref} showArrow>
                  {ctaLabel}
                </CtaLink>
              ) : (
                <CtaLink disabled disabledReason="Streaming links coming soon">
                  {ctaLabel}
                </CtaLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
