import type { CookieConsent } from '@/types/cookie-consent';
import { logger } from '@/lib/logger';

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
    logger.error('Failed to save cookie consent', 'cookie-consent', error);
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
    logger.error('Failed to load cookie consent', 'cookie-consent', error);
    return null;
  }
}

export function removeConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    logger.error('Failed to remove cookie consent', 'cookie-consent', error);
  }
}
