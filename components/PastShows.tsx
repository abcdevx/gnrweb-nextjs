'use client'

import { useState } from 'react'
import type { Show } from '@/types'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function PastShows({ past }: { past: Show[] }) {
  const [open, setOpen] = useState(false)

  if (past.length === 0) return null

  // Group by year
  const byYear: Record<string, Show[]> = {}
  for (const show of past) {
    const year = show.event_date ? show.event_date.slice(0, 4) : 'Unknown'
    if (!byYear[year]) byYear[year] = []
    byYear[year].push(show)
  }
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--gnr-border)]">
        <h2 className="text-2xl">Past Shows</h2>
        <button
          onClick={() => setOpen(o => !o)}
          className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest px-4 py-2 border border-[var(--gnr-border)] text-[var(--gnr-muted)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
        >
          {open ? 'Hide' : 'See Past Shows'}
        </button>
      </div>

      {open && (
        <div className="space-y-10">
          {years.map(year => (
            <div key={year}>
              <p className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)] mb-3 pb-1 border-b border-[var(--gnr-border)]">
                {year}
              </p>
              <ul className="space-y-1">
                {byYear[year].map(show => (
                  <li
                    key={show.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 py-3 border-b border-[var(--gnr-border)] opacity-50 hover:opacity-75 transition-opacity"
                  >
                    <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-wider text-[var(--gnr-muted)] shrink-0 min-w-[180px]">
                      {formatDate(show.event_date)}
                    </span>
                    <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)]">
                      {show.venue_name ?? 'Venue: TBD'}
                    </span>
                    <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)] sm:ml-auto shrink-0">
                      {show.location ?? 'Location: TBD'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
