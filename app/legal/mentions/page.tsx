import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export default function MentionsPage() {
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
        <h1>Mentions Légales</h1>
        <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</em></p>

        <h2>1. Informations Générales</h2>
        <p>
          Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 
          pour la Confiance dans l'économie numérique (LCEN), il est porté à la connaissance des 
          utilisateurs et visiteurs du site LegalDocs les présentes mentions légales.
        </p>

        <h2>2. Éditeur du Site</h2>
        <p><strong>LegalDocs</strong></p>
        <p>
          Site web : <a href="https://legaldocs.fr">https://legaldocs.fr</a><br/>
          Email : contact@legaldocs.fr
        </p>

        <h2>3. Hébergement</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong><br/>
          340 S Lemon Ave #4133, Walnut, CA 91789, USA<br/>
          Site web : <a href="https://vercel.com" target="_blank" rel="noopener">https://vercel.com</a>
        </p>

        <h2>4. Propriété Intellectuelle</h2>
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la 
          propriété exclusive de LegalDocs, sauf mention contraire.
        </p>
        <p>
          Toute reproduction, distribution, modification, adaptation, retransmission ou publication 
          de ces différents éléments est strictement interdite sans l'accord exprès par écrit de LegalDocs.
        </p>

        <h2>5. Protection des Données Personnelles</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
          Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression 
          et d'opposition aux données personnelles vous concernant.
        </p>
        <p>
          Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@legaldocs.fr
        </p>
        <p>
          Pour plus d'informations, consultez notre <Link href="/legal/privacy" className="text-blue-600 hover:underline">
            Politique de Confidentialité
          </Link>.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Le site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer 
          votre navigateur pour refuser les cookies.
        </p>

        <h2>7. Responsabilité</h2>
        <p>
          LegalDocs s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur 
          ce site. Toutefois, LegalDocs ne peut garantir l'exactitude, la précision ou l'exhaustivité 
          des informations mises à disposition sur ce site.
        </p>
        <p>
          Les documents générés par la plateforme sont fournis à titre informatif. Nous recommandons 
          de les faire vérifier par un professionnel du droit avant utilisation.
        </p>

        <h2>8. Droit Applicable</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. Tout litige relève de la 
          compétence exclusive des tribunaux français.
        </p>
      </div>
    </div>
  )
}
