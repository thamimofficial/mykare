import axios from 'axios';

// Local backend URL (change based on your server IP)
const BASE_URL = 'http://10.0.2.2:8080/api';  // ✅ Replace with your backend IP

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptors for logging requests/responses
api.interceptors.request.use(
  request => {
    console.log('➡️ Request:', request.method?.toUpperCase(), request.url, request.data);
    return request;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('❌ Response Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
