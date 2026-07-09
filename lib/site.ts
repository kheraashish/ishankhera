export const site = {
  name: 'Ishan Khera',
  role: 'Composer and songwriter',
  url: 'https://ishankhera.com',
  description:
    'Ishan Khera composes original music for films, movies, documentaries and songwriting, alongside opera works, orchestral arrangements and rock records.',
}

export const youtube = {
  channelId: 'UCLcHmTycvxk8iWkU_6B_peA',
  handle: '@IshanKhera',
  url: 'https://www.youtube.com/@IshanKhera',
}

export const links = [
  { label: 'YouTube', href: youtube.url },
  { label: 'Apple Music', href: 'https://music.apple.com/artist/ishan-khera/1492263679' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/7dLa33EIeKZV3DCSeFxuPr' },
  { label: 'Instagram', href: 'https://www.instagram.com/ishankhera_music/' },
  { label: 'Amazon Music', href: 'https://music.amazon.com/artists/B07YNPP91R/ishan-khera' },
]

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Discography', href: '/discography' },
  { label: 'Contact', href: '/contact' },
]

/** Preserved from the previous site, with the Mozart clause rewritten so it no longer reads as a collaboration. */
export const bio = [
  'Ishan Khera, born July 4th, had written more than 500 musical works by the age of 25, with Wolfgang Amadeus Mozart as the primary influence.',
  'Early in his career he worked as a musician for several bands, playing guitar.',
]

export const publishedWorks = [
  'Original opera works',
  'Modern arrangements of classical music, for orchestra, piano and opera',
  'Original instrumental music, including orchestral works and guitar with orchestra',
  'Piano solo pieces',
  'Country and rock songwriting',
]

/** Checkbox options preserved verbatim from the previous contact form. */
export const projectTypes = [
  'Movie',
  'Web-Series',
  'Short Film',
  'Documentary',
  'Songwriting',
  'Game',
  'Advertisement',
  'Other',
]

/** Genre buckets keyed to the primaryGenreName values Apple actually returns. */
export const styleGroups: { title: string; blurb: string; genres: string[] }[] = [
  {
    title: 'Classical and arrangements',
    blurb: 'Original classical writing alongside modern arrangements of the standard repertoire.',
    genres: ['Classical', 'Classical Crossover'],
  },
  {
    title: 'Instrumental and orchestral',
    blurb: 'Score-adjacent instrumental music, written to carry a scene without a vocal.',
    genres: ['New Age', 'Easy Listening'],
  },
  {
    title: 'Rock',
    blurb: 'Guitar-led records, written and performed.',
    genres: ['Rock & Roll', 'Rock'],
  },
  {
    title: 'Country',
    blurb: 'Songwriting with a country lean.',
    genres: ['Country'],
  },
]
