import axios from 'axios';
import { useAuthStore } from '../context/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        console.log('Request data:', config.data);

        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors and log responses
apiClient.interceptors.response.use(
    (response) => {
        console.log(`API Response: ${response.status} ${response.statusText}`);
        console.log('Response data:', response.data);
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        console.error('Error response:', error.response);

        if (error.response?.status === 401) {
            // Token expired or invalid - logout user
            useAuthStore.getState().logout();
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default apiClient;
