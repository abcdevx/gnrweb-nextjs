'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  photos: string[]
  interval?: number
}

export default function SubheroSlideshow({ photos, interval = 5000 }: Props) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current)
      setCurrent(i => (i + 1) % photos.length)
    }, interval)
    return () => clearInterval(timer)
  }, [current, photos.length, interval])

  return (
    <div className="absolute inset-0">
      {photos.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : i === prev ? 0 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
            style={{
              filter: 'grayscale(100%) contrast(1.2) brightness(0.55)',
              animation: `ken-burns ${16 + i * 3}s ease-in-out infinite`,
              transformOrigin: 'center center',
            }}
          />
        </div>
      ))}
    </div>
  )
}
