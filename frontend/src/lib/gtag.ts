/**
 * Google Analytics 4 avec Google Consent Mode v2
 * GA4 ID: G-N20S788YDW (configuré via NEXT_PUBLIC_GA_ID)
 *
 * Le script gtag est chargé côté serveur dans layout.tsx avec les
 * defaults consent "denied" pour les régions EU. Ce module gère
 * uniquement les mises à jour du consentement et le nettoyage.
 */

const EU_REGIONS = [
  'AT','BE','BG','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB',
  'GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MT','NL','NO',
  'PL','PT','RO','SE','SI','SK',
];

/** Initialise gtag + Consent Mode defaults (appelé inline dans <head>) */
export function getConsentDefaultScript(gaId: string): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500,
      'region': ${JSON.stringify(EU_REGIONS)}
    });
    gtag('js', new Date());
    gtag('config', '${gaId}');
  `;
}

/** Met à jour le consentement analytics côté client */
export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });
}

/** Met à jour le consentement marketing côté client */
export function updateMarketingConsent(granted: boolean): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
  });
}

/** Supprime les cookies GA (best effort) */
export function removeGACookies(): void {
  if (typeof document === 'undefined') return;
  const cookieNames = ['_ga', '_gat', '_gid'];
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    });
  });

  // Supprimer aussi les cookies _ga_* (GA4 measurement)
  document.cookie.split(';').forEach((c) => {
    const cookieName = c.trim().split('=')[0] ?? '';
    if (cookieName.startsWith('_ga_')) {
      domains.forEach((domain) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      });
    }
  });
}

// Types globaux
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}
