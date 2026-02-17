"use client";

import { useEffect } from "react";

/**
 * Registers the service worker in production.
 * Renders nothing — purely a side-effect component.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("[SW] Registration failed:", error);
    });
  }, []);

  return null;
}
