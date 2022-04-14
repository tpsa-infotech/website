/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    url: "https://my.tpsa.info",
  },
  serverRuntimeConfig: {
    token: "public",
  },
}

module.exports = nextConfig
