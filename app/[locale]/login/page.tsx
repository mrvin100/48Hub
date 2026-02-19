'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [matricule, setMatricule] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricule, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Login failed')
        return
      }

      const data = await response.json()
      // Store user session/token (this will be enhanced with proper session management)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard')
      } else if (data.user.role === 'instructor') {
        router.push('/instructor/dashboard')
      } else {
        router.push('/student/dashboard')
      }
    } catch (err) {
      console.error('[login] Error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/95 px-4">
      <div className="w-full max-w-md">
        {/* Login Form */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-muted-foreground">Accédez à votre espace alumni KFOKAM48</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="matricule" className="block text-sm font-medium">
                Matricule KFOKAM48
              </label>
              <Input
                id="matricule"
                type="text"
                placeholder="K48B1144"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Votre identifiant unique KFOKAM48 (ex: K48B1144)
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe
              </label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !matricule || !password}
              className="w-full gap-2"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Mot de passe oublié?{' '}
              <Link href="/reset-password" className="text-primary hover:underline font-medium">
                Réinitialiser
              </Link>
            </p>
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/" className="text-primary hover:underline font-medium">
                ← Retour à l'accueil
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border/50">
          <p className="text-center text-xs text-muted-foreground">
            Alumni Identity Network
          </p>
        </div>
      </div>
    </div>
  )
}
