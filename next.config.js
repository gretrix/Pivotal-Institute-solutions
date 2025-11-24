/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

