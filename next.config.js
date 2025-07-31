/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@tabler/icons-react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 优化构建已默认启用
  // 启用静态导出（如果需要）
  // output: 'export',
  // trailingSlash: true,
};

module.exports = nextConfig;