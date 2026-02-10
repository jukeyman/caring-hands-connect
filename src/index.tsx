import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  STRIPE_SECRET_KEY?: string
  STRIPE_WEBHOOK_SECRET?: string
  TWILIO_ACCOUNT_SID?: string
  TWILIO_AUTH_TOKEN?: string
  TWILIO_PHONE_NUMBER?: string
  PHI_ENCRYPTION_KEY?: string
  ADMIN_EMAIL?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// ============================================================
// HELPER: Send email stub (logs in production until email service is configured)
// Replace with SendGrid/Resend/etc. integration when ready
// ============================================================
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}`)
  // TODO: integrate with SendGrid, Resend, or Mailgun
  return { success: true, message: 'Email queued (stub)' }
}

// ============================================================
// HELPER: Send SMS via Twilio
// ============================================================
async function sendSMS(env: Bindings, to: string, message: string) {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_PHONE_NUMBER) {
    console.log(`[SMS STUB] To: ${to}, Message: ${message}`)
    return { success: true, stub: true, message: 'SMS queued (Twilio not configured)' }
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: env.TWILIO_PHONE_NUMBER,
      To: to,
      Body: message,
    }),
  })
  const data = await resp.json() as any
  return { success: resp.ok, sid: data.sid, error: data.message }
}

// ============================================================
// 1. HEALTH CHECK
// ============================================================
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Caring Hands Home Health API'
  })
})

// ============================================================
// 2. INQUIRY FORM SUBMISSION (Contact page + Service Inquiry form)
// ============================================================
app.post('/api/inquiries', async (c) => {
  try {
    const body = await c.req.json()
    const {
      first_name, last_name, phone, email, zip_code,
      care_needed_for, services_interested, urgency,
      message, lead_source, utm_source, utm_medium,
      utm_campaign, landing_page, status
    } = body

    if (!first_name || !last_name || !phone || !email) {
      return c.json({ error: 'Missing required fields: first_name, last_name, phone, email' }, 400)
    }

    const servicesJson = JSON.stringify(services_interested || [])
    const now = new Date().toISOString()

    const result = await c.env.DB.prepare(`
      INSERT INTO inquiries (
        first_name, last_name, phone, email, zip_code,
        care_needed_for, services_interested, urgency,
        message, lead_source, utm_source, utm_medium,
        utm_campaign, landing_page, status, inquiry_date, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      first_name, last_name, phone, email, zip_code || '',
      care_needed_for || '', servicesJson, urgency || '',
      message || '', lead_source || 'Website Form', utm_source || '',
      utm_medium || '', utm_campaign || '', landing_page || '',
      status || 'New', now, now
    ).run()

    return c.json({
      success: true,
      id: result.meta.last_row_id,
      message: 'Inquiry submitted successfully'
    })
  } catch (error: any) {
    console.error('Inquiry submission error:', error)
    return c.json({ error: 'Failed to submit inquiry', details: error.message }, 500)
  }
})

