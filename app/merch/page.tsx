import { siteConfig } from '@/config/site'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Merch | ${siteConfig.bandName}`,
  description: `Official merchandise for ${siteConfig.bandName}.`,
}

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61575053549063'

export default function MerchPage() {
  return (
    <>
      {/* Subhero */}
      <div className="relative border-b border-[var(--gnr-border)] h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <Image src="/photos/The Band.jpg" alt="Good n' Rowdy" fill className="object-cover" style={{ objectPosition: 'center 25%' }} priority sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-black/55" />
        <h1 className="absolute bottom-4 left-0 right-0 text-center text-5xl sm:text-6xl text-white z-10">Merch</h1>
      </div>

      {/* Pre-order notice */}
      <div className="border-b border-[var(--gnr-border)] bg-[var(--gnr-surface)] py-4 px-6 text-center">
        <p className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">
          All items are pre-order · prepay only — message us on Facebook to order
        </p>
      </div>

      {/* Product grid */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Hat */}
            <li className="flex flex-col border border-[var(--gnr-border)] bg-[var(--gnr-surface)] overflow-hidden">
              <div className="relative w-full h-64 bg-black">
                <Image src="/merch/Hat.jpg" alt="Good n' Rowdy Hat" fill className="object-contain" sizes="(max-width:640px) 100vw, 50vw" />
              </div>
              <div className="flex flex-col gap-3 p-5 border-t border-[var(--gnr-border)]">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)]">
                    Snapback Hat
                  </p>
                  <span className="font-[family-name:var(--gnr-font-display)] text-lg text-[var(--gnr-brand)]">$35</span>
                </div>
                <p className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest text-[var(--gnr-muted)]">
                  Pre-order · Prepay Only
                </p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-center font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-xs px-5 py-2.5 hover:opacity-90 transition-opacity mt-1"
                >
                  Message Us to Order
                </a>
              </div>
            </li>

            {/* T-Shirt */}
            <li className="flex flex-col border border-[var(--gnr-border)] bg-[var(--gnr-surface)] overflow-hidden">
              <div className="relative w-full h-64 bg-black">
                <Image src="/merch/T-shirt.png" alt="Good n' Rowdy T-Shirt" fill className="object-contain" sizes="(max-width:640px) 100vw, 50vw" />
              </div>
              <div className="flex flex-col gap-3 p-5 border-t border-[var(--gnr-border)]">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)]">
                    T-Shirt
                  </p>
                  <span className="font-[family-name:var(--gnr-font-display)] text-lg text-[var(--gnr-brand)]">$29</span>
                </div>
                <p className="font-[family-name:var(--gnr-font-display)] text-[10px] uppercase tracking-widest text-[var(--gnr-muted)]">
                  S – XXL · Mens, Womens, Youth · Pre-order · Prepay Only
                </p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-center font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-xs px-5 py-2.5 hover:opacity-90 transition-opacity mt-1"
                >
                  Message Us to Order
                </a>
              </div>
            </li>

          </ul>

          {/* At shows */}
          <div className="mt-12 border border-[var(--gnr-border)] bg-[var(--gnr-surface)] px-6 py-6 flex flex-col gap-2">
            <p className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">Available at Shows</p>
            <p className="font-[family-name:var(--gnr-font-display)] text-lg uppercase tracking-wide text-[var(--gnr-text)]">Koozies &amp; Stickers</p>
            <p className="text-sm text-[var(--gnr-muted)]">Grab these at the merch table next time you catch us live.</p>
          </div>

          {/* More coming */}
          <div className="mt-4 border border-dashed border-[var(--gnr-border)] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">Stay Tuned</p>
              <p className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)]">More Official Gear On The Way</p>
            </div>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-[family-name:var(--gnr-font-display)] uppercase tracking-widest text-xs px-5 py-2.5 border border-[var(--gnr-brand)] text-[var(--gnr-brand)] hover:bg-[var(--gnr-brand)] hover:text-black transition-colors text-center"
            >
              Follow for Updates
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
