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
import { FileText, Loader2, ArrowLeft, Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setIsLoading(true)

    try {
      // Inscription
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const registerData = await registerRes.json()

      if (!registerRes.ok) {
        setError(registerData.error || 'Erreur lors de l\'inscription')
        setIsLoading(false)
        return
      }

      // Connexion automatique après inscription
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Inscription réussie mais erreur de connexion')
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
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10">
        <Card className="glass-dark border-white/10 shadow-glass backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-neon-accent relative">
                <Sparkles className="h-8 w-8 text-white absolute animate-pulse" />
                <FileText className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Créer un compte</CardTitle>
            <CardDescription className="text-gray-400">
              Commencez à générer vos documents légaux
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Nom (optionnel)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-accent-500/50 focus:ring-accent-500/20 transition-all"
                />
              </div>

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
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-accent-500/50 focus:ring-accent-500/20 transition-all"
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
                  minLength={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-accent-500/50 focus:ring-accent-500/20 transition-all"
                />
                <p className="text-xs text-gray-500">Minimum 6 caractères</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-accent-500/50 focus:ring-accent-500/20 transition-all"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 shadow-neon-accent text-white font-semibold py-6 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Inscription...
                    </>
                  ) : (
                    <span className="flex items-center">S'inscrire <Sparkles className="ml-2 h-4 w-4" /></span>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-400">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors">
                  Se connecter
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
