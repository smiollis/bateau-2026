import type { CookieConsent } from '@/types/cookie-consent';

const STORAGE_KEY = 'bateau-cookie-consent';
export const CONSENT_VERSION = '1.0';

export const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: new Date().toISOString(),
  version: CONSENT_VERSION,
};

export function saveConsent(consent: CookieConsent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch (error) {
    console.error('Failed to save cookie consent:', error);
  }
}

export function loadConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored) as CookieConsent;

    // Vérifier version — si ancienne, reset
    if (consent.version !== CONSENT_VERSION) {
      removeConsent();
      return null;
    }

    return consent;
  } catch (error) {
    console.error('Failed to load cookie consent:', error);
    return null;
  }
}

export function removeConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to remove cookie consent:', error);
  }
}
