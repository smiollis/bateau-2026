import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { routing } from "@/i18n/routing";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"));

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HeaderVariants />
      <main id="main">{children}</main>
      <FooterVariants />
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
