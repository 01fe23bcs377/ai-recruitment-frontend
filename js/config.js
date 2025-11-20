/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

const API_CONFIG = {
  // IMPORTANT — FULL BACKEND URL
  BASE_URL: 'https://ai-recruitment-backend-rid4.onrender.com/api',

  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register'
    },
    RESUME: {
      UPLOAD: '/resume/upload',
      ALL: '/resume/all',
      SINGLE: (id) => `/resume/${id}`,
      DELETE: (id) => `/resume/${id}`
    },
    AI: {
      PARSE: (id) => `/ai/parse/${id}`,
      BATCH_PARSE: '/ai/batch-parse'
    },
    RANKING: {
      RANK: '/rank',
      TOP: '/rank/top',
      SINGLE: (id) => `/rank/${id}`
    },
    VERIFICATION: {
      UPLOAD: '/verify/upload',
      VERIFY: '/verify/verify',
      STATUS: (id) => `/verify/status/${id}`,
      DETAILS: '/verify/details'
    },
    DASHBOARD: {
      STATS: '/dashboard/stats'
    },
    HEALTH: '/health'
  }
};

/**
 * Get authentication token from localStorage
 */
function getAuthToken() {
  return localStorage.getItem('recruitai_token');
}

/**
 * Set authentication token in localStorage
 */
function setAuthToken(token) {
  localStorage.setItem('recruitai_token', token);
}

/**
 * Remove authentication token
 */
function removeAuthToken() {
  localStorage.removeItem('recruitai_token');
}

/**
 * Get user data
 */
function getUserData() {
  const data = localStorage.getItem('recruitai_user');
  return data ? JSON.parse(data) : null;
}

/**
 * Set user data
 */
function setUserData(user) {
  localStorage.setItem('recruitai_user', JSON.stringify(user));
}

/**
 * Remove user data
 */
function removeUserData() {
  localStorage.removeItem('recruitai_user');
}

/**
 * Generic API request
 */
async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

