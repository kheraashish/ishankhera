# ishankhera.com

Personal site for Ishan Khera, composer and songwriter. Next.js 15, React 19, Tailwind v4, Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Environment

Copy `.env.example` to `.env.local` and fill both values. Neither is required for the site
to build; each feature degrades on its own if the variable is absent.

| Variable                   | Powers                              | Without it                                |
| -------------------------- | ----------------------------------- | ----------------------------------------- |
| `YOUTUBE_API_KEY`          | Live subscriber count on the badge  | Badge becomes a plain Subscribe link      |
| `NEXT_PUBLIC_FORMSPREE_ID` | Contact form delivery               | Form renders disabled with a notice       |

`YOUTUBE_API_KEY` comes from a Google Cloud project with **YouTube Data API v3** enabled.
The footer badge makes one `channels.list` call per hour, costing 1 of the 10,000 free
daily quota units. Note that YouTube rounds subscriber counts to three significant figures
for everyone, including its own widget, so the number is current rather than exact.

`NEXT_PUBLIC_FORMSPREE_ID` is the id from your Formspree endpoint URL,
`https://formspree.io/f/<id>`. It is public by design; the endpoint only accepts posts.

## Discography

`lib/discography.ts` is generated, not hand-written. It comes from Apple's public iTunes
lookup API, so release titles, dates, track counts, genres and cover art always match what
is actually on Apple Music. After a new release goes live:

```bash
node scripts/sync-discography.mjs
```

The homepage "Latest release" block and the `/explore` genre grouping both read from this
file, so they update with it. `/explore` groups by the genre Apple reports rather than an
editorial guess.

## Images

The press photos in `public/press/` are JPEG cutouts with a **white background baked in**,
not transparent PNGs. Two consequences:

- The page is light-locked. A dark theme would render each figure inside a white box.
- Backgrounds were snapped to pure `#ffffff` during processing. The source JPEGs sat on
  250-254 grey, which shows as a visible rectangle against a white page.

`figure-3` is cropped at the thigh and sepia-toned, so it cannot share a baseline with the
other five. It carries the About section instead of the hero strip.
