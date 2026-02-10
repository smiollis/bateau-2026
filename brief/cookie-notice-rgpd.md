# Cookie Notice RGPD - bateau-a-paris.fr

**Phase**: 5 (Semaine 7 - Finalisation)  
**Durée estimée**: 3-4h  
**Prérequis**: Design récupéré depuis Lovable prototype

---

## 📋 Contexte

Le prototype Lovable contient le **design visuel** du cookie banner et modal.  
**Repository Lovable**: https://github.com/smiollis/bateau-a-paris.git

Tu dois récupérer ce code et implémenter la **logique RGPD** complète.

---

## 🎯 Objectifs

1. ✅ **Conforme RGPD** (ne pas tracker avant consentement)
2. ✅ **Ultra léger** (pas de lib externe si possible)
3. ✅ **Persistant** (mémoriser choix utilisateur)
4. ✅ **Granulaire** (choix par type de cookie)
5. ✅ **Accessible** (keyboard navigation, ARIA)

---

## 📊 Types de Cookies à Gérer

### 1. Cookies Nécessaires (Toujours actifs)
```typescript
{
  type: 'necessary',
  always: true,
  description: 'Essentiels au fonctionnement (sessions, sécurité, réservations)',
  cookies: [
    'PHPSESSID',           // Session WordPress/Bookly
    'wp-settings-*',       // Préférences WP
    'bookly-*',            // Réservations Bookly
    'cookie-consent',      // Mémorisation consentement
    'XSRF-TOKEN',          // Protection CSRF
  ]
}
```

### 2. Cookies Analytiques (Optionnels)
```typescript
{
  type: 'analytics',
  default: false,
  description: 'Nous aident à comprendre comment vous utilisez le site',
  cookies: [
    '_ga',                 // Google Analytics
    '_ga_*',               // GA4
    '_gid',                // Google Analytics
    '_gat',                // Google Analytics
  ],
  scripts: [
    'Google Tag Manager',
    'Google Analytics 4',
  ]
}
```

### 3. Cookies Marketing (Optionnels - si besoin)
```typescript
{
  type: 'marketing',
  default: false,
  description: 'Personnalisation publicités et contenu',
  cookies: [
    '_fbp',                // Facebook Pixel (si utilisé)
    'fr',                  // Facebook
    'IDE',                 // Google Ads (si utilisé)
  ],
  scripts: [
    // Vide pour l'instant - pas de pub
  ]
}
```

---

## 🏗️ Architecture Technique

### Structure Fichiers

```
src/
├── components/
│   └── cookie-consent/
│       ├── CookieBanner.tsx          # Banner simple (import Lovable)
│       ├── CookieModal.tsx           # Modal détaillé (import Lovable)
│       ├── CookieProvider.tsx        # Context provider
│       └── index.ts
├── hooks/
│   └── useCookieConsent.ts           # Hook custom
├── lib/
│   ├── cookie-consent.ts             # Logique core
│   └── gtm.ts                        # GTM conditional loading
└── types/
    └── cookie-consent.d.ts           # Types TypeScript
```

---

## 💻 Implémentation

### 1. Types TypeScript

**Fichier**: `src/types/cookie-consent.d.ts`

```typescript
export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean;      // Toujours true
  analytics: boolean;      // Choix user
  marketing: boolean;      // Choix user
  timestamp: Date;         // Date du consentement
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
```

---

### 2. Logique Core

**Fichier**: `src/lib/cookie-consent.ts`

```typescript
import { CookieConsent } from '@/types/cookie-consent';

const STORAGE_KEY = 'bateau-cookie-consent';
const CONSENT_VERSION = '1.0';

export const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: new Date(),
  version: CONSENT_VERSION,
};

// Sauvegarder consentement
export function saveConsent(consent: CookieConsent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch (error) {
    console.error('Failed to save cookie consent:', error);
  }
}

// Charger consentement
export function loadConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const consent = JSON.parse(stored);
    
    // Vérifier version - si ancienne, reset
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

// Supprimer consentement
export function removeConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to remove cookie consent:', error);
  }
}

// Vérifier si consentement nécessaire
export function shouldShowBanner(): boolean {
  const consent = loadConsent();
  return consent === null;
}
```

