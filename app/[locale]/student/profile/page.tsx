'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  matricule: string
  firstName: string
  lastName: string
  isFirstLogin: boolean
}

interface ProfileData {
  specialization: string
  bio: string
  profileImage: string
}

export default function StudentProfile() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileData>({
    specialization: '',
    bio: '',
    profileImage: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // This will be implemented with actual API call
    setTimeout(() => {
      setIsSaving(false)
      router.push('/student/dashboard')
    }, 500)
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/student/dashboard">
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
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground mt-2">
                Complete your profile to get the most out of 48hub
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Basic Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      type="text"
                      value={user.firstName}
                      disabled
                      className="h-11 bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      type="text"
                      value={user.lastName}
                      disabled
                      className="h-11 bg-muted"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Matricule</label>
                  <Input
                    type="text"
                    value={user.matricule}
                    disabled
                    className="h-11 bg-muted font-mono font-semibold"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4 border-t border-border/50 pt-6">
                <h2 className="text-lg font-semibold">Profile Details</h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization</label>
                  <Input
                    type="text"
                    placeholder="e.g., Full Stack Development, Data Science"
                    value={profile.specialization}
                    onChange={(e) =>
                      setProfile({ ...profile, specialization: e.target.value })
                    }
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">Max 500 characters</p>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-4 border-t border-border/50 pt-6">
                <h2 className="text-lg font-semibold">Profile Picture</h2>

                <div className="space-y-3">
                  <div className="h-32 w-32 rounded-lg border border-border/50 bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">No image</p>
                      <p className="text-xs text-muted-foreground">256x256</p>
                    </div>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or GIF (max 5MB)
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 border-t border-border/50 pt-6">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="gap-2 flex-1"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/student/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
