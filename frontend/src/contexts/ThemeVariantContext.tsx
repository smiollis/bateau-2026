"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeVariant = "classic" | "modern" | "minimal" | "editorial" | "luxe" | "nuit";

interface ThemeVariantContextType {
  variant: ThemeVariant;
  setVariant: (variant: ThemeVariant) => void;
  isDark: boolean;
}

const ThemeVariantContext = createContext<ThemeVariantContextType | undefined>(undefined);

export const ThemeVariantProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<ThemeVariant>("classic");

  const isDark = variant === "nuit" || variant === "luxe";

  // Toggle the "dark" class on documentElement for semantic token switching
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <ThemeVariantContext.Provider value={{ variant, setVariant, isDark }}>
      {children}
    </ThemeVariantContext.Provider>
  );
};

export const useThemeVariant = () => {
  const context = useContext(ThemeVariantContext);
  if (!context) {
    throw new Error("useThemeVariant must be used within ThemeVariantProvider");
  }
  return context;
};
