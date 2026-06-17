import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/config/site'
import SiteNav from '@/components/SiteNav'

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
          <p>© {new Date().getFullYear()} Good n&apos; Rowdy. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
