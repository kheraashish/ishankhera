import type { Metadata } from 'next'
import Image from 'next/image'
import { ContactForm } from '@/components/ContactForm'
import { Reveal } from '@/components/Reveal'
import { links } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Commission original music for a movie, documentary, game or advertisement.',
}

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <h1 className="text-4xl leading-[1.05] font-light tracking-tighter text-ink sm:text-6xl">
                Get music composed for your project
              </h1>
              <p className="mt-6 max-w-md leading-relaxed text-ink/70">
                Tell me what you are making and roughly what it is worth to you. I will come
                back with what the music could be.
              </p>

              {/* White-background cutout on a white page, so it needs no frame here. */}
              <Image
                src="/press/portrait.webp"
                alt="Portrait of Ishan Khera"
                width={1200}
                height={1600}
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="mt-10 hidden w-full max-w-[220px] lg:block"
              />

              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-8">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-ink/60 underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
