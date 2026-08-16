"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { MediaSlot } from "./MediaSlot";
import { cn } from "@/lib/utils";

interface VideoSlotProps {
  videoUrl: string;
  posterPublicId?: string;
  title: string;
  className?: string;
}

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") || parsed.hostname === "youtu.be") {
      const id =
        parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Featured-video block (§16): a poster/thumbnail with a play action. Never
 * autoplays — playback (and therefore any audio) only starts after the
 * visitor clicks (§12 "Never autoplay audio"). Understands YouTube/Vimeo
 * URLs as well as direct video files.
 */
export function VideoSlot({ videoUrl, posterPublicId, title, className }: VideoSlotProps) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = toEmbedUrl(videoUrl);
  const isDirectFile = /\.(mp4|webm|mov)(\?.*)?$/i.test(videoUrl);

  if (playing && (embedUrl || isDirectFile)) {
    return (
      <div className={cn("relative aspect-video overflow-hidden bg-ink", className)}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="size-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={videoUrl} controls autoPlay className="size-full object-cover" />
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={cn(
        "group relative block aspect-video w-full overflow-hidden text-left",
        className
      )}
      aria-label={`Play video: ${title}`}
    >
      <MediaSlot
        publicId={posterPublicId}
        alt={title}
        icon="photo"
        aspect="wide"
        className="pointer-events-none"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/35">
        <span className="flex size-16 items-center justify-center rounded-full bg-paper/95 text-ink shadow-lg transition-transform group-hover:scale-105">
          <Play className="ml-1 size-6" fill="currentColor" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}
