import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Metadata } from 'next'
import type { Show } from '@/types'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import PastShows from '@/components/PastShows'

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

const SAMPLE_SHOWS: Show[] = [
  { id: 's1', venue_name: 'The Brown Jug',        location: 'Peoria, IL',        event_date: '2026-07-12', event_time: '21:00:00', event_end_time: null,       status: 'confirmed', notes: null },
  { id: 's2', venue_name: 'Corner Inn',            location: 'Hanna City, IL',    event_date: '2026-07-19', event_time: '20:00:00', event_end_time: '23:00:00', status: 'confirmed', notes: 'All ages welcome' },
  { id: 's3', venue_name: 'Kickapoo Creek Saloon', location: 'Edwards, IL',       event_date: '2026-08-02', event_time: '20:30:00', event_end_time: null,       status: 'confirmed', notes: null },
  { id: 's4', venue_name: 'Crusens',               location: 'Peoria, IL',        event_date: '2026-08-16', event_time: '21:00:00', event_end_time: null,       status: 'confirmed', notes: 'Outdoor stage' },
  { id: 's5', venue_name: 'The Nickel Plate',      location: 'Farmington, IL',    event_date: '2026-06-14', event_time: '20:00:00', event_end_time: null,       status: 'completed', notes: null },
  { id: 's6', venue_name: "Oz's Bar & Grill",      location: 'Creve Coeur, IL',   event_date: '2026-05-22', event_time: '21:00:00', event_end_time: null,       status: 'completed', notes: null },
  { id: 's7', venue_name: 'Burnzee\'s Bar & Grill',location: 'Peoria, IL',        event_date: '2026-05-08', event_time: '20:00:00', event_end_time: null,       status: 'completed', notes: null },
]

export default async function ShowsPage() {
  let shows: Show[] = []
  let error: string | null = null

  try {
    shows = await getShows()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load shows'
  }

  if (shows.length === 0 && !error) shows = SAMPLE_SHOWS

  const { upcoming, past } = splitShows(shows)

  return (
    <div className="relative">

      {/* Subhero */}
      <div className="relative border-b border-[var(--gnr-border)] h-40 sm:h-52 flex items-end justify-center bg-[var(--gnr-surface)]">
        <h1 className="text-5xl sm:text-6xl pb-4">Shows</h1>
      </div>

      {/* Content area with brushed metal background */}
      <div className="relative" style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cline x1='0' y1='4' x2='4' y2='0' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3Cline x1='-1' y1='1' x2='1' y2='-1' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3Cline x1='3' y1='5' x2='5' y2='3' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/svg%3E"), linear-gradient(180deg, rgba(200,169,81,0.04) 0%, transparent 40%, rgba(200,169,81,0.03) 100%)`,
        backgroundSize: '4px 4px, 100% 100%',
      }}>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {error && (
            <p className="text-center text-[var(--gnr-muted)] mb-8">{error}</p>
          )}

          {/* Upcoming */}
          <div className="mb-16">
            <h2 className="text-2xl mb-8 pb-3 border-b border-[var(--gnr-border)]">Upcoming</h2>
            {upcoming.length === 0 ? (
              <p className="text-[var(--gnr-muted)]">No upcoming shows scheduled. Check back soon!</p>
            ) : (
              <ul className="space-y-4">
                {upcoming.map((show, i) => {
                  const isNext = i === 0
                  return (
                    <li
                      key={show.id}
                      className="relative overflow-hidden flex flex-col gap-2 px-6 py-6"
                      style={isNext ? {
                        background: 'rgba(200,169,81,0.07)',
                        border: '1px solid rgba(200,169,81,0.45)',
                        boxShadow: '0 0 32px rgba(200,169,81,0.1), inset 0 0 40px rgba(200,169,81,0.04)',
                      } : {
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--gnr-border)',
                      }}
                    >
                      {/* Next show badge */}
                      {isNext && (
                        <span className="absolute top-0 right-0 font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest px-3 py-1 bg-[var(--gnr-brand)] text-[var(--gnr-bg)]">
                          Next Show
                        </span>
                      )}

                      <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">
                        {formatDate(show.event_date)}
                      </span>

                      {show.location !== 'Private Event' && (
                        <span className={`font-[family-name:var(--gnr-font-display)] uppercase tracking-wide text-[var(--gnr-text)] ${isNext ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                          {show.venue_name ?? 'Venue: TBD'}
                        </span>
                      )}

                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                          <FaMapMarkerAlt className="inline mr-1.5" style={{ color: 'var(--gnr-brand)' }} />{show.location ?? 'Location: TBD'}
                        </span>
                        {show.location !== 'Private Event' && (
                          <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                            <FaClock className="inline mr-1.5" style={{ color: 'var(--gnr-brand)' }} />{show.event_time ? formatTime(show.event_time) : 'Time: TBD'}
                            {show.event_time && show.event_end_time && ` – ${formatTime(show.event_end_time)}`}
                          </span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Past Shows */}
          <PastShows past={past} />

        </div>
      </section>
      </div>
    </div>
  )
}
