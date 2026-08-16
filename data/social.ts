import type { SocialLinks } from "@/types";

/**
 * Social profile URLs (§30). Every platform starts unset — the Footer and
 * JSON-LD `sameAs` list only show/include a platform once its URL is
 * filled in here, per "Hide unavailable platforms."
 */
export const socialLinks: SocialLinks = {
  instagram: undefined,
  youtube: undefined,
  spotify: undefined,
  appleMusic: undefined,
};
