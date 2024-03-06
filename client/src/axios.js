// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:7000/api',
  timeout: 5000,
});

let isRefreshing = false;
let refreshSubscribers = [];

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem('accessToken');
          const response = await axios.post('/api/auth/refresh-token', { refreshToken });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          isRefreshing = false;
          onAccessTokenRefreshed(newAccessToken);
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
 
        }
      }

      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

function onAccessTokenRefreshed(newAccessToken) {
  
}

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

export default api;
