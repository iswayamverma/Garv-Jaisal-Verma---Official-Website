import { Waveform } from "./Waveform";
import { cn } from "@/lib/utils";

/**
 * Artist-styled loading placeholders for data-dependent sections (Current
 * Release, Music Preview, Live), per PDD §41a: "a skeleton/placeholder in
 * the artist's visual style (not a generic spinner) ... matching the final
 * layout's dimensions to avoid layout shift."
 *
 * Note on when these actually appear: in this build, release/event/media
 * data is read synchronously from local files under data/ (§33), so these
 * sections have nothing to await and never visibly hang on a skeleton.
 * They're included, sized to match their real counterparts, and exported
 * for the moment that data source becomes asynchronous (e.g. a future CMS
 * or API call) — at that point wrapping the section in `<Suspense
 * fallback={<...Skeleton />}>` is a drop-in change with no redesign
 * needed, in keeping with §53's "no component code should need to change
 * for a content-only update."
 */

export function ReleaseCardSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <Waveform bars={24} className="size-full animate-pulse text-paper/[0.08]" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-2/3 animate-pulse rounded-sm bg-charcoal" />
        <div className="h-3 w-1/3 animate-pulse rounded-sm bg-charcoal" />
      </div>
    </div>
  );
}

export function CurrentReleaseSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16" aria-hidden="true">
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <Waveform bars={32} className="size-full animate-pulse text-paper/[0.08]" />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="h-3 w-24 animate-pulse rounded-sm bg-charcoal" />
        <div className="h-10 w-4/5 animate-pulse rounded-sm bg-charcoal" />
        <div className="h-3 w-full animate-pulse rounded-sm bg-charcoal" />
        <div className="h-3 w-2/3 animate-pulse rounded-sm bg-charcoal" />
        <div className="mt-4 h-12 w-40 animate-pulse rounded-sm bg-charcoal" />
      </div>
    </div>
  );
}

export function EventRowSkeleton() {
  return (
    <div
      className="flex items-center gap-6 border-b border-paper/10 py-6"
      aria-hidden="true"
    >
      <div className="h-12 w-14 shrink-0 animate-pulse rounded-sm bg-charcoal" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 animate-pulse rounded-sm bg-charcoal" />
        <div className="h-3 w-1/3 animate-pulse rounded-sm bg-charcoal" />
      </div>
      <div className={cn("h-9 w-24 shrink-0 animate-pulse rounded-sm bg-charcoal")} />
    </div>
  );
}
