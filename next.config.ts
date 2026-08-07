import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(',') ?? [],
};

export default nextConfig;
