/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

const API_CONFIG = {
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
      BATCH_PARSE: '/ai/parse/batch'
    },
    RANKING: {
      RANK: '/rank',
      TOP: '/rank/top',
      SINGLE: (id) => `/rank/${id}`
    },
    VERIFICATION: {
      UPLOAD: '/verify/upload',
      VERIFY: '/verify/verify',
      STATUS: (id) => `/verify/${id}`
    },
    DASHBOARD: {
      DATA: '/dashboard',
      STATS: '/dashboard/stats',
      TOP_CANDIDATES: '/dashboard/top-candidates',
      ACTIVITY: '/dashboard/activity'
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
 * Remove authentication token from localStorage
 */
function removeAuthToken() {
  localStorage.removeItem('recruitai_token');
}

/**
 * Get user data from localStorage
 */
function getUserData() {
  const userData = localStorage.getItem('recruitai_user');
  return userData ? JSON.parse(userData) : null;
}

/**
 * Set user data in localStorage
 */
function setUserData(user) {
  localStorage.setItem('recruitai_user', JSON.stringify(user));
}

/**
 * Remove user data from localStorage
 */
function removeUserData() {
  localStorage.removeItem('recruitai_user');
}

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {})
    }
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

/**
 * Make file upload request
 */
async function uploadFile(endpoint, file, additionalData = {}) {
  const token = getAuthToken();
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const formData = new FormData();
  
  // Determine field name based on endpoint
  if (endpoint.includes('/resume/')) {
    formData.append('resume', file);
  } else if (endpoint.includes('/verify/')) {
    formData.append('certificate', file);
  } else {
    formData.append('file', file);
  }
  
  // Add additional form data
  Object.keys(additionalData).forEach(key => {
    if (additionalData[key] !== undefined && additionalData[key] !== null) {
      formData.append(key, additionalData[key]);
    }
  });
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // Don't set Content-Type header - browser will set it with boundary for FormData
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    
    return data;
  } catch (error) {
    console.error('File Upload Error:', error);
    throw error;
  }
}

