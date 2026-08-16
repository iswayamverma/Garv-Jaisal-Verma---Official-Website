import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-ember px-7 py-3.5 text-ink hover:bg-ember-light active:bg-ember-deep",
  secondary: "border border-ash/40 px-7 py-3.5 text-paper hover:border-ember hover:text-ember",
  tertiary:
    "px-0 py-2 text-paper underline decoration-ash/50 underline-offset-4 hover:text-ember hover:decoration-ember",
};

interface CtaLinkProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
  disabled?: boolean;
  disabledReason?: string;
}

/**
 * Shared CTA primitive covering PDD §44's three tiers (primary/secondary/
 * tertiary). Renders a Next.js `<Link>` for internal hrefs, a plain `<a>`
 * for external ones, a `<button>` when no href is given (form submits,
 * menu toggles), or an inert `<span>` when `disabled` — used for things
 * like "Download EPK" before a real EPK file exists, so the CTA is visible
 * but never a broken link (§40).
 */
export function CtaLink({
  href,
  onClick,
  type,
  variant = "primary",
  children,
  className,
  external,
  showArrow = false,
  disabled = false,
  disabledReason,
}: CtaLinkProps) {
  const classes = cn(base, variants[variant], className);
  const arrow = showArrow ? <ArrowUpRight className="size-4" aria-hidden="true" /> : null;

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true" title={disabledReason}>
        {children}
        {arrow}
      </span>
    );
  }

  if (!href) {
    return (
      <button type={type ?? "button"} onClick={onClick} className={classes}>
        {children}
        {arrow}
      </button>
    );
  }

  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
      {arrow}
    </Link>
  );
}
