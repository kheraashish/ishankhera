import Image from 'next/image'

/**
 * The press cutouts, standing on a shared baseline.
 *
 * Every source is a white-background JPEG, so these sit on white and nowhere else.
 * Figure 3 is excluded: it is cropped at the thigh and sepia-toned, so it cannot
 * share a baseline with the full-body shots. It carries the About section instead.
 *
 * Heights are in vh rather than %, because a percentage height on a flex item
 * resolves against an indefinite container and collapses. Slight variance between
 * figures keeps the row from reading as a mugshot lineup.
 *
 * Widths are the true trimmed aspect ratios. The two wide poses hide on small screens;
 * five figures across a phone would squash the row to roughly 130px tall.
 */
const FIGURES = [
  {
    src: '/press/figure-1.webp',
    w: 320,
    alt: 'Ishan Khera walking forward playing electric guitar',
    size: 'h-[36vh] sm:h-[38vh] lg:h-[44vh]',
    show: '',
  },
  {
    src: '/press/figure-2.webp',
    w: 344,
    alt: 'Ishan Khera singing into a handheld microphone',
    size: 'h-[33vh] sm:h-[35vh] lg:h-[41vh]',
    show: '',
  },
  {
    src: '/press/figure-4.webp',
    w: 357,
    alt: 'Ishan Khera leaning over his guitar',
    size: 'h-[32vh] sm:h-[34vh] lg:h-[39vh]',
    show: '',
  },
  {
    src: '/press/figure-5.webp',
    w: 825,
    alt: 'Ishan Khera mid-jump with an amber electric guitar',
    size: 'h-[29vh] sm:h-[36vh] lg:h-[42vh]',
    show: 'hidden sm:block',
  },
  {
    src: '/press/figure-6.webp',
    w: 826,
    alt: 'Ishan Khera standing with arms outstretched, guitar slung low',
    size: 'h-[45vh]',
    show: 'hidden lg:block',
  },
]

export function HeroStrip() {
  return (
    <div className="flex w-full items-end justify-center gap-3 sm:gap-6 lg:gap-8">
      {FIGURES.map((fig, i) => (
        <Image
          key={fig.src}
          src={fig.src}
          alt={fig.alt}
          width={fig.w}
          height={1000}
          priority={i < 3}
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className={`${fig.show} ${fig.size} w-auto object-contain object-bottom`}
        />
      ))}
    </div>
  )
}
