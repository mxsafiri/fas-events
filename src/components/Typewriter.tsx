"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Highlight = { word: string; className?: string }

type Props = {
  text?: string
  texts?: string[]
  className?: string
  loop?: boolean
  hold?: number // ms to hold each text
  highlightWords?: Highlight[]
}

export default function Typewriter({
  text,
  texts,
  className = "",
  loop = true,
  hold = 3000,
  highlightWords = [],
}: Props) {
  const [idx, setIdx] = useState(0)
  const textArray = texts && texts.length ? texts : [text ?? ""]

  useEffect(() => {
    if (!loop || textArray.length <= 1) return
    
    const interval = setInterval(() => {
      setIdx(prev => (prev + 1) % textArray.length)
    }, hold)

    return () => clearInterval(interval)
  }, [loop, hold, textArray.length])

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
    <span className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block"
        >
          {renderHighlighted(textArray[idx])}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
