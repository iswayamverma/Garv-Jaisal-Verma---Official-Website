"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { events } from "@/data/events";
import { getUpcomingEvents, cn } from "@/lib/utils";
import { socialLinks } from "@/data/social";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const hasUpcomingEvents = getUpcomingEvents(events).length > 0;
  const links = NAV_LINKS.filter((link) => !link.conditional || hasUpcomingEvents);

  const listenHref = socialLinks.spotify ?? "/music";

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 8);

      // Ignore tiny jitters (e.g. iOS bounce scroll) so the header doesn't
      // flicker; only react once the user has scrolled a meaningful amount.
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) < 8) return;

      // Never hide the header while it's within the first screen's worth
      // of scroll (still over the Hero) or while the mobile menu is open.
      if (currentY < 120 || open) {
        setHidden(false);
      } else {
        setHidden(delta > 0);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        scrolled || open ? "bg-ink/95 backdrop-blur-sm" : "bg-transparent",
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember",
                  active ? "text-ember" : "text-paper/80 hover:text-paper"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <CtaLink href={listenHref} variant="secondary" className="px-5 py-2.5 text-xs">
            Listen
          </CtaLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-11 items-center justify-center text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden bg-ink transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <Container as="div" className="flex flex-col gap-1 pb-8 pt-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "border-b border-paper/10 py-4 font-display text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember",
                    active ? "text-ember" : "text-paper"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <CtaLink
              href={listenHref}
              onClick={() => setOpen(false)}
              variant="primary"
              className="mt-6 w-full"
            >
              Listen
            </CtaLink>
          </Container>
        </div>
      </div>
    </header>
  );
}