import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProduction =
  process.env.NEXT_PUBLIC_SITE_URL === "https://bateau-a-paris.fr";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    if (isProduction) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
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
