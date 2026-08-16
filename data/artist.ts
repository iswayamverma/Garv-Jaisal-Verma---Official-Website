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
  shortBio: "[SHORT_BIO]",
  longBio: "[LONG_BIO]",
  // e.g. "garv/hero-portrait" once a real asset is uploaded to Cloudinary.
  heroImage: undefined,
  profileImages: [],
};
