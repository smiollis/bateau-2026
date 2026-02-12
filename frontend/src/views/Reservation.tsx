"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { CalendarDays, Phone, Mail, HelpCircle, ChevronRight, ShieldCheck, CreditCard } from "lucide-react";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type IframeState = "loading" | "loaded" | "error";

const IFRAME_TIMEOUT = 15_000;

const ReservationSkeleton = () => (
  <div className="space-y-6 p-6">
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

const reassuranceBadges = [
  { icon: ShieldCheck, label: "Paiement securise SSL" },
  { icon: Mail, label: "Confirmation immediate" },
  { icon: CalendarDays, label: "Synchro Google Calendar" },
  { icon: CreditCard, label: "CB, PayPal, Virement" },
];

const Reservation = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeState, setIframeState] = useState<IframeState>("loading");
  const [iframeHeight, setIframeHeight] = useState(800);
  const { isDark } = useThemeVariant();

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
        setIframeHeight(event.data.height + 50);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />

      <main className="pt-24">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-12 md:py-20"
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
                    <Link href="/">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Reservation</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-3">
                Reservez votre croisiere
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                Choisissez votre formule en quelques clics
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* CONTAINER IFRAME */}
        <section className="pb-16 md:pb-24 -mt-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-6xl mx-auto bg-card rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12"
            >
              {/* Skeleton pendant le chargement */}
              {iframeState === "loading" && <ReservationSkeleton />}

              {/* Iframe Bookly — toujours dans le DOM, masque pendant loading */}
              {iframeState !== "error" && (
                <iframe
                  ref={iframeRef}
                  src={`${process.env.NEXT_PUBLIC_WP_URL}/reservation-embed`}
                  style={{
                    height: `${iframeHeight}px`,
                    display: iframeState === "loaded" ? "block" : "none",
                  }}
                  className="w-full border-0 rounded-xl transition-all duration-300"
                  onLoad={handleIframeLoad}
                  title="Formulaire de reservation Bookly"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              )}

              {/* Fallback erreur */}
              {iframeState === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-[400px] flex flex-col items-center justify-center gap-6 text-center px-4"
                >
                  <p className="text-lg text-foreground font-medium">
                    Le formulaire de reservation n'a pas pu charger.
                  </p>
                  <p className="text-muted-foreground">
                    Contactez-nous directement pour reserver :
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <Link href="/#contact">
                        <Mail className="w-4 h-4 mr-2" />
                        Contactez-nous
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="tel:+33670342543">
                        <Phone className="w-4 h-4 mr-2" />
                        +33 6 70 34 25 43
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* BADGES REASSURANCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-6xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
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
            </motion.div>

            {/* FAQ LINK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-6xl mx-auto mt-8 text-center"
            >
              <Button variant="outline" asChild className="gap-2">
                <Link href="/faq">
                  <HelpCircle className="w-4 h-4" />
                  Questions frequentes
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <FooterVariants />
    </div>
  );
};

export default Reservation;
