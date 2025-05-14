const path = 'path';

// .env.local의 NEXT_PUBLIC_BASE_PATH를 읽어옵니다.
const basePath =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_PATH || ''
    : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath 설정
  basePath,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
