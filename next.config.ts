import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
