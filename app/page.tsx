import Link from 'next/link'
import Image from 'next/image'
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
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ backgroundColor: 'rgb(4,2,0)' }}>

        {/* Background video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src="/montage.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)', backgroundSize: '100% 4px' }} />

        {/* Hero content */}
        <div className="relative flex flex-col items-center gap-4">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-[family-name:var(--gnr-font-display)] font-bold uppercase tracking-tight text-white leading-none animate-[fadeUp_0.9s_ease-out_0.4s_both]">
            {siteConfig.hero.headline}
          </h1>
          <p className="font-[family-name:var(--gnr-font-display)] text-sm sm:text-base uppercase tracking-[0.3em] text-[var(--gnr-muted)] animate-[fadeUp_0.9s_ease-out_0.7s_both]">
            {siteConfig.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 animate-[fadeUp_0.9s_ease-out_1.1s_both]">
            <Link
              href={siteConfig.hero.ctaHref}
              className="btn-gold inline-block font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-sm px-10 py-3 hover:opacity-90 transition-opacity"
            >
              {siteConfig.hero.ctaLabel}
            </Link>
            <Link
              href="/book"
              className="inline-block font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-sm px-10 py-3 border border-[var(--gnr-brand)] text-[var(--gnr-brand)] hover:bg-[var(--gnr-brand)] hover:text-black transition-colors"
            >
              Book The Band
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-6 mt-4 animate-[fadeIn_1s_ease-out_1.4s_both]">
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest">IG</a>
            )}
            {siteConfig.social.facebook && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest">FB</a>
            )}
            {siteConfig.social.tiktok && (
              <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest">TT</a>
            )}
            {siteConfig.social.spotify && (
              <a href={siteConfig.social.spotify} target="_blank" rel="noopener noreferrer" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest">Spotify</a>
            )}
          </div>
        </div>


      </section>

      {/* Bio teaser */}
      <section className="border-t border-[var(--gnr-border)] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl sm:text-2xl text-[var(--gnr-text)] mb-8 leading-relaxed">
            {siteConfig.bio.short}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {siteConfig.bio.genreTags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest px-3 py-1 border border-[var(--gnr-brand)] text-[var(--gnr-brand)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--gnr-muted)] uppercase tracking-widest font-[family-name:var(--gnr-font-display)] mb-8">
            {siteConfig.location.city}, {siteConfig.location.state}
          </p>
          <Link
            href="/about"
            className="inline-block font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-sm px-6 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Upcoming shows preview */}
      <section className="border-t border-[var(--gnr-border)] py-20 px-6 bg-[var(--gnr-surface)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-center mb-12">Upcoming Shows</h2>
          {upcomingShows.length === 0 ? (
            <p className="text-center text-[var(--gnr-muted)]">No upcoming shows at this time. Check back soon!</p>
          ) : (
            <ul className="space-y-4 mb-10">
              {upcomingShows.map((show) => (
                <li
                  key={show.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-l-2 border-[var(--gnr-brand)] pl-5 py-3 bg-[var(--gnr-surface-2)]"
                >
                  <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wider text-[var(--gnr-brand)] min-w-[180px]">
                    {formatDate(show.event_date)}
                  </span>
                  <span className="font-[family-name:var(--gnr-font-body)] text-[var(--gnr-text)]">
                    {show.venue_name ?? 'TBA'}
                  </span>
                  {show.event_time && (
                    <span className="text-sm text-[var(--gnr-muted)] sm:ml-auto">
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
              className="btn-gold inline-block font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-sm px-8 py-3 hover:opacity-90 transition-opacity"
            >
              See All Shows
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
