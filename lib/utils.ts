
import type { Release, LiveEvent, Track, FlattenedTrack } from "@/types";

/**
 * Minimal class-name joiner. Deliberately hand-rolled instead of adding
 * `clsx`/`tailwind-merge` as dependencies — PDD §4 asks for dependencies
 * only where they solve an actual requirement, and this project's
 * conditional classes are simple enough not to need conflict resolution.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Detects the bracketed placeholder tokens named throughout the PDD
 * (§0.2, §35), e.g. "[SHORT_BIO]", "[ALBUM_NAME]". Components use this to
 * swap an un-filled field for an intentional placeholder treatment instead
 * of literally printing the brackets.
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  if (trimmed.length === 0) return true;
  return /^\[[A-Z0-9_ ]+\]$/.test(trimmed);
}

/** Formats an ISO date string for display, e.g. "14 Nov 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Formats an ISO date string as a compact day/month pair, e.g. "14 NOV". */
export function formatDateShort(iso: string): { day: string; month: string } {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return { day: "--", month: "---" };
  return {
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(date)
      .toUpperCase(),
  };
}

/**
 * Returns the release Home/Music should treat as "current": the explicit
 * featured release if one is flagged, otherwise the most recently dated
 * release. Returns null when there is no release data yet (PDD §13's
 * "No active release" case), which callers use to hide the section
 * entirely per §40.
 */
export function getCurrentRelease(releases: Release[]): Release | null {
  if (releases.length === 0) return null;
  const featured = releases.find((r) => r.featured);
  if (featured) return featured;
  return [...releases].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  )[0] ?? null;
}

/** Most recent releases, newest first, for Home's Music Preview (§14). */
export function getLatestReleases(releases: Release[], limit = 3): Release[] {
  return [...releases]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, limit);
}

export function getReleasesByType(releases: Release[], type: Release["type"]): Release[] {
  return releases
    .filter((r) => r.type === type)
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

/** All unique verified credits across every release, for §21's "Selected Work/Credits". */
export function getAllCredits(releases: Release[]) {
  const seen = new Set<string>();
  const credits: { role: string; name: string }[] = [];
  for (const release of releases) {
    for (const credit of release.credits ?? []) {
      const key = `${credit.role}:${credit.name}`;
      if (!seen.has(key)) {
        seen.add(key);
        credits.push(credit);
      }
    }
  }
  return credits;
}

export function sortTracks(tracks: Track[] = []): Track[] {
  return [...tracks].sort((a, b) => a.trackNumber - b.trackNumber);
}
/**
 * Flattens every track across all releases into one list for the Music
 * page's "Songs" tab — each track picks up its parent release's artwork,
 * title, slug and date since Track itself carries none of that.
 * Newest release first, tracks in their release's own order.
 */
export function getAllTracks(releases: Release[]): FlattenedTrack[] {
  return [...releases]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .flatMap((release) =>
      sortTracks(release.tracks).map((track) => ({
        ...track,
        releaseId: release.id,
        releaseSlug: release.slug,
        releaseTitle: release.title,
        releaseArtwork: release.artwork,
        releaseDate: release.releaseDate,
      }))
    );
}

/**
 * Upcoming events, soonest first. This is the `upcomingEvents` referenced
 * throughout PDD §17 — the single source of truth for whether the Live nav
 * link, Home's Live section, and any /live redirect logic are shown.
 */
export function getUpcomingEvents(events: LiveEvent[], limit?: number): LiveEvent[] {
  const now = Date.now();
  const upcoming = events
    .filter((event) => new Date(event.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

/** Picks the best available streaming link for a "Listen"-style CTA. */
export function primaryStreamingUrl(release: Release | null | undefined): string | undefined {
  if (!release?.streamingLinks) return undefined;
  return (
    release.streamingLinks.spotify ??
    release.streamingLinks.appleMusic ??
    release.streamingLinks.youtube
  );
}
