import type { SocialLinks } from "@/types";

/**
 * Social profile URLs (§30). Every platform starts unset — the Footer and
 * JSON-LD `sameAs` list only show/include a platform once its URL is
 * filled in here, per "Hide unavailable platforms."
 */
export const socialLinks: SocialLinks = {
  instagram: "https://www.instagram.com/garv_jaisal_verman/?hl=en",
  facebook: "https://www.facebook.com/garvjaisalverma",
  spotify: "https://open.spotify.com/artist/6XTCm0sfM2WmWBIg9PpVRv",
  appleMusic: "https://music.apple.com/us/artist/garv-jaisal-verma/1540739311",
  youtube: "https://music.youtube.com/channel/UCc3TpE0gLsut0LrBQclMh5Q?si=P8_eMbysjMkxuHeX",
};