import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Mail, MessageSquare, HelpCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">LegalDocs</span>
          </Link>
          <Link href="/"><Button variant="ghost">← Retour</Button></Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Une question ? Une suggestion ? Nous sommes là pour vous aider
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Réponse sous 24h en semaine</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:contact@legaldocs.fr" className="text-blue-600 hover:underline font-semibold">
                  contact@legaldocs.fr
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Questions Fréquentes</CardTitle>
                <CardDescription>Trouvez des réponses instantanées</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing#faq">
                  <Button variant="outline" className="w-full">
                    Voir la FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <HelpCircle className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Besoin d'aide immédiate ?</CardTitle>
              <CardDescription>Consultez notre documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Avant de nous contacter, consultez notre guide qui répond aux questions les plus courantes :
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Comment générer un document ?</li>
                <li>• Comment télécharger mes documents ?</li>
                <li>• Différence entre plan gratuit et premium</li>
                <li>• Conformité RGPD</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Contact */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Commercial</h2>
          <p className="text-gray-600 mb-8">
            Vous êtes une entreprise et souhaitez discuter d'un partenariat ou d'une offre Enterprise ?
          </p>
          <a href="mailto:business@legaldocs.fr">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contact Business
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
