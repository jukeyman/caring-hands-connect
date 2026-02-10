# Caring Hands Home Health - Website

## Project Overview
- **Name**: Caring Hands Home Health Connect
- **Goal**: Full-featured home health care website with contact forms, career applications, and service information
- **Platform**: Cloudflare Pages + Hono API + D1 Database
- **TX License**: #023937

## Live URLs
- **Production**: https://caringhandshomehealthtx.com
- **Cloudflare Pages**: https://caring-hands-connect.pages.dev
- **GitHub**: https://github.com/jukeyman/caring-hands-connect

## Features

### Completed (Public Website)
- Home page with hero section, testimonials, service previews, trust badges
- Services page with detailed care offerings
- About page with team information
- Locations page for Central Texas coverage
- Resources page with educational content
- Contact page with:
  - Service Inquiry Form (quick inquiry)
  - Full Care Assessment Form (detailed inquiry)
  - Team contact cards
  - Google Maps integration
- Careers page with:
  - Job listings (Certified Caregiver, Companion Caregiver)
  - Full application form (resume upload, certifications, availability)
- Thank You confirmation page
- Privacy Policy & Terms of Service
- 30+ educational resource pages (stroke, dementia, veterans, etc.)
- Full mobile-responsive design with Tailwind CSS
- SEO meta tags per page

### Backend API Routes (Hono on Cloudflare Workers)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/inquiries` | Submit care inquiry form |
| GET | `/api/inquiries` | List all inquiries (admin) |
| PATCH | `/api/inquiries/:id` | Update inquiry status |
| POST | `/api/applications` | Submit caregiver application |
| GET | `/api/applications` | List all applications (admin) |
| PATCH | `/api/applications/:id` | Update application status |
| POST | `/api/contact` | Submit contact message |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/health` | Health check |

### Internal/Admin Pages (Stub Mode)
These pages exist in the codebase but operate in stub mode (no backend data):
- Admin Dashboard, Admin Clients, Admin Billing, Admin Scheduling
- Client Dashboard, Caregiver Dashboard
- Messages, Billing, Care Plan, Visit Notes, Clock In/Out
- My Schedule, Payroll/Hours, Training/Certifications

## Data Architecture
- **Database**: Cloudflare D1 (SQLite)
  - `inquiries` - Contact form & service inquiry submissions
  - `caregiver_applications` - Career application submissions
  - `contact_messages` - Generic contact messages
  - `activity_log` - Audit trail
- **D1 Database ID**: `14f13ca2-ba16-4d7c-be46-8f67b97f2485`

## Tech Stack
- **Frontend**: React 18 + React Router + Tailwind CSS + Framer Motion + shadcn/ui (Radix)
- **Backend**: Hono framework on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deployment**: Cloudflare Pages

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Custom Domains**: caringhandshomehealthtx.com, www.caringhandshomehealthtx.com
- **Last Deployed**: 2026-02-10

## Development

```bash
# Install
npm install

# Build
npm run build

# Local dev with D1
npm run db:migrate:local
npm run dev:sandbox

# Deploy
npm run deploy
```

## Project Structure
```
src/
  index.tsx          # Hono API server (Cloudflare Worker entry)
  server/index.ts    # Server source
  App.jsx            # React app entry
  Layout.jsx         # Shared layout (nav + footer)
  pages/             # 40+ page components
  components/        # Reusable UI components
  api/               # API client (replaces Base44 SDK)
  lib/               # Auth context, utilities
migrations/          # D1 database migrations
functions/           # Legacy backend functions (reference)
dist/                # Build output
```
