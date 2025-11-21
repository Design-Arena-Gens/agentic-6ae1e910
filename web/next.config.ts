import type { NextConfig } from "next";

const domains = (process.env.NEXT_PUBLIC_IMAGE_DOMAINS || "")
  .split(",")
  .map((d) => d.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domains.map((host) => ({
      protocol: "https",
      hostname: host,
    })),
  },
};

export default nextConfig;
