import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProduction =
  process.env.NEXT_PUBLIC_SITE_URL === "https://bateau-a-paris.fr";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    const headers = [...securityHeaders];
    if (!isProduction) {
      headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }
    return [
      {
        source: "/:path*",
        headers,
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
