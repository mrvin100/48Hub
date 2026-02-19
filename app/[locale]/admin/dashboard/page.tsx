'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Download, Users, BookOpen, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Student {
  id: string
  matricule: string
  firstName: string
  lastName: string
  email: string
  batch: string
  createdAt: string
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [batch, setBatch] = useState<string>('B1')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [batch])

  const fetchStudents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/students?batch=${batch}`)
      if (response.ok) {
        const data = await response.json()
        setStudents(data.students)
      }
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage students and projects</p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Projects</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Students</h2>
              <p className="text-sm text-muted-foreground">Manage all students and their information</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href="/admin/students/new" className="w-full sm:w-auto">
                <Button className="gap-2 w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                  Add Student
                </Button>
              </Link>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Batch Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Batch:</span>
            {['B1', 'B2', 'B3'].map((b) => (
              <Button
                key={b}
                variant={batch === b ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBatch(b)}
              >
                {b}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <Input
            placeholder="Search by name or matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />

          {/* Students Table */}
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-card/50 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Matricule</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Batch</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        Loading students...
                      </td>
                    </tr>
                  ) : filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-card/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono font-semibold text-primary">{student.matricule}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {student.email || '—'}
                        </td>
                        <td className="px-6 py-4 text-sm">{student.batch}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/students/${student.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
