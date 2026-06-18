'use client'

import { useEffect, useState } from 'react'

// 5-wide x 7-tall bulb grid per letter. 1=bulb on, 0=bulb off
const LETTERS: Record<string, number[][]> = {
  S: [[0,1,1,1,0],[1,1,0,0,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,0,0,1,1],[0,1,1,1,0]],
  H: [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  O: [[0,1,1,1,0],[1,1,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,0,1,1],[0,1,1,1,0]],
  W: [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,1,0,1,1],[0,1,0,1,0]],
}

function useBulbStates(totalBulbs: number) {
  const [dims, setDims] = useState<Set<number>>(() => new Set())

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const flickerOne = (idx: number) => {
      const schedule = () => {
        const t = setTimeout(() => {
          setDims(s => new Set([...s, idx]))
          const t2 = setTimeout(() => {
            setDims(s => { const n = new Set(s); n.delete(idx); return n })
            if (Math.random() < 0.3) {
              const t3 = setTimeout(() => {
                setDims(s => new Set([...s, idx]))
                const t4 = setTimeout(() => {
                  setDims(s => { const n = new Set(s); n.delete(idx); return n })
                  schedule()
                }, 50 + Math.random() * 80)
                timers.push(t4)
              }, 80)
              timers.push(t3)
            } else { schedule() }
          }, 60 + Math.random() * 140)
          timers.push(t2)
        }, 1200 + Math.random() * 7000)
        timers.push(t)
      }
      setTimeout(schedule, Math.random() * 3000)
    }
    for (let i = 0; i < totalBulbs; i++) flickerOne(i)
    return () => timers.forEach(clearTimeout)
  }, [totalBulbs])

  return dims
}

function MarqueeLetter({ char, bulbOffset, dimSet }: { char: string; bulbOffset: number; dimSet: Set<number> }) {
  const grid = LETTERS[char]
  if (!grid) return null
  const ROWS = 7, COLS = 5
  const S = 'clamp(7px, 1.8vw, 13px)'  // bulb size
  const G = 'clamp(3px, 0.8vw, 6px)'   // gap

  return (
    <div style={{
      background: 'linear-gradient(160deg, #2e1e06, #1a1000)',
      border: '3px solid #5a3c10',
      boxShadow: '3px 3px 0 #0a0600, 6px 6px 0 rgba(0,0,0,0.4), inset 0 0 16px rgba(0,0,0,0.6)',
      padding: 'clamp(6px, 1.5vw, 10px)',
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${COLS}, ${S})`,
      gridTemplateRows: `repeat(${ROWS}, ${S})`,
      gap: G,
    }}>
      {grid.flatMap((row, r) =>
        row.map((lit, c) => {
          const idx = bulbOffset + r * COLS + c
          const isDim = dimSet.has(idx)
          const isOn = lit === 1 && !isDim
          return (
            <div key={`${r}-${c}`} style={{
              width: S, height: S,
              borderRadius: '50%',
              background: isOn
                ? 'radial-gradient(circle at 38% 32%, #fffbe0, #ffd040 55%, #b86800)'
                : lit
                  ? 'radial-gradient(circle at 38% 32%, #5a3808, #2e1800)'
                  : 'rgba(20,10,0,0.4)',
              boxShadow: isOn
                ? '0 0 clamp(4px,1vw,8px) clamp(2px,0.5vw,4px) rgba(255,200,40,0.95), 0 0 clamp(10px,2.5vw,20px) clamp(4px,1vw,8px) rgba(200,140,20,0.55)'
                : 'none',
              outline: lit ? '1px solid rgba(80,50,0,0.4)' : 'none',
              transition: 'background 0.06s, box-shadow 0.06s',
            }} />
          )
        })
      )}
    </div>
  )
}

export default function NeonTitle({ text }: { text: string }) {
  const chars = text.toUpperCase().split('').filter(c => LETTERS[c])
  const bulbsPerLetter = 5 * 7
  const totalBulbs = chars.length * bulbsPerLetter
  const dimSet = useBulbStates(totalBulbs)

  return (
    <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 py-2">
      <div className="flex items-end justify-center gap-2 sm:gap-3">
        {chars.map((char, i) => (
          <MarqueeLetter
            key={i}
            char={char}
            bulbOffset={i * bulbsPerLetter}
            dimSet={dimSet}
          />
        ))}
      </div>
    </div>
  )
}
