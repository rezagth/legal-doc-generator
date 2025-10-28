# 📚 Documentation Complète - Legal Docs Generator

## 🎯 Vue d'ensemble

Legal Docs Generator est un **SaaS moderne** qui permet de générer automatiquement des documents légaux conformes RGPD en quelques minutes. Le projet utilise les dernières technologies web pour offrir une expérience utilisateur exceptionnelle.

## 🏗️ Architecture

### Stack Technique

```
Frontend:
├── Next.js 15 (App Router)
├── React 18
├── TypeScript
├── Tailwind CSS
├── ShadCN UI Components
└── Framer Motion

Backend:
├── Next.js API Routes
├── Prisma ORM
├── PostgreSQL
└── NextAuth.js

Services:
├── Stripe (Paiements)
├── Supabase (Database + Storage)
└── Vercel (Hosting)
```

### Structure des Fichiers

```
legal-docs-generator/
│
├── app/                                    # Next.js 15 App Router
│   ├── page.tsx                           # Landing page
│   ├── generate/
│   │   └── page.tsx                       # Page de génération
│   ├── dashboard/
│   │   ├── page.tsx                       # Dashboard principal
│   │   └── documents/
│   │       └── [id]/page.tsx              # Vue détaillée document
│   └── api/
│       ├── auth/[...nextauth]/route.ts    # NextAuth
│       └── documents/
│           ├── generate/route.ts          # Génération documents
│           ├── [id]/route.ts              # CRUD documents
│           └── pdf/route.ts               # Export PDF
│
├── components/
│   ├── ui/                                # Composants ShadCN UI
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── label.tsx
│   ├── document-form.tsx                  # Formulaire multi-étapes
│   ├── hero-section.tsx                   # Hero animé
│   └── navbar.tsx                         # Navigation
│
├── lib/
│   ├── templates/
│   │   └── legal-templates.ts             # Générateurs de documents
│   ├── prisma.ts                          # Client Prisma
│   ├── utils.ts                           # Utilitaires
│   └── pdf-generator.ts                   # Générateur PDF
│
├── prisma/
│   └── schema.prisma                      # Modèles de données
│
├── public/                                # Assets statiques
│
├── .env.example                           # Variables d'environnement
├── SETUP.md                               # Guide de configuration
└── README.md                              # Documentation principale
```

## 💾 Modèle de Données

### User
```typescript
{
  id: string
  email: string
  name?: string
  password?: string (hashed)
  createdAt: DateTime
  documents: Document[]
  subscription: Subscription
}
```

### Document
```typescript
{
  id: string
  userId: string
  type: 'LEGAL_NOTICE' | 'PRIVACY_POLICY' | 'TERMS_OF_SERVICE'
  businessType: 'FREELANCE' | 'ECOMMERCE' | 'SAAS' | 'BLOG' | 'CONSULTING' | 'OTHER'
  companyName: string
  // ... autres champs
  htmlContent: string
  markdownContent: string
  pdfUrl?: string
  createdAt: DateTime
}
```

### Subscription
```typescript
{
  id: string
  userId: string
  tier: 'FREE' | 'PREMIUM' | 'ENTERPRISE'
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  stripeCurrentPeriodEnd?: DateTime
}
```

## 🎨 Composants Principaux

### 1. DocumentForm
Formulaire multi-étapes avec animations Framer Motion.

**Étapes:**
1. Choix du type de document
2. Sélection du type d'activité
3. Informations entreprise
4. Coordonnées de contact
5. Détails spécifiques

**Props:**
```typescript
interface DocumentFormProps {
  onSubmit: (data: FormData) => void
}
```

### 2. Hero Section
Section d'accueil avec animations fluides.

**Features:**
- Animation d'apparition progressive
- Gradient texte animé
- Boutons avec hover effects
- Badges animés

### 3. Templates Légaux

Les templates sont générés dynamiquement selon:
- Type de document (Mentions légales, CGV, Politique)
- Type d'activité (Freelance, E-commerce, SaaS, etc.)
- Informations spécifiques de l'entreprise

## 🔄 Flux de Données

### Génération de Document

```mermaid
User → Form → API Route → Template Engine
                              ↓
                        Generate Markdown
                              ↓
                        Convert to HTML
                              ↓
                        Save to Database
                              ↓
                        Generate PDF (optional)
                              ↓
                        Return Document ID
                              ↓
                        Redirect to Dashboard
```

### Processus complet:

1. **Utilisateur remplit le formulaire** (5 étapes)
2. **Soumission du formulaire** → POST `/api/documents/generate`
3. **Validation des données** (champs requis)
4. **Génération du template Markdown** basé sur les données
5. **Conversion Markdown → HTML** avec `marked`
6. **Sauvegarde en base** (Prisma)
7. **Retour du document ID** + contenu
8. **Redirection vers dashboard**

## 🎯 Fonctionnalités Clés

### 1. Templates Conformes RGPD

