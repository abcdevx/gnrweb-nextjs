'use client'

import Image from 'next/image'

const PHOTO_W = 280
const PHOTO_H = 200
const GAP = 24
const SPEED = 40 // px per second

export default function PhotoCollage({ photos }: { photos: string[] }) {
  if (!photos.length) return null

  // Double the photos so the loop is seamless
  const doubled = [...photos, ...photos]
  const totalW = photos.length * (PHOTO_W + GAP)
  const duration = totalW / SPEED

  return (
    <section
      className="border-t border-[var(--gnr-border)] overflow-hidden relative"
      style={{ height: PHOTO_H + 48, background: 'var(--gnr-surface)' }}
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--gnr-surface), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--gnr-surface), transparent)' }} />

      <div
        className="absolute top-6 flex gap-6"
        style={{
          animation: `river-scroll ${duration}s linear infinite`,
          width: totalW * 2,
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative border border-[var(--gnr-border)] shadow-lg"
            style={{ width: PHOTO_W, height: PHOTO_H }}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="280px" />
          </div>
        ))}
      </div>
    </section>
  )
}
