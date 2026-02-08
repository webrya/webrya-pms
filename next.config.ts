import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'propmaster-122.preview.emergentagent.com',
      'localhost:3000',
    ],
  },
};

export default nextConfig;
