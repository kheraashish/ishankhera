import type { Metadata } from 'next'
import { ReleaseCard } from '@/components/ReleaseCard'
import { Reveal } from '@/components/Reveal'
import { releases } from '@/lib/discography'

export const metadata: Metadata = {
  title: 'Discography',
  description: 'Albums, EPs and singles by Ishan Khera.',
}

export default function DiscographyPage() {
  // 33 releases is too many for a flat list, so they are chunked by year.
  const byYear = new Map<string, typeof releases>()
  for (const release of releases) {
    const year = release.date.slice(0, 4)
    const bucket = byYear.get(year)
    if (bucket) bucket.push(release)
    else byYear.set(year, [release])
  }
  const years = [...byYear.entries()]

  const albums = releases.filter((r) => r.kind === 'album').length

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h1 className="text-4xl leading-[1.05] font-light tracking-tighter text-ink sm:text-6xl">
            Discography
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
            {releases.length} releases, {albums} of them albums, from{' '}
            {years[years.length - 1][0]} to today. Each cover links to Apple Music.
          </p>
        </Reveal>

        <div className="mt-20 space-y-20">
          {years.map(([year, items]) => (
            <Reveal key={year}>
              <section>
                <div className="flex items-baseline gap-6 border-t border-black/10 pt-6">
                  <h2 className="text-2xl font-medium tracking-tight text-ink tabular-nums">
                    {year}
                  </h2>
                  <span className="text-sm text-ink/40">
                    {items.length} {items.length === 1 ? 'release' : 'releases'}
                  </span>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                  {items.map((release, i) => (
                    <ReleaseCard
                      key={release.url}
                      release={release}
                      priority={year === years[0][0] && i === 0}
                    />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
