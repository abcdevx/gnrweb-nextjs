import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Show } from '@/types'

export const dynamic = 'force-dynamic'

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
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 bg-[var(--color-bg)]"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, #1f1a12 0%, #0f0e0d 70%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)', backgroundSize: '100% 4px' }}
        />
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.35em] text-[var(--color-brand)] mb-6">
          Central Illinois
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-[family-name:var(--font-display)] font-bold uppercase tracking-tight text-white mb-4">
          {siteConfig.hero.headline}
        </h1>
        <p className="font-[family-name:var(--font-display)] text-base sm:text-lg uppercase tracking-widest text-[var(--color-muted)] mb-10">
          {siteConfig.hero.tagline}
        </p>
        <Link
          href={siteConfig.hero.ctaHref}
          className="inline-block font-[family-name:var(--font-display)] uppercase tracking-widest text-sm px-8 py-3 bg-[var(--color-brand)] text-[var(--color-bg)] font-bold hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          {siteConfig.hero.ctaLabel}
        </Link>
      </section>

      {/* Bio teaser */}
      <section className="border-t border-[var(--color-border)] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl sm:text-2xl text-[var(--color-text)] mb-8 leading-relaxed">
            {siteConfig.bio.short}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {siteConfig.bio.genreTags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--font-display)] text-xs uppercase tracking-widest px-3 py-1 border border-[var(--color-brand)] text-[var(--color-brand)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--color-muted)] uppercase tracking-widest font-[family-name:var(--font-display)] mb-8">
            {siteConfig.location.city}, {siteConfig.location.state}
          </p>
          <Link
            href="/about"
            className="inline-block font-[family-name:var(--font-display)] uppercase tracking-widest text-sm px-6 py-2 border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Upcoming shows preview */}
      <section className="border-t border-[var(--color-border)] py-20 px-6 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-center mb-12">Upcoming Shows</h2>
          {upcomingShows.length === 0 ? (
            <p className="text-center text-[var(--color-muted)]">No upcoming shows at this time. Check back soon!</p>
          ) : (
            <ul className="space-y-4 mb-10">
              {upcomingShows.map((show) => (
                <li
                  key={show.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-l-2 border-[var(--color-brand)] pl-5 py-3 bg-[var(--color-surface-2)]"
                >
                  <span className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-[var(--color-brand)] min-w-[180px]">
                    {formatDate(show.event_date)}
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[var(--color-text)]">
                    {show.venue_name ?? 'TBA'}
                  </span>
                  {show.event_time && (
                    <span className="text-sm text-[var(--color-muted)] sm:ml-auto">
                      {formatTime(show.event_time)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="text-center">
            <Link
              href="/shows"
              className="inline-block font-[family-name:var(--font-display)] uppercase tracking-widest text-sm px-8 py-3 bg-[var(--color-brand)] text-[var(--color-bg)] font-bold hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              See All Shows
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
