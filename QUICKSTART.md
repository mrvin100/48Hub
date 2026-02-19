# 48hub Quick Start Guide

Get started with 48hub development in minutes.

## Prerequisites

- Node.js 18+
- pnpm (package manager)
- PostgreSQL database (via Neon)

## 1. Installation

```bash
# Install dependencies
pnpm install
```

## 2. Environment Setup

Create `.env.local` in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get your Neon database URL:
1. Go to https://console.neon.tech
2. Create or select a project
3. Copy the connection string
4. Paste into DATABASE_URL

## 3. Database Setup

Initialize the database schema:

```bash
# Execute the SQL migration
pnpm run db:migrate
```

Or manually:
```bash
# Copy the SQL from scripts/001-init-schema.sql
# And execute it in your database
```

## 4. Start Development

```bash
# Run development server
pnpm dev
```

Visit http://localhost:3000 to see the landing page.

## 5. Test the Application

### Landing Page
- URL: http://localhost:3000
- Shows features, how it works, and call-to-actions

### Login Page
- URL: http://localhost:3000/login
- For testing authentication flow

### Admin Dashboard
- URL: http://localhost:3000/admin/dashboard
- Manage students and view enrollment

### Add Student
- URL: http://localhost:3000/admin/students/new
- Create new student accounts

## Pages & Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Landing page |
| `/login` | Public | User login |
| `/admin/dashboard` | Admin | Admin dashboard |
| `/admin/students/new` | Admin | Add student form |
| `/student/dashboard` | Student | Student dashboard |
| `/student/profile` | Student | Student profile |
| `/student/projects` | Student | Student projects |
| `/student/projects/[id]` | Student | Project details |

## API Endpoints

### Authentication
```bash
POST /api/auth/login
Content-Type: application/json

{
  "matricule": "K48B1144",
  "password": "password123"
}
```

### Student Management
```bash
POST /api/admin/students
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "batch": "B1"
}
```

## Useful Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm lint         # Run linter

# Production
pnpm build        # Build for production
pnpm start        # Run production server

# Database
pnpm db:migrate   # Run migrations
```

## Project Structure

```
app/
  ├── page.tsx              # Landing page
  ├── layout.tsx            # Root layout
  ├── login/               # Login page
  ├── admin/               # Admin pages
  ├── student/             # Student pages
  └── api/                 # API endpoints

components/
  ├── header.tsx           # Navigation
  ├── footer.tsx           # Footer
  └── ui/                  # UI components

lib/
  ├── auth.ts              # Auth utilities
  ├── db.ts                # Database client
  ├── matricule-generator.ts
  └── utils.ts

types/
  └── database.ts          # Type definitions
```

## Key Features

### Matricule System
Student ID format: `K48B1144`
- K48 = KFOKAM 48
- B1 = Batch 1
- 144 = Student number

### Authentication
- Username: matricule (e.g., K48B1144)
- Password: set during creation
- Uses JWT tokens with HTTP-only cookies

### Database
- PostgreSQL via Neon
- 8 tables for full application
- Automatic schema on initialization

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
pnpm dev -- -p 3001
```

### Database Connection Error
```
Error: connect ECONNREFUSED
```
- Verify DATABASE_URL is correct
- Check Neon connection status
- Ensure database is running

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

## Documentation

- [README.md](./README.md) - Full project documentation
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guidelines
## Support

For questions or issues:
- Check the documentation files
- Review the code comments
- Check the database schema in `scripts/001-init-schema.sql`
- Contact: contact@48hub.com

## Next Steps

1. Explore the landing page
2. Test the login flow
3. Create a test student
4. Review the admin dashboard
5. Start building features!

Happy coding! 🚀
