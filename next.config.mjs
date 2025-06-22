// next.config.mjs

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Anda bisa menambahkan konfigurasi Next.js lainnya di sini jika ada
};

// Konfigurasi khusus untuk PWA
const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

// Gabungkan kedua konfigurasi dengan cara yang benar
export default withPWA(pwaConfig)(nextConfig);