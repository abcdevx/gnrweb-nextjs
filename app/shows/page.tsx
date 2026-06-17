import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Metadata } from 'next'
import type { Show } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `Shows | ${siteConfig.bandName}`,
  description: `Upcoming and past shows for ${siteConfig.bandName}.`,
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(timeStr: string | null): string {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

function splitShows(shows: Show[]): { upcoming: Show[]; past: Show[] } {
  const today = new Date().toISOString().split('T')[0]
  return {
    upcoming: shows.filter((s) => s.event_date && s.event_date >= today).sort((a, b) => (a.event_date ?? '').localeCompare(b.event_date ?? '')),
    past: shows.filter((s) => s.event_date && s.event_date < today || s.status === 'completed').sort((a, b) => (b.event_date ?? '').localeCompare(a.event_date ?? '')),
  }
}

export default async function ShowsPage() {
  let shows: Show[] = []
  let error: string | null = null

  try {
    shows = await getShows()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load shows'
  }

  const { upcoming, past } = splitShows(shows)

  return (
    <>
      {/* Page header */}
      <div className="border-b border-[var(--color-border)] py-16 px-6 text-center bg-[var(--color-surface)]">
        <h1 className="text-5xl sm:text-6xl">Shows</h1>
      </div>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {error && (
            <p className="text-center text-[var(--color-muted)] mb-8">{error}</p>
          )}

          {/* Upcoming */}
          <div className="mb-16">
            <h2 className="text-2xl mb-8 pb-3 border-b border-[var(--color-border)]">Upcoming</h2>
            {upcoming.length === 0 ? (
              <p className="text-[var(--color-muted)]">No upcoming shows scheduled. Check back soon!</p>
            ) : (
              <ul className="space-y-4">
                {upcoming.map((show) => (
                  <li
                    key={show.id}
                    className="border-l-2 border-[var(--color-brand)] pl-5 py-4 bg-[var(--color-surface)] flex flex-col gap-1"
                  >
                    <span className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-[var(--color-brand)]">
                      {formatDate(show.event_date)}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-lg text-[var(--color-text)] font-semibold">
                      {show.venue_name ?? 'Venue TBA'}
                    </span>
                    {show.event_time && (
                      <span className="text-sm text-[var(--color-muted)]">
                        {formatTime(show.event_time)}
                        {show.event_end_time && ` – ${formatTime(show.event_end_time)}`}
                      </span>
                    )}
                    {show.notes && (
                      <span className="text-sm text-[var(--color-muted)] italic">{show.notes}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Past Shows */}
          {past.length > 0 && (
            <div>
              <h2 className="text-2xl mb-8 pb-3 border-b border-[var(--color-border)]">Past Shows</h2>
              <ul className="space-y-2">
                {past.map((show) => (
                  <li
                    key={show.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-3 border-b border-[var(--color-border)] opacity-60"
                  >
                    <span className="font-[family-name:var(--font-display)] text-xs uppercase tracking-wider text-[var(--color-muted)] min-w-[180px]">
                      {formatDate(show.event_date)}
                    </span>
                    <span className="text-[var(--color-text)]">{show.venue_name ?? 'Venue TBA'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
