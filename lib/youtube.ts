import { youtube } from './site'

export type ChannelStats = { subscribers: number } | null

/**
 * Server-side subscriber count, cached for an hour.
 *
 * YouTube itself rounds subscriberCount to three significant figures, so this is
 * "current" rather than exact. Nobody, including YouTube's own widget, can show a
 * precise number. Without YOUTUBE_API_KEY set, this returns null and every caller
 * degrades to a plain link.
 *
 * Both the hero and the footer call this. Next dedupes identical fetches within a
 * render pass, so it costs one request, not two.
 */
export async function getChannelStats(): Promise<ChannelStats> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return null

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtube.channelId}&key=${key}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null

    const data = await res.json()
    const subscribers = Number(data?.items?.[0]?.statistics?.subscriberCount)
    return Number.isFinite(subscribers) && subscribers > 0 ? { subscribers } : null
  } catch {
    // A dead stats endpoint must never take the page down with it.
    return null
  }
}

export const compactCount = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})
