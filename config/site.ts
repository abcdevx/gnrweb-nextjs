/**
 * site.ts — Single source of truth for all static site content.
 *
 * Dynamic content (shows, band members) is fetched live from SoundCheck via
 * the API client in lib/soundcheck.ts. Everything else lives here.
 *
 * Edit this file to update text, links, and metadata without touching pages.
 */

export const siteConfig = {
  bandName: 'Good N\' Rowdy',
  tagline: 'Your favorite cover band',
  description: 'Good N\' Rowdy is a country and southern rock band out of Central Illinois.',
  location: {
    city: 'Farmington',
    state: 'IL',
  },

  nav: {
    left: [
      { label: 'About', href: '/about' },
      { label: 'Shows', href: '/shows' },
    ],
    right: [
      { label: 'Merch', href: '/merch' },
      { label: 'Book', href: '/book' },
    ],
  },

  hero: {
    headline: 'Good N\' Rowdy Band',
    tagline: 'Hometown Country Rock Built For Any Stage',
    ctaLabel: 'See Our Shows',
    ctaHref: '/shows',
  },

  bio: {
    short: 'Country, southern rock, and outlaw grit — built for the stage.',
    full: `The Good N' Rowdy Band is an up-and-coming five-piece country rock group from Central Illinois. We play country, southern rock, barroom favorites, and original music at bars, festivals, parties, and events across the region and beyond.\n\nBig stage or small corner, we bring the same energy, preparation, and focus on the crowd in front of us.`,
    formedYear: 2025,
    genreTags: ['Country', 'Southern Rock', 'Outlaw Country', 'Live Band'],
    inspirations: ['Zach Top', 'David Allan Coe', 'Waylon Jennings', 'Chris LeDoux', 'Jake Worthington', 'Uncle Kracker', 'George Strait', 'Turnpike Troubadours', 'Eagles', 'Luke Bryan', 'Toby Keith', 'Steve Earle', 'Don Williams', 'Gavin Adcock', '49 Winchester', 'Luke Combs', 'Lynyrd Skynyrd', 'Brooks & Dunn', 'Zach Bryan', 'The Marshall Tucker Band', 'Chris Stapleton', 'The Allman Brothers Band', 'Darius Rucker', 'Hank Williams Jr.', 'Kid Rock', 'Nickelback', 'Ronnie Milsap'],
  },

  testimonials: [
    { quote: 'Hometown Country Rock Built For Any Stage', author: '' },
    { quote: 'Add your Facebook quote here', author: 'Fan Name' },
    { quote: 'Add another Facebook quote here', author: 'Fan Name' },
  ],

  notableShows: [
    { venue: 'Levee Park Amphitheatre', location: 'East Peoria, IL', date: 'Nov 8, 2025', note: '' },
    { venue: 'Cadillac Jacks', location: 'Bloomington, IL', date: 'Feb 27, 2026', note: '' },
    { venue: 'Crusens', location: 'Peoria, IL', date: 'Mar 6, 2026', note: '' },
    { venue: "Oz's Bar & Grill", location: 'Creve Coeur, IL', date: 'May 22, 2026', note: '' },
  ],

  supporters: [
    { id: 'rad-audio', name: 'Stephen Rada', role: 'Sound Support · RAD Audio', photo: '/photos/RAD AUDIO.jpg', url: '' },
  ],

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61575053549063',
    instagram: 'https://www.instagram.com/goodnrowdymusic?igsh=dTF4eWhreGVhZzJt&utm_source=qr',
    tiktok: '',
    spotify: '',
    appleMusic: '',
    youtube: '',
  },

  members: [
    { id: 'jon',     name: 'Jon Schmidgall',  nickname: 'Jonny Smoke', roles: ['Electric Guitar', 'Vocals'], founding: true,  joined: 'Early 2025', photo: '/photos/Jon.jpeg',     bio: '', photoPosition: 'top',       photoScale: 1 },
    { id: 'alex',    name: 'Alex Clark',       nickname: 'Clark',       roles: ['Acoustic Guitar', 'Keys', 'Vocals'], founding: true,  joined: 'Early 2025', photo: '/photos/Alex.jpeg',    bio: '', photoPosition: 'center 15%', photoScale: 1 },
    { id: 'chance',  name: 'Chance Whisenand', nickname: 'Whiz',        roles: ['Drums', 'Vocals'], founding: true,  joined: 'Early 2025', photo: '/photos/Whiz.jpeg',    bio: '', photoPosition: 'center',    photoScale: 1 },
    { id: 'kaiden',  name: 'Kaiden Leezer',    nickname: null,          roles: ['Electric Guitar', 'Vocals'], founding: false, joined: 'Feb 2026',   photo: '/photos/Kaiden.jpeg',  bio: '', photoPosition: 'center',    photoScale: 1 },
    { id: 'savannah',name: 'Savannah Grachek', nickname: null,          roles: ['Bass Guitar', 'Vocals'], founding: false, joined: 'June 2026',  photo: '/photos/Savannah.jpg', bio: '', photoPosition: 'center',    photoScale: 1 },
  ],

  photos: [
    '/photos/3415733108702525639.JPG',
    '/photos/647108143_122178389168835118_8580017257700400124_n.jpg',
    '/photos/657848696_122180868842835118_6128071817641088818_n.jpg',
    '/photos/695710422_122187354008835118_9191531843432103827_n.jpg',
    '/photos/706473927_122189066648835118_7835160945173983321_n.jpg',
    '/photos/708155646_122189345756835118_662015639991728358_n.jpg',
    '/photos/718336465_122190923252835118_2457406282593670564_n.jpg',
    '/photos/719506572_122190923204835118_6353239768227055854_n.jpg',
    '/photos/Cover.jpeg',
    '/photos/IMG_8183.jpeg',
    '/photos/IMG_8550.JPG',
    '/photos/IMG_8622.JPG',
  ],

  latestRelease: {
    title: '',
    subtitle: '',
    coverUrl: '',
    links: {
      spotify: '',
      appleMusic: '',
      youtube: '',
    },
  },

  emailSignup: {
    heading: 'Stay In The Loop',
    subheading: 'Get notified about new shows, releases, and news.',
    formUrl: '',
  },

  contact: {
    bookingEmail: '',
    generalEmail: '',
    phone: '',
  },

  seo: {
    title: 'Good N\' Rowdy Band',
    description: 'Good N\' Rowdy — High-energy cover band. Book us for your next event.',
    url: 'https://goodnrowdy.com',
  },
}
