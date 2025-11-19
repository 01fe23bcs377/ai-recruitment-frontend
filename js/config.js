const API_CONFIG = {
    BASE_URL: "https://ai-recruitment-backend-rid4.onrender.com/api",

    ENDPOINTS: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        UPLOAD_RESUME: "/resume/upload",
        PARSE_RESUME: "/resume/parse",
        VERIFY_CERTIFICATE: "/verify/certificate",
        DASHBOARD_STATS: "/dashboard/stats",
        CANDIDATES: "/candidates/all",
        JOBS: "/jobs/all"
    }
};

export default API_CONFIG;
