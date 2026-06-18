'use client'

import Image from 'next/image'
import { useMemo } from 'react'

interface Props {
  photos: string[]
}

interface Placement {
  src: string
  x: number
  y: number
  w: number
  h: number
  angle: number
}

function doesOverlap(a: Placement, b: Placement, pad = 2): boolean {
  return (
    a.x < b.x + b.w + pad &&
    a.x + a.w + pad > b.x &&
    a.y < b.y + b.h + pad &&
    a.y + a.h + pad > b.y
  )
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

export default function PhotoScatter({ photos }: Props) {
  const placements = useMemo<Placement[]>(() => {
    const rand = seededRandom(42)
    const placed: Placement[] = []
    const attempts = 300
    const minW = 16, maxW = 24  // % of viewport width
    const minH = 14, maxH = 22  // % of viewport height

    for (const src of photos) {
      let success = false
      for (let i = 0; i < attempts; i++) {
        const w = minW + rand() * (maxW - minW)
        const h = minH + rand() * (maxH - minH)
        const x = rand() * (100 - w)
        const y = rand() * (100 - h)
        const angle = (rand() - 0.5) * 16  // -8 to +8 degrees
        const candidate: Placement = { src, x, y, w, h, angle }
        if (!placed.some(p => doesOverlap(p, candidate, 2))) {
          placed.push(candidate)
          success = true
          break
        }
      }
      if (!success) break  // skip photo if no room found
    }
    return placed
  }, [photos])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {placements.map((p, i) => (
        <div
          key={i}
          className="absolute overflow-hidden"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.w}vw`,
            height: `${p.h}vh`,
            transform: `rotate(${p.angle}deg)`,
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 100%)',
            opacity: 0.45,
          }}
        >
          <Image src={p.src} alt="" fill className="object-cover" sizes="25vw" />
        </div>
      ))}
    </div>
  )
}
