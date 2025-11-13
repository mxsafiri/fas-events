"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  text: string
  speed?: number
  className?: string
  loop?: boolean
  hold?: number // ms to hold when fully typed
  eraseSpeed?: number // ms per character when erasing
}

export default function Typewriter({ text, speed = 60, className = "", loop = false, hold = 1200, eraseSpeed = 35 }: Props) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const dirRef = useRef<1 | -1>(1) // 1 typing, -1 deleting
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // clear previous
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayed("")
    setDone(false)
    dirRef.current = 1

    const tick = () => {
      setDisplayed(prev => {
        const dir = dirRef.current
        if (dir === 1) {
          const next = text.slice(0, prev.length + 1)
          if (next.length === text.length) {
            setDone(true)
            if (loop) {
              timerRef.current = setTimeout(() => {
                setDone(false)
                dirRef.current = -1
                tick()
              }, hold)
            }
            return next
          }
          timerRef.current = setTimeout(tick, speed)
          return next
        } else {
          // deleting
          const next = prev.slice(0, -1)
          if (next.length === 0) {
            dirRef.current = 1
            timerRef.current = setTimeout(tick, speed)
            return next
          }
          timerRef.current = setTimeout(tick, eraseSpeed)
          return next
        }
      })
    }

    // start
    timerRef.current = setTimeout(tick, speed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [text, speed, loop, hold, eraseSpeed])

  return (
    <span className={className}>
      {displayed}
      <span className={`ml-1 inline-block w-[2px] h-[1em] align-[-0.15em] bg-white ${done && !loop ? 'opacity-0' : 'animate-pulse'}`} />
    </span>
  )
}
