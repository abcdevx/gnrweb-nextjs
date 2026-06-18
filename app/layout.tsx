import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/config/site'
import SiteNav from '@/components/SiteNav'
import { FaFacebook, FaInstagram, FaTiktok, FaSpotify, FaYoutube } from 'react-icons/fa'

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--gnr-border)] py-8 text-center text-sm text-[var(--gnr-muted)]">
          <div className="flex justify-center gap-5 mb-4">
            {siteConfig.social.facebook && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors"><FaFacebook size={22} /></a>
            )}
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors"><FaInstagram size={22} /></a>
            )}
            {siteConfig.social.tiktok && (
              <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors"><FaTiktok size={22} /></a>
            )}
            {siteConfig.social.spotify && (
              <a href={siteConfig.social.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors"><FaSpotify size={22} /></a>
            )}
            {siteConfig.social.youtube && (
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[var(--gnr-muted)] hover:text-[var(--gnr-brand)] transition-colors"><FaYoutube size={22} /></a>
            )}
          </div>
          <p>© {new Date().getFullYear()} Good n&apos; Rowdy. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
