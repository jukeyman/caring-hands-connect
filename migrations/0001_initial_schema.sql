-- ============================================================
-- Caring Hands Home Health - Database Schema
-- ============================================================

-- Inquiries table (Contact form + Service Inquiry form)
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  zip_code TEXT DEFAULT '',
  care_needed_for TEXT DEFAULT '',
  services_interested TEXT DEFAULT '[]',
  urgency TEXT DEFAULT '',
  message TEXT DEFAULT '',
  lead_source TEXT DEFAULT 'Website Form',
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  landing_page TEXT DEFAULT '',
  status TEXT DEFAULT 'New',
  notes TEXT DEFAULT '',
  inquiry_date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT ''
);

-- Caregiver applications table (Careers form)
CREATE TABLE IF NOT EXISTS caregiver_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  zip_code TEXT DEFAULT '',
  position_applying_for TEXT DEFAULT '',
  years_experience TEXT DEFAULT '',
  certifications TEXT DEFAULT '[]',
  availability TEXT DEFAULT '[]',
  has_transportation INTEGER,
  why_caregiver TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  application_status TEXT DEFAULT 'New',
  notes TEXT DEFAULT '',
  application_date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT ''
);

-- Contact messages table (generic contact)
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TEXT NOT NULL
);

-- Activity log (for audit trail)
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action_type TEXT NOT NULL,
  entity_name TEXT NOT NULL,
  entity_id TEXT DEFAULT '',
  description TEXT DEFAULT '',
  ip_address TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_date ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON caregiver_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_applications_date ON caregiver_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
