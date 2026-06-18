'use client'

import { useEffect, useState } from 'react'

interface Testimonial {
  quote: string
  author: string
}

export default function RotatingTestimonial({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % testimonials.length)
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const current = testimonials[index]

  return (
    <div className="py-6 px-6 border-b border-[var(--gnr-border)] bg-[var(--gnr-surface)] text-center">
      <div
        style={{
          transition: 'opacity 0.4s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-[family-name:var(--gnr-font-display)] text-[var(--gnr-brand)] leading-snug">
          &ldquo;{current.quote}&rdquo;
        </p>
        {current.author && (
          <p className="mt-2 text-xs font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-[var(--gnr-muted)]">
            — {current.author}
          </p>
        )}
      </div>
    </div>
  )
}
