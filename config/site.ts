/**
 * site.ts — Single source of truth for all static site content.
 *
 * Dynamic content (shows, band members) is fetched live from SoundCheck via
 * the API client in lib/soundcheck.ts. Everything else lives here.
 *
 * Edit this file to update text, links, and metadata without touching pages.
 */

export const siteConfig = {
  bandName: 'Good n\' Rowdy',
  tagline: 'Your favorite cover band',
  description: 'Good n\' Rowdy is a high-energy cover band based out of [City, State].',
  location: {
    city: 'Nashville',
    state: 'TN',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Shows', href: '/shows' },
    { label: 'About', href: '/about' },
  ],

  hero: {
    headline: 'Good n\' Rowdy',
    tagline: 'Your favorite cover band',
    ctaLabel: 'See Our Shows',
    ctaHref: '/shows',
  },

  bio: {
    short: 'We play the songs you love — louder than you remember.',
    full: `Good n' Rowdy is a high-energy cover band bringing the best of country, rock, and everything in between to stages across the region. Known for their tight setlists and infectious energy, they keep the dance floor full all night long.`,
    formedYear: 2018,
    genreTags: ['Country', 'Rock', 'Country Rock', 'Cover Band'],
  },

  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    spotify: '',
    appleMusic: '',
    youtube: '',
  },

  contact: {
    bookingEmail: '',
    generalEmail: '',
    phone: '',
  },

  seo: {
    title: 'Good n\' Rowdy | Cover Band',
    description: 'Good n\' Rowdy — High-energy cover band. Book us for your next event.',
    url: 'https://goodnrowdy.com',
  },
}
