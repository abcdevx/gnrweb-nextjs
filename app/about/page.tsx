import { siteConfig } from '@/config/site'
import { getMembers } from '@/lib/soundcheck'
import type { Metadata } from 'next'
import type { BandMember } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `About | ${siteConfig.bandName}`,
  description: `Learn more about ${siteConfig.bandName}.`,
}

export default async function AboutPage() {
  let members: BandMember[] = []
  let error: string | null = null

  try {
    members = await getMembers()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load members'
  }

  return (
    <>
      {/* Page header */}
      <div className="border-b border-[var(--gnr-border)] py-16 px-6 text-center bg-[var(--gnr-surface)]">
        <h1 className="text-5xl sm:text-6xl">About</h1>
      </div>

      {/* Bio */}
      <section className="py-16 px-6 border-b border-[var(--gnr-border)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-[var(--gnr-text)] leading-relaxed mb-8">
            {siteConfig.bio.full}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {siteConfig.bio.genreTags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest px-3 py-1 border border-[var(--gnr-brand)] text-[var(--gnr-brand)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--gnr-muted)] uppercase tracking-widest font-[family-name:var(--gnr-font-display)]">
            Based in {siteConfig.location.city}, {siteConfig.location.state}
            {siteConfig.bio.formedYear ? ` · Est. ${siteConfig.bio.formedYear}` : ''}
          </p>
        </div>
      </section>

      {/* Band members */}
      <section className="py-16 px-6 border-b border-[var(--gnr-border)] bg-[var(--gnr-surface)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl mb-10">The Band</h2>

          {error && (
            <p className="text-[var(--gnr-muted)] mb-6">{error}</p>
          )}

          {members.length === 0 && !error ? (
            <p className="text-[var(--gnr-muted)]">Band members coming soon.</p>
          ) : (
            <ul className="space-y-4">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="border-l-2 border-[var(--gnr-brand)] pl-5 py-3 bg-[var(--gnr-surface-2)]"
                >
                  <p className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)]">
                    {member.name}
                  </p>
                  {member.roles.length > 0 && (
                    <p className="text-sm text-[var(--gnr-muted)]">{member.roles.join(', ')}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Social links */}
      {(siteConfig.social.instagram ||
        siteConfig.social.facebook ||
        siteConfig.social.tiktok ||
        siteConfig.social.spotify ||
        siteConfig.social.appleMusic ||
        siteConfig.social.youtube) && (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl mb-10">Follow Us</h2>
            <ul className="flex flex-wrap gap-4">
              {siteConfig.social.instagram && (
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest px-5 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {siteConfig.social.facebook && (
                <li>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest px-5 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {siteConfig.social.tiktok && (
                <li>
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest px-5 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
                  >
                    TikTok
                  </a>
                </li>
              )}
              {siteConfig.social.spotify && (
                <li>
                  <a
                    href={siteConfig.social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest px-5 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
                  >
                    Spotify
                  </a>
                </li>
              )}
              {siteConfig.social.appleMusic && (
                <li>
                  <a
                    href={siteConfig.social.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest px-5 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
                  >
                    Apple Music
                  </a>
                </li>
              )}
              {siteConfig.social.youtube && (
                <li>
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest px-5 py-2 border border-[var(--gnr-border)] text-[var(--gnr-text)] hover:border-[var(--gnr-brand)] hover:text-[var(--gnr-brand)] transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              )}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
