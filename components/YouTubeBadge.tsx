import { youtube } from '@/lib/site'

type Stats = { subscribers: number } | null

/**
 * Server-side subscriber count, cached for an hour.
 *
 * YouTube itself rounds subscriberCount to three significant figures, so this is
 * "current" rather than exact. Nobody, including YouTube's own widget, can show a
 * precise number. Without YOUTUBE_API_KEY set, this degrades to a plain link.
 */
async function getStats(): Promise<Stats> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return null

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtube.channelId}&key=${key}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null

    const data = await res.json()
    const raw = data?.items?.[0]?.statistics?.subscriberCount
    const subscribers = Number(raw)
    return Number.isFinite(subscribers) && subscribers > 0 ? { subscribers } : null
  } catch {
    // A dead stats endpoint must never take the page down with it.
    return null
  }
}

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

export async function YouTubeBadge({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const stats = await getStats()
  const onDark = tone === 'dark'

  return (
    <a
      href={youtube.url}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98] ${
        onDark
          ? 'bg-paper/10 text-paper hover:bg-paper/20'
          : 'bg-mist text-ink hover:bg-black/10'
      }`}
    >
      <span className="grid h-6 w-9 shrink-0 place-items-center rounded-[4px] bg-accent">
        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-paper" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span>
        Subscribe
        {stats ? (
          <span className={onDark ? 'ml-2 text-paper/60' : 'ml-2 text-ink/55'}>
            {compact.format(stats.subscribers)}
          </span>
        ) : null}
      </span>
    </a>
  )
}
