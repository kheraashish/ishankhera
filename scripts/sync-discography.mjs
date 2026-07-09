// Regenerates lib/discography.ts from the public iTunes lookup API.
// Run when a new release goes live:  node scripts/sync-discography.mjs
import { writeFileSync } from 'node:fs'

const ARTIST_ID = 1492263679
const ENDPOINT = `https://itunes.apple.com/lookup?id=${ARTIST_ID}&entity=album&limit=200`

const res = await fetch(ENDPOINT)
if (!res.ok) throw new Error(`iTunes lookup failed: ${res.status}`)
const { results } = await res.json()

const releases = results
  .filter((r) => r.wrapperType === 'collection')
  .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
  .map((r) => ({
    title: r.collectionName.replace(/ - Single$/, '').replace(/ - EP$/, ''),
    kind: / - Single$/.test(r.collectionName) ? 'single' : / - EP$/.test(r.collectionName) ? 'ep' : 'album',
    date: r.releaseDate.slice(0, 10),
    tracks: r.trackCount,
    genre: r.primaryGenreName,
    url: r.collectionViewUrl.replace(/\?uo=4$/, ''),
    art: r.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg'),
  }))

if (!releases.length) throw new Error('iTunes returned no collections; refusing to overwrite')

const body = `// Generated from the public iTunes lookup API for artist ${ARTIST_ID}.
// Regenerate: node scripts/sync-discography.mjs

export type Kind = 'album' | 'ep' | 'single'

export type Release = {
  title: string
  kind: Kind
  date: string
  tracks: number
  genre: string
  url: string
  art: string
}

export const releases: Release[] = ${JSON.stringify(releases, null, 2).replace(/"([a-z]+)":/g, '$1:')}

export const latest = releases[0]
`

writeFileSync(new URL('../lib/discography.ts', import.meta.url), body)
console.log(`wrote lib/discography.ts with ${releases.length} releases (latest: ${releases[0].title})`)
