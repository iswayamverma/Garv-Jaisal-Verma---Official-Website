import Link from "next/link";
import { SiInstagram, SiFacebook, SiSpotify, SiApplemusic, SiYoutubemusic } from "react-icons/si";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, LEGAL_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { socialLinks } from "@/data/social";

const socialPlatforms = [
  { key: "instagram" as const, label: "Instagram", Icon: SiInstagram },
  { key: "facebook" as const, label: "Facebook", Icon: SiFacebook },
  { key: "spotify" as const, label: "Spotify", Icon: SiSpotify },
  { key: "appleMusic" as const, label: "Apple Music", Icon: SiApplemusic },
  { key: "youtube" as const, label: "YouTube Music", Icon: SiYoutubemusic },
];

export function Footer() {
  const activeSocials = socialPlatforms.filter(({ key }) => Boolean(socialLinks[key]));

  return (
    <footer className="border-t border-paper/10 bg-ink">
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-start">
          <div className="flex flex-col gap-2">
            <span className="font-display text-2xl text-paper">{SITE_NAME}</span>
            <span className="text-xs uppercase tracking-[0.24em] text-ash">{SITE_TAGLINE}</span>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Monochrome outline icon buttons — echoes the plain white
              social row style used on artist sites like Coldplay's,
              rather than each platform's own brand color. */}
          {activeSocials.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3">
              {activeSocials.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-9 items-center justify-center rounded-full border border-paper/30 text-paper/80 transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.href} className="flex items-center gap-2">
                {index > 0 ? <span className="text-ash/40">|</span> : null}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
