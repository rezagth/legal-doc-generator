import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">LegalDocs</span>
          </Link>
          <Link href="/"><Button variant="ghost">← Retour</Button></Link>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue">
        <h1>Politique de Confidentialité</h1>
        <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</em></p>

        <h2>1. Introduction</h2>
        <p>
          La présente Politique de Confidentialité décrit la façon dont LegalDocs collecte, utilise et 
          protège vos données personnelles.
        </p>
        <p>
          Nous nous engageons à protéger votre vie privée et à respecter le Règlement Général sur la 
          Protection des Données (RGPD) et la loi Informatique et Libertés.
        </p>

        <h2>2. Responsable du Traitement</h2>
        <p>
          <strong>LegalDocs</strong><br/>
          Email : contact@legaldocs.fr
        </p>

        <h2>3. Données Collectées</h2>
        
        <h3>3.1 Données d'identification</h3>
        <ul>
          <li>Nom et prénom (optionnel)</li>
          <li>Adresse email</li>
          <li>Mot de passe (crypté)</li>
        </ul>

        <h3>3.2 Données de navigation</h3>
        <ul>
          <li>Adresse IP</li>
          <li>Type de navigateur</li>
          <li>Pages visitées</li>
          <li>Date et heure de connexion</li>
        </ul>

        <h3>3.3 Données professionnelles</h3>
        <ul>
          <li>Informations de votre entreprise (nom, adresse, SIRET, etc.)</li>
          <li>Type d'activité</li>
          <li>Documents générés</li>
        </ul>

        <h2>4. Finalité de la Collecte</h2>
        <p>Vos données sont collectées pour :</p>
        <ul>
          <li>Gérer votre compte utilisateur</li>
          <li>Générer les documents légaux personnalisés</li>
          <li>Traiter vos paiements (abonnement Premium)</li>
          <li>Vous envoyer des communications relatives à nos services</li>
          <li>Améliorer nos services</li>
          <li>Respecter nos obligations légales</li>
        </ul>

        <h2>5. Base Légale du Traitement</h2>
        <p>Le traitement de vos données repose sur :</p>
        <ul>
          <li>Votre consentement (lors de l'inscription)</li>
          <li>L'exécution d'un contrat (fourniture du service)</li>
          <li>Le respect d'obligations légales</li>
          <li>Notre intérêt légitime (amélioration du service)</li>
        </ul>

        <h2>6. Durée de Conservation</h2>
        <p>Vos données personnelles sont conservées pendant :</p>
        <ul>
          <li>Données de compte : durée de votre compte + 3 ans</li>
          <li>Documents générés : durée de votre compte</li>
          <li>Données de paiement : 10 ans (obligation fiscale)</li>
          <li>Données de navigation : 13 mois</li>
        </ul>

        <h2>7. Vos Droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
          <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
          <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
          <li><strong>Droit à la limitation</strong> : limiter le traitement</li>
          <li><strong>Droit à la portabilité</strong> : récupérer vos données</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@legaldocs.fr">contact@legaldocs.fr</a>
        </p>

        <h2>8. Sécurité des Données</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
          vos données :
        </p>
        <ul>
          <li>Cryptage des mots de passe (bcrypt)</li>
          <li>Connexion HTTPS sécurisée</li>
          <li>Hébergement sécurisé (Vercel)</li>
          <li>Accès restreint aux données</li>
        </ul>

        <h2>9. Cookies</h2>
        <p>
          Notre site utilise des cookies essentiels pour son fonctionnement (authentification, session).
          Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
        </p>

        <h2>10. Partage des Données</h2>
        <p>
          Nous ne vendons jamais vos données personnelles. Vos données peuvent être partagées avec :
        </p>
        <ul>
          <li>Notre prestataire d'hébergement (Vercel)</li>
          <li>Notre prestataire de paiement (Stripe)</li>
          <li>Les autorités légales si requis par la loi</li>
        </ul>
        <p>Tous nos prestataires sont conformes au RGPD.</p>

        <h2>11. Transferts Internationaux</h2>
        <p>
          Vos données peuvent être transférées hors de l'Union Européenne (hébergement Vercel aux USA). 
          Ces transferts sont encadrés par des clauses contractuelles types approuvées par la Commission Européenne.
        </p>

        <h2>12. Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. 
          La date de dernière mise à jour est indiquée en haut de ce document.
        </p>

        <h2>13. Contact et Réclamation</h2>
        <p>
          Pour toute question concernant vos données personnelles :<br/>
          Email : <a href="mailto:contact@legaldocs.fr">contact@legaldocs.fr</a>
        </p>
        <p>
          Vous avez également le droit d'introduire une réclamation auprès de la CNIL :<br/>
          <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>
        </p>
      </div>
    </div>
  )
}
