import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ['cdn.sanity.io'], // Allowing images from cdn.sanity.io
  },
  
};

export default nextConfig;
