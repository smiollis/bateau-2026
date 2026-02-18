# Audit des Dependances — Un Bateau a Paris (Frontend)

**Date** : 18 fevrier 2026
**Auditeur** : Claude Code (Opus 4.6)
**Perimetre** : package.json, npm audit, npm outdated

---

## Score : 8.5/10

**Precedent** : 9.0/10 (17 fev 2026)
**Variation** : -0.5 (nouvelles vulns @lhci/cli, eslint minor outdated)

---

## 1. Inventaire des Dependances

### Production (16 packages)

| Package | Version | Role |
|---------|---------|------|
| next | 16.1.6 | Framework |
| react / react-dom | 19.2.3 | UI Runtime |
| next-intl | ^4.8.2 | i18n |
| framer-motion | ^12.34.0 | Animations |
| dompurify | ^3.3.1 | Sanitization HTML |
| lucide-react | ^0.563.0 | Icones |
| @radix-ui/* (4) | ^1.2.x | Composants UI accessibles |
| react-hook-form | ^7.71.1 | Formulaires |
| zod | ^4.3.6 | Validation schemas |
| resend | ^6.9.2 | Envoi emails |
| class-variance-authority | ^0.7.1 | Variantes CSS |
| clsx + tailwind-merge | ^2.1 / ^3.4 | Utilitaires classes |
| @tailwindcss/typography | ^0.5.19 | Prose styling |
| @vercel/analytics + speed-insights | ^1.6 / ^1.3 | Monitoring |
| yet-another-react-lightbox | ^3.28.0 | Galerie photos |

### Developpement (17 packages)

| Package | Version | Role |
|---------|---------|------|
| typescript | ^5 | Typage |
| tailwindcss | ^4 | CSS framework |
| eslint + eslint-config-next | ^9 / 16.1.6 | Linting |
| vitest + @vitest/coverage-v8 | ^4.0.18 | Tests unitaires |
| @testing-library/* (3) | ^6-16 | Testing React |
| @playwright/test | ^1.58.2 | Tests E2E |
| @axe-core/playwright | ^4.11.1 | Tests accessibilite |
| @lhci/cli | ^0.15.1 | Lighthouse CI |
| jsdom | ^28.0.0 | DOM virtuel tests |
| tsx | ^4.21.0 | Execution scripts TS |
| @vitejs/plugin-react | ^5.1.4 | Plugin Vite/React |
| @types/* (3) | varies | Types TS |
| @tailwindcss/postcss | ^4 | PostCSS integration |

---

## 2. Audit de Securite (npm audit)

**14 vulnerabilites** : 4 low, 10 moderate

### Vulnerabilites identifiees

| Severite | Package | Probleme | Impact |
|----------|---------|----------|--------|
| Moderate | `tmp` (<=0.2.3) | Ecriture fichier arbitraire via symlink | Via @lhci/cli (devDep uniquement) |
| Moderate | `inquirer` (3-9.x) | Via external-editor → tmp | Via @lhci/cli (devDep uniquement) |
| Low | `eslint` / `typescript-eslint` | Dependances vulnerables transitives | DevDep uniquement |

**Evaluation** : Toutes les vulns sont dans des **devDependencies** (@lhci/cli, eslint). Aucune vulnerabilite en production. Le risque reel est **negligeable** car ces packages ne sont pas inclus dans le bundle deploye.

---

## 3. Packages Obsoletes (npm outdated)

| Package | Actuel | Disponible | Type |
|---------|--------|------------|------|
| framer-motion | 12.34.0 | 12.34.1 | patch |
| next-intl | 4.8.2 | 4.8.3 | patch |
| lucide-react | 0.563.0 | 0.574.0 | minor |
| tailwind-merge | 3.4.0 | 3.4.1 | patch |
| jsdom | 28.0.0 | 28.1.0 | minor (dev) |
| react / react-dom | 19.2.3 | 19.2.4 | patch |
| @types/node | 20.19.33 | 25.2.3 | major (dev) |
| eslint | 9.39.2 | 10.0.0 | major (dev) |

**Evaluation** : Mises a jour mineures/patch disponibles. Rien de critique. `@types/node` en v20 est coherent avec le Node.js 20 utilise. ESLint 10 est un breaking change a planifier.

---

## 4. Analyse des Dependances Inutilisees

**Aucune dependance inutilisee detectee.** Toutes les dependances production sont importees dans le code source. La suppression de `sonner` (effectuee au sprint precedent) a ete confirmee.

---

## 5. Compatibilite Next.js 16

| Verification | Statut |
|--------------|--------|
| React 19 | OK (19.2.3) |
| next-intl v4 | OK (compatible Next 16) |
| framer-motion v12 | OK (ESM, compatible) |
| Tailwind v4 | OK (via @tailwindcss/postcss) |
| Radix UI | OK (versions recentes) |

---

## 6. Bundle Size (estimation)

| Dependance | Taille estimee (gzip) |
|------------|----------------------|
| framer-motion (LazyMotion) | ~25 KB |
| next-intl | ~8 KB |
| @radix-ui/* | ~12 KB total |
| dompurify | ~7 KB |
| lucide-react (tree-shaken) | ~2 KB/icone |
| react-hook-form + zod | ~15 KB |

**Total estime** : ~80-90 KB gzip (dependances tierces). Correct pour un site de cette complexite.

---

## 7. Recommandations

### Priorite Haute
1. **Mettre a jour les patches** : `npm update` pour framer-motion, next-intl, tailwind-merge, react, jsdom
2. **Planifier migration ESLint 10** quand eslint-config-next le supporte

### Priorite Moyenne
3. **@lhci/cli** : Surveiller une version corrigeant les vulns `tmp`/`inquirer`, ou envisager d'utiliser Lighthouse CI via GitHub Actions sans le CLI local
4. **lucide-react** : Mettre a jour vers 0.574.0 (nouvelles icones)

### Priorite Basse
5. **@types/node** : Rester en v20 tant que Node 20 est utilise
6. **Lock file** : S'assurer que `package-lock.json` est committe et a jour

---

## Resume

Les dependances sont bien gerees avec un stack moderne et coherent. Les 14 vulns npm sont toutes en devDependencies et n'impactent pas la production. Quelques mises a jour mineures a planifier. Score legerement en baisse par rapport au precedent audit a cause des nouvelles vulns transitives dans @lhci/cli.