Tous les templates respectent:
- **RGPD** (Règlement Général sur la Protection des Données)
- **LCEN** (Loi pour la Confiance dans l'Économie Numérique)
- **Code de la consommation** (CGV)
- **Loi Informatique et Libertés**

### 2. Adaptation Dynamique

Les documents s'adaptent selon:
- **Type d'activité**: Freelance, E-commerce, SaaS, etc.
- **Vente physique/digitale**: Clauses de livraison adaptées
- **Abonnements**: Clauses de paiement récurrent
- **TVA**: Mention TVA intracommunautaire

### 3. Multi-format Export

- **Markdown**: Format source éditable
- **HTML**: Pour intégration web directe
- **PDF**: Document professionnel téléchargeable

## 🔐 Sécurité

### Authentification
- NextAuth.js avec plusieurs providers
- Hash des mots de passe (bcrypt)
- Sessions JWT sécurisées
- Protection CSRF

### Données
- Validation des inputs (Zod)
- Sanitization HTML
- Encryption des données sensibles
- Conformité RGPD

### API
- Rate limiting
- CORS configuration
- API keys pour routes sensibles

## 🎨 Design System

### Couleurs Principales
```css
--primary: #2563eb (blue-600)
--secondary: #9333ea (purple-600)
--success: #10b981 (green-500)
--warning: #f59e0b (amber-500)
--error: #ef4444 (red-500)
```

### Typography
```css
Font Family: Inter, system-ui, sans-serif
Headings: Bold, tracking-tight
Body: Normal, leading-relaxed
```

### Spacing
Utilisation du système Tailwind (4px base):
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

## 🚀 Performance

### Optimisations
- **Code splitting** automatique (Next.js)
- **Image optimization** (next/image)
- **Font optimization** (next/font)
- **Static generation** pour landing page
- **ISR** (Incremental Static Regeneration) pour pricing
- **Edge functions** pour API routes

### Métriques Cibles
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: > 90

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile First
Tous les composants sont conçus mobile-first et s'adaptent progressivement.

## 🧪 Tests

### Recommandations
```bash
# Tests unitaires
npm run test

# Tests E2E avec Playwright
npm run test:e2e

# Coverage
npm run test:coverage
```

### Structure des tests
```
__tests__/
├── components/
│   ├── document-form.test.tsx
│   └── hero-section.test.tsx
├── lib/
│   └── templates.test.ts
└── api/
    └── generate.test.ts
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. **Push sur GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
```

2. **Import dans Vercel**
- Aller sur vercel.com
- Import Git Repository
- Configurer les variables d'environnement

3. **Variables d'environnement Vercel**
Ajouter toutes les variables du `.env.example`

### Base de Données

**Supabase** (Recommandé):
1. Créer un projet sur supabase.com
2. Copier l'URL PostgreSQL
3. Ajouter dans `DATABASE_URL`

**Alternatives**:
- Neon
- PlanetScale
- Railway

## 📊 Analytics

### Google Analytics 4
```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
```

### PostHog (Product Analytics)
```typescript
// lib/posthog.ts
posthogClient.capture('document_generated', {
  type: documentType,
  businessType: businessType
})
```

## 💰 Modèle Économique

### Pricing Strategy

**FREE**:
- 1 document (Mentions légales)
- Export PDF + HTML
- Support email

**PREMIUM** (9,99€/mois):
- Tous les documents illimités
- Export PDF + HTML + Markdown
- Mises à jour automatiques
- Support prioritaire

**ENTERPRISE** (Sur devis):
- Tout Premium
- Multi-utilisateurs
- API access
- Templates personnalisés
- Support dédié

### Stripe Integration

Configuration webhook:
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature')
  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  
  switch (event.type) {
    case 'customer.subscription.created':
      // Activer premium
    case 'customer.subscription.deleted':
      // Rétrograder vers free
  }
}
```

## 🔮 Roadmap

### Phase 1 (MVP) ✅
- [x] Formulaire multi-étapes
- [x] Génération documents
- [x] Templates RGPD
- [x] Export HTML/Markdown
- [x] Landing page

### Phase 2 (Q1 2025)
- [ ] Authentification complète
- [ ] Dashboard utilisateur
- [ ] Export PDF
- [ ] Paiements Stripe
- [ ] Tests E2E

### Phase 3 (Q2 2025)
- [ ] Multi-langue (EN, ES, DE)
- [ ] IA auto-remplissage (GPT-4)
- [ ] Templates sectoriels
- [ ] API publique

### Phase 4 (Q3 2025)
- [ ] Mobile app
- [ ] Intégrations (WordPress, Shopify)
- [ ] Éditeur WYSIWYG
- [ ] White-label

## 🤝 Contribution

### Guidelines
1. Fork le projet
2. Créer une branche feature
3. Commit avec messages clairs
4. Tests passants
5. Pull request

### Code Style
- ESLint + Prettier configurés
- Conventions TypeScript strictes
- Composants fonctionnels React
- Hooks personnalisés réutilisables

## 📞 Support

- **Email**: support@legaldocs.app
- **Discord**: [Communauté](https://discord.gg/...)
- **GitHub Issues**: Pour bugs et features

## 📄 Licence

MIT License - Libre d'utilisation commerciale

---

**Créé avec ❤️ et les meilleures technologies web**

*Next.js 15 • React 18 • TypeScript • Tailwind • ShadCN UI • Framer Motion*
