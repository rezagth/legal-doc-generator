import { DocumentType, BusinessType } from "@prisma/client"

export interface DocumentData {
  companyName: string
  legalForm?: string
  siret?: string
  address: string
  city: string
  zipCode: string
  country: string
  phone?: string
  email: string
  websiteUrl?: string
  hostingProvider?: string
  vatNumber?: string
  sellsPhysical: boolean
  sellsDigital: boolean
  hasSubscription: boolean
  businessType: BusinessType
}

export function generateLegalNotice(data: DocumentData): string {
  const currentDate = new Date().toLocaleDateString('fr-FR')
  
  return `
# MENTIONS LÉGALES

*Dernière mise à jour : ${currentDate}*

## 1. INFORMATIONS GÉNÉRALES

Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN), il est porté à la connaissance des utilisateurs et visiteurs du site ${data.websiteUrl || 'ce site internet'} les présentes mentions légales.

## 2. ÉDITEUR DU SITE

Le site est édité par :

**${data.companyName}**
${data.legalForm ? `${data.legalForm}` : ''}
${data.siret ? `SIRET : ${data.siret}` : ''}
${data.vatNumber ? `Numéro de TVA intracommunautaire : ${data.vatNumber}` : ''}

**Siège social :**
${data.address}
${data.zipCode} ${data.city}
${data.country}

**Contact :**
${data.email}
${data.phone ? `Téléphone : ${data.phone}` : ''}

**Responsable de publication :** ${data.companyName}

## 3. HÉBERGEMENT

Le site est hébergé par :
${data.hostingProvider || '[Nom de l\'hébergeur à compléter]'}

## 4. PROPRIÉTÉ INTELLECTUELLE

L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété exclusive de ${data.companyName}, sauf mention contraire.

Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès par écrit de ${data.companyName}.

## 5. PROTECTION DES DONNÉES PERSONNELLES

Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.

Pour exercer ces droits, vous pouvez nous contacter à l'adresse : ${data.email}

## 6. COOKIES

Le site peut utiliser des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.

## 7. RESPONSABILITÉ

${data.companyName} s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, ${data.companyName} ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.

## 8. DROIT APPLICABLE

Les présentes mentions légales sont soumises au droit français.
`.trim()
}

