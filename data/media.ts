import type { MediaKit } from "@/types";

/**
 * Content for the /media (EPK) page — see PDD §0.3 for why this file is
 * named `media.ts` and holds press-kit content specifically, not generic
 * photo/video assets used elsewhere on the site.
 *
 * `photos`, `press` and `credits` start empty rather than filled with
 * invented entries (§0: never fabricate media coverage or credits). The
 * Media page and Home's Media Preview both render an intentional
 * "coming soon" empty state for whichever of these is still empty
 * (§41a).
 */
export const mediaKit: MediaKit = {
  shortBio: "[SHORT_BIO]",
  fullBio:
  "Garv Jaisal Verma is a Mumbai-based singer-songwriter, composer and producer known for original compositions spanning diverse genres. His independent discography includes the singles \"Woh Raatein\" (2020), \"Hissa\" (2021), \"Khoobsurat Ho Tum\" (2022), \"Kayi Sawan\" (2023, featuring Megha Rawoot) and \"Teri Meri Dosti\" (2025), released across Spotify, Apple Music and YouTube Music. He is currently working on his debut album, \"A Girl From Lahore,\" a concept project exploring love, distance and self-doubt through music. In 2018, Garv headlined a live roadshow supporting the national Swachh Survekshan cleanliness initiative, a performance that led to interviews with DD News and DN News.",
  photos: [
    "media-image1_ogbgvz",
    "media-image2_gtjcri",
    "media-image3_nzzs1z",
    "media-image4_mophjg",
    "media-image5_jd0mjm",
    "media-image6_rvp6ng",
  ],
  // Reused as Home's featured Video section (§16) — hidden there when unset.
  videoUrl: undefined,
  credits: [],
  press: [
  {
    id: "p1",
    outlet: "DD News & DN News",
    title:
      "Garv Jaisal Verma Interviewed After Headlining Swachh Survekshan Live Roadshow",
    url: "https://www.instagram.com/p/Brh0KwbFsT9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    date: "2018-12-18",
  },
],
  // Once a real EPK PDF/asset exists, point this at it (e.g. a Cloudinary
  // raw-upload URL) — the Download EPK button switches from disabled to
  // linked automatically.
  epkUrl: undefined,
  contactEmail: undefined,
};
