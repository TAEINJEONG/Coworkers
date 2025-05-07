import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // pages/api/auth/refresh.ts 경로에 맞춰 '/auth/refresh'
        await axiosInstance.post('/auth/refresh');
        return axiosInstance(original);
      } catch (refreshErr) {
        console.error('[axios] refresh failed:', refreshErr);
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
