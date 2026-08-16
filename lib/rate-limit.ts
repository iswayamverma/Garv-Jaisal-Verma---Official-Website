/**
 * Lightweight in-memory submission-rate check for the contact API route.
 *
 * PDD §28 asks for "a simple in-memory or edge-based submission-rate check"
 * that does not introduce an external rate-limiting service or database
 * (which would conflict with §5's "no unnecessary infrastructure" rule).
 * This is that: a small sliding-window counter keyed by IP.
 *
 * Trade-off worth knowing about: on serverless platforms a function can run
 * across multiple isolated instances, so this counter is per-instance, not
 * globally distributed. That makes it a real but best-effort deterrent
 * rather than a hard guarantee — appropriate for a low-traffic artist
 * contact form, not for a high-value endpoint.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;

const hits = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const recent = (hits.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(identifier, recent);

  // Periodically forget identifiers with no recent activity so the map
  // doesn't grow without bound over a long-running process.
  if (hits.size > 5000) {
    for (const [key, timestamps] of hits) {
      if (timestamps.every((t) => now - t > WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}
