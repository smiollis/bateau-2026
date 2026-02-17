"use client";

import { ThemeVariantProvider } from "@/contexts/ThemeVariantContext";
import { CookieProvider } from "@/components/cookie-consent";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <ThemeVariantProvider>
        <CookieProvider>
          <ServiceWorkerRegistration />
          {children}
        </CookieProvider>
      </ThemeVariantProvider>
    </LazyMotion>
  );
}
