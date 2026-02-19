# 48hub - Build Amazing Projects in 48 Hours

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (install with `npm install -g pnpm`)
- **PostgreSQL Database** (we recommend [Neon](https://neon.tech) for serverless PostgreSQL)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 48Hub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.template` file to `.env.local`:
   ```bash
   cp .env.template .env.local
   ```
   
   Then edit `.env.local` and configure the following variables:
   
   - **DATABASE_URL**: Your PostgreSQL connection string
     - Sign up at [Neon](https://neon.tech) for a free serverless PostgreSQL database
     - Copy your connection string (format: `postgresql://user:password@host/database?sslmode=require`)
   
   - **NEXT_PUBLIC_SITE_URL**: Your site URL
     - Development: `http://localhost:3000`
     - Production: Your actual domain
   
   - **SESSION_SECRET** (optional but recommended): Generate a secure random string
     ```bash
     # Generate using OpenSSL
     openssl rand -base64 32
     ```

4. **Initialize the database**
   
   Run the migration script to create all necessary tables:
   ```bash
   pnpm run db:migrate
   ```
   
   You should see: `✅ Database migration completed successfully`

5. **Start the development server**
   ```bash
   pnpm dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:migrate` - Run database migrations
- `pnpm analyze` - Analyze bundle size

## 🔧 Troubleshooting

### Migration Issues

**Problem**: `No database host or connection string was set`
- **Solution**: Make sure your `.env.local` file exists and contains a valid `DATABASE_URL`

**Problem**: `relation already exists` errors
- **Solution**: This is normal if you've run migrations before. The script is now idempotent and safe to run multiple times.

### Database Connection

1. Verify your `DATABASE_URL` in `.env.local` is correct
2. Test the connection by running: `pnpm run db:migrate`
3. You should see: `✅ Database migration completed successfully`

### Development Server

If the dev server doesn't start:
1. Make sure port 3000 is available
2. Check that all dependencies are installed: `pnpm install`
3. Verify your `.env.local` file is properly configured

---

# 48hub - Build Amazing Projects in 48 Hours

A collaborative platform for students to showcase their abilities, collaborate on real-world projects, and build impressive portfolios in intense 48-hour learning sprints.

## Overview

48hub is a modern web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. It provides a complete platform for managing intensive learning sprints, where students work together to build and showcase real-world projects.

## Key Features

- **Project Management** - Create, assign, and track projects with clear milestones
- **Collaboration Tools** - Real-time updates and team communication
- **Smart Evaluations** - Criterion-based evaluation system with detailed feedback
- **Resource Library** - Learning materials and best practices from industry experts
- **Portfolio Builder** - Showcase projects and build professional portfolios
- **Analytics Dashboard** - Track progress and visualize learning journey

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI Framework**: React 19.2.3
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Database**: PostgreSQL via Neon
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod
- **Authentication**: Custom JWT-based implementation with bcrypt password hashing
- **Analytics**: Vercel Analytics

## Project Structure

```
48hub/
├── app/
│   ├── layout.tsx                  # Root layout with global providers
│   ├── page.tsx                    # Landing page
│   ├── login/
│   │   └── page.tsx               # Login page
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/route.ts     # Authentication API
│   │   └── admin/
│   │       └── students/route.ts  # Student management API
│   ├── admin/
│   │   ├── dashboard/page.tsx     # Admin dashboard
│   │   └── students/new/page.tsx  # Add student form
│   ├── student/
│   │   ├── dashboard/page.tsx     # Student dashboard
│   │   ├── profile/page.tsx       # Student profile
│   │   ├── projects/page.tsx      # Student projects list
│   │   └── projects/[id]/page.tsx # Project details
│   ├── globals.css                # Global styles with design tokens
│   └── error.tsx / not-found.tsx  # Error pages
├── components/
│   ├── header.tsx                 # Navigation header
│   ├── footer.tsx                 # Footer
│   ├── cursor-glow.tsx            # Cursor glow effect
│   ├── theme-provider.tsx         # Next-themes provider
│   ├── theme-toggle.tsx           # Theme toggle button
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── db.ts                      # Database connection
│   ├── auth.ts                    # Authentication utilities
│   ├── matricule-generator.ts     # Matricule generation and validation
│   ├── utils.ts                   # Utility functions (cn, etc.)
├── types/
│   ├── database.ts                # Database type definitions
│   └── css.d.ts                   # CSS module types
├── scripts/
│   └── 001-init-schema.sql        # Database migration script
├── public/
│   ├── placeholder.svg
│   ├── placeholder-logo.svg
│   └── ...
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (package manager)
- PostgreSQL database (via Neon)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables. Create a `.env.local` file:
```env
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Run database migrations:
```bash
pnpm run db:migrate
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts with authentication
- **student_profiles** - Student information and metadata
- **batches** - Learning sprint batches
- **projects** - Project definitions and management
- **project_teams** - Team assignments for projects
- **submissions** - Project submissions
- **evaluations** - Evaluation records and feedback
- **evaluation_criteria** - Evaluation criteria definitions

See `scripts/001-init-schema.sql` for the complete schema.

## Authentication

48hub uses a custom authentication system with:
- **Password hashing**: PBKDF2 (10,000 iterations)
- **Session management**: HTTP-only cookies
- **Token generation**: Secure JWT tokens

### User Roles

- **Admin**: Manage students, create projects, evaluate submissions
- **Student**: Participate in projects, view feedback, build portfolio
- **Instructor**: (Future) Create and manage projects

## Matricule System

The matricule format is: `K48[BATCH][ID]`

Example: `K48B1144`
- `K48` = KFOKAM 48 (organization prefix)
- `B1` = Batch 1
- `144` = Sequential student ID within batch

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Admin
- `POST /api/admin/students` - Create new student
- `GET /api/admin/students` - List students
- `GET /api/admin/students/[id]` - Get student details
- `PUT /api/admin/students/[id]` - Update student
- `DELETE /api/admin/students/[id]` - Delete student

## Development

### Build
```bash
pnpm build
```

### Run production build locally
```bash
pnpm start
```

### Lint
```bash
pnpm lint
```

## Deployment

The application is designed to be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy with `vercel deploy`

## Code Style & Best Practices

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with React hooks
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: Parameterized queries to prevent SQL injection
- **Security**: HTTPS only, secure headers, CSRF protection

## Contributing

This is a closed project. For questions or suggestions, please contact the development team.

## License

All rights reserved. 48hub™ 2024-2025.

## Support

For issues or questions, contact: contact@48hub.com
