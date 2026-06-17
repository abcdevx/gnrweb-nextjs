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
      <body className="flex flex-col min-h-screen">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} Good n&apos; Rowdy. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
