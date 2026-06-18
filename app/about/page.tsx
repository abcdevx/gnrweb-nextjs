import { siteConfig } from '@/config/site'
import Image from 'next/image'
import type { Metadata } from 'next'
import DriftingPills from '@/components/DriftingPills'


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
      <section className="border-b border-[var(--gnr-border)]">
        {/* Pull quote */}
        <div className="py-6 px-6 border-b border-[var(--gnr-border)] bg-[var(--gnr-surface)] text-center">
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-[family-name:var(--gnr-font-display)] text-[var(--gnr-brand)] leading-snug">
            {siteConfig.hero.tagline}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 border-b border-[var(--gnr-border)]">
          {[
            { value: siteConfig.bio.formedYear?.toString() ?? '', label: 'Est.' },
            { value: '40+', label: 'Live Shows' },
            { value: '15+', label: 'Cities' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-8 px-4 border-r border-[var(--gnr-border)] last:border-r-0">
              <span className="font-[family-name:var(--gnr-font-display)] text-3xl sm:text-4xl text-[var(--gnr-brand)]">{stat.value}</span>
              <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)] mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Body copy + drifting pills */}
        <DriftingPills artists={siteConfig.bio.inspirations ?? []}>
          <div className="max-w-xl w-full bg-[var(--gnr-bg)] border border-[var(--gnr-border)] px-8 py-8" style={{ boxShadow: '0 0 60px 20px var(--gnr-bg)' }}>
            <p className="text-xl sm:text-2xl font-[family-name:var(--gnr-font-display)] text-[var(--gnr-text)] leading-relaxed border-l-4 border-[var(--gnr-brand)] pl-5">
              {siteConfig.bio.full.split('\n\n')[0]}
            </p>
          </div>
        </DriftingPills>
      </section>

      {/* Notable shows */}
      {siteConfig.notableShows.length > 0 && (
        <section className="py-10 px-6 border-b border-[var(--gnr-border)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl mb-6">Notable Shows</h2>
            <ul className="space-y-2">
              {siteConfig.notableShows.map((show, i) => (
                <li
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 py-3 rounded-sm"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)] shrink-0">{show.date}</span>
                  <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)]">{show.venue}</span>
                  <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)] sm:ml-auto">{show.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
                      {member.founding
                      ? <span className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[var(--gnr-brand)] text-[var(--gnr-brand)]">Founder</span>
                      : member.joined && <span className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[var(--gnr-muted)] text-[var(--gnr-muted)]">Joined {member.joined}</span>
                    }
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

      {/* Supported by */}
      {siteConfig.supporters.length > 0 && (
        <section className="py-16 px-6 border-b border-[var(--gnr-border)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl mb-10">Supported By</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {siteConfig.supporters.map((s) => (
                <li key={s.id} className="flex flex-col border border-[var(--gnr-border)] bg-[var(--gnr-surface-2)] overflow-hidden">
                  {/* Photo / logo placeholder */}
                  <div className="relative w-full h-40 bg-black flex items-center justify-center">
                    {s.photo ? (
                      <Image src={s.photo} alt={s.name} fill className="object-contain" sizes="(max-width:640px) 100vw, 50vw" />
                    ) : (
                      <span className="font-[family-name:var(--gnr-font-display)] text-4xl text-[var(--gnr-brand)]">
                        {s.name.split(' ').map((w: string) => w[0]).join('')}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col gap-1 p-5 border-t border-[var(--gnr-border)]">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)] hover:text-[var(--gnr-brand)] transition-colors">
                        {s.name}
                      </a>
                    ) : (
                      <p className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)]">{s.name}</p>
                    )}
                    <p className="text-xs text-[var(--gnr-muted)] uppercase tracking-widest font-[family-name:var(--gnr-font-display)]">{s.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

    </>
  )
}
