import path from 'path';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // In a pnpm monorepo the standalone output is emitted relative to the
  // workspace root. Pin it explicitly so the Dockerfile can reliably copy
  // `.next/standalone` regardless of where `next build` is invoked from.
  outputFileTracingRoot: path.resolve(process.cwd(), '..', '..'),
  images: {
    // Edge runtime (Cloudflare) does not support Next/Image optimization server-side
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@iconify/react',
      '@radix-ui/react-icons',
    ],
  },
  // Required for `process.env.NEXT_PUBLIC_*` to be inlined at build time on
  // Cloudflare Pages. Cloudflare will substitute them from the Pages dashboard
  // or from `wrangler.toml` [vars] during `next build`.
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ?? 'https://api.toanrobert.online/api',
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL ?? 'https://toanrobert.online',
    NEXT_PUBLIC_ENABLE_API_MOCKING:
      process.env.NEXT_PUBLIC_ENABLE_API_MOCKING ?? 'false',
    NEXT_PUBLIC_MOCK_API_PORT: process.env.NEXT_PUBLIC_MOCK_API_PORT ?? '8080',
    NEXT_PUBLIC_EMAIL_ADDRESS:
      process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? 'nguyenminhtoan2712py@gmail.com',
  },
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default withNextIntl(nextConfig);
