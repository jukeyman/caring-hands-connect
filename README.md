# Caring Hands Home Health - Web Application

## Project Overview
- **Name**: Caring Hands Home Health
- **Domain**: caringhandshomehealthtx.com
- **Platform**: Cloudflare Pages + Hono + D1 Database
- **Goal**: Full-featured home health care management website with forms, backend functions, and HIPAA-compliant data handling

## URLs
- **Production**: https://caring-hands-connect.pages.dev
- **Custom Domain**: https://caringhandshomehealthtx.com (pending DNS setup)
- **GitHub**: https://github.com/jukeyman/caring-hands-connect

## Completed Features

### Public Website (React SPA)
- Home page with hero, services overview, testimonials
- Services page with full service descriptions
- About page with company info and team
- Locations page with service area map
- Resources page with helpful information
- Careers page with job listings and application form
- Contact page with inquiry form, contact info, FAQs
- Service Inquiry widget form
- Responsive mobile navigation
- Tailwind CSS styling throughout

### Backend API Routes (Hono on Cloudflare Workers)

#### Form Submission Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/inquiries` | POST | Submit care inquiry (Contact page) |
| `/api/inquiries` | GET | List all inquiries (admin) |
| `/api/inquiries/:id` | PATCH | Update inquiry status |
| `/api/applications` | POST | Submit caregiver application (Careers) |
| `/api/applications` | GET | List all applications (admin) |
| `/api/applications/:id` | PATCH | Update application status |
| `/api/contact` | POST | Submit general contact message |
| `/api/contacts` | GET | List all contact messages |

#### Full CRUD Endpoints
| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/clients` | GET, POST, PATCH | Client management |
| `/api/clients/:id` | GET, PATCH | Individual client |
| `/api/caregivers` | GET, POST | Caregiver management |
| `/api/caregivers/:id` | GET | Individual caregiver |
| `/api/visits` | GET, POST, PATCH | Visit scheduling |
| `/api/visit-notes` | GET, POST | Visit documentation |
| `/api/care-plans` | GET, POST | Care plan management |
| `/api/invoices` | GET, POST, PATCH | Invoice management |
| `/api/payments` | GET | Payment records |
| `/api/users` | GET, POST | User/admin management |

#### Backend Functions (18 converted from Base44/Deno)
| Endpoint | Original Function | Description |
|----------|------------------|-------------|
| `/api/functions/send-inquiry-confirmation` | sendInquiryConfirmation | Email confirmation on inquiry |
| `/api/functions/send-welcome-email` | sendWelcomeEmail | Welcome email to new clients |
| `/api/functions/send-visit-reminder` | sendVisitReminder | Email reminder to client & caregiver |
| `/api/functions/send-visit-confirmation-sms` | sendVisitConfirmationSMS | SMS confirmation to client |
| `/api/functions/send-caregiver-assignment-sms` | sendCaregiverAssignmentSMS | SMS to caregiver on new assignment |
| `/api/functions/send-late-clockin-alert` | sendLateClockInAlert | SMS/email alert for late clock-in |
| `/api/functions/send-schedule-change` | sendScheduleChangeNotification | SMS + email for schedule changes |
| `/api/functions/send-visit-notes-summary` | sendVisitNotesSummary | Daily care summary email |
| `/api/functions/send-invoice-email` | sendInvoiceEmail | Professional invoice email |
| `/api/functions/process-stripe-payment` | processStripePayment | Stripe payment processing |
| `/api/webhooks/stripe` | stripeWebhook | Stripe webhook handler |
| `/api/webhooks/twilio` | twilioSMSWebhook | Twilio SMS webhook handler |
| `/api/functions/encrypt-phi` | encryptPHI | AES-GCM encryption/decryption |
| `/api/functions/archive-old-records` | archiveOldRecords | HIPAA archive (7yr clients, 2yr inquiries) |
| `/api/functions/delete-client-data` | deleteClientData | HIPAA-compliant data anonymization |
| `/api/functions/export-client-data` | exportClientData | Full client data export (JSON) |
| `/api/functions/audit-data-access` | auditDataAccess | Activity audit with summary stats |
| `/api/functions/detect-security-breach` | detectSecurityBreach | 24hr security pattern analysis |

#### Admin & Monitoring
| Endpoint | Description |
|----------|-------------|
| `/api/admin/stats` | Dashboard statistics |
| `/api/activity-log` | Activity audit trail |
| `/api/security-incidents` | Security incident records |
| `/api/health` | API health check |

## Data Architecture
- **Database**: Cloudflare D1 (SQLite) - `caring-hands-db`
- **Tables**: inquiries, caregiver_applications, contact_messages, clients, caregivers, visits, visit_notes, care_plans, invoices, invoice_line_items, payments, family_members, conversations, messages, consent_records, security_incidents, users, activity_log
- **Storage**: All data in D1, emails/SMS via integrations

## Domain Setup Required

**Your API token needs DNS zone edit permissions. Add these DNS records in the Cloudflare dashboard:**

1. Go to https://dash.cloudflare.com → caringhandshomehealthtx.com → DNS
2. Add these records:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | caring-hands-connect.pages.dev | Proxied |
| CNAME | www | caring-hands-connect.pages.dev | Proxied |

## Environment Secrets (Set via Cloudflare Dashboard)

For full functionality, set these secrets in Pages > Settings > Environment Variables:

| Secret | Required For | How to Get |
|--------|-------------|------------|
| `STRIPE_SECRET_KEY` | Payment processing | https://dashboard.stripe.com/apikeys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhooks | Stripe webhook settings |
| `TWILIO_ACCOUNT_SID` | SMS notifications | https://console.twilio.com |
| `TWILIO_AUTH_TOKEN` | SMS notifications | Twilio console |
| `TWILIO_PHONE_NUMBER` | SMS from number | Twilio phone numbers |
| `PHI_ENCRYPTION_KEY` | PHI encryption | Generate a 32-char random string |
| `ADMIN_EMAIL` | Admin notifications | Your admin email |

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + Radix UI
- **Backend**: Hono framework on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **SMS**: Twilio (when configured)
- **Payments**: Stripe (when configured)
- **Email**: Stub (integrate SendGrid/Resend when ready)

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active at caring-hands-connect.pages.dev
- **D1 Database**: ✅ Active (caring-hands-db)
- **Custom Domain**: ⏳ Pending DNS CNAME records
- **Last Updated**: 2026-02-10
