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
    slug: "a-girl-from-lahore",
    title: "A Girl From Lahore",
    type: "album",
    releaseDate: "2026-09-09",
    artwork: "a-girl-from-lahore_epo8of",
    shortDescription: "A silent confession of love across borders and self-doubt, told through music.",
    featured: true,
    status: "upcoming",
    streamingLinks: {
      spotify: "https://open.spotify.com/album/example1",
    },
    tracks: [
  { id: "t1", trackNumber: 1, title: "Suna Hai Log Ussey", duration: "3:41" },
  { id: "t2", trackNumber: 2, title: "Dark Contrast (coming soon on 9 Oct 2026)", duration: "4:08" },
  { id: "t3", trackNumber: 3, title: "Ankhiya Udaasve (coming soon on 9 Nov 2026)", duration: "3:29" },
  { id: "t9", trackNumber: 4, title: "Raqeeb Se (coming soon on 9 Dec 2026)", duration: "3:55" },
  { id: "t10", trackNumber: 5, title: "Wo Raatein (coming soon on 9 Jan 2027)", duration: "4:12" },
  { id: "t11", trackNumber: 6, title: "Milne Aa (Dariya) (coming soon on 9 Feb 2027)", duration: "3:33" },
  { id: "t12", trackNumber: 7, title: "Soye Nahi (coming soon on 9 March 2027)", duration: "4:01" },
],
    credits: [
      { role: "Production", name: "Garv Jaisal Verma" },
      { role: "Mixing", name: "Anirudha" },
    ],
  },
  {
  id: "r2",
  slug: "khoobsurat-ho-tum",
  title: "Khoobsurat Ho Tum",
  type: "single",
  releaseDate: "2022-12-23",
  artwork: "khoobsurat-ho-tum-artwork_w5gkpa",
  shortDescription: "A tender ballad.",
  status: "released",
  streamingLinks: {
    spotify: "https://open.spotify.com/track/3YZtgZ1342ihQpi0pIkSNK?si=0c1e780f9d934894",
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
  artwork: "woh-raatein-artwork_dbolsw",
  shortDescription: "A nostalgic late-night single.",
  status: "released",
  streamingLinks: {
  spotify: "https://open.spotify.com/track/3ABI0dZ68G3I1erBbJP2Lf?si=3158390b991e4f18",
  },
  tracks: [{ id: "t5", trackNumber: 1, title: "Woh Raatein" }],
  },
  {
  id: "r4",
  slug: "kayi-sawan",
  title: "Kayi Sawan",
  type: "single",
  releaseDate: "2023-03-10",
  artwork: "kayi-sawan-artwork_z6igbz",
  shortDescription: "A stripped-back single recorded live in one take.",
  status: "released",
  streamingLinks: {
    spotify: "https://open.spotify.com/track/6Vnu4wuOqGiuYySQW84Gyz?si=4fd3201bb9f14788",
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
   artwork: "teri-meri-dosti-artwork_qemumv",
  shortDescription: "A heartfelt single celebrating friendship.",
  status: "released",
  streamingLinks: {
  spotify: "https://open.spotify.com/track/5EV6moaGS2gAE3H9git7O1?si=1bb14eb2f6c84945",
  },
  tracks: [{ id: "t7", trackNumber: 1, title: "Teri Meri Dosti", duration: "2:55" }],
  },
  {
  id: "r6",
  slug: "hissa",
  title: "Hissa",
  type: "single",
  releaseDate: "2021-05-28",
  artwork: "hissa-artwork_irol80",
  shortDescription: "A single about belonging.",
  status: "released",
  streamingLinks: {
  spotify: "https://open.spotify.com/track/1y7Y3eIJ3e1a6O1AKfT6Q9?si=5039f7bc32e6480c",
  },
  tracks: [{ id: "t8", trackNumber: 1, title: "Hissa" }],
  },
];
