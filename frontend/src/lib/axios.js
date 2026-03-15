import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/api', // La URL de tu API en Laravel
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true, // Importante si luego usas Sanctum para autenticación
});

// Intercept to add the token to the headers of each request
api.interceptors.request.use(
    config => {
        // Obtain the token from localStorage
        const token = localStorage.getItem('auth_token');
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;