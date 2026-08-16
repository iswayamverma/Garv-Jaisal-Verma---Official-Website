# Garv Jaisal Verma — Official Artist Website

Built from `Garv_Jaisal_Verma_PDD_final.pdf` (v1.3). Next.js 16 (App Router) ·
React 19 · TypeScript (strict) · Tailwind CSS v4 · Zod v4 · next-cloudinary.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev                  # http://localhost:3000
```

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # eslint . (Next.js 16 removed `next lint`)
npm run build         # production build (Turbopack)
```

All four commands run clean as delivered. This was verified by actually
installing dependencies and running each command, not just reviewed by eye —
see **"How this was verified"** below for exactly what that did and didn't
cover.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL — powers metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. Until set, every media slot shows the built-in placeholder instead of attempting to load an image |
| `EMAIL_PROVIDER_API_KEY` | Resend API key (or swap providers — see `lib/email.ts`) |
| `CONTACT_TO_EMAIL` | Inbox that receives contact-form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender address for your email provider |

The contact form and API route work without any of these set — the route
still exists and fails gracefully with a distinct error message (PDD §27a),
and media slots simply show placeholders.

## Adding real content later (PDD §53)

Nothing below requires touching a component:

- **Bio, artist photos** → `data/artist.ts`
- **Releases, tracks, credits** → `data/releases.ts`
- **Tour dates** → `data/events.ts` — the Live nav link and Home's Live
  section appear automatically once this array has an upcoming date
- **Press kit content** (bio, photos, credits, press, EPK link) →
  `data/media.ts`
- **Social links** → `data/social.ts` — footer links appear automatically
  once a platform's URL is filled in
- **Photos/artwork/video** → upload to Cloudinary, reference the public ID
  in the relevant data file. `MediaSlot` swaps from placeholder to real
  image automatically; if a public ID is ever wrong or the asset fails to
  load, it falls back to the same placeholder rather than a broken-image
  icon (§41a)

Each data file has an example object in a comment showing the exact shape
to copy.

## Design notes

The brief asked for "near-black/off-white ... an accent derivable later
from artwork" and explicitly ruled out generic/template/SaaS-dashboard
looks. Rather than defaulting to a bright neon accent on black, the palette
leans warm and restrained — closer to brass, tape saturation and amber
stage lighting than a "premium" gold cliché:

- `--color-ink` `#0b0a08`, `--color-paper` `#f4f0e6`, `--color-ember`
  `#c9974c` (plus `charcoal`/`ash`/`ember-light`/`ember-deep` — all in
  `app/globals.css`'s `@theme` block). Swap `--color-ember` once real
  artwork exists and buttons, links and focus rings update with it.
- Type pairing: **Fraunces** (display) + **Manrope** (body), with
  **Space Mono** used narrowly for numerals (track numbers, event dates) —
  a small nod to the "producer" side of the identity.
- One signature device: a **waveform motif**, used consistently for every
  empty media slot, every loading skeleton, and a few section accents.
  Since no real photography exists yet, the placeholders needed to read as
  intentional rather than unfinished — tying them to an audio waveform
  (rather than a generic gray box) ties the "nothing here yet" moments
  directly to what the site is actually about. See `components/ui/Waveform.tsx`.

## Notable implementation decisions

The PDD is thorough but — correctly, per its own §49 — leaves some calls to
the implementer. Worth knowing about:

- **Home sections hide when empty; dedicated pages show a "coming soon"
  empty state.** §41a names three pages explicitly (`/music`, `/media`,
  `/live`) for the intentional empty-state treatment; §40's default
  (hide rather than show emptiness) applies to Home's preview sections.
  Home's Current Release, Music Preview and Live sections all render
  `null` when there's nothing to show; `/music`, `/live`, and the press
  coverage part of `/media` render `EmptyState`.
- **Home's Live section caps at 3 events; `/live` shows all of them.**
  §17's "up to 3" reads as describing Home's preview, consistent with how
  Music Preview (3 on Home) vs. `/music` (full catalog) already works.
- **Loading skeletons exist but won't visibly appear yet.** §41a asks for
  artist-styled loading states for data-dependent sections. Release/event/
  press data is currently read synchronously from local files (§33), so
  there's nothing to visibly await. The skeleton components
  (`components/ui/Skeleton.tsx`) are built, sized to match their real
  counterparts, and ready to wrap in `<Suspense>` the moment that data
  source becomes async (a CMS, an API) — at that point it's a drop-in
  change, not a redesign.
- **Footer social links are text, not brand-logo icons.** `lucide-react`'s
  current release doesn't ship trademarked brand marks (Instagram/YouTube/
  etc. icons aren't exported) — confirmed by actually checking the
  installed package rather than assuming. Text links avoid the issue
  entirely and read as more editorial anyway.
- **Contact rate-limiting is in-memory** (§28 asks for exactly this, not an
  external service). On serverless platforms a function can run across
  multiple isolated instances, so this is a best-effort per-instance
  deterrent, not a distributed guarantee — appropriate for a low-traffic
  artist contact form. See the comment in `lib/rate-limit.ts`.
- **Email delivery calls Resend's HTTP API directly** rather than adding
  its SDK as a dependency, so switching providers (§27a explicitly allows
  this) means editing one function in `lib/email.ts` — nothing else in the
  app changes.
- **Footer copyright year is computed at render time**
  (`new Date().getFullYear()`), not hardcoded to 2026, so the site doesn't
  need a yearly edit.
- **MusicGroup was chosen over Person** for the JSON-LD type (§38 offered
  either) — it's the schema.org type real-world music sites commonly use
  for solo artists, since it carries music-specific vocabulary Person
  doesn't. Only confirmed fields are populated (name, url, and `sameAs`
  once social links exist) — nothing invented.

## How this was verified

Rather than only reviewing the code by eye, this project was actually
installed and built:

- `npm install` against real, current registry versions (Next 16.3,
  React 19.2, Tailwind 4.3, Zod 4.4 — checked at build time, not assumed
  from memory, since all three are named in the PDD as common sources of
  stale-syntax mistakes)
- `tsc --noEmit` — clean
- `eslint .` — clean (Next.js 16 removed the `next lint` command; this
  project uses the flat-config setup Next's own docs recommend as the
  replacement)
- `next build` — succeeds, all 12 routes generate correctly (6 pages,
  `/api/contact`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`,
  `/_not-found`)

This process caught and fixed several real issues before delivery — not
hypothetical ones: a TypeScript error in a class-merging call, a
`lucide-react` version change that removed the brand icons the Footer
originally used, and a React hooks lint rule about calling `setState`
inside an effect. All three are fixed in the delivered code.

**One thing this sandbox genuinely could not verify:** live network access
is restricted to package registries here, so `next/font/google`
(Fraunces/Manrope/Space Mono) cannot fetch from `fonts.googleapis.com` in
*this* environment. To confirm nothing else was hiding behind that, the
build was run a second time with a temporary local-fonts stand-in for the
same layout file — it succeeded end-to-end (all 12 routes) — and the real
`next/font/google` version was then restored as the delivered code. Google
Fonts is a normal outbound call for any dev machine or for Vercel (the
deployment target named in §4), so this should just work the first time you
run `npm run dev` or `npm run build` outside this sandbox. If you're
building somewhere with restricted egress, swap the three `next/font/google`
calls in `app/layout.tsx` for `next/font/local` and self-hosted font files.

## What's intentionally not here

Per §43's do-not list: no blog, fan accounts, authentication, dashboard,
store, newsletter, or database. The contact API route validates input and
forwards it to an email provider — it has no database and doesn't persist
submissions (§27a).
