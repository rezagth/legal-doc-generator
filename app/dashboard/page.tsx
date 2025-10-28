'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Plus, LogOut, Loader2, Download, Sparkles, Eye } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      loadDocuments()
    }
  }, [status, router])

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-gradient" style={{ backgroundSize: '400% 400%' }}></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Header */}
      <header className="border-b border-white/10 glass-dark relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <FileText className="h-6 w-6 text-primary-400" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">LegalDocs</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{session?.user?.email}</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/20 hover:bg-white/10 text-white">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="h-8 w-8 text-accent-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Mes Documents</h1>
          </div>
          <p className="text-gray-400 text-lg">Gérez tous vos documents légaux en un seul endroit</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-dark border-white/10 hover:border-primary-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Documents</p>
                  <p className="text-3xl font-bold text-white">{documents.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-dark border-white/10 hover:border-accent-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ce mois-ci</p>
                  <p className="text-3xl font-bold text-white">{documents.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10 hover:border-primary-500/30 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Dernière création</p>
                  <p className="text-lg font-semibold text-white">{documents.length > 0 ? new Date(documents[0].createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '-'}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center border border-white/10">
                  <Download className="h-6 w-6 text-primary-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8">
          <Link href="/generate">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-neon text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Créer un nouveau document
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Documents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}>
          {documents.length === 0 ? (
            <Card className="glass-dark border-white/10 text-center py-12">
              <CardContent className="pt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}>
                  <FileText className="h-20 w-20 text-gray-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Aucun document</h3>
                <p className="text-gray-400 mb-6">
                  Commencez par créer votre premier document légal
                </p>
                <Link href="/generate">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-neon">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer mon premier document
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ y: -8, scale: 1.02 }}>
                  <Link href={`/dashboard/documents/${doc.id}`}>
                    <Card className="glass-dark border-white/10 hover:border-primary-500/50 transition-all cursor-pointer group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all"></div>
                      <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-2 text-white">
                          <motion.div 
                            className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}>
                            <FileText className="h-5 w-5 text-white" />
                          </motion.div>
                          <span className="text-sm">
                            {doc.type === 'LEGAL_NOTICE' ? 'Mentions Légales' : 
                             doc.type === 'PRIVACY_POLICY' ? 'Politique de Confidentialité' :
                             doc.type === 'TERMS_OF_SERVICE' ? 'CGV' : doc.type}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {doc.companyName}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {new Date(doc.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.2 }}>
                            <Eye className="h-4 w-4 text-primary-400" />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
