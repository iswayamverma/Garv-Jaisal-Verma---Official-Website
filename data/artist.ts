import type { ArtistProfile } from "@/types";

/**
 * Core artist identity.
 *
 * Per PDD §0/§35, nothing here may be invented. `shortBio` and `longBio`
 * are left as the literal placeholder tokens until the owner supplies real
 * copy — components render placeholder tokens as an intentional "content
 * coming soon" treatment rather than printing the brackets (see
 * `isPlaceholder` in lib/utils.ts).
 */
export const artist: ArtistProfile = {
  name: "Garv Jaisal Verma",
  profession: ["Singer", "Composer", "Producer"],
  shortBio:
    "Mumbai-based singer-songwriter, producer and composer, known for original compositions across diverse genres.",
  longBio:
    "GJ Verma is a Mumbai based musician Singer-songwriter, Music producer and composer professionally known as Garv Jaisal Verma, recognized for his original compositions across diverse genres. Hailing from Varanasi, the spiritual heart of India, GJ's work reflects a blend of creativity and cultural roots, delivering music that captivates and resonates with listeners. Some of GJ's well-loved songs include \"Teri Meri Dosti,\" \"Kayi Sawan,\" \"Khoobsurat Ho Tum,\" \"Hissa,\" and \"Woh Raatein.\"",
  heroImage: "landing-page_ihoexb",
  heroImageMobile: "phone-landing-image_r5fhr3",
  profileImages: ["artist-potrait_bb437b"],
};