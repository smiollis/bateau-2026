"use client";

import { ThemeVariantProvider } from "@/contexts/ThemeVariantContext";
import { CookieProvider } from "@/components/cookie-consent";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeVariantProvider>
      <CookieProvider>
        {children}
      </CookieProvider>
    </ThemeVariantProvider>
  );
}
