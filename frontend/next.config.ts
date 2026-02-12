import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/f_a_q", destination: "/faq", permanent: true },
      { source: "/c_g_v", destination: "/cgv", permanent: true },
      {
        source: "/mentions_legales",
        destination: "/mentions-legales",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
