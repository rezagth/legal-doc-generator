'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Loader2, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      setError('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 animate-gradient" style={{ backgroundSize: '400% 400%' }}></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10">
        <Card className="glass-dark border-white/10 shadow-glass backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-neon">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Connexion</CardTitle>
            <CardDescription className="text-gray-400">
              Connectez-vous pour accéder à vos documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-neon text-white font-semibold py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-400">
                Pas encore de compte ?{' '}
                <Link href="/register" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                  S'inscrire
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Retour à l'accueil
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
