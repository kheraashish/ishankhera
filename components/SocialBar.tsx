import { brandIcons, type BrandIcon } from '@/lib/icons'
import { links, youtube } from '@/lib/site'
import { compactCount, getChannelStats } from '@/lib/youtube'
import { SubscriberCount } from './SubscriberCount'

function Mark({ icon, className }: { icon: BrandIcon; className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  )
}

const href = (label: string) => links.find((l) => l.label === label)?.href ?? '#'

// Logos only, no labels. Rendered monochrome rather than in brand colours: a red
// YouTube beside a gradient Instagram beside a green Spotify would fight the page's
// single accent. They pick up the accent on hover.
// Amazon Music is absent because simple-icons carries no Amazon mark. It stays a
// text link in the footer.
const PLATFORMS = [
  { label: 'Instagram', icon: brandIcons.instagram },
  { label: 'Apple Music', icon: brandIcons.appleMusic },
  { label: 'Spotify', icon: brandIcons.spotify },
]

export async function SocialBar() {
  const stats = await getChannelStats()

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <a
        href={youtube.url}
        target="_blank"
        rel="noreferrer"
        aria-label={
          stats
            ? `YouTube, ${compactCount.format(stats.subscribers)} subscribers`
            : 'YouTube'
        }
        className={`group inline-flex items-center transition-colors active:translate-y-px ${
          stats
            ? 'gap-2.5 rounded-full border border-ink/15 py-2 pr-4 pl-3.5 hover:border-ink/40'
            : 'h-10 w-10 justify-center rounded-full hover:bg-mist'
        }`}
      >
        <Mark
          icon={brandIcons.youtube}
          className="h-5 w-5 fill-ink/70 transition-colors group-hover:fill-accent"
        />
        {stats && (
          <span className="text-sm font-semibold text-ink">
            <SubscriberCount value={stats.subscribers} />
          </span>
        )}
      </a>

      <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/15" />

      {PLATFORMS.map((platform) => (
        <a
          key={platform.label}
          href={href(platform.label)}
          target="_blank"
          rel="noreferrer"
          aria-label={platform.label}
          className="group inline-grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-mist active:translate-y-px"
        >
          <Mark
            icon={platform.icon}
            className="h-[22px] w-[22px] fill-ink/70 transition-colors group-hover:fill-accent"
          />
        </a>
      ))}
    </div>
  )
}
