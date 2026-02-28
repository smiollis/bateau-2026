import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { getConsentDefaultScript } from "@/lib/gtag";
import { getLocale } from "next-intl/server";
import reviewsData from "@/data/reviews.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const WP_URL = process.env.NEXT_PUBLIC_WP_URL;

// Compute aggregate rating from reviews data
const reviewRatings = reviewsData.reviews.map((r) => r.rating);
const ratingValue = (
  reviewRatings.reduce((sum, r) => sum + r, 0) / reviewRatings.length
).toFixed(1);
const reviewCount = String(reviewsData.totalReviews);

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bateau-a-paris.fr"),
  title: {
    default: "Un Bateau à Paris | Croisières Privées sur la Seine",
    template: "%s | Un Bateau à Paris",
  },
  description: "Croisière privée sur la Seine à Paris. Naviguez au fil de l'eau avec vue sur la Tour Eiffel et Notre-Dame. Jusqu'à 12 personnes. À partir de 480€.",
  openGraph: {
    type: "website",
    siteName: "Un Bateau à Paris",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Un Bateau à Paris — Croisière privée sur la Seine" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "cKXOGqTV4Uxra0cWXHL3lqg-HReW3skbVGDhAw_Ocwo",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Un Bateau à Paris",
              description: "Croisières privées sur la Seine à Paris",
              url: "https://bateau-a-paris.fr",
              telephone: "+33670342543",
              email: "capitaine@bateau-a-paris.fr",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Port de l'Arsenal",
                addressLocality: "Paris",
                postalCode: "75012",
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 48.8497,
                longitude: 2.3666,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: ratingValue,
                reviewCount: reviewCount,
              },
              priceRange: "480€ - 660€",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Un Bateau à Paris",
              url: "https://bateau-a-paris.fr",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bateau-a-paris.fr/fr/actualites?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Un Bateau à Paris",
              url: "https://bateau-a-paris.fr",
              logo: "https://bateau-a-paris.fr/og-image.jpg",
              sameAs: [
                "https://www.instagram.com/bateau_a_paris/",
                "https://www.facebook.com/profile.php?id=61557848940884",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33670342543",
                email: "capitaine@bateau-a-paris.fr",
                contactType: "reservations",
                availableLanguage: ["French", "English"],
              },
            }),
          }}
        />
        {/* Preconnect WordPress (accélère le chargement de l'iframe Bookly) */}
        {WP_URL && (
          <>
            <link rel="dns-prefetch" href={WP_URL} />
            <link rel="preconnect" href={WP_URL} crossOrigin="anonymous" />
          </>
        )}
        {/* Google Consent Mode v2 defaults + GA4 config (avant tout script) */}
        {GA_ID && (
          <script
            dangerouslySetInnerHTML={{ __html: getConsentDefaultScript(GA_ID) }}
          />
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {/* GA4 gtag.js — chargé async, consent mode empêche le tracking sans consentement */}
        {GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
        )}
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
