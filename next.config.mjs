/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Album artwork is served from Apple's CDN rather than checked into the repo,
    // so a re-release with new cover art does not need a redeploy.
    remotePatterns: [
      // Album artwork, served from Apple's CDN rather than checked into the repo.
      { protocol: 'https', hostname: 'is1-ssl.mzstatic.com' },
      // Music video thumbnails for the click-to-load player facades.
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
}

export default nextConfig
