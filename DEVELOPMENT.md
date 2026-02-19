# 48hub Development Guide

This document provides development guidelines for the 48hub project.

## Project Structure

```
48hub/
├── app/                              # Next.js App Router
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx                   # Root layout with global providers
│   ├── globals.css                  # Global styles and design tokens
│   ├── login/page.tsx               # Login page
│   ├── admin/
│   │   ├── dashboard/page.tsx       # Admin dashboard
│   │   └── students/new/page.tsx    # Add new student form
│   ├── student/
│   │   ├── dashboard/page.tsx       # Student dashboard
│   │   ├── profile/page.tsx         # Student profile
│   │   └── projects/
│   │       ├── page.tsx             # Student's projects list
│   │       └── [id]/page.tsx        # Project details
│   ├── api/
│   │   ├── auth/login/route.ts      # Authentication endpoint
│   │   └── admin/students/route.ts  # Student management endpoint
│   ├── error.tsx                    # Global error boundary
│   └── not-found.tsx                # 404 page
│
├── components/                       # React components
│   ├── header.tsx                   # Navigation header
│   ├── footer.tsx                   # Footer
│   ├── cursor-glow.tsx              # Cursor glow effect
│   ├── theme-provider.tsx           # Theme provider wrapper
│   ├── theme-toggle.tsx             # Theme toggle button
│   └── ui/                          # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       └── avatar.tsx
│
├── lib/                              # Utility functions and helpers
│   ├── db.ts                        # Database client
│   ├── auth.ts                      # Authentication utilities
│   ├── matricule-generator.ts       # Matricule generation logic
│   └── utils.ts                     # General utilities (cn, etc.)
│
├── types/                            # TypeScript type definitions
│   ├── database.ts                  # Database types
│   └── css.d.ts                     # CSS module types
│
├── scripts/                          # Database and utility scripts
│   └── 001-init-schema.sql          # Database schema initialization
│
├── public/                           # Static assets
│   ├── icon.svg
│   ├── og-image.png
│   └── ...
│
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.mjs                   # Next.js config
├── tailwind.config.mjs               # Tailwind CSS config (if exists)
├── postcss.config.mjs                # PostCSS config
└── README.md                         # Project documentation
```

## Development Workflow

### 1. Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Copy .env.example to .env.local and fill in values
```

### 2. Running the Development Server

```bash
# Start dev server
pnpm dev

# Open http://localhost:3000
```

### 3. Building for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## Code Standards

### TypeScript
- Strict mode enabled (`strict: true`)
- Use explicit types for function parameters and returns
- Avoid `any` types - use `unknown` with type guards instead

### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Extract complex logic into custom hooks or utilities

### Styling
- Use Tailwind CSS utility classes
- Reference design tokens defined in `app/globals.css`
- Responsive design with mobile-first approach
- Use semantic color classes (`bg-primary`, `text-muted-foreground`)

### Database
- Always use parameterized queries to prevent SQL injection
- Use proper error handling for database operations
- Implement proper connection pooling

### Authentication
- Passwords are hashed with PBKDF2 (10,000 iterations)
- Use HTTP-only cookies for sessions
- Implement proper logout with session cleanup

## Key Features

### Matricule System
Format: `K48[BATCH][ID]`
- Example: `K48B1144`
- K48 = KFOKAM 48 (organization prefix)
- B1 = Batch 1
- 144 = Sequential student ID

See `lib/matricule-generator.ts` for implementation.

### Authentication
- Custom JWT-based authentication
- Password hashing with PBKDF2
- Session management with HTTP-only cookies
- Login endpoint: `POST /api/auth/login`

### Student Management
- Admin can create individual students
- Bulk student import capability
- Student credentials generation
- Endpoint: `POST /api/admin/students`

## Database

### Tables
- `users` - User accounts
- `student_profiles` - Student information
- `batches` - Learning sprint batches
- `projects` - Project definitions
- `project_teams` - Team assignments
- `submissions` - Project submissions
- `evaluations` - Evaluation records
- `evaluation_criteria` - Criteria definitions

See `scripts/001-init-schema.sql` for full schema.

## Common Tasks

### Adding a New Page
1. Create file in `app/[feature]/page.tsx`
2. Add metadata and component export
3. Use client components with `'use client'` if needed
4. Follow existing patterns for layout

### Adding a New API Endpoint
1. Create `app/api/[feature]/route.ts`
2. Implement GET/POST/PUT/DELETE handlers
3. Add proper error handling
4. Use parameterized queries for database

### Creating a Reusable Component
1. Create file in `components/[name].tsx`
2. Keep component focused and single-purpose
3. Export as named export
4. Add prop types with TypeScript

### Adding Database Tables
1. Create migration SQL in `scripts/`
2. Execute migration: `pnpm db:migrate`
3. Update type definitions in `types/database.ts`

## Debugging

### Enable Debug Logs
Use console.log with `[v0]` prefix for debugging:
```typescript
console.log("[v0] Debug message:", variableName)
```

### Check Environment Variables
```bash
# Verify .env.local is loaded correctly
# Check Vercel dashboard for production variables
```

### Database Issues
```bash
# Test database connection
# Check DATABASE_URL format
# Verify Neon connection status
```

## Performance

### Optimization Tips
- Use Next.js Image component for images
- Implement code splitting with dynamic imports
- Use SWR for client-side data fetching
- Optimize database queries with indexes
- Enable compression and caching headers

### Monitoring
- Check Vercel Analytics dashboard
- Monitor database query performance
- Review bundle size with `pnpm build --analyze`

## Testing

Guidelines for testing:
- Write tests for utility functions
- Test API endpoints with proper request/response
- Test authentication flows
- Test database operations with transactions

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Push to main branch to auto-deploy
4. Monitor build logs for errors

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SITE_URL` - Site URL (e.g., https://48hub.com)

## Troubleshooting

### Build Errors
- Check for TypeScript errors: `tsc --noEmit`
- Verify all imports are correct
- Check for missing dependencies

### Runtime Errors
- Check browser console for client-side errors
- Check server logs for API errors
- Verify environment variables are set

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Neon connection status
- Verify database schema exists

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Neon Database](https://neon.tech)
