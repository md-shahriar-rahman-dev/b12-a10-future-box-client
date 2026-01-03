import axios from 'axios';
import { getAuth } from 'firebase/auth';


const api = axios.create({
  baseURL: 'https://future-box-server-lake.vercel.app/api', 
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('Could not attach token:', err?.message || err);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
