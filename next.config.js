require('dotenv').config()
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
  },

  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "(.*)",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     }
  //   ]
  // }
}


module.exports = nextConfig
