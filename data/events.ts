import type { LiveEvent } from "@/types";

/**
 * Live/tour dates (§29). Empty until real shows are confirmed — see
 * `getUpcomingEvents()` in lib/utils.ts, which every consumer of this data
 * (Home's Live section, the nav link, and /live itself) filters through.
 * That single function is what §17 means by "upcomingEvents.length > 0".
 *
 * Example shape, for reference:
 *
 * {
 *   id: "e1",
 *   date: "2026-12-05",
 *   title: "[EVENT_TITLE]",
 *   venue: "[VENUE_NAME]",
 *   city: "Mumbai",
 *   country: "India",
 *   ticketUrl: "[TICKET_URL]",
 * }
 */
export const events: LiveEvent[] = [];