export function generatePrivacyPolicy(data: DocumentData): string {
  const currentDate = new Date().toLocaleDateString('fr-FR')
  
  return `
# POLITIQUE DE CONFIDENTIALITÉ

*Dernière mise à jour : ${currentDate}*

## 1. INTRODUCTION

La présente Politique de Confidentialité décrit la façon dont ${data.companyName} collecte, utilise et protège vos données personnelles lorsque vous utilisez notre site internet ${data.websiteUrl || 'notre site'}.

Nous nous engageons à protéger votre vie privée et à respecter le Règlement Général sur la Protection des Données (RGPD) et la loi Informatique et Libertés.

## 2. RESPONSABLE DU TRAITEMENT

**${data.companyName}**
${data.address}
${data.zipCode} ${data.city}
${data.country}
Email : ${data.email}

## 3. DONNÉES COLLECTÉES

Nous collectons les données personnelles suivantes :

### 3.1 Données d'identification
- Nom et prénom
- Adresse email
${data.phone ? '- Numéro de téléphone' : ''}

### 3.2 Données de navigation
- Adresse IP
- Type de navigateur
- Pages visitées
- Date et heure de connexion

${data.sellsPhysical || data.sellsDigital ? `
### 3.3 Données de commande
- Historique des commandes
- Adresse de livraison
- Informations de paiement (cryptées)
` : ''}

## 4. FINALITÉ DE LA COLLECTE

Vos données sont collectées pour :
- Gérer votre compte utilisateur
- Traiter vos commandes et paiements
- Vous envoyer des communications relatives à nos services
- Améliorer nos services et votre expérience utilisateur
- Respecter nos obligations légales

## 5. BASE LÉGALE DU TRAITEMENT

Le traitement de vos données repose sur :
- Votre consentement
- L'exécution d'un contrat
- Le respect d'obligations légales
- Notre intérêt légitime

## 6. DURÉE DE CONSERVATION

Vos données personnelles sont conservées pendant :
- Données de compte : durée de votre compte + 3 ans
- Données de commande : 10 ans (obligation fiscale)
- Données de navigation : 13 mois

## 7. VOS DROITS

Conformément au RGPD, vous disposez des droits suivants :

- **Droit d'accès** : obtenir une copie de vos données
- **Droit de rectification** : corriger vos données inexactes
- **Droit à l'effacement** : supprimer vos données
- **Droit d'opposition** : vous opposer au traitement
- **Droit à la limitation** : limiter le traitement
- **Droit à la portabilité** : récupérer vos données dans un format structuré
- **Droit de retirer votre consentement** à tout moment

Pour exercer ces droits, contactez-nous à : ${data.email}

## 8. SÉCURITÉ DES DONNÉES

Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.

## 9. COOKIES

Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.

### Types de cookies utilisés :
- **Cookies essentiels** : nécessaires au fonctionnement du site
- **Cookies analytiques** : pour analyser l'utilisation du site
- **Cookies marketing** : pour personnaliser les publicités (avec votre consentement)

## 10. PARTAGE DES DONNÉES

Nous ne vendons jamais vos données personnelles. Vos données peuvent être partagées avec :
- Nos prestataires de services (hébergement, paiement, etc.)
- Les autorités légales si requis par la loi

Tous nos prestataires sont tenus de respecter le RGPD.

## 11. TRANSFERTS INTERNATIONAUX

${data.country === 'France' ? 
  'Vos données sont stockées et traitées au sein de l\'Union Européenne.' : 
  'Vos données peuvent être transférées en dehors de l\'Union Européenne avec des garanties appropriées.'}

## 12. MODIFICATIONS

Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. La date de dernière mise à jour est indiquée en haut de ce document.

## 13. CONTACT

Pour toute question concernant cette politique ou vos données personnelles :

**${data.companyName}**
Email : ${data.email}
${data.phone ? `Téléphone : ${data.phone}` : ''}

Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
`.trim()
}

