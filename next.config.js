/** @type {import('next').NextConfig} */
const nextConfig = {  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback,          
    // fixes proxy-agent dependencies
    net: false,
    dns: false,
    tls: false,
    assert: false,
    // fixes next-i18next dependencies
    path: false,
    fs: false,
    // fixes mapbox dependencies
    events: false,
    // fixes sentry dependencies
    process: false,
    os: false };
    return config;
  },

  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN
    ]
  }
}

module.exports = nextConfig
