'use client';

import { useContext } from 'react';
import { CookieConsentContext } from '@/components/cookie-consent/CookieProvider';

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieProvider');
  }

  return context;
}
