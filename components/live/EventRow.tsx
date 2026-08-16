import type { LiveEvent } from "@/types";
import { formatDateShort } from "@/lib/utils";
import { CtaLink } from "@/components/ui/CtaLink";

export function EventRow({ event }: { event: LiveEvent }) {
  const { day, month } = formatDateShort(event.date);
  const link = event.ticketUrl ?? event.detailsUrl;

  return (
    <div className="flex flex-col gap-4 border-b border-paper/10 py-6 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex shrink-0 flex-col items-center leading-none font-mono">
        <span className="text-2xl font-bold text-paper">{day}</span>
        <span className="text-xs uppercase tracking-[0.14em] text-ember">{month}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-display text-xl text-paper">{event.title}</h3>
        <p className="text-sm text-ash">
          {[event.venue, event.city, event.country].filter(Boolean).join(", ")}
        </p>
      </div>

      {link ? (
        <CtaLink href={link} variant="secondary" className="shrink-0 px-6 py-2.5 text-xs">
          {event.ticketUrl ? "Get Tickets" : "Details"}
        </CtaLink>
      ) : (
        <CtaLink disabled disabledReason="Ticket link coming soon" className="shrink-0 px-6 py-2.5 text-xs">
          Details Soon
        </CtaLink>
      )}
    </div>
  );
}
