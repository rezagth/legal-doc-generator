'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, FileText, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PricingPage() {
  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: '/mois',
      description: 'Pour découvrir le service',
      features: [
        'Mentions légales illimitées',
        'Export PDF et HTML',
        'Templates conformes RGPD',
        'Support par email',
      ],
      cta: 'Commencer gratuitement',
      href: '/register',
      highlighted: false,
      color: 'gray'
    },
    {
      name: 'Premium',
      price: '9,99€',
      period: '/mois',
      description: 'Pour les professionnels',
      features: [
        'Tous les documents illimités',
        'Mentions légales + CGV + Politique',
        'Export PDF, HTML et Markdown',
        'Mises à jour automatiques',
        'Templates personnalisables',
        'Support prioritaire',
        'Nouvelles fonctionnalités en avant-première',
      ],
      cta: 'Essayer Premium',
      href: '/register',
      highlighted: true,
      badge: 'Plus populaire',
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 'Sur devis',
      period: '',
      description: 'Pour les grandes entreprises',
      features: [
        'Tout Premium inclus',
        'Multi-utilisateurs (équipes)',
        'API d\'intégration',
        'Templates sur-mesure',
        'Formation dédiée',
        'Support téléphonique',
        'SLA garanti',
        'Facturation annuelle',
      ],
      cta: 'Nous contacter',
      href: '/contact',
      highlighted: false,
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">LegalDocs</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tarifs simples et transparents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choisissez le plan qui correspond à vos besoins. 
            Changez ou annulez à tout moment.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Check className="h-5 w-5 text-green-600" />
            <span>Sans engagement</span>
            <span className="mx-2">•</span>
            <Check className="h-5 w-5 text-green-600" />
            <span>Annulation en 1 clic</span>
            <span className="mx-2">•</span>
            <Check className="h-5 w-5 text-green-600" />
            <span>Support réactif</span>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={plan.highlighted ? 'md:scale-105' : ''}
              >
                <Card className={`h-full relative ${
                  plan.highlighted ? 'border-blue-600 border-2 shadow-2xl' : 'shadow-lg'
                }`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      {plan.badge}
                    </div>
                  )}
                  
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mt-4 mb-2">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 text-lg">{plan.period}</span>}
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={plan.href}>
                      <Button 
                        className={`w-full ${
                          plan.highlighted 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-white hover:bg-gray-50 border-2'
                        }`}
                        size="lg"
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Puis-je changer de plan à tout moment ?',
                a: 'Oui, vous pouvez upgrader, downgrader ou annuler votre abonnement à tout moment. Les changements sont effectifs immédiatement.'
              },
              {
                q: 'Les documents sont-ils conformes RGPD ?',
                a: 'Absolument ! Tous nos templates sont rédigés par des experts et mis à jour régulièrement pour rester conformes à la législation française et européenne.'
              },
              {
                q: 'Puis-je personnaliser les documents ?',
                a: 'Oui, les documents générés sont entièrement modifiables. Vous pouvez les télécharger et les adapter à vos besoins spécifiques.'
              },
              {
                q: 'Y a-t-il des frais cachés ?',
                a: 'Non, aucun frais caché. Le prix affiché est le prix final. Pas de frais de setup, pas de frais par document.'
              },
              {
                q: 'Que se passe-t-il si j\'annule ?',
                a: 'Vous gardez l\'accès à vos documents déjà créés. Vous pouvez vous réabonner à tout moment pour créer de nouveaux documents.'
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des centaines d'entrepreneurs qui nous font confiance
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Commencer gratuitement
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
