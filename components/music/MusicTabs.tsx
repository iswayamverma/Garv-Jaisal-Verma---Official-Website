"use client";

import { useState } from "react";
import { Disc3 } from "lucide-react";
import type { Release, FlattenedTrack } from "@/types";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import { SongCard } from "@/components/music/SongCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

type MusicTab = "albums" | "singles" | "songs";

const TABS: { id: MusicTab; label: string }[] = [
  { id: "albums", label: "Albums" },
  { id: "singles", label: "Singles" },
  { id: "songs", label: "Songs" },
];

interface MusicTabsProps {
  albums: Release[];
  singles: Release[];
  songs: FlattenedTrack[];
}

/**
 * Client-side Albums/Singles/Songs switcher for /music (no URL change,
 * no separate routes). Defaults to "singles". Only the active tab's
 * grid is mounted at a time, so release-slug anchor IDs never collide
 * across tabs.
 */
export function MusicTabs({ albums, singles, songs }: MusicTabsProps) {
  const [activeTab, setActiveTab] = useState<MusicTab>("albums");

  return (
    <div className="flex flex-col gap-10">
      <div
        role="tablist"
        aria-label="Filter releases"
        className="flex flex-wrap items-center gap-8 border-b border-paper/10 pb-6"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border",
                  isActive ? "border-ember" : "border-paper/30"
                )}
              >
                {isActive ? <span className="size-2 rounded-full bg-ember" /> : null}
              </span>
              <span className={isActive ? "text-paper" : undefined}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === "albums" ? (
        albums.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((release) => (
              <div id={release.slug} key={release.id} className="scroll-mt-24">
                <ReleaseCard release={release} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={Disc3} title="No Albums Yet" description="Albums will appear here once announced." />
        )
      ) : null}

      {activeTab === "singles" ? (
        singles.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {singles.map((release) => (
              <div id={release.slug} key={release.id} className="scroll-mt-24">
                <ReleaseCard release={release} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={Disc3} title="No Singles Yet" description="Singles will appear here once announced." />
        )
      ) : null}

      {activeTab === "songs" ? (
        songs.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {songs.map((track) => (
              <SongCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <EmptyState icon={Disc3} title="No Songs Yet" description="Songs will appear here once tracks are added." />
        )
      ) : null}
    </div>
  );
}