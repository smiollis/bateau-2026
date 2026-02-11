export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean;      // Toujours true
  analytics: boolean;      // Choix user
  marketing: boolean;      // Choix user
  timestamp: string;       // ISO date du consentement
  version: string;         // Version politique (ex: "1.0")
}

export interface CookieConsentContextValue {
  consent: CookieConsent | null;
  isLoading: boolean;
  showBanner: boolean;
  showModal: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  openModal: () => void;
  closeModal: () => void;
  resetConsent: () => void;
}
