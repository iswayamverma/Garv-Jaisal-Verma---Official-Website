/**
 * Shared content types for the Garv Jaisal Verma site.
 *
 * These mirror the data models defined in PDD v1.3 §22–24 (Release/Track/
 * Credit), §29 (Live), §30 (Social) and §34 (Artist). Keeping them here
 * (rather than inline in each data file) means every data file and every
 * component agrees on the same shape.
 */

// --- Music (§22–24) ---------------------------------------------------

/**
 * A single track flattened out of its parent release, carrying the
 * release's artwork/title/slug/date along with it. Used by the /music
 * page's "Songs" tab, which lists every track across all releases in
 * one place rather than grouped by album.
 */
export interface FlattenedTrack extends Track {
  releaseId: string;
  releaseSlug: string;
  releaseTitle: string;
  releaseArtwork?: string;
  releaseDate: string;
}

export type ReleaseType = "album" | "single" | "collaboration";
export type ReleaseStatus = "upcoming" | "released";

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}

export interface Track {
  id: string;
  trackNumber: number;
  title: string;
  duration?: string;
  streamingUrl?: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  type: ReleaseType;
  /** ISO 8601 date string, e.g. "2026-11-14". */
  releaseDate: string;
  /** Cloudinary public ID for the artwork. Omit until real artwork exists. */
  artwork?: string;
  shortDescription?: string;
  description?: string;
  featured?: boolean;
  status: ReleaseStatus;
  streamingLinks?: StreamingLinks;
  tracks?: Track[];
  credits?: Credit[];
}

// --- Live (§29) ----------------------------------------------------------

export interface LiveEvent {
  id: string;
  /** ISO 8601 date string. */
  date: string;
  title: string;
  venue?: string;
  city: string;
  country?: string;
  ticketUrl?: string;
  detailsUrl?: string;
}

// --- Social (§30) ----------------------------------------------------------

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}

// --- Artist identity (§34) ------------------------------------------------

export interface ArtistProfile {
  name: string;
  profession: string[];
  shortBio: string;
  longBio: string;
  /** Cloudinary public ID for the primary hero image (tablet/desktop). */
  heroImage?: string;
  /** Cloudinary public ID for a hero image composed specifically for narrow phone screens. Falls back to heroImage if unset. */
  heroImageMobile?: string;
  /** Cloudinary public IDs for additional portraits/performance photos. */
  profileImages?: string[];
}

// --- Media / EPK (§18, §26, §0.3 disambiguation) --------------------------
// This is the press-kit page's content model — NOT the generic "media asset"
// concept. See data/media.ts and PDD §0.3 for the naming disambiguation.

export interface PressItem {
  id: string;
  outlet: string;
  title: string;
  url?: string;
  /** ISO 8601 date string. */
  date?: string;
}

export interface MediaKit {
  shortBio: string;
  fullBio: string;
  /** Cloudinary public IDs for EPK-ready press photos. */
  photos: string[];
  /** A single featured/primary video, reused by Home's Video section (§16). */
  videoUrl?: string;
  credits: Credit[];
  press: PressItem[];
  /** URL to a downloadable EPK document/asset, once one exists. */
  epkUrl?: string;
  contactEmail?: string;
}

// --- Contact (§27, §41a) ---------------------------------------------------

export const INQUIRY_TYPES = [
  "Booking",
  "Collaboration",
  "Production",
  "Media",
  "Other",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface ContactApiSuccess {
  ok: true;
}

export interface ContactApiValidationError {
  ok: false;
  error: "validation";
  fields: Record<string, string>;
}

export interface ContactApiRateLimited {
  ok: false;
  error: "rate_limited";
}

export interface ContactApiDeliveryFailed {
  ok: false;
  error: "delivery_failed";
}

export type ContactApiResponse =
  | ContactApiSuccess
  | ContactApiValidationError
  | ContactApiRateLimited
  | ContactApiDeliveryFailed;
