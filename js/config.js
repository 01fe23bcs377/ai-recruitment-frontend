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
