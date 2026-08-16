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
export const releases: Release[] = [
  {
    id: "r1",
    slug: "midnight-frequencies",
    title: "Midnight Frequencies",
    type: "album",
    releaseDate: "2026-06-12",
    shortDescription: "A nine-track journey through late-night city sounds.",
    featured: true,
    status: "released",
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example1",
    },
    tracks: [
      { id: "t1", trackNumber: 1, title: "Neon Skyline", duration: "3:24" },
      { id: "t2", trackNumber: 2, title: "Static & Silence", duration: "4:02" },
      { id: "t3", trackNumber: 3, title: "Overpass", duration: "3:47" },
    ],
    credits: [
      { role: "Production", name: "Garv Jaisal Verma" },
      { role: "Mixing", name: "Ravi Menon" },
    ],
  },
  {
  id: "r2",
  slug: "khoobsurat-ho-tum",
  title: "Khoobsurat Ho Tum",
  type: "single",
  releaseDate: "2022-12-23",
  shortDescription: "A tender ballad.",
  status: "released",
  streamingLinks: {
    appleMusic: "https://music.apple.com/example2",
  },
  tracks: [{ id: "t4", trackNumber: 1, title: "Khoobsurat Ho Tum", duration: "3:12" }],
  credits: [{ role: "Production", name: "Garv Jaisal Verma" }],
  },
  {
  id: "r3",
  slug: "woh-raatein",
  title: "Woh Raatein",
  type: "single",
  releaseDate: "2020-11-21",
  shortDescription: "A nostalgic late-night single.",
  status: "released",
  tracks: [{ id: "t5", trackNumber: 1, title: "Woh Raatein" }],
  },
  {
  id: "r4",
  slug: "kayi-sawan",
  title: "Kayi Sawan",
  type: "single",
  releaseDate: "2023-03-10",
  shortDescription: "A stripped-back single recorded live in one take.",
  status: "released",
  streamingLinks: {
    spotify: "https://open.spotify.com/track/example4",
  },
  tracks: [{ id: "t6", trackNumber: 1, title: "Kayi Sawan", duration: "3:38" }],
  credits: [{ role: "Production", name: "Garv Jaisal Verma" }],
  },
  {
  id: "r5",
  slug: "teri-meri-dosti",
  title: "Teri Meri Dosti",
  type: "single",
  releaseDate: "2025-04-18",
  shortDescription: "A heartfelt single celebrating friendship.",
  status: "released",
  streamingLinks: {
    youtube: "https://youtube.com/watch?v=example5",
  },
  tracks: [{ id: "t7", trackNumber: 1, title: "Teri Meri Dosti", duration: "2:55" }],
  },
  {
  id: "r6",
  slug: "hissa",
  title: "Hissa",
  type: "single",
  releaseDate: "2021-05-28",
  shortDescription: "A single about belonging.",
  status: "released",
  tracks: [{ id: "t8", trackNumber: 1, title: "Hissa" }],
  },
];
