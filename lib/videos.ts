export type MusicVideo = {
  id: string
  /** Titled to match the Apple Music release, not the raw YouTube title. */
  title: string
  published: string
}

/**
 * The vertical music videos, confirmed 9:16 via the YouTube Data API
 * (player.embedHtml reports 405x720, a ratio of 0.563).
 *
 * The channel also carries six vertical shorts, 30 to 60 seconds of guitar solos and
 * teasers, whose titles are strings of hashtags. They are excluded: a hashtag pile
 * makes a poor heading, and they are promos rather than music videos.
 */
export const latestVideo: MusicVideo = {
  id: 'brKBjQtniGo',
  title: 'Good Time',
  published: '2026-05-22',
}

export const musicVideos: MusicVideo[] = [
  { id: 'RvkuOLRHKMM', title: "Rock'n'roll Never Dies", published: '2026-06-13' },
  { id: 'dzBv8n4Seeo', title: 'Why I Play Guitar', published: '2025-10-14' },
  { id: '11yotSsrXVg', title: "Need Some Rock 'n' Roll", published: '2025-07-22' },
]
