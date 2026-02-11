'use client';

import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { CookieConsent, CookieConsentContextValue } from '@/types/cookie-consent';
import {
  saveConsent,
  loadConsent,
  removeConsent,
  defaultConsent,
  CONSENT_VERSION,
} from '@/lib/cookie-consent';
import {
  updateAnalyticsConsent,
  updateMarketingConsent,
  removeGACookies,
} from '@/lib/gtag';

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Charger consentement au mount
  useEffect(() => {
    const stored = loadConsent();

    if (stored) {
      setConsent(stored);
      setShowBanner(false);
      // Appliquer le consentement stocké via Consent Mode
      updateAnalyticsConsent(stored.analytics);
      updateMarketingConsent(stored.marketing);
    } else {
      setShowBanner(true);
    }

    setIsLoading(false);
  }, []);

  const acceptAll = () => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);

    updateAnalyticsConsent(true);
    updateMarketingConsent(true);
  };

  const rejectAll = () => {
    const newConsent: CookieConsent = {
      ...defaultConsent,
      timestamp: new Date().toISOString(),
    };

    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);

    updateAnalyticsConsent(false);
    updateMarketingConsent(false);
    removeGACookies();
  };

  const updateConsentFn = (updates: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      ...defaultConsent,
      ...consent,
      ...updates,
      necessary: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);

    updateAnalyticsConsent(newConsent.analytics);
    updateMarketingConsent(newConsent.marketing);

    if (!newConsent.analytics && !newConsent.marketing) {
      removeGACookies();
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const resetConsent = () => {
    removeConsent();
    setConsent(null);
    setShowBanner(true);
    updateAnalyticsConsent(false);
    updateMarketingConsent(false);
    removeGACookies();
  };

  const value: CookieConsentContextValue = {
    consent,
    isLoading,
    showBanner,
    showModal,
    acceptAll,
    rejectAll,
    updateConsent: updateConsentFn,
    openModal,
    closeModal,
    resetConsent,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
