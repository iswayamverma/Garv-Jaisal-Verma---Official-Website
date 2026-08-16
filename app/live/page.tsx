import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { events } from "@/data/events";
import { getUpcomingEvents } from "@/lib/utils";
import { EventRow } from "@/components/live/EventRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Live",
  description: "Upcoming live dates and shows.",
  alternates: { canonical: "/live" },
};

// This route always exists and is always reachable directly — only its
// nav link and Home's preview are conditional on upcomingEvents (§6, §17).
export default function LivePage() {
  const upcomingEvents = getUpcomingEvents(events);

  return (
    <Container className="flex flex-col gap-16 py-32">
      <SectionHeading eyebrow="On Stage" title="Live" as="h1" />

      {upcomingEvents.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No Dates Announced Yet"
          description="Upcoming shows and tour dates will be listed here as they're confirmed."
        />
      ) : (
        <div>
          {upcomingEvents.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </Container>
  );
}
