import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/CookieBanner";
import { getConsentDefaultScript } from "@/lib/gtag";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "Un Bateau à Paris | Croisières Privées sur la Seine",
  description: "Croisière privée sur la Seine à Paris. Naviguez au fil de l'eau avec vue sur la Tour Eiffel et Notre-Dame. Jusqu'à 12 personnes. À partir de 420€.",
  verification: {
    google: "cKXOGqTV4Uxra0cWXHL3lqg-HReW3skbVGDhAw_Ocwo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Michroma&family=Orbitron:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
        {/* Google Consent Mode v2 defaults + GA4 config (avant tout script) */}
        {GA_ID && (
          <script
            dangerouslySetInnerHTML={{ __html: getConsentDefaultScript(GA_ID) }}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