---

### 3. Hook React

**Fichier**: `src/hooks/useCookieConsent.ts`

```typescript
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
```

---

### 4. Context Provider

**Fichier**: `src/components/cookie-consent/CookieProvider.tsx`

```typescript
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { CookieConsent, CookieConsentContextValue } from '@/types/cookie-consent';
import {
  saveConsent,
  loadConsent,
  removeConsent,
  defaultConsent,
  shouldShowBanner,
} from '@/lib/cookie-consent';
import { loadGTM, removeGTM } from '@/lib/gtm';

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

interface CookieProviderProps {
  children: ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
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
      
      // Charger scripts selon consentement
      if (stored.analytics) {
        loadGTM();
      }
    } else {
      setShowBanner(true);
    }
    
    setIsLoading(false);
  }, []);

  // Accepter tous les cookies
  const acceptAll = () => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date(),
      version: '1.0',
    };
    
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    
    // Charger GTM
    loadGTM();
  };

  // Refuser tous les cookies (sauf nécessaires)
  const rejectAll = () => {
    const newConsent: CookieConsent = {
      ...defaultConsent,
      timestamp: new Date(),
    };
    
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    
    // Supprimer GTM si présent
    removeGTM();
  };

  // Mettre à jour consentement personnalisé
  const updateConsent = (updates: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      ...defaultConsent,
      ...consent,
      ...updates,
      necessary: true, // Force toujours true
      timestamp: new Date(),
    };
    
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    
    // Charger/supprimer GTM selon choix
    if (newConsent.analytics) {
      loadGTM();
    } else {
      removeGTM();
    }
  };

  // Ouvrir modal
  const openModal = () => {
    setShowModal(true);
  };

  // Fermer modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Reset consentement (pour tests)
  const resetConsent = () => {
    removeConsent();
    setConsent(null);
    setShowBanner(true);
    removeGTM();
  };

  const value: CookieConsentContextValue = {
    consent,
    isLoading,
    showBanner,
    showModal,
    acceptAll,
    rejectAll,
    updateConsent,
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
```

---

### 5. GTM Conditional Loading

**Fichier**: `src/lib/gtm.ts`

```typescript
// Charger Google Tag Manager
export function loadGTM(): void {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  
  if (!GTM_ID) {
    console.warn('GTM_ID not configured');
    return;
  }
  
  // Vérifier si déjà chargé
  if (window.dataLayer) {
    console.log('GTM already loaded');
    return;
  }
  
  // Initialiser dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  
  // Charger script GTM
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
  
  console.log('GTM loaded');
}

// Supprimer Google Tag Manager (best effort)
export function removeGTM(): void {
  // Supprimer cookies GA
  const gaCookies = ['_ga', '_gat', '_gid'];
  gaCookies.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Note: On ne peut pas vraiment "unload" GTM
  // Mais on supprime les cookies et on arrête le tracking
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'consent_revoked' });
  }
  
  console.log('GTM tracking stopped');
}

// Types window
declare global {
  interface Window {
    dataLayer: any[];
  }
}
```

---

### 6. Composants UI (depuis Lovable)

**Fichier**: `src/components/cookie-consent/CookieBanner.tsx`

