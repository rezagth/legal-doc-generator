# 🚀 Guide de Configuration - Legal Docs Generator

## ✅ Ce qui a été créé

### 1. Structure du projet
- ✅ Projet Next.js 15 initialisé avec TypeScript et Tailwind
- ✅ Dépendances installées (ShadCN UI, Framer Motion, Prisma, etc.)
- ✅ Architecture complète des dossiers

### 2. Base de données
- ✅ Schéma Prisma complet avec tous les modèles
- ✅ Support des documents, utilisateurs, abonnements
- ✅ Relations et enums configurés

### 3. Templates de documents
- ✅ Mentions légales conformes LCEN
- ✅ Politique de confidentialité RGPD
- ✅ CGV complètes
- ✅ Adaptation selon le type d'activité

### 4. Interface utilisateur
- ✅ Landing page moderne avec animations Framer Motion
- ✅ Formulaire multi-étapes dynamique
- ✅ Composants ShadCN UI (Button, Input, Card, Label)
- ✅ Design responsive et moderne

### 5. API
- ✅ Route de génération de documents
- ✅ Conversion Markdown → HTML
- ✅ Sauvegarde en base de données

## 📋 Prochaines étapes

### Étape 1 : Configuration de la base de données

```bash
# 1. Créer une base PostgreSQL (Supabase recommandé)
# Aller sur https://supabase.com et créer un projet

# 2. Copier l'URL de connexion et l'ajouter dans .env
cp .env.example .env
# Éditer .env et ajouter DATABASE_URL

# 3. Initialiser la base
npx prisma generate
npx prisma db push
```

### Étape 2 : Configuration NextAuth (Authentification)

Créer `app/api/auth/[...nextauth]/route.ts` :

```typescript
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
          return null
        }

        return user
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### Étape 3 : Génération PDF

Installer les dépendances supplémentaires :

```bash
npm install @react-pdf/renderer
```

Créer `lib/pdf-generator.ts` pour générer les PDF à partir du HTML.

### Étape 4 : Dashboard utilisateur

Créer `app/dashboard/page.tsx` pour afficher les documents de l'utilisateur.

### Étape 5 : Intégration Stripe

```bash
npm install stripe @stripe/stripe-js
```

Configurer les webhooks Stripe et les plans d'abonnement.

### Étape 6 : Tests et lancement

```bash
# Lancer en dev
npm run dev

# Build pour production
npm run build

# Déployer sur Vercel
vercel
```

## 🔑 Variables d'environnement requises

Voir `.env.example` pour la liste complète. Les essentielles :

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont dans `tailwind.config.ts` :
- Bleu : `#2563eb` (blue-600)
- Purple : `#9333ea` (purple-600)

### Templates
Les templates sont dans `lib/templates/legal-templates.ts`. Vous pouvez les personnaliser selon vos besoins.

## 📚 Ressources

- [Documentation Next.js 15](https://nextjs.org/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)

## 🐛 Debugging

Si vous rencontrez des problèmes :

1. **Erreur Prisma** : Vérifier DATABASE_URL et lancer `npx prisma generate`
2. **Erreur d'import** : Vérifier les chemins avec `@/` (configuré dans tsconfig.json)
3. **Erreur de build** : Lancer `npm run lint` puis corriger les erreurs

## 💡 Améliorations futures

- [ ] Export PDF avec react-pdf
- [ ] Multi-langue (EN, ES, DE)
- [ ] IA auto-remplissage (GPT-4)
- [ ] Éditeur WYSIWYG pour personnaliser les documents
- [ ] Templates sectoriels (santé, finance, etc.)
- [ ] API publique
- [ ] Intégrations (WordPress, Shopify)

## 🎯 Objectifs de performance

- ⚡ Génération de document < 2 secondes
- 🎨 Score Lighthouse > 90
- 📱 100% responsive
- ♿ Accessibilité WCAG AA

---

**Bon développement ! 🚀**
