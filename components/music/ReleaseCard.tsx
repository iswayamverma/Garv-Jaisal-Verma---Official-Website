import Link from "next/link";
import type { Release } from "@/types";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { primaryStreamingUrl } from "@/lib/utils";

const typeLabel: Record<Release["type"], string> = {
  album: "Album",
  single: "Single",
  collaboration: "Collaboration",
};

export function ReleaseCard({ release }: { release: Release }) {
  const year = new Date(release.releaseDate).getFullYear();
  const listenUrl = primaryStreamingUrl(release);
  const cardClasses =
    "music-card group flex flex-col gap-4 rounded-[1.3rem] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-ember/50 hover:shadow-[0_22px_50px_rgba(0,0,0,0.32)]";

  if (release.type === "single") {
    return (
      <Link href={`/music/${release.slug}`} className={cardClasses}>
        <MediaSlot
          publicId={release.artwork}
          alt={`${release.title} artwork`}
          icon="artwork"
          label="Artwork"
          aspect="square"
          className="overflow-hidden rounded-[0.9rem] transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="flex flex-col gap-1 px-1 pb-1">
          <h3 className="font-display text-xl text-paper">{release.title}</h3>
          <p className="text-xs uppercase tracking-[0.16em] text-ash">
            {Number.isNaN(year) ? "" : year} · {typeLabel[release.type]}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article className={cardClasses}>
      <MediaSlot
        publicId={release.artwork}
        alt={`${release.title} artwork`}
        icon="artwork"
        label="Artwork"
        aspect="square"
        className="overflow-hidden rounded-[0.9rem] transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="font-display text-xl text-paper">{release.title}</h3>
        <p className="text-xs uppercase tracking-[0.16em] text-ash">
          {Number.isNaN(year) ? "" : year} · {typeLabel[release.type]}
        </p>
      </div>
      {listenUrl ? (
        <a
          href={listenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          Listen
        </a>
      ) : (
        <Link
          href={`/music#${release.slug}`}
          className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-paper/70 underline decoration-ash/40 underline-offset-4 hover:text-ember hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          View Details
        </Link>
      )}
    </article>
  );
}