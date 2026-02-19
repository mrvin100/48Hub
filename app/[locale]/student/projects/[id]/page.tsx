'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, Send, MessageCircle, FileText, Users } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function ProjectDetail() {
  const params = useParams()
  const projectId = params.id as string
  const [submissionUrl, setSubmissionUrl] = useState('')
  const [comment, setComment] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/student/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Project Header */}
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-medium mb-4">
                <span>In Progress</span>
              </div>
              <h1 className="text-3xl font-bold">E-Commerce Platform</h1>
            </div>

            <p className="text-lg text-muted-foreground">
              Build a full-stack e-commerce platform with cart, checkout, and payment integration.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold">48 hours</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="text-lg font-semibold">2 days left</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Team Size</p>
                <p className="text-lg font-semibold">3 students</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="text-lg font-semibold">75%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Implement user authentication with email/password</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Create product catalog with search and filtering</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>Shopping cart functionality with persistent storage</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground mt-1">○</span>
              <span className="text-muted-foreground">Payment integration (Stripe)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground mt-1">○</span>
              <span className="text-muted-foreground">Order history and tracking</span>
            </li>
          </ul>
        </div>

        {/* Team */}
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </h2>
          <div className="space-y-3">
            {['You (Lead)', 'Ahmed Hassan', 'Fatima Al-Mansouri'].map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {member.charAt(0)}
                  </div>
                  <span className="font-medium">{member}</span>
                </div>
                <span className="text-xs text-muted-foreground">Member</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission */}
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Submission
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project Repository URL</label>
              <Input
                type="url"
                placeholder="https://github.com/..."
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                className="mt-2 h-11"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Share your GitHub repository or project link
              </p>
            </div>
            <Button className="w-full gap-2">
              <Upload className="h-4 w-4" />
              Submit Project
            </Button>
          </div>
        </div>

        {/* Discussion */}
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Discussion (3 messages)
          </h2>
          <div className="space-y-4 mb-4 max-h-72 overflow-y-auto">
            {[
              {
                name: 'Instructor Ahmed',
                role: 'Instructor',
                message:
                  'Great start on the e-commerce platform! Make sure to implement proper error handling.',
                time: '2 hours ago',
              },
              {
                name: 'You',
                role: 'Student',
                message: 'Thank you for the feedback. We are working on the payment integration now.',
                time: '1 hour ago',
              },
              {
                name: 'Instructor Ahmed',
                role: 'Instructor',
                message: "Don't forget to test with edge cases. Let me know if you need any resources.",
                time: '30 minutes ago',
              },
            ].map((msg, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-border/50 last:border-0">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{msg.name}</span>
                    <span className="text-xs text-muted-foreground">{msg.role}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-11"
            />
            <Button size="icon" disabled={!comment}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
