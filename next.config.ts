import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if necessary, but HTTPS is recommended
        hostname: '**', // This wildcard matches any hostname
        port: '', // Optional: Specify a port if needed
        pathname: '**', // Optional: Match any pathname
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
