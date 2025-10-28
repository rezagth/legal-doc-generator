import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Shield, Zap, Users, Heart, Target } from 'lucide-react'

export default function AboutPage() {
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
            À propos de LegalDocs
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nous rendons la conformité légale accessible à tous les entrepreneurs
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Notre Mission</h3>
                <p className="text-gray-600">Simplifier la création de documents légaux pour tous les entrepreneurs</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Nos Valeurs</h3>
                <p className="text-gray-600">Transparence, simplicité et conformité pour protéger votre activité</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Notre Équipe</h3>
                <p className="text-gray-600">Des experts juridiques et développeurs passionnés à votre service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Notre Histoire</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              LegalDocs est né d'un constat simple : créer des documents légaux conformes est compliqué, 
              coûteux et prend du temps. De nombreux entrepreneurs se retrouvent perdus face aux obligations 
              légales, notamment le RGPD.
            </p>
            <p className="mb-4">
              Notre plateforme permet de générer en quelques minutes des documents juridiques conformes, 
              adaptés à votre activité et toujours à jour avec la législation.
            </p>
            <p>
              Aujourd'hui, nous accompagnons des centaines d'entrepreneurs, freelances et PME dans leur 
              mise en conformité légale.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Entrepreneurs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
              <div className="text-gray-600">Documents générés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Conforme RGPD</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">&lt; 3min</div>
              <div className="text-gray-600">Temps moyen</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez-nous !</h2>
          <p className="text-xl mb-8 opacity-90">Commencez à générer vos documents légaux dès maintenant</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Commencer gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
