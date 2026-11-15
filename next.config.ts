import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Builds plain HTML/CSS/JS into the `out/` folder, so the site can be
  // hosted anywhere (Vercel, Netlify, GitHub Pages, any web host).
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
