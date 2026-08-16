export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.garvjaisalverma.com";

export const SITE_NAME = "Garv Jaisal Verma";
export const SITE_TAGLINE = "Singer · Composer · Producer";

/**
 * Primary nav destinations (§7). "Live" is filtered out at render time by
 * the Header when there are no upcoming events (§17) — it stays in this
 * list because the route always exists (§6).
 */
export const NAV_LINKS = [
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/live", label: "Live", conditional: true as const },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS = [
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];
