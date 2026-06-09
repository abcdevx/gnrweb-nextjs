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
      <body>
        <SiteNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
