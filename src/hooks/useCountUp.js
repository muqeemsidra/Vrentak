import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 700 } = {}) {
  const [value, setValue] = useState(0)
  const frameRef = useRef()
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setValue(target)
      return undefined
    }

    const start = performance.now()
    const from = 0

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(from + (target - from) * eased)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return value
}
