'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, ArrowLeft, Loader2, Copy, Check, Sparkles } from 'lucide-react'

interface Document {
  id: string
  type: string
  companyName: string
  htmlContent: string
  markdownContent: string
  createdAt: string
}

export default function DocumentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      loadDocument()
    }
  }, [status, router])

  const loadDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setDocument(data)
      } else {
        console.error('Document non trouvé')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadHTML = () => {
    if (!document) return
    const blob = new Blob([document.htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = window.document.createElement('a')
    a.href = url
    a.download = `${document.type}_${document.companyName}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadMarkdown = () => {
    if (!document) return
    const blob = new Blob([document.markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = window.document.createElement('a')
    a.href = url
    a.download = `${document.type}_${document.companyName}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    if (!document) return
    await navigator.clipboard.writeText(document.markdownContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getDocumentTitle = (type: string) => {
    switch (type) {
      case 'LEGAL_NOTICE':
        return 'Mentions Légales'
      case 'PRIVACY_POLICY':
        return 'Politique de Confidentialité'
      case 'TERMS_OF_SERVICE':
        return 'Conditions Générales de Vente'
      default:
        return type
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-400">Chargement du document...</p>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <Card className="max-w-md glass-dark border-white/10">
          <CardContent className="pt-6 text-center">
            <p className="mb-4 text-gray-300">Document non trouvé</p>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600">Retour au dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-gradient" style={{ backgroundSize: '400% 400%' }}></div>
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
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au dashboard
              </Button>
            </motion.div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Document Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Card className="mb-6 glass-dark border-white/10 shadow-glass">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6 text-accent-400 animate-pulse" />
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {getDocumentTitle(document.type)}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 text-base">
                    {document.companyName} • Créé le {new Date(document.createdAt).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </div>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-neon">
                  <FileText className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={downloadHTML} className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-neon">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger HTML
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={downloadMarkdown} variant="outline" className="border-white/20 hover:bg-white/10 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger Markdown
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={copyToClipboard} variant="outline" className="border-white/20 hover:bg-white/10 text-white">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copier le texte
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Document Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <Card className="glass-dark border-white/10 shadow-glass">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Aperçu du document</CardTitle>
              <CardDescription className="text-gray-400">
                Prévisualisation HTML de votre document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-10 rounded-xl border-2 border-white/30 shadow-2xl">
                <div 
                  className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-primary-600 prose-li:text-gray-700"
                  style={{
                    color: '#374151',
                    lineHeight: '1.75'
                  }}
                  dangerouslySetInnerHTML={{ __html: document.htmlContent }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Comment utiliser ce document ?
            </h3>
            <ul className="text-sm space-y-1 text-gray-700 list-disc list-inside">
              <li>Téléchargez le fichier HTML et intégrez-le dans votre site web</li>
              <li>Copiez le texte et personnalisez-le selon vos besoins</li>
              <li>Le Markdown est idéal pour la documentation ou les wikis</li>
              <li>Ces documents sont conformes RGPD et à la législation française</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
