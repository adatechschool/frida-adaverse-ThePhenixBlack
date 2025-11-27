import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "127.0.0.1"],
    },
  },
};

export default nextConfig;
