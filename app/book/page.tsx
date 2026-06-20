import { siteConfig } from '@/config/site'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Book | ${siteConfig.bandName}`,
  description: `Book ${siteConfig.bandName} for your next event.`,
}

export default function BookPage() {
  const { bookingEmail, phone } = siteConfig.contact

  return (
    <>
      {/* Subhero */}
      <div className="relative border-b border-[var(--gnr-border)] h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <Image src="/photos/The Band.jpg" alt="Good n' Rowdy" fill className="object-cover" style={{ objectPosition: 'center 25%' }} priority sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-black/55" />
        <h1 className="absolute bottom-4 left-0 right-0 text-center text-5xl sm:text-6xl text-white z-10">Book The Band</h1>
      </div>

      {/* Booking content */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-10">

          <div className="text-center flex flex-col gap-3">
            <p className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-brand)]">
              Bars · Festivals · Private Events · Corporate
            </p>
            <h2 className="text-3xl sm:text-4xl">Ready to Get Rowdy?</h2>
            <p className="text-[var(--gnr-muted)] leading-relaxed">
              We play bars, festivals, weddings, private parties, and corporate events across Central Illinois and beyond. Reach out and let&apos;s make it happen.
            </p>
          </div>

          {/* Contact options */}
          <div className="flex flex-col gap-4">
            {bookingEmail && (
              <a
                href={`mailto:${bookingEmail}`}
                className="flex items-center gap-4 px-6 py-5 border border-[var(--gnr-border)] bg-[var(--gnr-surface)] hover:border-[var(--gnr-brand)] transition-colors group"
              >
                <span className="font-[family-name:var(--gnr-font-display)] text-2xl text-[var(--gnr-brand)]">✉</span>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">Email Us</span>
                  <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)] group-hover:text-[var(--gnr-brand)] transition-colors">{bookingEmail}</span>
                </div>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 px-6 py-5 border border-[var(--gnr-border)] bg-[var(--gnr-surface)] hover:border-[var(--gnr-brand)] transition-colors group"
              >
                <span className="font-[family-name:var(--gnr-font-display)] text-2xl text-[var(--gnr-brand)]">☎</span>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">Call Us</span>
                  <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)] group-hover:text-[var(--gnr-brand)] transition-colors">{phone}</span>
                </div>
              </a>
            )}
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-5 border border-[var(--gnr-border)] bg-[var(--gnr-surface)] hover:border-[var(--gnr-brand)] transition-colors group"
              >
                <span className="font-[family-name:var(--gnr-font-display)] text-2xl text-[var(--gnr-brand)]">f</span>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--gnr-font-display)] text-xs uppercase tracking-widest text-[var(--gnr-muted)]">Message Us on Facebook</span>
                  <span className="font-[family-name:var(--gnr-font-display)] text-sm uppercase tracking-wide text-[var(--gnr-text)] group-hover:text-[var(--gnr-brand)] transition-colors">Good N&apos; Rowdy Band</span>
                </div>
              </a>
            )}
          </div>

          {!bookingEmail && !phone && (
            <p className="text-center text-[var(--gnr-muted)]">
              Booking contact coming soon — in the meantime, reach out via Facebook or Instagram.
            </p>
          )}

        </div>
      </section>
    </>
  )
}
