'use client'

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect } from 'react'

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

// useLayoutEffect warns during SSR; useEffect is the harmless server-side stand-in.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Counts up from zero to the real subscriber count on mount.
 *
 * Motivation: the number is the proof, and watching it climb is what makes it register.
 *
 * The MotionValue is seeded with the real number, not zero, so the server renders
 * "31.7K" rather than "0". A visitor with JavaScript off sees the truth instead of a
 * badge claiming zero subscribers.
 *
 * The tradeoff: the server HTML paints before React hydrates, so on a slow connection
 * the real number shows briefly, then resets to zero and climbs. The reset runs in a
 * layout effect, so it never flashes within the hydration commit itself. Measured
 * sequence on a warm load: 31.7K -> 0 -> 28 steps -> 31.7K. Rendering zero on the
 * server would kill the flash but ship a false number, which is the worse trade.
 *
 * Driven by a MotionValue rather than useState: the frames update one text node
 * directly instead of re-rendering the tree.
 */
export function SubscriberCount({ value }: { value: number }) {
  const reduce = useReducedMotion()
  const count = useMotionValue(value)
  const label = useTransform(count, (v) => compact.format(Math.round(v)))

  useIsomorphicLayoutEffect(() => {
    if (reduce) return

    count.set(0)
    const controls = animate(count, value, {
      duration: 1.1,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1], // quick out of the gate, settles onto the number
    })
    return () => controls.stop()
  }, [count, value, reduce])

  // aria-hidden because the wrapping link already carries the count in its aria-label;
  // a screen reader should not hear a number ticking.
  return (
    <motion.span aria-hidden="true" className="tabular-nums">
      {label}
    </motion.span>
  )
}
