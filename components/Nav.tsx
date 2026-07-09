'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nav, site } from '@/lib/site'

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/90 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8"
      >
        {/* The wordmark hides below sm. Four nav pills plus the wordmark overflow a
            390px viewport, and a scrolling header drags the whole page sideways. */}
        <Link
          href="/"
          className="hidden text-sm font-semibold tracking-[0.2em] uppercase text-ink transition-colors hover:text-accent sm:block"
        >
          {site.name}
        </Link>

        <ul className="flex w-full items-center justify-between gap-0.5 sm:w-auto sm:justify-end sm:gap-2">
          {nav.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-block rounded-full px-2.5 py-2 text-[12.5px] font-medium whitespace-nowrap transition-colors sm:px-4 sm:text-sm ${
                    active
                      ? 'bg-plum text-paper'
                      : 'text-ink/70 hover:bg-mist hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
