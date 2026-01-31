import axios from 'axios';
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
/* ================= REQUEST INTERCEPTOR ================= */
request.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
/* ================= RESPONSE INTERCEPTOR (OPTIONAL) ================= */
request.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Token hết hạn hoặc không hợp lệ');
      }
      return Promise.reject(error);
    }
);
export default request;
