import api from '@/lib/axios';

export const authService = {
    //send credentials to the backend and get the token
    login : async (credentials) => {
        const response = await api.post('/login', credentials);
        return response.data;
    },
    //destroy the token in the backend and remove it from localStorage
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },
    //get the user profile from the backend
    getProfile: async () => {
        const response = await api.get('/me');
        return response.data;
    }
};