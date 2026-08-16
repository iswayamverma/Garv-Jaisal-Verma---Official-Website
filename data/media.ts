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
  fullBio: "[LONG_BIO]",
  photos: [],
  // Reused as Home's featured Video section (§16) — hidden there when unset.
  videoUrl: undefined,
  credits: [],
  press: [],
  // Once a real EPK PDF/asset exists, point this at it (e.g. a Cloudinary
  // raw-upload URL) — the Download EPK button switches from disabled to
  // linked automatically.
  epkUrl: undefined,
  contactEmail: undefined,
};