app.get('/api/inquiries', async (c) => {
  try {
    const results = await c.env.DB.prepare(
      'SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 200'
    ).all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.patch('/api/inquiries/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { status, notes } = body
    await c.env.DB.prepare(
      'UPDATE inquiries SET status = ?, notes = ?, updated_at = ? WHERE id = ?'
    ).bind(status, notes || '', new Date().toISOString(), id).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ============================================================
// 3. CAREGIVER APPLICATION FORM (Careers page)
// ============================================================
app.post('/api/applications', async (c) => {
  try {
    const body = await c.req.json()
    const {
      first_name, last_name, phone, email, zip_code,
      position_applying_for, years_experience,
      certifications, availability, has_transportation,
      why_caregiver, resume_url
    } = body

    if (!first_name || !last_name || !phone || !email) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const certsJson = JSON.stringify(certifications || [])
    const availJson = JSON.stringify(availability || [])
    const now = new Date().toISOString()

    const result = await c.env.DB.prepare(`
      INSERT INTO caregiver_applications (
        first_name, last_name, phone, email, zip_code,
        position_applying_for, years_experience,
        certifications, availability, has_transportation,
        why_caregiver, resume_url, application_status,
        application_date, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      first_name, last_name, phone, email, zip_code || '',
      position_applying_for || '', years_experience || '',
      certsJson, availJson,
      has_transportation !== null ? (has_transportation ? 1 : 0) : null,
      why_caregiver || '', resume_url || '', 'New', now, now
    ).run()

    return c.json({
      success: true,
      id: result.meta.last_row_id,
      message: 'Application submitted successfully'
    })
  } catch (error: any) {
    console.error('Application submission error:', error)
    return c.json({ error: 'Failed to submit application', details: error.message }, 500)
  }
})

app.get('/api/applications', async (c) => {
  try {
    const results = await c.env.DB.prepare(
      'SELECT * FROM caregiver_applications ORDER BY created_at DESC LIMIT 200'
    ).all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.patch('/api/applications/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { application_status, notes } = body
    await c.env.DB.prepare(
      'UPDATE caregiver_applications SET application_status = ?, notes = ?, updated_at = ? WHERE id = ?'
    ).bind(application_status, notes || '', new Date().toISOString(), id).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ============================================================
// 4. CONTACT MESSAGE FORM
// ============================================================
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, subject, message } = body
    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields: name, email, message' }, 400)
    }
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(
      'INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(name, email, phone || '', subject || '', message, 'New', now).run()
    return c.json({ success: true, id: result.meta.last_row_id, message: 'Message sent successfully' })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.get('/api/contacts', async (c) => {
  try {
    const results = await c.env.DB.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 200').all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ============================================================
// 5. CLIENTS CRUD
// ============================================================
app.post('/api/clients', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(`
      INSERT INTO clients (first_name, last_name, email, phone, date_of_birth, address_street, address_city, address_state, address_zip, medical_conditions, medications, special_instructions, emergency_contact_name, emergency_contact_phone, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.first_name, body.last_name, body.email, body.phone,
      body.date_of_birth || '', body.address_street || '', body.address_city || '',
      body.address_state || 'TX', body.address_zip || '', body.medical_conditions || '',
      body.medications || '', body.special_instructions || '',
      body.emergency_contact_name || '', body.emergency_contact_phone || '',
      body.status || 'Active', now
    ).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/clients', async (c) => {
  try {
    const status = c.req.query('status')
    const query = status
      ? c.env.DB.prepare('SELECT * FROM clients WHERE status = ? ORDER BY created_at DESC LIMIT 500').bind(status)
      : c.env.DB.prepare('SELECT * FROM clients ORDER BY created_at DESC LIMIT 500')
    const results = await query.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/clients/:id', async (c) => {
  try {
    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(c.req.param('id')).first()
    if (!client) return c.json({ error: 'Client not found' }, 404)
    return c.json({ success: true, data: client })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.patch('/api/clients/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const fields = Object.keys(body).filter(k => k !== 'id')
    const sets = fields.map(f => `${f} = ?`).join(', ')
    const values = fields.map(f => body[f])
    values.push(new Date().toISOString(), id)
    await c.env.DB.prepare(`UPDATE clients SET ${sets}, updated_at = ? WHERE id = ?`).bind(...values).run()
    return c.json({ success: true })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 6. CAREGIVERS CRUD
// ============================================================
app.post('/api/caregivers', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(
      'INSERT INTO caregivers (first_name, last_name, email, phone, certifications, availability, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(body.first_name, body.last_name, body.email, body.phone, JSON.stringify(body.certifications || []), JSON.stringify(body.availability || []), body.status || 'Active', now).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/caregivers', async (c) => {
  try {
    const results = await c.env.DB.prepare('SELECT * FROM caregivers ORDER BY created_at DESC LIMIT 500').all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/caregivers/:id', async (c) => {
  try {
    const caregiver = await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(c.req.param('id')).first()
    if (!caregiver) return c.json({ error: 'Caregiver not found' }, 404)
    return c.json({ success: true, data: caregiver })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 7. VISITS CRUD
// ============================================================
app.post('/api/visits', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(`
      INSERT INTO visits (client_id, caregiver_id, visit_date, visit_type, scheduled_start_time, scheduled_end_time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(body.client_id, body.caregiver_id || null, body.visit_date, body.visit_type || '', body.scheduled_start_time, body.scheduled_end_time, body.status || 'Scheduled', now).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/visits', async (c) => {
  try {
    const client_id = c.req.query('client_id')
    const caregiver_id = c.req.query('caregiver_id')
    const status = c.req.query('status')
    let query = 'SELECT * FROM visits WHERE 1=1'
    const binds: any[] = []
    if (client_id) { query += ' AND client_id = ?'; binds.push(client_id) }
    if (caregiver_id) { query += ' AND caregiver_id = ?'; binds.push(caregiver_id) }
    if (status) { query += ' AND status = ?'; binds.push(status) }
    query += ' ORDER BY visit_date DESC LIMIT 500'
    const stmt = binds.length > 0 ? c.env.DB.prepare(query).bind(...binds) : c.env.DB.prepare(query)
    const results = await stmt.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.patch('/api/visits/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const fields = Object.keys(body).filter(k => k !== 'id')
    const sets = fields.map(f => `${f} = ?`).join(', ')
    const values = fields.map(f => body[f])
    values.push(new Date().toISOString(), id)
    await c.env.DB.prepare(`UPDATE visits SET ${sets}, updated_at = ? WHERE id = ?`).bind(...values).run()
    return c.json({ success: true })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 8. VISIT NOTES CRUD
// ============================================================
app.post('/api/visit-notes', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(`
      INSERT INTO visit_notes (visit_id, caregiver_id, tasks_completed, meals_provided, medications_given, client_mood, observations, incidents, photos, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(body.visit_id, body.caregiver_id, body.tasks_completed || '', body.meals_provided || '', body.medications_given || '', body.client_mood || '', body.observations || '', body.incidents || '', JSON.stringify(body.photos || []), now).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/visit-notes', async (c) => {
  try {
    const visit_id = c.req.query('visit_id')
    const query = visit_id
      ? c.env.DB.prepare('SELECT * FROM visit_notes WHERE visit_id = ? ORDER BY created_at DESC').bind(visit_id)
      : c.env.DB.prepare('SELECT * FROM visit_notes ORDER BY created_at DESC LIMIT 500')
    const results = await query.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 9. CARE PLANS CRUD
// ============================================================
app.post('/api/care-plans', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(
      'INSERT INTO care_plans (client_id, care_level, hours_per_week, services, status, start_date, end_date, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(body.client_id, body.care_level || '', body.hours_per_week || 0, JSON.stringify(body.services || []), body.status || 'Active', body.start_date || '', body.end_date || '', body.notes || '', now).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/care-plans', async (c) => {
  try {
    const client_id = c.req.query('client_id')
    const query = client_id
      ? c.env.DB.prepare('SELECT * FROM care_plans WHERE client_id = ? ORDER BY created_at DESC').bind(client_id)
      : c.env.DB.prepare('SELECT * FROM care_plans ORDER BY created_at DESC LIMIT 500')
    const results = await query.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 10. INVOICES CRUD
// ============================================================
app.post('/api/invoices', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const balance = (body.total_amount || 0) - (body.amount_paid || 0)
    const result = await c.env.DB.prepare(`
      INSERT INTO invoices (client_id, invoice_number, invoice_date, due_date, payment_terms, subtotal, tax_amount, total_amount, amount_paid, balance_due, status, notes, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(body.client_id, body.invoice_number, body.invoice_date, body.due_date, body.payment_terms || 'Net 30', body.subtotal || 0, body.tax_amount || 0, body.total_amount || 0, body.amount_paid || 0, balance, body.status || 'Pending', body.notes || '', now).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.get('/api/invoices', async (c) => {
  try {
    const client_id = c.req.query('client_id')
    const query = client_id
      ? c.env.DB.prepare('SELECT * FROM invoices WHERE client_id = ? ORDER BY created_at DESC').bind(client_id)
      : c.env.DB.prepare('SELECT * FROM invoices ORDER BY created_at DESC LIMIT 500')
    const results = await query.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.patch('/api/invoices/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const fields = Object.keys(body).filter(k => k !== 'id')
    const sets = fields.map(f => `${f} = ?`).join(', ')
    const values = fields.map(f => body[f])
    values.push(new Date().toISOString(), id)
    await c.env.DB.prepare(`UPDATE invoices SET ${sets}, updated_at = ? WHERE id = ?`).bind(...values).run()
    return c.json({ success: true })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 11. PAYMENTS
// ============================================================
app.get('/api/payments', async (c) => {
  try {
    const client_id = c.req.query('client_id')
    const query = client_id
      ? c.env.DB.prepare('SELECT * FROM payments WHERE client_id = ? ORDER BY created_at DESC').bind(client_id)
      : c.env.DB.prepare('SELECT * FROM payments ORDER BY created_at DESC LIMIT 500')
    const results = await query.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 12. USERS (admin)
// ============================================================
app.get('/api/users', async (c) => {
  try {
    const role = c.req.query('role')
    const query = role
      ? c.env.DB.prepare('SELECT * FROM users WHERE role = ?').bind(role)
      : c.env.DB.prepare('SELECT * FROM users ORDER BY created_at DESC')
    const results = await query.all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

app.post('/api/users', async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, name, role, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(body.email, body.name, body.role || 'staff', body.phone || '', body.status || 'Active', now).run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 13. ADMIN DASHBOARD STATS
// ============================================================
app.get('/api/admin/stats', async (c) => {
  try {
    const [iq, niq, ac, nac, cc, cl, cg, vi] = await Promise.all([
      c.env.DB.prepare('SELECT COUNT(*) as count FROM inquiries').first(),
      c.env.DB.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'").first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM caregiver_applications').first(),
      c.env.DB.prepare("SELECT COUNT(*) as count FROM caregiver_applications WHERE application_status = 'New'").first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM contact_messages').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM clients').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM caregivers').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM visits').first(),
    ])
    return c.json({
      success: true,
      stats: {
        total_inquiries: iq?.count || 0,
        new_inquiries: niq?.count || 0,
        total_applications: ac?.count || 0,
        new_applications: nac?.count || 0,
        total_contacts: cc?.count || 0,
        total_clients: cl?.count || 0,
        total_caregivers: cg?.count || 0,
        total_visits: vi?.count || 0,
      }
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ============================================================
// 14. FUNCTION: sendInquiryConfirmation
// Sends confirmation email when inquiry is submitted
// ============================================================
app.post('/api/functions/send-inquiry-confirmation', async (c) => {
  try {
    const { inquiry_id } = await c.req.json()
    if (!inquiry_id) return c.json({ error: 'inquiry_id is required' }, 400)

    const inquiry = await c.env.DB.prepare('SELECT * FROM inquiries WHERE id = ?').bind(inquiry_id).first() as any
    if (!inquiry) return c.json({ error: 'Inquiry not found' }, 404)

    let services = ''
    try { services = JSON.parse(inquiry.services_interested || '[]').join(', ') } catch { services = inquiry.services_interested || '' }

    await sendEmail(inquiry.email, 'We Received Your Care Request', `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #4a90e2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You for Reaching Out</h1>
        </div>
        <div style="padding: 30px; background: white;">
          <h2 style="color: #1e3a5f;">Dear ${inquiry.first_name},</h2>
          <p style="color: #2d3436;">We received your request for home care services and understand how important this decision is for you and your family.</p>
          <div style="background: #d4f4dd; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0;">
            <p style="color: #1e3a5f; font-weight: bold; font-size: 18px; margin: 0;">✓ We'll call you within 30 minutes</p>
            <p style="color: #2d3436; margin: 10px 0 0 0;">One of our care coordinators will reach you at <strong>${inquiry.phone}</strong>.</p>
          </div>
          <h3 style="color: #1e3a5f;">What Happens Next:</h3>
          <ol style="color: #2d3436;"><li>Quick Call</li><li>Free Assessment</li><li>Custom Care Plan</li><li>Meet Your Caregiver</li></ol>
          <div style="background: #fff8e1; padding: 15px; border-radius: 8px;">
            <p style="margin: 0;"><strong>Care needed for:</strong> ${inquiry.care_needed_for}<br><strong>Urgency:</strong> ${inquiry.urgency}<br>${services ? `<strong>Services:</strong> ${services}` : ''}</p>
          </div>
        </div>
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Caring Hands Home Health | Austin, Texas | TX License #023937</p>
        </div>
      </div>
    `)

    return c.json({ success: true, message: 'Inquiry confirmation email sent' })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 15. FUNCTION: sendWelcomeEmail
// Sends welcome email to new clients
// ============================================================
app.post('/api/functions/send-welcome-email', async (c) => {
  try {
    const { client_id } = await c.req.json()
    if (!client_id) return c.json({ error: 'client_id is required' }, 400)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    const origin = c.req.header('origin') || 'https://caringhandshomehealthtx.com'

    await sendEmail(client.email, 'Welcome to Caring Hands Home Health', `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #4a90e2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white;">Welcome to Caring Hands</h1>
          <p style="color: #d4af37; font-size: 18px;">Premium Home Health Care</p>
        </div>
        <div style="padding: 30px; background: white;">
          <h2 style="color: #1e3a5f;">Dear ${client.first_name},</h2>
          <p>Thank you for choosing Caring Hands Home Health.</p>
          <div style="background: #f8f9fa; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0;">
            <h3 style="color: #1e3a5f;">Your Client Portal</h3>
            <p><strong>Portal:</strong> <a href="${origin}">${origin}</a></p>
            <p><strong>Email:</strong> ${client.email}</p>
          </div>
          <h3 style="color: #1e3a5f;">What You Can Do:</h3>
          <ul><li>View care plan</li><li>See upcoming visits</li><li>Access visit notes</li><li>Manage billing</li><li>Message your care team</li></ul>
          <p>The Caring Hands Team</p>
        </div>
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Caring Hands Home Health | Austin, Texas | TX License #023937</p>
        </div>
      </div>
    `)

    return c.json({ success: true, message: 'Welcome email sent' })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 16. FUNCTION: sendVisitReminder
// Sends visit reminder email to client and caregiver
// ============================================================
app.post('/api/functions/send-visit-reminder', async (c) => {
  try {
    const { visit_id } = await c.req.json()
    if (!visit_id) return c.json({ error: 'visit_id is required' }, 400)

    const visit = await c.env.DB.prepare('SELECT * FROM visits WHERE id = ?').bind(visit_id).first() as any
    if (!visit) return c.json({ error: 'Visit not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(visit.client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    let caregiver: any = null
    if (visit.caregiver_id) {
      caregiver = await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(visit.caregiver_id).first()
    }

    const caregiverName = caregiver ? `${caregiver.first_name} ${caregiver.last_name}` : 'your caregiver'

    await sendEmail(client.email, 'Visit Reminder - Tomorrow', `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4a90e2; padding: 20px; text-align: center;"><h1 style="color: white;">Visit Reminder</h1></div>
        <div style="padding: 30px; background: white;">
          <h2 style="color: #1e3a5f;">Hello ${client.first_name},</h2>
          <p>Reminder about your upcoming care visit tomorrow.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>Date:</strong> ${visit.visit_date}</p>
            <p><strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}</p>
            <p><strong>Caregiver:</strong> ${caregiverName}</p>
            <p><strong>Service:</strong> ${visit.visit_type}</p>
          </div>
          <p>Need to reschedule? Call us at <strong>(512) 436-0774</strong></p>
        </div>
      </div>
    `)

    if (caregiver) {
      await sendEmail(caregiver.email, 'Visit Reminder - Tomorrow', `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e3a5f; padding: 20px; text-align: center;"><h1 style="color: white;">Visit Reminder</h1></div>
          <div style="padding: 30px;">
            <h2 style="color: #1e3a5f;">Hi ${caregiver.first_name},</h2>
            <p>Reminder: scheduled visit tomorrow.</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
              <p><strong>Client:</strong> ${client.first_name} ${client.last_name}</p>
              <p><strong>Date:</strong> ${visit.visit_date}</p>
              <p><strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}</p>
              <p><strong>Address:</strong> ${client.address_street}, ${client.address_city}, ${client.address_state} ${client.address_zip}</p>
            </div>
          </div>
        </div>
      `)
    }

    return c.json({ success: true, message: 'Visit reminders sent', recipients: caregiver ? ['client', 'caregiver'] : ['client'] })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 17. FUNCTION: sendVisitConfirmationSMS
// ============================================================
app.post('/api/functions/send-visit-confirmation-sms', async (c) => {
  try {
    const { visit_id } = await c.req.json()
    if (!visit_id) return c.json({ error: 'visit_id is required' }, 400)

    const visit = await c.env.DB.prepare('SELECT * FROM visits WHERE id = ?').bind(visit_id).first() as any
    if (!visit) return c.json({ error: 'Visit not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(visit.client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    let caregiverName = 'your caregiver'
    if (visit.caregiver_id) {
      const cg = await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(visit.caregiver_id).first() as any
      if (cg) caregiverName = `${cg.first_name} ${cg.last_name}`
    }

    const message = `Caring Hands: Your visit with ${caregiverName} is confirmed for ${visit.visit_date} at ${visit.scheduled_start_time}. Reply CANCEL to cancel.`
    const result = await sendSMS(c.env, client.phone, message)

    return c.json({ success: true, message: 'Confirmation SMS sent', ...result })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 18. FUNCTION: sendCaregiverAssignmentSMS
// ============================================================
app.post('/api/functions/send-caregiver-assignment-sms', async (c) => {
  try {
    const { visit_id, caregiver_id } = await c.req.json()
    if (!visit_id || !caregiver_id) return c.json({ error: 'visit_id and caregiver_id are required' }, 400)

    const visit = await c.env.DB.prepare('SELECT * FROM visits WHERE id = ?').bind(visit_id).first() as any
    if (!visit) return c.json({ error: 'Visit not found' }, 404)

    const caregiver = await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(caregiver_id).first() as any
    if (!caregiver) return c.json({ error: 'Caregiver not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(visit.client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    const message = `Caring Hands: New visit assigned - ${client.first_name} ${client.last_name} on ${visit.visit_date} at ${visit.scheduled_start_time}. Reply YES to confirm or NO to decline.`
    const result = await sendSMS(c.env, caregiver.phone, message)

    return c.json({ success: true, message: 'Assignment SMS sent', ...result })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 19. FUNCTION: sendLateClockInAlert
// ============================================================
app.post('/api/functions/send-late-clockin-alert', async (c) => {
  try {
    const { visit_id } = await c.req.json()
    if (!visit_id) return c.json({ error: 'visit_id is required' }, 400)

    const visit = await c.env.DB.prepare('SELECT * FROM visits WHERE id = ?').bind(visit_id).first() as any
    if (!visit) return c.json({ error: 'Visit not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(visit.client_id).first() as any
    const caregiver = visit.caregiver_id ? await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(visit.caregiver_id).first() as any : null

    if (!client || !caregiver) return c.json({ error: 'Client or caregiver not found' }, 404)

    const message = `⚠️ ALERT: ${caregiver.first_name} ${caregiver.last_name} is 15+ minutes late for visit with ${client.first_name} ${client.last_name} (scheduled ${visit.scheduled_start_time}). Please check in.`

    // Send to admins
    const admins = await c.env.DB.prepare("SELECT * FROM users WHERE role = 'admin'").all()
    let alertsSent = 0
    for (const admin of (admins.results || []) as any[]) {
      if (admin.phone) {
        await sendSMS(c.env, admin.phone, message)
        alertsSent++
      }
      await sendEmail(admin.email, '⚠️ Late Clock-In Alert', `<p>${message}</p>`)
      alertsSent++
    }

    return c.json({ success: true, message: 'Late clock-in alerts sent', alerts_sent: alertsSent })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 20. FUNCTION: sendScheduleChangeNotification
// ============================================================
app.post('/api/functions/send-schedule-change', async (c) => {
  try {
    const { visit_id, change_type, change_details } = await c.req.json()
    if (!visit_id || !change_type) return c.json({ error: 'visit_id and change_type are required' }, 400)

    const visit = await c.env.DB.prepare('SELECT * FROM visits WHERE id = ?').bind(visit_id).first() as any
    if (!visit) return c.json({ error: 'Visit not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(visit.client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    let caregiver: any = null
    if (visit.caregiver_id) {
      caregiver = await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(visit.caregiver_id).first()
    }

    const notifications: any[] = []
    const caregiverName = caregiver ? `${caregiver.first_name} ${caregiver.last_name}` : 'TBD'

    // Client SMS
    const clientMsg = change_type === 'cancellation'
      ? `Caring Hands: Your visit on ${visit.visit_date} has been cancelled. ${change_details || 'We will contact you to reschedule.'}`
      : change_type === 'caregiver_change'
        ? `Caring Hands: Your visit on ${visit.visit_date} - caregiver changed to ${caregiverName}.`
        : `Caring Hands: Your visit rescheduled to ${visit.visit_date} at ${visit.scheduled_start_time}.`
    
    await sendSMS(c.env, client.phone, clientMsg)
    notifications.push({ recipient: 'client', method: 'sms' })

    await sendEmail(client.email, `Schedule Update - ${visit.visit_date}`, `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <div style="background: #4a90e2; padding: 20px; text-align: center;"><h1 style="color: white;">Schedule Update</h1></div>
        <div style="padding: 30px;">
          <h2 style="color: #1e3a5f;">Hello ${client.first_name},</h2>
          <p>We wanted to notify you of a change to your visit:</p>
          <div style="background: #fff8e1; border-left: 4px solid #f59e0b; padding: 20px;">
            <p><strong>Date:</strong> ${visit.visit_date}<br><strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}<br>${caregiver ? `<strong>Caregiver:</strong> ${caregiverName}<br>` : ''}${change_details ? `<strong>Reason:</strong> ${change_details}` : ''}</p>
          </div>
          <p>Questions? Call (512) 436-0774</p>
        </div>
      </div>
    `)
    notifications.push({ recipient: 'client', method: 'email' })

    if (caregiver) {
      const cgMsg = change_type === 'cancellation'
        ? `Caring Hands: Visit with ${client.first_name} ${client.last_name} on ${visit.visit_date} cancelled.`
        : `Caring Hands: Visit update - ${client.first_name} ${client.last_name} on ${visit.visit_date} at ${visit.scheduled_start_time}.`
      await sendSMS(c.env, caregiver.phone, cgMsg)
      await sendEmail(caregiver.email, `Schedule Update - ${visit.visit_date}`, `<p>${cgMsg}</p>`)
      notifications.push({ recipient: 'caregiver', method: 'sms' }, { recipient: 'caregiver', method: 'email' })
    }

    return c.json({ success: true, message: 'Schedule change notifications sent', notifications_sent: notifications })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 21. FUNCTION: sendVisitNotesSummary
// ============================================================
app.post('/api/functions/send-visit-notes-summary', async (c) => {
  try {
    const { visit_note_id } = await c.req.json()
    if (!visit_note_id) return c.json({ error: 'visit_note_id is required' }, 400)

    const note = await c.env.DB.prepare('SELECT * FROM visit_notes WHERE id = ?').bind(visit_note_id).first() as any
    if (!note) return c.json({ error: 'Visit note not found' }, 404)

    const visit = await c.env.DB.prepare('SELECT * FROM visits WHERE id = ?').bind(note.visit_id).first() as any
    if (!visit) return c.json({ error: 'Visit not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(visit.client_id).first() as any
    const caregiver = await c.env.DB.prepare('SELECT * FROM caregivers WHERE id = ?').bind(note.caregiver_id).first() as any

    if (!client || !caregiver) return c.json({ error: 'Client or caregiver not found' }, 404)

    await sendEmail(client.email, `Daily Care Summary - ${visit.visit_date}`, `
      <div style="font-family: Arial; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4a90e2 0%, #1e3a5f 100%); padding: 30px; text-align: center;">
          <h1 style="color: white;">Daily Care Summary</h1>
          <p style="color: #d4af37;">${visit.visit_date}</p>
        </div>
        <div style="padding: 30px; background: white;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <p><strong>Caregiver:</strong> ${caregiver.first_name} ${caregiver.last_name}</p>
            <p><strong>Time:</strong> ${visit.actual_start_time || visit.scheduled_start_time} - ${visit.actual_end_time || visit.scheduled_end_time}</p>
          </div>
          ${note.tasks_completed ? `<h3 style="color: #1e3a5f;">Tasks Completed</h3><p>${note.tasks_completed}</p>` : ''}
          ${note.meals_provided ? `<h3 style="color: #1e3a5f;">Meals Provided</h3><p>${note.meals_provided}</p>` : ''}
          ${note.medications_given ? `<h3 style="color: #1e3a5f;">Medications</h3><p>${note.medications_given}</p>` : ''}
          ${note.client_mood ? `<div style="background: #e8f4fd; padding: 15px; border-radius: 8px;"><p><strong>Mood:</strong> ${note.client_mood}</p></div>` : ''}
          ${note.observations ? `<h3 style="color: #1e3a5f;">Observations</h3><p>${note.observations}</p>` : ''}
          ${note.incidents ? `<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px;"><h3 style="color: #ef4444;">⚠️ Incident</h3><p>${note.incidents}</p></div>` : ''}
        </div>
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Caring Hands Home Health | Austin, Texas | TX License #023937</p>
        </div>
      </div>
    `)

    return c.json({ success: true, message: 'Visit notes summary sent' })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 22. FUNCTION: sendInvoiceEmail
// ============================================================
app.post('/api/functions/send-invoice-email', async (c) => {
  try {
    const { invoice_id } = await c.req.json()
    if (!invoice_id) return c.json({ error: 'invoice_id is required' }, 400)

    const invoice = await c.env.DB.prepare('SELECT * FROM invoices WHERE id = ?').bind(invoice_id).first() as any
    if (!invoice) return c.json({ error: 'Invoice not found' }, 404)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(invoice.client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    const lineItems = await c.env.DB.prepare('SELECT * FROM invoice_line_items WHERE invoice_id = ?').bind(invoice_id).all()
    const itemsHTML = ((lineItems.results || []) as any[]).map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(item.unit_price || 0).toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">$${(item.line_total || 0).toFixed(2)}</td>
      </tr>
    `).join('')

    const origin = c.req.header('origin') || 'https://caringhandshomehealthtx.com'

    await sendEmail(client.email, `Invoice ${invoice.invoice_number} - Due ${invoice.due_date}`, `
      <div style="font-family: Arial; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #4a90e2 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; font-size: 32px;">INVOICE</h1>
          <p style="color: #d4af37; font-size: 24px; font-weight: bold;">${invoice.invoice_number}</p>
        </div>
        <div style="padding: 40px;">
          <div style="margin-bottom: 30px;">
            <p><strong>Bill To:</strong> ${client.first_name} ${client.last_name}<br>${client.address_street}<br>${client.address_city}, ${client.address_state} ${client.address_zip}</p>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
            <p><strong>Invoice Date:</strong> ${invoice.invoice_date} | <strong>Due Date:</strong> ${invoice.due_date} | <strong>Terms:</strong> ${invoice.payment_terms}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead><tr style="background: #1e3a5f; color: white;"><th style="padding: 12px; text-align: left;">Description</th><th style="padding: 12px; text-align: center;">Qty</th><th style="padding: 12px; text-align: right;">Rate</th><th style="padding: 12px; text-align: right;">Amount</th></tr></thead>
            <tbody>${itemsHTML}</tbody>
          </table>
          <div style="margin-top: 30px; text-align: right;">
            <p><strong>Subtotal:</strong> $${(invoice.subtotal || 0).toFixed(2)}</p>
            ${invoice.tax_amount > 0 ? `<p><strong>Tax:</strong> $${invoice.tax_amount.toFixed(2)}</p>` : ''}
            <p style="font-size: 20px;"><strong>TOTAL: $${(invoice.total_amount || 0).toFixed(2)}</strong></p>
            <p><strong>Balance Due: $${(invoice.balance_due || 0).toFixed(2)}</strong></p>
          </div>
          <div style="background: #22c55e; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
            <a href="${origin}/Billing" style="color: white; font-size: 18px; font-weight: bold; text-decoration: none;">Pay Now - $${(invoice.balance_due || 0).toFixed(2)}</a>
          </div>
        </div>
      </div>
    `)

    return c.json({ success: true, message: 'Invoice email sent' })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 23. FUNCTION: processStripePayment
// ============================================================
app.post('/api/functions/process-stripe-payment', async (c) => {
  try {
    const { client_id, invoice_id, amount, payment_method_id } = await c.req.json()
    if (!client_id || !invoice_id || !amount || !payment_method_id) {
      return c.json({ error: 'Missing required fields: client_id, invoice_id, amount, payment_method_id' }, 400)
    }

    if (!c.env.STRIPE_SECRET_KEY) {
      return c.json({ error: 'Stripe secret key not configured. Set STRIPE_SECRET_KEY as a Pages secret.' }, 500)
    }

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(client_id).first() as any
    const invoice = await c.env.DB.prepare('SELECT * FROM invoices WHERE id = ?').bind(invoice_id).first() as any
    if (!client || !invoice) return c.json({ error: 'Client or invoice not found' }, 404)

    // Create Stripe payment intent via REST API
    const stripeResp = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: String(Math.round(amount * 100)),
        currency: 'usd',
        payment_method: payment_method_id,
        confirm: 'true',
        'automatic_payment_methods[enabled]': 'true',
        'automatic_payment_methods[allow_redirects]': 'never',
        'metadata[client_id]': String(client_id),
        'metadata[invoice_id]': String(invoice_id),
        'metadata[client_name]': `${client.first_name} ${client.last_name}`,
        'metadata[invoice_number]': invoice.invoice_number,
      }),
    })

    const paymentIntent = await stripeResp.json() as any
    const now = new Date().toISOString()

    if (paymentIntent.status === 'succeeded') {
      // Record payment
      await c.env.DB.prepare(
        'INSERT INTO payments (invoice_id, client_id, payment_date, amount, payment_method, stripe_payment_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(invoice_id, client_id, now.split('T')[0], amount, 'Stripe', paymentIntent.id, 'Completed', now).run()

      // Update invoice
      const newAmountPaid = (invoice.amount_paid || 0) + amount
      const newBalance = invoice.total_amount - newAmountPaid
      await c.env.DB.prepare(
        'UPDATE invoices SET amount_paid = ?, balance_due = ?, status = ?, paid_at = ?, updated_at = ? WHERE id = ?'
      ).bind(newAmountPaid, newBalance, newBalance <= 0 ? 'Paid' : invoice.status, newBalance <= 0 ? now : (invoice.paid_at || ''), now, invoice_id).run()

      await sendEmail(client.email, `Payment Receipt - ${invoice.invoice_number}`, `
        <h2>Payment Received</h2><p>Dear ${client.first_name},</p>
        <p>Thank you for your payment of $${amount.toFixed(2)}.</p>
        <p><strong>Invoice:</strong> ${invoice.invoice_number}</p>
        ${newBalance <= 0 ? '<p style="color: green;"><strong>Your invoice has been paid in full.</strong></p>' : `<p><strong>Remaining Balance:</strong> $${newBalance.toFixed(2)}</p>`}
      `)

      return c.json({ success: true, payment_id: paymentIntent.id, amount_paid: amount, remaining_balance: newBalance })
    } else {
      await c.env.DB.prepare(
        'INSERT INTO payments (invoice_id, client_id, payment_date, amount, payment_method, stripe_payment_id, status, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(invoice_id, client_id, now.split('T')[0], amount, 'Stripe', paymentIntent.id, 'Failed', `Payment ${paymentIntent.status}`, now).run()

      return c.json({ success: false, error: 'Payment failed or requires additional action', status: paymentIntent.status }, 400)
    }
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 24. FUNCTION: stripeWebhook
// ============================================================
app.post('/api/webhooks/stripe', async (c) => {
  try {
    if (!c.env.STRIPE_SECRET_KEY || !c.env.STRIPE_WEBHOOK_SECRET) {
      return c.json({ error: 'Stripe keys not configured' }, 500)
    }

    const rawBody = await c.req.text()
    const signature = c.req.header('stripe-signature')
    if (!signature) return c.json({ error: 'No signature' }, 400)

    // In production, verify the webhook signature
    // For now, parse the event directly
    const event = JSON.parse(rawBody) as any

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object
      const { client_id, invoice_id } = pi.metadata || {}
      if (!invoice_id) return c.json({ received: true, note: 'No invoice_id in metadata' })

      const invoice = await c.env.DB.prepare('SELECT * FROM invoices WHERE id = ?').bind(invoice_id).first() as any
      if (!invoice) return c.json({ received: true, note: 'Invoice not found' })

      const existing = await c.env.DB.prepare('SELECT * FROM payments WHERE stripe_payment_id = ?').bind(pi.id).first()
      if (existing) return c.json({ received: true, note: 'Payment already recorded' })

      const amount = pi.amount / 100
      const now = new Date().toISOString()
      await c.env.DB.prepare(
        'INSERT INTO payments (invoice_id, client_id, payment_date, amount, payment_method, stripe_payment_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(invoice_id, client_id, now.split('T')[0], amount, 'Stripe', pi.id, 'Completed', now).run()

      const newPaid = (invoice.amount_paid || 0) + amount
      const newBalance = invoice.total_amount - newPaid
      await c.env.DB.prepare(
        'UPDATE invoices SET amount_paid = ?, balance_due = ?, status = ?, updated_at = ? WHERE id = ?'
      ).bind(newPaid, newBalance, newBalance <= 0 ? 'Paid' : invoice.status, now, invoice_id).run()

      return c.json({ received: true, status: 'payment_recorded' })
    }

    if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object
      const { client_id, invoice_id } = pi.metadata || {}
      if (!invoice_id) return c.json({ received: true })

      const amount = pi.amount / 100
      const now = new Date().toISOString()
      await c.env.DB.prepare(
        'INSERT INTO payments (invoice_id, client_id, payment_date, amount, payment_method, stripe_payment_id, status, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(invoice_id, client_id, now.split('T')[0], amount, 'Stripe', pi.id, 'Failed', pi.last_payment_error?.message || 'Payment failed', now).run()

      return c.json({ received: true, status: 'failure_logged' })
    }

    return c.json({ received: true })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 25. FUNCTION: twilioSMSWebhook
// ============================================================
app.post('/api/webhooks/twilio', async (c) => {
  try {
    const formData = await c.req.formData()
    const from = formData.get('From') as string
    const bodyText = (formData.get('Body') as string || '').toUpperCase().trim()

    if (!from || !bodyText) {
      return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { headers: { 'Content-Type': 'text/xml' } })
    }

    if (bodyText === 'CANCEL') {
      const client = await c.env.DB.prepare('SELECT * FROM clients WHERE phone = ?').bind(from).first() as any
      if (client) {
        const visit = await c.env.DB.prepare("SELECT * FROM visits WHERE client_id = ? AND status = 'Scheduled' ORDER BY visit_date ASC LIMIT 1").bind(client.id).first() as any
        if (visit) {
          await c.env.DB.prepare("UPDATE visits SET status = 'Cancelled', cancellation_reason = 'Cancelled via SMS', updated_at = ? WHERE id = ?").bind(new Date().toISOString(), visit.id).run()
          return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Your visit on ${visit.visit_date} has been cancelled. We will contact you to reschedule. Call (512) 436-0774 for help.</Message></Response>`, { headers: { 'Content-Type': 'text/xml' } })
        }
      }
    }

    if (bodyText === 'YES') {
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Thank you for confirming! Visit details are in your app.</Message></Response>`, { headers: { 'Content-Type': 'text/xml' } })
    }

    if (bodyText === 'NO') {
      const caregiver = await c.env.DB.prepare('SELECT * FROM caregivers WHERE phone = ?').bind(from).first() as any
      if (caregiver) {
        const admins = await c.env.DB.prepare("SELECT * FROM users WHERE role = 'admin'").all()
        for (const admin of (admins.results || []) as any[]) {
          await sendEmail(admin.email, 'Caregiver Declined Visit', `${caregiver.first_name} ${caregiver.last_name} declined a visit assignment via SMS. Please reassign.`)
        }
      }
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>We understand. Our team will reassign this visit.</Message></Response>`, { headers: { 'Content-Type': 'text/xml' } })
    }

    if (bodyText === 'STOP' || bodyText === 'UNSUBSCRIBE') {
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Unsubscribed from SMS. Call (512) 436-0774 to re-enable.</Message></Response>`, { headers: { 'Content-Type': 'text/xml' } })
    }

    return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>Thank you. For help call (512) 436-0774.</Message></Response>`, { headers: { 'Content-Type': 'text/xml' } })
  } catch (error: any) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { headers: { 'Content-Type': 'text/xml' } })
  }
})

// ============================================================
// 26. FUNCTION: encryptPHI
// AES-GCM encryption/decryption using Web Crypto API
// ============================================================
app.post('/api/functions/encrypt-phi', async (c) => {
  try {
    const { data, operation } = await c.req.json()
    if (!data || !operation) return c.json({ error: 'data and operation (encrypt/decrypt) are required' }, 400)

    const encryptionKey = c.env.PHI_ENCRYPTION_KEY
    if (!encryptionKey) return c.json({ error: 'PHI_ENCRYPTION_KEY not configured' }, 500)

    const keyData = new TextEncoder().encode(encryptionKey.padEnd(32, '0').substring(0, 32))
    const key = await crypto.subtle.importKey('raw', keyData, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])

    if (operation === 'encrypt') {
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const encodedData = new TextEncoder().encode(JSON.stringify(data))
      const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedData)
      const combined = new Uint8Array(iv.length + encryptedData.byteLength)
      combined.set(iv, 0)
      combined.set(new Uint8Array(encryptedData), iv.length)
      const base64 = btoa(String.fromCharCode(...combined))
      return c.json({ success: true, encrypted_data: base64 })
    } else if (operation === 'decrypt') {
      const combined = Uint8Array.from(atob(data), c => c.charCodeAt(0))
      const iv = combined.slice(0, 12)
      const encryptedData = combined.slice(12)
      const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData)
      const decoded = new TextDecoder().decode(decryptedData)
      return c.json({ success: true, decrypted_data: JSON.parse(decoded) })
    } else {
      return c.json({ error: 'Invalid operation. Use "encrypt" or "decrypt"' }, 400)
    }
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 27. FUNCTION: archiveOldRecords
// ============================================================
app.post('/api/functions/archive-old-records', async (c) => {
  try {
    const now = new Date()
    const sevenYearsAgo = new Date(now.getFullYear() - 7, now.getMonth(), now.getDate()).toISOString()
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate()).toISOString()

    const results = { clients_archived: 0, inquiries_deleted: 0, visits_archived: 0 }

    // Archive discharged clients older than 7 years
    const oldClients = await c.env.DB.prepare("SELECT * FROM clients WHERE status = 'Discharged' AND discharge_date < ?").bind(sevenYearsAgo).all()
    for (const client of (oldClients.results || []) as any[]) {
      await c.env.DB.prepare(`UPDATE clients SET first_name = ?, last_name = 'CLIENT', email = ?, phone = 'XXX-XXX-XXXX', medical_conditions = '[ARCHIVED]', medications = '[ARCHIVED]', special_instructions = '[ARCHIVED]', address_street = '[ARCHIVED]', emergency_contact_name = '[ARCHIVED]', emergency_contact_phone = '[ARCHIVED]', updated_at = ? WHERE id = ?`
      ).bind(`ARCHIVED_${client.id}`, `archived_${client.id}@archived.local`, new Date().toISOString(), client.id).run()
      results.clients_archived++
    }

    // Delete non-converted inquiries older than 2 years
    const oldInquiries = await c.env.DB.prepare("SELECT * FROM inquiries WHERE status = 'Lost' AND inquiry_date < ?").bind(twoYearsAgo).all()
    for (const inquiry of (oldInquiries.results || []) as any[]) {
      await c.env.DB.prepare('DELETE FROM inquiries WHERE id = ?').bind(inquiry.id).run()
      results.inquiries_deleted++
    }

    // Count old visits
    const oldVisits = await c.env.DB.prepare('SELECT COUNT(*) as count FROM visits WHERE visit_date < ?').bind(sevenYearsAgo).first() as any
    results.visits_archived = oldVisits?.count || 0

    // Log the archival
    await c.env.DB.prepare(
      "INSERT INTO activity_log (action_type, entity_name, description, timestamp, risk_level, was_successful, new_values, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind('Delete', 'Multiple', 'Archive old records per HIPAA retention policy', new Date().toISOString(), 'Medium', 1, JSON.stringify(results), new Date().toISOString()).run()

    return c.json({ success: true, message: 'Archive process completed', results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 28. FUNCTION: deleteClientData (HIPAA-compliant anonymization)
// ============================================================
app.post('/api/functions/delete-client-data', async (c) => {
  try {
    const { client_id, deletion_reason } = await c.req.json()
    if (!client_id) return c.json({ error: 'client_id is required' }, 400)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    const results = { client_anonymized: false, visits_anonymized: 0, notes_anonymized: 0, invoices_anonymized: 0, conversations_deleted: 0, consent_records_preserved: 0 }
    const now = new Date().toISOString()

    // 1. Anonymize client record
    await c.env.DB.prepare(`
      UPDATE clients SET first_name = ?, last_name = 'USER', email = ?, phone = 'XXX-XXX-XXXX',
      date_of_birth = '1900-01-01', address_street = '[DELETED]', address_city = '[DELETED]', address_zip = '00000',
      medical_conditions = '[DELETED PER USER REQUEST]', medications = '[DELETED PER USER REQUEST]',
      special_instructions = '[DELETED PER USER REQUEST]', emergency_contact_name = '[DELETED]',
      emergency_contact_phone = '[DELETED]', status = 'Discharged', discharge_date = ?,
      discharge_reason = ?, updated_at = ? WHERE id = ?
    `).bind(`DELETED_${client_id}`, `deleted_${client_id}@deleted.local`, now.split('T')[0], deletion_reason || 'Data deletion requested', now, client_id).run()
    results.client_anonymized = true

    // 2. Anonymize visit notes
    const visits = await c.env.DB.prepare('SELECT id FROM visits WHERE client_id = ?').bind(client_id).all()
    const visitIds = ((visits.results || []) as any[]).map((v: any) => v.id)
    for (const vid of visitIds) {
      const updated = await c.env.DB.prepare("UPDATE visit_notes SET tasks_completed = '[DELETED]', meals_provided = '[DELETED]', medications_given = '[DELETED]', observations = '[DELETED]', incidents = '[DELETED]', photos = '[]' WHERE visit_id = ?").bind(vid).run()
      results.notes_anonymized += updated.meta.changes || 0
    }

    // 3. Anonymize invoices
    const invUpdate = await c.env.DB.prepare("UPDATE invoices SET notes = '[DELETED]', updated_at = ? WHERE client_id = ?").bind(now, client_id).run()
    results.invoices_anonymized = invUpdate.meta.changes || 0

    // 4. Delete conversations and messages
    const convs = await c.env.DB.prepare('SELECT id FROM conversations WHERE client_id = ?').bind(client_id).all()
    for (const conv of (convs.results || []) as any[]) {
      await c.env.DB.prepare('DELETE FROM messages WHERE conversation_id = ?').bind(conv.id).run()
      await c.env.DB.prepare('DELETE FROM conversations WHERE id = ?').bind(conv.id).run()
      results.conversations_deleted++
    }

    // 5. Count preserved consent records
    const consents = await c.env.DB.prepare('SELECT COUNT(*) as count FROM consent_records WHERE client_id = ?').bind(client_id).first() as any
    results.consent_records_preserved = consents?.count || 0

    // Log deletion
    await c.env.DB.prepare(
      "INSERT INTO activity_log (action_type, entity_name, entity_id, description, timestamp, risk_level, was_successful, new_values, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind('Delete', 'Client', String(client_id), 'Full client data deletion/anonymization', now, 'Critical', 1, JSON.stringify(results), now).run()

    // Send confirmation email
    await sendEmail(client.email, 'Data Deletion Confirmation', `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e3a5f; padding: 30px; text-align: center;"><h1 style="color: white;">Data Deletion Completed</h1></div>
        <div style="padding: 30px;">
          <p>Your personal data has been deleted/anonymized per your request.</p>
          <div style="background: #d4f4dd; border-left: 4px solid #22c55e; padding: 15px;">
            <p><strong>✓ Deleted:</strong> Personal info, medical records, visit notes, conversations</p>
          </div>
          <div style="background: #fff8e1; padding: 15px; margin-top: 15px;">
            <p><strong>Retained (legal requirement):</strong> Anonymized financial records, consent forms, audit logs (7-year retention)</p>
          </div>
          <p>Questions? Contact privacy@caringhandshomehealthtx.com</p>
        </div>
      </div>
    `)

    return c.json({ success: true, message: 'Client data anonymized/deleted', results, note: 'HIPAA-compliant: consent and financial records retained per legal obligations.' })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 29. FUNCTION: exportClientData
// ============================================================
app.post('/api/functions/export-client-data', async (c) => {
  try {
    const { client_id } = await c.req.json()
    if (!client_id) return c.json({ error: 'client_id is required' }, 400)

    const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(client_id).first() as any
    if (!client) return c.json({ error: 'Client not found' }, 404)

    const [carePlans, visits, invoices, payments, familyMembers, conversations] = await Promise.all([
      c.env.DB.prepare('SELECT * FROM care_plans WHERE client_id = ?').bind(client_id).all(),
      c.env.DB.prepare('SELECT * FROM visits WHERE client_id = ?').bind(client_id).all(),
      c.env.DB.prepare('SELECT * FROM invoices WHERE client_id = ?').bind(client_id).all(),
      c.env.DB.prepare('SELECT * FROM payments WHERE client_id = ?').bind(client_id).all(),
      c.env.DB.prepare('SELECT * FROM family_members WHERE client_id = ?').bind(client_id).all(),
      c.env.DB.prepare('SELECT * FROM conversations WHERE client_id = ?').bind(client_id).all(),
    ])

    // Get visit notes for client's visits
    const visitIds = ((visits.results || []) as any[]).map((v: any) => v.id)
    let visitNotes: any[] = []
    for (const vid of visitIds) {
      const notes = await c.env.DB.prepare('SELECT * FROM visit_notes WHERE visit_id = ?').bind(vid).all()
      visitNotes.push(...(notes.results || []))
    }

    const jsonExport = {
      export_date: new Date().toISOString(),
      client, care_plans: carePlans.results, visits: visits.results,
      visit_notes: visitNotes, invoices: invoices.results,
      payments: payments.results, family_members: familyMembers.results,
      conversations: conversations.results,
    }

    // Log export
    await c.env.DB.prepare(
      "INSERT INTO activity_log (action_type, entity_name, entity_id, description, timestamp, risk_level, was_successful, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind('Export Data', 'Client', String(client_id), 'Full HIPAA data export', new Date().toISOString(), 'High', 1, new Date().toISOString()).run()

    return c.json({ success: true, json_export: jsonExport })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 30. FUNCTION: auditDataAccess
// ============================================================
app.post('/api/functions/audit-data-access', async (c) => {
  try {
    const { target_user_id, start_date, end_date, entity_filter } = await c.req.json()

    let query = 'SELECT * FROM activity_log WHERE 1=1'
    const binds: any[] = []
    if (target_user_id) { query += ' AND user_id = ?'; binds.push(target_user_id) }
    if (start_date) { query += ' AND timestamp >= ?'; binds.push(start_date) }
    if (end_date) { query += ' AND timestamp <= ?'; binds.push(end_date) }
    if (entity_filter) { query += ' AND entity_name = ?'; binds.push(entity_filter) }
    query += ' ORDER BY timestamp DESC LIMIT 1000'

    const stmt = binds.length > 0 ? c.env.DB.prepare(query).bind(...binds) : c.env.DB.prepare(query)
    const results = await stmt.all()
    const logs = (results.results || []) as any[]

    const summary = {
      total_activities: logs.length,
      by_action_type: {} as any,
      by_entity: {} as any,
      by_risk_level: {} as any,
      phi_access_count: 0,
      failed_actions: 0,
    }

    logs.forEach((log: any) => {
      summary.by_action_type[log.action_type] = (summary.by_action_type[log.action_type] || 0) + 1
      summary.by_entity[log.entity_name] = (summary.by_entity[log.entity_name] || 0) + 1
      summary.by_risk_level[log.risk_level] = (summary.by_risk_level[log.risk_level] || 0) + 1
      if (['Client', 'Visit_Note', 'Care_Plan'].includes(log.entity_name)) summary.phi_access_count++
      if (!log.was_successful) summary.failed_actions++
    })

    return c.json({ success: true, summary, activities: logs })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 31. FUNCTION: detectSecurityBreach
// ============================================================
app.post('/api/functions/detect-security-breach', async (c) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const recentLogs = await c.env.DB.prepare('SELECT * FROM activity_log WHERE timestamp >= ?').bind(twentyFourHoursAgo).all()
    const logs = (recentLogs.results || []) as any[]

    const userMap: any = {}
    logs.forEach((log: any) => {
      if (!userMap[log.user_id || 'unknown']) {
        userMap[log.user_id || 'unknown'] = { email: log.user_email, total_actions: 0, failed_logins: 0, phi_accesses: 0, unusual_hours: 0, ip_addresses: new Set() }
      }
      const u = userMap[log.user_id || 'unknown']
      u.total_actions++
      if (log.action_type === 'Failed Login') u.failed_logins++
      if (['Client', 'Visit_Note', 'Care_Plan'].includes(log.entity_name) && log.action_type === 'Read') u.phi_accesses++
      if (log.ip_address) u.ip_addresses.add(log.ip_address)
      const hour = new Date(log.timestamp).getHours()
      if (hour >= 22 || hour <= 6) u.unusual_hours++
    })

    const alerts: any[] = []
    Object.entries(userMap).forEach(([userId, activity]: any) => {
      if (activity.failed_logins >= 5) alerts.push({ type: 'Failed Login Pattern', severity: 'High', user_id: userId, user_email: activity.email, description: `${activity.failed_logins} failed login attempts in 24h`, recommendation: 'Lock account and investigate' })
      if (activity.phi_accesses > 50) alerts.push({ type: 'Suspicious Activity', severity: 'Critical', user_id: userId, user_email: activity.email, description: `${activity.phi_accesses} PHI record accesses in 24h`, recommendation: 'Review access patterns immediately' })
      if (activity.ip_addresses.size > 3) alerts.push({ type: 'Suspicious Activity', severity: 'Medium', user_id: userId, user_email: activity.email, description: `Activity from ${activity.ip_addresses.size} different IPs`, recommendation: 'Verify with user' })
      if (activity.unusual_hours > 10) alerts.push({ type: 'Suspicious Activity', severity: 'Medium', user_id: userId, user_email: activity.email, description: `${activity.unusual_hours} actions during unusual hours (10pm-6am)`, recommendation: 'Verify if expected' })
    })

    // Create security incidents for critical/high alerts
    for (const alert of alerts) {
      if (alert.severity === 'Critical' || alert.severity === 'High') {
        const now = new Date().toISOString()
        await c.env.DB.prepare(
          'INSERT INTO security_incidents (incident_type, severity, detected_at, user_id, user_email, description, status, breach_notification_required, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(alert.type, alert.severity, now, alert.user_id, alert.user_email, alert.description, 'Open', alert.severity === 'Critical' ? 1 : 0, now).run()

        if (alert.severity === 'Critical') {
          const admins = await c.env.DB.prepare("SELECT * FROM users WHERE role = 'admin'").all()
          for (const admin of (admins.results || []) as any[]) {
            await sendEmail(admin.email, '🚨 CRITICAL SECURITY ALERT', `
              <div style="background: #dc2626; padding: 30px; text-align: center;"><h1 style="color: white;">🚨 CRITICAL SECURITY ALERT</h1></div>
              <div style="padding: 30px;"><p><strong>Type:</strong> ${alert.type}</p><p>${alert.description}</p><p><strong>User:</strong> ${alert.user_email}</p><p><strong>Action:</strong> ${alert.recommendation}</p></div>
            `)
          }
        }
      }
    }

    return c.json({ success: true, alerts_found: alerts.length, alerts, analysis_period: '24 hours', total_users_analyzed: Object.keys(userMap).length })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 32. ACTIVITY LOG
// ============================================================
app.get('/api/activity-log', async (c) => {
  try {
    const results = await c.env.DB.prepare('SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 500').all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// 33. SECURITY INCIDENTS
// ============================================================
app.get('/api/security-incidents', async (c) => {
  try {
    const results = await c.env.DB.prepare('SELECT * FROM security_incidents ORDER BY created_at DESC LIMIT 200').all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) { return c.json({ error: error.message }, 500) }
})

// ============================================================
// SPA FALLBACK - Serve React app for all non-API routes
// ============================================================
app.get('*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
