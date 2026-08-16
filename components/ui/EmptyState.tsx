import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Waveform } from "./Waveform";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/**
 * The site's one "coming soon" empty state, used where PDD §41a requires
 * a minimal, intentional treatment (/music with zero releases, /media with
 * no press coverage, /live with no events) rather than a blank page.
 */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-4 overflow-hidden border border-dashed border-paper/15 px-8 py-16 text-center",
        className
      )}
    >
      <Waveform bars={40} className="absolute inset-x-0 bottom-0 h-16 w-full text-paper/[0.05]" />
      <span className="relative flex size-12 items-center justify-center rounded-full border border-ember/30">
        <Icon className="size-5 text-ember/80" aria-hidden="true" />
      </span>
      <h3 className="relative font-display text-2xl text-paper">{title}</h3>
      <p className="relative max-w-[40ch] text-sm leading-relaxed text-ash">{description}</p>
      {action ? <div className="relative mt-2">{action}</div> : null}
    </div>
  );
}
