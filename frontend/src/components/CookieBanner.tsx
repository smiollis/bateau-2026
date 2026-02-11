import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CookieModal from "./CookieModal";

const CookieBanner = () => {
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleAcceptAll = () => {
    console.log("Cookies acceptés :", { necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const handleSave = () => {
    console.log("Cookies enregistrés :", { necessary: true, analytics, marketing });
    setModalOpen(false);
    setVisible(false);
  };

  const handleRejectAll = () => {
    console.log("Cookies refusés :", { necessary: true, analytics: false, marketing: false });
    setAnalytics(false);
    setMarketing(false);
    setModalOpen(false);
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && !modalOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary bg-card/95 backdrop-blur-md shadow-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="container-custom p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <span className="text-2xl" aria-hidden="true">🍪</span>

                <p className="flex-1 text-sm text-foreground leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                  En poursuivant, vous acceptez notre utilisation des cookies.{" "}
                  <Link
                    href="/mentions-legales"
                    className="text-primary font-medium hover:underline"
                  >
                    Politique de confidentialité
                  </Link>
                </p>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="border-2 border-primary text-primary font-semibold px-6 py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm"
                  >
                    Personnaliser
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="btn-gold text-sm"
                  >
                    Tout accepter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        analytics={analytics}
        setAnalytics={setAnalytics}
        marketing={marketing}
        setMarketing={setMarketing}
        onSave={handleSave}
        onRejectAll={handleRejectAll}
      />
    </>
  );
};

export default CookieBanner;
