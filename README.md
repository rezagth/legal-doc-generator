# 📄 Legal Docs Generator - SaaS

**Générateur automatique de documents légaux** conforme RGPD - Mentions légales, CGV et Politique de confidentialité en quelques clics.

## 🚀 Stack Technique

- **Frontend**: Next.js 15 + React 18 + TypeScript
- **UI**: ShadCN UI + TailwindCSS
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Base de données**: Prisma + PostgreSQL
- **Authentification**: NextAuth.js
- **Documents**: jsPDF + Marked (Markdown)
- **Paiements**: Stripe (freemium)

## ✨ Fonctionnalités

### MVP Complet
- ✅ Formulaire dynamique multi-étapes avec animations
- ✅ Génération automatique de 3 types de documents
- ✅ Templates conformes RGPD et loi française
- ✅ Export PDF + HTML + Markdown
- ✅ Dashboard utilisateur
- ✅ Authentification sécurisée
- ✅ Modèle freemium avec Stripe

## 🛠️ Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env (voir .env.example)
cp .env.example .env

# 3. Initialiser la base de données
npx prisma generate
npx prisma db push

# 4. Lancer le serveur
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📝 Documentation complète

Voir le fichier DOCUMENTATION.md pour plus de détails sur l'architecture, l'utilisation et le déploiement.
"# legal-doc-generator" 