```typescript
'use client';

import { useCookieConsent } from '@/hooks/useCookieConsent';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, acceptAll, openModal } = useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary-500 bg-white/95 p-4 shadow-2xl backdrop-blur-md md:p-6"
        >
          <div className="container-custom">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🍪</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 md:text-base">
                    Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
                    En poursuivant, vous acceptez notre utilisation des cookies.{' '}
                    <Link 
                      href="/confidentialite" 
                      className="text-primary-500 hover:underline"
                    >
                      Politique de confidentialité
                    </Link>
                  </p>
                </div>
              </div>
              
              <div className="flex w-full gap-3 md:w-auto md:flex-shrink-0">
                <Button
                  variant="secondary"
                  onClick={openModal}
                  className="flex-1 md:flex-initial"
                >
                  Personnaliser
                </Button>
                <Button
                  variant="primary"
                  onClick={acceptAll}
                  className="flex-1 md:flex-initial"
                >
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Fichier**: `src/components/cookie-consent/CookieModal.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieModal() {
  const { showModal, consent, closeModal, updateConsent, rejectAll } = useCookieConsent();
  
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (consent) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [consent]);

  const handleSave = () => {
    updateConsent({ analytics, marketing });
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary-900">
                  Paramètres des cookies
                </h2>
                <p className="mt-2 text-gray-600">
                  Nous respectons votre vie privée. Choisissez les cookies que vous acceptez.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-6">
              {/* Nécessaires */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Cookies nécessaires
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Essentiels au fonctionnement du site (réservations, sécurité)
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-5 w-5 rounded border-gray-300 text-primary-500 opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Analytiques */}
              <div className="border-b pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Cookies analytiques
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Google Analytics pour comprendre l'utilisation du site
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Cookies marketing
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Personnalisation de l'expérience et publicités ciblées
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button
                variant="ghost"
                onClick={rejectAll}
                className="text-gray-600 hover:text-gray-900"
              >
                Tout refuser
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                className="px-8"
              >
                Enregistrer mes choix
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Fichier**: `src/components/cookie-consent/index.ts`

```typescript
export { CookieBanner } from './CookieBanner';
export { CookieModal } from './CookieModal';
export { CookieProvider } from './CookieProvider';
```

---

### 7. Intégration dans Layout

**Fichier**: `src/app/layout.tsx`

```typescript
import { CookieProvider } from '@/components/cookie-consent';
import { CookieBanner } from '@/components/cookie-consent';
import { CookieModal } from '@/components/cookie-consent';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CookieProvider>
          {children}
          <CookieBanner />
          <CookieModal />
        </CookieProvider>
      </body>
    </html>
  );
}
```

---

### 8. Lien Footer pour Paramètres

**Dans Footer.tsx**, ajouter :

```typescript
import { useCookieConsent } from '@/hooks/useCookieConsent';

export function Footer() {
  const { openModal } = useCookieConsent();
  
  return (
    <footer>
      {/* ... autres liens ... */}
      <button onClick={openModal} className="text-sm hover:underline">
        Paramètres cookies
      </button>
    </footer>
  );
}
```

---

## 📄 Page Politique de Confidentialité

**Fichier**: `src/app/[locale]/confidentialite/page.tsx`

```typescript
export default function ConfidentialitePage() {
  return (
    <div className="container-custom py-20">
      <h1 className="mb-8 text-4xl font-bold">Politique de confidentialité</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2>1. Collecte des données</h2>
          <p>
            Un Bateau à Paris collecte et traite vos données personnelles dans le respect 
            du Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Cookies utilisés</h2>
          
          <h3>Cookies nécessaires</h3>
          <p>Ces cookies sont indispensables au fonctionnement du site :</p>
          <ul>
            <li><strong>PHPSESSID</strong> : Gestion de votre session</li>
            <li><strong>bookly-*</strong> : Réservations et rendez-vous</li>
            <li><strong>cookie-consent</strong> : Mémorisation de vos préférences cookies</li>
          </ul>

          <h3>Cookies analytiques (avec votre consentement)</h3>
          <p>Ces cookies nous aident à améliorer le site :</p>
          <ul>
            <li><strong>Google Analytics (_ga, _gid)</strong> : Statistiques anonymisées de visite</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p>
            Pour exercer vos droits, contactez-nous à : 
            <a href="mailto:capitaine@bateau-a-paris.fr">capitaine@bateau-a-paris.fr</a>
          </p>
        </section>

        <section className="mb-8">
          <h2>4. Durée de conservation</h2>
          <p>
            Vos données personnelles sont conservées pendant la durée nécessaire 
            à la finalité pour laquelle elles ont été collectées.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Contact</h2>
          <p>
            <strong>Un Bateau à Paris</strong><br />
            Port de l'Arsenal, 75012 Paris<br />
            Email : capitaine@bateau-a-paris.fr<br />
            Tél : +33 6 70 34 25 43
          </p>
        </section>
      </div>
    </div>
  );
}
```

---

## ✅ Tests RGPD

### Checklist Tests

```bash
# Tests fonctionnels
- [ ] Banner s'affiche au premier chargement
- [ ] "Tout accepter" cache le banner et charge GTM
- [ ] "Personnaliser" ouvre le modal
- [ ] "Tout refuser" cache le banner sans charger GTM
- [ ] Choix personnalisés sauvegardés en localStorage
- [ ] Refresh page : pas de re-affichage banner
- [ ] localStorage effacé : banner réapparaît
- [ ] Link footer "Paramètres cookies" ouvre modal
- [ ] Toggle "Nécessaires" disabled
- [ ] Toggle "Analytiques" change l'état
- [ ] "Enregistrer" applique les choix
- [ ] GTM se charge UNIQUEMENT si analytics=true

# Tests RGPD compliance
- [ ] Pas de tracking avant consentement
- [ ] Cookies GA créés UNIQUEMENT après consent
- [ ] Révocation consent supprime cookies GA
- [ ] Consentement granulaire fonctionne
- [ ] Link politique confidentialité accessible
- [ ] Modal accessible au clavier (Tab, Enter, Esc)
- [ ] ARIA labels corrects

# Tests cross-browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Mobile Chrome
```

---

## 🔍 Vérification Cookies dans DevTools

```javascript
// Console browser
// Vérifier localStorage
localStorage.getItem('bateau-cookie-consent')

// Vérifier cookies présents
document.cookie

// Vérifier dataLayer GTM
window.dataLayer
```

---

## 📊 Variables Environnement

**.env.local** :
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**.env.production** :
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Valeur réelle prod
```

---

## 🚀 Déploiement

### Checklist pré-déploiement

```bash
- [ ] GTM_ID configuré en production
- [ ] Politique confidentialité publiée
- [ ] Tests RGPD passés
- [ ] Banner testé multi-navigateurs
- [ ] Lighthouse : No cookies before consent
- [ ] Documentation complète
```

---

## 📚 Ressources RGPD

- [CNIL - Cookies](https://www.cnil.fr/fr/cookies-et-autres-traceurs)
- [RGPD.eu](https://gdpr.eu/)
- [Cookiebot RGPD Checker](https://www.cookiebot.com/en/website-checker/)

---

## 🎯 Récupération Code Lovable

### Étapes

1. **Clone repo Lovable** :
```bash
git clone https://github.com/smiollis/bateau-a-paris.git lovable-prototype
cd lovable-prototype
```

2. **Identifier composants cookie** :
```bash
# Chercher dans le code Lovable
find . -name "*cookie*" -o -name "*consent*"
```

3. **Copier dans projet production** :
```bash
# Copier composants UI (ajuster chemins)
cp lovable-prototype/src/components/CookieBanner.tsx \
   ../bateau-2026/src/components/cookie-consent/

cp lovable-prototype/src/components/CookieModal.tsx \
   ../bateau-2026/src/components/cookie-consent/
```

4. **Adapter le code** :
- Remplacer mock state par vrai hook
- Connecter aux fonctions du Provider
- Vérifier imports (Button, icons, etc.)

---

## 💡 Tips

1. **Dev mode** : Ajoute bouton debug pour reset consent
```typescript
// DevOnly.tsx
{process.env.NODE_ENV === 'development' && (
  <button onClick={() => useCookieConsent().resetConsent()}>
    Reset Cookies (Dev)
  </button>
)}
```

2. **GTM Preview** : Teste le tracking en mode preview GTM

3. **Cookie Audit** : Utilise l'extension Chrome "EditThisCookie" pour vérifier

4. **A/B Testing** : Track dans GTM quel % accepte/refuse

---

**Temps total estimé : 3-4h** pour implémentation complète + tests
