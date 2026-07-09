'use client'

import Image from 'next/image'
import { useState } from 'react'

/**
 * Click-to-load YouTube facade.
 *
 * Four live embeds would pull roughly 2.5MB of YouTube player script before anyone
 * pressed play. Instead each slot is a thumbnail until clicked, then swaps in the
 * iframe with autoplay so the click still starts the video.
 *
 * The thumbnail is YouTube's 1280x720 maxresdefault, which for a vertical upload holds
 * the real 9:16 frame centred with blurred filler either side. object-cover inside a
 * 9:16 box crops away exactly that filler.
 */
export function VideoPlayer({
  id,
  title,
  sizes,
  priority = false,
}: {
  id: string
  title: string
  sizes: string
  priority?: boolean
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden bg-plum">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`${title} music video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play the ${title} music video`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-plum/20 transition-colors group-hover:bg-plum/5"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-accent shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-paper">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
