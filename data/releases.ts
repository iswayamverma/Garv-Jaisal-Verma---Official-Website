import type { Release } from "@/types";

/**
 * Discography data (§22–24).
 *
 * No releases have been supplied at this stage, and none are invented
 * (§0: "Do not invent artist facts" — including release titles or dates).
 * The array starts empty; Home, /music and the JSON-LD in app/layout.tsx
 * all handle an empty list gracefully (§40, §41a) rather than assuming a
 * release exists.
 *
 * To add a real release later, append an object matching the `Release`
 * type from types/index.ts — no component code needs to change (§53).
 *
 * Example shape, for reference:
 *
 * {
 *   id: "r1",
 *   slug: "album-slug",
 *   title: "[ALBUM_NAME]",
 *   type: "album",
 *   releaseDate: "2026-11-14",
 *   artwork: "garv/releases/album-slug-artwork",
 *   shortDescription: "[ALBUM_DESCRIPTION]",
 *   featured: true,
 *   status: "upcoming",
 *   streamingLinks: { spotify: "[SPOTIFY_URL]" },
 *   tracks: [{ id: "t1", trackNumber: 1, title: "[TRACK_TITLE]" }],
 *   credits: [{ role: "Production", name: "Garv Jaisal Verma" }],
 * }
 */
export const releases: Release[] = [];
