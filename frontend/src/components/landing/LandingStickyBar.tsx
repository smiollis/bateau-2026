"use client";

import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface LandingStickyBarProps {
  ctaText?: string;
  ctaHref?: string;
}

const LandingStickyBar = ({
  ctaText,
  ctaHref = "/reservation",
}: LandingStickyBarProps) => {
  const t = useTranslations("landing");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t shadow-lg p-3">
      <div className="flex gap-3">
        <Button asChild className="btn-gold text-white flex-1">
          <Link href={ctaHref}>
            <Calendar className="w-4 h-4 mr-2" />
            {ctaText ?? t("reserve")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="shrink-0">
          <a href="tel:+33670342543" aria-label={t("call")}>
            <Phone className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default LandingStickyBar;
