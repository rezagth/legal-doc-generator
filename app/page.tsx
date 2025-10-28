'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Shield, Zap, Check, ArrowRight, Sparkles, Download, Clock, Stars } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    { icon: <Zap className="h-6 w-6" />, title: 'Ultra Rapide', description: 'Générez vos documents en moins de 3 minutes' },
    { icon: <Shield className="h-6 w-6" />, title: 'Conforme RGPD', description: 'Templates à jour selon la législation européenne' },
    { icon: <FileText className="h-6 w-6" />, title: 'Multi-formats', description: 'Export PDF, HTML et Markdown' },
    { icon: <Sparkles className="h-6 w-6" />, title: 'Personnalisé', description: 'Adapté à votre type d\'activité' },
    { icon: <Download className="h-6 w-6" />, title: 'Téléchargement instantané', description: 'Récupérez vos documents immédiatement' },
    { icon: <Clock className="h-6 w-6" />, title: 'Mises à jour', description: 'Templates actualisés automatiquement' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 animate-gradient" style={{ backgroundSize: '400% 400%' }}></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Navigation */}
      <nav className="border-b border-white/10 glass-dark fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <FileText className="h-6 w-6 text-primary-400" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">LegalDocs</span>
          </Link>
          <div className="flex gap-2 items-center">
            <Link href="/pricing">
              <Button variant="ghost" className="hover:bg-white/10 hover:text-primary-300 transition-all">Tarifs</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="hover:bg-white/10 hover:text-primary-300 transition-all">À propos</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-white/10 hover:text-primary-300 transition-all">Connexion</Button>
            </Link>
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-neon">
                  Commencer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass border border-primary-500/20 rounded-full text-sm font-semibold text-primary-300">
              <Stars className="h-4 w-4 animate-pulse" />
              Nouveau : Export Markdown disponible
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient" 
              style={{ backgroundSize: '200% auto' }}>
              Documents Légaux<br />en 3 Minutes
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Générez vos <span className="font-semibold text-primary-400">mentions légales</span>, 
              <span className="font-semibold text-accent-400"> CGV</span> et 
              <span className="font-semibold text-primary-400"> politique de confidentialité</span> conformes RGPD
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/generate">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-lg px-8 py-6 shadow-neon-accent relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">Commencer gratuitement <ArrowRight className="ml-2" /></span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/pricing">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-500/30 hover:bg-primary-500/10 text-white">
                    Voir les tarifs
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-400" /><span>Sans engagement</span></div>
              <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-400" /><span>Conforme RGPD</span></div>
              <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-400" /><span>Export instantané</span></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Pourquoi choisir LegalDocs ?</h2>
            <p className="text-xl text-gray-400">La solution la plus rapide et élégante du marché</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }} 
                whileHover={{ y: -8, scale: 1.02 }}
                className="group">
                <Card className="h-full glass-dark border-white/10 hover:border-primary-500/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-300"></div>
                  <CardHeader className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center mb-4 shadow-neon">
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="glass-dark border border-primary-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Prêt à générer vos documents légaux ?</h2>
              <p className="text-xl mb-8 text-gray-300">Rejoignez des milliers d'entrepreneurs qui nous font confiance</p>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 shadow-neon">
                    Commencer maintenant <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 relative z-10 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-primary-400" />
                <span className="font-bold text-white text-xl bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">LegalDocs</span>
              </div>
              <p className="text-sm text-gray-400">
                Générateur de documents légaux conforme RGPD.
                Simple, rapide et professionnel.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Produit</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pricing" className="hover:text-primary-400 transition-colors">Tarifs</Link></li>
                <li><Link href="/about" className="hover:text-primary-400 transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/register" className="hover:text-primary-400 transition-colors">Commencer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Légal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/legal/mentions" className="hover:text-primary-400 transition-colors">Mentions légales</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-primary-400 transition-colors">Confidentialité</Link></li>
                <li><Link href="/legal/terms" className="hover:text-primary-400 transition-colors">CGV</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
                <li><Link href="/about" className="hover:text-primary-400 transition-colors">À propos</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 LegalDocs. Tous droits réservés.</p>
            <p className="mt-2 text-gray-500">Fait avec ❤️ en France</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
