import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { getShows } from '@/lib/soundcheck'
import type { Show } from '@/types'
import RotatingText from '@/components/RotatingText'
import PhotoCollage from '@/components/PhotoCollage'
import { FaMapMarkerAlt } from 'react-icons/fa'

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
  const upcomingShows = process.env.NODE_ENV === 'development'
    ? [
        { id: 'mock-1', event_date: '2025-08-02', venue_name: 'The Rusty Spur Saloon', event_time: '20:00:00', event_end_time: null, status: 'confirmed' as const, notes: null, location: 'Peoria, IL', event_title: 'The Rusty Spur Saloon' },
        { id: 'mock-2', event_date: '2025-08-09', venue_name: 'Nickel Plate Bar & Grill', event_time: '21:00:00', event_end_time: null, status: 'confirmed' as const, notes: null, location: 'Hanna City, IL', event_title: 'Nickel Plate Bar & Grill' },
        { id: 'mock-3', event_date: '2025-08-16', venue_name: 'Yates City Harvest Home Festival', event_time: '18:00:00', event_end_time: null, status: 'confirmed' as const, notes: null, location: 'Yates City, IL', event_title: 'Harvest Home Festival' },
      ]
    : await getUpcomingShows()

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

        </div>


      </section>

      {/* Upcoming shows preview */}
      <section className="border-t border-[var(--gnr-border)] pt-10 pb-20 px-6 bg-[var(--gnr-surface)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center gap-3">
            <h2 className="text-4xl sm:text-5xl">Get Ready to Get Rowdy</h2>
            <RotatingText />
          </div>
          {upcomingShows.length === 0 ? (
            <p className="text-center text-[var(--gnr-muted)]">No upcoming shows at this time. Check back soon!</p>
          ) : (
            <>
              <ul className="space-y-3">
                {upcomingShows.map((show, i) => {
                  const isFirst = i === 0
                  const isPrivate = show.location === 'Private Event'
                  return (
                    <li
                      key={show.id}
                      className="relative overflow-hidden flex gap-0"
                      style={isFirst ? {
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
                        style={{ background: isFirst ? 'var(--gnr-brand)' : 'var(--gnr-border)' }}
                      />

                      <div className="flex flex-col gap-3 px-5 py-5 w-full min-w-0">

                        {/* Row 1: date · time */}
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">
                            {formatDate(show.event_date)}
                            {!isPrivate && show.event_time && (
                              <span className="text-[var(--gnr-muted)] mx-2">·</span>
                            )}
                            {!isPrivate && show.event_time && (
                              <span className="text-[var(--gnr-muted)]">{formatTime(show.event_time)}</span>
                            )}
                          </span>
                          {isFirst && (
                            <span className="shrink-0 font-[family-name:var(--gnr-font-display)] text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[var(--gnr-brand)] text-[var(--gnr-bg)]">
                              Next Show
                            </span>
                          )}
                        </div>

                        {/* Row 2: venue + event title */}
                        <div className="flex flex-col gap-0.5">
                          <p className="font-[family-name:var(--gnr-font-display)] text-xl sm:text-2xl uppercase tracking-wide text-[var(--gnr-text)] leading-tight">
                            {isPrivate ? 'Private Event' : (show.venue_name ?? 'TBA')}
                          </p>
                          {!isPrivate && show.event_title && (
                            <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                              {show.event_title}
                            </span>
                          )}
                        </div>

                        {/* Row 3: location */}
                        {show.location && (
                          <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                            <FaMapMarkerAlt className="inline mr-1.5" style={{ color: 'var(--gnr-brand)' }} />
                            {show.location}
                          </span>
                        )}

                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="text-center mt-10">
                <Link
                  href="/shows"
                  className="btn-gold inline-block font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-sm px-8 py-3 hover:opacity-90 transition-opacity"
                >
                  See All Shows
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Photo collage */}
      <PhotoCollage photos={siteConfig.photos} />

      {/* Latest release */}
      {siteConfig.latestRelease.title && (
        <section className="border-t border-[var(--gnr-border)] py-20 px-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10">
            {siteConfig.latestRelease.coverUrl && (
              <div className="flex-shrink-0">
                <Image
                  src={siteConfig.latestRelease.coverUrl}
                  alt={siteConfig.latestRelease.title}
                  width={200}
                  height={200}
                  className="w-[180px] h-[180px] object-cover border border-[var(--gnr-border)]"
                />
              </div>
            )}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <p className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">
                Latest Release
              </p>
              <h2 className="text-3xl sm:text-4xl">{siteConfig.latestRelease.title}</h2>
              {siteConfig.latestRelease.subtitle && (
                <p className="text-[var(--gnr-muted)]">{siteConfig.latestRelease.subtitle}</p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                {siteConfig.latestRelease.links.spotify && (
                  <a
                    href={siteConfig.latestRelease.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-xs px-5 py-2 hover:opacity-90 transition-opacity"
                  >
                    Spotify
                  </a>
                )}
                {siteConfig.latestRelease.links.appleMusic && (
                  <a
                    href={siteConfig.latestRelease.links.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-xs px-5 py-2 border border-[var(--gnr-brand)] text-[var(--gnr-brand)] hover:bg-[var(--gnr-brand)] hover:text-black transition-colors"
                  >
                    Apple Music
                  </a>
                )}
                {siteConfig.latestRelease.links.youtube && (
                  <a
                    href={siteConfig.latestRelease.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-xs px-5 py-2 border border-[var(--gnr-brand)] text-[var(--gnr-brand)] hover:bg-[var(--gnr-brand)] hover:text-black transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Email signup */}
      {siteConfig.emailSignup.formUrl && (
        <section className="border-t border-[var(--gnr-border)] py-20 px-6 bg-[var(--gnr-surface)]">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl mb-4">{siteConfig.emailSignup.heading}</h2>
            <p className="text-[var(--gnr-muted)] mb-8">{siteConfig.emailSignup.subheading}</p>
            <a
              href={siteConfig.emailSignup.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-sm px-10 py-3 hover:opacity-90 transition-opacity"
            >
              Join the List
            </a>
          </div>
        </section>
      )}
    </>
  )
}
