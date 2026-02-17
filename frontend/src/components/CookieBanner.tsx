"use client";

import { useTranslations } from "next-intl";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookieModal from "./CookieModal";

const CookieBanner = () => {
  const {
    showBanner,
    showModal,
    acceptAll,
    openModal,
    closeModal,
    consent,
    rejectAll,
    updateConsent,
  } = useCookieConsent();
  const t = useTranslations("cookie");
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <AnimatePresence>
        {showBanner && !showModal && (
          <m.div
            className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary bg-card/95 backdrop-blur-md shadow-2xl"
            initial={{ y: prefersReducedMotion ? 0 : 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: prefersReducedMotion ? 0 : 100, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="container-custom p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <span className="text-2xl" aria-hidden="true">🍪</span>

                <p className="flex-1 text-sm text-foreground leading-relaxed">
                  {t("bannerText")}{" "}
                  <Link
                    href="/confidentialite"
                    className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    {t("privacyLink")}
                  </Link>
                </p>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={openModal}
                    className="border-2 border-primary text-primary font-semibold px-6 py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {t("customize")}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="btn-gold text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {t("acceptAll")}
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <CookieModal
        open={showModal}
        onClose={closeModal}
        analytics={consent?.analytics ?? false}
        marketing={consent?.marketing ?? false}
        onSave={(analytics, marketing) => updateConsent({ analytics, marketing })}
        onRejectAll={rejectAll}
      />
    </>
  );
};

export default CookieBanner;
