import { youtube } from '@/lib/site'
import { compactCount, getChannelStats } from '@/lib/youtube'

/**
 * Footer subscribe badge. Shares getChannelStats with the hero SocialBar; Next dedupes
 * the fetch, so the two together still cost one API call per revalidation.
 *
 * No count-up animation here. The hero already does that, and a footer number that
 * animates on scroll into view reads as a gimmick rather than a fact.
 */
export async function YouTubeBadge({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const stats = await getChannelStats()
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
            {compactCount.format(stats.subscribers)}
          </span>
        ) : null}
      </span>
    </a>
  )
}
