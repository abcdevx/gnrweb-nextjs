'use client'

import { useState } from 'react'
import type { Show } from '@/types'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

const FIXED_HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '06-19': 'Juneteenth',
  '07-04': 'Independence Day',
  '11-11': 'Veterans Day',
  '12-25': 'Christmas',
  '12-31': "New Year's Eve",
}

function getNthWeekday(year: number, month: number, weekday: number, n: number): string {
  const d = new Date(year, month - 1, 1)
  let count = 0
  while (true) {
    if (d.getDay() === weekday) { count++; if (count === n) break }
    d.setDate(d.getDate() + 1)
  }
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getLastWeekday(year: number, month: number, weekday: number): string {
  const d = new Date(year, month, 0)
  while (d.getDay() !== weekday) d.setDate(d.getDate() - 1)
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getHoliday(dateStr: string | null): string | null {
  if (!dateStr) return null
  const [yearStr, mm, dd] = dateStr.split('-')
  const year = Number(yearStr)
  const mmdd = `${mm}-${dd}`
  if (FIXED_HOLIDAYS[mmdd]) return FIXED_HOLIDAYS[mmdd]
  const floating: Record<string, string> = {
    [getNthWeekday(year, 1, 1, 3)]:  'Martin Luther King Jr. Day',
    [getNthWeekday(year, 2, 1, 3)]:  "Presidents' Day",
    [getLastWeekday(year, 5, 1)]:    'Memorial Day',
    [getNthWeekday(year, 9, 1, 1)]:  'Labor Day',
    [getNthWeekday(year, 10, 1, 2)]: 'Columbus Day',
    [getNthWeekday(year, 11, 4, 4)]: 'Thanksgiving',
  }
  return floating[mmdd] ?? null
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
                    className="relative flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 py-3 border-b border-[var(--gnr-border)] opacity-50 hover:opacity-75 transition-opacity"
                  >
                    <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-wider text-[var(--gnr-muted)] shrink-0 min-w-[180px]">
                      {formatDate(show.event_date)}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)]">
                        {show.location === 'Private Event' ? 'Private Event' : (show.venue_name ?? 'Venue: TBD')}
                      </span>
                      {show.event_title && show.location !== 'Private Event' && (
                        <span className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest text-[var(--gnr-muted)]">
                          {show.event_title}
                        </span>
                      )}
                    </div>
                    {show.location !== 'Private Event' && (
                      <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)] sm:ml-auto shrink-0">
                        {show.location ?? 'Location: TBD'}
                      </span>
                    )}
                    {(() => { const h = getHoliday(show.event_date); return h ? (
                      <span className="font-[family-name:var(--gnr-font-display)] text-[9px] uppercase tracking-widest text-[var(--gnr-brand)] shrink-0">
                        🎉 {h}
                      </span>
                    ) : null })()} 
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
