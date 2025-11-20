/**
 * API Configuration
 */

const API_CONFIG = {
  BASE_URL: "https://ai-recruitment-backend-rid4.onrender.com/api",

  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register"
    },
    RESUME: {
      UPLOAD: "/resume/upload",
      ALL: "/resume/all",
      SINGLE: (id) => `/resume/${id}`,
      DELETE: (id) => `/resume/${id}`
    },
    AI: {
      PARSE: (id) => `/ai/parse/${id}`,
      BATCH_PARSE: "/ai/batch-parse"
    },
    RANKING: {
      RANK: "/rank",
      TOP: "/rank/top",
      SINGLE: (id) => `/rank/${id}`
    },
    VERIFICATION: {
      UPLOAD: "/verify/upload",
      VERIFY: "/verify/verify",
      STATUS: (id) => `/verify/status/${id}`,
      DETAILS: "/verify/details"
    },
    DASHBOARD: {
      STATS: "/dashboard/stats"
    },
    HEALTH: "/health"
  }
};

/**
 * Auth Helpers
 */
function getAuthToken() {
  return localStorage.getItem("recruitai_token");
}

function setAuthToken(token) {
  localStorage.setItem("recruitai_token", token);
}

function removeAuthToken() {
  localStorage.removeItem("recruitai_token");
}

function getUserData() {
  const data = localStorage.getItem("recruitai_user");
  return data ? JSON.parse(data) : null;
}

function setUserData(user) {
  localStorage.setItem("recruitai_user", JSON.stringify(user));
}

function removeUserData() {
  localStorage.removeItem("recruitai_user");
}

/**
 * General API Request
 */
async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

/**
 * File Upload Handler
 */
async function uploadFile(endpoint, file, extra = {}) {
  const token = getAuthToken();
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const formData = new FormData();

  // Detect if resume or certificate
  if (endpoint.includes("resume")) {
    formData.append("resume", file);
  } else if (endpoint.includes("verify")) {
    formData.append("certificate", file);
  }

  Object.entries(extra).forEach(([k, v]) => {
    formData.append(k, v);
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}
