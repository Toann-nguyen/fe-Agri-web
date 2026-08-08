/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localeDetection: true,
  },
};

export default nextConfig;
