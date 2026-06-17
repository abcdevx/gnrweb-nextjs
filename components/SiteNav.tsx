'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

const allLinks = [...siteConfig.nav.left, ...siteConfig.nav.right]

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[var(--gnr-bg)] border-b border-[var(--gnr-border)]">

      {/* Desktop layout */}
      <div className="hidden md:flex max-w-6xl mx-auto px-8 py-3 items-center justify-between">
        <ul className="flex items-start gap-10 flex-1 justify-end pr-10 pt-2">
          {siteConfig.nav.left.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest text-[var(--gnr-text)] hover:text-[var(--gnr-brand)] transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="flex-shrink-0 relative -mt-5 -mb-4">
          <Image src="/logo.png" alt={siteConfig.bandName} width={380} height={380} className="w-[160px] h-[160px] object-contain" priority />
        </Link>

        <ul className="flex items-start gap-10 flex-1 justify-start pl-10 pt-2">
          {siteConfig.nav.right.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest text-[var(--gnr-text)] hover:text-[var(--gnr-brand)] transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-center justify-between px-5 py-3 relative h-24">
        {/* Spacer to balance hamburger */}
        <div className="w-10" />
        <Link href="/" onClick={() => setOpen(false)} className="absolute left-1/2 -translate-x-1/2">
          <Image src="/logo.png" alt={siteConfig.bandName} width={200} height={200} className="w-[80px] h-[80px] object-contain" priority />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-[5px] p-2 ml-auto"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-[var(--gnr-text)] transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-[var(--gnr-text)] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-[var(--gnr-text)] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[var(--gnr-border)] bg-[var(--gnr-bg)]">
          <ul className="flex flex-col py-4">
            {allLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-center px-8 py-4 font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-widest text-[var(--gnr-text)] hover:text-[var(--gnr-brand)] hover:bg-[var(--gnr-surface)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </nav>
  )
}
