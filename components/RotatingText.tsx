'use client'

import { useState, useEffect, useRef } from 'react'

const WORDS = ['bar', 'party', 'venue', 'festival', 'honky tonk', 'dance floor', 'backyard']
const TYPE_SPEED = 80
const DELETE_SPEED = 45
const HOLD_MS = 1600
const LONGEST = WORDS.reduce((a, b) => a.length >= b.length ? a : b)

export default function RotatingText() {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')
  const charIndex = useRef(0)

  useEffect(() => {
    const word = WORDS[wordIndex]

    if (phase === 'typing') {
      if (charIndex.current < word.length) {
        const t = setTimeout(() => {
          charIndex.current += 1
          setDisplayed(word.slice(0, charIndex.current))
        }, TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), HOLD_MS)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (charIndex.current > 0) {
        const t = setTimeout(() => {
          charIndex.current -= 1
          setDisplayed(word.slice(0, charIndex.current))
        }, DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setPhase('typing')
      }
    }
  }, [phase, wordIndex, displayed])

  return (
    <div className="flex items-center justify-center gap-0 font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest text-[var(--gnr-muted)] whitespace-nowrap">
      <span>Find us at a&nbsp;</span>
      <span className="relative inline-block">
        <span aria-hidden className="invisible">dance&nbsp;floor</span>
        <span className="absolute inset-0 text-center text-[var(--gnr-brand)]">
          {displayed}
          <span className="animate-[blink_0.8s_step-end_infinite] text-[var(--gnr-brand)]">|</span>
        </span>
      </span>
      <span>&nbsp;near you</span>
    </div>
  )
}
