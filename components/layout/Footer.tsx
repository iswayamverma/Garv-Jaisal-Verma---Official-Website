import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { socialLinks } from "@/data/social";

const socialPlatforms = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "youtube" as const, label: "YouTube" },
  { key: "spotify" as const, label: "Spotify" },
  { key: "appleMusic" as const, label: "Apple Music" },
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

          {/* Text links rather than brand-logo icons — avoids reproducing
              third-party trademarks and reads as more editorial anyway. */}
          {activeSocials.length > 0 ? (
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {activeSocials.map(({ key, label }) => (
                <a
                  key={key}
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-ash/70">{SITE_TAGLINE}</p>
        </div>
      </Container>
    </footer>
  );
}
