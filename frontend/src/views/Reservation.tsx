"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { m } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, HelpCircle, ChevronRight, ShieldCheck, CreditCard, Loader2, Anchor, PartyPopper, Crown } from "lucide-react";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations, useLocale } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const LOCALE_TO_PLL: Record<string, string> = {
  fr: "fr", en: "en", es: "es", it: "it", de: "de", "pt-BR": "pt",
};

type IframeState = "loading" | "loaded" | "error";

const IFRAME_TIMEOUT = 15_000;

const ReservationSkeleton = ({ loadingText }: { loadingText: string }) => (
  <div className="space-y-6 p-6">
    <div className="flex flex-col items-center gap-3 py-4">
      <Loader2 className="w-8 h-8 animate-spin text-accent" />
      <p className="text-muted-foreground text-sm font-medium">{loadingText}</p>
    </div>
    <Skeleton className="h-10 w-3/4" />
    <Skeleton className="h-6 w-1/2" />
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="h-12" />
      <Skeleton className="h-24" />
      <Skeleton className="h-14 w-48" />
    </div>
  </div>
);

const Reservation = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeState, setIframeState] = useState<IframeState>("loading");
  const [iframeHeight, setIframeHeight] = useState(2200);
  const { isDark } = useThemeVariant();
  const t = useTranslations("reservation");
  const locale = useLocale();
  const pllLang = LOCALE_TO_PLL[locale] || "fr";

  const reassuranceBadges = [
    { icon: ShieldCheck, label: t("badgeSSL") },
    { icon: CreditCard, label: t("badgePayment") },
    { icon: Mail, label: t("badgeConfirmation") },
  ];

  const handleIframeLoad = useCallback(() => {
    setIframeState("loaded");
  }, []);

  // Timeout → error si l'iframe ne charge pas dans les 15s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIframeState((prev) => (prev === "loading" ? "error" : prev));
    }, IFRAME_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  // Listener postMessage pour hauteur dynamique depuis WordPress
  useEffect(() => {
    const wpOrigin = process.env.NEXT_PUBLIC_WP_URL;
    if (!wpOrigin) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== wpOrigin) return;
      if (event.data?.type === "bookly-height" && typeof event.data.height === "number") {
        setIframeHeight(event.data.height + 100);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Toujours arriver en haut de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
        {/* HERO SECTION */}
        <m.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-4 md:py-8"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, hsl(224 64% 10%), hsl(var(--background)))"
              : "linear-gradient(to bottom, #eff6ff, hsl(var(--background)))",
          }}
        >
          <div className="container-custom max-w-7xl">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{t("breadcrumbHome")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t("breadcrumbReservation")}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-3">
                {t("title")}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-2">
                {t("subtitle")}
              </p>
            </m.div>
          </div>
        </m.section>

        {/* CONTAINER IFRAME */}
        <section className="pb-16 md:pb-24 -mt-8">
          <div className="container-custom">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto bg-card rounded-2xl shadow-2xl p-2 sm:p-4 md:p-6"
            >
              {/* Skeleton + message pendant le chargement */}
              {iframeState === "loading" && <ReservationSkeleton loadingText={t("loading")} />}

              {/* Iframe Bookly — toujours dans le DOM, masque pendant loading */}
              {iframeState !== "error" && (
                <iframe
                  ref={iframeRef}
                  src={`${process.env.NEXT_PUBLIC_WP_URL}/reservation-embed/?bl=${pllLang}`}
                  style={{
                    height: `${iframeHeight}px`,
                    display: iframeState === "loaded" ? "block" : "none",
                  }}
                  className="w-full border-0 rounded-xl transition-opacity duration-300"
                  onLoad={handleIframeLoad}
                  title={t("title")}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              )}

              {/* Fallback erreur */}
              {iframeState === "error" && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-[400px] flex flex-col items-center justify-center gap-6 text-center px-4"
                >
                  <p className="text-lg text-foreground font-medium">
                    {t("errorTitle")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("errorSubtitle")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <Link href="/#contact">
                        <Mail className="w-4 h-4 mr-2" />
                        {t("errorContact")}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="tel:+33670342543">
                        <Phone className="w-4 h-4 mr-2" />
                        +33 6 70 34 25 43
                      </a>
                    </Button>
                  </div>
                </m.div>
              )}
            </m.div>

            {/* BADGES REASSURANCE */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {reassuranceBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 text-center"
                >
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </m.div>

            {/* FORMULAS INFO SECTION */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto mt-16"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary text-center mb-8">
                {t("infoTitle")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {([
                  { icon: Anchor, titleKey: "infoClassicTitle" as const, priceKey: "infoClassicPrice" as const, descKey: "infoClassicDesc" as const },
                  { icon: PartyPopper, titleKey: "infoFestiveTitle" as const, priceKey: "infoFestivePrice" as const, descKey: "infoFestiveDesc" as const },
                  { icon: Crown, titleKey: "infoPrestigeTitle" as const, priceKey: "infoPrestigePrice" as const, descKey: "infoPrestigeDesc" as const },
                ] as const).map(({ icon: Icon, titleKey, priceKey, descKey }) => (
                  <div key={titleKey} className="bg-card rounded-xl border border-border p-6 text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{t(titleKey)}</h3>
                    <p className="text-2xl font-bold text-primary mb-3">{t(priceKey)}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
                  </div>
                ))}
              </div>

              <div className="bg-card/50 rounded-xl border border-border/50 p-6 md:p-8">
                <h3 className="font-heading text-xl font-semibold text-primary mb-4">{t("infoProcessTitle")}</h3>
                <ol className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">1</span>
                    {t("infoStep1")}
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">2</span>
                    {t("infoStep2")}
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">3</span>
                    {t("infoStep3")}
                  </li>
                </ol>
                <p className="text-sm text-muted-foreground italic">{t("infoIncluded")}</p>
              </div>
            </m.div>

            {/* FAQ LINK */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-6xl mx-auto mt-8 text-center"
            >
              <Button variant="outline" asChild className="gap-2">
                <Link href="/faq">
                  <HelpCircle className="w-4 h-4" />
                  {t("faq")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </m.div>
          </div>
        </section>
    </div>
  );
};

export default Reservation;
