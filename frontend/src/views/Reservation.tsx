"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Phone, Mail, HelpCircle, ChevronRight } from "lucide-react";
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

const Reservation = () => {
  const [iframeState] = useState<IframeState>("loading");
  const { isDark } = useThemeVariant();

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
                  <BreadcrumbPage>Réservation</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-3">
                Réservez votre croisière
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
              className="max-w-4xl mx-auto bg-card rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12"
            >
              {iframeState === "loading" && (
                <div>
                  <ReservationSkeleton />
                  <div className="min-h-[800px] bg-muted/50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 mt-6">
                    <span className="text-5xl">📅</span>
                    <p className="text-muted-foreground text-center px-4">
                      Le formulaire de réservation apparaîtra ici
                    </p>
                  </div>
                </div>
              )}

              {iframeState === "loaded" && (
                <div className="min-h-[800px]">
                  {/* L'iFrame Bookly sera inséré ici */}
                </div>
              )}

              {iframeState === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-[400px] flex flex-col items-center justify-center gap-6 text-center px-4"
                >
                  <p className="text-lg text-foreground font-medium">
                    Problème de chargement ?
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

            {/* FAQ LINK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-4xl mx-auto mt-8 text-center"
            >
              <Button variant="outline" asChild className="gap-2">
                <Link href="/faq">
                  <HelpCircle className="w-4 h-4" />
                  Questions fréquentes
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
