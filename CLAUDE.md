# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Djecom Sports — site vitrine d'une agence de marketing sportif basée au Québec (clientèle francophone canadienne). Next.js 16 + PostgreSQL, avec landing page publique et dashboard admin pour la gestion des leads et partenaires.

## Commands

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Linting (next lint)
```

### Base de données (Prisma)

```bash
npx prisma migrate dev      # Appliquer les migrations en dev
npx prisma migrate deploy   # Appliquer les migrations en production
npx prisma generate         # Générer le client Prisma (output: src/generated/prisma/)
```

## Architecture

### Stack

- **Framework :** Next.js 16.1.6 (App Router) + React 19 + TypeScript 5.9
- **Styling :** Tailwind CSS 4.2 + Framer Motion (animations)
- **BDD :** PostgreSQL via Prisma ORM 7.5 (adapter `@prisma/adapter-pg`)
- **Package manager :** pnpm
- **Icônes :** lucide-react

### Structure des routes

```
src/app/
├── page.tsx              # Landing page publique (Hero, Services, Portfolio, Contact)
├── layout.tsx            # Layout racine (metadata SEO, JSON-LD)
├── admin/
│   ├── layout.tsx        # Wrapper d'authentification admin
│   ├── page.tsx          # Dashboard leads
│   └── partners/page.tsx # Gestion des partenaires
└── api/
    ├── auth/route.ts     # POST login / DELETE logout / GET check session
    ├── leads/route.ts    # POST créer / GET lister
    ├── leads/[id]/route.ts
    ├── partners/route.ts
    ├── partners/[id]/route.ts
    └── upload/route.ts   # Upload de fichiers
```

### Authentification

Session cookie HTTP-only (`admin_session`) validée contre `ADMIN_SECRET`. Pas de JWT — simple comparaison de token.

### Base de données

Schéma Prisma dans `prisma/schema.prisma`. Deux tables :
- **leads** — soumissions du formulaire de contact (statuts : NEW, CONTACTED, QUALIFIED, CONVERTED, LOST)
- **partners** — partenaires/clients affichés sur le site

Le client Prisma est généré dans `src/generated/prisma/` (gitignored). L'instance singleton est dans `src/lib/prisma.ts`.

### Variables d'environnement

- `DATABASE_URL` — chaîne de connexion PostgreSQL
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — identifiants admin
- `ADMIN_SECRET` — clé de session pour les cookies

## Notes de développement

- Les images sont en mode `unoptimized: true` dans `next.config.ts`
- Le design utilise un style glass morphism avec orbes de gradient animés
- Pas de framework de tests configuré
- Le client Prisma est importé depuis `@/generated/prisma`
