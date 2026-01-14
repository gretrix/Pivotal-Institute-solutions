/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false, // Remove trailing slashes to avoid duplicates
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pivotalinstitute.solutions',
          },
        ],
        destination: 'https://pivotalinstitute.solutions/:path*',
        permanent: true,
      },
      // Calendly redirect
      {
        source: '/meeting-jt',
        destination: 'https://calendly.com/meeting-jt',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

