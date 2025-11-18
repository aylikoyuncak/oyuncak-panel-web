import axios from 'axios';
import { Configuration, AdminApi, AuthApi } from '@/api/generated';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.aylikoyuncak.com';

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Token'ı her istekte ekle (login endpoint'i hariç)
axiosInstance.interceptors.request.use(
  (config) => {
    // Login endpoint'i için token ekleme
    if (config.url?.includes('/api/admin/login') || config.url?.includes('/api/auth/login')) {
      return config;
    }
    
    // Client-side'da localStorage'dan token al
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Hataları yönet
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş - Login'e yönlendir
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Configuration
const apiConfig = new Configuration({
  basePath: API_BASE_URL,
});

// API Client'ları oluştur
export const adminApi = new AdminApi(apiConfig, API_BASE_URL, axiosInstance);
export const authApi = new AuthApi(apiConfig, API_BASE_URL, axiosInstance);

// Helper fonksiyonlar
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

