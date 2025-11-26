import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Plants API
export const plantsAPI = {
  getAll: (params) => api.get('/plants', { params }),
  getOne: (id) => api.get(`/plants/${id}`),
  create: (data) => api.post('/plants', data),
  update: (id, data) => api.put(`/plants/${id}`, data),
  delete: (id) => api.delete(`/plants/${id}`),
  getCategories: () => api.get('/plants/categories'),
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getAll: () => api.get('/orders'),
  getOne: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

export default api;
