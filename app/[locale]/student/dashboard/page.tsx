'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, BookOpen, FileText, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  matricule: string
  firstName: string
  lastName: string
  role: string
  isFirstLogin: boolean
}

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono font-bold">
                  48
                </div>
                <span className="font-mono font-semibold hidden sm:inline">48hub</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm">
                <span className="text-muted-foreground">Welcome,</span>{' '}
                <span className="font-medium">{user.firstName}</span>
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* First Login Banner */}
        {user.isFirstLogin && (
          <div className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 sm:p-6">
            <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Welcome to 48hub!</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
              This is your first login. Please complete your profile to get started.
            </p>
            <Link href="/student/profile">
              <Button size="sm">Complete Your Profile</Button>
            </Link>
          </div>
        )}

        {/* Student Info Card */}
        <div className="mb-8 rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Matricule</p>
              <p className="text-2xl font-bold font-mono text-primary mt-1">{user.matricule}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-2xl font-bold mt-1">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="sm:text-right">
              <Link href="/student/profile">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/student/projects">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="font-semibold">View All</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/student/submissions">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                  <p className="font-semibold">0 Active</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/student/analytics">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Analytics</p>
                  <p className="font-semibold">Progress</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/student/settings">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Settings</p>
                  <p className="font-semibold">Preferences</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recent activity yet</p>
            <Link href="/student/projects">
              <Button variant="outline" size="sm" className="mt-4">
                Browse Available Projects
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
