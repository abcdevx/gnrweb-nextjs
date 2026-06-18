import { siteConfig } from '@/config/site'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `About | ${siteConfig.bandName}`,
  description: `Learn more about ${siteConfig.bandName}.`,
}

export default function AboutPage() {
  const members = siteConfig.members

  return (
    <>
      {/* Subhero */}
      <div className="relative border-b border-[var(--gnr-border)] h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <Image src="/photos/The Band.jpg" alt="Good n' Rowdy" fill className="object-cover" style={{ objectPosition: 'center 25%' }} priority sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-black/55" />
        <h1 className="absolute bottom-4 left-0 right-0 text-center text-5xl sm:text-6xl text-white z-10">About</h1>
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

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-col border border-[var(--gnr-border)] bg-[var(--gnr-surface-2)] overflow-hidden"
                >
                  {/* Photo */}
                  <div className="relative w-full h-56 bg-[var(--gnr-surface)] flex items-center justify-center">
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} fill className="object-cover" style={{ objectPosition: member.photoPosition ?? 'center', transform: member.photoScale ? `scale(${member.photoScale})` : undefined, transformOrigin: 'center top' }} sizes="(max-width:640px) 100vw, 50vw" />
                    ) : (
                      <span className="font-[family-name:var(--gnr-font-display)] text-4xl text-[var(--gnr-brand)]">
                        {member.name.split(' ').map((w: string) => w[0]).join('')}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col gap-2 p-5 border-t border-[var(--gnr-border)]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)]">
                        {member.name}
                      </p>
                      {member.founding && (
                        <span className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[var(--gnr-brand)] text-[var(--gnr-brand)]">Founder</span>
                      )}
                    </div>
                    {member.nickname && (
                      <p className="font-[family-name:var(--gnr-font-display)] text-sm text-[var(--gnr-brand)] tracking-wide">&ldquo;{member.nickname}&rdquo;</p>
                    )}
                    <p className="text-xs text-[var(--gnr-muted)] uppercase tracking-widest font-[family-name:var(--gnr-font-display)]">{member.roles.join(' · ')}</p>
                    {member.bio && (
                      <p className="text-sm text-[var(--gnr-muted)] leading-relaxed mt-1">{member.bio}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
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
