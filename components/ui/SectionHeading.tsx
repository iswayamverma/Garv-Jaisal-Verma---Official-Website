import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  as: HeadingTag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        action ? "sm:flex-row sm:items-end sm:justify-between sm:text-left" : null,
        className
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" ? "items-center" : null)}>
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-ember">{eyebrow}</p>
        ) : null}
        <HeadingTag className="text-balance font-display text-4xl leading-[1.05] text-paper sm:text-5xl">
          {title}
        </HeadingTag>
        {description ? (
          <p className="max-w-[46ch] text-pretty text-base leading-relaxed text-ash">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
