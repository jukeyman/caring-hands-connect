// API Client - replaces Base44 SDK with direct fetch calls to our Hono API

const API_BASE = '/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `API error: ${response.status}`);
  }

  return data;
}

// Create a generic entity stub for entities that don't have backend routes yet
// These will gracefully return empty arrays so admin pages don't crash
function createEntityStub(name) {
  return {
    create: (data) => apiRequest(`/${name.toLowerCase()}`, { method: 'POST', body: data }).catch(() => ({ id: 0 })),
    list: () => Promise.resolve([]),
    filter: () => Promise.resolve([]),
    update: (id, data) => Promise.resolve({ success: true }),
    delete: (id) => Promise.resolve({ success: true }),
  };
}

// Entity-like interface to match the old base44.entities pattern
const entities = {
  // ACTIVE FORMS - connected to D1 database via Hono API
  Inquiry: {
    create: (data) => apiRequest('/inquiries', { method: 'POST', body: data }),
    list: () => apiRequest('/inquiries').then(r => r.data || []),
    filter: () => apiRequest('/inquiries').then(r => r.data || []),
    update: (id, data) => apiRequest(`/inquiries/${id}`, { method: 'PATCH', body: data }),
  },
  Caregiver_Application: {
    create: (data) => apiRequest('/applications', { method: 'POST', body: data }),
    list: () => apiRequest('/applications').then(r => r.data || []),
    filter: () => apiRequest('/applications').then(r => r.data || []),
    update: (id, data) => apiRequest(`/applications/${id}`, { method: 'PATCH', body: data }),
  },

  // STUBS - for admin/internal pages that need these entities
  // These return empty data so the pages render without crashing
  Client: createEntityStub('Client'),
  Caregiver: createEntityStub('Caregiver'),
  Visit: createEntityStub('Visit'),
  Visit_Note: createEntityStub('Visit_Note'),
  Care_Plan: createEntityStub('Care_Plan'),
  Invoice: createEntityStub('Invoice'),
  Payment: createEntityStub('Payment'),
  Conversation: createEntityStub('Conversation'),
  Message: createEntityStub('Message'),
  Activity_Log: createEntityStub('Activity_Log'),
  Security_Incident: createEntityStub('Security_Incident'),
  Consent_Record: createEntityStub('Consent_Record'),
  User: createEntityStub('User'),
};

// Integration-like interface (stubs for features that need external services)
const integrations = {
  Core: {
    SendEmail: async (data) => {
      console.log('Email sending would go here:', data?.subject);
      return { success: true };
    },
    UploadFile: async ({ file }) => {
      console.log('File upload stub:', file?.name);
      return { file_url: '' };
    },
  },
};

// Auth stub (no auth required for public site)
const auth = {
  me: async () => null,
  logout: (redirectUrl) => {
    if (redirectUrl) window.location.href = redirectUrl;
  },
  redirectToLogin: (returnUrl) => {
    // Public site doesn't need login - just stay on current page
    console.log('Auth not required for public pages');
  },
};

// App logs stub
const appLogs = {
  logUserInApp: async () => {},
};

export const base44 = {
  entities,
  integrations,
  auth,
  appLogs,
};
