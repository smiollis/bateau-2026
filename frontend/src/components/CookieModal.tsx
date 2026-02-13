"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

interface CookieModalProps {
  open: boolean;
  onClose: () => void;
  analytics: boolean;
  marketing: boolean;
  onSave: (analytics: boolean, marketing: boolean) => void;
  onRejectAll: () => void;
}

const CookieModal = ({
  open,
  onClose,
  analytics,
  marketing,
  onSave,
  onRejectAll,
}: CookieModalProps) => {
  const t = useTranslations("cookie");

  const sections = [
    {
      id: "necessary",
      title: t("necessary"),
      description: t("necessaryDesc"),
      alwaysOn: true,
    },
    {
      id: "analytics",
      title: t("analytics"),
      description: t("analyticsDesc"),
      alwaysOn: false,
    },
    {
      id: "marketing",
      title: t("marketing"),
      description: t("marketingDesc"),
      alwaysOn: false,
    },
  ] as const;

  const [localAnalytics, setLocalAnalytics] = useState(analytics);
  const [localMarketing, setLocalMarketing] = useState(marketing);

  useEffect(() => {
    if (open) {
      setLocalAnalytics(analytics);
      setLocalMarketing(marketing);
    }
  }, [open, analytics, marketing]);

  const getToggleProps = (id: string) => {
    switch (id) {
      case "analytics":
        return { checked: localAnalytics, onCheckedChange: setLocalAnalytics };
      case "marketing":
        return { checked: localMarketing, onCheckedChange: setLocalMarketing };
      default:
        return { checked: true, disabled: true, onCheckedChange: () => {} };
    }
  };

  const handleSave = () => {
    onSave(localAnalytics, localMarketing);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("close")}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 id="cookie-modal-title" className="font-heading text-2xl text-foreground mb-2">
              {t("modalTitle")}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              {t("modalSubtitle")}
            </p>

            <div className="space-y-0">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  className={`flex items-start justify-between gap-4 py-5 ${
                    i < sections.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">
                      {section.title}
                      {section.alwaysOn && (
                        <span className="ml-2 text-xs text-muted-foreground font-normal">
                          ({t("alwaysOn")})
                        </span>
                      )}
                    </p>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {section.description}
                    </p>
                  </div>
                  <Switch
                    {...getToggleProps(section.id)}
                    className="mt-1 data-[state=checked]:bg-primary"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-6">
              <button
                onClick={onRejectAll}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors px-4 py-2"
              >
                {t("rejectAll")}
              </button>
              <button
                onClick={handleSave}
                className="btn-gold text-white w-full sm:w-auto text-center"
              >
                {t("saveChoices")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieModal;
