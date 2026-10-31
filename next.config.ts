import type { NextConfig } from "next";

// Situs statis: hasil build ada di folder "out" dan bisa di-hosting gratis
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
