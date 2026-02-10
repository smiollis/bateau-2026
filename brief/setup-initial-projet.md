# Setup Initial Projet - bateau-a-paris.fr

**Guide ultra-pratique pour démarrer le projet proprement**

---

## 🎯 Vue d'Ensemble

```
Aujourd'hui, tu vas mettre en place:
├── Git repos (Lovable + Production)
├── WordPress local (Portainer)
├── Next.js local (VS Code)
└── Environnement dev complet
```

**Durée**: 2-3h

---

## 📦 ÉTAPE 1: Cloner les Repos Git (10 min)

### Repo Lovable (référence design)

```bash
# Créer dossier projet principal
mkdir -p ~/Projects/bateau-a-paris
cd ~/Projects/bateau-a-paris

# Cloner prototype Lovable (lecture seule)
git clone https://github.com/smiollis/bateau-a-paris.git lovable-prototype

# Vérifier
cd lovable-prototype
ls -la
# Tu devrais voir: src/, public/, package.json, etc.
```

**Usage**: Ce repo contient le design validé par Lovable.  
**Ne PAS modifier** - juste référence pour copier composants UI.

---

### Repo Production

```bash
# Retour au dossier parent
cd ~/Projects/bateau-a-paris

# Cloner repo production
git clone https://github.com/smiollis/bateau-2026.git
cd bateau-2026

# Créer structure initiale si vide
mkdir -p {wordpress-docker,frontend,docs}

# Créer branche develop
git checkout -b develop

# Premier commit structure
git add .
git commit -m "Initial project structure"
git push -u origin develop
```

**Structure projet après clone**:

```
~/Projects/bateau-a-paris/
├── lovable-prototype/          # Design Lovable (READ-ONLY)
│   ├── src/
│   ├── public/
│   └── package.json
└── bateau-2026/                # Projet production
    ├── wordpress-docker/       # Config WordPress local
    ├── frontend/               # Next.js (à créer)
    ├── docs/                   # Documentation
    └── README.md
```

---

## 🐳 ÉTAPE 2: WordPress Local avec Portainer (45 min)

### 2.1 Préparer Configuration

```bash
cd ~/Projects/bateau-a-paris/bateau-2026
mkdir -p wordpress-docker/{database,php-config}
cd wordpress-docker
```

### 2.2 Créer docker-compose.yml

**Fichier**: `wordpress-docker/docker-compose.yml`

```yaml
version: '3.9'

services:
  db:
    image: mariadb:10.3
    container_name: bateau_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bateau_paris
      MYSQL_USER: bateau_user
      MYSQL_PASSWORD: bateau_pass
    volumes:
      - db_data:/var/lib/mysql
      - ./database:/docker-entrypoint-initdb.d
    networks:
      - bateau_network
    ports:
      - "3307:3306"

  wordpress:
    image: wordpress:6.9-php8.2-apache
    container_name: bateau_wordpress
    restart: unless-stopped
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_NAME: bateau_paris
      WORDPRESS_DB_USER: bateau_user
      WORDPRESS_DB_PASSWORD: bateau_pass
      WORDPRESS_CONFIG_EXTRA: |
        define('WP_MEMORY_LIMIT', '1024M');
        define('WP_MAX_MEMORY_LIMIT', '1024M');
        define('WP_DEBUG', true);
        define('WP_DEBUG_LOG', true);
        define('WP_DEBUG_DISPLAY', false);
    volumes:
      - ./wordpress:/var/www/html
      - ./php-config/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
    networks:
      - bateau_network
    ports:
      - "8080:80"

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: bateau_phpmyadmin
    restart: unless-stopped
    depends_on:
      - db
    environment:
      PMA_HOST: db
      PMA_USER: root
      PMA_PASSWORD: root
      UPLOAD_LIMIT: 256M
    networks:
      - bateau_network
    ports:
      - "8081:80"

  mailhog:
    image: mailhog/mailhog:latest
    container_name: bateau_mailhog
    restart: unless-stopped
    networks:
      - bateau_network
    ports:
      - "8025:8025"
      - "1025:1025"

  redis:
    image: redis:7-alpine
    container_name: bateau_redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    networks:
      - bateau_network
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

volumes:
  db_data:
  redis_data:

networks:
  bateau_network:
    driver: bridge
```

### 2.3 Config PHP

**Fichier**: `wordpress-docker/php-config/uploads.ini`

```ini
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 900
max_input_time = 5000
memory_limit = 1024M
```

### 2.4 Copier Dump SQL

```bash
# Tu as déjà exporté la DB en Phase 1 (voir guide-phase-1-step-by-step.md)
# Copier le dump dans database/

cp ../backups/bateau_prod_20260124.sql.gz ./database/
gunzip ./database/bateau_prod_20260124.sql.gz
mv ./database/bateau_prod_20260124.sql ./database/init.sql
```

### 2.5 Déployer dans Portainer

**Option A: Via Portainer UI** (Recommandé)

