/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'mrfelipelima.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com'
      }
    ]
  },
}

module.exports = nextConfig
