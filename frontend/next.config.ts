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

const wpUrl = process.env.NEXT_PUBLIC_WP_URL || "";

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `img-src 'self' data: blob: https://images.unsplash.com https://lh3.googleusercontent.com https://*.cdninstagram.com https://*.fbcdn.net https://www.google-analytics.com https://www.googletagmanager.com`,
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com${wpUrl ? ` ${wpUrl}` : ""}`,
  `frame-src 'self'${wpUrl ? ` ${wpUrl}` : ""}`,
  "media-src 'self' https://*.cdninstagram.com https://*.fbcdn.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
      { protocol: "https", hostname: "*.fbcdn.net" },
    ],
  },
  async headers() {
    const headers = [
      ...securityHeaders,
      { key: "Content-Security-Policy", value: cspDirectives },
    ];
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
