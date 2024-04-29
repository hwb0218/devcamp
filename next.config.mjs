/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 322, 384],
    deviceSizes: [575, 640, 750, 1080, 1200, 1920]
  }
};

export default nextConfig;