1. Ouvrir Portainer: http://localhost:9000 (ou ton URL Portainer)
2. Stacks > Add stack
3. Name: `bateau-a-paris-local`
4. Build method: Web editor
5. Copier-coller contenu de `docker-compose.yml`
6. Deploy the stack
7. Attendre 2-3 min (import DB automatique)

**Option B: Via CLI**

```bash
# Si tu préfères CLI
docker-compose up -d

# Vérifier containers
docker-compose ps
# Tous doivent être "Up"
```

### 2.6 Vérifier Installation

```bash
# Attendre que DB soit prête
docker logs bateau_db -f
# Attendre: "ready for connections"
# Ctrl+C pour arrêter logs

# Tester WordPress
curl -I http://localhost:8080
# Doit retourner: HTTP/1.1 200 OK ou 301/302

# Ouvrir navigateur
# http://localhost:8080 → Site WordPress
# http://localhost:8080/wp-admin → Admin (credentials prod)
# http://localhost:8081 → phpMyAdmin (root/root)
# http://localhost:8025 → Mailhog
```

### 2.7 Update URLs WordPress

```bash
# Se connecter au container WordPress
docker exec -it bateau_wordpress bash

# Installer WP-CLI
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp

# Search-replace URLs
wp search-replace \
  'https://bateau-a-paris.fr' \
  'http://localhost:8080' \
  --all-tables \
  --allow-root

# Vérifier
wp option get siteurl --allow-root
# Doit retourner: http://localhost:8080

exit  # Sortir du container
```

### 2.8 Tests Bookly

```bash
# Trouver page réservation
docker exec bateau_wordpress wp post list \
  --post_type=page \
  --s="reservation" \
  --allow-root

# Ouvrir dans navigateur
# http://localhost:8080/reservation
# Le formulaire Bookly doit s'afficher
```

**✅ Checkpoint WordPress**: 
- [ ] 5 containers running
- [ ] http://localhost:8080 accessible
- [ ] wp-admin fonctionne
- [ ] Bookly visible
- [ ] phpMyAdmin OK

---

## 💻 ÉTAPE 3: Setup Next.js avec VS Code (1h)

### 3.1 Installer Extensions VS Code

**Ouvrir VS Code**:
```bash
cd ~/Projects/bateau-a-paris/bateau-2026
code .
```

**Créer fichier extensions recommandées**:

`.vscode/extensions.json`:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "streetsidesoftware.code-spell-checker",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets",
    "ms-azuretools.vscode-docker"
  ]
}
```

**Installer extensions**:
- VS Code va proposer d'installer automatiquement
- Ou: Ctrl+Shift+P → "Extensions: Show Recommended Extensions"

### 3.2 Settings VS Code

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 3.3 Créer Projet Next.js

**Terminal dans VS Code** (Ctrl+`):

```bash
# Vérifier Node version
node -v
# Doit être >= 18

# Créer projet Next.js
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm

# Répondre aux prompts:
# ✔ Would you like to use ESLint? … Yes
# ✔ Would you like to use Turbopack? … No
# ✔ Would you like to customize the import alias? … No

cd frontend
```

### 3.4 Installer Dépendances

```bash
# Production dependencies
npm install \
  framer-motion \
  next-intl \
  yet-another-react-lightbox \
  react-hook-form \
  @hookform/resolvers \
  zod \
  @tanstack/react-query \
  clsx \
  tailwind-merge

# Dev dependencies
npm install -D \
  @types/node \
  eslint-config-prettier \
  prettier \
  prettier-plugin-tailwindcss
```

### 3.5 Configuration Prettier

`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`:
```
node_modules
.next
out
build
dist
```

### 3.6 Tailwind Config Custom

`tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        gold: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        'gradient-cta': 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 3.7 Variables Environnement

`.env.local`:
```env
# WordPress API
NEXT_PUBLIC_WP_API_URL=http://localhost:8080/wp-json
NEXT_PUBLIC_WP_URL=http://localhost:8080

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3.8 Structure Fichiers

```bash
# Créer structure complète
mkdir -p src/{components,lib,types,hooks,config}
mkdir -p src/components/{ui,layout,sections,wordpress}
mkdir -p src/app/api
mkdir -p public/{images,fonts,locales}

# Créer fichiers vides
touch src/lib/{wordpress.ts,utils.ts,constants.ts}
touch src/types/{wordpress.d.ts,global.d.ts}
touch src/config/{site.ts,navigation.ts}
touch src/hooks/useWordPress.ts
touch public/locales/{fr.json,en.json}
```

### 3.9 Premier Composant (Test)

`src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`src/components/ui/button.tsx`:
```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg font-semibold transition-all',
        variant === 'primary' && 'bg-gradient-cta text-white hover:scale-105',
        variant === 'secondary' && 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

`src/app/page.tsx`:
```typescript
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8">Un Bateau à Paris</h1>
      <p className="text-xl text-gray-600 mb-8">Croisières privées sur la Seine</p>
      <div className="flex gap-4">
        <Button variant="primary">Réserver</Button>
        <Button variant="secondary">Découvrir</Button>
      </div>
    </div>
  );
}
```

