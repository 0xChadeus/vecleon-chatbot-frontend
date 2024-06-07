const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN
    ]
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-CSRFToken, X-CSRFTOKEN, csrftoken, content-type, Authorization, Set-Cookie, x-requested-with, set-cookie"},
        ]
      }
    ]
  }
}
module.exports = nextConfig
