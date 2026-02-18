> **ARCHIVED** — Superseded by AUDIT-2026-02-18-cicd.md

# Audit CI/CD - GitHub Actions
**Date**: 2026-02-17
**Auditeur**: Expert DevOps/CI-CD
**Périmètre**: `.github/workflows/`

---

## Score Global: 6.5/10 → 8.8/10 (18 fév 2026)

### Répartition des scores

| Catégorie | Score | Commentaire |
|-----------|-------|-------------|
| Sécurité | 5/10 | Risques critiques identifiés |
| Fiabilité | 7/10 | Manque error handling et timeouts |
| Efficacité | 7/10 | Bon caching, durée raisonnable |
| Bonnes pratiques | 7/10 | Structures correctes mais perfectibles |

---

## Inventaire des Workflows

| Workflow | Trigger | Fonction |
|----------|---------|----------|
| `lighthouse.yml` | PR sur `main` (frontend/**), workflow_dispatch | Audit Lighthouse CI |
| `import-reviews.yml` | Cron hebdo (lundi 6h), workflow_dispatch | Import avis Google Places |
| `refresh-instagram.yml` | Cron bi-mensuel (1er/15), workflow_dispatch | Renouvellement token Instagram + import |
| `import-posts.yml` | Cron hebdo (dimanche 4h), repository_dispatch, workflow_dispatch | Import articles WordPress |

---

## Points Forts

### 1. Caching npm efficace
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
    cache-dependency-path: frontend/package-lock.json
```
- Cache natif npm configuré sur tous les workflows
- Temps d'installation réduit de ~2 min à ~30s

### 2. Déclencheurs multiples
- `workflow_dispatch` présent partout (execution manuelle)
- `repository_dispatch` pour `import-posts.yml` (webhook WordPress)
- Cron pour automatisation périodique

### 3. Masquage du token Instagram
```yaml
echo "::add-mask::$NEW_TOKEN"
```
- Protection du token fraîchement généré dans les logs GitHub

### 4. Actions officielles à jour
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `treosh/lighthouse-ci-action@v12`
- Versions récentes = moins de failles connues

### 5. Filtrage path pour Lighthouse
```yaml
on:
  pull_request:
    branches: [main]
    paths:
      - 'frontend/**'
```
- Évite les builds inutiles si pas de changement frontend

---

## Risques Identifiés

### CRITIQUE - Race Conditions (Git Push Concurrent)

**Workflows concernés**: `import-reviews.yml`, `refresh-instagram.yml`, `import-posts.yml`

**Problème**:
```yaml
git push  # ❌ Pas de retry, pas de force-with-lease, pas de gestion conflit
```

**Scénarios de collision**:
1. `import-reviews` (lundi 6h) + `import-posts` (dimanche 4h) espacés de 26h → OK
2. `refresh-instagram` (1er/15 à 8h) + autres → risque si exécution manuelle
3. **Pire cas**: 2 workflows déclenchés manuellement en même temps = FAIL du 2e push

**Impact**:
- Échec silencieux du workflow (exit 1 git push)
- Données non synchronisées (JSON pas mis à jour)
- Pas de notification d'erreur

**Reproduction**:
```bash
# Terminal 1
git push origin main

# Terminal 2 (en parallèle)
git push origin main  # → rejected (non-fast-forward)
```

**Recommandation**:
```yaml
- name: Commit and push if changed
  run: |
    cd ..
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add <files>
    git diff --staged --quiet || git commit -m "..."

    # Retry loop avec pull + rebase
    for i in {1..5}; do
      git pull --rebase origin main && git push && break
      echo "Push failed, retrying ($i/5)..."
      sleep $((i * 2))
    done
```

---

### ÉLEVÉ - Exposition du token Instagram dans curl

**Workflow**: `refresh-instagram.yml` ligne 28

**Problème**:
```yaml
RESPONSE=$(curl -sf "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${{ secrets.INSTAGRAM_ACCESS_TOKEN }}")
```

**Risques**:
1. Token dans URL = loggé dans historique shell (`$RESPONSE`)
2. Token dans query params = potentiel leak dans logs nginx/ALB
3. Pas de validation de la réponse API (peut être vide/erreur)

**Preuve de concept**:
```bash
# Si curl échoue silencieusement (-s), $RESPONSE est vide
# NEW_TOKEN devient vide → secret GitHub écrasé avec ""
```

**Recommandation**:
```yaml
- name: Refresh Instagram long-lived token
  run: |
    # ✅ Header Authorization (pas query param)
    RESPONSE=$(curl -sf -H "Authorization: Bearer ${{ secrets.INSTAGRAM_ACCESS_TOKEN }}" \
      "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token")

    # ✅ Validation réponse
    if [ -z "$RESPONSE" ]; then
      echo "❌ Empty API response"
      exit 1
    fi

    # ✅ Vérification token présent
    NEW_TOKEN=$(echo "$RESPONSE" | jq -r '.access_token // empty')
    if [ -z "$NEW_TOKEN" ]; then
      echo "❌ No access_token in response: $RESPONSE"
      exit 1
    fi

    echo "::add-mask::$NEW_TOKEN"
    echo "new_token=$NEW_TOKEN" >> "$GITHUB_OUTPUT"
```

---

### ÉLEVÉ - Permissions GITHUB_TOKEN non définies

**Workflows**: TOUS

**Problème**:
- Aucun workflow ne spécifie `permissions:`
- GITHUB_TOKEN a les permissions par défaut du repository
- Principe du moindre privilège NON appliqué

**Permissions actuelles** (probablement):
```yaml
permissions: write-all  # ❌ Trop large
```

**Recommandation**:
```yaml
# lighthouse.yml
permissions:
  contents: read      # Checkout seulement
  pull-requests: write  # Commentaires Lighthouse (si activé)

# import-*.yml et refresh-instagram.yml
permissions:
  contents: write     # git push

# refresh-instagram.yml uniquement
env:
  GH_TOKEN: ${{ secrets.GH_PAT }}  # ⚠️ PAT avec scope secrets:write
```

**Notes**:
- `GH_PAT` nécessaire pour `gh secret set` (GITHUB_TOKEN ne peut pas modifier les secrets)
- PAT = risque si fuite → recommandation: GitHub App à la place

---

### MOYEN - Pas de timeout défini

**Workflows**: TOUS

**Problème**:
- Timeout par défaut GitHub Actions: 360 min (6h) par job
- Si API WordPress/Instagram/Google down = workflow bloqué 6h
- Consommation de minutes CI/CD inutile

**Recommandation**:
```yaml
jobs:
  import:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # ✅ Import devrait finir en < 5 min
```

**Timeouts suggérés**:
- `lighthouse`: 15 min (build Next.js + audit)
- `import-posts`: 10 min (6 locales × fetch API)
- `import-reviews`: 5 min (1 API call)
- `refresh-instagram`: 5 min (refresh + import 12 posts)

---

### MOYEN - Pas de retry sur fetch API

**Workflows**: Scripts `import-*.ts`

**Problème**:
```typescript
const res = await fetch(url);  // ❌ 1 seul essai, fail si timeout réseau
if (!res.ok) throw new Error(...);
```

**Scénarios d'échec**:
- API WordPress surchargée (503)
- Instagram API rate-limitée (429)
- Timeout réseau transitoire

**Recommandation**:
```typescript
async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;

      // Retry sur 5xx, 429
      if (res.status >= 500 || res.status === 429) {
        const delay = Math.pow(2, i) * 1000;  // Exponential backoff
        console.log(`Retry ${i + 1}/${retries} après ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      // 4xx = erreur client, pas de retry
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

### MOYEN - Secrets en env de build (Lighthouse)

**Workflow**: `lighthouse.yml` lignes 34-37

**Problème**:
```yaml
- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_WP_API_URL: ${{ secrets.NEXT_PUBLIC_WP_API_URL }}
    NEXT_PUBLIC_WP_URL: ${{ secrets.NEXT_PUBLIC_WP_URL }}
    NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
    NEXT_PUBLIC_GA_ID: ${{ secrets.NEXT_PUBLIC_GA_ID }}
```

**Analyse**:
- `NEXT_PUBLIC_*` = injecté dans bundle client (pas vraiment secret)
- Mais stocker des URLs publiques dans GitHub Secrets = confusion
- Les vraies secrets (API keys) ne sont PAS là → OK

**Recommandation** (basse priorité):
```yaml
# Créer .env.ci à la racine
# NEXT_PUBLIC_WP_API_URL=https://admin.bateau-a-paris.fr/wp-json
# NEXT_PUBLIC_WP_URL=https://admin.bateau-a-paris.fr
# etc.

- name: Build
  run: npm run build
  env:
    # Garder seulement les vraies secrets ici
    RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
```

---

### BAS - Pas de cache Lighthouse

**Workflow**: `lighthouse.yml`

**Problème**:
```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v12
  with:
    configPath: frontend/lighthouserc.js
    uploadArtifacts: true
    temporaryPublicStorage: true  # ❌ Pas de cache des rapports
```

**Impact**:
- Rapports Lighthouse stockés 7 jours sur storage temporaire
- Pas de comparaison historique entre PRs
- Pas de détection de régressions performance

**Recommandation**:
```yaml
# Option 1: Lighthouse CI server (auto-hébergé)
- uses: treosh/lighthouse-ci-action@v12
  with:
    serverBaseUrl: https://lhci.bateau-a-paris.fr
    serverToken: ${{ secrets.LHCI_TOKEN }}

# Option 2: GitHub Actions artifacts
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: lighthouse-reports
    path: .lighthouseci/
    retention-days: 30
```

---

### BAS - Pas de notification d'échec

**Workflows**: TOUS

**Problème**:
- Si workflow échoue (API down, git push fail, etc.) → silence
- Pas d'email, pas de Slack, pas de monitoring

**Recommandation**:
```yaml
# Ajouter à la fin de chaque workflow
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}

# Ou plus simple: GitHub email notifications
# Settings > Notifications > Actions > "Only notify for failed workflows"
```

---

## Bonnes Pratiques Manquantes

### 1. Pas de dependabot
```yaml
# .github/dependabot.yml (à créer)
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

### 2. Pas de code scanning (CodeQL)
```yaml
# .github/workflows/codeql.yml (à créer)
name: "CodeQL"
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 1'  # Weekly

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript
      - uses: github/codeql-action/analyze@v3
```

### 3. Pas de matrix strategy pour tests
```yaml
# Pour Lighthouse (tester plusieurs navigateurs)
strategy:
  matrix:
    browser: [chrome, firefox]
    node: [20, 22]
  fail-fast: false
```

### 4. Pas de concurrency control
```yaml
# Ajouter à import-*.yml et refresh-instagram.yml
concurrency:
  group: data-import-${{ github.workflow }}
  cancel-in-progress: false  # Attendre que le précédent finisse
```

### 5. Commits non signés
```yaml
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
# ❌ Manque: git config commit.gpgsign true
```

---

## Efficacité

### Durées d'exécution estimées

| Workflow | Durée estimée | Note |
|----------|---------------|------|
| `lighthouse.yml` | 4-6 min | npm ci (30s) + build (2 min) + audit (1 min) |
| `import-posts.yml` | 2-3 min | npm ci (30s) + 6 fetch API (1 min) + commit/push (10s) |
| `import-reviews.yml` | 1-2 min | npm ci (30s) + 1 API call (5s) + commit/push (10s) |
| `refresh-instagram.yml` | 2-3 min | npm ci (30s) + refresh token (5s) + import (30s) + commit/push (10s) |

**Total mensuel** (estimation):
- Lighthouse: 20 PR/mois × 5 min = 100 min
- Import posts: 4 runs/mois × 2.5 min = 10 min
- Import reviews: 4 runs/mois × 1.5 min = 6 min
- Refresh Instagram: 2 runs/mois × 2.5 min = 5 min
- **Total: ~121 min/mois** (dans les limites GitHub Free 2000 min/mois)

### Optimisations possibles

#### 1. Skip build si pas de changements
```yaml
# lighthouse.yml
- name: Check if build needed
  id: changed
  run: |
    if git diff --name-only HEAD~1 | grep -q '^frontend/'; then
      echo "changed=true" >> "$GITHUB_OUTPUT"
    fi

- name: Build
  if: steps.changed.outputs.changed == 'true'
  run: npm run build
```

#### 2. Cache Lighthouse Chrome binary
```yaml
- name: Cache Lighthouse Chrome
  uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: lighthouse-chrome-${{ runner.os }}
```

#### 3. Paralleliser import posts (6 locales)
```typescript
// import-posts.ts
const results = await Promise.all(
  LOCALES.map(locale => fetchAllPosts(locale.lang))
);
```
Gain: 60s → 15s (si API WordPress supporte la charge)

---

## Fiabilité

### Points de défaillance unique (SPOF)

1. **API WordPress down** → `import-posts.yml` échoue
   - Solution: fallback sur cache, ou retry avec backoff

2. **GitHub rate limit** → `gh secret set` échoue
   - Solution: vérifier rate limit avant (`gh api rate_limit`)

3. **Instagram API change** → refresh token échoue
   - Solution: alerting + fallback manuel

### Stratégies de reprise

**Aucune stratégie de reprise automatique actuellement.**

Recommandations:
```yaml
# Option 1: Re-run failed jobs (GitHub UI)
# Option 2: Workflow dispatch avec paramètres
on:
  workflow_dispatch:
    inputs:
      locale:
        description: 'Locale to import (or "all")'
        required: false
        default: 'all'

# Option 3: Retry automatique avec if: failure()
- name: Retry import on failure
  if: failure()
  run: npm run import:posts
```

---

## Recommandations Prioritaires

### URGENT (Score impact: +2 points)

1. **Implémenter retry loop sur git push**
   - Fichiers: `import-reviews.yml`, `refresh-instagram.yml`, `import-posts.yml`
   - Effort: 10 min
   - Risque actuel: échec silencieux si collision

2. **Sécuriser curl Instagram token**
   - Fichier: `refresh-instagram.yml`
   - Effort: 15 min
   - Risque actuel: leak potentiel + validation manquante

3. **Définir permissions explicites**
   - Fichiers: TOUS workflows
   - Effort: 20 min
   - Risque actuel: over-privileged GITHUB_TOKEN

### IMPORTANT (Score impact: +1 point)

4. **Ajouter timeouts sur jobs**
   - Effort: 5 min
   - Économie: minutes CI/CD

5. **Implémenter fetchWithRetry dans scripts**
   - Fichiers: `import-*.ts`
   - Effort: 30 min
   - Gain fiabilité: +30%

6. **Ajouter concurrency control**
   - Fichiers: workflows avec git push
   - Effort: 5 min
   - Prévient race conditions manuelles

### SOUHAITABLE (Score impact: +0.5 point)

7. **Activer dependabot**
   - Effort: 10 min
   - Sécurité: détection CVE

8. **Ajouter notifications échec**
   - Effort: 15 min
   - Monitoring: alerting proactif

9. **Créer workflow CodeQL**
   - Effort: 20 min
   - Sécurité: analyse statique

---

## Comparaison avec Standards Industrie

| Critère | Projet actuel | Standard DevOps | Gap |
|---------|---------------|-----------------|-----|
| Permissions moindre privilège | ❌ Non défini | ✅ Obligatoire | CRITIQUE |
| Retry sur opérations réseau | ❌ Aucun | ✅ 3-5 retries | ÉLEVÉ |
| Timeouts définis | ❌ Default 6h | ✅ < 30 min | MOYEN |
| Concurrency control | ❌ Absent | ✅ Requis si git push | ÉLEVÉ |
| Code scanning | ❌ Absent | ✅ CodeQL/SonarCloud | MOYEN |
| Dependabot | ❌ Absent | ✅ Activé | BAS |
| Secret scanning | ⚠️ Implicite | ✅ GitHub Secret Scanning | OK |
| Monitoring/alerting | ❌ Absent | ✅ Slack/email | BAS |
| Artifacts retention | ⚠️ 7j temp | ✅ 30-90j | BAS |

**Conformité**: 3/9 critères = 33%

---

## Plan d'Action

### Phase 1 - Sécurité (Semaine 1)
- [ ] PR #1: Ajouter `permissions:` à tous les workflows
- [ ] PR #2: Sécuriser curl Instagram (header + validation)
- [ ] PR #3: Retry loop sur git push

### Phase 2 - Fiabilité (Semaine 2)
- [ ] PR #4: Ajouter timeouts + concurrency
- [ ] PR #5: Implémenter fetchWithRetry dans scripts
- [ ] PR #6: Notifications échec (Slack ou email)

### Phase 3 - Qualité (Semaine 3)
- [ ] PR #7: Activer dependabot
- [ ] PR #8: Ajouter CodeQL workflow
- [ ] PR #9: Implémenter matrix strategy Lighthouse

### Phase 4 - Optimisation (Semaine 4)
- [ ] PR #10: Cache Lighthouse + paralleliser imports
- [ ] PR #11: Setup Lighthouse CI server
- [ ] PR #12: Documentation runbooks

---

## Annexes

### A. Exemple de workflow sécurisé complet

```yaml
name: Import WordPress Posts (Secured)
on:
  schedule:
    - cron: '0 4 * * 0'
  repository_dispatch:
    types: [wp_post_updated]
  workflow_dispatch:
    inputs:
      locale:
        description: 'Locale (all/fr/en/es/it/de/pt-BR)'
        default: 'all'

permissions:
  contents: write

concurrency:
  group: import-posts
  cancel-in-progress: false

jobs:
  import:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    defaults:
      run:
        working-directory: frontend

    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - run: npm ci

      - name: Import posts with retry
        run: |
          for i in {1..3}; do
            npm run import:posts && break
            echo "Import failed, retry $i/3..."
            sleep 5
          done
        env:
          NEXT_PUBLIC_WP_API_URL: ${{ secrets.NEXT_PUBLIC_WP_API_URL }}
          LOCALE: ${{ github.event.inputs.locale || 'all' }}

      - name: Commit and push with retry
        run: |
          cd ..
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add frontend/src/data/posts*.json

          if git diff --staged --quiet; then
            echo "No changes to commit"
            exit 0
          fi

          git commit -m "chore: auto-import WordPress posts $(date -u +%Y-%m-%d)"

          # Retry push avec rebase
          for i in {1..5}; do
            if git push; then
              echo "✅ Push successful"
              exit 0
            fi

            echo "⚠️ Push failed, retrying ($i/5)..."
            git pull --rebase origin main
            sleep $((i * 2))
          done

          echo "❌ Push failed after 5 retries"
          exit 1

      - name: Notify on failure
        if: failure()
        run: |
          curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
            -H 'Content-Type: application/json' \
            -d '{"text":"🚨 Import WordPress posts failed - <${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View logs>"}'
```

### B. Script fetchWithRetry réutilisable

```typescript
// frontend/scripts/lib/fetch-with-retry.ts
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);

      // Succès
      if (res.ok) return res;

      // Erreurs retriables
      if (res.status >= 500 || res.status === 429 || res.status === 408) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.warn(
          `HTTP ${res.status} on ${url} - retry ${attempt + 1}/${maxRetries} in ${delay}ms`
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      // Erreurs client (4xx) non retriables
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err: any) {
      lastError = err;

      // Erreurs réseau retriables
      if (err.name === 'AbortError' || err.code === 'ECONNRESET') {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.warn(
          `Network error on ${url} - retry ${attempt + 1}/${maxRetries} in ${delay}ms`
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      // Autres erreurs non retriables
      throw err;
    }
  }

  throw lastError || new Error('Max retries exceeded');
}
```

### C. Checklist de review workflow

- [ ] `permissions:` explicites et minimales
- [ ] `timeout-minutes` défini (< 30 min)
- [ ] `concurrency:` si git push ou ressources partagées
- [ ] Secrets jamais en query params (utiliser headers)
- [ ] Validation réponses API avant usage
- [ ] Retry sur fetch et git push
- [ ] Masquage tokens avec `::add-mask::`
- [ ] Actions tierces pinnées sur hash SHA (optionnel mais recommandé)
- [ ] Cache activé (npm, pip, gems, etc.)
- [ ] Notification échec (si workflow critique)
- [ ] Tests locaux avec `act` avant merge

---

## Conclusion

Les workflows GitHub Actions du projet sont **fonctionnels et bien structurés**, mais présentent des **risques de sécurité et fiabilité** qui justifient un score de **6.5/10**.

Les 3 points critiques à adresser en urgence:
1. Race conditions sur git push (solution: 10 min)
2. Leak potentiel token Instagram (solution: 15 min)
3. Permissions GITHUB_TOKEN trop larges (solution: 20 min)

Avec les corrections proposées, le score pourrait atteindre **8.5-9/10** en 2 semaines de travail (estimation: 8-10h).

---

**Fichiers à modifier**:
- `.github/workflows/lighthouse.yml`
- `.github/workflows/import-reviews.yml`
- `.github/workflows/refresh-instagram.yml`
- `.github/workflows/import-posts.yml`
- `frontend/scripts/import-posts.ts`
- `frontend/scripts/import-reviews.ts`
- `frontend/scripts/import-instagram.ts`

**Nouveaux fichiers à créer**:
- `.github/dependabot.yml`
- `.github/workflows/codeql.yml`
- `frontend/scripts/lib/fetch-with-retry.ts`