### 3.10 Tester Next.js

```bash
npm run dev

# Ouvrir navigateur: http://localhost:3000
# Tu devrais voir ton site avec 2 boutons stylisés
```

### 3.11 Commit Initial

```bash
# Dans frontend/
git add .
git commit -m "Setup Next.js with Tailwind and basic structure"

# Push
cd ..  # Retour à bateau-2026/
git add .
git commit -m "Add Next.js frontend with initial config"
git push origin develop
```

**✅ Checkpoint Next.js**: 
- [ ] npm run dev fonctionne
- [ ] http://localhost:3000 accessible
- [ ] Boutons stylisés visibles
- [ ] Structure fichiers OK
- [ ] Git commit fait

---

## 🚀 ÉTAPE 4: Vérification Complète (15 min)

### Services Running

```bash
# Vérifier tous les services
docker ps

# Tu dois voir:
# bateau_wordpress  (Up)
# bateau_db         (Up)
# bateau_phpmyadmin (Up)
# bateau_mailhog    (Up)
# bateau_redis      (Up)
```

### URLs Accessibles

Ouvrir dans navigateur:
- ✅ http://localhost:3000 → Next.js
- ✅ http://localhost:8080 → WordPress
- ✅ http://localhost:8080/wp-admin → Admin WP
- ✅ http://localhost:8081 → phpMyAdmin
- ✅ http://localhost:8025 → Mailhog

### Repos Git

```bash
# Vérifier repos
cd ~/Projects/bateau-a-paris

# Lovable (read-only)
cd lovable-prototype
git status
# Doit être clean (pas de modifs)

# Production
cd ../bateau-2026
git status
# Doit être clean ou sur develop avec commits

git log --oneline
# Doit montrer tes commits
```

---

## 📚 Documentation Créée

```bash
# Créer README.md principal
cd ~/Projects/bateau-a-paris/bateau-2026
```

`README.md`:
```markdown
# Un Bateau à Paris - Projet Headless

Architecture Next.js 14 + WordPress

## Repos

- **Lovable**: https://github.com/smiollis/bateau-a-paris (design)
- **Production**: https://github.com/smiollis/bateau-2026 (code)

## Structure

\`\`\`
bateau-2026/
├── wordpress-docker/  # WordPress local (Portainer)
├── frontend/          # Next.js 14
└── docs/              # Documentation
\`\`\`

## Quick Start

### WordPress (Portainer)
\`\`\`bash
cd wordpress-docker
docker-compose up -d
# → http://localhost:8080
\`\`\`

### Next.js
\`\`\`bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
\`\`\`

## URLs Dev

- Next.js: http://localhost:3000
- WordPress: http://localhost:8080
- wp-admin: http://localhost:8080/wp-admin
- phpMyAdmin: http://localhost:8081
- Mailhog: http://localhost:8025

## Branches

- \`main\`: Production (Vercel)
- \`develop\`: Development (preprod OVH)

## Documentation

Voir \`docs/\` pour guides détaillés.
```

---

## ✅ Checklist Finale

```
Setup Complet:
- [x] Repos Git clonés (Lovable + Production)
- [x] Branche develop créée
- [x] WordPress Portainer running
- [x] DB importée et URLs updated
- [x] Bookly testé
- [x] VS Code configuré (extensions + settings)
- [x] Next.js créé et configuré
- [x] Dépendances installées
- [x] Tailwind custom config
- [x] Premier composant Button
- [x] npm run dev fonctionne
- [x] Git commits faits
- [x] README.md créé
- [x] 5 URLs accessibles

Services Running:
✅ bateau_wordpress (port 8080)
✅ bateau_db (port 3307)
✅ bateau_phpmyadmin (port 8081)
✅ bateau_mailhog (port 8025)
✅ bateau_redis (port 6379)
✅ Next.js dev (port 3000)
```

---

## 🎯 Prochaines Étapes

Tu es maintenant prêt pour:
- **Phase 2**: Plugin WordPress Headless + Template Bookly
- **Phase 3**: Récupération composants Lovable
- **Phase 4**: Développement pages Next.js

**Tout est en place ! 🚀**

---

## 🆘 Troubleshooting

### WordPress ne démarre pas

```bash
# Vérifier logs
docker logs bateau_wordpress -f

# Problème commun: port 8080 déjà utilisé
# Solution: changer port dans docker-compose.yml
# ports: - "8081:80" au lieu de 8080
```

### Next.js erreur au démarrage

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Clear cache Next.js
rm -rf .next
npm run dev
```

### Git push rejected

```bash
# Si première fois
git remote -v  # Vérifier remote

# Forcer push develop (première fois)
git push -u origin develop --force
```

---

**Document créé**: [DATE]  
**Version**: 1.0  
**Auteur**: Claude pour Seb
