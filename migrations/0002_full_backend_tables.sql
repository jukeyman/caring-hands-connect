-- ============================================================
-- Caring Hands Home Health - Full Backend Tables
-- Supports all 18 backend functions
-- ============================================================

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT DEFAULT '',
  address_street TEXT DEFAULT '',
  address_city TEXT DEFAULT '',
  address_state TEXT DEFAULT 'TX',
  address_zip TEXT DEFAULT '',
  medical_conditions TEXT DEFAULT '',
  medications TEXT DEFAULT '',
  special_instructions TEXT DEFAULT '',
  emergency_contact_name TEXT DEFAULT '',
  emergency_contact_phone TEXT DEFAULT '',
  status TEXT DEFAULT 'Active',
  discharge_date TEXT DEFAULT '',
  discharge_reason TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT ''
);

-- Caregivers table
CREATE TABLE IF NOT EXISTS caregivers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  certifications TEXT DEFAULT '[]',
  availability TEXT DEFAULT '[]',
  status TEXT DEFAULT 'Active',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT ''
);

-- Visits table
CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  caregiver_id INTEGER,
  visit_date TEXT NOT NULL,
  visit_type TEXT DEFAULT '',
  scheduled_start_time TEXT NOT NULL,
  scheduled_end_time TEXT NOT NULL,
  actual_start_time TEXT DEFAULT '',
  actual_end_time TEXT DEFAULT '',
  status TEXT DEFAULT 'Scheduled',
  cancellation_reason TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT '',
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- Visit Notes table
CREATE TABLE IF NOT EXISTS visit_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visit_id INTEGER NOT NULL,
  caregiver_id INTEGER NOT NULL,
  tasks_completed TEXT DEFAULT '',
  meals_provided TEXT DEFAULT '',
  medications_given TEXT DEFAULT '',
  client_mood TEXT DEFAULT '',
  observations TEXT DEFAULT '',
  incidents TEXT DEFAULT '',
  photos TEXT DEFAULT '[]',
  created_at TEXT NOT NULL,
  FOREIGN KEY (visit_id) REFERENCES visits(id),
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- Care Plans table
CREATE TABLE IF NOT EXISTS care_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  care_level TEXT DEFAULT '',
  hours_per_week REAL DEFAULT 0,
  services TEXT DEFAULT '[]',
  status TEXT DEFAULT 'Active',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT '',
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  invoice_number TEXT NOT NULL,
  invoice_date TEXT NOT NULL,
  due_date TEXT NOT NULL,
  payment_terms TEXT DEFAULT 'Net 30',
  subtotal REAL DEFAULT 0,
  tax_amount REAL DEFAULT 0,
  total_amount REAL DEFAULT 0,
  amount_paid REAL DEFAULT 0,
  balance_due REAL DEFAULT 0,
  status TEXT DEFAULT 'Pending',
  paid_at TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT '',
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Invoice Line Items
CREATE TABLE IF NOT EXISTS invoice_line_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  quantity REAL DEFAULT 1,
  unit_price REAL DEFAULT 0,
  line_total REAL DEFAULT 0,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  payment_date TEXT NOT NULL,
  amount REAL NOT NULL,
  payment_method TEXT DEFAULT '',
  stripe_payment_id TEXT DEFAULT '',
  status TEXT DEFAULT 'Pending',
  notes TEXT DEFAULT '',
  processed_by TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Family Members table
CREATE TABLE IF NOT EXISTS family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  is_emergency_contact INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  subject TEXT DEFAULT '',
  status TEXT DEFAULT 'Open',
  created_at TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  sender_type TEXT DEFAULT '',
  sender_id TEXT DEFAULT '',
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Consent Records table (NEVER delete - legal requirement)
CREATE TABLE IF NOT EXISTS consent_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  consent_type TEXT NOT NULL,
  consented INTEGER DEFAULT 1,
  signed_date TEXT NOT NULL,
  document_url TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Security Incidents table
CREATE TABLE IF NOT EXISTS security_incidents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  incident_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  detected_at TEXT NOT NULL,
  user_id TEXT DEFAULT '',
  user_email TEXT DEFAULT '',
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'Open',
  breach_notification_required INTEGER DEFAULT 0,
  resolved_at TEXT DEFAULT '',
  resolution_notes TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

-- Users table (admin/staff)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'staff',
  phone TEXT DEFAULT '',
  status TEXT DEFAULT 'Active',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT ''
);

-- Expand activity_log with more fields
ALTER TABLE activity_log ADD COLUMN user_id TEXT DEFAULT '';
ALTER TABLE activity_log ADD COLUMN user_email TEXT DEFAULT '';
ALTER TABLE activity_log ADD COLUMN user_role TEXT DEFAULT '';
ALTER TABLE activity_log ADD COLUMN risk_level TEXT DEFAULT 'Low';
ALTER TABLE activity_log ADD COLUMN was_successful INTEGER DEFAULT 1;
ALTER TABLE activity_log ADD COLUMN fields_accessed TEXT DEFAULT '[]';
ALTER TABLE activity_log ADD COLUMN new_values TEXT DEFAULT '';
ALTER TABLE activity_log ADD COLUMN timestamp TEXT DEFAULT '';

-- Additional indexes
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_caregivers_status ON caregivers(status);
CREATE INDEX IF NOT EXISTS idx_caregivers_phone ON caregivers(phone);
CREATE INDEX IF NOT EXISTS idx_visits_client ON visits(client_id);
CREATE INDEX IF NOT EXISTS idx_visits_caregiver ON visits(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_visits_status ON visits(status);
CREATE INDEX IF NOT EXISTS idx_visit_notes_visit ON visit_notes(visit_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe ON payments(stripe_payment_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_timestamp ON activity_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_security_status ON security_incidents(status);
CREATE INDEX IF NOT EXISTS idx_security_severity ON security_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
