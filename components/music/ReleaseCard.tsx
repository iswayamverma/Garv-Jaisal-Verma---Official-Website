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

  return (
    <article className="group flex flex-col gap-4">
      <MediaSlot
        publicId={release.artwork}
        alt={`${release.title} artwork`}
        icon="artwork"
        label="Artwork"
        aspect="square"
        className="transition-opacity group-hover:opacity-90"
      />
      <div className="flex flex-col gap-1">
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
          className="text-xs font-semibold uppercase tracking-[0.16em] text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          Listen
        </a>
      ) : (
        <Link
          href={`/music#${release.slug}`}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/70 underline decoration-ash/40 underline-offset-4 hover:text-ember hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          View Details
        </Link>
      )}
    </article>
  );
}
