import { siteConfig } from '@/config/site'
import { getMembers } from '@/lib/soundcheck'
import type { Metadata } from 'next'
import type { BandMember } from '@/types'

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
      <section>
        <h1>About</h1>
        <p>{siteConfig.bio.full}</p>

        <div>
          {siteConfig.bio.genreTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <p>
          Based in {siteConfig.location.city}, {siteConfig.location.state}
          {siteConfig.bio.formedYear ? ` · Est. ${siteConfig.bio.formedYear}` : ''}
        </p>
      </section>

      <section>
        <h2>The Band</h2>

        {error && <p>{error}</p>}

        {members.length === 0 && !error ? (
          <p>Band members coming soon.</p>
        ) : (
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <p>{member.name}</p>
                {member.roles.length > 0 && (
                  <p>{member.roles.join(', ')}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {(siteConfig.social.instagram ||
        siteConfig.social.facebook ||
        siteConfig.social.tiktok ||
        siteConfig.social.spotify ||
        siteConfig.social.appleMusic ||
        siteConfig.social.youtube) && (
        <section>
          <h2>Follow Us</h2>
          <ul>
            {siteConfig.social.instagram && (
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {siteConfig.social.facebook && (
              <li>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            )}
            {siteConfig.social.tiktok && (
              <li>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              </li>
            )}
            {siteConfig.social.spotify && (
              <li>
                <a href={siteConfig.social.spotify} target="_blank" rel="noopener noreferrer">
                  Spotify
                </a>
              </li>
            )}
            {siteConfig.social.appleMusic && (
              <li>
                <a href={siteConfig.social.appleMusic} target="_blank" rel="noopener noreferrer">
                  Apple Music
                </a>
              </li>
            )}
            {siteConfig.social.youtube && (
              <li>
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
            )}
          </ul>
        </section>
      )}
    </>
  )
}
