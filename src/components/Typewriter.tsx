"use client"

import React, { useEffect, useRef, useState } from "react"

type Highlight = { word: string; className?: string }

type Props = {
  text?: string
  texts?: string[]
  speed?: number
  className?: string
  loop?: boolean
  hold?: number // ms to hold when fully typed
  eraseSpeed?: number // ms per character when erasing
  highlightWords?: Highlight[]
}

export default function Typewriter({
  text,
  texts,
  speed = 60,
  className = "",
  loop = false,
  hold = 1200,
  eraseSpeed = 35,
  highlightWords = [],
}: Props) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const [idx, setIdx] = useState(0)
  const dirRef = useRef<1 | -1>(1) // 1 typing, -1 deleting
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeText = (texts && texts.length ? texts[idx] : (text ?? ""))

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayed("")
    setDone(false)
    dirRef.current = 1

    const tick = () => {
      setDisplayed(prev => {
        const dir = dirRef.current
        if (dir === 1) {
          const next = activeText.slice(0, prev.length + 1)
          if (next.length === activeText.length) {
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
            if (texts && texts.length > 1 && loop) {
              setIdx(i => (i + 1) % texts.length)
            }
            timerRef.current = setTimeout(tick, speed)
            return next
          }
          timerRef.current = setTimeout(tick, eraseSpeed)
          return next
        }
      })
    }

    timerRef.current = setTimeout(tick, speed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeText, speed, loop, hold, eraseSpeed, texts?.length])

  const renderHighlighted = (s: string): React.ReactNode => {
    if (!highlightWords || highlightWords.length === 0) return s
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    let nodes: React.ReactNode[] = [s]
    highlightWords.forEach((h, hIndex) => {
      const regex = new RegExp(`(${escapeRegExp(h.word)})`, 'gi')
      const newNodes: React.ReactNode[] = []
      nodes.forEach((n, i) => {
        if (typeof n !== 'string') {
          newNodes.push(n)
        } else {
          const parts = n.split(regex)
          parts.forEach((part, j) => {
            if (regex.test(part)) {
              const isMatch = new RegExp(`^${escapeRegExp(h.word)}$`, 'i').test(part)
              if (isMatch) {
                newNodes.push(<span key={`${hIndex}-${i}-${j}`} className={h.className || "text-[var(--accent)]"}>{part}</span>)
              } else {
                newNodes.push(part)
              }
            } else {
              newNodes.push(part)
            }
          })
        }
      })
      nodes = newNodes
    })
    return nodes
  }

  return (
    <span className={className}>
      {renderHighlighted(displayed)}
      <span className={`ml-1 inline-block w-[2px] h-[1em] align-[-0.15em] bg-white ${done && !loop ? 'opacity-0' : 'animate-pulse'}`} />
    </span>
  )
}
