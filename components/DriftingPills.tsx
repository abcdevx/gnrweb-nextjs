'use client'

import { useEffect, useRef } from 'react'

interface Props {
  artists: string[]
  children?: React.ReactNode
}

interface PillState {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
}

export default function DriftingPills({ artists, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const stateRef = useRef<PillState[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const W = container.offsetWidth
    const H = container.offsetHeight

    // Init state after a tick so elements have rendered sizes
    const init = () => {
      stateRef.current = artists.map((_, i) => {
        const el = pillRefs.current[i]
        const w = el ? el.offsetWidth : 100
        const h = el ? el.offsetHeight : 24
        const speed = 0.5 + Math.random() * 0.6
        const angle = (Math.random() - 0.5) * 0.4
        const dir = i % 2 === 0 ? 1 : -1
        return {
          x: Math.random() * W,
          y: Math.random() * (H - h),
          vx: speed * dir,
          vy: angle,
          w,
          h,
        }
      })
    }

    init()

    const animate = () => {
      const states = stateRef.current
      const W2 = container.offsetWidth
      const H2 = container.offsetHeight
      // Move
      for (let i = 0; i < states.length; i++) {
        const s = states[i]
        s.x += s.vx
        s.y += s.vy
        // Wrap horizontally
        if (s.x > W2 + 10) s.x = -s.w - 10
        if (s.x < -s.w - 10) s.x = W2 + 10
        // Bounce vertically
        if (s.y < 0) { s.y = 0; s.vy = Math.abs(s.vy) }
        if (s.y + s.h > H2) { s.y = H2 - s.h; s.vy = -Math.abs(s.vy) }
      }

      // Apply transforms
      for (let i = 0; i < states.length; i++) {
        const el = pillRefs.current[i]
        const s = states[i]
        if (el) el.style.transform = `translate(${s.x}px, ${s.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [artists])

  return (
    <>
      {/* Mobile — scrolling marquee + bio */}
      <div className="sm:hidden bg-[var(--gnr-surface)]">
        <div className="px-6 py-10">{children}</div>
        <p className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest text-[var(--gnr-muted)] text-center pb-2">Inspired By</p>
        <div className="overflow-hidden py-3 border-t border-[var(--gnr-border)]">
          <div className="flex gap-3 animate-[river-scroll_50s_linear_infinite] w-max">
            {[...artists, ...artists].map((a, i) => (
              <span
                key={i}
                className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap pointer-events-none shrink-0"
                style={{
                  background: 'rgba(200,169,81,0.06)',
                  border: '1px solid rgba(200,169,81,0.25)',
                  color: 'rgba(200,169,81,0.55)',
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop — animated bubbles */}
      <div ref={containerRef} className="hidden sm:block relative bg-[var(--gnr-surface)] overflow-hidden" style={{ minHeight: '280px' }}>
        {artists.map((a, i) => (
          <span
            key={a}
            ref={el => { pillRefs.current[i] = el }}
            className="absolute top-0 left-0 font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap pointer-events-none"
            style={{
              willChange: 'transform',
              background: 'rgba(200,169,81,0.06)',
              border: '1px solid rgba(200,169,81,0.25)',
              color: 'rgba(200,169,81,0.55)',
              boxShadow: '0 0 12px rgba(200,169,81,0.12), inset 0 0 8px rgba(200,169,81,0.04)',
              backdropFilter: 'blur(2px)',
            }}
          >
            {a}
          </span>
        ))}
        <p className="absolute top-3 left-4 z-10 font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest text-[var(--gnr-muted)]">Inspired By</p>
        <div className="relative z-10 flex items-center justify-center py-16 px-6 h-full">
          {children}
        </div>
      </div>
    </>
  )
}
