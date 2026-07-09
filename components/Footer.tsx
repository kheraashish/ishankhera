import Link from 'next/link'
import { links, nav, site } from '@/lib/site'
import { YouTubeBadge } from './YouTubeBadge'

export function Footer() {
  return (
    <footer className="bg-plum text-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-2xl font-light tracking-tight sm:text-3xl">{site.name}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/60">
              Music for films, movies, documentaries and songwriting.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <YouTubeBadge tone="dark" />
            <ul className="flex flex-wrap gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-full bg-plum-raised px-4 py-2 text-sm text-paper/80 transition-colors hover:bg-paper hover:text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-paper/10 pt-8 text-xs text-paper/40">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