export function generateTermsOfService(data: DocumentData): string {
  const currentDate = new Date().toLocaleDateString('fr-FR')
  
  return `
# CONDITIONS GÉNÉRALES DE VENTE (CGV)

*Dernière mise à jour : ${currentDate}*

## 1. PRÉAMBULE

Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre :

**${data.companyName}**
${data.legalForm ? `${data.legalForm}` : ''}
${data.siret ? `SIRET : ${data.siret}` : ''}
${data.address}, ${data.zipCode} ${data.city}, ${data.country}
Email : ${data.email}

Ci-après dénommé "le Vendeur"

Et toute personne physique ou morale souhaitant procéder à un achat via le site internet ${data.websiteUrl || 'notre site'}, ci-après dénommée "le Client" ou "l'Acheteur".

## 2. OBJET

Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente ${data.sellsDigital && data.sellsPhysical ? 'de produits et services' : data.sellsDigital ? 'de produits numériques' : 'de produits'} proposés par ${data.companyName}.

## 3. ACCEPTATION DES CGV

Toute commande implique l'acceptation sans réserve des présentes CGV. Le Client reconnaît avoir pris connaissance des présentes CGV et les avoir acceptées avant de passer commande.

## 4. PRODUITS ET SERVICES

### 4.1 Description

Les produits et services sont décrits avec la plus grande exactitude possible. Le Vendeur se réserve le droit de modifier à tout moment les caractéristiques des produits.

${data.sellsDigital ? `
### 4.2 Produits numériques

Les produits numériques sont livrés par téléchargement ou par accès en ligne. Le Client dispose d'un droit de rétractation limité conformément à la législation en vigueur.
` : ''}

${data.sellsPhysical ? `
### 4.3 Produits physiques

Les produits physiques sont expédiés à l'adresse indiquée par le Client lors de la commande.
` : ''}

## 5. PRIX

Les prix sont indiqués en Euros, toutes taxes comprises (TTC).

${data.vatNumber ? 'La TVA est applicable selon les taux en vigueur.' : ''}

Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant sur le site le jour de la commande sera le seul applicable au Client.

## 6. COMMANDE

### 6.1 Processus de commande

Pour passer commande, le Client doit :
1. Sélectionner les produits/services souhaités
2. Valider son panier
3. Renseigner ses informations personnelles et de livraison
4. Choisir le mode de paiement
5. Accepter les présentes CGV
6. Confirmer sa commande

### 6.2 Confirmation

Une confirmation de commande est envoyée au Client par email après validation du paiement.

## 7. PAIEMENT

### 7.1 Modalités de paiement

Les paiements sont acceptés par :
- Carte bancaire
- Virement bancaire
- Autres moyens de paiement sécurisés

### 7.2 Sécurisation

Les paiements sont sécurisés via un prestataire de paiement certifié. ${data.companyName} ne stocke aucune donnée bancaire.

${data.hasSubscription ? `
### 7.3 Abonnements

Pour les offres par abonnement :
- Le paiement est prélevé automatiquement selon la périodicité choisie
- Le Client peut annuler son abonnement à tout moment
- L'annulation prend effet à la fin de la période en cours
` : ''}

## 8. LIVRAISON

${data.sellsPhysical ? `
### 8.1 Délais de livraison

Les délais de livraison sont indiqués lors de la commande et sont donnés à titre indicatif.

### 8.2 Frais de livraison

Les frais de livraison sont calculés en fonction du poids, du volume et de la destination.

### 8.3 Réception

Le Client doit vérifier l'état du colis à la réception et signaler toute anomalie dans les plus brefs délais.
` : ''}

${data.sellsDigital ? `
### 8.4 Livraison numérique

Les produits numériques sont accessibles immédiatement après confirmation du paiement via le compte Client ou par email.
` : ''}

## 9. DROIT DE RÉTRACTATION

Conformément aux articles L221-18 et suivants du Code de la consommation, le Client dispose d'un délai de 14 jours à compter de ${data.sellsPhysical ? 'la réception du produit' : 'la commande'} pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.

${data.sellsDigital ? `
**Exception pour les produits numériques** : Le droit de rétractation ne peut être exercé pour les contenus numériques fournis immédiatement avec votre accord exprès et votre renonciation au droit de rétractation.
` : ''}

Pour exercer ce droit, le Client doit notifier sa décision par email à : ${data.email}

## 10. GARANTIES

### 10.1 Garantie légale de conformité

Conformément aux articles L217-4 et suivants du Code de la consommation, tous les produits bénéficient de la garantie légale de conformité.

### 10.2 Garantie des vices cachés

Conformément aux articles 1641 et suivants du Code civil, le Client bénéficie de la garantie des vices cachés.

## 11. RESPONSABILITÉ

Le Vendeur ne saurait être tenu responsable de l'inexécution du contrat en cas de :
- Force majeure
- Fait du Client
- Fait d'un tiers

## 12. PROPRIÉTÉ INTELLECTUELLE

Tous les éléments du site ${data.websiteUrl || 'notre site'} sont et restent la propriété intellectuelle exclusive de ${data.companyName}.

## 13. DONNÉES PERSONNELLES

Les données personnelles collectées sont traitées conformément à notre Politique de Confidentialité et au RGPD.

## 14. LITIGES

### 14.1 Médiation

Conformément à l'article L612-1 du Code de la consommation, nous proposons un dispositif de médiation de la consommation.

### 14.2 Droit applicable

Les présentes CGV sont soumises au droit français. Tout litige relève de la compétence des tribunaux français.

## 15. CONTACT

Pour toute question ou réclamation :

**${data.companyName}**
${data.address}
${data.zipCode} ${data.city}
${data.country}
Email : ${data.email}
${data.phone ? `Téléphone : ${data.phone}` : ''}

## 16. MODIFICATIONS

Le Vendeur se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.
`.trim()
}

export function generateDocument(type: DocumentType, data: DocumentData): string {
  switch (type) {
    case 'LEGAL_NOTICE':
      return generateLegalNotice(data)
    case 'PRIVACY_POLICY':
      return generatePrivacyPolicy(data)
    case 'TERMS_OF_SERVICE':
      return generateTermsOfService(data)
    default:
      throw new Error(`Unknown document type: ${type}`)
  }
}
