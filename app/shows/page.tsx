import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Metadata } from 'next'
import type { Show } from '@/types'
import Image from 'next/image'
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

const FIXED_HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '06-19': 'Juneteenth',
  '07-04': 'Independence Day',
  '11-11': "Veterans Day",
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

function splitShows(shows: Show[]): { upcoming: Show[]; past: Show[] } {
  const today = new Date().toISOString().split('T')[0]
  return {
    upcoming: shows.filter((s) => s.event_date && s.event_date >= today).sort((a, b) => (a.event_date ?? '').localeCompare(b.event_date ?? '')),
    past: shows.filter((s) => s.event_date && s.event_date < today || s.status === 'completed').sort((a, b) => (b.event_date ?? '').localeCompare(a.event_date ?? '')),
  }
}

const SAMPLE_SHOWS: Show[] = [
  { id: 's1', venue_name: 'The Brown Jug',        location: 'Peoria, IL',        event_date: '2026-07-12', event_time: '21:00:00', event_end_time: null,       status: 'confirmed', notes: null,                 event_title: 'The Brown Jug' },
  { id: 's2', venue_name: 'Corner Inn',            location: 'Hanna City, IL',    event_date: '2026-07-19', event_time: '20:00:00', event_end_time: '23:00:00', status: 'confirmed', notes: 'All ages welcome',    event_title: 'Corner Inn' },
  { id: 's3', venue_name: 'Kickapoo Creek Saloon', location: 'Edwards, IL',       event_date: '2026-08-02', event_time: '20:30:00', event_end_time: null,       status: 'confirmed', notes: null,                 event_title: 'Summer Bash' },
  { id: 's4', venue_name: 'Crusens',               location: 'Peoria, IL',        event_date: '2026-08-16', event_time: '21:00:00', event_end_time: null,       status: 'confirmed', notes: 'Outdoor stage',      event_title: 'Crusens' },
  { id: 's5', venue_name: 'The Nickel Plate',      location: 'Farmington, IL',    event_date: '2026-06-14', event_time: '20:00:00', event_end_time: null,       status: 'completed', notes: null,                 event_title: 'The Nickel Plate' },
  { id: 's6', venue_name: "Oz's Bar & Grill",      location: 'Creve Coeur, IL',   event_date: '2026-05-22', event_time: '21:00:00', event_end_time: null,       status: 'completed', notes: null,                 event_title: "Oz's Bar & Grill" },
  { id: 's7', venue_name: 'Burnzee\'s Bar & Grill',location: 'Peoria, IL',        event_date: '2026-05-08', event_time: '20:00:00', event_end_time: null,       status: 'completed', notes: null,                 event_title: 'Burnzee\'s Bar & Grill' },
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
      <div className="relative border-b border-[var(--gnr-border)] h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <Image src="/photos/The Band.jpg" alt="Good n' Rowdy" fill className="object-cover" style={{ objectPosition: 'center 25%' }} priority sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-black/55" />
        <h1 className="absolute bottom-4 left-0 right-0 text-center text-5xl sm:text-6xl text-white z-10">Shows</h1>
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
              <ul className="space-y-3">
                {upcoming.map((show, i) => {
                  const isNext = i === 0
                  const holiday = getHoliday(show.event_date)
                  const isPrivate = show.location === 'Private Event'
                  return (
                    <li
                      key={show.id}
                      className="relative overflow-hidden flex gap-0"
                      style={isNext ? {
                        background: 'rgba(200,169,81,0.06)',
                        border: '1px solid rgba(200,169,81,0.35)',
                        boxShadow: '0 0 28px rgba(200,169,81,0.08)',
                      } : {
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--gnr-border)',
                      }}
                    >
                      {/* Left gold accent bar */}
                      <div
                        className="shrink-0 w-1"
                        style={{ background: isNext ? 'var(--gnr-brand)' : 'var(--gnr-border)' }}
                      />

                      <div className="flex flex-col gap-3 px-5 py-5 w-full min-w-0">

                        {/* Row 1: date · time + Next Show badge */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">
                            {formatDate(show.event_date)}
                            {!isPrivate && show.event_time && (
                              <span className="text-[var(--gnr-muted)] mx-2">·</span>
                            )}
                            {!isPrivate && show.event_time && (
                              <span className="text-[var(--gnr-muted)]">
                                {formatTime(show.event_time)}
                                {show.event_end_time && ` – ${formatTime(show.event_end_time)}`}
                              </span>
                            )}
                          </span>
                          {isNext && (
                            <span className="shrink-0 font-[family-name:var(--gnr-font-display)] text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[var(--gnr-brand)] text-[var(--gnr-bg)]">
                              Next Show
                            </span>
                          )}
                        </div>

                        {/* Row 2: venue + event title */}
                        <div className="flex flex-col gap-0.5">
                          <span className={`font-[family-name:var(--gnr-font-display)] uppercase tracking-wide text-[var(--gnr-text)] leading-tight ${isNext ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                            {isPrivate ? 'Private Event' : (show.venue_name ?? 'Venue: TBD')}
                          </span>
                          {!isPrivate && show.event_title && (
                            <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                              {show.event_title}
                            </span>
                          )}
                        </div>

                        {/* Row 3: location left, holiday right */}
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                            <FaMapMarkerAlt className="inline mr-1.5" style={{ color: 'var(--gnr-brand)' }} />
                            {show.location ?? 'Location: TBD'}
                          </span>
                          {holiday && (
                            <span className="font-[family-name:var(--gnr-font-display)] text-[9px] uppercase tracking-widest text-[var(--gnr-brand)]">
                              🎉 {holiday}
                            </span>
                          )}
                        </div>

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
