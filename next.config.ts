import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   reactStrictMode: false, // Temporarily disable to avoid double rendering
};

export default nextConfig;
