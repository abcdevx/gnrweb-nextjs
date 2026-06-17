import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--gnr-bg)] border-b border-[var(--gnr-border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--gnr-font-display)] font-bold text-lg uppercase tracking-widest text-[var(--gnr-brand)] hover:text-[var(--gnr-brand-dark)] transition-colors"
        >
          {siteConfig.bandName}
        </Link>
        <ul className="flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest text-[var(--gnr-text)] hover:text-[var(--gnr-brand)] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
