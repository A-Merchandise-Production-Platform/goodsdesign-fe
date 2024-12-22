// next.config.js

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Additional config options here
  output: 'standalone',
  env: {
    "API_URL": "https://api.goodsdesign.uydev.id.vn/api"
  }
};

module.exports = nextConfig;
