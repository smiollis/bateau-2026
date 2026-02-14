"use client";

import { Sun, Moon } from "lucide-react";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";

interface HeaderThemeToggleProps {
  className?: string;
}

const HeaderThemeToggle = ({ className }: HeaderThemeToggleProps) => {
  const { variant, setVariant } = useThemeVariant();
  const t = useTranslations("nav");

  return (
    <button
      onClick={() => setVariant(variant === "nuit" ? "classic" : "nuit")}
      className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
        variant === "nuit"
          ? "bg-accent/20 text-accent hover:bg-accent/30"
          : "bg-primary/10 text-primary hover:bg-primary/20"
      } ${className ?? ""}`}
      aria-label={variant === "nuit" ? t("dayMode") : t("nightMode")}
      title={variant === "nuit" ? t("dayMode") : t("nightMode")}
    >
      {variant === "nuit" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default HeaderThemeToggle;
