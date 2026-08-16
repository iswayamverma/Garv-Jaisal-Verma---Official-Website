import type { Release } from "@/types";
import { primaryStreamingUrl, formatDate, sortTracks } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedRelease({ release }: { release: Release }) {
  const isUpcoming = release.status === "upcoming";
  const ctaLabel = isUpcoming ? "Pre-Save" : "Listen Now";
  const ctaHref = primaryStreamingUrl(release);
  const tracks = sortTracks(release.tracks);

  return (
    <div>
      <SectionHeading eyebrow="Featured Release" title={release.title} className="mb-12" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <MediaSlot
          publicId={release.artwork}
          alt={`${release.title} artwork`}
          icon="artwork"
          label="Album Artwork"
          aspect="square"
        />
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            {isUpcoming ? "Coming Soon" : "Out Now"} · {formatDate(release.releaseDate)}
          </span>

          {release.description ?? release.shortDescription ? (
            <p className="text-pretty text-base leading-relaxed text-paper/85">
              {release.description ?? release.shortDescription}
            </p>
          ) : null}

          {tracks.length > 0 ? (
            <ol className="flex flex-col divide-y divide-paper/10 border-y border-paper/10">
              {tracks.map((track) => (
                <li key={track.id} className="flex items-center gap-4 py-3 text-sm">
                  <span className="w-6 font-mono text-ash">
                    {String(track.trackNumber).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-paper">{track.title}</span>
                  {track.duration ? (
                    <span className="font-mono text-xs text-ash">{track.duration}</span>
                  ) : null}
                </li>
              ))}
            </ol>
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
    </div>
  );
}
