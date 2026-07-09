// Regenerates lib/icons.ts from the simple-icons package (CC0-1.0).
// Run after bumping simple-icons:  node scripts/sync-icons.mjs
import { writeFileSync } from 'node:fs'
import * as si from 'simple-icons'

const WANT = [
  ['youtube', 'siYoutube'],
  ['instagram', 'siInstagram'],
  ['appleMusic', 'siApplemusic'],
  ['spotify', 'siSpotify'],
]

const missing = WANT.filter(([, ex]) => !si[ex]).map(([key]) => key)
if (missing.length) throw new Error(`simple-icons has no mark for: ${missing.join(', ')}`)

const entries = WANT.map(([key, ex]) => {
  const ic = si[ex]
  return `  ${key}: {\n    title: '${ic.title}',\n    path: '${ic.path}',\n  },`
}).join('\n')

writeFileSync(
  new URL('../lib/icons.ts', import.meta.url),
  `// Brand mark path data, extracted from the simple-icons package (CC0-1.0).
// Regenerate: node scripts/sync-icons.mjs
//
// Inlined rather than imported so a barrel import of ~3000 icons never reaches a
// bundle, and so the marks are exact rather than hand-drawn. All are 24x24 viewBox.
// simple-icons carries no Amazon mark, so Amazon Music has no logo here.

export type BrandIcon = { title: string; path: string }

export const brandIcons = {
${entries}
} satisfies Record<string, BrandIcon>
`,
)
console.log(`wrote lib/icons.ts with ${WANT.length} marks`)
