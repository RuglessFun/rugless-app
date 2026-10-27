import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [{ source: '/memes', destination: '/app', permanent: true }];
  },
};
export default config;
