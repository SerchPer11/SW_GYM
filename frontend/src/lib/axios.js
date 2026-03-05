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

export default api;