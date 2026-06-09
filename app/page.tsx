import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Show } from '@/types'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
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

async function getUpcomingShows(): Promise<Show[]> {
  try {
    const shows = await getShows()
    const today = new Date().toISOString().split('T')[0]
    return shows
      .filter((s) => s.event_date && s.event_date >= today && s.status === 'confirmed')
      .slice(0, 3)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const upcomingShows = await getUpcomingShows()

  return (
    <>
      {/* Hero */}
      <section>
        <h1>{siteConfig.hero.headline}</h1>
        <p>{siteConfig.hero.tagline}</p>
        <Link href={siteConfig.hero.ctaHref}>{siteConfig.hero.ctaLabel}</Link>
      </section>

      {/* Bio teaser */}
      <section>
        <p>{siteConfig.bio.short}</p>
        <div>
          {siteConfig.bio.genreTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p>
          {siteConfig.location.city}, {siteConfig.location.state}
        </p>
        <Link href="/about">Learn More</Link>
      </section>

      {/* Upcoming shows preview */}
      <section>
        <h2>Upcoming Shows</h2>
        {upcomingShows.length === 0 ? (
          <p>No upcoming shows at this time. Check back soon!</p>
        ) : (
          <ul>
            {upcomingShows.map((show) => (
              <li key={show.id}>
                <span>{formatDate(show.event_date)}</span>
                {show.event_time && <span>{formatTime(show.event_time)}</span>}
                <span>{show.venue_name ?? 'TBA'}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/shows">See All Shows</Link>
      </section>
    </>
  )
}
