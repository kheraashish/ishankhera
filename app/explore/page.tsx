import type { Metadata } from 'next'
import { ReleaseCard } from '@/components/ReleaseCard'
import { Reveal } from '@/components/Reveal'
import { releases } from '@/lib/discography'
import { styleGroups } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Explore music styles',
  description:
    'Opera, classical arrangements, orchestral and instrumental writing, rock and country songwriting.',
}

export default function ExplorePage() {
  // Grouped by the genre Apple actually reports for each release, so nothing here is
  // an editorial guess. Anything Apple genres outside the buckets below falls through.
  const groups = styleGroups
    .map((group) => ({
      ...group,
      items: releases.filter((r) => group.genres.includes(r.genre)),
    }))
    .filter((group) => group.items.length > 0)

  const grouped = new Set(groups.flatMap((g) => g.items.map((i) => i.url)))
  const ungrouped = releases.filter((r) => !grouped.has(r.url))

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h1 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tighter text-ink sm:text-6xl">
            Explore music styles
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
            Opera and classical writing, orchestral and instrumental score work, and
            guitar-led records. Every release below is on Apple Music.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi === 0 ? 0 : 0.05}>
              <section>
                <div className="border-t border-black/10 pt-8">
                  <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                    {group.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink/60">
                    {group.blurb}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                  {group.items.map((release) => (
                    <ReleaseCard key={release.url} release={release} />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          {ungrouped.length > 0 && (
            <Reveal>
              <section>
                <div className="border-t border-black/10 pt-8">
                  <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                    Other work
                  </h2>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                  {ungrouped.map((release) => (
                    <ReleaseCard key={release.url} release={release} />
                  ))}
                </div>
              </section>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  )
}
