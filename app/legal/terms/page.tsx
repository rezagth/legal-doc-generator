import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export default function TermsPage() {
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
        <h1>Conditions Générales d'Utilisation et de Vente (CGV/CGU)</h1>
        <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</em></p>

        <h2>1. Objet</h2>
        <p>
          Les présentes Conditions Générales d'Utilisation et de Vente (CGV/CGU) régissent l'utilisation 
          du service LegalDocs et les conditions de vente des abonnements premium.
        </p>

        <h2>2. Description du Service</h2>
        <p>
          LegalDocs est une plateforme SaaS permettant de générer automatiquement des documents légaux 
          (mentions légales, politique de confidentialité, CGV) conformes à la législation française et européenne.
        </p>

        <h3>2.1 Offre Gratuite</h3>
        <ul>
          <li>Génération illimitée de mentions légales</li>
          <li>Export PDF et HTML</li>
          <li>Templates conformes RGPD</li>
          <li>Support par email</li>
        </ul>

        <h3>2.2 Offre Premium (9,99€/mois)</h3>
        <ul>
          <li>Tous les documents illimités (Mentions légales + CGV + Politique)</li>
          <li>Export PDF, HTML et Markdown</li>
          <li>Mises à jour automatiques des templates</li>
          <li>Support prioritaire</li>
        </ul>

        <h2>3. Inscription et Compte Utilisateur</h2>
        <p>
          L'accès au service nécessite la création d'un compte avec une adresse email valide et un mot de passe.
          Vous êtes responsable de la confidentialité de vos identifiants.
        </p>

        <h2>4. Prix et Paiement</h2>
        <p>
          Les prix sont indiqués en euros TTC. Le paiement de l'abonnement Premium se fait par carte 
          bancaire via notre prestataire de paiement sécurisé (Stripe).
        </p>
        <p>
          L'abonnement est facturé mensuellement et renouvelé automatiquement jusqu'à résiliation.
        </p>

        <h2>5. Droit de Rétractation</h2>
        <p>
          Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 
          14 jours à compter de la souscription pour exercer votre droit de rétractation.
        </p>

        <h2>6. Résiliation</h2>
        <p>
          Vous pouvez résilier votre abonnement à tout moment depuis votre espace client. 
          La résiliation prend effet à la fin de la période en cours.
        </p>

        <h2>7. Propriété Intellectuelle</h2>
        <p>
          Les documents générés vous appartiennent et vous pouvez les utiliser librement.
          La plateforme et ses templates restent la propriété de LegalDocs.
        </p>

        <h2>8. Responsabilité</h2>
        <p>
          Les documents générés sont fournis à titre informatif. Bien que nous nous efforcions d'assurer 
          leur conformité, nous recommandons de les faire vérifier par un avocat avant utilisation.
        </p>
        <p>
          LegalDocs ne peut être tenu responsable des conséquences de l'utilisation des documents générés.
        </p>

        <h2>9. Données Personnelles</h2>
        <p>
          Vos données personnelles sont traitées conformément au RGPD. Consultez notre{' '}
          <Link href="/legal/privacy" className="text-blue-600 hover:underline">
            Politique de Confidentialité
          </Link> pour plus d'informations.
        </p>

        <h2>10. Modifications</h2>
        <p>
          Nous nous réservons le droit de modifier les présentes CGV/CGU à tout moment. 
          Les modifications seront effectives dès leur publication sur le site.
        </p>

        <h2>11. Droit Applicable et Juridiction</h2>
        <p>
          Les présentes CGV/CGU sont soumises au droit français. Tout litige relève de la compétence 
          exclusive des tribunaux français.
        </p>

        <h2>12. Contact</h2>
        <p>
          Pour toute question : <a href="mailto:contact@legaldocs.fr">contact@legaldocs.fr</a>
        </p>
      </div>
    </div>
  )
}
