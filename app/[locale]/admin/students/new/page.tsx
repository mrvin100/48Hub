'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Copy, Check, AlertCircle } from 'lucide-react'

export default function AddStudentPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [batch, setBatch] = useState('B1')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [newStudent, setNewStudent] = useState<{
    matricule: string
    password: string
  } | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          batch,
          email: email || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to create student')
        return
      }

      const data = await response.json()
      setNewStudent({
        matricule: data.student.matricule,
        password: data.student.password,
      })
      setSuccess(true)

      // Reset form
      setFirstName('')
      setLastName('')
      setEmail('')
      setBatch('B1')
    } catch (err) {
      console.error('[add-student] Error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (success && newStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 mx-auto">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold">Student Created Successfully</h1>
                <p className="text-muted-foreground">
                  Share the credentials below with the student
                </p>
              </div>

              <div className="space-y-4 bg-card/50 rounded-lg p-6 border border-border/50">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Matricule</label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 px-4 py-3 rounded-lg bg-background border border-border/50 font-mono font-semibold">
                      {newStudent.matricule}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(newStudent.matricule, 'matricule')}
                    >
                      {copiedField === 'matricule' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Initial Password</label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 px-4 py-3 rounded-lg bg-background border border-border/50 font-mono font-semibold select-all">
                      {newStudent.password}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(newStudent.password, 'password')}
                    >
                      {copiedField === 'password' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Student must change this password on first login
                  </p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Securely share these credentials with the student. They will need to change their password when they first log in.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    setSuccess(false)
                    setNewStudent(null)
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setBatch('B1')
                  }}
                  className="flex-1"
                >
                  Add Another Student
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/admin/dashboard">Done</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Add New Student</h1>
              <p className="text-muted-foreground mt-2">
                Create a new student account and generate initial credentials
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="batch" className="block text-sm font-medium">
                  Batch *
                </label>
                <select
                  id="batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-11 px-3 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="B1">Batch 1</option>
                  <option value="B2">Batch 2</option>
                  <option value="B3">Batch 3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email (Optional)
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || !firstName || !lastName}
                  className="w-full"
                >
                  {isLoading ? 'Creating...' : 'Create Student'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
