import Image from 'next/image'
import Link from 'next/link'
import { HeroStrip } from '@/components/HeroStrip'
import { ReleaseCard } from '@/components/ReleaseCard'
import { Reveal } from '@/components/Reveal'
import { VideoPlayer } from '@/components/VideoPlayer'
import { latest, releases } from '@/lib/discography'
import { bio, links, publishedWorks, site } from '@/lib/site'
import { latestVideo, musicVideos } from '@/lib/videos'

const RELEASE_DATE = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function HomePage() {
  const selected = releases.slice(0, 5)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    sameAs: links.map((l) => l.href),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: a poster. Type up top, the band of figures standing on the baseline. */}
      <section className="flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-4 pt-12 sm:px-8 sm:pt-20">
          <h1 className="max-w-4xl text-5xl leading-[0.95] font-light tracking-tighter text-ink sm:text-7xl lg:text-8xl">
            Ishan Khera
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            Music for films, documentaries and songs. Original scores, classical
            arrangements and rock records.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-accent-deep active:translate-y-px"
            >
              Explore music styles
            </Link>
            <a
              href="#latest"
              className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink/50 active:translate-y-px"
            >
              Hear the latest
            </a>
          </div>
        </div>

        {/* mt-auto seats the figures on the fold; pb keeps their boots off the very edge. */}
        <div className="mt-auto pt-10 pb-6 sm:pb-10">
          <HeroStrip />
        </div>
      </section>

      {/* Latest release: the newest record on the left, the rest of the rock videos beside it.
          Every one of these is a 9:16 upload, so the players are vertical. */}
      <section id="latest" className="scroll-mt-16 border-t border-black/10 bg-mist">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-5xl">
              Latest release
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            {/* Every column puts its title directly above its player, so the players
                share a top edge. The featured one is wider, which is what marks it. */}
            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
              <div>
                <h3 className="mb-3 text-[15px] leading-snug font-semibold text-accent">
                  {latest.title}
                </h3>
                <VideoPlayer
                  id={latestVideo.id}
                  title={latest.title}
                  priority
                  sizes="(max-width: 1024px) 80vw, 360px"
                />
                <p className="mt-4 text-sm text-ink/55">
                  {latest.genre}
                  <span className="px-2">/</span>
                  {RELEASE_DATE.format(new Date(latest.date))}
                </p>
                <a
                  href={latest.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-plum px-6 py-3 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-plum-raised active:translate-y-px"
                >
                  Listen on Apple Music
                </a>
              </div>

              {/* Three narrow 9:16 players squeeze to ~110px across on a phone, so they
                  scroll horizontally there and settle into a grid from sm up. */}
              <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
                {musicVideos.map((video) => (
                  <li key={video.id} className="w-[58%] shrink-0 snap-start sm:w-auto">
                    <h3 className="mb-3 text-[15px] leading-snug font-medium text-ink">
                      {video.title}
                    </h3>
                    <VideoPlayer
                      id={video.id}
                      title={video.title}
                      sizes="(max-width: 640px) 58vw, (max-width: 1024px) 30vw, 22vw"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About: colour block. The one deliberate switch to plum on this page. */}
      <section className="bg-plum text-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              {/* The photo is a white-background JPEG. Framed as a print rather than
                  floated, so the white edge reads as intentional. */}
              <div className="relative aspect-[3/4] w-full max-w-md bg-paper p-3">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/press/figure-3.webp"
                    alt="Ishan Khera playing electric guitar"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <h2 className="text-3xl font-light tracking-tight sm:text-5xl">
                  Music services for movies, short films, documentaries and songwriting
                </h2>

                <div className="mt-8 space-y-4">
                  {bio.map((line) => (
                    <p key={line} className="max-w-xl leading-relaxed text-paper/70">
                      {line}
                    </p>
                  ))}
                </div>

                <h3 className="mt-12 text-sm font-semibold tracking-[0.18em] uppercase text-paper/50">
                  Published work
                </h3>
                <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {publishedWorks.map((work) => (
                    <li key={work} className="text-[15px] leading-relaxed text-paper/85">
                      {work}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-12 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-accent-deep active:translate-y-px"
                >
                  Get music composed
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Selected releases: cover grid. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-3xl font-light tracking-tight text-ink sm:text-5xl">
                Recent releases
              </h2>
              <Link
                href="/discography"
                className="text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                All {releases.length} releases
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {selected.map((release, i) => (
                <ReleaseCard key={release.url} release={release} priority={i === 0} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
