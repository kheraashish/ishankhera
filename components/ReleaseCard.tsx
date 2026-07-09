import Image from 'next/image'
import type { Release } from '@/lib/discography'

const KIND_LABEL: Record<Release['kind'], string> = {
  album: 'Album',
  ep: 'EP',
  single: 'Single',
}

export function ReleaseCard({ release, priority = false }: { release: Release; priority?: boolean }) {
  const year = release.date.slice(0, 4)

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noreferrer"
      className="group block active:scale-[0.99]"
    >
      <div className="relative aspect-square overflow-hidden bg-mist">
        <Image
          src={release.art}
          alt={`Cover art for ${release.title}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-3 text-[15px] leading-snug font-medium text-ink transition-colors group-hover:text-accent">
        {release.title}
      </p>
      <p className="mt-1 text-[13px] text-ink/50">
        {KIND_LABEL[release.kind]}
        <span className="px-1.5">/</span>
        {year}
      </p>
    </a>
  )
}
