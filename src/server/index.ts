import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// ============================================================
// INQUIRY FORM SUBMISSION (Contact page + Service Inquiry form)
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

// Get all inquiries (admin)
app.get('/api/inquiries', async (c) => {
  try {
    const results = await c.env.DB.prepare(
      'SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100'
    ).all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// Update inquiry status
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
// CAREGIVER APPLICATION FORM (Careers page)
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

// Get all applications (admin)
app.get('/api/applications', async (c) => {
  try {
    const results = await c.env.DB.prepare(
      'SELECT * FROM caregiver_applications ORDER BY created_at DESC LIMIT 100'
    ).all()
    return c.json({ success: true, data: results.results })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// Update application status
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
// CONTACT MESSAGE FORM (generic contact)
// ============================================================
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields: name, email, message' }, 400)
    }

    const now = new Date().toISOString()

    const result = await c.env.DB.prepare(`
      INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(name, email, phone || '', subject || '', message, 'New', now).run()

    return c.json({
      success: true,
      id: result.meta.last_row_id,
      message: 'Message sent successfully'
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ============================================================
// ADMIN DASHBOARD STATS
// ============================================================
app.get('/api/admin/stats', async (c) => {
  try {
    const inquiryCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM inquiries'
    ).first()
    const newInquiries = await c.env.DB.prepare(
      "SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'"
    ).first()
    const applicationCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM caregiver_applications'
    ).first()
    const newApplications = await c.env.DB.prepare(
      "SELECT COUNT(*) as count FROM caregiver_applications WHERE application_status = 'New'"
    ).first()
    const contactCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM contact_messages'
    ).first()

    return c.json({
      success: true,
      stats: {
        total_inquiries: inquiryCount?.count || 0,
        new_inquiries: newInquiries?.count || 0,
        total_applications: applicationCount?.count || 0,
        new_applications: newApplications?.count || 0,
        total_contacts: contactCount?.count || 0
      }
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Caring Hands Home Health API'
  })
})

// ============================================================
// SPA FALLBACK - Serve React app for all non-API routes
// ============================================================
app.get('*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
