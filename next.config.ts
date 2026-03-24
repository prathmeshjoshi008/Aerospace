import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force Static HTML Export for Cloudflare Pages
  output: 'export', 
  
  // 2. Disable image optimization (required for static export)
  images: {
    unoptimized: true,
  },

  // 3. Optional: Ensure trailing slashes for better routing compatibility
  trailingSlash: true,
};

export default nextConfig;
