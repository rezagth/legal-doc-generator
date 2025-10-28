'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DocumentForm from '@/components/document-form'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const handleFormSubmit = async (formData: any) => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to generate document')
      }

      const result = await response.json()
      
      // Redirect to document page
      router.push(`/dashboard/documents/${result.documentId}`)
    } catch (error) {
      console.error('Error generating document:', error)
      alert('Une erreur est survenue lors de la génération du document')
    } finally {
      setIsGenerating(false)
    }
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-gradient" style={{ backgroundSize: '400% 400%' }}></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="mb-8">
            <Loader2 className="h-20 w-20 animate-spin text-primary-400 mx-auto mb-4" />
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Génération en cours...</h2>
          <p className="text-gray-400 text-lg">Création de votre document légal personnalisé</p>
          <motion.div 
            className="mt-6 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 rounded-full bg-accent-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-gradient" style={{ backgroundSize: '400% 400%' }}></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="relative z-10">
        <DocumentForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  )
}
