/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false, // Remove trailing slashes to avoid duplicates
  async redirects() {
    return [
      {
        source: '/meeting-jt',
        destination: 'https://calendly.com/meeting-jt',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

