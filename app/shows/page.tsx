import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Metadata } from 'next'
import type { Show } from '@/types'

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
      <section>
        <h1>Shows</h1>

        {error && <p>{error}</p>}

        <div>
          <h2>Upcoming</h2>
          {upcoming.length === 0 ? (
            <p>No upcoming shows scheduled. Check back soon!</p>
          ) : (
            <ul>
              {upcoming.map((show) => (
                <li key={show.id}>
                  <p>{formatDate(show.event_date)}</p>
                  {show.event_time && (
                    <p>
                      {formatTime(show.event_time)}
                      {show.event_end_time && ` – ${formatTime(show.event_end_time)}`}
                    </p>
                  )}
                  <p>{show.venue_name ?? 'Venue TBA'}</p>
                  {show.notes && <p>{show.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {past.length > 0 && (
          <div>
            <h2>Past Shows</h2>
            <ul>
              {past.map((show) => (
                <li key={show.id}>
                  <p>{formatDate(show.event_date)}</p>
                  <p>{show.venue_name ?? 'Venue TBA'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}
