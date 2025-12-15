import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'old-images.hb.ru-msk.vkcs.cloud',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
