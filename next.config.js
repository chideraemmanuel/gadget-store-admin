/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'use-credentials',
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_API_HOST_NAME,
        port: process.env.NEXT_PUBLIC_API_PORT,
        pathname: '/*/**',
      },
    ],
  },
};

module.exports = nextConfig;
