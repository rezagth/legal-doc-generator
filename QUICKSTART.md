# ⚡ Démarrage Rapide - 5 Minutes

## 🎯 Ce que vous allez faire

Lancer le SaaS de générateur de documents légaux en local en moins de 5 minutes.

## ✅ Prérequis

- Node.js 18+ installé
- PostgreSQL installé OU compte Supabase (gratuit)
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation Express

### Option 1 : Avec Supabase (Recommandé - Plus simple)

```bash
# 1. Aller dans le dossier du projet
cd legal-docs-generator

# 2. Les dépendances sont déjà installées ✅

# 3. Créer un compte Supabase gratuit
# → https://supabase.com
# → Créer un nouveau projet
# → Copier l'URL de connexion PostgreSQL

# 4. Configurer .env
cp .env.example .env

# Éditer .env et ajouter :
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
# NEXTAUTH_SECRET="run: openssl rand -base64 32"
# NEXTAUTH_URL="http://localhost:3000"

# 5. Initialiser la base de données
npx prisma generate
npx prisma db push

# 6. Lancer le projet ! 🎉
npm run dev
```

Ouvrir http://localhost:3000 → Votre SaaS est prêt ! ✨

### Option 2 : Avec PostgreSQL Local

```bash
# 1. Installer PostgreSQL
# macOS: brew install postgresql
# Windows: https://www.postgresql.org/download/

# 2. Créer la base
createdb legal_docs_db

# 3. Configurer .env
cp .env.example .env

# DATABASE_URL="postgresql://localhost:5432/legal_docs_db"
# NEXTAUTH_SECRET="run: openssl rand -base64 32"
# NEXTAUTH_URL="http://localhost:3000"

# 4. Initialiser et lancer
npx prisma generate
npx prisma db push
npm run dev
```

## 🎨 Tester le générateur

1. **Aller sur** http://localhost:3000
2. **Cliquer** sur "Commencer gratuitement"
3. **Remplir le formulaire** :
   - Choisir "Mentions Légales"
   - Sélectionner votre type d'activité
   - Remplir vos informations
4. **Générer** le document
5. **Télécharger** en PDF, HTML ou Markdown

## 📁 Structure Rapide

```
Fichiers importants :
├── app/page.tsx                    → Landing page
├── app/generate/page.tsx           → Page de génération
├── components/document-form.tsx    → Formulaire
├── lib/templates/legal-templates.ts → Templates légaux
└── prisma/schema.prisma            → Base de données
```

## 🎯 Prochaines Étapes

### 1. Personnaliser les templates

Éditer `lib/templates/legal-templates.ts` pour adapter les textes.

### 2. Ajouter l'authentification

```bash
# Installer bcryptjs
npm install bcryptjs @types/bcryptjs

# Créer app/api/auth/[...nextauth]/route.ts
# Voir SETUP.md pour le code complet
```

### 3. Activer les paiements Stripe

```bash
# Installer Stripe
npm install stripe @stripe/stripe-js

# Configurer dans .env :
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_PUBLIC_KEY="pk_test_..."
```

### 4. Générer des PDF

```bash
# Installer react-pdf
npm install @react-pdf/renderer

# Créer lib/pdf-generator.ts
```

## 🐛 Problèmes Courants

### Erreur Prisma

```bash
# Solution :
npx prisma generate
npx prisma db push
```

### Port 3000 déjà utilisé

```bash
# Utiliser un autre port :
PORT=3001 npm run dev
```

### Erreur d'import

```bash
# Vérifier que le chemin commence par @/
import { Button } from '@/components/ui/button'
```

## 🎓 Apprendre Plus

- **Documentation complète** : Voir DOCUMENTATION.md
- **Configuration avancée** : Voir SETUP.md
- **Architecture** : Voir DOCUMENTATION.md section "Architecture"

## 💡 Tips

### Développement rapide

```bash
# Terminal 1 : Watch Prisma
npx prisma studio

# Terminal 2 : Dev server
npm run dev
```

### Hot Reload

Les modifications sont automatiquement reloadées. Pas besoin de redémarrer le serveur !

### Debug

```typescript
// Ajouter dans n'importe quel composant
console.log('Debug:', data)
```

## 🎨 Personnalisation Rapide

### Changer les couleurs

Éditer `tailwind.config.ts` :

```typescript
colors: {
  primary: '#2563eb', // Votre couleur
  secondary: '#9333ea',
}
```

### Modifier le logo

Remplacer dans `app/page.tsx` :

```tsx
<span className="font-bold text-xl">Votre Nom</span>
```

### Ajouter une page

```bash
# Créer app/ma-page/page.tsx
```

## 🚢 Déployer en Production

### Vercel (1 clic)

```bash
# 1. Push sur GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Aller sur vercel.com
# 3. Import GitHub repo
# 4. Ajouter variables d'environnement
# 5. Deploy ! 🚀
```

## ✨ Fonctionnalités Actuelles

- ✅ Landing page moderne avec animations
- ✅ Formulaire multi-étapes dynamique
- ✅ Génération de 3 types de documents
- ✅ Templates conformes RGPD
- ✅ Export HTML + Markdown
- ✅ Design responsive
- ✅ Animations Framer Motion

## 🔜 À Venir

- [ ] Authentification NextAuth
- [ ] Dashboard utilisateur
- [ ] Export PDF
- [ ] Paiements Stripe
- [ ] Multi-langue

## 📞 Besoin d'aide ?

- **Documentation** : Lire DOCUMENTATION.md
- **Setup détaillé** : Lire SETUP.md
- **Issues** : Créer une issue GitHub

---

**C'est parti ! 🚀**

*Vous avez maintenant un SaaS moderne et fonctionnel !*
