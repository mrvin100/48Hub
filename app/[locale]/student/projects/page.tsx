'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  status: 'not_started' | 'in_progress' | 'completed' | 'submitted'
  daysLeft?: number
}

export default function StudentProjects() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Build a full-stack e-commerce platform with cart, checkout, and payment integration.',
      status: 'in_progress',
      daysLeft: 2,
    },
    {
      id: '2',
      title: 'Weather App',
      description: 'Create a real-time weather application using external APIs.',
      status: 'not_started',
    },
    {
      id: '3',
      title: 'Task Management System',
      description: 'Develop a collaborative task management system with real-time updates.',
      status: 'completed',
    },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(storedUser))
  }, [router])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
      case 'completed':
        return 'bg-green-500/10 text-green-700 dark:text-green-400'
      case 'submitted':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not_started':
        return <AlertCircle className="h-4 w-4" />
      case 'in_progress':
        return <Clock className="h-4 w-4" />
      case 'completed':
      case 'submitted':
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/student/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-muted-foreground mt-2">
              {projects.length} project{projects.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            {['all', 'not_started', 'in_progress', 'completed', 'submitted'].map(
              (status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize"
                >
                  {status === 'all' ? 'All' : status.replace('_', ' ')}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/student/projects/${project.id}`}>
              <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all h-full cursor-pointer group">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors flex-1">
                      {project.title}
                    </h3>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    {project.daysLeft && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{project.daysLeft} days left</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary/10 ml-auto"
                    >
                      View →
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No projects found</p>
            <Button asChild>
              <Link href="/student/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
