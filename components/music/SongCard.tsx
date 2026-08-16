import Link from "next/link";
import type { FlattenedTrack } from "@/types";
import { MediaSlot } from "@/components/ui/MediaSlot";

export function SongCard({ track }: { track: FlattenedTrack }) {
  const year = new Date(track.releaseDate).getFullYear();

  return (
    <article className="group flex flex-col gap-4">
      <MediaSlot
        publicId={track.releaseArtwork}
        alt={`${track.title} artwork`}
        icon="artwork"
        label="Artwork"
        aspect="square"
        className="transition-opacity group-hover:opacity-90"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl text-paper">{track.title}</h3>
        <p className="text-xs uppercase tracking-[0.16em] text-ash">
          {Number.isNaN(year) ? "" : year} · {track.releaseTitle}
        </p>
      </div>
      {track.streamingUrl ? (

          <a href={track.streamingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold uppercase tracking-[0.16em] text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          Listen
        </a>
      ) : (
        <Link
          href={`/music#${track.releaseSlug}`}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/70 underline decoration-ash/40 underline-offset-4 hover:text-ember hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          View Release
        </Link>
      )}
    </article>
  );
}