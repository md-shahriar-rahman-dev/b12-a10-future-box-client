import axios from 'axios';
import { getAuth } from 'firebase/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // token attach failed; continue without token
    console.warn('Could not attach token:', err?.message || err);
  }
  return config;
}, (err) => Promise.reject(err));

export default api;
