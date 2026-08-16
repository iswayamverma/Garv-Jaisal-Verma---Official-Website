import { events } from "@/data/events";
import { getUpcomingEvents } from "@/lib/utils";
import { EventRow } from "@/components/live/EventRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import { Container } from "@/components/ui/Container";

/**
 * The `upcomingEvents.length > 0` condition from §17 — this section, the
 * nav link, and /live's own linkage all key off `getUpcomingEvents`.
 */
export function LiveSection() {
  const upcomingEvents = getUpcomingEvents(events, 3);
  if (upcomingEvents.length === 0) return null;

  return (
    <section className="bg-charcoal py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="On Stage"
          title="Live"
          action={
            <CtaLink href="/live" variant="tertiary" showArrow>
              All Dates
            </CtaLink>
          }
          className="mb-8"
        />
        <div>
          {upcomingEvents.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}
