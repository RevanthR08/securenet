import api from './api';

// Scanner Service
export const scannerService = {
  scanUrl: async (url) => {
    const response = await api.post('/api/scan/url', { url });
    return response.data;
  },
};

// Report Service
export const reportService = {
  reportScam: async (url) => {
    const response = await api.post('/api/report', { url });
    return response.data;
  },
};

// Community Service
export const communityService = {
  getLiveFeed: async () => {
    const response = await api.get('/api/community/feed');
    return response.data;
  },
};

// Profile Service
export const profileService = {
  getProfile: async (userId) => {
    const response = await api.get(`/api/profile?user_id=${userId}`);
    return response.data;
  },
};

// Stats Service (Public - no auth required)
export const statsService = {
  getSummary: async () => {
    const response = await api.get('/api/stats/summary');
    return response.data;
  },
};

// AI Service
export const aiService = {
  chat: async (url, question) => {
    const payload = { question };
    if (url) payload.url = url;
    const response = await api.post('/api/ai/chat', payload);
    return response.data;
  },
};

// Health Check
export const healthService = {
  check: async () => {
    const response = await api.get('/api/health');
    return response.data;
  },
};
