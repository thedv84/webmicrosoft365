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
};

export default nextConfig;
